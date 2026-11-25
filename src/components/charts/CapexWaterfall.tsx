import React from 'react';
import { PHASES, phaseTotal, capexTotal } from '../../data/capex';
import { formatKshRangeM } from '../../data/format';
import { linear } from './scale';

/** Capex build-up by phase (midpoints, with the low–high range noted), from the capex register. */
export function CapexWaterfall() {
  const steps = PHASES.map((p) => {
    const t = phaseTotal(p.id);
    return { label: p.label.split(' · ')[0], mid: (t.low + t.high) / 2, range: t };
  });
  const total = capexTotal();
  const totalMid = (total.low + total.high) / 2;
  const W = 600;
  const H = 220;
  const P = { l: 12, r: 12, t: 16, b: 40 };
  const y = linear([0, totalMid * 1.1], [H - P.b, P.t]);
  const bw = (W - P.l - P.r) / (steps.length + 1) - 12;
  let run = 0;
  return (
    <figure className="rounded-xl border border-hairline bg-ink-2 p-4">
      <figcaption className="mb-2">
        <span className="block font-display text-base text-paper">How the capital adds up (midpoints)</span>
        <span className="block text-xs text-sage">Full envelope {formatKshRangeM(total)}; unquoted lines excluded.</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
        <line x1={P.l} x2={W - P.r} y1={y(0)} y2={y(0)} stroke="var(--color-sage-dim)" />
        {steps.map((s, i) => {
          const x0 = P.l + i * (bw + 12) + 6;
          const top = y(run + s.mid);
          const bottom = y(run);
          run += s.mid;
          return (
            <g key={s.label}>
              <rect x={x0} y={top} width={bw} height={Math.max(1, bottom - top)} fill="var(--color-brass)" opacity="0.8" />
              <text x={x0 + bw / 2} y={top - 4} textAnchor="middle" fontSize="10" fill="var(--color-paper)" fontFamily="var(--font-mono)">
                {(s.mid / 1e6).toFixed(2)}M
              </text>
              <text x={x0 + bw / 2} y={H - 24} textAnchor="middle" fontSize="10" fill="var(--color-sage)" fontFamily="var(--font-body)">
                {s.label}
              </text>
            </g>
          );
        })}
        {(() => {
          const x0 = P.l + steps.length * (bw + 12) + 6;
          return (
            <g>
              <rect x={x0} y={y(totalMid)} width={bw} height={y(0) - y(totalMid)} fill="var(--color-moss)" opacity="0.8" />
              <text x={x0 + bw / 2} y={y(totalMid) - 4} textAnchor="middle" fontSize="10" fill="var(--color-paper)" fontFamily="var(--font-mono)">
                {(totalMid / 1e6).toFixed(2)}M
              </text>
              <text x={x0 + bw / 2} y={H - 24} textAnchor="middle" fontSize="10" fill="var(--color-sage)" fontFamily="var(--font-body)">
                Total
              </text>
            </g>
          );
        })()}
      </svg>
      <div className="sr-only">
        <table>
        <caption>Capex by phase</caption>
        <tbody>
          {steps.map((s) => (
            <tr key={s.label}>
              <th scope="row">{s.label}</th>
              <td>{formatKshRangeM(s.range)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">Total</th>
            <td>{formatKshRangeM(total)}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </figure>
  );
}
