import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Database, TrendingUp, Radio, DollarSign, Wrench, FileText, CheckCircle2 } from 'lucide-react';

export interface SearchResult {
  id: string;
  category: 'Section' | 'Metric' | 'County' | 'Revenue Lever' | 'Strategy' | 'Studio Hardware';
  title: string;
  snippet: string;
  targetId: string;
  badge?: string;
}

const SEARCH_INDEX: SearchResult[] = [
  // Sections
  { id: 'sec-overview', category: 'Section', title: 'Platform Overview & Strategic Summary', snippet: 'The visual system, core evidence tiers and board decision framework for Nyota FM 107.3.', targetId: 'overview', badge: 'Hero' },
  { id: 'sec-objectives', category: 'Section', title: 'Part 1 — The Five Ownership Objectives (A–E)', snippet: 'Revenue diversification, regional brand leadership, local language dominance, and digital migration.', targetId: 'part-1', badge: 'Part 1' },
  { id: 'sec-data', category: 'Section', title: 'Part 2 — Sourced Master Data Room', snippet: '8 empirical data domains, 2019 Census benchmarks, prevailing ad rates, and vendor quotations.', targetId: 'part-2', badge: 'Part 2' },
  { id: 'sec-payback', category: 'Section', title: 'Part 3 — Data Analysis & Payback Model', snippet: 'Interactive 8-quarter EBITDA trajectory, sensitivity test (-20% to +35%), and studio break-even model.', targetId: 'part-3', badge: 'Part 3' },
  { id: 'sec-opps', category: 'Section', title: 'Part 4 — Revenue Opportunities Matrix', snippet: '12 commercial levers evaluated by Expected Value formula EV = Yield × P(S) / Time.', targetId: 'part-4', badge: 'Part 4' },
  { id: 'sec-strategies', category: 'Section', title: 'Part 5 — 21 Action Execution Plans (5.1–5.21)', snippet: 'Fully costed implementation plans with verifiable receipts, deliverables, and milestone KPIs.', targetId: 'part-5', badge: 'Part 5' },
  { id: 'sec-build', category: 'Section', title: 'Part 6 — Studio Build, Phased Capex & Staffing', snippet: '24-month roadmap, 3-phase studio schedule (KSh 627K–9.60M), and team organogram.', targetId: 'part-6', badge: 'Part 6' },
  { id: 'sec-audit', category: 'Section', title: 'Part 7 — The Centerpiece Gap Audit', snippet: 'Checklist A (20 Gaps), Checklist B (40 Operational Items), and Checklist C (12 Reclaimed Levers).', targetId: 'part-7', badge: 'Part 7' },
  { id: 'sec-asks', category: 'Section', title: 'Closing — The Six Asks of Ownership & Source Registry', snippet: '37 verified citations, governance endorsements, and formal capital authorisation resolutions.', targetId: 'part-asks', badge: 'Closing' },

  // Key Metrics
  { id: 'm-reach', category: 'Metric', title: '1.8M+ Weekly Radio Listeners', snippet: '81% radio penetration across Western Kenya and Lake Region (CA Kenya Q2 2025/26).', targetId: 'part-2', badge: 'Tier 1' },
  { id: 'm-smartphones', category: 'Metric', title: '92.9% Smartphone Penetration', snippet: 'Active smartphones exceeding 48.7M devices in Kenya (CA Kenya, Dec 2025).', targetId: 'part-2', badge: 'Tier 1' },
  { id: 'm-market', category: 'Metric', title: 'KSh 25.9B Radio Ad Spend Market', snippet: 'Radio sector contracted 5% in 2025; financial services and transport lead expenditures.', targetId: 'part-1', badge: 'Tier 1' },
  { id: 'm-capex', category: 'Metric', title: 'KSh 627,000 – 837,000 Phase 1 Studio Capex', snippet: 'Researched local equipment procurement vs v1.0 initial KSh 2.2M–3.8M estimate.', targetId: 'part-6', badge: 'Tier 1' },
  { id: 'm-ussd', category: 'Metric', title: 'KSh 145,000 USSD Shortcode Activation', snippet: 'Africa\'s Talking dedicated interactive code for feature phone polling and listener payments.', targetId: 'part-5', badge: 'Tier 1' },

  // Counties
  { id: 'c-bungoma', category: 'County', title: 'Bungoma County — Population 1,670,570', snippet: 'Primary station home base. 2026 projection: 1,932,168. Vernacular: Bukusu, Tachoni, Sabaot.', targetId: 'part-2', badge: 'KNBS' },
  { id: 'c-kakamega', category: 'County', title: 'Kakamega County — Population 1,867,579', snippet: 'Core commercial hub. 2026 projection: 2,110,000. Vernacular: Maragoli, Isukha, Idakho, Tiriki.', targetId: 'part-2', badge: 'KNBS' },
  { id: 'c-transnzoia', category: 'County', title: 'Trans Nzoia County — Population 990,341', snippet: 'Northern agricultural corridor (Kitale). 2026 projection: 1,080,000. Agro-business ad cluster.', targetId: 'part-2', badge: 'KNBS' },
  { id: 'c-busia', category: 'County', title: 'Busia County — Population 893,681', snippet: 'Cross-border commerce corridor. 2026 projection: 990,000. Vernacular: Samia, Khayo, Marachi, Teso.', targetId: 'part-2', badge: 'KNBS' },
  { id: 'c-vihiga', category: 'County', title: 'Vihiga County — Population 590,013', snippet: 'High-density community basin. 2026 projection: 650,000. Vernacular: Maragoli, Tiriki, Banyore.', targetId: 'part-2', badge: 'KNBS' },

  // Revenue Levers & Strategies
  { id: 'str-ob', category: 'Strategy', title: 'Strategy 5.11 — Outside Broadcast (OB) Commercial Units', snippet: 'Targeting weekly market days, agricultural expos, and county rallies. Yield: KSh 150K–350K per OB.', targetId: 'part-5', badge: 'Action 5.11' },
  { id: 'str-whatsapp', category: 'Strategy', title: 'Strategy 5.5 — WhatsApp Business API & Channel Integration', snippet: 'Official Africa\'s Talking WhatsApp BSP onboarding. Direct listener conversion and SMS backup.', targetId: 'part-5', badge: 'Action 5.5' },
  { id: 'str-shows', category: 'Strategy', title: 'Strategy 5.1 — Four Flagship Pre-Recorded Show Packages', snippet: 'Asuhi ya Imani, Hapa Tulipo Mix, Sauti ya Nchi, and Wanawake wa Twang\'aa derivative syndication.', targetId: 'part-5', badge: 'Action 5.1' },
  { id: 'str-gaa', category: 'Strategy', title: 'Strategy 5.14 — Government Advertising Agency (GAA) Prequalification', snippet: 'Prequalifying Nyota FM for KSh 100K to access national public sector civic campaign budgets.', targetId: 'part-5', badge: 'Action 5.14' },
  { id: 'str-loyalty', category: 'Strategy', title: 'Strategy 5.18 — Twang\'aa Club Listener Loyalty Engine', snippet: 'USSD + WhatsApp points system driving repeat engagement and SMS poll monetization.', targetId: 'part-5', badge: 'Action 5.18' },
  { id: 'str-studio', category: 'Studio Hardware', title: 'Studio Phase 1 Fitout Hardware Matrix', snippet: 'Shure SM7B mics, Rodecaster Pro II, Blackmagic Atem Mini, and soundproof acoustic panelling.', targetId: 'part-6', badge: 'Hardware' },
];

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const filtered = query.trim() === ''
    ? SEARCH_INDEX.slice(0, 8)
    : SEARCH_INDEX.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.snippet.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (targetId: string) => {
    onClose();
    const el = document.getElementById(targetId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 74;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex].targetId);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/80 p-4 pt-16 sm:pt-24 backdrop-blur-md animate-section-entrance"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-brass/50 bg-ink-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-hairline px-4 py-3.5 gap-3">
          <Search size={18} className="text-brass shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search figures, counties, payback model, studio, or strategies..."
            className="w-full bg-transparent text-sm sm:text-base text-paper placeholder-sage-dim focus:outline-none font-body"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-sage-dim hover:text-paper text-xs font-mono uppercase"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-sage hover:bg-ink hover:text-paper transition-colors"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 border-b border-hairline bg-ink/50 px-4 py-2 text-[11px] font-mono text-sage-dim overflow-x-auto scrollbar-none">
          <span>Filters:</span>
          {['All', 'Section', 'Metric', 'County', 'Strategy', 'Studio Hardware'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setQuery(cat === 'All' ? '' : cat)}
              className={`rounded px-2 py-0.5 transition-colors ${
                (cat === 'All' && query === '') || query.toLowerCase() === cat.toLowerCase()
                  ? 'bg-brass text-ink font-semibold'
                  : 'hover:text-paper hover:bg-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-hairline/60">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sage">
              <p className="text-sm">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-sage-dim mt-1 font-mono">
                Try searching for &lsquo;Bungoma&rsquo;, &lsquo;EBITDA&rsquo;, &lsquo;USSD&rsquo;, &lsquo;Phase 1&rsquo;, or &lsquo;ReelAnalytics&rsquo;.
              </p>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.targetId)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`group flex items-start justify-between gap-4 px-4 py-3.5 cursor-pointer transition-colors ${
                  selectedIndex === idx ? 'bg-ink border-l-2 border-brass' : 'hover:bg-ink/50'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brass font-semibold">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="rounded bg-hairline px-1.5 py-0.2 text-[9px] font-mono text-sage-dim">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-paper group-hover:text-brass transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-sage line-clamp-1 mt-0.5 font-body">
                    {item.snippet}
                  </p>
                </div>
                <ArrowRight
                  size={15}
                  className={`shrink-0 transition-transform ${
                    selectedIndex === idx ? 'text-brass translate-x-1' : 'text-sage-dim'
                  }`}
                />
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-hairline bg-ink px-4 py-2.5 text-[11px] font-mono text-sage-dim">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>ESC to close</span>
          </div>
          <span className="text-brass">37 Verified Data Sources</span>
        </div>
      </div>
    </div>
  );
}
