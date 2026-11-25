import React from 'react';
import type { Series } from '../../data/series';
import { ChartCard, ChartDefs, useChartIds, useTooltip } from './kit';
import { linear, ticks } from './scale';
import { CountUp } from '../motion/Numbers';

/**
 * Ranked horizontal bars: gradient fills on rounded tracks, bars grow from the baseline
 * in a staggered cascade, values fade in after, hover dims the others and shows a tooltip.
 */
export function HBar({
  series,
  highlight,
  valueFormat = (v: number) => v.toLocaleString('en-KE'),
  kicker,
  headline,
}: {
  series: Series;
  highlight?: string;
  valueFormat?: (v: number) => string;
  kicker?: string;
  headline?: React.ReactNode;
}) {
  const ids = useChartIds();
  const tip = useTooltip();
  const W = 560;
  const rowH = 34;
  const L = Math.min(230, Math.max(90, Math.max(...series.points.map((p) => p.label.length)) * 6.2 + 16));
  const R = 64;
  const max = Math.max(...series.points.map((p) => p.value));
  const total = series.points.reduce((s, p) => s + p.value, 0);
  const t = ticks(max);
  const x = linear([0, t[t.length - 1]], [L, W - R]);
  const H = series.points.length * rowH + 26;
  const hi = series.points.find((p) => p.label === highlight);
  return (
    <ChartCard
      kicker={kicker}
      title={series.title}
      note={series.note}
      sourceId={series.sourceId}
      rows={series.points.map((p) => ({ label: p.label, value: `${valueFormat(p.value)} ${series.unit}` }))}
      headline={headline ?? (hi ? <CountUp value={hi.value} suffix={series.unit === '%' ? '%' : ''} /> : undefined)}
      hostRef={tip.host}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" onPointerLeave={tip.hide}>
        <ChartDefs ids={ids} />
        <g className="c-grid">
          {t.map((v) => (
            <g key={v}>
              <line x1={x(v)} x2={x(v)} y1={0} y2={H - 20} stroke="var(--color-hairline)" strokeDasharray="2 4" />
              <text x={x(v)} y={H - 4} textAnchor="middle" fontSize="10" fill="var(--color-sage-dim)">
                {valueFormat(v)}
              </text>
            </g>
          ))}
        </g>
        {series.points.map((p, i) => {
          const isHi = p.label === highlight;
          const w = Math.max(3, x(p.value) - L);
          return (
            <g
              key={p.label}
              data-series=""
              transform={`translate(0 ${i * rowH})`}
              style={{ '--i': i } as React.CSSProperties}
              onPointerMove={(e) =>
                tip.show(
                  e,
                  <>
                    <strong className="block text-brass">{p.label}</strong>
                    {valueFormat(p.value)} {series.unit !== '%' ? series.unit : ''}
                    {series.unit !== '%' && <span className="block text-sage">{((p.value / total) * 100).toFixed(1)}% of total shown</span>}
                  </>,
                )
              }
            >
              <rect x={0} y={0} width={W} height={rowH} fill="transparent" />
              <text x={L - 10} y={rowH / 2 + 4} textAnchor="end" fontSize="12" fill={isHi ? 'var(--color-paper)' : 'var(--color-sage)'} fontWeight={isHi ? 600 : 400}>
                {p.label}
              </text>
              <rect x={L} y={8} width={W - R - L} height={rowH - 16} rx={(rowH - 16) / 2} fill="var(--color-hairline)" opacity="0.35" />
              <rect className="c-bar-h" style={{ '--i': i } as React.CSSProperties} x={L} y={8} width={w} height={rowH - 16} rx={(rowH - 16) / 2} fill={`url(#${isHi ? ids.brass : ids.sage})`} filter={isHi ? `url(#${ids.glow})` : undefined} />
              <text className="c-fade" style={{ '--i': i } as React.CSSProperties} x={L + w + 8} y={rowH / 2 + 4} fontSize="12" fontWeight={600} fill={isHi ? 'var(--color-brass)' : 'var(--color-paper)'}>
                {valueFormat(p.value)}
              </text>
            </g>
          );
        })}
      </svg>
      {tip.node}
    </ChartCard>
  );
}
