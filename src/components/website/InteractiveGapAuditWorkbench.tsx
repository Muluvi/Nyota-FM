import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Filter, Search, ShieldCheck, CheckCircle2, AlertTriangle, FileText, Download } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface AuditItem {
  id: number;
  item: string;
  category: 'Regulatory' | 'Engineering' | 'Commercial' | 'Programming' | 'Operations';
  quarter: string;
  cost: string;
  mitigation: string;
}

const AUDIT_ITEMS: AuditItem[] = [
  { id: 1, item: '10-Year CA Broadcast License Audit & Fee Confirmation', category: 'Regulatory', quarter: 'Q1 2026', cost: 'KSh 120,000 annual', mitigation: 'Audit complete license terms; verify no pending penalty citations with CA Kenya.' },
  { id: 2, item: 'Office of Data Protection Commissioner (ODPC) Registration', category: 'Regulatory', quarter: 'Q1 2026', cost: 'KSh 4,000 (Tier 1)', mitigation: 'Register Nyota FM as data processor for USSD and WhatsApp databases.' },
  { id: 3, item: 'Music Copyright Licenses (MCSK, PRISK, KAMP)', category: 'Regulatory', quarter: 'Q2 2026', cost: 'DATA GAP (Est. KSh 150K)', mitigation: 'Formalize blanket licensing to prevent on-air equipment impoundment.' },
  { id: 4, item: 'Studio Phase 1 Acoustic Soundproofing Panelling', category: 'Engineering', quarter: 'Q1 2026', cost: 'KSh 110K–250K', mitigation: 'Install 20m² acoustic absorption panels to eliminate Bungoma street reverberation.' },
  { id: 5, item: '2× Robotic PTZ Cameras (NDI/HDMI) Procurement', category: 'Engineering', quarter: 'Q1 2026', cost: 'KSh 228,000', mitigation: 'Automated video switching for YouTube and Facebook visual live stream.' },
  { id: 6, item: 'Blackmagic ATEM Video Switcher & Hardware Encoder', category: 'Engineering', quarter: 'Q1 2026', cost: 'KSh 204,999', mitigation: 'Dedicated streaming hardware preventing audio production computer overload.' },
  { id: 7, item: 'Studio Power Generator & UPS Backup Rig', category: 'Engineering', quarter: 'Q2 2026', cost: 'KSh 320,000', mitigation: 'Zero on-air downtime during Western Kenya national grid blackouts.' },
  { id: 8, item: 'Africa\'s Talking WhatsApp Business API Gateway Onboarding', category: 'Operations', quarter: 'Q1 2026', cost: 'KSh 11,000 setup', mitigation: 'Verified green tick WhatsApp presence for automated listener inbound messages.' },
  { id: 9, item: 'Dedicated USSD Shortcode (*...#) Allocation & Telco Link', category: 'Operations', quarter: 'Q2 2026', cost: 'KSh 145,000 setup', mitigation: 'Bridges the 27.42M Kenyan feature phones for zero-data listener participation.' },
  { id: 10, item: 'Government Advertising Agency (GAA) National Register Entry', category: 'Commercial', quarter: 'Q2 2026', cost: 'KSh 100,000 fee', mitigation: 'Unlocks formal access to public sector and ministry civic campaign budgets.' },
  { id: 11, item: 'Bungoma & Kakamega County Government Communications Retainers', category: 'Commercial', quarter: 'Q3 2026', cost: 'Relationship-led', mitigation: 'Annual communication frameworks for governor press updates and public participation.' },
  { id: 12, item: 'Hapa Tulipo Outside Broadcast (OB) Field Vehicle & Rig', category: 'Commercial', quarter: 'Q3 2026', cost: 'KSh 320,000', mitigation: 'Deployable market broadcast unit generating KSh 150K–350K per market day.' },
  { id: 13, item: 'Four Pre-Recorded Show Packages Production & Pilot Master', category: 'Programming', quarter: 'Q2 2026', cost: 'KSh 80,000 pool', mitigation: 'Complete Asuhi ya Imani, Hapa Tulipo Mix, Sauti ya Nchi, and Wanawake wa Twang\'aa.' },
  { id: 14, item: 'SME Bundle Rate Card & Self-Serve Advertiser Web Portal', category: 'Commercial', quarter: 'Q3 2026', cost: 'Internal build', mitigation: 'Transparent rate cards for rural agro-vets, clinics, and hardware businesses.' },
  { id: 15, item: 'Twang\'aa Club Listener Loyalty Engine & M-Pesa Integration', category: 'Operations', quarter: 'Q4 2026', cost: 'KSh 120,000', mitigation: 'Direct listener rewards system driving continuous cross-platform engagement.' },
];

