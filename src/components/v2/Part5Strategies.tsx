import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, DollarSign, Calendar, Clock, Users, Video, 
  Share2, ShieldCheck, ChevronRight, ChevronDown, ChevronUp, Search, Radio
} from 'lucide-react';
import { TierBadge } from './TierBadge';
import { Reveal } from '../ledger/Reveal';
import { strategies } from '../../data/strategies';
import { StrategyTracker } from '../website/StrategyTracker';
import { TwangaaMobileSimulator } from '../website/TwangaaMobileSimulator';
import { CivicNoticeBuilder } from '../website/CivicNoticeBuilder';
import { PoliticalRateCardEngine } from '../website/PoliticalRateCardEngine';
import { DiasporaHub } from '../website/DiasporaHub';
import { LoyaltyClubEngine } from '../website/LoyaltyClubEngine';
import { EditorialPolicyHandbook } from '../website/EditorialPolicyHandbook';


export function Part5Strategies() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>('5.1');

  const categories = [
    'all',
    'Content & Programming',
    'Studio Build',
    'Digital & Mobile',
    'Commercial & Revenue',
    'Community & Governance'
  ];

  const filtered = strategies.filter((st) => {
    const matchesCat = selectedCategory === 'all' || st.category === selectedCategory;
    const matchesQuery =
      st.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.strategy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.num.includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Interactive 21 Strategies Implementation & Board Endorsement Matrix */}
      <Reveal>
        <StrategyTracker />
      </Reveal>

      {/* Interactive USSD & WhatsApp Mobile Listener Journey Simulator */}
      <Reveal>
        <TwangaaMobileSimulator />
      </Reveal>

      {/* County Government Public Civic Notice & Townhall Generator */}
      <Reveal>
        <CivicNoticeBuilder />
      </Reveal>

      {/* 2027 Election Political Advertising & Statutory Compliance Engine */}
      <Reveal>
        <PoliticalRateCardEngine />
      </Reveal>

      {/* Global Western Diaspora Streaming Hub & Remittance Media Gateway */}
      <Reveal>
        <DiasporaHub />
      </Reveal>

      {/* Twang'aa Club Listener Loyalty & M-Pesa Rewards Engine */}
      <Reveal>
        <LoyaltyClubEngine />
      </Reveal>

      {/* Code of Editorial Conduct & Fact-Checking Handbook */}
      <Reveal>
        <EditorialPolicyHandbook />
      </Reveal>

      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
            <div>
              <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
                PART 5 · THE 21 ACTION STRATEGIES
              </span>
              <h4 className="font-display text-paper text-base font-semibold">
                Comprehensive Implementation Plans (5.1 through 5.21)
              </h4>
              <p className="text-xs text-sage mt-0.5">
                Every strategy includes rationale, verified data receipts, budget, leads, specific revenue mechanisms, and measurable milestone KPIs.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-moss/20 text-emerald-300 border border-moss/60 font-semibold self-start sm:self-auto">
              21 / 21 Fully Detailed
            </span>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-dim pointer-events-none" />
              <input
                type="text"
                placeholder="Search strategies (e.g. USSD, Studio, YouTube, WhatsApp, Politics)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-ink border border-hairline rounded pl-9 pr-3 py-2 text-paper focus:border-brass focus:outline-none text-xs"
              />
            </div>
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded whitespace-nowrap text-[11px] transition-colors ${
                    selectedCategory === cat
                      ? 'bg-brass text-ink font-bold'
                      : 'bg-ink text-sage hover:text-paper hover:bg-hairline'
                  }`}
                >
                  {cat === 'all' ? 'All (21)' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Strategy Accordion Items */}
          <div className="space-y-3 pt-2">
            {filtered.map((st) => {
              const isExpanded = expandedStrategy === st.id;
              return (
                <div
                  key={st.id}
                  className="bg-ink rounded border border-hairline overflow-hidden transition-all duration-200"
                >
                  {/* Strategy Header */}
                  <div
                    onClick={() => setExpandedStrategy(isExpanded ? null : st.id)}
                    className="p-4 flex items-start sm:items-center justify-between cursor-pointer hover:bg-ink-2 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-brass/10 border border-brass/40 text-brass shrink-0">
                        {st.num}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase text-sage-dim tracking-wider">
                            {st.category}
                          </span>
                        </div>
                        <h4 className="font-display text-sm sm:text-base text-paper font-medium">
                          {st.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden md:inline font-mono text-[11px] text-sage">
                        {st.execution.timeline}
                      </span>
                      <button className="text-sage hover:text-paper p-1">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 pt-1 border-t border-hairline space-y-4 text-xs font-body">
                      {/* Strategy statement */}
                      <div className="p-3 bg-ink-2 rounded border border-hairline">
                        <strong className="text-brass font-mono uppercase tracking-wider text-[10px] block mb-1">
                          Strategic Action Statement
                        </strong>
                        <p className="text-paper/95 leading-relaxed sm:text-[13px]">
                          {st.strategy}
                        </p>
                      </div>

                      {/* Why it works & Data Receipts */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-ink-2 rounded border border-hairline space-y-1">
                          <strong className="text-paper font-mono uppercase tracking-wider text-[10px] block">
                            Why This Strategy Works
                          </strong>
                          <p className="text-sage leading-relaxed">
                            {st.whyThisWorks}
                          </p>
                        </div>

                        <div className="p-3 bg-moss/10 rounded border border-moss/40 space-y-1.5 font-mono">
                          <strong className="text-emerald-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
                            <CheckCircle2 size={11} /> Data Receipts
                          </strong>
                          <ul className="space-y-1 text-[11px] text-sage">
                            {st.dataReceipts.map((rcpt, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-400">•</span>
                                <span>{rcpt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Execution Details & Revenue Mechanism */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                        <div className="p-2.5 bg-ink-2 rounded border border-hairline">
                          <span className="text-sage-dim text-[10px] block uppercase">Operational Lead</span>
                          <span className="text-paper font-semibold block mt-0.5">{st.execution.lead}</span>
                        </div>
                        <div className="p-2.5 bg-ink-2 rounded border border-hairline">
                          <span className="text-sage-dim text-[10px] block uppercase">Allocated Budget</span>
                          <span className="text-brass font-bold block mt-0.5">{st.execution.budget}</span>
                        </div>
                        <div className="p-2.5 bg-ink-2 rounded border border-hairline">
                          <span className="text-sage-dim text-[10px] block uppercase">Deployment Window</span>
                          <span className="text-paper font-semibold block mt-0.5">{st.execution.timeline}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-ink-2 rounded border border-brass/40 space-y-1 font-mono">
                        <span className="text-brass text-[10px] font-bold uppercase tracking-wider block">
                          Specific Revenue Generation Mechanism
                        </span>
                        <p className="text-paper/90 font-body text-xs leading-relaxed">
                          {st.revenueMechanism}
                        </p>
                      </div>

                      {/* Milestone KPIs Table if present */}
                      {st.kpiMilestones && (
                        <div className="space-y-1.5">
                          <span className="text-paper font-mono text-xs font-semibold block">
                            Milestone Scorecard (Months 3 to 24)
                          </span>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs font-mono">
                              <thead>
                                <tr className="border-b border-hairline text-sage-dim">
                                  <th className="py-1.5 pr-2">Metric</th>
                                  <th className="py-1.5 px-2">3 Months</th>
                                  <th className="py-1.5 px-2">6 Months</th>
                                  <th className="py-1.5 px-2">12 Months</th>
                                  <th className="py-1.5 pl-2">24 Months</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-hairline text-paper/90">
                                {st.kpiMilestones.map((kpi, kIdx) => (
                                  <tr key={kIdx} className="hover:bg-ink-2">
                                    <td className="py-2 pr-2 text-brass font-medium">{kpi.metric}</td>
                                    <td className="py-2 px-2">{kpi.m3}</td>
                                    <td className="py-2 px-2 text-sage">{kpi.m6}</td>
                                    <td className="py-2 px-2 text-paper font-semibold">{kpi.m12}</td>
                                    <td className="py-2 pl-2 text-emerald-400 font-bold">{kpi.m24}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Simple KPIs list if present */}
                      {st.simpleKpis && (
                        <div className="p-3 bg-ink-2 rounded border border-hairline space-y-1 font-mono text-xs">
                          <span className="text-paper font-semibold text-[11px] block">Key Target Deliverables:</span>
                          <ul className="space-y-1 text-sage text-[11px]">
                            {st.simpleKpis.map((skpi, sIdx) => (
                              <li key={sIdx} className="flex items-center gap-2">
                                <span className="text-brass">✔</span>
                                <span>{skpi}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
