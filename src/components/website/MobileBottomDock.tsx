import React, { useState } from 'react';
import { Radio, Layers, Search, Sparkles, ArrowUp, X, Play, Pause, ChevronRight } from 'lucide-react';

interface MobileBottomDockProps {
  onOpenSearch: () => void;
  onOpenBriefing: () => void;
  onNavigate: (sectionId: string) => void;
}

export function MobileBottomDock({
  onOpenSearch,
  onOpenBriefing,
  onNavigate,
}: MobileBottomDockProps) {
  const [sectionsSheetOpen, setSectionsSheetOpen] = useState(false);

  const sections = [
    { id: 'overview', num: '00', title: 'Executive Overview' },
    { id: 'part-1', num: '01', title: '5 Strategic Mandates' },
    { id: 'part-2', num: '02', title: 'Sourced Master Data Room' },
    { id: 'part-3', num: '03', title: 'Payback & Financial Model' },
    { id: 'part-4', num: '04', title: 'Commercial Opportunities' },
    { id: 'part-5', num: '05', title: '21 Action Strategies' },
    { id: 'part-6', num: '06', title: 'Phased Studio Build' },
    { id: 'part-7', num: '07', title: 'Centerpiece Gap Audit' },
  ];

  const handleSectionJump = (id: string) => {
    setSectionsSheetOpen(false);
    onNavigate(id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Sections Quick Sheet Drawer */}
      {sectionsSheetOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm md:hidden animate-section-entrance"
          onClick={() => setSectionsSheetOpen(false)}
        >
          <div
            className="w-full max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-brass/50 bg-ink-2 p-4 pb-safe"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab handle */}
            <div className="h-1 w-10 bg-stone-700 rounded-full mx-auto" />

            <div className="flex items-center justify-between border-b border-hairline pb-2.5">
              <span className="text-xs font-mono text-brass uppercase tracking-wider font-bold">
                JUMP TO STRATEGIC SECTION
              </span>
              <button
                type="button"
                onClick={() => setSectionsSheetOpen(false)}
                className="h-7 w-7 rounded flex items-center justify-center text-sage hover:text-paper"
                aria-label="Close sections"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleSectionJump(sec.id)}
                  className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-hairline/60 bg-ink text-left flex items-center justify-between text-xs font-mono hover:border-brass/50 active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] text-brass font-bold">{sec.num}</span>
                    <span className="text-paper font-medium">{sec.title}</span>
                  </div>
                  <ChevronRight size={14} className="text-sage-dim" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Ergonomic Bottom Dock (strictly adheres to 15% sticky height rule) */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-ink-2/95 border-t border-hairline backdrop-blur-md pb-safe"
      >
        <div className="grid grid-cols-4 h-14 items-center px-1">
          {/* 1. Sections Sheet Trigger */}
          <button
            type="button"
            onClick={() => setSectionsSheetOpen(!sectionsSheetOpen)}
            className="flex flex-col items-center justify-center min-h-[44px] text-sage hover:text-paper active:scale-95 transition-transform"
            aria-label="Sections menu"
          >
            <Layers size={18} className="text-brass" />
            <span className="text-[10px] font-mono mt-0.5 font-medium">Parts</span>
          </button>

          {/* 2. Board Briefing Mode Trigger */}
          <button
            type="button"
            onClick={onOpenBriefing}
            className="flex flex-col items-center justify-center min-h-[44px] text-sage hover:text-paper active:scale-95 transition-transform"
            aria-label="Board Mode"
          >
            <Sparkles size={18} className="text-brass" />
            <span className="text-[10px] font-mono mt-0.5 font-medium">Board</span>
          </button>

          {/* 3. Search Modal Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex flex-col items-center justify-center min-h-[44px] text-sage hover:text-paper active:scale-95 transition-transform"
            aria-label="Search"
          >
            <Search size={18} className="text-brass" />
            <span className="text-[10px] font-mono mt-0.5 font-medium">Search</span>
          </button>

          {/* 4. Scroll To Top Trigger */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex flex-col items-center justify-center min-h-[44px] text-sage hover:text-paper active:scale-95 transition-transform"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} className="text-brass" />
            <span className="text-[10px] font-mono mt-0.5 font-medium">Top</span>
          </button>
        </div>
      </nav>
    </>
  );
}
