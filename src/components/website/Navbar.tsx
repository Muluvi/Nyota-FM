import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Radio, Volume2, ArrowUp, ChevronRight, Layers, ExternalLink } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  number: string;
}

const PRIMARY_NAV: NavItem[] = [
  { id: 'overview', label: 'Overview', number: '00' },
  { id: 'part-1', label: 'Objectives', number: '01' },
  { id: 'part-2', label: 'Data Room', number: '02' },
  { id: 'part-3', label: 'Payback Model', number: '03' },
  { id: 'part-4', label: 'Opportunities', number: '04' },
  { id: 'part-5', label: 'Action Plan', number: '05' },
  { id: 'part-6', label: 'Studio Capex', number: '06' },
];

export function Navbar({
  onOpenSearch,
  onOpenRadio,
  onOpenBriefing,
}: {
  onOpenSearch: () => void;
  onOpenRadio?: () => void;
  onOpenBriefing?: () => void;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(scrolled > 20);

      // Section spy
      const sectionElements = PRIMARY_NAV.map((item) => document.getElementById(item.id)).filter(Boolean);
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(PRIMARY_NAV[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-brass z-50 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(214,167,92,0.8)]"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Main Sticky Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-ink-2/95 backdrop-blur-md border-hairline py-2.5 shadow-xl'
            : 'bg-ink-2/80 backdrop-blur-sm border-hairline/60 py-3.5'
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Brand Identity / Home Anchor */}
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => scrollToSection('overview')}
              className="flex items-center gap-2.5 text-left group"
              aria-label="Nyota FM Home"
            >
              <img
                src="https://res.cloudinary.com/da5j0zjok/image/upload/v1780508039/Untitled_design_20260603_203332_0000_e2md3o.png"
                alt="Nyota FM"
                className="h-6 sm:h-7 w-auto object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brass font-bold leading-none">
                  107.3 FM · WESTERN
                </span>
                <span className="font-body text-[11px] text-sage-dim leading-tight">
                  Strategic Hub
                </span>
              </div>
            </button>

            {/* Live Indicator Pill */}
            <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-moss/40 bg-moss/10 px-2 py-0.5 text-[10px] font-mono text-moss">
              <span className="size-1.5 rounded-full bg-moss animate-ping" />
              <span>ON AIR NOW</span>
            </div>
          </div>

          {/* Desktop 7 Primary Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-1.5 text-xs font-mono"
            aria-label="Main Navigation"
          >
            {PRIMARY_NAV.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`px-2.5 py-1.5 rounded transition-all duration-150 relative ${
                    isActive
                      ? 'text-brass font-semibold bg-brass/10'
                      : 'text-sage hover:text-paper hover:bg-ink-2/60'
                  }`}
                >
                  <span className="text-[10px] text-sage-dim mr-1 opacity-70">
                    {item.number}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brass rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Tools: Search, Live Stream & Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Executive Board Briefing Button */}
            {onOpenBriefing && (
              <button
                type="button"
                onClick={onOpenBriefing}
                className="flex items-center gap-1.5 rounded-lg border border-brass/50 bg-brass/10 px-2.5 sm:px-3 py-1.5 text-xs font-mono text-brass hover:bg-brass hover:text-ink transition-all shadow-sm group"
                title="Open Executive Board Briefing (B)"
                aria-label="Open Executive Board Briefing"
              >
                <span className="size-1.5 rounded-full bg-brass animate-pulse group-hover:bg-ink" />
                <span className="font-semibold hidden sm:inline">Board Mode</span>
                <span className="font-semibold sm:hidden">Board</span>
              </button>
            )}

            {/* Quick Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 rounded-lg border border-hairline bg-ink px-2.5 sm:px-3 py-1.5 text-xs font-mono text-sage hover:border-brass/70 hover:text-paper transition-all"
              title="Search platform (Cmd+K)"
              aria-label="Open search dialog"
            >
              <Search size={14} className="text-brass" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline-block rounded bg-hairline px-1.5 py-0.5 text-[9px] font-mono text-sage-dim">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Button (Hamburger) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-ink text-paper hover:border-brass hover:text-brass transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur-md pt-16 animate-section-entrance md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-widest text-brass font-bold">
              Navigation Menu
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="h-10 w-10 flex items-center justify-center rounded border border-hairline text-sage hover:text-paper"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-hairline">
            {PRIMARY_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`flex w-full items-center justify-between py-4 text-left font-body text-base transition-colors min-h-[48px] ${
                  activeSection === item.id ? 'text-brass font-semibold' : 'text-paper hover:text-brass'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-brass border border-brass/30 px-2 py-0.5 rounded">
                    {item.number}
                  </span>
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-sage-dim" />
              </button>
            ))}

            <button
              type="button"
              onClick={() => scrollToSection('part-7')}
              className="flex w-full items-center justify-between py-4 text-left font-body text-base text-paper hover:text-brass min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-sage-dim border border-hairline px-2 py-0.5 rounded">
                  07
                </span>
                <span>The Gap Audit</span>
              </div>
              <ChevronRight size={16} className="text-sage-dim" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('part-asks')}
              className="flex w-full items-center justify-between py-4 text-left font-body text-base text-paper hover:text-brass min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-emerald-400 border border-emerald-400/40 px-2 py-0.5 rounded">
                  08
                </span>
                <span>The Six Board Asks</span>
              </div>
              <ChevronRight size={16} className="text-sage-dim" />
            </button>
          </nav>

          <div className="border-t border-hairline p-6 bg-ink-2 space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brass px-4 py-3 text-xs font-mono uppercase tracking-wider text-ink font-semibold min-h-[48px]"
            >
              <Search size={16} /> Search Data & Strategies
            </button>
          </div>
        </div>
      )}
    </>
  );
}
