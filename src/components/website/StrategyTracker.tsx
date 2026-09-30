import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Filter, Search, Award, CheckCircle2, ChevronRight, FileDown, Sparkles, Layers } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export interface StrategyBrief {
  id: string;
  num: string;
  title: string;
  category: 'Content & Programming' | 'Studio Build' | 'Digital & Mobile' | 'Commercial & Revenue' | 'Community & Governance';
  quarter: 'Q1 2026' | 'Q2 2026' | 'Q3 2026' | 'Q4 2026' | '2027';
  summary: string;
  kpi: string;
  cost: string;
  tier: 1 | 2;
}

const STRATEGIES: StrategyBrief[] = [
  { id: '5.1', num: '5.1', title: 'Content Creation & 4 Pre-Recorded Shows', category: 'Content & Programming', quarter: 'Q2 2026', summary: 'Produce Asuhi ya Imani, Hapa Tulipo Mix, Sauti ya Nchi, and Wanawake wa Twang\'aa show packages.', kpi: '4 packages on air; KSh 1.2M title sponsorships', cost: 'KSh 80K/mo talent pool', tier: 1 },
  { id: '5.2', num: '5.2', title: 'Studio Build — Phase 1 (Visual Radio)', category: 'Studio Build', quarter: 'Q1 2026', summary: 'Procure 2× PTZ cameras, Blackmagic switcher, and acoustic treatment in Bungoma.', kpi: 'P1 complete; 2× weekly visual livestreams', cost: 'KSh 627,299 – 837,299', tier: 1 },
  { id: '5.3', num: '5.3', title: 'Studio Build — Phase 2 (Multi-Cam)', category: 'Studio Build', quarter: 'Q3 2026', summary: 'Add 4 PTZ cameras, dedicated podcast suite, and control room monitoring.', kpi: 'Full multi-angle broadcast capability', cost: 'KSh 1.6M – 2.4M', tier: 1 },
  { id: '5.4', num: '5.4', title: 'Studio Build — Phase 3 (Full Media Hub)', category: 'Studio Build', quarter: '2027', summary: 'Digital Asset Management system, secondary live studio, and transmitter link.', kpi: 'Pan-Western regional production center', cost: 'KSh 2.8M – 4.2M', tier: 2 },
  { id: '5.5', num: '5.5', title: 'WhatsApp Business API Integration', category: 'Digital & Mobile', quarter: 'Q1 2026', summary: 'Onboard Africa\'s Talking as verified BSP. Deploy broadcast lists and status marketing.', kpi: '50,000 opted-in contacts by Month 6', cost: 'KSh 11,000 setup + $0.038/msg', tier: 1 },
  { id: '5.6', num: '5.6', title: 'USSD Dedicated Shortcode (*...#)', category: 'Digital & Mobile', quarter: 'Q2 2026', summary: 'Deploy interactive USSD menus for listener voting, polling, and agricultural alerts.', kpi: '100,000 monthly sessions; KSh 250K micro-fees', cost: 'KSh 145,000 setup + KSh 70K/mo', tier: 1 },
  { id: '5.7', num: '5.7', title: 'Social Media Channel Architecture', category: 'Digital & Mobile', quarter: 'Q1 2026', summary: 'Disciplined platform matrix across TikTok (organic), FB (community), and YouTube (video).', kpi: '100K YouTube subscribers; 500K TikTok views', cost: 'KSh 60K/mo editor', tier: 2 },
  { id: '5.8', num: '5.8', title: 'Website Redesign & On-Demand Stream', category: 'Digital & Mobile', quarter: 'Q2 2026', summary: 'Modern web presence with embedded live stereo stream, podcasts, and self-serve ad portal.', kpi: '25,000 monthly web visitors; 99.8% uptime', cost: 'KSh 180,000 build', tier: 1 },
  { id: '5.9', num: '5.9', title: 'Mobile App Deployment (Android/iOS)', category: 'Digital & Mobile', quarter: 'Q3 2026', summary: 'Native mobile app with push notifications, offline podcast downloads, and M-Pesa.', kpi: '40,000 active app installations', cost: 'KSh 320,000 development', tier: 2 },
  { id: '5.10', num: '5.10', title: 'YouTube Channel Monetisation & SEO', category: 'Digital & Mobile', quarter: 'Q2 2026', summary: 'Optimize metadata, transcripts, and thumbnails. Partner with local multi-channel network.', kpi: '$1,200/mo YouTube Adsense yield', cost: 'Included in digital team', tier: 1 },
  { id: '5.11', num: '5.11', title: 'Outside Broadcast (OB) Market Circuit', category: 'Commercial & Revenue', quarter: 'Q3 2026', summary: 'Weekly mobile market activations across Chwele, Kitale, Mumias, and Luanda.', kpi: '24 OBs in Year 1; KSh 4.2M gross yield', cost: 'KSh 45K per OB deployment', tier: 1 },
  { id: '5.12', num: '5.12', title: 'Brand Identity & Visual Standards', category: 'Content & Programming', quarter: 'Q1 2026', summary: 'Refreshed logo, typography, presenter photography, and station signage.', kpi: 'Station brand book distributed to 100% staff', cost: 'KSh 250,000 agency fee', tier: 1 },
  { id: '5.13', num: '5.13', title: 'Local Business Advertiser Packages', category: 'Commercial & Revenue', quarter: 'Q2 2026', summary: 'SME bundle rate cards (spot + WhatsApp + live read) for agro-vets, clinics, and hardware stores.', kpi: '30 recurring monthly SME accounts', cost: 'Zero capex; sales commission', tier: 1 },
  { id: '5.14', num: '5.14', title: 'GAA & County Government Desk', category: 'Commercial & Revenue', quarter: 'Q2 2026', summary: 'Prequalification on Government Advertising Agency register and county communications tenders.', kpi: 'KSh 4.5M annual public sector campaign spend', cost: 'KSh 100,000 tender fee', tier: 1 },
  { id: '5.15', num: '5.15', title: 'Merchandise Catalogue & E-Commerce', category: 'Commercial & Revenue', quarter: 'Q3 2026', summary: 'Branded Nyota FM polo shirts, caps, and reflectors distributed via M-Pesa and OB events.', kpi: 'KSh 800,000 gross annual merchandise sales', cost: 'KSh 150K initial stock run', tier: 2 },
  { id: '5.16', num: '5.16', title: 'Syndication & Licensing Framework', category: 'Commercial & Revenue', quarter: '2027', summary: 'License vernacular show formats and agricultural segments to regional community stations.', kpi: '2 syndication contracts signed', cost: 'Legal review KSh 80K', tier: 2 },
  { id: '5.17', num: '5.17', title: 'Diaspora Engagement Hub', category: 'Community & Governance', quarter: '2027', summary: 'Dedicated Sunday night streaming show connecting Western Kenya diaspora in US, UK, and Gulf.', kpi: '5,000 concurrent global stream listeners', cost: 'Zero extra capex', tier: 2 },
  { id: '5.18', num: '5.18', title: 'Twang\'aa Club Loyalty & Points Engine', category: 'Community & Governance', quarter: 'Q4 2026', summary: 'Tiered listener loyalty club (Bronze, Silver, Gold) rewarding on-air check-ins with airtime.', kpi: '60,000 registered club members', cost: 'KSh 120K annual airtime prize pool', tier: 2 },
  { id: '5.19', num: '5.19', title: 'Community Response SLAs & Standards', category: 'Community & Governance', quarter: 'Q2 2026', summary: 'Enforce strict 30-min WhatsApp SLA and editorial fact-checking protocols.', kpi: '95% response compliance on social hotlines', cost: 'Internal policy', tier: 1 },
  { id: '5.20', num: '5.20', title: 'Executive Governance & Commercial Reviews', category: 'Community & Governance', quarter: 'Q1 2026', summary: 'Monthly commercial performance reviews and quarterly independent brand/listenership audits.', kpi: '100% on-time board reporting cadence', cost: 'KSh 150K/qtr audit fee', tier: 1 },
  { id: '5.21', num: '5.21', title: 'Political Advertising Regulatory Code', category: 'Community & Governance', quarter: '2027', summary: 'Pre-election compliance handbook adhering strictly to CA Kenya Programming Code & NCIC rules.', kpi: 'Zero regulatory fines; KSh 6M political cycle ad capture', cost: 'Legal advisory KSh 120K', tier: 1 },
];

