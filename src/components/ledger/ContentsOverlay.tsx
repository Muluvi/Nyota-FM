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
  { id: 'letter', badge: 'LTR', title: 'A Letter to the Ownership', desc: 'May 2026 strategic memorandum from Firefly Management' },
  { id: 'summary', badge: '00', title: 'Executive Summary — The Growth Thesis', desc: 'The Five-Pillar plan, TAM whitespace & 2028 vision' },
  { id: 'part-1', badge: 'P.I', part: 'Part I', title: 'The Market Opportunity (Ch 1–3)', desc: 'TAM 7.2M, Vernacular fragmentation thesis, Nyota today & 2028 ambition' },
  { id: 'part-2', badge: 'P.II', part: 'Part II', title: 'The Firefly Growth Engine (Ch 4–11)', desc: 'Brand identity, Visual/Sonic system, 12-SKU merchandise, Visual Radio thesis' },
  { id: 'part-3', badge: 'P.III', part: 'Part III', title: 'Programming Reinvention (Ch 12–14)', desc: 'Daypart grid, 55/30/15 language mix, four pre-recorded show formats' },
  { id: 'part-4', badge: 'P.IV', part: 'Part IV', title: 'The Revenue Architecture (Ch 15–18)', desc: 'Eight streams to growth, outside broadcasts, WhatsApp/USSD, 2.4× trajectory' },
  { id: 'part-5', badge: 'P.V', part: 'Part V', title: 'Digital Channel Architecture (Ch 19–21)', desc: 'Ten-platform master table, anchor-and-derivative engine, response SLAs' },
  { id: 'part-6', badge: 'P.VI', part: 'Part VI', title: 'Execution & Governance (Ch 22–26)', desc: 'Risk register, consolidated implementation plan (KSh 12.7M–21.3M), the 6 asks' },
  { id: 'appendices', badge: 'APP', title: 'Appendices & Supporting Material (A–G)', desc: 'Competitor profiles, 5-county demographics, format bibles, style guide, glossary' },
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
