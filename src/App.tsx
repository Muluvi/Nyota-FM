import React, { useState, useEffect } from 'react';
import { Navbar } from './components/website/Navbar';
import { SearchModal } from './components/website/SearchModal';
import { LiveRadioPlayer } from './components/website/LiveRadioPlayer';
import { FloatingNavRail } from './components/website/FloatingNavRail';
import { WebsiteFooter } from './components/website/WebsiteFooter';
import { ExecutiveBriefingMode } from './components/website/ExecutiveBriefingMode';
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
import { VisualPlaybook } from './components/v2/VisualPlaybook';
import { DataEnrichedAnnexure } from './components/v2/DataEnrichedAnnexure';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(false);

  // Global keyboard shortcut: Cmd+K / Ctrl+K / '/' to open search, 'b' to open briefing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setSearchOpen(true);
      } else if ((e.key === 'b' || e.key === 'B') && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setBriefingOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 74;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-paper font-body selection:bg-brass selection:text-ink">
      {/* Persistent Website Navigation Bar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBriefing={() => setBriefingOpen(true)}
      />

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

      {/* Main Content Stream */}
      <main className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20">
        {/* Cover / Strategic Website Hero Block */}
        <DocumentHero
          onNavigate={handleNavigate}
          onOpenBriefing={() => setBriefingOpen(true)}
        />

        {/* VISUAL SYSTEM — HANDBOOK-LED PROPOSAL LAYER */}
        <VisualPlaybook />

        {/* DATA-ENRICHED FIGURES — COMPLETE SOURCED ANNEXURE */}
        <DataEnrichedAnnexure />

        {/* PART 1 — THE OBJECTIVES */}
        <ChapterSection id="part-1" number="01" title="The Objectives — 5 Strategic Mandates">
          <Part1Objectives />
        </ChapterSection>

        {/* PART 2 — THE DATA (MASTER DATA ANNEXURE) */}
        <ChapterSection id="part-2" number="02" title="Sourced Master Data Room & Benchmark Tables">
          <Part2MasterData />
        </ChapterSection>

        {/* PART 3 — DATA ANALYSIS & PAYBACK MODEL */}
        <ChapterSection id="part-3" number="03" title="Data Analysis, Sensitivity & Payback Simulator">
          <Part3DataAnalysis />
        </ChapterSection>

        {/* PART 4 — THE OPPORTUNITIES MATRIX */}
        <ChapterSection id="part-4" number="04" title="The Commercial Opportunities & Expected Value Matrix">
          <Part4Opportunities />
        </ChapterSection>

        {/* PART 5 — STRATEGIES TO CAPTURE */}
        <ChapterSection id="part-5" number="05" title="Action Execution Plans (21 Concrete Strategies)">
          <Part5Strategies />
        </ChapterSection>

        {/* PART 6 — THE BUILD */}
        <ChapterSection id="part-6" number="06" title="Studio Build, Phased Capex & Governance Roadmap">
          <Part6TheBuild />
        </ChapterSection>

        {/* PART 7 — THE GAP AUDIT */}
        <ChapterSection id="part-7" number="07" title="The Gap Audit (Comprehensive Centerpiece Checklists)">
          <Part7GapAudit />
        </ChapterSection>

        {/* SOURCE LIST & THE SIX ASKS OF OWNERSHIP */}
        <div id="part-asks" className="scroll-mt-20 sm:scroll-mt-24 pt-12">
          <SourceListAndAsks />
        </div>
      </main>

      {/* Standard Website Footer */}
      <WebsiteFooter onNavigate={handleNavigate} />

      {/* Interactive Live Radio Player Widget */}
      <LiveRadioPlayer />

      {/* Desktop Sticky Rail & Back-to-Top Indicator */}
      <FloatingNavRail />
    </div>
  );
}
