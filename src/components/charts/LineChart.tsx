import React from 'react';
import type { Series } from '../../data/series';
import { ChartFrame } from './ChartFrame';
import { linear, ticks } from './scale';

/** Simple line with labelled points and a zero-based y-axis. */
export function LineChart({ series, valueFormat = (v: number) => String(v) }: { series: Series; valueFormat?: (v: number) => string }) {
  const W = 360;
  const H = 180;
  const P = { l: 36, r: 16, t: 16, b: 24 };
  const max = Math.max(...series.points.map((p) => p.value));
  const t = ticks(max);
  const y = linear([0, t[t.length - 1]], [H - P.b, P.t]);
  const x = linear([0, series.points.length - 1], [P.l + 10, W - P.r - 10]);
  const d = series.points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p.value)}`).join(' ');
  return (
    <ChartFrame series={series} valueFormat={valueFormat}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md">
        {t.map((v) => (
          <g key={v}>
            <line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke="var(--color-hairline)" />
            <text x={P.l - 6} y={y(v) + 3} textAnchor="end" fontSize="10" fill="var(--color-sage)" fontFamily="var(--font-mono)">
              {valueFormat(v)}
            </text>
          </g>
        ))}
        <path d={d} fill="none" stroke="var(--color-brass)" strokeWidth="2.5" />
        {series.points.map((p, i) => (
          <g key={p.label}>
            <circle cx={x(i)} cy={y(p.value)} r="4" fill="var(--color-brass)" />
            <text x={x(i)} y={y(p.value) - 8} textAnchor="middle" fontSize="11" fill="var(--color-paper)" fontFamily="var(--font-mono)">
              {valueFormat(p.value)}
            </text>
            <text x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="var(--color-sage)" fontFamily="var(--font-mono)">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </ChartFrame>
  );
}
