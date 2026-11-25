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
    <figure className="rounded-xl border border-hairline bg-ink-2 p-5">
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
        {NODES.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="6" fill="var(--color-brass)" />
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
