import React, { useState, useEffect } from 'react';
import { ArrowUp, Compass } from 'lucide-react';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'part-1', label: '1. Objectives' },
  { id: 'part-2', label: '2. Data Room' },
  { id: 'part-3', label: '3. Payback Model' },
  { id: 'part-4', label: '4. Opportunities' },
  { id: 'part-5', label: '5. Action Plan' },
  { id: 'part-6', label: '6. Studio Capex' },
  { id: 'part-7', label: '7. Gap Audit' },
  { id: 'part-asks', label: '8. Board Asks' },
];

export function FloatingNavRail() {
  const [activeSection, setActiveSection] = useState('overview');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollY / docHeight) * 100) : 0;
      setScrollPercent(pct);
      setShowBackToTop(scrollY > 400);

      // Identify active section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 74;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Sticky Rail (Right Side) */}
      <aside
        className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-end gap-2"
        aria-label="Document Section Rail"
      >
        <div className="bg-ink-2/90 border border-hairline/80 rounded-xl p-2.5 backdrop-blur-md shadow-2xl flex flex-col gap-1 max-w-[160px]">
          <div className="px-2 py-1 text-[9px] font-mono uppercase tracking-widest text-brass font-bold border-b border-hairline/50 flex items-center gap-1.5">
            <Compass size={11} />
            <span>Platform Rail</span>
          </div>

          <nav className="flex flex-col gap-0.5 mt-1" aria-label="Section shortcuts">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollTo(sec.id)}
                  className={`group flex items-center justify-between text-left px-2 py-1 rounded text-[11px] font-mono transition-all ${
                    isActive
                      ? 'bg-brass/15 text-brass font-semibold'
                      : 'text-sage-dim hover:text-paper hover:bg-ink'
                  }`}
                  title={`Jump to ${sec.label}`}
                >
                  <span className="truncate">{sec.label}</span>
                  <span
                    className={`size-1.5 rounded-full shrink-0 ml-2 transition-all ${
                      isActive ? 'bg-brass scale-125' : 'bg-hairline group-hover:bg-sage-dim'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="pt-1.5 mt-0.5 border-t border-hairline/50 px-2 flex items-center justify-between text-[10px] font-mono text-sage-dim">
            <span>Read</span>
            <span className="text-brass font-bold">{scrollPercent}%</span>
          </div>
        </div>
      </aside>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-brass/50 bg-ink-2/95 text-brass shadow-2xl backdrop-blur-md transition-all hover:bg-brass hover:text-ink active:scale-95 group animate-section-entrance"
          aria-label="Back to top"
          title="Return to top"
        >
          <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </>
  );
}
