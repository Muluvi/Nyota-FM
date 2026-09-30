import React, { useState } from 'react';
import { Award, TrendingUp, Sparkles, Filter, CheckCircle2, ArrowRight } from 'lucide-react';
import { TierBadge } from './TierBadge';
import { Reveal } from '../ledger/Reveal';
import { AdCampaignCalculator } from '../website/AdCampaignCalculator';

interface Opportunity {
  rank: number;
  name: string;
  revenue: string;
  cost: string;
  time: string;
  difficulty: 'Low' | 'Medium' | 'High';
  score: number;
  highlight?: boolean;
  rationale: string;
}

export function Part4Opportunities() {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const opportunities: Opportunity[] = [
    {
      rank: 1,
      name: 'GAA / County Government Vendor',
      revenue: 'KSh 2M – 8M',
      cost: 'Low – Medium',
      time: '6–12 months',
      difficulty: 'Medium',
      score: 8.5,
      highlight: true,
      rationale: 'Highest expected value, relationship-driven institutional spend, and the vital operational gateway to political advertising in 2027.'
    },
    {
      rank: 2,
      name: 'WhatsApp / USSD Engagement Products',
      revenue: 'KSh 1M – 3M',
      cost: 'Medium',
      time: '3–6 months',
      difficulty: 'Medium',
      score: 8.2,
      highlight: true,
      rationale: 'Uncontested commercial space in Western Kenya; directly builds the addressable audience and delivers recurring transactional income.'
    },
    {
      rank: 3,
      name: 'Branded / Sponsored Pre-Recorded Shows',
      revenue: 'KSh 2M – 5M',
      cost: 'Medium',
      time: '3–6 months',
      difficulty: 'Low',
      score: 7.8,
      highlight: true,
      rationale: 'Four disciplined show packages with title sponsorship potential, low execution risk, and zero live airtime volatility.'
    },
    {
      rank: 4,
      name: 'Outside Broadcast (OB) Circuit',
      revenue: 'KSh 2M – 4M',
      cost: 'High',
      time: '3–6 months',
      difficulty: 'Medium',
      score: 7.2,
      highlight: true,
      rationale: 'The "Hapa Tulipo" roadshow transforms the tagline into physical community activations and high-value advertiser sponsorships.'
    },
    {
      rank: 5,
      name: 'YouTube + Social Media Monetisation',
      revenue: 'KSh 600K – 2.4M',
      cost: 'Low',
      time: '3–6 months',
      difficulty: 'Medium',
      score: 6.9,
      highlight: true,
      rationale: 'Low marginal production cost, infinitely scalable archive, and foundational asset builder for digital sponsorships.'
    },
    {
      rank: 6,
      name: 'Podcast Advertising & Distribution',
      revenue: 'KSh 500K – 2M',
      cost: 'Low',
      time: '6–12 months',
      difficulty: 'Medium',
      score: 6.5,
      rationale: 'Extracts evergreen on-demand value from studio recordings and reaches urban diaspora listeners on Spotify/Apple.'
    },
    {
      rank: 7,
      name: 'Political Advertising (2027 General Election)',
      revenue: 'KSh 2M – 10M (episodic)',
      cost: 'Low',
      time: 'Q3 2027',
      difficulty: 'Low',
      score: 6.2,
      rationale: 'Massive cyclical cash injection across Western Kenya gubernatorial, senatorial, and parliamentary contests.'
    },
    {
      rank: 8,
      name: 'Agriculture Value-Chain Advertising',
      revenue: 'KSh 500K – 2M',
      cost: 'Medium',
      time: '6–12 months',
      difficulty: 'Medium',
      score: 5.8,
      rationale: 'Key economic engine of Bungoma and Trans Nzoia; commands loyal sponsor budgets from seed companies, fertilizer, and agro-vets.'
    },
    {
      rank: 9,
      name: 'Syndication & Content Licensing',
      revenue: 'KSh 500K – 2M',
      cost: 'Medium',
      time: '12–18 months',
      difficulty: 'High',
      score: 5.2,
      rationale: 'Sub-regional distribution of high-production shows to community stations across the East Africa border belt.'
    },
    {
      rank: 10,
      name: 'Diaspora Engagement & Greetings',
      revenue: 'KSh 500K – 2M',
      cost: 'Medium',
      time: '6–12 months',
      difficulty: 'High',
      score: 5.0,
      rationale: 'High purchasing power diaspora in Nairobi, the Gulf, the UK, and North America seeking direct home connection.'
    },
    {
      rank: 11,
      name: 'Merchandise Catalogue (12 SKUs)',
      revenue: 'KSh 200K – 500K (net)',
      cost: 'Low – Medium',
      time: '3–6 months',
      difficulty: 'Low',
      score: 4.8,
      rationale: 'Physical brand affinity and pride; deployed via print-on-demand to eradicate inventory capital risk.'
    },
    {
      rank: 12,
      name: 'Live Events Ticketing',
      revenue: 'KSh 500K – 3M',
      cost: 'High',
      time: '6–12 months',
      difficulty: 'High',
      score: 4.5,
      rationale: 'High crowd energy but volatile logistics and security exposure; recommended only as marquee annual tentpoles.'
    },
  ];

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
              <h4 className="font-display text-paper text-base font-semibold">12 Revenue Levers Ranked by Mathematical Composite Score</h4>
            </div>
            <TierBadge tier={2} citation="Opportunity EV Scoring Framework" />
          </div>

          <div className="p-3 bg-ink rounded border border-brass/40 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-2">
            <div className="text-paper">
              <span className="text-sage-dim">Ranking Equation: </span>
              <strong className="text-brass">Composite Score = (Expected Value × Probability of Success) ÷ Time to Revenue</strong>
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
          <div className="overflow-x-auto">
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

      {/* Interactive Advertising Rate Card & Campaign Builder */}
      <Reveal>
        <AdCampaignCalculator />
      </Reveal>
    </div>
  );
}
