import React, { useEffect, useState } from 'react';
import { countyPopulation } from '../../data/series';
import { ChartCard, useTooltip } from './kit';
import { CountUp } from '../motion/Numbers';

type Feature = { properties: { name: string }; geometry: { type: 'Polygon' | 'MultiPolygon'; coordinates: number[][][] | number[][][][] } };

/** Schematic tiles used until an official KNBS/IEBC boundary file is added (decision D5). */
const SCHEMATIC: Record<string, { x: number; y: number; w: number; h: number }> = {
  'Trans Nzoia': { x: 150, y: 14, w: 150, h: 70 },
  Bungoma: { x: 60, y: 90, w: 170, h: 85 },
  Kakamega: { x: 236, y: 90, w: 140, h: 130 },
  Busia: { x: 10, y: 182, w: 130, h: 85 },
  Vihiga: { x: 236, y: 226, w: 110, h: 46 },
};
const HQ = { x: 84, y: 150 }; // Bungoma studio (schematic position)

const max = Math.max(...countyPopulation.points.map((p) => p.value));
const total = countyPopulation.points.reduce((s, p) => s + p.value, 0);
const pop = (name: string) => countyPopulation.points.find((p) => p.label === name)?.value ?? 0;
const fill = (name: string) => `color-mix(in oklab, var(--color-brass) ${Math.round(22 + (pop(name) / max) * 68)}%, var(--color-ink))`;

/**
 * Population choropleth. Counties fill progressively, the Bungoma pin drops in with a
 * bounce and pulses its catchment; click a county to zoom to it. Loads
 * /geo/western-counties.json when present; otherwise shows a labelled schematic.
 */
export function CountyMap() {
  const tip = useTooltip();
  const [features, setFeatures] = useState<Feature[] | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);

  useEffect(() => {
    fetch('/geo/western-counties.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setFeatures(j?.features ?? null))
      .catch(() => setFeatures(null));
  }, []);

  const W = 390;
  const H = 280;
  const z = zoom ? SCHEMATIC[zoom] : null;
  const k = z ? Math.min(W / (z.w + 60), H / (z.h + 60)) : 1;
  const tf = z ? `translate(${W / 2 - (z.x + z.w / 2) * k}px, ${H / 2 - (z.y + z.h / 2) * k}px) scale(${k})` : 'none';

  const tipFor = (name: string) => (
    <>
      <strong className="block text-brass">{name}</strong>
      {pop(name).toLocaleString('en-KE')} people (2019)
      <span className="block text-sage">{((pop(name) / total) * 100).toFixed(1)}% of the five counties</span>
    </>
  );

  let body: React.ReactNode;
  if (features?.length) {
    const rings = features.flatMap((f) =>
      (f.geometry.type === 'Polygon' ? [f.geometry.coordinates as number[][][]] : (f.geometry.coordinates as number[][][][])).map((poly) => ({ name: f.properties.name, ring: poly[0] })),
    );
    const xs = rings.flatMap((r) => r.ring.map((c) => c[0]));
    const ys = rings.flatMap((r) => r.ring.map((c) => c[1]));
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const s = Math.min((W - 20) / (x1 - x0), (H - 20) / (y1 - y0));
    body = rings.map((r, i) => (
      <path
        key={i}
        className="c-pop"
        data-series=""
        style={{ '--i': i } as React.CSSProperties}
        d={r.ring.map((c, j) => `${j ? 'L' : 'M'}${10 + (c[0] - x0) * s},${H - 10 - (c[1] - y0) * s}`).join(' ') + 'Z'}
        fill={fill(r.name)}
        stroke="var(--color-ink)"
        onPointerMove={(e) => tip.show(e, tipFor(r.name))}
      />
    ));
  } else {
    body = Object.entries(SCHEMATIC).map(([name, b], i) => (
      <g
        key={name}
        className="c-pop"
        data-series=""
        style={{ '--i': i, cursor: 'zoom-in' } as React.CSSProperties}
        onPointerMove={(e) => tip.show(e, tipFor(name))}
        onClick={() => setZoom((zz) => (zz === name ? null : name))}
      >
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="14" fill={fill(name)} stroke="var(--color-ink)" strokeWidth="3" />
        <text x={b.x + b.w / 2} y={b.y + b.h / 2 - 2} textAnchor="middle" fontSize="12" fontWeight={600} fill="var(--color-paper)">
          {name}
        </text>
        <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 14} textAnchor="middle" fontSize="11" fill="var(--color-paper)" opacity="0.85">
          {(pop(name) / 1e6).toFixed(2)}M
        </text>
      </g>
    ));
  }

  return (
    <ChartCard
      kicker="Footprint"
      title={countyPopulation.title}
      note={features?.length ? 'Click a county to zoom.' : 'Schematic, not to scale. Click a county to zoom.'}
      sourceId={countyPopulation.sourceId}
      rows={countyPopulation.points.map((p) => ({ label: p.label, value: p.value.toLocaleString('en-KE') }))}
      headline={<CountUp value={total / 1e6} decimals={2} suffix="M" />}
      hostRef={tip.host}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" onPointerLeave={tip.hide}>
        <g style={{ transform: tf, transition: 'transform 900ms var(--ease-out-expo)', transformOrigin: '0 0' }}>
          {body}
          {!features?.length && (
            <g>
              <circle className="c-pulse-ring" cx={HQ.x} cy={HQ.y} r="16" fill="none" stroke="var(--color-paper)" strokeWidth="1.5" />
              <circle className="c-pulse-ring" cx={HQ.x} cy={HQ.y} r="16" fill="none" stroke="var(--color-paper)" strokeWidth="1.5" />
              <g className="c-drop" style={{ '--i': 6 } as React.CSSProperties}>
                <path d={`M ${HQ.x} ${HQ.y} c -7 -10 -10 -14 -10 -19 a 10 10 0 1 1 20 0 c 0 5 -3 9 -10 19 z`} fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.5" />
                <circle cx={HQ.x} cy={HQ.y - 19} r="3.5" fill="var(--color-brass)" />
              </g>
            </g>
          )}
        </g>
        <text x={W - 6} y={14} textAnchor="end" fontSize="10" fill="var(--color-brass)">
          Nyota 107.3 · Bungoma
        </text>
      </svg>
      {zoom && (
        <button type="button" onClick={() => setZoom(null)} className="absolute right-2 bottom-2 rounded border border-hairline bg-ink px-2 py-1 text-xs text-sage hover:text-paper">
          Reset zoom
        </button>
      )}
      {tip.node}
    </ChartCard>
  );
}
