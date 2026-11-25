import React from 'react';
import { AlertTriangle, CheckCircle2, CircleDashed } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

/**
 * The previous simulator credited all station revenue (including an unaudited
 * KSh 1.2 M/month spot baseline) to the studio capex, which produced a 1-month
 * payback and a +4,621% 24-month return. Those outputs are withdrawn until the
 * incremental model is rebuilt on audited inputs.
 */
const INPUTS: { label: string; detail: string; status: 'have' | 'partial' | 'missing' }[] = [
  { label: 'Capex by phase', detail: 'Phase 1 KSh 627,299–837,299 quoted; power, OB rig and podcast-room gear still to be added to later phases.', status: 'partial' },
  { label: 'Audited baseline revenue', detail: 'Last 24 months of management accounts, split spot / sponsorship / OB / digital. Needed to measure what the plan adds.', status: 'missing' },
  { label: 'New revenue by stream', detail: 'Non-spot levers (OB, branded shows, WhatsApp/USSD, county desk, digital) with ramp-up and probability of success.', status: 'partial' },
  { label: 'Cannibalised spot revenue', detail: 'Spot inventory displaced by sponsored formats.', status: 'missing' },
  { label: 'Incremental opex', detail: 'New hires KSh 370–630K/month (Part 6.3), USSD KSh 70K/month, messaging, show production, paid social, royalties.', status: 'partial' },
  { label: 'Discount rate', detail: 'Board-set hurdle rate, e.g. the company’s bank lending rate.', status: 'missing' },
];

const icon = {
  have: <CheckCircle2 size={14} className="text-moss shrink-0 mt-0.5" />,
  partial: <CircleDashed size={14} className="text-brass shrink-0 mt-0.5" />,
  missing: <AlertTriangle size={14} className="text-brick shrink-0 mt-0.5" />,
};
const statusLabel = { have: 'Available', partial: 'Partial', missing: 'Missing' };

export function InteractivePaybackSimulator() {
  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <span className="rounded bg-brick/20 px-2 py-0.5 font-mono text-[11px] font-bold text-paper uppercase tracking-wider">
            Model under revision
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-paper mt-2 font-semibold">Payback model</h3>
          <p className="text-xs sm:text-sm text-sage max-w-2xl mt-1">
            Payback is <strong className="text-paper">to be confirmed after the baseline audit</strong>. Earlier versions of this tool
            credited the station&apos;s entire revenue, including an unaudited spot baseline, to the studio investment. That produced
            results no board should rely on, so they have been withdrawn.
          </p>
        </div>
        <TierBadge tier={0} gapMethod="Audited revenue baseline (management accounts) and an incremental opex budget" timeline="After the baseline audit (Ask 6)" />
      </div>

      <div className="rounded-lg bg-ink p-4 border border-hairline space-y-2">
        <div className="text-[11px] font-mono uppercase text-sage-dim tracking-wider font-semibold">Method (incremental cash flow)</div>
        <p className="font-mono text-xs sm:text-sm text-paper leading-relaxed">
          Δcash<sub>t</sub> = (new revenue<sub>t</sub> − cannibalised spot<sub>t</sub>) − new opex<sub>t</sub> − capex<sub>t</sub>
        </p>
        <p className="text-xs text-sage leading-relaxed">
          Each month is discounted at a board-set rate. Outputs: payback month (or &ldquo;not within 24 months&rdquo;), NPV, peak funding
          need, and a sensitivity chart showing which assumptions move payback most. Results will be shown to no more than three
          significant figures, with base, worst and best cases.
        </p>
      </div>

      <div>
        <div className="text-[11px] font-mono uppercase text-sage-dim tracking-wider font-semibold mb-2">Inputs the model needs</div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {INPUTS.map((i) => (
            <li key={i.label} className="flex gap-2.5 rounded-lg bg-ink p-3 border border-hairline">
              {icon[i.status]}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-paper font-semibold">{i.label}</span>
                  <span className="text-[11px] font-mono text-sage-dim">{statusLabel[i.status]}</span>
                </div>
                <p className="text-xs text-sage leading-relaxed mt-0.5">{i.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-sage-dim font-mono">
        Ask 6 funds the baseline audit and audience survey that unlock this model.
      </p>
    </div>
  );
}
