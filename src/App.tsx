import React, { useState, useEffect } from 'react';
import { Navbar } from './components/website/Navbar';
import { SearchModal } from './components/website/SearchModal';
import { LiveRadioPlayer } from './components/website/LiveRadioPlayer';
import { FloatingNavRail } from './components/website/FloatingNavRail';
import { WebsiteFooter } from './components/website/WebsiteFooter';
import { ExecutiveBriefingMode } from './components/website/ExecutiveBriefingMode';
import { MobileBottomDock } from './components/website/MobileBottomDock';
import { ChapterSection } from './components/ledger/ChapterSection';
import { MinimalNarrative } from './components/narrative/MinimalNarrative';

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
import { TouchpointEcosystem } from './components/v2/TouchpointEcosystem';
import { DataEnrichedAnnexure } from './components/v2/DataEnrichedAnnexure';
import { scrollToSection } from './lib/scroll';
import { sections } from './content/sections';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [narrativeMode, setNarrativeMode] = useState(true);

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
    setNarrativeMode(false);
    setTimeout(() => {
      if (sections.some((section) => section.id === id)) {
        scrollToSection(id);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-paper font-body selection:bg-brass selection:text-ink">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBriefing={() => setBriefingOpen(true)}
      />

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {briefingOpen && (
        <ExecutiveBriefingMode
          onClose={() => setBriefingOpen(false)}
          onNavigate={(id) => {
            setBriefingOpen(false);
            handleNavigate(id);
          }}
        />
      )}

      <main className="mx-auto w-full max-w-5xl px-6 sm:px-8 pt-20 pb-32">
        {narrativeMode ? (
          <MinimalNarrative
            onShowFull={() => setNarrativeMode(false)}
            onNavigate={handleNavigate}
          />
        ) : (
          <>
            <div className="mb-12 flex items-center justify-between">
              <button
                onClick={() => setNarrativeMode(true)}
                className="text-sm tracking-wider uppercase text-sage hover:text-paper"
              >
                ← Back to narrative
              </button>
              <span className="text-xs tracking-widest uppercase text-sage-dim">Full proposal</span>
            </div>

            <DocumentHero
              onNavigate={handleNavigate}
              onOpenBriefing={() => setBriefingOpen(true)}
            />

            <VisualPlaybook />
            <DataEnrichedAnnexure />
            <TouchpointEcosystem />

            <ChapterSection id="part-1" number="01" title="The Objectives — 5 Strategic Mandates">
              <Part1Objectives />
            </ChapterSection>

            <ChapterSection id="part-2" number="02" title="Sourced Master Data Room & Benchmark Tables">
              <Part2MasterData />
            </ChapterSection>

            <ChapterSection id="part-3" number="03" title="Data Analysis, Sensitivity & Payback Simulator">
              <Part3DataAnalysis />
            </ChapterSection>

            <ChapterSection id="part-4" number="04" title="The Commercial Opportunities & Expected Value Matrix">
              <Part4Opportunities />
            </ChapterSection>

            <ChapterSection id="part-5" number="05" title="Action Execution Plans (21 Concrete Strategies)">
              <Part5Strategies />
            </ChapterSection>

            <ChapterSection id="part-6" number="06" title="Studio Build, Phased Capex & Governance Roadmap">
              <Part6TheBuild />
            </ChapterSection>

            <ChapterSection id="part-7" number="07" title="The Gap Audit (Comprehensive Centerpiece Checklists)">
              <Part7GapAudit />
            </ChapterSection>

            <div id="part-asks" className="scroll-mt-20 pt-12">
              <SourceListAndAsks />
            </div>
          </>
        )}
      </main>

      <WebsiteFooter onNavigate={handleNavigate} />
      <LiveRadioPlayer />
      <MobileBottomDock
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBriefing={() => setBriefingOpen(true)}
        onNavigate={handleNavigate}
      />
      <FloatingNavRail />
    </div>
  );
}
