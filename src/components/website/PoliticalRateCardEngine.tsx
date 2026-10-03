import React, { useState } from 'react';
import { Award, ShieldAlert, FileText, CheckCircle2, DollarSign, Scale, AlertTriangle, ShieldCheck } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function PoliticalRateCardEngine() {
  const [candidateOffice, setCandidateOffice] = useState<'Governor' | 'Senator' | 'Woman Rep' | 'Member of Parliament' | 'MCA'>('Governor');
  const [adFormat, setAdFormat] = useState<'60s Prime Spot' | '1-Hour Studio Townhall' | 'Outside Broadcast Rally Relay'>('1-Hour Studio Townhall');
  const [advanceDepositPaid, setAdvanceDepositPaid] = useState<boolean>(true);
  const [ncicIndemnitySigned, setNcicIndemnitySigned] = useState<boolean>(true);

  const rates = {
    '60s Prime Spot': 6500, // Premium political spot rate (statutory cash-in-advance)
    '1-Hour Studio Townhall': 180000, // Live interview special
    'Outside Broadcast Rally Relay': 350000, // Full OB van deployment to rally grounds
  };

  const statutoryEscrowKsh = candidateOffice === 'Governor' ? 100000 : candidateOffice === 'Member of Parliament' ? 50000 : 25000;
  const cost = rates[adFormat];
  const totalCommitment = cost + statutoryEscrowKsh;

  const isCompliant = advanceDepositPaid && ncicIndemnitySigned;

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <Scale size={14} />
            <span className="uppercase tracking-widest font-semibold">Regulatory Compliance · Strategy 5.21</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Communications Authority of Kenya (CA) & NCIC Section 46 Regulations" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Political Campaign Advertising & Statutory Compliance Engine
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Simulate rate card commitments, mandatory advance cash escrow deposits, and NCIC hate-speech indemnity verification for 2027 General Election candidates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded text-xs font-mono font-bold border flex items-center gap-1.5 ${
            isCompliant
              ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400'
              : 'bg-red-500/15 border-red-500/50 text-red-400'
          }`}>
            <span className={`h-2 w-2 rounded-full ${isCompliant ? 'bg-emerald-400' : 'bg-red-400'}`} />
            <span>{isCompliant ? 'CA COMPLIANCE CLEARED' : 'PENDING INDEMNITY / CASH'}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Candidate Configuration */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-4 space-y-3.5">
            <div>
              <label className="text-xs font-mono text-sage-dim uppercase tracking-wider block mb-1">
                Electoral Contest & Office
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['Governor', 'Senator', 'Woman Rep', 'Member of Parliament', 'MCA'] as const).map((off) => (
                  <button
                    key={off}
                    type="button"
                    onClick={() => setCandidateOffice(off)}
                    className={`py-2 px-2 rounded text-xs font-mono transition-all border ${
                      candidateOffice === off
                        ? 'border-brass bg-brass text-ink font-bold'
                        : 'border-hairline bg-ink-2 text-sage hover:text-paper'
                    }`}
                  >
                    {off}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-sage-dim uppercase tracking-wider block mb-1">
                Airtime Format
              </label>
              <div className="space-y-1.5">
                {(['60s Prime Spot', '1-Hour Studio Townhall', 'Outside Broadcast Rally Relay'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setAdFormat(fmt)}
                    className={`w-full p-2.5 rounded border text-left text-xs font-mono flex items-center justify-between transition-all ${
                      adFormat === fmt
                        ? 'border-brass bg-brass/10 text-paper font-semibold'
                        : 'border-hairline bg-ink-2 text-sage hover:text-paper'
                    }`}
                  >
                    <span>{fmt}</span>
                    <span className="text-brass font-bold">KSh {rates[fmt].toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Compliance Toggles */}
            <div className="pt-2 border-t border-hairline space-y-2 text-xs font-mono">
              <label className="flex items-center gap-2 cursor-pointer text-sage hover:text-paper">
                <input
                  type="checkbox"
                  checked={advanceDepositPaid}
                  onChange={(e) => setAdvanceDepositPaid(e.target.checked)}
                  className="accent-brass"
                />
                <span>100% Cash-in-Advance Escrow Deposited (CA Strict Rule: No Credit)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sage hover:text-paper">
                <input
                  type="checkbox"
                  checked={ncicIndemnitySigned}
                  onChange={(e) => setNcicIndemnitySigned(e.target.checked)}
                  className="accent-brass"
                />
                <span>NCIC Hate Speech & Defamation Legal Indemnity Executed</span>
              </label>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-hairline bg-ink p-5 space-y-4 text-xs font-mono">
            <span className="text-[10px] text-brass uppercase tracking-wider font-bold block">
              STATUTORY ELECTION RATE CARD SUMMARY
            </span>

            <div className="space-y-2 divide-y divide-hairline">
              <div className="flex justify-between pt-1">
                <span className="text-sage">Broadcast Airtime Package</span>
                <span className="text-paper font-bold tabular-nums">KSh {cost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sage">Statutory Defamation Escrow Bond</span>
                <span className="text-paper font-bold tabular-nums">KSh {statutoryEscrowKsh.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sage">Equitable Access Registry Entry</span>
                <span className="text-emerald-400 font-semibold">CA Verified</span>
              </div>
            </div>

            <div className="rounded-lg bg-ink-2 border border-hairline p-3 flex items-center justify-between">
              <span className="text-sage-dim">Total Cleared Commitment</span>
              <span className="font-display text-xl font-bold text-brass tabular-nums">
                KSh {totalCommitment.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded bg-ink-2 border border-hairline/80 text-[11px] font-sans text-sage leading-relaxed space-y-1">
              <p className="font-semibold text-paper">Communications Authority Section 46 Mandate:</p>
              <p>
                Broadcasters must ensure all political campaign messages are vetted by the station legal editor. Live call-in segments require a minimum 7-second audio delay to prevent live broadcast of inciting remarks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
