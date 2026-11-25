import React from 'react';
import { strategies } from '../../data/strategies';
import { election } from '../../data/election';
import { monthToQuarterLabel } from '../../data/timeline';
import { linear } from './scale';

/** Month index (from Month 0 = Jan 2027) of an ISO date, for the election window. */
const monthOf = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return (y - 2027) * 12 + m - 1 + d / 31;
};

/** The 21 strategies as bars from Month 0 to 24, with the 2027 campaign window shaded. */
export function Gantt() {
  const rows = [...strategies].sort((a, b) => a.startMonth - b.startMonth || a.endMonth - b.endMonth);
  const W = 760;
  const L = 230;
  const rowH = 20;
  const H = rows.length * rowH + 36;
  const x = linear([0, 24], [L, W - 12]);
  const camp0 = monthOf(election.campaignStart);
  const camp1 = monthOf(election.campaignEnd);
  return (
    <figure className="rounded-xl border border-hairline bg-ink-2 p-4">
      <figcaption className="mb-2">
        <span className="block font-display text-base text-paper">Roadmap: 21 strategies from Month 0 (January 2027)</span>
        <span className="block text-xs text-sage">Bars show each strategy’s implementation window; the shaded band is the IEBC campaign period.</span>
      </figcaption>
      <div className="overflow-x-auto" aria-hidden="true">
        <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[640px] w-full">
          <rect x={x(camp0)} y={0} width={x(camp1) - x(camp0)} height={H - 22} fill="var(--color-brick)" opacity="0.18" />
          <text x={x(camp0) + 3} y={10} fontSize="9" fill="var(--color-brick-text)" fontFamily="var(--font-mono)">
            campaign
          </text>
          {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((mo) => (
            <g key={mo}>
              <line x1={x(mo)} x2={x(mo)} y1={0} y2={H - 22} stroke="var(--color-hairline)" />
              <text x={x(mo)} y={H - 8} textAnchor="middle" fontSize="9" fill="var(--color-sage)" fontFamily="var(--font-mono)">
                M{mo}
              </text>
            </g>
          ))}
          {rows.map((s, i) => (
            <g key={s.id} transform={`translate(0 ${i * rowH + 14})`}>
              <text x={L - 8} y={12} textAnchor="end" fontSize="10" fill="var(--color-paper)" fontFamily="var(--font-body)">
                {s.num} {s.title.length > 34 ? `${s.title.slice(0, 33)}…` : s.title}
              </text>
              <rect x={x(s.startMonth - 1)} y={3} width={Math.max(4, x(s.endMonth) - x(s.startMonth - 1))} height={rowH - 8} rx="2" fill="var(--color-brass)" opacity="0.85" />
            </g>
          ))}
        </svg>
      </div>
      <div className="sr-only">
        <table>
        <caption>Strategy windows</caption>
        <thead>
          <tr>
            <th scope="col">Strategy</th>
            <th scope="col">Start</th>
            <th scope="col">End</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.id}>
              <th scope="row">
                {s.num} {s.title}
              </th>
              <td>
                Month {s.startMonth} ({monthToQuarterLabel(s.startMonth)})
              </td>
              <td>
                Month {s.endMonth} ({monthToQuarterLabel(s.endMonth)})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </figure>
  );
}
