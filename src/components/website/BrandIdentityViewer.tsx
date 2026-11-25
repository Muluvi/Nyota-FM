import React from 'react';
import { Illustrative } from '../Illustrative';
import { palette, typefaces, contrast } from '../../data/brand';

const INK = '#090B0A';

/**
 * Brand preview generated from the live theme tokens. The full brand book is still to
 * be compiled (Checklist B #36); this shows what the site actually uses today.
 */
export function BrandIdentityViewer() {
  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper">Brand system in use</h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Generated from the site&apos;s theme tokens, with contrast against the ink background. The logo is a placeholder wordmark
            until the official light and dark logos are supplied.
          </p>
        </div>
        <Illustrative note="Placeholder wordmark; brand book not yet compiled" />
      </div>

      <div className="flex flex-wrap items-center gap-6 rounded-lg border border-hairline bg-ink p-4">
        <img src="/brand/nyota-logo.svg" alt="Nyota FM 107.3 wordmark (placeholder)" width={240} height={48} />
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {palette.map((c) => {
          const ratio = contrast(c.hex, INK);
          const grade = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large' : 'decorative';
          return (
            <li key={c.token} className="rounded border border-hairline bg-ink p-2 text-xs">
              <span className="block h-10 rounded" style={{ background: c.hex }} aria-hidden="true" />
              <span className="mt-1 block font-mono text-paper">{c.token}</span>
              <span className="block font-mono text-sage-dim">{c.hex}</span>
              <span className="block text-sage">{c.role}</span>
              <span className="block font-mono text-sage">
                {ratio.toFixed(2)}:1 on ink · {grade}
              </span>
            </li>
          );
        })}
      </ul>

      <ul className="grid gap-2 sm:grid-cols-3">
        {typefaces.map((t) => (
          <li key={t.role} className="rounded border border-hairline bg-ink p-3">
            <span className="block text-[11px] font-mono uppercase text-sage-dim">{t.role}</span>
            <span className={`block text-xl text-paper ${t.role === 'Display' ? 'font-display' : t.role === 'Figures' ? 'font-mono tabular-nums' : 'font-body'}`}>
              {t.role === 'Figures' ? '1,234,567.89' : 'Hapa Tulipo, Twang’aa'}
            </span>
            <span className="block text-xs text-sage">
              {t.family} · {t.note}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
