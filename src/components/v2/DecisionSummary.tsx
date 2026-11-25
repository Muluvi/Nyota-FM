import React from 'react';
import { asks } from '../../data/asks';
import { PHASES, phaseTotal, unquotedLines } from '../../data/capex';
import { formatKshRangeM } from '../../data/format';
import { topRisks } from '../../data/risks';
import { paybackStatement } from '../../model/finance';
import { printSection } from '../../lib/print';

/**
 * The 60-second decision summary: what is asked, what it costs, what we know about
 * payback, and the top three risks. Every value is read from src/data or src/model.
 */
export function DecisionSummary({ onNavigate }: { onNavigate: (id: string) => void }) {
  const payback = paybackStatement();
  return (
    <aside id="decision-summary" aria-labelledby="decision-summary-heading" className="rounded-xl border border-brass/60 bg-ink-2 p-5 sm:p-6 shadow-xl">
      <div className="flex items-start justify-between gap-3 border-b border-hairline pb-3">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-brass">Decision summary</p>
          <h2 id="decision-summary-heading" className="font-display text-2xl text-paper">
            {asks.length} decisions for the board
          </h2>
        </div>
        <button
          type="button"
          onClick={() => printSection('decision-summary')}
          className="print:hidden rounded border border-hairline px-3 py-2 text-xs font-mono text-sage hover:border-brass hover:text-paper"
        >
          Print summary
        </button>
      </div>

      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-mono uppercase tracking-wider text-sage-dim">Capital by phase (quoted lines)</dt>
          <dd className="mt-1">
            <ul className="space-y-0.5 text-sm">
              {PHASES.map((p) => (
                <li key={p.id} className="flex justify-between gap-3">
                  <span className="text-sage">{p.label}</span>
                  <span className="font-mono text-paper tabular-nums whitespace-nowrap">{formatKshRangeM(phaseTotal(p.id))}</span>
                </li>
              ))}
            </ul>
            <p className="mt-1 text-xs text-sage-dim">
              Only Phase 1 is asked for now. {unquotedLines().length} line(s) still need quotes.
            </p>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-mono uppercase tracking-wider text-sage-dim">Payback</dt>
          <dd className="mt-1 text-sm text-paper">{payback.headline}</dd>
          <dd className="text-xs text-sage">{payback.detail}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-mono uppercase tracking-wider text-sage-dim">Top risks</dt>
          <dd className="mt-1">
            <ol className="list-decimal space-y-1 pl-5 text-sm text-paper">
              {topRisks.map((r) => (
                <li key={r.id}>
                  {r.title}. <span className="text-sage">{r.mitigation}</span>
                </li>
              ))}
            </ol>
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-mono uppercase tracking-wider text-sage-dim">The asks</dt>
          <dd className="mt-1">
            <ol className="list-decimal space-y-0.5 pl-5 text-sm text-paper">
              {asks.map((a) => (
                <li key={a.id}>
                  {a.title}
                  {a.amount && <span className="font-mono text-brass"> · {a.amount}</span>}
                </li>
              ))}
            </ol>
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2 print:hidden">
        <button type="button" onClick={() => onNavigate('situation')} className="rounded bg-brass px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-ink hover:brightness-110">
          Read the 5-minute case
        </button>
        <button type="button" onClick={() => onNavigate('asks')} className="rounded border border-brass/60 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-brass hover:bg-brass/10">
          Go to the asks
        </button>
      </div>
    </aside>
  );
}
