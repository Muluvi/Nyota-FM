import React from 'react';
import type { Series } from '../../data/series';
import { ChartFrame } from './ChartFrame';
import { linear, ticks } from './scale';

/** Horizontal bar chart with a value axis and labels. */
export function HBar({ series, highlight, valueFormat = (v: number) => v.toLocaleString('en-KE') }: { series: Series; highlight?: string; valueFormat?: (v: number) => string }) {
  const W = 560;
  const rowH = 26;
  // Label column sized to the longest label (approx. 6 px per character at 11 px).
  const L = Math.min(240, Math.max(90, Math.max(...series.points.map((p) => p.label.length)) * 6 + 16));
  const R = 56;
  const max = Math.max(...series.points.map((p) => p.value));
  const t = ticks(max);
  const x = linear([0, t[t.length - 1]], [L, W - R]);
  const H = series.points.length * rowH + 24;
  return (
    <ChartFrame series={series} valueFormat={valueFormat}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {t.map((v) => (
          <g key={v}>
            <line x1={x(v)} x2={x(v)} y1={0} y2={H - 18} stroke="var(--color-hairline)" />
            <text x={x(v)} y={H - 4} textAnchor="middle" fontSize="10" fill="var(--color-sage)" fontFamily="var(--font-mono)">
              {valueFormat(v)}
            </text>
          </g>
        ))}
        {series.points.map((p, i) => (
          <g key={p.label} transform={`translate(0 ${i * rowH})`}>
            <text x={L - 8} y={rowH / 2 + 4} textAnchor="end" fontSize="11" fill="var(--color-paper)" fontFamily="var(--font-body)">
              {p.label}
            </text>
            <rect x={L} y={5} width={Math.max(1, x(p.value) - L)} height={rowH - 10} rx="2" fill={p.label === highlight ? 'var(--color-brass)' : 'var(--color-sage-dim)'} />
            <text x={x(p.value) + 4} y={rowH / 2 + 4} fontSize="10" fill="var(--color-sage)" fontFamily="var(--font-mono)">
              {valueFormat(p.value)}
            </text>
          </g>
        ))}
      </svg>
    </ChartFrame>
  );
}
