import React, { useState, useEffect } from 'react';
import { Navbar } from './components/website/Navbar';
import { SearchModal } from './components/website/SearchModal';
import { LiveRadioPlayer } from './components/website/LiveRadioPlayer';
import { FloatingNavRail } from './components/website/FloatingNavRail';
import { WebsiteFooter } from './components/website/WebsiteFooter';
import { ExecutiveBriefingMode } from './components/website/ExecutiveBriefingMode';
import { MobileBottomDock } from './components/website/MobileBottomDock';
import { ChapterSection } from './components/ledger/ChapterSection';

// Core Strategic Modules
import { DocumentHero } from './components/v2/DocumentHero';
import { Part1Objectives } from './components/v2/Part1Objectives';
import { Part2MasterData } from './components/v2/Part2MasterData';
import { Part3DataAnalysis } from './components/v2/Part3DataAnalysis';
import { Part4Opportunities } from './components/v2/Part4Opportunities';
import { Part5Strategies } from './components/v2/Part5Strategies';
import { Part6TheBuild } from './components/v2/Part6TheBuild';
import { Part7GapAudit } from './components/v2/Part7GapAudit';
import { SourceListAndAsks } from './components/v2/SourceListAndAsks';
import { Flywheel } from './components/v2/Flywheel';
import { SituationCharts } from './components/v2/SituationCharts';
import { Gantt } from './components/charts/Gantt';
import { CapexWaterfall } from './components/charts/CapexWaterfall';
import { ProductPreview, SeeItWorking } from './appendix/ProductPreview';
import { TouchpointEcosystem } from './components/v2/TouchpointEcosystem';
import { DataEnrichedAnnexure } from './components/v2/DataEnrichedAnnexure';
import { scrollToSection } from './lib/scroll';
import { sections } from './content/sections';
import { Modal } from './components/Modal';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

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
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Executive Board Briefing & Resolutions Mode */}
      {briefingOpen && (
        <ExecutiveBriefingMode
          onClose={() => setBriefingOpen(false)}
          onNavigate={(id) => {
            setBriefingOpen(false);
            handleNavigate(id);
          }}
        />
      )}

      {/* Main Content Stream - Optimized for mobile edge spacing and touch safe area */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-12">
        {/* Cover / Strategic Website Hero Block */}
        <DocumentHero
          onNavigate={handleNavigate}
          onOpenBriefing={() => setBriefingOpen(true)}
        />

        {/* 01–08: the board case, in decision order */}
        <ChapterSection id="situation" number="01" title="The Situation: Market Evidence">
          <SituationCharts />
          <Part2MasterData />
          <p className="mt-6"><SeeItWorking group="preview-evidence">Explore the county, coverage and royalty tools</SeeItWorking></p>
        </ChapterSection>

        <ChapterSection id="objectives" number="02" title="The Objectives (A–E)">
          <Part1Objectives />
          <p className="mt-6"><SeeItWorking group="preview-listener">See the programming and listener tools working</SeeItWorking></p>
        </ChapterSection>

        <ChapterSection id="opportunity" number="03" title="The Opportunity: Revenue Levers & Rate Card">
          <Part4Opportunities />
          <TouchpointEcosystem />
          <p className="mt-6"><SeeItWorking group="preview-advertiser">Try the media plan and quote</SeeItWorking></p>
        </ChapterSection>

        <ChapterSection id="plan" number="04" title="The Plan: 21 Strategies from Month 0">
          <Flywheel />
          <Gantt />
          <Part5Strategies />
        </ChapterSection>

        <ChapterSection id="build" number="05" title="The Build: Studio, Power, OB & People">
          <CapexWaterfall />
          <Part6TheBuild />
          <p className="mt-6"><SeeItWorking group="preview-operations">See the studio, power and OB tools working</SeeItWorking></p>
        </ChapterSection>

        <ChapterSection id="money" number="06" title="The Money: Revenue Index & Payback">
          <Part3DataAnalysis view="money" />
        </ChapterSection>

        <ChapterSection id="risks" number="07" title="Risks & Gap Audit">
          <Part3DataAnalysis view="risks" />
          <Part7GapAudit />
        </ChapterSection>

        <ChapterSection id="asks" number="08" title="The Asks & Governance">
          <SourceListAndAsks show="asks" />
        </ChapterSection>

        {/* Appendices */}
        <ChapterSection id="appendix-data" number="A" title="Appendix A: Data Room & Sources">
          <DataEnrichedAnnexure />
          <SourceListAndAsks show="sources" />
        </ChapterSection>

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

      {/* Desktop Sticky Rail & Back-to-Top Indicator */}
      <FloatingNavRail />
    </div>
  );
}
