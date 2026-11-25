import React, { useState } from 'react';
import { Copy, Check, Printer, ArrowRight, AlertTriangle, X } from 'lucide-react';
import { asks } from '../../data/asks';
import { monthZero } from '../../data/station';
import { paybackStatement } from '../../model/finance';
import { printSection } from '../../lib/print';

export function ExecutiveBriefingMode({
  onClose,
  onNavigate,
}: {
  onClose?: () => void;
  onNavigate: (id: string) => void;
}) {
  const [copied, setCopied] = useState<'idle' | 'ok' | 'failed'>('idle');

  const ballotText = [
    "NYOTA FM 107.3 · THE TWANG'AA TRANSFORMATION",
    `PROPOSED RESOLUTIONS OF THE BOARD (draft for discussion; timing relative to ${monthZero.label}, assumed ${monthZero.assumed})`,
    '',
    ...asks.map((a) => `${a.id}. ${a.resolution}${a.amount ? ` [${a.amount}]` : ''}\n   Owner: ${a.owner} · Timing: ${a.timing}`),
    '',
    `Payback: ${paybackStatement().headline}. ${paybackStatement().detail}`,
  ].join('\n');

  const copyResolutions = async () => {
    try {
      await navigator.clipboard.writeText(ballotText);
      setCopied('ok');
    } catch {
      setCopied('failed');
    }
    setTimeout(() => setCopied('idle'), 2500);
  };

  const handlePrint = () => printSection('executive-briefing');

  return (
    <div
      id="executive-briefing"
      role="region"
      aria-label="Executive briefing"
      className="mx-auto mt-20 w-full max-w-7xl px-4 sm:px-6"
    >
      <div className="rounded-xl border border-brass/60 bg-ink-2 p-5 sm:p-7 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-hairline pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-[11px] font-bold text-brass uppercase tracking-wider">
                Executive Briefing
              </span>
              <span className="font-mono text-xs text-sage-dim">· 5-minute decision memo</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-paper font-semibold mt-1">
              Six decisions requested of the board
            </h3>
            <p className="text-xs sm:text-sm text-sage max-w-2xl mt-0.5">
              The same six asks set out at the end of the proposal. Timing is relative to {monthZero.label}, the month of board
              approval (assumed {monthZero.assumed}).
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-hairline bg-ink px-3 py-2 text-xs font-mono text-sage hover:text-paper hover:border-brass transition-all"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print memo</span>
            </button>
            <button
              type="button"
              onClick={copyResolutions}
              className="flex items-center gap-1.5 rounded-lg bg-brass px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-ink font-bold hover:brightness-110 active:scale-95 transition-all shadow-md"
            >
              {copied === 'ok' ? <Check size={14} /> : <Copy size={14} />}
              <span aria-live="polite">
                {copied === 'ok' ? 'Copied' : copied === 'failed' ? 'Copy failed' : 'Copy resolutions'}
              </span>
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-lg border border-hairline text-sage hover:text-paper hover:border-brass"
                aria-label="Close briefing"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {asks.map((a) => (
            <li
              key={a.id}
              className="rounded-xl bg-ink p-4 border border-hairline hover:border-brass/50 transition-colors flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono mb-2">
                  <span className="text-brass font-bold">ASK {a.id}</span>
                  <span className="rounded bg-brass/10 text-brass px-2 py-0.5 text-[11px] font-semibold">
                    {a.amount ?? a.timing}
                  </span>
                </div>
                <h4 className="font-display text-base text-paper font-semibold leading-snug">{a.title}</h4>
                <p className="text-xs text-sage font-body leading-relaxed mt-1.5">{a.detail}</p>
                <p className="text-[11px] text-sage-dim font-mono mt-1.5">
                  Owner: {a.owner} · {a.timing}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate(a.sectionId)}
                className="flex items-center gap-1.5 text-xs font-mono text-brass hover:underline pt-2 border-t border-hairline/60 print:hidden"
              >
                <span>See the supporting analysis</span>
                <ArrowRight size={12} />
              </button>
            </li>
          ))}
        </ol>

        <div className="rounded-xl bg-brick/10 p-4 border border-brick/40 flex gap-3">
          <AlertTriangle size={18} className="text-brick-text shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display text-base text-paper font-semibold">What is not yet known</h4>
            <p className="text-xs text-sage font-body leading-relaxed mt-1">
              Payback is <strong className="text-paper">{paybackStatement().headline.toLowerCase()}</strong>. {paybackStatement().detail} The
              station has no audited revenue baseline and no Western Kenya audience survey yet; Ask 6 funds both.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
