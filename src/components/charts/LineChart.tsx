import React, { useState } from 'react';
import type { Series } from '../../data/series';
import { ChartCard, ChartDefs, useChartIds, useTooltip } from './kit';
import { linear, ticks } from './scale';
import { CountUp } from '../motion/Numbers';

/**
 * Line + area: the area sweeps in left to right, the line draws itself, points drop in
 * with a bounce, and a crosshair tooltip follows the pointer along the series.
 */
export function LineChart({ series, valueFormat = (v: number) => String(v), kicker }: { series: Series; valueFormat?: (v: number) => string; kicker?: string }) {
  const ids = useChartIds();
  const tip = useTooltip();
  const [hover, setHover] = useState<number | null>(null);
  const W = 420;
  const H = 220;
  const P = { l: 40, r: 20, t: 24, b: 28 };
  const max = Math.max(...series.points.map((p) => p.value));
  const t = ticks(max);
  const y = linear([0, t[t.length - 1]], [H - P.b, P.t]);
  const x = linear([0, series.points.length - 1], [P.l + 14, W - P.r - 14]);
  const line = series.points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p.value)}`).join(' ');
  const area = `${line} L${x(series.points.length - 1)},${H - P.b} L${x(0)},${H - P.b} Z`;
  const len = series.points.reduce((s, p, i) => (i ? s + Math.hypot(x(i) - x(i - 1), y(p.value) - y(series.points[i - 1].value)) : 0), 0);
  const first = series.points[0].value;
  const last = series.points[series.points.length - 1].value;
  return (
    <ChartCard
      kicker={kicker}
      title={series.title}
      note={series.note}
      sourceId={series.sourceId}
      rows={series.points.map((p) => ({ label: p.label, value: valueFormat(p.value) }))}
      headline={<CountUp value={Math.abs(last - first)} prefix={last < first ? '−' : '+'} suffix=" pts" className={last < first ? 'text-brick-text' : 'text-moss'} />}
      hostRef={tip.host}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        onPointerMove={(e) => {
          const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          const px = ((e.clientX - r.left) / r.width) * W;
          let best = 0;
          series.points.forEach((_, i) => {
            if (Math.abs(x(i) - px) < Math.abs(x(best) - px)) best = i;
          });
          setHover(best);
          tip.show(e, <><strong className="text-brass">{series.points[best].label}</strong>: {valueFormat(series.points[best].value)}</>);
        }}
        onPointerLeave={() => {
          setHover(null);
          tip.hide();
        }}
      >
        <ChartDefs ids={ids} />
        <g className="c-grid">
          {t.map((v) => (
            <g key={v}>
              <line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke="var(--color-hairline)" strokeDasharray="2 4" />
              <text x={P.l - 8} y={y(v) + 3} textAnchor="end" fontSize="10" fill="var(--color-sage-dim)">
                {valueFormat(v)}
              </text>
            </g>
          ))}
        </g>
        <path className="c-area" d={area} fill={`url(#${ids.area})`} />
        <path className="c-sweep" d={line} fill="none" stroke="var(--color-brass)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} style={{ '--len': len, strokeDashoffset: 0 } as React.CSSProperties} filter={`url(#${ids.glow})`} />
        {hover != null && <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} stroke="var(--color-brass)" strokeOpacity="0.5" strokeDasharray="3 3" />}
        {series.points.map((p, i) => (
          <g key={p.label} className="c-drop" style={{ '--i': i } as React.CSSProperties}>
            <circle cx={x(i)} cy={y(p.value)} r={hover === i ? 8 : 6} fill="var(--color-ink)" stroke="var(--color-brass)" strokeWidth="3" style={{ transition: 'r 200ms' }} />
            <text x={x(i)} y={y(p.value) - 14} textAnchor="middle" fontSize="13" fontWeight={600} fill="var(--color-paper)">
              {valueFormat(p.value)}
            </text>
            <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--color-sage)">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      {tip.node}
    </ChartCard>
  );
}
