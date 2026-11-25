import React, { useState } from 'react';
import { Award, TrendingUp, Sparkles, Filter, CheckCircle2, ArrowRight } from 'lucide-react';
import { TierBadge } from './TierBadge';
import { Reveal } from '../ledger/Reveal';
import { levers } from '../../data/levers';

type Opportunity = {
  rank: number;
  name: string;
  revenue: string;
  cost: string;
  time: string;
  difficulty: 'Low' | 'Medium' | 'High';
  score: number;
  highlight?: boolean;
  rationale: string;
};

const fmtM = (n: number) => (n >= 1_000_000 ? `${n / 1_000_000}M` : `${n / 1_000}K`);

export function Part4Opportunities() {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  // From src/data/levers.ts (annual revenue ranges, Tier 2).
  const opportunities: Opportunity[] = levers.map((l, i) => ({
    rank: i + 1,
    name: l.name,
    revenue: `KSh ${fmtM(l.lowKsh)} – ${fmtM(l.highKsh)}`,
    cost: l.activationCost,
    time: l.timeLabel,
    difficulty: l.difficulty,
    score: l.legacyScore,
    highlight: i < 5,
    rationale: l.rationale,
  }));

  const filtered = opportunities.filter((op) => {
    if (filterDifficulty === 'all') return true;
    return op.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
            <div>
              <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
                PART 4 · THE OPPORTUNITY MATRIX
              </span>
              <h4 className="font-display text-paper text-base font-semibold">12 Revenue Levers (ranked by the v2.0 composite score)</h4>
            </div>
            <TierBadge tier={2} citation="Opportunity EV Scoring Framework" />
          </div>

          <div className="p-3 bg-ink rounded border border-brass/40 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-2">
            <div className="text-paper">
              <span className="text-sage-dim">Score: </span>
              <strong className="text-brass">v2.0 composite (legacy)</strong>
              <span className="block text-sage font-body mt-1">
                The old formula counted probability twice and its inputs were not shown, so scores cannot be reproduced. It will be
                replaced by (annual mid-revenue × P(success)) ÷ (months to first revenue + activation cost) once the board agrees
                P(success) for each lever. Until then, use the score only as a rough order.
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sage text-[11px]">Filter Difficulty:</span>
              {['all', 'low', 'medium', 'high'].map((d) => (
                <button
                  key={d}
                  onClick={() => setFilterDifficulty(d)}
                  className={`px-2 py-0.5 rounded uppercase text-[10px] ${
                    filterDifficulty === d ? 'bg-brass text-ink font-bold' : 'bg-ink-2 text-sage hover:text-paper'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Master Ranked Table */}
          <div tabIndex={0} className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-hairline text-sage-dim">
                  <th className="py-2 pr-2">Rank</th>
                  <th className="py-2 px-2">Opportunity Lever</th>
                  <th className="py-2 px-2">Annual Revenue (Tier 2)</th>
                  <th className="py-2 px-2">Activation Cost</th>
                  <th className="py-2 px-2">Time to Revenue</th>
                  <th className="py-2 px-2">Difficulty</th>
                  <th className="py-2 pl-2">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {filtered.map((op) => (
                  <tr key={op.rank} className={`hover:bg-ink ${op.highlight ? 'bg-brass/5' : ''}`}>
                    <td className="py-2.5 pr-2">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                        op.rank <= 3 ? 'bg-brass text-ink' : op.rank <= 5 ? 'bg-hairline text-brass' : 'text-sage-dim'
                      }`}>
                        #{op.rank}
                      </span>
                    </td>
                    <td className="py-2.5 px-2">
                      <div className="font-bold text-paper text-sm">{op.name}</div>
                      <div className="text-[11px] text-sage font-body line-clamp-1">{op.rationale}</div>
                    </td>
                    <td className="py-2.5 px-2 font-bold text-emerald-400 whitespace-nowrap">{op.revenue}</td>
                    <td className="py-2.5 px-2 text-sage whitespace-nowrap">{op.cost}</td>
                    <td className="py-2.5 px-2 text-paper whitespace-nowrap">{op.time}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        op.difficulty === 'Low' ? 'bg-moss/20 text-emerald-300' :
                        op.difficulty === 'Medium' ? 'bg-brass/20 text-amber-300' : 'bg-brick/20 text-rose-300'
                      }`}>
                        {op.difficulty}
                      </span>
                    </td>
                    <td className="py-2.5 pl-2 font-bold text-brass text-sm">{op.score.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top 5 Priorities Deep-Dive Cards */}
          <div className="pt-4 border-t border-hairline space-y-3">
            <h5 className="font-display text-sm text-paper font-semibold flex items-center gap-2">
              <Sparkles size={14} className="text-brass" />
              <span>The Board's Top Five Commercial Priorities</span>
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3.5 bg-ink rounded border border-brass/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-brass font-bold text-sm">#1 GAA & County Vendor</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-brass text-ink font-bold">8.5</span>
                </div>
                <p className="text-sage text-[11px] font-body leading-snug">
                  Highest expected cash flow (KSh 2M–8M). Formalises institutional relations with Bungoma & Kakamega; provides accredited access to 2027 electoral campaigns.
                </p>
              </div>

              <div className="p-3.5 bg-ink rounded border border-brass/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-brass font-bold text-sm">#2 WhatsApp / USSD</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-brass text-ink font-bold">8.2</span>
                </div>
                <p className="text-sage text-[11px] font-body leading-snug">
                  Uncontested ground. Direct two-way listener database bypasses social algorithms and unlocks subscription polls, classifieds, and mobile airtime rewards.
                </p>
              </div>

              <div className="p-3.5 bg-ink rounded border border-brass/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-brass font-bold text-sm">#3 Branded Shows</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-brass text-ink font-bold">7.8</span>
                </div>
                <p className="text-sage text-[11px] font-body leading-snug">
                  Four high-production formats with title sponsors (KSh 80K–150K/mo each). Guaranteed delivery with zero live presenting risk.
                </p>
              </div>

              <div className="p-3.5 bg-ink rounded border border-hairline space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-paper font-bold text-sm">#4 Outside Broadcast (OB)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-hairline text-brass font-bold">7.2</span>
                </div>
                <p className="text-sage text-[11px] font-body leading-snug">
                  Translates "Hapa Tulipo" into visceral physical community footprint across Bungoma, Kakamega, and Trans Nzoia market centres.
                </p>
              </div>

              <div className="p-3.5 bg-ink rounded border border-hairline space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-paper font-bold text-sm">#5 YouTube & Video</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-hairline text-brass font-bold">6.9</span>
                </div>
                <p className="text-sage text-[11px] font-body leading-snug">
                  Leverages Studio Phase 1 visual radio PTZ camera feeds to build an indexed, monetised digital video library on YouTube and Facebook.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Social and streaming touchpoint rate card */}
      <Reveal>
        <section className="bg-ink-2 border border-brass/40 rounded p-4 sm:p-5" aria-labelledby="touchpoint-rate-card-title">
          <div className="flex flex-col gap-2 border-b border-hairline pb-4">
            <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold">
              PART 4A · DIGITAL COMMERCIAL INVENTORY
            </span>
            <h4 id="touchpoint-rate-card-title" className="font-display text-paper text-lg font-semibold">
              The Touchpoint Ecosystem — Buy More Than Airtime
            </h4>
            <p className="max-w-3xl text-sm leading-relaxed text-sage">
              Companies and institutions can now buy targeted visibility across Nyota FM&apos;s social, video, streaming, metadata, and community channels—not only traditional radio spots. Each touchpoint can be purchased individually or bundled into a campaign.
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <h5 className="font-display text-paper text-sm font-semibold">Social, Streaming &amp; Activation Rate Card</h5>
            <p className="text-xs text-sage-dim">Indicative prices in KSh. Final proposals are packaged around campaign objectives, production requirements, reach, and exclusivity.</p>
          </div>
          <p className="mt-3 text-xs text-sage">
            The single social and streaming rate card (50 touchpoints) is in the{' '}
            <a href="#touchpoint-ecosystem" className="text-brass underline underline-offset-2 hover:text-paper">
              Touchpoint Ecosystem
            </a>{' '}
            section.
          </p>
        </section>
      </Reveal>

    </div>
  );
}
