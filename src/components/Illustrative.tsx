import React from 'react';

/**
 * Marks content that is an example, not evidence: invented people, sample prices,
 * placeholder sponsors or demo results. Use instead of a Tier 1 badge.
 */
export function Illustrative({ note = 'Example only, not evidence' }: { note?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded border border-sage-dim/60 bg-ink px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-sage"
      title={note}
    >
      <span className="size-1.5 rounded-full bg-sage-dim" aria-hidden="true" />
      Illustrative
      <span className="sr-only">: {note}</span>
    </span>
  );
}
