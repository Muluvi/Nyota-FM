import React, { useState } from 'react';
import { Award, CheckCircle2, Copy, Check, Printer, FileText, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function ExecutiveBriefingMode({
  onClose,
  onNavigate,
}: {
  onClose?: () => void;
  onNavigate: (id: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const decisions = [
    {
      num: '01',
      title: 'Approve Phase 1 Visual Radio Capex Commitment',
      amount: 'KSh 627,299 – 837,299',
      rationale: 'Procures 2× PTZ cameras, Blackmagic switcher, and acoustic treatment in Bungoma. Saves KSh 1.5M vs v1.0.',
      targetId: 'part-6',
    },
    {
      num: '02',
      title: 'Authorise WhatsApp BSP & USSD Infrastructure Procurement',
      amount: 'KSh 156,000 Setup',
      rationale: 'Direct engagement of Africa\'s Talking. Bridges 27.42M Kenyan feature phones and captures direct listener databases.',
      targetId: 'part-5',
    },
    {
      num: '03',
      title: 'Authorize GAA National Advertising Register Prequalification',
      amount: 'KSh 100,000 Prequalification Fee',
      rationale: 'Essential gateway to access KSh 4.5M+ annual national public sector civic campaign budgets and political ads.',
      targetId: 'part-5',
    },
    {
      num: '04',
      title: 'Endorse the 4 Flagship Pre-Recorded Show Packages',
      amount: 'KSh 80,000 / mo Talent Pool',
      rationale: 'Asuhi ya Imani, Hapa Tulipo Mix, Sauti ya Nchi, and Wanawake wa Twang\'aa derivative syndication across YouTube/TikTok.',
      targetId: 'part-1',
    },
    {
      num: '05',
      title: 'Adopt the 8-Quarter Payback & Governance Cadence',
      amount: 'Full Capex Recovery in Month 4–7',
      rationale: 'Monthly commercial performance reviews and quarterly independent brand audits against KARF panel data.',
      targetId: 'part-3',
    },
  ];

  const copyResolutions = () => {
    const text = `NYOTA FM 107.3 · THE TWANG'AA TRANSFORMATION
EXECUTIVE SUMMARY & FIVE BOARD ENDORSEMENTS (SEPTEMBER 2026)

1. Studio Phase 1 Capex Commitment (KSh 627,299 – 837,299)
   Authorized for 2× PTZ cameras, ATEM switcher, and acoustic treatment.
2. Mobile Engagement Infrastructure (KSh 156,000 Setup)
   Authorized for Africa's Talking WhatsApp BSP and USSD shortcode (*...#).
3. Public Sector Revenue Access (KSh 100,000 Fee)
   Authorized for Government Advertising Agency (GAA) prequalification.
4. Four Flagship Pre-Recorded Show Formats (KSh 80,000/mo Talent Pool)
   Authorized for Sunday gospel, Friday DJ mix, civic education, and women's lifestyle.
5. 8-Quarter Payback & Governance Model
   Authorized monthly commercial reviews and quarterly KARF independent brand audits.

All figures backed by 37 verified industry citations (KNBS, CA Kenya, GeoPoll, ReelAnalytics).`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-xl border border-brass/60 bg-ink-2 p-5 sm:p-7 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-[10px] font-bold text-brass uppercase tracking-wider">
              Executive Briefing Mode
            </span>
            <span className="font-mono text-xs text-sage-dim">· 10-Minute Board Decision Memo</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-paper font-semibold mt-1">
            The Five Ownership Endorsements for Immediate Action
          </h3>
          <p className="text-xs sm:text-sm text-sage max-w-2xl mt-0.5">
            Distilled from the 7-Part Master Proposal into five clear capital and operational resolutions requiring formal Board sign-off.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-lg border border-hairline bg-ink px-3 py-2 text-xs font-mono text-sage hover:text-paper hover:border-brass transition-all"
            title="Print executive memo"
          >
            <Printer size={14} />
            <span className="hidden sm:inline">Print Memo</span>
          </button>

          <button
            type="button"
            onClick={copyResolutions}
            className="flex items-center gap-1.5 rounded-lg bg-brass px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-ink font-bold hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Resolutions Copied!' : 'Copy Ballot Text'}</span>
          </button>
        </div>
      </div>

      {/* Five Decision Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {decisions.map((d) => (
          <div
            key={d.num}
            className="rounded-xl bg-ink p-4.5 border border-hairline hover:border-brass/50 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-brass font-bold flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-brass" />
                  RESOLUTION {d.num}
                </span>
                <span className="rounded bg-brass/10 text-brass px-2 py-0.5 text-[10px] font-semibold">
                  {d.amount}
                </span>
              </div>

              <h4 className="font-display text-base text-paper font-semibold leading-snug group-hover:text-brass transition-colors">
                {d.title}
              </h4>

              <p className="text-xs text-sage font-body leading-relaxed mt-1.5">
                {d.rationale}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate(d.targetId)}
              className="flex items-center gap-1.5 text-xs font-mono text-brass hover:underline pt-2 border-t border-hairline/60"
            >
              <span>Inspect Technical Analysis</span>
              <ArrowRight size={12} />
            </button>
          </div>
        ))}

        {/* Board Sign-off Summary Card */}
        <div className="rounded-xl bg-brass/10 p-4.5 border border-brass/40 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 text-brass font-mono text-xs font-bold uppercase mb-2">
              <ShieldCheck size={16} />
              <span>Full Governance Clearance</span>
            </div>
            <h4 className="font-display text-lg text-paper font-bold leading-tight">
              37 Verified Citations & 100% Sourced Receipts
            </h4>
            <p className="text-xs text-sage font-body leading-relaxed mt-1.5">
              Replaces all illustrative assumptions with bankable market realities. Break-even achieved in Month 4–7 under base case econometrics.
            </p>
          </div>

          <div className="pt-2 border-t border-brass/30 flex items-center justify-between text-xs font-mono text-brass">
            <span>Western Kenya 107.3 FM</span>
            <span className="font-bold">Board Action Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
