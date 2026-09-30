import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface NavItem {
  id: string;
  badge: string;
  part?: string;
  title: string;
  desc: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', badge: 'v2.0', title: 'The Twang\'aa Transformation v2.0', desc: 'Board-Ready proposal, Three-Tier Evidence standard & executive summary' },
  { id: 'part-1', badge: 'P.1', part: 'Part 1', title: 'The Objectives (A–E)', desc: 'Five Ownership Objectives checked against 2026 empirical reality' },
  { id: 'part-2', badge: 'P.2', part: 'Part 2', title: 'The Data (Master Data Annexure)', desc: '8 empirical data domains, population sizing, ad rates & local vendor quotes' },
  { id: 'part-3', badge: 'P.3', part: 'Part 3', title: 'Data Analysis & Payback Model', desc: 'Revenue concentrations, v1.0 survival test, 8-quarter trajectory & sensitivity' },
  { id: 'part-4', badge: 'P.4', part: 'Part 4', title: 'The Opportunities Matrix', desc: '12 revenue levers ranked by EV composite score & Top 5 Board Priorities' },
  { id: 'part-5', badge: 'P.5', part: 'Part 5', title: 'Strategies to Capture (5.1–5.21)', desc: '21 comprehensive action plans with receipts, execution budgets & KPIs' },
  { id: 'part-6', badge: 'P.6', part: 'Part 6', title: 'The Build & Studio Capex', desc: '24-month roadmap, phased studio schedule (KSh 4.97M–9.60M) & staffing' },
  { id: 'part-7', badge: 'P.7', part: 'Part 7', title: 'The Gap Audit (Centerpiece)', desc: 'Checklist A (20 gaps), Checklist B (40 build items), Checklist C (12 omitted levers)' },
  { id: 'part-asks', badge: 'ASK', part: 'Closing', title: 'Source List (37 Sources) & The 6 Asks', desc: 'Traceable citation registry, 12 compliance checks & Board action endorsements' },
];

export function ContentsOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = NAV_ITEMS.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.desc.toLowerCase().includes(search.toLowerCase()) ||
    (item.part && item.part.toLowerCase().includes(search.toLowerCase()))
  );

  const handleNav = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 bg-ink z-[70] overflow-y-auto overflow-x-hidden pb-16 animate-section-entrance">
      {/* Sticky Bar */}
      <div className="sticky top-0 bg-ink/95 backdrop-blur-md border-b border-hairline h-[56px] px-4 md:px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="font-display text-paper text-lg">Table of Contents</span>
          <span className="text-[11px] font-mono text-sage-dim hidden sm:inline">THE TWANG’AA TRANSFORMATION</span>
        </div>
        <button 
          onClick={onClose}
          className="text-brass font-body text-sm hover:opacity-80 p-2 flex items-center gap-1.5"
        >
          <span>Close</span>
          <X size={16} />
        </button>
      </div>
      
      <div className="max-w-[640px] mx-auto px-4 md:px-6 pt-6">
        {/* Search Input */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sage-dim pointer-events-none" />
          <input
            type="text"
            placeholder="Search chapters, revenue streams, studio phases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-ink-2 border border-hairline rounded pl-10 pr-4 py-2.5 text-xs text-paper font-body focus:border-brass focus:outline-none"
          />
        </div>

        {/* Chapters List */}
        <div className="divide-y divide-hairline">
          {filtered.map(item => (
            <button 
              key={item.id} 
              onClick={() => handleNav(item.id)}
              className="group w-full py-4 text-left hover:bg-ink-2 transition-colors flex items-start gap-4 -mx-2 px-2 rounded"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full border-[1.5px] border-brass font-mono text-brass text-xs shrink-0 mt-0.5">
                {item.badge}
              </div>
              <div className="min-w-0 flex-1">
                {item.part && (
                  <span className="font-mono text-[10px] text-brass uppercase block tracking-wider mb-0.5">
                    {item.part}
                  </span>
                )}
                <span className="font-body text-paper text-[15px] font-medium group-hover:text-brass transition-colors block">
                  {item.title}
                </span>
                <span className="font-body text-sage-dim text-xs block mt-0.5 leading-snug">
                  {item.desc}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
