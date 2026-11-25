import React, { useEffect, useState } from 'react';
import { countyPopulation } from '../../data/series';
import { ChartFrame } from './ChartFrame';

type Feature = { properties: { name: string }; geometry: { type: 'Polygon' | 'MultiPolygon'; coordinates: number[][][] | number[][][][] } };

/** Schematic tiles used until an official KNBS/IEBC boundary file is added (decision D5). */
const SCHEMATIC: Record<string, { x: number; y: number; w: number; h: number }> = {
  'Trans Nzoia': { x: 150, y: 10, w: 150, h: 70 },
  Bungoma: { x: 60, y: 85, w: 170, h: 85 },
  Kakamega: { x: 235, y: 85, w: 140, h: 130 },
  Busia: { x: 10, y: 175, w: 130, h: 85 },
  Vihiga: { x: 235, y: 220, w: 110, h: 50 },
};

const max = Math.max(...countyPopulation.points.map((p) => p.value));
const fill = (name: string) => {
  const v = countyPopulation.points.find((p) => p.label === name)?.value ?? 0;
  return `color-mix(in oklab, var(--color-brass) ${Math.round(25 + (v / max) * 65)}%, var(--color-ink))`;
};

/** Population choropleth of the five counties. Loads /geo/western-counties.json if present. */
export function CountyMap() {
  const [features, setFeatures] = useState<Feature[] | null>(null);

  useEffect(() => {
    fetch('/geo/western-counties.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setFeatures(j?.features ?? null))
      .catch(() => setFeatures(null));
  }, []);

  const W = 390;
  const H = 280;
  let body: React.ReactNode;
  if (features?.length) {
    const rings = features.flatMap((f) =>
      (f.geometry.type === 'Polygon' ? [f.geometry.coordinates as number[][][]] : (f.geometry.coordinates as number[][][][])).map((poly) => ({ name: f.properties.name, ring: poly[0] })),
    );
    const xs = rings.flatMap((r) => r.ring.map((c) => c[0]));
    const ys = rings.flatMap((r) => r.ring.map((c) => c[1]));
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const k = Math.min((W - 20) / (x1 - x0), (H - 20) / (y1 - y0));
    body = rings.map((r, i) => (
      <path
        key={i}
        d={r.ring.map((c, j) => `${j ? 'L' : 'M'}${10 + (c[0] - x0) * k},${H - 10 - (c[1] - y0) * k}`).join(' ') + 'Z'}
        fill={fill(r.name)}
        stroke="var(--color-ink)"
      />
    ));
  } else {
    body = Object.entries(SCHEMATIC).map(([name, b]) => (
      <g key={name}>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="10" fill={fill(name)} stroke="var(--color-ink)" strokeWidth="3" />
        <text x={b.x + b.w / 2} y={b.y + b.h / 2} textAnchor="middle" fontSize="12" fill="var(--color-paper)" fontFamily="var(--font-body)">
          {name}
        </text>
        <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 14} textAnchor="middle" fontSize="10" fill="var(--color-paper)" fontFamily="var(--font-mono)">
          {((countyPopulation.points.find((p) => p.label === name)?.value ?? 0) / 1e6).toFixed(2)}M
        </text>
      </g>
    ));
  }

  return (
    <ChartFrame series={countyPopulation} valueFormat={(v) => v.toLocaleString('en-KE')}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md">
        {body}
        {!features?.length && (
          <text x={W - 6} y={H - 4} textAnchor="end" fontSize="10" fill="var(--color-sage)" fontFamily="var(--font-mono)">
            Schematic, not to scale
          </text>
        )}
        <text x={W - 6} y={14} textAnchor="end" fontSize="10" fill="var(--color-brass)" fontFamily="var(--font-mono)">
          ★ Nyota 107.3 · Bungoma
        </text>
      </svg>
    </ChartFrame>
  );
}
