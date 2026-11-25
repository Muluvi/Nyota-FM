import React, { useState } from 'react';
import type { Series } from '../../data/series';
import { ChartCard, useTooltip } from './kit';
import { CountUp } from '../motion/Numbers';

const COLORS = ['var(--color-sage-dim)', 'var(--color-brass)', 'var(--color-moss)', 'var(--color-brick-text)', 'var(--color-sage)'];

/**
 * Donut: segments reveal one after another (radial sweep); hovering or focusing a segment
 * pulls it out and shows its share. The centre counts up to the focus share.
 */
export function Donut({ series, focus, valueFormat = (v: number) => String(v), kicker }: { series: Series; focus: string; valueFormat?: (v: number) => string; kicker?: string }) {
  const tip = useTooltip();
  const [active, setActive] = useState<string | null>(null);
  const total = series.points.reduce((s, p) => s + p.value, 0);
  const R = 80;
  const C = 2 * Math.PI * R;
  let acc = 0;
  const shown = active ?? focus;
  const share = ((series.points.find((p) => p.label === shown)?.value ?? 0) / total) * 100;
  return (
    <ChartCard
      kicker={kicker}
      title={series.title}
      note={series.note}
      sourceId={series.sourceId}
      rows={series.points.map((p) => ({ label: p.label, value: `${valueFormat(p.value)} (${((p.value / total) * 100).toFixed(1)}%)` }))}
      legend={series.points.map((p, i) => ({ label: `${p.label} · ${valueFormat(p.value)}`, color: COLORS[i % COLORS.length] }))}
      hostRef={tip.host}
    >
      <svg viewBox="0 0 240 240" className="mx-auto w-full max-w-[17rem]" onPointerLeave={() => { setActive(null); tip.hide(); }}>
        <g transform="rotate(-90 120 120)">
          <circle cx="120" cy="120" r={R} fill="none" stroke="var(--color-hairline)" strokeWidth="30" opacity="0.4" />
          {series.points.map((p, i) => {
            const len = (p.value / total) * C;
            const mid = ((acc + len / 2) / C) * 2 * Math.PI;
            const off = active === p.label ? 8 : 0;
            const seg = (
              <g key={p.label} style={{ transform: `translate(${Math.cos(mid) * off}px, ${Math.sin(mid) * off}px)`, transition: 'transform 300ms var(--ease-spring)' }}>
                <circle
                  className="c-seg"
                  data-series=""
                  cx="120"
                  cy="120"
                  r={R}
                  fill="none"
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={active === p.label ? 34 : 30}
                  strokeDasharray={`${len - 2} ${C}`}
                  style={{ '--i': i, strokeDashoffset: -acc } as React.CSSProperties}
                  onPointerMove={(e) => {
                    setActive(p.label);
                    tip.show(e, <><strong className="text-brass">{p.label}</strong>: {valueFormat(p.value)} · {((p.value / total) * 100).toFixed(1)}%</>);
                  }}
                />
              </g>
            );
            acc += len;
            return seg;
          })}
        </g>
        <text x="120" y="118" textAnchor="middle" fontSize="30" fontFamily="var(--font-display)" fill="var(--color-paper)">
          {share.toFixed(0)}%
        </text>
        <text x="120" y="140" textAnchor="middle" fontSize="11" fill="var(--color-sage)">
          {shown} share
        </text>
      </svg>
      <p className="sr-only">
        <CountUp value={share} suffix="%" />
      </p>
      {tip.node}
    </ChartCard>
  );
}
