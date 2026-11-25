import React, { useState, useEffect, lazy, Suspense } from 'react';

const SearchModal = lazy(() => import('./components/website/SearchModal').then((m) => ({ default: m.SearchModal })));
const ExecutiveBriefingMode = lazy(() => import('./components/website/ExecutiveBriefingMode').then((m) => ({ default: m.ExecutiveBriefingMode })));
import { Navbar } from './components/website/Navbar';
import { LiveRadioPlayer } from './components/website/LiveRadioPlayer';
import { FloatingNavRail } from './components/website/FloatingNavRail';
import { WebsiteFooter } from './components/website/WebsiteFooter';
import { MobileBottomDock } from './components/website/MobileBottomDock';
import { ChapterSection } from './components/ledger/ChapterSection';

// Core Strategic Modules
import { DocumentHero } from './components/v2/DocumentHero';
import { SourceListAndAsks } from './components/v2/SourceListAndAsks';
import { ProductPreview } from './appendix/ProductPreview';
import { Deferred } from './components/Deferred';
import { scrollToSection } from './lib/scroll';
import { sections } from './content/sections';
import { Modal } from './components/Modal';
import { Toaster } from './components/motion/Toaster';

// Chapters 01–07 and Appendix A load as separate chunks when scrolled near (Deferred).
const CHAPTERS: { id: string; Body: React.ComponentType }[] = [
  { id: 'situation', Body: lazy(() => import('./chapters/Situation')) },
  { id: 'objectives', Body: lazy(() => import('./chapters/Objectives')) },
  { id: 'opportunity', Body: lazy(() => import('./chapters/Opportunity')) },
  { id: 'plan', Body: lazy(() => import('./chapters/Plan')) },
  { id: 'build', Body: lazy(() => import('./chapters/Build')) },
  { id: 'money', Body: lazy(() => import('./chapters/Money')) },
  { id: 'risks', Body: lazy(() => import('./chapters/Risks')) },
  { id: 'asks', Body: () => null },
  { id: 'appendix-data', Body: lazy(() => import('./chapters/AppendixData')) },
];

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  // Load the search chunk on first use, then keep it mounted.
  const [searchLoaded, setSearchLoaded] = useState(false);
  useEffect(() => {
    if (searchOpen) setSearchLoaded(true);
  }, [searchOpen]);

  // Global keyboard shortcuts: Cmd/Ctrl+K or '/' opens search; Shift+B opens the briefing.
  // Single-letter 'b' is avoided because screen readers use it for quick navigation.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === '?' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setHelpOpen(true);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'B' && e.shiftKey && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setBriefingOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (id: string) => {
    if (sections.some((section) => section.id === id)) {
      scrollToSection(id);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-paper font-body selection:bg-brass selection:text-ink">
      {/* Persistent Website Navigation Bar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBriefing={() => setBriefingOpen(true)}
      />

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} labelledBy="help-title" className="m-auto w-[calc(100%-2rem)] max-w-sm">
        <div className="rounded-xl border border-hairline bg-ink-2 p-5 space-y-3">
          <h2 id="help-title" className="font-display text-xl text-paper">Keyboard shortcuts</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="font-mono text-brass">Ctrl/⌘ K or /</dt>
            <dd className="text-sage">Search</dd>
            <dt className="font-mono text-brass">Shift + B</dt>
            <dd className="text-sage">Executive briefing</dd>
            <dt className="font-mono text-brass">← → Space</dt>
            <dd className="text-sage">Move through the presentation deck</dd>
            <dt className="font-mono text-brass">Esc</dt>
            <dd className="text-sage">Close any dialog</dd>
            <dt className="font-mono text-brass">?</dt>
            <dd className="text-sage">This help</dd>
          </dl>
          <button type="button" onClick={() => setHelpOpen(false)} className="rounded border border-hairline px-3 py-2 text-xs font-mono text-sage hover:text-paper">
            Close
          </button>
        </div>
      </Modal>

      {/* Instant Global Search Modal */}
      {searchLoaded && (
        <Suspense fallback={null}>
          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </Suspense>
      )}

      {/* Executive Board Briefing & Resolutions Mode */}
      {briefingOpen && (
<Suspense fallback={null}>
        <ExecutiveBriefingMode
          onClose={() => setBriefingOpen(false)}
          onNavigate={(id) => {
            setBriefingOpen(false);
            handleNavigate(id);
          }}
        />
        </Suspense>
      )}

      {/* Main Content Stream - Optimized for mobile edge spacing and touch safe area */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-12">
        {/* Cover / Strategic Website Hero Block */}
        <DocumentHero
          onNavigate={handleNavigate}
          onOpenBriefing={() => setBriefingOpen(true)}
        />

        {/* 01–08: the board case, in decision order */}
        {CHAPTERS.map(({ id, Body }) => {
          const meta = sections.find((s) => s.id === id)!;
          return (
            <ChapterSection key={id} id={id} number={meta.number} title={meta.title}>
              {id === 'asks' ? (
                <SourceListAndAsks show="asks" />
              ) : (
                <Deferred label={meta.shortTitle} minHeight={900}>
                  <Body />
                </Deferred>
              )}
            </ChapterSection>
          );
        })}

        <ChapterSection id="appendix-preview" number="B" title="Appendix B: Product Preview">
          <ProductPreview />
        </ChapterSection>
      </main>

      {/* Standard Website Footer */}
      <WebsiteFooter onNavigate={handleNavigate} />

      {/* Interactive Live Radio Player Widget */}
      <LiveRadioPlayer />

      {/* Ergonomic Mobile Phone Bottom Dock (<15% screen height) */}
      <MobileBottomDock
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBriefing={() => setBriefingOpen(true)}
        onNavigate={handleNavigate}
      />

      <Toaster />

      {/* Desktop Sticky Rail & Back-to-Top Indicator */}
      <FloatingNavRail />
    </div>
  );
}
