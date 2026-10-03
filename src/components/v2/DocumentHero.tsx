import React, { useState } from 'react';
import { Database, Calculator, HelpCircle, ArrowRight, Layers, Radio, Sparkles, CheckCircle2, TrendingUp, Sliders, ExternalLink } from 'lucide-react';
import { Reveal } from '../ledger/Reveal';
import AnimatedCounter from '../AnimatedCounter';

interface DocumentHeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenBriefing?: () => void;
}

export function DocumentHero({ onNavigate, onOpenBriefing }: DocumentHeroProps) {
  const [activeTierTab, setActiveTierTab] = useState<1 | 2 | 0>(1);

  const sections = [
    { id: 'part-1', num: '01', title: 'Ownership Objectives', desc: '5 strategic mandates tested against 2026 Kenyan ad market reality.', badge: 'Part 1' },
    { id: 'part-2', num: '02', title: 'Sourced Data Room', desc: '8 empirical data domains, 2019 Census, ad rates & vendor quotes.', badge: 'Part 2' },
    { id: 'part-3', num: '03', title: 'Payback & ROI Model', desc: 'Interactive 8-quarter EBITDA simulation, break-even & cashflow.', badge: 'Part 3' },
    { id: 'part-4', num: '04', title: 'Opportunities Matrix', desc: '12 commercial revenue streams ranked by Expected Value formula.', badge: 'Part 4' },
    { id: 'part-5', num: '05', title: '21 Action Execution Plans', desc: 'Full implementation playbooks with verifiable receipts & KPIs.', badge: 'Part 5' },
    { id: 'part-6', num: '06', title: 'Phased Studio Build', desc: '24-month roadmap, KSh 627K–9.60M equipment schedule & staffing.', badge: 'Part 6' },
    { id: 'part-7', num: '07', title: 'Centerpiece Gap Audit', desc: 'Checklist A (20 Gaps), B (40 Build Items) & C (12 Reclaimed Levers).', badge: 'Part 7' },
  ];

  return (
    <section id="overview" className="pt-6 sm:pt-10 pb-16 border-b border-hairline">
      <Reveal>
        {/* Top Status Eyebrow Bar */}
        <div className="flex flex-wrap items-center justify-between text-eyebrow text-sage-dim mb-4 tracking-widest pb-3 border-b border-hairline gap-2">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-moss animate-ping" />
            <span className="text-moss font-semibold">107.3 FM BROADCAST PLATFORM</span>
          </span>
          <span className="text-brass font-mono font-semibold">
            WESTERN KENYA & LAKE BASIN HUB
          </span>
        </div>

        {/* Primary Station Headline & Lead Narrative */}
        <div className="max-w-4xl">
          <div className="text-eyebrow text-brass mb-2.5 sm:mb-3 font-mono tracking-widest flex items-center gap-1.5 sm:gap-2">
            <Sparkles size={12} className="shrink-0" />
            <span className="truncate">HAPA TULIPO, TWANG’AA · STRATEGIC TRANSFORMATION</span>
          </div>

          <h1 className="font-display text-paper leading-[1.08] mb-3 sm:mb-4 text-2xl sm:text-5xl lg:text-7xl font-semibold text-balance">
            The Voice of Western Kenya, Amplified.
          </h1>

          <p className="font-display italic text-sage text-base sm:text-xl lg:text-2xl mb-4 sm:mb-6 leading-relaxed max-w-3xl text-balance">
            A comprehensive, data-backed strategic platform for Nyota FM 107.3 — scaling broadcast reach, digital engagement, and commercial sustainability across 6M+ citizens from 2026 through 2028.
          </p>

          <p className="font-body text-paper/85 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 max-w-2xl">
            Built on verified Kenyan market realities, empirical audience research, and phased studio economics. Every target is backed by receipts; every revenue stream is costed; every operational gap is resolved.
          </p>

          {/* Quick CTA Actions */}
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 mb-8 sm:mb-10">
            <button
              type="button"
              onClick={() => onNavigate('part-5')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass px-4 sm:px-5 py-3 text-xs font-mono uppercase tracking-wider text-ink font-bold shadow-lg transition-all hover:brightness-110 active:scale-95 min-h-[44px]"
            >
              <span>Explore 21 Action Plans</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('part-3')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-brass/50 bg-brass/10 px-4 sm:px-5 py-3 text-xs font-mono uppercase tracking-wider text-brass font-semibold transition-all hover:bg-brass/20 active:scale-95 min-h-[44px]"
            >
              <Sliders size={14} />
              <span>Launch Payback Simulator</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('part-2')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-hairline bg-ink-2 px-4 sm:px-5 py-3 text-xs font-mono uppercase tracking-wider text-sage transition-all hover:border-paper hover:text-paper active:scale-95 min-h-[44px]"
            >
              <Database size={14} />
              <span>Inspect Data Room</span>
            </button>

            {onOpenBriefing && (
              <button
                type="button"
                onClick={onOpenBriefing}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-brass/60 bg-brass/15 px-4 sm:px-5 py-3 text-xs font-mono uppercase tracking-wider text-paper font-semibold transition-all hover:bg-brass hover:text-ink active:scale-95 shadow-md min-h-[44px]"
              >
                <Sparkles size={14} className="text-brass" />
                <span>Executive Board Mode</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Animated Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-8 sm:mb-12">
          <div className="bg-ink-2 p-4 rounded-xl border border-hairline hover:border-brass/40 transition-colors group">
            <div className="text-[10px] font-mono uppercase text-sage-dim tracking-wider mb-1">
              Evidence Standard
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-paper font-bold flex items-center gap-1.5 group-hover:text-brass transition-colors">
              <AnimatedCounter value={37} duration={1200} />
              <span className="text-xs font-normal text-emerald-400">Sources</span>
            </div>
            <div className="text-[11px] text-sage mt-1">
              KNBS, CA Kenya, GeoPoll & ReelAnalytics
            </div>
          </div>

          <div className="bg-ink-2 p-4 rounded-xl border border-hairline hover:border-brass/40 transition-colors group">
            <div className="text-[10px] font-mono uppercase text-sage-dim tracking-wider mb-1">
              Phase 1 Studio Capex
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-brass font-bold flex items-center gap-1 group-hover:brightness-110 transition-colors">
              <span>KSh</span>
              <AnimatedCounter value={627} duration={1400} />
              <span className="text-xs font-normal text-sage-dim">K – 837K</span>
            </div>
            <div className="text-[11px] text-sage mt-1">
              Sourced local hardware quotations
            </div>
          </div>

          <div className="bg-ink-2 p-4 rounded-xl border border-hairline hover:border-brass/40 transition-colors group">
            <div className="text-[10px] font-mono uppercase text-sage-dim tracking-wider mb-1">
              Operational Build
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-paper font-bold flex items-center gap-1.5 group-hover:text-brass transition-colors">
              <AnimatedCounter value={40} duration={1000} />
              <span className="text-xs font-normal text-brass">Items</span>
            </div>
            <div className="text-[11px] text-sage mt-1">
              Scheduled, costed & accountability assigned
            </div>
          </div>

          <div className="bg-ink-2 p-4 rounded-xl border border-hairline hover:border-brass/40 transition-colors group">
            <div className="text-[10px] font-mono uppercase text-sage-dim tracking-wider mb-1">
              Action Execution Plans
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-emerald-400 font-bold flex items-center gap-1.5 group-hover:brightness-110 transition-colors">
              <AnimatedCounter value={21} duration={1000} />
              <span className="text-xs font-normal text-sage-dim">Strategies</span>
            </div>
            <div className="text-[11px] text-sage mt-1">
              Every strategy with receipts & milestone KPIs
            </div>
          </div>
        </div>

        {/* EVIDENCE STANDARDS & METHODOLOGY EXPLORER */}
        <div className="bg-ink-2 border border-brass/40 rounded-xl p-5 sm:p-7 mb-14 relative overflow-hidden shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-[10px] font-bold text-brass uppercase tracking-wider">
                  Audit Protocol
                </span>
                <span className="font-mono text-xs text-sage-dim">· Three-Tier Evidence Standard</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-paper font-semibold mt-1">
                Zero Speculation: Every Figure Classified by Rigour
              </h3>
            </div>

            {/* Interactive Tier Switcher Tabs */}
            <div className="flex items-center gap-1.5 font-mono text-xs bg-ink p-1 rounded-lg border border-hairline">
              <button
                type="button"
                onClick={() => setActiveTierTab(1)}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                  activeTierTab === 1
                    ? 'bg-moss/30 text-emerald-300 font-semibold border border-moss/60'
                    : 'text-sage hover:text-paper'
                }`}
              >
                <Database size={12} />
                <span>Tier 1 · Hard Data</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTierTab(2)}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                  activeTierTab === 2
                    ? 'bg-brass/30 text-amber-300 font-semibold border border-brass/60'
                    : 'text-sage hover:text-paper'
                }`}
              >
                <Calculator size={12} />
                <span>Tier 2 · Modelled</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTierTab(0)}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                  activeTierTab === 0
                    ? 'bg-brick/30 text-rose-300 font-semibold border border-brick/60'
                    : 'text-sage hover:text-paper'
                }`}
              >
                <HelpCircle size={12} />
                <span>Tier 0 · Data Gap</span>
              </button>
            </div>
          </div>

          {/* Active Tier Explanation Card */}
          <div className="rounded-lg bg-ink p-4 border border-hairline transition-all">
            {activeTierTab === 1 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    TIER 1 · PRIMARY VERIFIED HARD DATA
                  </span>
                  <span className="text-[11px] font-mono text-sage-dim">37 Documented Sources</span>
                </div>
                <p className="text-xs sm:text-sm text-paper/90 leading-relaxed font-body">
                  Traceable to a named, publicly citable institution or documented vendor quote. Includes Kenya National Bureau of Statistics (KNBS) 2019 Census, Communications Authority of Kenya (CA) Q2–Q4 2025/26 sector statistics, Media Council of Kenya, ReelAnalytics broadcast monitoring, and Africa&apos;s Talking official rate cards.
                </p>
                <div className="p-2.5 rounded bg-ink-2 border border-hairline font-mono text-xs text-sage flex items-center justify-between">
                  <span>Example: Weekly reach n=23.9M listeners, smartphone penetration 92.9%</span>
                  <span className="text-emerald-400 font-semibold">Strictly Verified</span>
                </div>
              </div>
            )}

            {activeTierTab === 2 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 font-semibold">
                    <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
                    TIER 2 · MODELLED ECONOMETRIC ESTIMATE
                  </span>
                  <span className="text-[11px] font-mono text-sage-dim">Reproducible Formulae</span>
                </div>
                <p className="text-xs sm:text-sm text-paper/90 leading-relaxed font-body">
                  Derived mathematically from Tier 1 verified inputs using an explicit, reproducible method. Used for market share trajectories, discounted cash flow payback schedules, outside broadcast yield projections, and digital conversion funnels.
                </p>
                <div className="p-2.5 rounded bg-ink-2 border border-hairline font-mono text-xs text-sage flex items-center justify-between">
                  <span>Example: EV = Yield × P(Success) / Time composite commercial ranking</span>
                  <span className="text-amber-400 font-semibold">Math Stated</span>
                </div>
              </div>
            )}

            {activeTierTab === 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-rose-300 font-semibold">
                    <span className="size-2 rounded-full bg-rose-400 animate-pulse" />
                    TIER 0 · EXPLICIT DATA GAP
                  </span>
                  <span className="text-[11px] font-mono text-sage-dim">Primary Field Research Needed</span>
                </div>
                <p className="text-xs sm:text-sm text-paper/90 leading-relaxed font-body">
                  A figure the transformation model needs, but which cannot be responsibly sourced without dedicated on-the-ground field surveying. Instead of guessing, each gap is explicitly catalogued with recommended methodology, timeline, and budget.
                </p>
                <div className="p-2.5 rounded bg-ink-2 border border-hairline font-mono text-xs text-sage flex items-center justify-between">
                  <span>Example: Dial-level station recall in rural Bungoma wards (KSh 180K survey)</span>
                  <span className="text-rose-400 font-semibold">Honest Gap Declared</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* INTERACTIVE TABLE OF CONTENTS / ARCHITECTURE CARDS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-sage flex items-center gap-2">
              <Layers size={14} className="text-brass" />
              <span>THE SEVEN BOARD ARCHITECTURE MODULES</span>
            </h3>
            <span className="text-xs font-mono text-brass">Click any card to jump</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {sections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => onNavigate(sec.id)}
                className="group p-4 bg-ink-2 hover:bg-ink border border-hairline hover:border-brass/70 rounded-xl text-left transition-all duration-200 shadow-md hover:shadow-xl flex flex-col justify-between min-h-[130px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-brass group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-brass/60" />
                      Part {sec.num}
                    </span>
                    <ArrowRight size={14} className="text-sage-dim group-hover:text-brass group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="font-display text-base text-paper font-semibold group-hover:text-brass transition-colors">
                    {sec.title}
                  </h4>
                  <p className="text-xs text-sage leading-relaxed mt-1 font-body">
                    {sec.desc}
                  </p>
                </div>
              </button>
            ))}

            {/* Closing Conclusions & Board Asks Card */}
            <button
              type="button"
              onClick={() => onNavigate('part-asks')}
              className="group p-4 bg-brass/10 hover:bg-brass/20 border border-brass/40 hover:border-brass rounded-xl text-left transition-all duration-200 shadow-md hover:shadow-xl flex flex-col justify-between min-h-[130px]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-brass group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-brass" />
                    Closing Action
                  </span>
                  <CheckCircle2 size={14} className="text-brass" />
                </div>
                <h4 className="font-display text-base text-paper font-semibold group-hover:text-brass transition-colors">
                  The Six Asks & 37 Sourced Citations
                </h4>
                <p className="text-xs text-sage leading-relaxed mt-1 font-body">
                  Formal governance resolutions, capital commitments & complete source registry.
                </p>
              </div>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
