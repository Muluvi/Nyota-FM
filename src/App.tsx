import React from 'react';
import { Header } from './components/ledger/Header';
import { BackToTop } from './components/ledger/BackToTop';
import { ChapterSection } from './components/ledger/ChapterSection';
import { Reveal } from './components/ledger/Reveal';
import { LedgerCard } from './components/ledger/LedgerCard';
import { LedgerRow } from './components/ledger/LedgerRow';

// Strategic Document Modules (PDF 1–45)
import { LetterToOwnership } from './components/ledger/LetterToOwnership';
import { ExecutiveSummaryPillars } from './components/ledger/ExecutiveSummaryPillars';
import { Part1MarketOpportunity } from './components/ledger/Part1MarketOpportunity';
import { Part2BrandStudio } from './components/ledger/Part2BrandStudio';
import { Part3Programming } from './components/ledger/Part3Programming';
import { Part4Revenue } from './components/ledger/Part4Revenue';
import { Part5DigitalChannel } from './components/ledger/Part5DigitalChannel';
import { Part6ExecutionGovernance } from './components/ledger/Part6ExecutionGovernance';
import { Part7Appendices } from './components/ledger/Part7Appendices';

// Interactive Ledger Tooling
import { EquipmentChapter } from './components/ledger/EquipmentChapter';
import { ListenersChapter } from './components/ledger/ListenersChapter';
import { MonetizationChapter } from './components/ledger/MonetizationChapter';
import { PlatformsChapter } from './components/ledger/PlatformsChapter';
import { RoadmapChapter } from './components/ledger/RoadmapChapter';

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-paper font-body selection:bg-brass selection:text-ink pb-24">
      <Header />
      
      <main className="max-w-[640px] mx-auto px-4 md:px-0 pt-16">
        
        {/* Cover / Hero Block */}
        <section id="hero" className="pt-16 pb-12 border-b border-hairline">
          <Reveal>
            <div className="flex items-center justify-between text-eyebrow text-sage-dim mb-4 tracking-widest pb-3 border-b border-hairline">
              <span>THE TWANG’AA TRANSFORMATION</span>
              <span className="text-brass">NYOTA FM 107.3</span>
            </div>

            <div className="text-eyebrow text-brass mb-2 font-mono tracking-widest">
              HAPA TULIPO, TWANG’AA
            </div>
            
            <h1 className="font-display text-paper leading-[1.08] mb-4 text-3xl sm:text-4xl">
              THE TWANG’AA TRANSFORMATION
            </h1>
            
            <p className="font-display italic text-sage text-base sm:text-lg mb-6 leading-snug">
              A Strategic Plan for Brand, Studio, Programming, Digital & Commercial Leadership of Western Kenya, 2026–2028.
            </p>

            <div className="p-3.5 bg-ink-2 rounded border border-hairline flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-sage-dim gap-2">
              <span className="text-paper font-medium">PREPARED FOR NYOTA FM OWNERSHIP</span>
              <span className="text-brass font-semibold">STRICTLY CONFIDENTIAL</span>
            </div>
          </Reveal>
        </section>

        {/* Strategic Memorandum Letter */}
        <section id="letter">
          <Reveal delay={20}>
            <LetterToOwnership />
          </Reveal>
        </section>

        {/* Executive Summary — The Growth Thesis */}
        <ChapterSection id="summary" number="00" title="Executive Summary — The Growth Thesis">
          <Reveal delay={30}>
            <ExecutiveSummaryPillars />
          </Reveal>
        </ChapterSection>

        {/* PART I: The Market Opportunity */}
        <ChapterSection id="part-1" number="P.I" title="Part I: The Market Opportunity — Why Now, Why Nyota">
          <Reveal delay={30}>
            <Part1MarketOpportunity />
          </Reveal>
        </ChapterSection>

        {/* PART II: The Firefly Growth Engine */}
        <ChapterSection id="part-2" number="P.II" title="Part II: The Firefly Growth Engine — Brand & Studio Build-Out">
          <Reveal delay={30}>
            <Part2BrandStudio />
            <div className="mt-10 pt-8 border-t border-hairline">
              <div className="text-eyebrow text-brass mb-4">Interactive Studio Blueprint & Hardware Ledger</div>
              <EquipmentChapter />
            </div>
          </Reveal>
        </ChapterSection>

        {/* PART III: Programming Reinvention */}
        <ChapterSection id="part-3" number="P.III" title="Part III: Programming Reinvention">
          <Reveal delay={30}>
            <Part3Programming />
            <div className="mt-10 pt-8 border-t border-hairline">
              <div className="text-eyebrow text-brass mb-4">Audience Archetypes & Listening Schedules</div>
              <ListenersChapter />
            </div>
          </Reveal>
        </ChapterSection>

        {/* PART IV: The Revenue Architecture */}
        <ChapterSection id="part-4" number="P.IV" title="Part IV: The Revenue Architecture — Eight Streams to Growth">
          <Reveal delay={30}>
            <Part4Revenue />
            <div className="mt-10 pt-8 border-t border-hairline">
              <div className="text-eyebrow text-brass mb-4">Commercial Simulator & M-Pesa Till Engine</div>
              <MonetizationChapter />
            </div>
          </Reveal>
        </ChapterSection>

        {/* PART V: Digital Channel Architecture */}
        <ChapterSection id="part-5" number="P.V" title="Part V: Digital Channel Architecture">
          <Reveal delay={30}>
            <Part5DigitalChannel />
            <div className="mt-10 pt-8 border-t border-hairline">
              <div className="text-eyebrow text-brass mb-4">Channel Deep Dive & Content Atomization</div>
              <PlatformsChapter />
            </div>
          </Reveal>
        </ChapterSection>

        {/* PART VI: Execution & Governance */}
        <ChapterSection id="part-6" number="P.VI" title="Part VI: Execution & Governance">
          <Reveal delay={30}>
            <Part6ExecutionGovernance />
            <div className="mt-10 pt-8 border-t border-hairline">
              <div className="text-eyebrow text-brass mb-4">Quarterly Roadmap & Field Activation Engine</div>
              <RoadmapChapter />
            </div>
          </Reveal>
        </ChapterSection>

        {/* APPENDICES */}
        <ChapterSection id="appendices" number="APP" title="Appendices & Supporting Material">
          <Reveal delay={30}>
            <Part7Appendices />
          </Reveal>
        </ChapterSection>

      </main>
      
      {/* Footer */}
      <footer className="max-w-[640px] mx-auto px-4 md:px-0 py-12 flex flex-col sm:flex-row items-center justify-between border-t border-hairline mt-20 gap-4">
        <div className="text-eyebrow text-sage-dim text-center sm:text-left">
          THE TWANG’AA TRANSFORMATION • NYOTA FM 107.3 • STRICTLY CONFIDENTIAL
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
