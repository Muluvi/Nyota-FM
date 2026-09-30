import React from 'react';
import { Header } from './components/ledger/Header';
import { BackToTop } from './components/ledger/BackToTop';
import { ChapterSection } from './components/ledger/ChapterSection';
import { Reveal } from './components/ledger/Reveal';

// v2.0 Strategic Modules
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
  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-paper font-body selection:bg-brass selection:text-ink pb-16 sm:pb-24">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6 sm:pt-16">
        {/* Cover / Hero Block & How to Read This Document */}
        <DocumentHero onNavigate={handleNavigate} />

        {/* VISUAL SYSTEM — HANDBOOK-LED PROPOSAL LAYER */}
        <VisualPlaybook />

        {/* DATA-ENRICHED FIGURES — COMPLETE V2.0 ANNEXURE */}
        <DataEnrichedAnnexure />

        {/* PART 1 — THE OBJECTIVES */}
        <ChapterSection id="part-1" number="01" title="Part 1 — The Objectives">
          <Part1Objectives />
        </ChapterSection>

        {/* PART 2 — THE DATA (MASTER DATA ANNEXURE) */}
        <ChapterSection id="part-2" number="02" title="Part 2 — The Data (Master Data Annexure)">
          <Part2MasterData />
        </ChapterSection>

        {/* PART 3 — DATA ANALYSIS */}
        <ChapterSection id="part-3" number="03" title="Part 3 — Data Analysis & Payback Model">
          <Part3DataAnalysis />
        </ChapterSection>

        {/* PART 4 — THE OPPORTUNITIES */}
        <ChapterSection id="part-4" number="04" title="Part 4 — The Opportunities Matrix">
          <Part4Opportunities />
        </ChapterSection>

        {/* PART 5 — STRATEGIES TO CAPTURE */}
        <ChapterSection id="part-5" number="05" title="Part 5 — Strategies to Capture (21 Action Plans)">
          <Part5Strategies />
        </ChapterSection>

        {/* PART 6 — THE BUILD */}
        <ChapterSection id="part-6" number="06" title="Part 6 — The Build, Phased Capex & Governance">
          <Part6TheBuild />
        </ChapterSection>

        {/* PART 7 — THE GAP AUDIT */}
        <ChapterSection id="part-7" number="07" title="Part 7 — The Gap Audit (The Centerpiece)">
          <Part7GapAudit />
        </ChapterSection>

        {/* SOURCE LIST & THE SIX ASKS OF OWNERSHIP */}
        <SourceListAndAsks />
      </main>

      {/* Footer */}
      <footer className="mx-auto mt-16 flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-hairline px-4 py-10 sm:mt-20 sm:flex-row sm:px-6 sm:py-12">
        <div className="text-eyebrow text-sage-dim text-center sm:text-left">
          THE TWANG’AA TRANSFORMATION v2.0 • NYOTA FM 107.3 • STRICTLY CONFIDENTIAL
        </div>
        <img
          src="https://res.cloudinary.com/da5j0zjok/image/upload/v1786407396/Horizontal_logo_clear_png_v0cjbd.png"
          alt="Firefly Management"
          className="h-4 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity"
        />
      </footer>

      <BackToTop />
    </div>
  );
}
