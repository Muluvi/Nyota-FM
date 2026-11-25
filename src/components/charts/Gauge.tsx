import React from 'react';
import type { Series } from '../../data/series';
import { ChartCard, ChartDefs, useChartIds, useTooltip } from './kit';
import { CountUp } from '../motion/Numbers';

/**
 * Semicircle gauge: the arc sweeps to the focus value, the needle swings in with a damped
 * (elastic) overshoot, and the other regions drop in as labelled ticks.
 */
export function Gauge({ series, focus, kicker }: { series: Series; focus: string; kicker?: string }) {
  const ids = useChartIds();
  const tip = useTooltip();
  const W = 360;
  const H = 230;
  const cx = W / 2;
  const cy = 190;
  const r = 140;
  const f = series.points.find((p) => p.label === focus)!;
  const ang = (v: number) => Math.PI * (1 - v / 100);
  const pt = (v: number, rr = r) => [cx + rr * Math.cos(ang(v)), cy - rr * Math.sin(ang(v))];
  const arcLen = Math.PI * r;
  const needleDeg = -90 + (f.value / 100) * 180;
  return (
    <ChartCard
      kicker={kicker}
      title={series.title}
      note={series.note}
      sourceId={series.sourceId}
      rows={series.points.map((p) => ({ label: p.label, value: `${p.value}%` }))}
      headline={<CountUp value={f.value} suffix="%" />}
      hostRef={tip.host}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" onPointerLeave={tip.hide}>
        <ChartDefs ids={ids} />
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="var(--color-hairline)" strokeWidth="18" strokeLinecap="round" />
        <path
          className="c-sweep"
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={`url(#${ids.brass})`}
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray={`${(f.value / 100) * arcLen} ${arcLen}`}
          style={{ '--len': (f.value / 100) * arcLen, strokeDashoffset: 0 } as React.CSSProperties}
          filter={`url(#${ids.glow})`}
        />
        {[0, 25, 50, 75, 100].map((v) => {
          const [x1, y1] = pt(v, r + 16);
          return (
            <text key={v} className="c-axis" x={x1} y={y1 + 4} textAnchor="middle" fontSize="10" fill="var(--color-sage-dim)">
              {v}
            </text>
          );
        })}
        {series.points
          .filter((p) => p.label !== focus)
          .map((p, i) => {
            const [x1, y1] = pt(p.value, r - 14);
            const [x2, y2] = pt(p.value, r + 9);
            return (
              <g key={p.label} className="c-pop" style={{ '--i': i + 3 } as React.CSSProperties} data-series="" onPointerMove={(e) => tip.show(e, <><strong className="text-brass">{p.label}</strong>: {p.value}% reach</>)}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-sage)" strokeWidth="2" />
                <circle cx={x2} cy={y2} r="9" fill="transparent" />
              </g>
            );
          })}
        <g className="c-needle" style={{ transform: `rotate(${needleDeg}deg)`, transformOrigin: `${cx}px ${cy}px`, '--from': '-90deg' } as React.CSSProperties}>
          <path d={`M ${cx - 5} ${cy} L ${cx} ${cy - r + 26} L ${cx + 5} ${cy} Z`} fill="var(--color-paper)" />
        </g>
        <circle cx={cx} cy={cy} r="11" fill="var(--color-ink)" stroke="var(--color-brass)" strokeWidth="3" />
        <text className="c-fade" x={cx} y={cy - 40} textAnchor="middle" fontSize="13" fill="var(--color-paper)" fontWeight={600}>
          {focus}
        </text>
      </svg>
      <ul className="mt-1 flex flex-wrap justify-center gap-x-4 text-xs text-sage">
        {series.points.map((p) => (
          <li key={p.label}>
            <span className={p.label === focus ? 'text-brass font-semibold' : ''}>{p.label}</span> {p.value}%
          </li>
        ))}
      </ul>
      {tip.node}
    </ChartCard>
  );
}