export function InteractiveGapAuditWorkbench() {
  const [checkedIds, setCheckedIds] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('nyota_gap_audit_checked');
      return saved ? JSON.parse(saved) : { 1: true, 2: true, 4: true, 5: true, 8: true };
    } catch (e) {
      return { 1: true, 2: true, 4: true, 5: true, 8: true };
    }
  });

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const toggleCheck = (id: number) => {
    const updated = { ...checkedIds, [id]: !checkedIds[id] };
    setCheckedIds(updated);
    try {
      localStorage.setItem('nyota_gap_audit_checked', JSON.stringify(updated));
    } catch (e) {}
  };

  const filtered = AUDIT_ITEMS.filter((item) => {
    const matchCat = categoryFilter === 'All' || item.category === categoryFilter;
    const matchSearch =
      search.trim() === '' ||
      item.item.toLowerCase().includes(search.toLowerCase()) ||
      item.mitigation.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalCount = AUDIT_ITEMS.length;
  const verifiedCount = Object.values(checkedIds).filter(Boolean).length;
  const progressPct = Math.round((verifiedCount / totalCount) * 100);

  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-[10px] font-bold text-brass uppercase tracking-wider">
              Governance & Compliance
            </span>
            <span className="font-mono text-xs text-sage-dim">· Gap Audit Operational Workbench</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-paper font-semibold mt-1">
            Interactive Operational Readiness & Compliance Audit
          </h3>
          <p className="text-xs sm:text-sm text-sage max-w-2xl mt-0.5">
            Track and verify the 40 essential operational build deliverables, regulatory authorizations, and commercial prequalifications in real time.
          </p>
        </div>

        {/* Live Progress Card */}
        <div className="rounded-xl bg-ink p-3.5 border border-hairline flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-moss/20 text-emerald-400 font-mono font-bold text-base">
            {progressPct}%
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-sage-dim">
              Readiness Score
            </div>
            <div className="font-mono text-xs text-paper font-bold">
              {verifiedCount} of {totalCount} Items Actioned
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-mono text-sage-dim">
          <span>Transformation Milestone Progress</span>
          <span className="text-emerald-400 font-bold">{verifiedCount} / {totalCount} Requirements Closed</span>
        </div>
        <div className="h-2 w-full rounded-full bg-ink overflow-hidden border border-hairline">
          <div
            className="h-full bg-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-dim" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit checklist items, licenses, or vendors..."
            className="w-full rounded-lg bg-ink border border-hairline pl-9 pr-3 py-2 text-xs font-mono text-paper placeholder-sage-dim focus:border-brass focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto font-mono text-xs">
          {['All', 'Regulatory', 'Engineering', 'Commercial', 'Operations'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-2 rounded-lg border whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-brass text-ink font-bold border-brass'
                  : 'bg-ink text-sage hover:text-paper border-hairline'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Audit List */}
      <div className="divide-y divide-hairline rounded-xl bg-ink border border-hairline overflow-hidden max-h-[500px] overflow-y-auto">
        {filtered.map((item) => {
          const isDone = Boolean(checkedIds[item.id]);
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 transition-colors cursor-pointer flex items-start gap-3.5 ${
                isDone ? 'bg-moss/5 hover:bg-moss/10' : 'hover:bg-ink-2'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-sage-dim shrink-0 transition-colors"
                aria-label={isDone ? 'Mark as incomplete' : 'Mark as completed'}
              >
                {isDone ? (
                  <CheckSquare size={18} className="text-emerald-400" />
                ) : (
                  <Square size={18} className="text-sage-dim" />
                )}
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className={`font-display text-base font-semibold ${isDone ? 'line-through text-sage' : 'text-paper'}`}>
                    {item.item}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="rounded bg-hairline px-2 py-0.5 text-sage">
                      {item.category}
                    </span>
                    <span className="rounded bg-brass/20 text-brass px-2 py-0.5 font-bold">
                      {item.quarter}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-sage font-body leading-relaxed">
                  {item.mitigation}
                </p>

                <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-sage-dim">
                  <span>Cost Commitment: <strong className="text-paper">{item.cost}</strong></span>
                  <span className={isDone ? 'text-emerald-400 font-bold' : 'text-sage-dim'}>
                    {isDone ? 'Verified in Audit' : 'Pending Verification'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
