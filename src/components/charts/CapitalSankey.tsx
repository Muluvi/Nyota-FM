import React from 'react';
import { capex, PHASES } from '../../data/capex';
import { ChartCard, useTooltip } from './kit';

const TIER_COLOR = { 1: 'var(--color-moss)', 2: 'var(--color-brass)', 0: 'var(--color-brick-text)' } as const;
const TIER_LABEL = { 1: 'Tier 1 · quoted', 2: 'Tier 2 · estimate', 0: 'Tier 0 · gap' } as const;

/**
 * Flow of capital (midpoints) from each phase to its evidence tier: how much of the
 * envelope rests on vendor quotes versus estimates versus open gaps. Ribbons trace in.
 */
export function CapitalSankey() {
  const tip = useTooltip();
  const W = 620;
  const H = 300;
  const mid = (l: (typeof capex)[number]) => (l.cost ? (l.cost.low + l.cost.high) / 2 : 0);
  const total = capex.reduce((s, l) => s + mid(l), 0);
  const k = (H - 70) / total;
  const gap = 10;
  // Left nodes: phases. Right nodes: tiers.
  let ly = 10;
  const left = PHASES.map((p) => {
    const v = capex.filter((l) => l.phase === p.id).reduce((s, l) => s + mid(l), 0);
    const n = { id: p.id, label: ({ P1: 'Phase 1', P2: 'Phase 2', P3: 'Phase 3', Power: 'Power', OB: 'OB rig' } as Record<string, string>)[p.id], v, y: ly, h: v * k };
    ly += n.h + gap;
    return n;
  });
  let ry = 10;
  const tiers = ([1, 2, 0] as const).map((t) => {
    const v = capex.filter((l) => l.tier === t).reduce((s, l) => s + mid(l), 0);
    const n = { t, v, y: ry, h: v * k };
    ry += n.h + gap * 3;
    return n;
  });
  const lOff = Object.fromEntries(left.map((n) => [n.id, n.y]));
  const rOff = Object.fromEntries(tiers.map((n) => [n.t, n.y]));
  const flows: { from: string; to: 0 | 1 | 2; v: number }[] = [];
  for (const p of PHASES) for (const t of [1, 2, 0] as const) {
    const v = capex.filter((l) => l.phase === p.id && l.tier === t).reduce((s, l) => s + mid(l), 0);
    if (v > 0) flows.push({ from: p.id, to: t, v });
  }
  const x0 = 140;
  const x1 = W - 190;
  return (
    <ChartCard
      kicker="Evidence behind the capital"
      title="How much of the capex rests on quotes, estimates or gaps"
      note="Ribbon width = midpoint of each quoted range. Gaps without any figure (the OB vehicle) are not drawn."
      rows={flows.map((f) => ({ label: `${f.from} → ${TIER_LABEL[f.to]}`, value: `KSh ${(f.v / 1e6).toFixed(2)}M` }))}
      legend={([1, 2, 0] as const).map((t) => ({ label: TIER_LABEL[t], color: TIER_COLOR[t] }))}
      hostRef={tip.host}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" onPointerLeave={tip.hide}>
        {flows.map((f, i) => {
          const h = f.v * k;
          const ya = lOff[f.from];
          const yb = rOff[f.to];
          lOff[f.from] += h;
          rOff[f.to] += h;
          const d = `M${x0},${ya} C${(x0 + x1) / 2},${ya} ${(x0 + x1) / 2},${yb} ${x1},${yb} L${x1},${yb + h} C${(x0 + x1) / 2},${yb + h} ${(x0 + x1) / 2},${ya + h} ${x0},${ya + h} Z`;
          return (
            <path
              key={i}
              className="c-fade"
              data-series=""
              style={{ '--i': i } as React.CSSProperties}
              d={d}
              fill={TIER_COLOR[f.to]}
              fillOpacity="0.32"
              stroke={TIER_COLOR[f.to]}
              strokeOpacity="0.5"
              onPointerMove={(e) => tip.show(e, <><strong className="block text-brass">{f.from} → {TIER_LABEL[f.to]}</strong>KSh {(f.v / 1e6).toFixed(2)}M</>)}
            />
          );
        })}
        {left.map((n, i) => (
          <g key={n.id} className="c-pop" style={{ '--i': i } as React.CSSProperties}>
            <rect x={x0 - 10} y={n.y} width="10" height={Math.max(2, n.h)} rx="2" fill="var(--color-paper)" />
            <text x={x0 - 16} y={n.y + n.h / 2 + 4} textAnchor="end" fontSize="11" fill="var(--color-sage)">
              {n.label} · {(n.v / 1e6).toFixed(2)}M
            </text>
          </g>
        ))}
        {tiers.map((n, i) => (
          <g key={n.t} className="c-pop" style={{ '--i': i + 5 } as React.CSSProperties}>
            <rect x={x1} y={n.y} width="10" height={Math.max(2, n.h)} rx="2" fill={TIER_COLOR[n.t]} />
            <text x={x1 + 16} y={n.y + n.h / 2 + 4} fontSize="11" fill="var(--color-paper)">
              {TIER_LABEL[n.t]} · {((n.v / total) * 100).toFixed(0)}%
            </text>
          </g>
        ))}
      </svg>
      {tip.node}
    </ChartCard>
  );
}
