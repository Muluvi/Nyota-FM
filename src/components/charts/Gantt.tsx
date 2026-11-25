import React, { useState } from 'react';
import { strategies } from '../../data/strategies';
import { election } from '../../data/election';
import { monthToQuarterLabel, monthRangeLabel } from '../../data/timeline';
import { ChartCard, ChartDefs, useChartIds, useTooltip } from './kit';
import { linear } from './scale';

const CAT_FILL: Record<string, 'brass' | 'moss' | 'sage' | 'brick'> = {
  'Studio Build': 'sage',
  'Content & Programming': 'brass',
  'Digital & Mobile': 'moss',
  'Commercial & Revenue': 'brick',
  'Community & Governance': 'sage',
};

const monthOf = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return (y - 2027) * 12 + m - 1 + d / 31;
};

/**
 * Roadmap: bars slide in from Month 0 in a follow-the-leader cascade; the IEBC campaign
 * window is shaded; hovering a row highlights it and shows its window and budget.
 */
export function Gantt() {
  const ids = useChartIds();
  const tip = useTooltip();
  const [hover, setHover] = useState<string | null>(null);
  const rows = [...strategies].sort((a, b) => a.startMonth - b.startMonth || a.endMonth - b.endMonth);
  const W = 780;
  const L = 250;
  const rowH = 22;
  const H = rows.length * rowH + 40;
  const x = linear([0, 24], [L, W - 14]);
  const c0 = monthOf(election.campaignStart);
  const c1 = monthOf(election.campaignEnd);
  return (
    <ChartCard
      kicker="Roadmap"
      title="21 strategies from Month 0 (January 2027)"
      note="Bars show each implementation window; the shaded band is the IEBC campaign period (29 May–7 Aug 2027)."
      rows={rows.map((s) => ({ label: `${s.num} ${s.title}`, value: `Month ${s.startMonth} (${monthToQuarterLabel(s.startMonth)}) to Month ${s.endMonth} (${monthToQuarterLabel(s.endMonth)})` }))}
      legend={[
        { label: 'Content & programming', color: 'var(--color-brass)' },
        { label: 'Digital & mobile', color: 'var(--color-moss)' },
        { label: 'Commercial & revenue', color: 'var(--color-brick-text)' },
        { label: 'Studio & governance', color: 'var(--color-sage-dim)' },
      ]}
      hostRef={tip.host}
    >
      <div className="overflow-x-auto" tabIndex={-1}>
        <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[660px] w-full" onPointerLeave={() => { setHover(null); tip.hide(); }}>
          <ChartDefs ids={ids} />
          <g className="c-grid">
            {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((mo) => (
              <g key={mo}>
                <line x1={x(mo)} x2={x(mo)} y1={14} y2={H - 22} stroke="var(--color-hairline)" strokeDasharray={mo % 12 ? '2 4' : undefined} />
                <text x={x(mo)} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--color-sage-dim)">
                  M{mo}
                </text>
              </g>
            ))}
          </g>
          <rect className="c-fade fx-breathe" x={x(c0)} y={12} width={x(c1) - x(c0)} height={H - 34} fill="var(--color-brick)" opacity="0.16" rx="4" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
          <text className="c-fade" x={x(c0) + 4} y={10} fontSize="9" fill="var(--color-brick-text)">
            election campaign
          </text>
          {rows.map((s, i) => {
            const on = hover === s.id;
            return (
              <g
                key={s.id}
                transform={`translate(0 ${i * rowH + 16})`}
                onPointerMove={(e) => {
                  setHover(s.id);
                  tip.show(
                    e,
                    <>
                      <strong className="block text-brass">
                        {s.num} {s.title}
                      </strong>
                      {monthRangeLabel(s.startMonth, s.endMonth)}
                      <span className="block text-sage">{s.execution.budget}</span>
                    </>,
                  );
                }}
              >
                <rect x={0} y={0} width={W} height={rowH} fill={on ? 'color-mix(in oklab, var(--color-brass) 8%, transparent)' : 'transparent'} /> {/* data-ok: UI */}
                <text x={L - 10} y={rowH / 2 + 4} textAnchor="end" fontSize="11" fill={on ? 'var(--color-paper)' : 'var(--color-sage)'}>
                  {s.num} {s.title.length > 36 ? `${s.title.slice(0, 35)}…` : s.title}
                </text>
                <rect
                  className="c-grow-x"
                  style={{ '--i': i * 0.5 } as React.CSSProperties}
                  x={x(s.startMonth - 1)}
                  y={4}
                  width={Math.max(6, x(s.endMonth) - x(s.startMonth - 1))}
                  height={rowH - 8}
                  rx={(rowH - 8) / 2}
                  fill={`url(#${ids[CAT_FILL[s.category]]})`}
                  filter={on ? `url(#${ids.glow})` : undefined}
                />
              </g>
            );
          })}
        </svg>
      </div>
      {tip.node}
    </ChartCard>
  );
}
