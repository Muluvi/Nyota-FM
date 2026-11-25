import React from 'react';

const NODES = [
  { label: 'Attention', sub: 'broadcast', x: 150, y: 30 },
  { label: 'Participation', sub: 'WhatsApp / USSD', x: 270, y: 120 },
  { label: 'Proof', sub: 'data, receipts', x: 150, y: 210 },
  { label: 'Better attention', sub: 'sold to advertisers', x: 30, y: 120 },
];

/** The growth loop behind the plan. Static under reduced motion; the dash animation is decorative. */
export function Flywheel() {
  return (
    <figure data-reveal="iris" className="chart rounded-2xl border border-hairline bg-gradient-to-b from-ink-2 to-ink p-5 fx-aurora" data-io="">
      <svg viewBox="0 0 300 240" className="mx-auto w-full max-w-md" role="img" aria-labelledby="flywheel-title flywheel-desc">
        <title id="flywheel-title">The Twang’aa flywheel</title>
        <desc id="flywheel-desc">Attention leads to participation, participation creates proof, proof wins better attention, which feeds attention again.</desc>
        <ellipse cx="150" cy="120" rx="120" ry="90" fill="none" stroke="var(--color-hairline)" strokeWidth="2" />
        <ellipse
          cx="150"
          cy="120"
          rx="120"
          ry="90"
          fill="none"
          stroke="var(--color-brass)"
          strokeWidth="2"
          strokeDasharray="6 10"
          className="motion-safe:animate-[flywheel_8s_linear_infinite]"
        />
        {/* Comet orbiting the loop (CSS offset-path; static under reduced motion). */}
        <circle r="5" fill="var(--color-paper)" className="fx-orbit-path" style={{ filter: 'drop-shadow(0 0 6px var(--color-brass))' }} />
        {NODES.map((n, i) => (
          <g key={n.label} className="c-pop" style={{ '--i': i * 2 } as React.CSSProperties}>
            <circle cx={n.x} cy={n.y} r="7" fill="var(--color-brass)" className="fx-breathe" style={{ transformBox: 'fill-box', transformOrigin: 'center', animationDelay: `${i * 0.8}s` }} />
            <text x={n.x} y={n.y - 12} textAnchor="middle" fill="var(--color-paper)" fontSize="13" fontFamily="var(--font-body)">
              {n.label}
            </text>
            <text x={n.x} y={n.y + 22} textAnchor="middle" fill="var(--color-sage)" fontSize="10" fontFamily="var(--font-body)">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-sage">Each loop feeds the next.</figcaption>
    </figure>
  );
}
