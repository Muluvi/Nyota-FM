import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Filter, Search, Award, CheckCircle2, ChevronRight, FileDown, Sparkles, Layers } from 'lucide-react';
import { strategies, type StrategyItem } from '../../data/strategies';
import { monthRangeLabel, monthToQuarterLabel } from '../../data/timeline';

type StrategyBrief = {
  id: string;
  num: string;
  title: string;
  category: StrategyItem['category'];
  quarter: string;
  window: string;
  summary: string;
  kpi: string;
  cost: string;
};

const quarterBucket = (startMonth: number) =>
  startMonth > 12 ? '2028 (Months 13–24)' : monthToQuarterLabel(startMonth);

/** Same 21 strategies as Part 5 (src/data/strategies.ts), condensed for the shortlist. */
const STRATEGIES: StrategyBrief[] = strategies.map((s) => ({
  id: s.id,
  num: s.num,
  title: s.title,
  category: s.category,
  quarter: quarterBucket(s.startMonth),
  window: monthRangeLabel(s.startMonth, s.endMonth),
  summary: s.strategy,
  kpi: s.simpleKpis?.[0] ?? (s.kpiMilestones?.[0] ? `${s.kpiMilestones[0].metric}: ${s.kpiMilestones[0].m24} by Month 24` : 'See Part 5'),
  cost: s.execution.budget,
}));

const QUARTERS = Array.from(new Set(STRATEGIES.map((s) => s.quarter))).sort((x, y) => {
  const key = (q: string) => (q.startsWith('2028') ? 99 : Number(q.slice(-4)) * 4 + Number(q[1]));
  return key(x) - key(y);
});

export function StrategyTracker() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [endorsed, setEndorsed] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('nyota_shortlist_strategies');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const toggleEndorsement = (id: string) => {
    const updated = { ...endorsed, [id]: !endorsed[id] };
    setEndorsed(updated);
    try {
      localStorage.setItem('nyota_shortlist_strategies', JSON.stringify(updated));
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
            <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-xs font-bold text-brass uppercase tracking-wider">
              Execution Workbench
            </span>
            <span className="font-mono text-xs text-sage-dim">· 21 Concrete Action Playbooks</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-paper font-semibold mt-1">
            Strategy Shortlist Matrix
          </h3>
          <p className="text-xs sm:text-sm text-sage max-w-2xl mt-0.5">
            Filter strategies by category, timeline, or keyword. Shortlist strategies to discuss. Your shortlist is saved in this browser only; it is not a board decision.
          </p>
        </div>

        {/* Board Alignment Score Pill */}
        <div className="rounded-xl bg-ink p-3 border border-brass/40 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brass/20 text-brass font-mono font-bold text-base">
            {endorsedCount}
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-sage-dim">
              Your Shortlist
            </div>
            <div className="font-mono text-xs text-brass font-bold">
              {endorsedCount} of 21 shortlisted (this browser)
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
          aria-label="Filter"
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
          aria-label="Filter"
          value={selectedQuarter}
          onChange={(e) => setSelectedQuarter(e.target.value)}
          className="rounded-lg bg-ink border border-hairline px-3 py-2 text-xs font-mono text-paper focus:border-brass focus:outline-none"
        >
          <option value="All">All timelines (Months 1–24)</option>
          {QUARTERS.map((q) => (
            <option key={q} value={q}>
              Starts {q}
            </option>
          ))}
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
                    <span className="font-mono text-xs uppercase text-sage-dim">
                      {s.window}
                    </span>
                  </div>
                  <span className="rounded bg-hairline px-2 py-0.5 text-xs font-mono text-sage">
                    {s.category}
                  </span>
                </div>

                <h4 className="font-display text-base text-paper font-semibold leading-snug">
                  {s.title}
                </h4>

                <p className="text-xs text-sage leading-relaxed mt-1 font-body line-clamp-3">
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
                  <span className="text-moss font-semibold">{s.cost}</span>
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
                      <span>Shortlisted</span>
                    </>
                  ) : (
                    <>
                      <Square size={13} />
                      <span>Add to shortlist</span>
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
