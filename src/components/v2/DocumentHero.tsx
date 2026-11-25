import React, { useState } from 'react';
import { Database, Calculator, HelpCircle, ArrowRight, Layers, Radio, Sparkles, CheckCircle2, TrendingUp, Sliders, ExternalLink } from 'lucide-react';
import { factValue } from '../../data/facts';
import { Reveal } from '../ledger/Reveal';
import { chapterSections } from '../../content/sections';
import { DecisionSummary } from './DecisionSummary';

interface DocumentHeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenBriefing?: () => void;
}

export function DocumentHero({ onNavigate, onOpenBriefing }: DocumentHeroProps) {
  const [activeTierTab, setActiveTierTab] = useState<1 | 2 | 0>(1);

  const DESCRIPTIONS: Record<string, string> = {
    situation: 'Radio reach, listening by language, the ad market and devices: the evidence the plan rests on.',
    objectives: 'Five mandates (A–E), each tested against current evidence and restated as a proposed v2 target.',
    opportunity: '12 revenue levers and the single social and streaming rate card.',
    plan: '21 strategies dated from Month 0, with owners, budgets and KPIs.',
    build: 'Studio phases, power, outside broadcasts and people, with phase gates.',
    money: 'Revenue concentration, the revenue index and the payback model (under revision).',
    risks: 'What v1 got wrong, the biggest risks, and the gap audit.',
    asks: 'The six decisions, the honest self-check and the printable resolution sheet.',
  };
  const sections = chapterSections
    .filter((s) => s.id !== 'overview' && s.id !== 'asks')
    .map((s) => ({ id: s.id, num: s.number, title: s.shortTitle, desc: DESCRIPTIONS[s.id] ?? s.title, badge: `Part ${s.number}` }));

  return (
    <section id="overview" className="pt-6 sm:pt-10 pb-16 border-b border-hairline">
      <Reveal>
        {/* Top Status Eyebrow Bar */}
        <div className="flex flex-wrap items-center justify-between text-eyebrow text-sage-dim mb-4 tracking-widest pb-3 border-b border-hairline gap-2">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-moss" />
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
            A comprehensive, data-backed strategic platform for Nyota FM 107.3 — scaling broadcast reach, digital engagement, and commercial sustainability across ≈6 million people (KNBS 2019) over the 24 months from board approval.
          </p>

          <p className="font-body text-paper/85 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 max-w-2xl">
            Built on published Kenyan market data and phased studio economics. Every figure carries an evidence tier, and every gap we could not close is declared, with a plan and an owner.
          </p>

          {/* Quick CTA Actions */}
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 mb-8 sm:mb-10">
            <button
              type="button"
              onClick={() => onNavigate('plan')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass px-4 sm:px-5 py-3 text-xs font-mono uppercase tracking-wider text-ink font-bold shadow-lg transition-all hover:brightness-110 active:scale-95 min-h-[44px]"
            >
              <span>Explore 21 Action Plans</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('money')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-brass/50 bg-brass/10 px-4 sm:px-5 py-3 text-xs font-mono uppercase tracking-wider text-brass font-semibold transition-all hover:bg-brass/20 active:scale-95 min-h-[44px]"
            >
              <Sliders size={14} />
              <span>Analysis &amp; Payback</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('situation')}
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

        <div className="mb-10">
          <DecisionSummary onNavigate={onNavigate} />
        </div>

        {/* Live Animated Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-8 sm:mb-12">
          <div className="bg-ink-2 p-4 rounded-xl border border-hairline hover:border-brass/40 transition-colors group">
            <div className="text-xs font-mono uppercase text-sage-dim tracking-wider mb-1">
              Evidence Standard
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-paper font-bold flex items-center gap-1.5 group-hover:text-brass transition-colors">
              <span>41</span>
              <span className="text-xs font-normal text-moss">Sources</span>
            </div>
            <div className="text-[11px] text-sage mt-1">
              Registry with tiers; deep links being added
            </div>
          </div>

          <div className="bg-ink-2 p-4 rounded-xl border border-hairline hover:border-brass/40 transition-colors group">
            <div className="text-xs font-mono uppercase text-sage-dim tracking-wider mb-1">
              Phase 1 Studio Capex
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-brass font-bold flex items-center gap-1 group-hover:brightness-110 transition-colors">
              <span>KSh 627K–837K</span>
            </div>
            <div className="text-[11px] text-sage mt-1">
              Phase 1 only · local vendor quotes
            </div>
          </div>

          <div className="bg-ink-2 p-4 rounded-xl border border-hairline hover:border-brass/40 transition-colors group">
            <div className="text-xs font-mono uppercase text-sage-dim tracking-wider mb-1">
              Operational Build
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-paper font-bold flex items-center gap-1.5 group-hover:text-brass transition-colors">
              <span>40</span>
              <span className="text-xs font-normal text-brass">Items</span>
            </div>
            <div className="text-[11px] text-sage mt-1">
              Build checklist items with owners
            </div>
          </div>

          <div className="bg-ink-2 p-4 rounded-xl border border-hairline hover:border-brass/40 transition-colors group">
            <div className="text-xs font-mono uppercase text-sage-dim tracking-wider mb-1">
              Action Execution Plans
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-moss font-bold flex items-center gap-1.5 group-hover:brightness-110 transition-colors">
              <span>21</span>
              <span className="text-xs font-normal text-sage-dim">Strategies</span>
            </div>
            <div className="text-[11px] text-sage mt-1">
              Each with receipts & milestone KPIs
            </div>
          </div>
        </div>

        {/* EVIDENCE STANDARDS & METHODOLOGY EXPLORER */}
        <div className="bg-ink-2 border border-brass/40 rounded-xl p-5 sm:p-7 mb-14 relative overflow-hidden shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-xs font-bold text-brass uppercase tracking-wider">
                  Audit Protocol
                </span>
                <span className="font-mono text-xs text-sage-dim">· Three-Tier Evidence Standard</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-paper font-semibold mt-1">
                How to read our numbers: every figure carries an evidence tier
              </h3>
            </div>

            {/* Interactive Tier Switcher Tabs */}
            <div className="flex items-center gap-1.5 font-mono text-xs bg-ink p-1 rounded-lg border border-hairline">
              <button
                type="button"
                onClick={() => setActiveTierTab(1)}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                  activeTierTab === 1
                    ? 'bg-moss/10 text-moss font-semibold border border-moss/60'
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
                    ? 'bg-brass/30 text-brass font-semibold border border-brass/60'
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
                    ? 'bg-brick/10 text-brick-text font-semibold border border-brick/60'
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
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-moss font-semibold">
                    <span className="size-2 rounded-full bg-moss" />
                    TIER 1 · PRIMARY VERIFIED HARD DATA
                  </span>
                  <span className="text-[11px] font-mono text-sage-dim">Source registry in the appendix</span>
                </div>
                <p className="text-xs sm:text-sm text-paper/90 leading-relaxed font-body">
                  Traceable to a named, publicly citable institution or documented vendor quote. Includes the Kenya National Bureau of Statistics (KNBS) 2019 Census, Communications Authority of Kenya (CA) audience and sector statistics, Media Council of Kenya, ReelAnalytics broadcast monitoring, and Africa&apos;s Talking official rate cards.
                </p>
                <div className="p-2.5 rounded bg-ink-2 border border-hairline font-mono text-xs text-sage flex items-center justify-between">
                  <span data-fact="radio.reach.western">Example: radio reach in Western Kenya {factValue('radio.reach.western')} (CA, Apr–Jun 2026); {factValue('radio.listeners.national')} radio listeners nationally</span>
                  <span className="text-moss font-semibold">Published source</span>
                </div>
              </div>
            )}

            {activeTierTab === 2 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-brass font-semibold">
                    <span className="size-2 rounded-full bg-brass" />
                    TIER 2 · MODELLED ECONOMETRIC ESTIMATE
                  </span>
                  <span className="text-[11px] font-mono text-sage-dim">Reproducible Formulae</span>
                </div>
                <p className="text-xs sm:text-sm text-paper/90 leading-relaxed font-body">
                  Derived mathematically from Tier 1 verified inputs using an explicit, reproducible method. Used for revenue trajectories, outside broadcast yield projections, and digital conversion funnels.
                </p>
                <div className="p-2.5 rounded bg-ink-2 border border-hairline font-mono text-xs text-sage flex items-center justify-between">
                  <span>Example: revenue index 100 → 200 by Month 24 (base case)</span>
                  <span className="text-brass font-semibold">Math Stated</span>
                </div>
              </div>
            )}

            {activeTierTab === 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-brick-text font-semibold">
                    <span className="size-2 rounded-full bg-brick" />
                    TIER 0 · EXPLICIT DATA GAP
                  </span>
                  <span className="text-[11px] font-mono text-sage-dim">Primary Field Research Needed</span>
                </div>
                <p className="text-xs sm:text-sm text-paper/90 leading-relaxed font-body">
                  A figure the transformation model needs, but which cannot be responsibly sourced without dedicated on-the-ground field surveying. Instead of guessing, each gap is explicitly catalogued with recommended methodology, timeline, and budget.
                </p>
                <div className="p-2.5 rounded bg-ink-2 border border-hairline font-mono text-xs text-sage flex items-center justify-between">
                  <span>Example: Dial-level station recall in rural Bungoma wards (KSh 180K survey)</span>
                  <span className="text-brick-text font-semibold">Honest Gap Declared</span>
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
              <span>THE EIGHT CHAPTERS OF THE PROPOSAL</span>
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
              onClick={() => onNavigate('asks')}
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
                  The Six Asks & Source Registry
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