export function StrategyTracker() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [endorsed, setEndorsed] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('nyota_endorsed_strategies');
      return saved ? JSON.parse(saved) : { '5.1': true, '5.2': true, '5.5': true, '5.6': true, '5.11': true, '5.14': true };
    } catch (e) {
      return { '5.1': true, '5.2': true, '5.5': true, '5.6': true, '5.11': true, '5.14': true };
    }
  });

  const toggleEndorsement = (id: string) => {
    const updated = { ...endorsed, [id]: !endorsed[id] };
    setEndorsed(updated);
    try {
      localStorage.setItem('nyota_endorsed_strategies', JSON.stringify(updated));
    } catch (e) {}
  };

  const filtered = STRATEGIES.filter((s) => {
    const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchQtr = selectedQuarter === 'All' || s.quarter === selectedQuarter;
    const matchSearch =
      search.trim() === '' ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.summary.toLowerCase().includes(search.toLowerCase()) ||
      s.num.includes(search);
    return matchCat && matchQtr && matchSearch;
  });

  const endorsedCount = Object.values(endorsed).filter(Boolean).length;

  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-[10px] font-bold text-brass uppercase tracking-wider">
              Execution Workbench
            </span>
            <span className="font-mono text-xs text-sage-dim">· 21 Concrete Action Playbooks</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-paper font-semibold mt-1">
            Strategy Implementation & Board Endorsement Matrix
          </h3>
          <p className="text-xs sm:text-sm text-sage max-w-2xl mt-0.5">
            Filter strategies by category, timeline, or keyword. Board members can click to endorse or prioritize strategies to build an aligned execution mandate.
          </p>
        </div>

        {/* Board Alignment Score Pill */}
        <div className="rounded-xl bg-ink p-3 border border-brass/40 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brass/20 text-brass font-mono font-bold text-base">
            {endorsedCount}
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-sage-dim">
              Board Endorsements
            </div>
            <div className="font-mono text-xs text-brass font-bold">
              {endorsedCount} of 21 Strategies Prioritised
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-dim" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search strategy title, KPI, or keyword..."
            className="w-full rounded-lg bg-ink border border-hairline pl-9 pr-3 py-2 text-xs font-mono text-paper placeholder-sage-dim focus:border-brass focus:outline-none"
          />
        </div>

        {/* Category Dropdown / Selector */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg bg-ink border border-hairline px-3 py-2 text-xs font-mono text-paper focus:border-brass focus:outline-none"
        >
          <option value="All">All 5 Strategic Categories</option>
          <option value="Content & Programming">Content & Programming</option>
          <option value="Studio Build">Studio Build</option>
          <option value="Digital & Mobile">Digital & Mobile</option>
          <option value="Commercial & Revenue">Commercial & Revenue</option>
          <option value="Community & Governance">Community & Governance</option>
        </select>

        {/* Quarter Dropdown */}
        <select
          value={selectedQuarter}
          onChange={(e) => setSelectedQuarter(e.target.value)}
          className="rounded-lg bg-ink border border-hairline px-3 py-2 text-xs font-mono text-paper focus:border-brass focus:outline-none"
        >
          <option value="All">All Timelines (Q1 2026 – 2027)</option>
          <option value="Q1 2026">Q1 2026 (Immediate Foundation)</option>
          <option value="Q2 2026">Q2 2026 (Live Visual & Shows)</option>
          <option value="Q3 2026">Q3 2026 (Mobile Scale & OB Circuit)</option>
          <option value="Q4 2026">Q4 2026 (Automation & Loyalty)</option>
          <option value="2027">2027 (Regional Dominance)</option>
        </select>
      </div>

      {/* Strategies Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[620px] overflow-y-auto pr-1">
        {filtered.map((s) => {
          const isEndorsed = Boolean(endorsed[s.id]);
          return (
            <div
              key={s.id}
              className={`rounded-xl border p-4.5 transition-all flex flex-col justify-between space-y-3 ${
                isEndorsed
                  ? 'bg-ink border-brass/60 shadow-md ring-1 ring-brass/30'
                  : 'bg-ink/60 border-hairline hover:border-hairline/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brass px-1.5 py-0.5 rounded bg-brass/10 border border-brass/30">
                      {s.num}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-sage-dim">
                      {s.quarter}
                    </span>
                  </div>
                  <span className="rounded bg-hairline px-2 py-0.5 text-[9px] font-mono text-sage">
                    {s.category}
                  </span>
                </div>

                <h4 className="font-display text-base text-paper font-semibold leading-snug">
                  {s.title}
                </h4>

                <p className="text-xs text-sage leading-relaxed mt-1 font-body">
                  {s.summary}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-hairline/60">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-sage-dim text-[11px]">Primary KPI:</span>
                  <span className="text-paper font-medium text-right truncate max-w-[200px]">{s.kpi}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-sage-dim text-[11px]">Target Budget:</span>
                  <span className="text-emerald-400 font-semibold">{s.cost}</span>
                </div>

                {/* Interactive Endorsement Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleEndorsement(s.id)}
                  className={`w-full flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-mono transition-all font-semibold ${
                    isEndorsed
                      ? 'bg-brass text-ink shadow-sm'
                      : 'bg-ink-2 text-sage hover:text-paper border border-hairline hover:border-brass/40'
                  }`}
                >
                  {isEndorsed ? (
                    <>
                      <CheckCircle2 size={13} className="text-ink" />
                      <span>Endorsed for Execution</span>
                    </>
                  ) : (
                    <>
                      <Square size={13} />
                      <span>Click to Endorse Strategy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
