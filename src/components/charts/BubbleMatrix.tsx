import React from 'react';
import { levers, leverMidpoint } from '../../data/levers';
import { ChartCard, useTooltip } from './kit';
import { linear } from './scale';

const COLOR = { Low: 'var(--color-moss)', Medium: 'var(--color-brass)', High: 'var(--color-brick-text)' } as const;

/**
 * Revenue levers as bubbles: x = months to first revenue, y = annual mid-range revenue,
 * size = width of the revenue range (uncertainty), colour = difficulty. Bubbles drop in
 * one by one. Probability of success is not plotted: it has not been agreed yet.
 */
export function BubbleMatrix() {
  const tip = useTooltip();
  const W = 560;
  const H = 320;
  const P = { l: 54, r: 20, t: 16, b: 40 };
  const maxY = Math.max(...levers.map(leverMidpoint));
  const x = linear([0, 14], [P.l, W - P.r]);
  const y = linear([0, maxY * 1.15], [H - P.b, P.t]);
  const maxSpan = Math.max(...levers.map((l) => l.highKsh - l.lowKsh));
  const r = (l: (typeof levers)[number]) => 7 + ((l.highKsh - l.lowKsh) / maxSpan) * 22;
  return (
    <ChartCard
      kicker="Opportunity map"
      title="Revenue levers: size, speed and difficulty"
      note="Bubble size shows how wide each revenue range is. Probabilities of success are not yet agreed, so they are not plotted."
      rows={levers.map((l) => ({ label: l.name, value: `KSh ${(l.lowKsh / 1e6).toFixed(1)}–${(l.highKsh / 1e6).toFixed(1)}M a year; first revenue month ${l.monthsToFirstRevenue}; ${l.difficulty}` }))}
      legend={(['Low', 'Medium', 'High'] as const).map((d) => ({ label: `${d} difficulty`, color: COLOR[d] }))}
      hostRef={tip.host}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-3xl" onPointerLeave={tip.hide}>
        <g className="c-grid">
          {[0, 3, 6, 9, 12].map((m) => (
            <g key={m}>
              <line x1={x(m)} x2={x(m)} y1={P.t} y2={H - P.b} stroke="var(--color-hairline)" strokeDasharray="2 4" />
              <text x={x(m)} y={H - P.b + 16} textAnchor="middle" fontSize="10" fill="var(--color-sage-dim)">
                {m}
              </text>
            </g>
          ))}
          {[0, 2, 4, 6].map((v) => (
            <g key={v}>
              <line x1={P.l} x2={W - P.r} y1={y(v * 1e6)} y2={y(v * 1e6)} stroke="var(--color-hairline)" strokeDasharray="2 4" />
              <text x={P.l - 8} y={y(v * 1e6) + 3} textAnchor="end" fontSize="10" fill="var(--color-sage-dim)">
                {v}M
              </text>
            </g>
          ))}
          <text x={(P.l + W - P.r) / 2} y={H - 4} textAnchor="middle" fontSize="11" fill="var(--color-sage)">
            Months to first revenue →
          </text>
          <text x={14} y={H / 2} textAnchor="middle" fontSize="11" fill="var(--color-sage)" transform={`rotate(-90 14 ${H / 2})`}>
            Annual revenue, mid-range (KSh) →
          </text>
        </g>
        {[...levers]
          .sort((a, b) => r(b) - r(a))
          .map((l, i) => (
            <g
              key={l.id}
              className="c-drop"
              data-series=""
              style={{ '--i': i } as React.CSSProperties}
              onPointerMove={(e) =>
                tip.show(
                  e,
                  <>
                    <strong className="block text-brass">{l.name}</strong>
                    KSh {(l.lowKsh / 1e6).toFixed(1)}–{(l.highKsh / 1e6).toFixed(1)}M a year
                    <span className="block text-sage">
                      {l.timeLabel} · {l.difficulty} difficulty
                    </span>
                  </>,
                )
              }
            >
              <circle cx={x(l.monthsToFirstRevenue)} cy={y(leverMidpoint(l))} r={r(l)} fill={COLOR[l.difficulty]} fillOpacity="0.28" stroke={COLOR[l.difficulty]} strokeWidth="1.5" />
              <circle cx={x(l.monthsToFirstRevenue)} cy={y(leverMidpoint(l))} r="2.5" fill={COLOR[l.difficulty]} />
            </g>
          ))}
      </svg>
      {tip.node}
    </ChartCard>
  );
}
