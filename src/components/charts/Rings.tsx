import React from 'react';
import type { Series } from '../../data/series';
import { ChartCard, ChartDefs, useChartIds, useTooltip } from './kit';
import { CountUp } from '../motion/Numbers';

/** Concentric progress rings, one per item, filling to each item's share of the total. */
export function Rings({ series, unit = 'M', kicker }: { series: Series; unit?: string; kicker?: string }) {
  const ids = useChartIds();
  const tip = useTooltip();
  const total = series.points.reduce((s, p) => s + p.value, 0);
  const fills = [`url(#${ids.brass})`, `url(#${ids.moss})`, `url(#${ids.sage})`];
  return (
    <ChartCard
      kicker={kicker}
      title={series.title}
      note={series.note}
      sourceId={series.sourceId}
      rows={series.points.map((p) => ({ label: p.label, value: `${p.value}${unit} (${((p.value / total) * 100).toFixed(1)}%)` }))}
      headline={<CountUp value={total} decimals={1} suffix={unit} />}
      legend={series.points.map((p, i) => ({ label: `${p.label} · ${((p.value / total) * 100).toFixed(0)}%`, color: ['var(--color-brass)', 'var(--color-moss)', 'var(--color-sage)'][i] }))}
      hostRef={tip.host}
    >
      <svg viewBox="0 0 240 240" className="mx-auto w-full max-w-[16rem]" onPointerLeave={tip.hide}>
        <ChartDefs ids={ids} />
        {series.points.map((p, i) => {
          const r = 96 - i * 26;
          const C = 2 * Math.PI * r;
          const len = (p.value / total) * C;
          return (
            <g key={p.label} data-series="" onPointerMove={(e) => tip.show(e, <><strong className="text-brass">{p.label}</strong>: {p.value}{unit} connections</>)}>
              <circle cx="120" cy="120" r={r} fill="none" stroke="var(--color-hairline)" strokeWidth="18" opacity="0.4" />
              <circle
                className="c-sweep"
                cx="120"
                cy="120"
                r={r}
                fill="none"
                stroke={fills[i]}
                strokeWidth="18"
                strokeLinecap="round"
                strokeDasharray={`${len} ${C}`}
                transform="rotate(-90 120 120)"
                style={{ '--len': len, '--i': i, strokeDashoffset: 0 } as React.CSSProperties}
              />
            </g>
          );
        })}
        <text x="120" y="125" textAnchor="middle" fontSize="13" fill="var(--color-sage)">
          connections
        </text>
      </svg>
      {tip.node}
    </ChartCard>
  );
}
