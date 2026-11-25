import React from 'react';
import { strategies } from '../../data/strategies';
import { ChartCard, useTooltip } from './kit';

const CATS = ['Studio Build', 'Content & Programming', 'Digital & Mobile', 'Commercial & Revenue', 'Community & Governance'] as const;

/**
 * Plan intensity: how many strategies are active in each category each month. Cells fill
 * in a ripple from the top-left corner.
 */
export function Heatmap() {
  const tip = useTooltip();
  const months = Array.from({ length: 24 }, (_, i) => i + 1);
  const grid = CATS.map((c) => months.map((m) => strategies.filter((s) => s.category === c && m >= s.startMonth && m <= s.endMonth)));
  const max = Math.max(...grid.flat().map((xs) => xs.length));
  const W = 620;
  const L = 170;
  const cw = (W - L - 8) / 24;
  const ch = 26;
  const H = CATS.length * ch + 30;
  return (
    <ChartCard
      kicker="Plan load"
      title="How busy each workstream is, month by month"
      note="Number of strategies active in each category, Months 1–24 from board approval."
      rows={CATS.map((c, ci) => ({ label: c, value: grid[ci].map((xs) => xs.length).join(', ') }))}
      hostRef={tip.host}
    >
      <div className="overflow-x-auto" tabIndex={-1}>
        <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[540px] w-full" onPointerLeave={tip.hide}>
          {CATS.map((c, ci) => (
            <g key={c}>
              <text x={L - 8} y={ci * ch + ch / 2 + 4} textAnchor="end" fontSize="11" fill="var(--color-sage)">
                {c}
              </text>
              {months.map((m, mi) => {
                const xs = grid[ci][mi];
                const a = xs.length / max;
                return (
                  <rect
                    key={m}
                    className="c-cell"
                    style={{ '--i': ci + mi } as React.CSSProperties}
                    x={L + mi * cw + 1}
                    y={ci * ch + 2}
                    width={cw - 2}
                    height={ch - 4}
                    rx="3"
                    fill={xs.length ? `color-mix(in oklab, var(--color-brass) ${Math.round(18 + a * 82)}%, var(--color-ink))` : 'var(--color-hairline)'}
                    opacity={xs.length ? 1 : 0.35}
                    onPointerMove={(e) =>
                      tip.show(
                        e,
                        <>
                          <strong className="block text-brass">
                            {c} · Month {m}
                          </strong>
                          {xs.length ? xs.map((s) => s.num).join(', ') : 'No strategy active'}
                        </>,
                      )
                    }
                  />
                );
              })}
            </g>
          ))}
          {[1, 6, 12, 18, 24].map((m) => (
            <text key={m} className="c-axis" x={L + (m - 0.5) * cw} y={H - 6} textAnchor="middle" fontSize="10" fill="var(--color-sage-dim)">
              M{m}
            </text>
          ))}
        </svg>
      </div>
      {tip.node}
    </ChartCard>
  );
}
