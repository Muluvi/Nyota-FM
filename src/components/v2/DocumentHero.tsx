import React, { useState } from 'react';
import { Database, Calculator, HelpCircle, ShieldCheck, ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { Reveal } from '../ledger/Reveal';

interface DocumentHeroProps {
  onNavigate: (sectionId: string) => void;
}

export function DocumentHero({ onNavigate }: DocumentHeroProps) {
  const [activeTierDemo, setActiveTierDemo] = useState<1 | 2 | 0 | null>(null);

  const parts = [
    { id: 'part-1', num: 'PART 1', title: 'The Objectives', desc: 'Five Ownership Objectives (A–E) reality-checked against 2026 data' },
    { id: 'part-2', num: 'PART 2', title: 'The Data (Master Data Annexure)', desc: '8 empirical data domains, 25+ benchmarked tables & vendor rate cards' },
    { id: 'part-3', num: 'PART 3', title: 'Data Analysis', desc: 'Revenue concentrations, v1.0 stress-tests, whitespace & payback model' },
    { id: 'part-4', num: 'PART 4', title: 'The Opportunities', desc: '12 revenue levers ranked by EV × P(S) / Time composite formula' },
    { id: 'part-5', num: 'PART 5', title: 'Strategies to Capture', desc: '21 actionable, fully-costed strategies with receipts & milestone KPIs' },
    { id: 'part-6', num: 'PART 6', title: 'The Build', desc: '24-month roadmap, KSh 4.97M–9.60M studio schedule, staffing & governance' },
    { id: 'part-7', num: 'PART 7', title: 'The Gap Audit', desc: 'Checklist A (20 Gaps), Checklist B (40 Operational Items), Checklist C (12 Omitted Levers)' },
  ];

  return (
    <section id="hero" className="pt-10 pb-12 border-b border-hairline">
      <Reveal>
        {/* Document Header Bar */}
        <div className="flex flex-wrap items-center justify-between text-eyebrow text-sage-dim mb-4 tracking-widest pb-3 border-b border-hairline gap-2">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brass animate-ping" />
            <span>TRANSFORMATION PROGRAMME v2.0</span>
          </span>
          <span className="text-brass font-mono font-semibold">NYOTA FM 107.3 · WESTERN KENYA</span>
        </div>

        {/* Tagline & Main Title */}
        <div className="text-eyebrow text-brass mb-3 font-mono tracking-widest flex items-center gap-2">
          <span>HAPA TULIPO, TWANG’AA</span>
          <span className="text-sage-dim">·</span>
          <span className="text-sage text-[10px]">BOARD-READY PROPOSAL</span>
        </div>

        <h1 className="font-display text-paper leading-[1.06] mb-4 text-3xl sm:text-5xl">
          NYOTA FM 107.3 — THE TWANG'AA TRANSFORMATION v2.0
        </h1>

        <p className="font-display italic text-sage text-base sm:text-xl mb-6 leading-relaxed max-w-3xl">
          A Data-Backed, Board-Ready Proposal for Brand, Studio, Programming, Digital & Commercial Leadership of Western Kenya, 2026–2028.
        </p>

        {/* Metadata Badge Block */}
        <div className="p-4 bg-ink-2 rounded border border-hairline flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-sage gap-3 mb-8">
          <div>
            <span className="text-paper font-semibold block sm:inline">PREPARED FOR NYOTA FM OWNERSHIP</span>
            <span className="hidden sm:inline mx-2 text-sage-dim">|</span>
            <span className="text-sage-dim">Firefly Management · Strategy Directorate</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sage-dim">September 2026</span>
            <span className="px-2 py-0.5 rounded bg-brass/20 text-brass border border-brass/40 font-semibold tracking-wider">
              STRICTLY CONFIDENTIAL
            </span>
          </div>
        </div>

        {/* Executive Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          <div className="bg-ink-2 p-3.5 rounded border border-hairline">
            <div className="text-[10px] font-mono uppercase text-sage-dim tracking-wider mb-1">Evidence Base</div>
            <div className="font-mono text-xl sm:text-2xl text-paper font-bold flex items-center gap-1.5">
              <span>37</span>
              <span className="text-[11px] font-normal text-emerald-400">Sources</span>
            </div>
            <div className="text-[11px] text-sage mt-1">KNBS, CA Kenya, GeoPoll, ReelAnalytics</div>
          </div>

          <div className="bg-ink-2 p-3.5 rounded border border-hairline">
            <div className="text-[10px] font-mono uppercase text-sage-dim tracking-wider mb-1">Studio Phase 1 Capex</div>
            <div className="font-mono text-xl sm:text-2xl text-brass font-bold flex items-center gap-1.5">
              <span>KSh 627K</span>
              <span className="text-[10px] font-normal text-sage-dim">– 837K</span>
            </div>
            <div className="text-[11px] text-sage mt-1">vs v1.0's KSh 2.2M–3.8M estimate</div>
          </div>

          <div className="bg-ink-2 p-3.5 rounded border border-hairline">
            <div className="text-[10px] font-mono uppercase text-sage-dim tracking-wider mb-1">Operational Build</div>
            <div className="font-mono text-xl sm:text-2xl text-paper font-bold flex items-center gap-1.5">
              <span>40</span>
              <span className="text-[11px] font-normal text-brass">Items</span>
            </div>
            <div className="text-[11px] text-sage mt-1">Costed, scheduled & assigned</div>
          </div>

          <div className="bg-ink-2 p-3.5 rounded border border-hairline">
            <div className="text-[10px] font-mono uppercase text-sage-dim tracking-wider mb-1">Action Strategies</div>
            <div className="font-mono text-xl sm:text-2xl text-emerald-400 font-bold flex items-center gap-1.5">
              <span>21</span>
              <span className="text-[11px] font-normal text-sage-dim">Plans</span>
            </div>
            <div className="text-[11px] text-sage mt-1">Every plan with receipts & KPIs</div>
          </div>
        </div>

        {/* HOW TO READ THIS DOCUMENT CARD */}
        <div className="bg-ink-2 border border-brass/40 rounded p-5 sm:p-6 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brass/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} className="text-brass" />
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-brass">
              HOW TO READ THIS DOCUMENT — v2.0 REVOLUTION
            </span>
          </div>

          <p className="text-sm sm:text-base text-paper/95 leading-relaxed mb-4">
            This is <strong className="text-brass font-semibold">v2.0</strong>. It supersedes the v1.0 Twang'aa Transformation (May 2026).
            v1.0 was strategically sound but evidentially hollow. It stated that <em className="text-sage italic">"all financial figures are illustrative,"</em> presented no audited baseline, no competitor financials, no prevailing ad rates, no platform economics, and no research to support its targets. Ownership asked for bankable numbers. This document supplies them.
          </p>

          <div className="text-xs text-sage mb-3">
            Every figure in this document is labelled as one of three strict validation tiers. Click any tier below to preview its audit standard:
          </div>

          {/* Three Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Tier 1 */}
            <div 
              onClick={() => setActiveTierDemo(activeTierDemo === 1 ? null : 1)}
              className={`p-3.5 rounded border transition-all cursor-pointer ${activeTierDemo === 1 ? 'border-emerald-400 bg-moss/20 ring-1 ring-emerald-400' : 'border-moss/40 bg-moss/10 hover:border-moss'}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded bg-moss/30 border border-moss text-emerald-300 font-semibold">
                  <Database size={10} className="mr-1" /> TIER 1 · HARD DATA
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Primary Citation</span>
              </div>
              <p className="text-xs text-paper/90 leading-snug">
                A figure traceable to a named, citable source with a URL and access date.
              </p>
              <div className="mt-2 text-[10px] font-mono text-sage-dim">
                Format: <code className="text-emerald-300">(Source: [Name], [URL], accessed [date])</code>
              </div>
            </div>

            {/* Tier 2 */}
            <div 
              onClick={() => setActiveTierDemo(activeTierDemo === 2 ? null : 2)}
              className={`p-3.5 rounded border transition-all cursor-pointer ${activeTierDemo === 2 ? 'border-brass bg-brass/20 ring-1 ring-brass' : 'border-brass/40 bg-brass/10 hover:border-brass'}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded bg-brass/30 border border-brass text-amber-300 font-semibold">
                  <Calculator size={10} className="mr-1" /> TIER 2 · MODELLED
                </span>
                <span className="text-[10px] font-mono text-amber-400">Derivation</span>
              </div>
              <p className="text-xs text-paper/90 leading-snug">
                A figure derived from Tier 1 inputs using a stated, reproducible mathematical method.
              </p>
              <div className="mt-2 text-[10px] font-mono text-sage-dim">
                Format: <code className="text-amber-300">(Modelled estimate. Method: [...]. Inputs: [...].)</code>
              </div>
            </div>

            {/* Tier 0 */}
            <div 
              onClick={() => setActiveTierDemo(activeTierDemo === 0 ? null : 0)}
              className={`p-3.5 rounded border transition-all cursor-pointer ${activeTierDemo === 0 ? 'border-rose-400 bg-brick/30 ring-1 ring-rose-400' : 'border-brick/50 bg-brick/15 hover:border-rose-400'}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded bg-brick/40 border border-brick text-rose-300 font-semibold">
                  <HelpCircle size={10} className="mr-1" /> TIER 0 · DATA GAP
                </span>
                <span className="text-[10px] font-mono text-rose-400">Primary Research</span>
              </div>
              <p className="text-xs text-paper/90 leading-snug">
                A number the proposal needs but that cannot be responsibly sourced or modelled without field testing.
              </p>
              <div className="mt-2 text-[10px] font-mono text-sage-dim">
                Format: <code className="text-rose-300">(DATA GAP — requires primary research. Method: [...]. Cost: [...].)</code>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between text-xs text-sage font-mono">
            <span>No figure appears unlabelled throughout this proposal.</span>
            <span className="text-brass">Zero generic speculation.</span>
          </div>
        </div>

        {/* Seven-Part Architecture Navigation Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-sage-dim flex items-center gap-2">
              <Layers size={13} className="text-brass" />
              <span>THE SEVEN-PART BOARD ARCHITECTURE</span>
            </h3>
            <span className="text-[11px] font-mono text-brass">Click to jump</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {parts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => onNavigate(p.id)}
                className="p-3 bg-ink-2 hover:bg-ink border border-hairline hover:border-brass/60 rounded text-left transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] text-brass font-semibold group-hover:translate-x-0.5 transition-transform">
                      {p.num}
                    </span>
                    <ArrowRight size={12} className="text-sage-dim group-hover:text-brass transition-colors" />
                  </div>
                  <div className="font-display text-sm text-paper font-medium mb-1">
                    {p.title}
                  </div>
                  <div className="text-xs text-sage leading-snug">
                    {p.desc}
                  </div>
                </div>
              </button>
            ))}

            {/* Quick jump to Sources & The 6 Asks */}
            <button
              onClick={() => onNavigate('part-asks')}
              className="p-3 bg-brass/10 hover:bg-brass/20 border border-brass/40 hover:border-brass rounded text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] text-brass font-bold">THE CONCLUSION</span>
                  <CheckCircle2 size={12} className="text-brass" />
                </div>
                <div className="font-display text-sm text-paper font-medium mb-1">
                  The Six Asks of Ownership & Source List
                </div>
                <div className="text-xs text-sage leading-snug">
                  Board sign-off scorecard, capital commitments & 37 verified master sources
                </div>
              </div>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
