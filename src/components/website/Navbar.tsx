import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Menu, X, Search, Radio, Volume2, ArrowUp, ChevronRight, Layers, ExternalLink } from 'lucide-react';
import { sections, chapterSections } from '../../content/sections';
import { Modal } from '../Modal';
import { useScrollState } from '../../lib/useActiveSection';
import { scrollToSection as scrollTo } from '../../lib/scroll';

// The deck (slides and dialog) is its own chunk; the trigger appears once it loads.
const PresentationModeToggle = lazy(() => import('./PresentationModeToggle').then((m) => ({ default: m.PresentationModeToggle })));

interface NavItem {
  id: string;
  label: string;
  number: string;
}

/** Derived from src/content/sections.ts (chapters only; appendices are in the rail and footer). */
const PRIMARY_NAV: NavItem[] = chapterSections.map((s) => ({ id: s.id, label: s.shortTitle, number: s.number }));
const MENU_NAV: NavItem[] = sections.map((s) => ({ id: s.id, label: s.title, number: s.number }));

export function Navbar({
  onOpenSearch,
  onOpenRadio,
  onOpenBriefing,
}: {
  onOpenSearch: () => void;
  onOpenRadio?: () => void;
  onOpenBriefing?: () => void;
}) {
  const { progress: scrollProgress, active: activeSection, scrollY } = useScrollState();
  const isScrolled = scrollY > 20;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    scrollTo(id);
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
                src="/brand/nyota-logo.svg"
                alt="Nyota FM"
                width={120}
                height={24}
                className="h-6 sm:h-7 w-auto"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-brass font-bold leading-none">
                  107.3 FM · WESTERN
                </span>
                <span className="font-body text-[11px] text-sage-dim leading-tight">
                  Strategic Hub
                </span>
              </div>
            </button>
          </div>

          {/* Desktop chapter links (from sections.ts) */}
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
                  <span className="text-xs text-sage-dim mr-1 opacity-70">
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
            {/* Boardroom Presentation Deck Mode */}
            <div className="hidden sm:block">
              <Suspense fallback={null}>
                <PresentationModeToggle />
              </Suspense>
            </div>

            {/* Executive Board Briefing Button */}
            {onOpenBriefing && (
              <button
                type="button"
                onClick={onOpenBriefing}
                className="flex items-center gap-1.5 rounded-lg border border-brass/50 bg-brass/10 px-2.5 sm:px-3 py-1.5 text-xs font-mono text-brass hover:bg-brass hover:text-ink transition-all shadow-sm group"
                title="Open Executive Board Briefing (B)"
                aria-label="Open Executive Board Briefing"
              >
                <span className="size-1.5 rounded-full bg-brass group-hover:bg-ink" />
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
              <kbd className="hidden lg:inline-block rounded bg-hairline px-1.5 py-0.5 text-xs font-mono text-sage-dim">
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
      <Modal open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} label="Navigation menu" className="m-0 h-dvh max-h-none w-screen max-w-none md:hidden">
        <div className="flex h-full flex-col bg-ink/95 pt-16">
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
            {MENU_NAV.map((item) => (
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
      </Modal>
    </>
  );
}
