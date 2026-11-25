import React from 'react';
import { PHASES, phaseTotal, capexTotal } from '../../data/capex';
import { formatKshRangeM } from '../../data/format';
import { ChartCard, ChartDefs, useChartIds, useTooltip } from './kit';
import { linear } from './scale';
import { CountUp } from '../motion/Numbers';

/**
 * Capital build-up: each phase rises from where the last one ended (sequential chain),
 * connector lines draw between steps, and the total pops in with a spring.
 */
const SHORT: Record<string, string> = { P1: 'Phase 1', P2: 'Phase 2', P3: 'Phase 3', Power: 'Power', OB: 'OB rig' };

export function CapexWaterfall() {
  const ids = useChartIds();
  const tip = useTooltip();
  const steps = PHASES.map((p) => {
    const t = phaseTotal(p.id);
    return { label: SHORT[p.id], full: p.label, months: p.months, mid: (t.low + t.high) / 2, range: t };
  });
  const total = capexTotal();
  const totalMid = (total.low + total.high) / 2;
  const W = 620;
  const H = 260;
  const P = { l: 16, r: 16, t: 26, b: 44 };
  const y = linear([0, totalMid * 1.12], [H - P.b, P.t]);
  const bw = (W - P.l - P.r) / (steps.length + 1) - 18;
  const xAt = (i: number) => P.l + i * (bw + 18) + 9;
  let run = 0;
  return (
    <ChartCard
      kicker="Capital"
      title="How the capital adds up"
      note="Midpoints of each quoted range; unquoted lines (the OB vehicle) are excluded."
      rows={[...steps.map((s) => ({ label: s.full, value: formatKshRangeM(s.range) })), { label: 'Total', value: formatKshRangeM(total) }]}
      headline={<CountUp value={totalMid / 1e6} decimals={1} prefix="KSh " suffix="M" />}
      hostRef={tip.host}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" onPointerLeave={tip.hide}>
        <ChartDefs ids={ids} />
        <line className="c-axis" x1={P.l} x2={W - P.r} y1={y(0)} y2={y(0)} stroke="var(--color-sage-dim)" />
        {steps.map((s, i) => {
          const x0 = xAt(i);
          const base = run;
          run += s.mid;
          const top = y(run);
          return (
            <g key={s.label} data-series="" onPointerMove={(e) => tip.show(e, <><strong className="block text-brass">{s.full}</strong>{formatKshRangeM(s.range)}<span className="block text-sage">{s.months}</span></>)}>
              <rect className="c-bar-v" style={{ '--i': i * 2 } as React.CSSProperties} x={x0} y={top} width={bw} height={Math.max(2, y(base) - top)} rx="6" fill={`url(#${i === 0 ? ids.brass : ids.sage})`} />
              {i < steps.length - 1 && (
                <line className="c-fade" style={{ '--i': i * 2 + 1 } as React.CSSProperties} x1={x0 + bw} x2={xAt(i + 1)} y1={top} y2={top} stroke="var(--color-sage-dim)" strokeDasharray="3 3" />
              )}
              <text className="c-fade" style={{ '--i': i * 2 } as React.CSSProperties} x={x0 + bw / 2} y={top - 7} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--color-paper)">
                {(s.mid / 1e6).toFixed(2)}M
              </text>
              <text x={x0 + bw / 2} y={H - 26} textAnchor="middle" fontSize="11" fill="var(--color-sage)">
                {s.label}
              </text>
              <text x={x0 + bw / 2} y={H - 12} textAnchor="middle" fontSize="9" fill="var(--color-sage-dim)">
                {s.months}
              </text>
            </g>
          );
        })}
        <g className="c-grow-center" style={{ '--i': steps.length * 2 + 2 } as React.CSSProperties}>
          <rect x={xAt(steps.length)} y={y(totalMid)} width={bw} height={y(0) - y(totalMid)} rx="6" fill={`url(#${ids.moss})`} filter={`url(#${ids.glow})`} />
          <text x={xAt(steps.length) + bw / 2} y={y(totalMid) - 7} textAnchor="middle" fontSize="12" fontWeight={700} fill="var(--color-paper)">
            {(totalMid / 1e6).toFixed(2)}M
          </text>
        </g>
        <text x={xAt(steps.length) + bw / 2} y={H - 26} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--color-paper)">
          Total
        </text>
      </svg>
      {tip.node}
    </ChartCard>
  );
}
