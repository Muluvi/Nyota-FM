import React, { useState } from 'react';
import { 
  TrendingDown, Check, X, AlertCircle, AlertTriangle, ShieldAlert, 
  BarChart, ArrowUpRight, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { TierBadge } from './TierBadge';
import { Reveal } from '../ledger/Reveal';
import { InteractivePaybackSimulator } from '../website/InteractivePaybackSimulator';

export function Part3DataAnalysis() {
  const [selectedQuarter, setSelectedQuarter] = useState<number>(7); // Q4 2028 = Month 24 (index 7)

  const quarters = [
    { q: 'Q1 2027', spot: 100, nonSpot: 0, total: 100, mix: '0%' },
    { q: 'Q2 2027', spot: 100, nonSpot: 5, total: 105, mix: '5%' },
    { q: 'Q3 2027', spot: 102, nonSpot: 15, total: 117, mix: '13%' },
    { q: 'Q4 2027', spot: 105, nonSpot: 30, total: 135, mix: '22%' },
    { q: 'Q1 2028', spot: 108, nonSpot: 45, total: 153, mix: '29%' },
    { q: 'Q2 2028', spot: 112, nonSpot: 55, total: 167, mix: '33%' },
    { q: 'Q3 2028', spot: 115, nonSpot: 65, total: 180, mix: '36%' },
    { q: 'Q4 2028', spot: 120, nonSpot: 80, total: 200, mix: '40%' },
  ];

  const currentQ = quarters[selectedQuarter];

  return (
    <div className="space-y-6">
      {/* 3.1 Where Revenue Actually Concentrates */}
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
            <div>
              <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
                SECTION 3.1
              </span>
              <h4 className="font-display text-paper text-base font-semibold">Where Radio Revenue Actually Concentrates</h4>
            </div>
            <TierBadge tier={1} citation="CA Audience Measurement & Industry Trends Report Q4 FY2025/26, Tables 8 & 11 (Apr–Jun 2026)" url="https://www.ca.go.ke/sites/default/files/2026-08/%20Audience%20Measurement%20and%20Industry%20Trends%20Report%20Quarter%204%202025-2026.pdf" accessDate="2026-11-25" />
          </div>

          <p className="text-xs sm:text-sm text-sage leading-relaxed font-body">
            National radio ad spend in Apr–Jun 2026 totalled KES 5,073 M. The five largest sectors (CA data, national, not Western-only):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs font-mono">
            <div className="p-3 bg-ink rounded border border-brass/50">
              <span className="text-brass font-bold block text-sm">1. Banking & Finance</span>
              <span className="text-paper font-semibold block mt-1">KES 1,291 M</span>
              <span className="text-sage text-[11px]">25% of radio spend</span>
            </div>
            <div className="p-3 bg-ink rounded border border-hairline">
              <span className="text-paper font-bold block text-sm">2. Servicing</span>
              <span className="text-paper font-semibold block mt-1">KES 623 M</span>
              <span className="text-sage text-[11px]">12% of radio spend</span>
            </div>
            <div className="p-3 bg-ink rounded border border-hairline">
              <span className="text-paper font-bold block text-sm">3. Agriculture & gardening equipment</span>
              <span className="text-paper font-semibold block mt-1">KES 494 M</span>
              <span className="text-sage text-[11px]">10% · supports Strategy 5.20</span>
            </div>
            <div className="p-3 bg-ink rounded border border-hairline">
              <span className="text-paper font-bold block text-sm">4. Entertainment</span>
              <span className="text-paper font-semibold block mt-1">KES 444 M</span>
              <span className="text-sage text-[11px]">9% of radio spend</span>
            </div>
            <div className="p-3 bg-ink rounded border border-hairline">
              <span className="text-paper font-bold block text-sm">5. Media</span>
              <span className="text-paper font-semibold block mt-1">KES 354 M</span>
              <span className="text-sage text-[11px]">7% of radio spend</span>
            </div>
          </div>
          <p className="text-xs text-sage font-body">
            County governments and SACCOs are important local buyers but are not separated in the CA data; their Western Kenya budgets are a Tier 0 gap.
          </p>

          <div className="p-3.5 bg-brick/20 border border-brick/60 rounded flex items-start gap-3">
            <AlertTriangle className="text-rose-400 shrink-0 mt-0.5" size={16} />
            <div className="text-xs space-y-1">
              <strong className="text-rose-400 font-mono uppercase tracking-wider block">
                Betting: a choice, not a market fact
              </strong>
              <p className="text-paper/90 leading-relaxed font-body">
                Betting radio advertising fell <strong>89% in a single quarter</strong> (KSh 513M in Apr–Jun 2025 to KSh 51M in Jul–Sep 2025) after regulatory action. It has since recovered market-wide: ReelAnalytics ranks Betting &amp; Gambling the <strong>#3 ad sector in H1 2026 at KES 2.33 B</strong>. The plan does not rely on betting money as a values and regulatory position. Financial services and agriculture are the anchors it builds on.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 3.2 Which v1.0 Assumptions Survive Contact with Evidence */}
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="border-b border-hairline pb-3">
            <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
              SECTION 3.2
            </span>
            <h4 className="font-display text-paper text-base font-semibold">Which v1.0 Assumptions Survive Contact with Evidence</h4>
            <p className="text-xs text-sage mt-0.5">Rigorous scorecard testing May 2026 hypotheses against September 2026 data receipts</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-hairline text-sage-dim">
                  <th className="py-2 pr-3">v1.0 Assumption</th>
                  <th className="py-2 px-3">Audit Verdict</th>
                  <th className="py-2 pl-3">Empirical Evidence & Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr className="hover:bg-ink">
                  <td className="py-2.5 pr-3 text-paper font-medium">"No consolidating vernacular voice"</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-brick/30 text-rose-300 border border-brick/60 font-bold">
                      <X size={11} className="mr-1" /> Collapses
                    </span>
                  </td>
                  <td className="py-2.5 pl-3 text-sage">
                    Mulembe FM (RMS) is the consolidating voice with national network backing (GeoPoll Sept 2025–Feb 2026).
                  </td>
                </tr>
                <tr className="hover:bg-ink">
                  <td className="py-2.5 pr-3 text-paper font-medium">"7.2M TAM"</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-600/40 font-bold">
                      Partially collapses
                    </span>
                  </td>
                  <td className="py-2.5 pl-3 text-sage">
                    KNBS-derived figure is ≈ 6.6M (2025) and ≈ 6.76M (2026). v1.0 omitted 2019 census rebasing adjustments.
                  </td>
                </tr>
                <tr className="hover:bg-ink">
                  <td className="py-2.5 pr-3 text-paper font-medium">"250,000 contacts achievable"</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-moss/30 text-emerald-300 border border-moss/60 font-bold">
                      <Check size={11} className="mr-1" /> Survives (Caveats)
                    </span>
                  </td>
                  <td className="py-2.5 pl-3 text-sage">
                    Requires USSD + WhatsApp + paid media at Tier B/C. Unit economics require explicit KSh 5M–7.5M acquisition budget.
                  </td>
                </tr>
                <tr className="hover:bg-ink">
                  <td className="py-2.5 pr-3 text-paper font-medium">"2.4× revenue growth"</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-600/40 font-bold">
                      Stretch Target
                    </span>
                  </td>
                  <td className="py-2.5 pl-3 text-sage">
                    Base case is 2.0×. Radio ad market contracted 5%; non-spot ramp must carry the balance.
                  </td>
                </tr>
                <tr className="hover:bg-ink">
                  <td className="py-2.5 pr-3 text-paper font-medium">"40% non-spot by Q4 2027"</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-moss/30 text-emerald-300 border border-moss/60 font-bold">
                      <Check size={11} className="mr-1" /> Survives
                    </span>
                  </td>
                  <td className="py-2.5 pl-3 text-sage">
                    Achievable with branded pre-recorded shows + OB roadshow + WhatsApp/USSD commercial products.
                  </td>
                </tr>
                <tr className="hover:bg-ink">
                  <td className="py-2.5 pr-3 text-paper font-medium">"TikTok monetisation"</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-brick/30 text-rose-300 border border-brick/60 font-bold">
                      <X size={11} className="mr-1" /> Collapses
                    </span>
                  </td>
                  <td className="py-2.5 pl-3 text-sage">
                    TikTok Creator Rewards Program does not pay Kenyan creators. Only brand sponsorships apply.
                  </td>
                </tr>
                <tr className="hover:bg-ink">
                  <td className="py-2.5 pr-3 text-paper font-medium">"Visual radio multiplies inventory"</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-moss/30 text-emerald-300 border border-moss/60 font-bold">
                      <Check size={11} className="mr-1" /> Survives
                    </span>
                  </td>
                  <td className="py-2.5 pl-3 text-sage">
                    YouTube ($0.67 RPM) + Facebook video streams create genuine incremental inventory for sponsors.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* 3.3 The Real Whitespace */}
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="border-b border-hairline pb-3">
            <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
              SECTION 3.3
            </span>
            <h4 className="font-display text-paper text-base font-semibold">The Real Whitespace Portfolio Assessment</h4>
            <p className="text-xs text-sage mt-0.5">Competitive market contestability across all 11 potential broadcast revenue channels</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-mono">
            {[
              { stream: 'Spot Advertising', status: 'Contested, shrinking (-5%)', verdict: 'Defend, don’t over-invest', tone: 'neutral' },
              { stream: 'Outside Broadcasts (OB)', status: 'Contested but winnable', verdict: 'Invest aggressively', tone: 'priority' },
              { stream: 'Branded / Sponsored Shows', status: 'Uncontested at scale', verdict: 'Top Priority', tone: 'priority' },
              { stream: 'WhatsApp / USSD Products', status: 'Uncontested', verdict: 'Top Priority', tone: 'priority' },
              { stream: 'Digital Advertising', status: 'Contested but growing', verdict: 'Build infrastructure', tone: 'good' },
              { stream: 'Live Events Ticketing', status: 'Contested & high capex', verdict: 'Selective execution', tone: 'neutral' },
              { stream: 'Merchandise', status: 'Uncontested', verdict: 'Low priority / on-demand', tone: 'neutral' },
              { stream: 'Syndication & Licensing', status: 'Uncontested', verdict: 'Year 2 focus', tone: 'good' },
              { stream: 'GAA & County Government', status: 'Contested / relationship', verdict: 'Top Priority', tone: 'priority' },
              { stream: 'Diaspora Engagement', status: 'Uncontested', verdict: 'Year 2 focus', tone: 'good' },
              { stream: 'Podcast Distribution', status: 'Uncontested regionally', verdict: 'Build archive', tone: 'good' },
            ].map((w, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded border ${
                  w.tone === 'priority' 
                    ? 'bg-brass/10 border-brass/50' 
                    : w.tone === 'good' 
                    ? 'bg-moss/10 border-moss/40' 
                    : 'bg-ink border-hairline'
                }`}
              >
                <div className="font-bold text-paper text-sm mb-1">{w.stream}</div>
                <div className="text-sage text-[11px] mb-1.5">{w.status}</div>
                <div className={`text-[11px] font-bold ${
                  w.tone === 'priority' ? 'text-brass' : w.tone === 'good' ? 'text-emerald-400' : 'text-sage-dim'
                }`}>
                  Verdict: {w.verdict}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 3.4 Payback Model & Sensitivity */}
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
            <div>
              <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
                SECTION 3.4
              </span>
              <h4 className="font-display text-paper text-base font-semibold">The 8-Quarter Revenue Index (Base Case: 2.0×)</h4>
              <p className="text-xs text-sage">A revenue index only (no costs or cash), from Q1 2027 (Month 0) to Q4 2028 (Month 24). Payback is in the model below.</p>
            </div>
            <TierBadge tier={2} citation="Base Case Derivation Model" method="Spot index 100 → 120 over 8 quarters (≈9.5%/yr) plus a non-spot ramp to a 40% revenue mix" />
          </div>

          {/* Interactive Slider / Quarter Selector */}
          <div className="space-y-3 p-4 bg-ink rounded border border-hairline">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-sage">Selected Milestone: <strong className="text-brass">{currentQ.q}</strong></span>
              <span className="text-paper">Total Revenue Index: <strong className="text-emerald-400 text-sm">{currentQ.total}</strong> (Baseline = 100)</span>
            </div>

            <div className="grid grid-cols-8 gap-1 pt-1">
              {quarters.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedQuarter(idx)}
                  className={`py-2 px-1 text-center font-mono rounded text-[11px] transition-all ${
                    selectedQuarter === idx
                      ? 'bg-brass text-ink font-bold shadow-md'
                      : 'bg-ink-2 text-sage hover:text-paper hover:bg-hairline'
                  }`}
                >
                  <div className="font-semibold">{q.q.replace(' 20', " '")}</div>
                  <div className="text-[9px] opacity-80">{q.total}</div>
                </button>
              ))}
            </div>

            {/* Quarter Deep-Dive Bar */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-hairline text-center text-xs font-mono">
              <div className="p-2.5 bg-ink-2 rounded border border-hairline">
                <span className="text-sage text-[10px] block uppercase">Spot Revenue Index</span>
                <span className="text-paper text-lg font-bold">{currentQ.spot}</span>
              </div>
              <div className="p-2.5 bg-ink-2 rounded border border-brass/40">
                <span className="text-brass text-[10px] block uppercase">Non-Spot Index</span>
                <span className="text-brass text-lg font-bold">+{currentQ.nonSpot}</span>
              </div>
              <div className="p-2.5 bg-ink-2 rounded border border-emerald-500/40">
                <span className="text-emerald-400 text-[10px] block uppercase">Non-Spot Share</span>
                <span className="text-emerald-400 text-lg font-bold">{currentQ.mix}</span>
              </div>
            </div>
          </div>

          {/* Sensitivity Table */}
          <div className="space-y-2">
            <h5 className="font-display text-sm text-paper font-semibold">Stress-Test Sensitivity Analysis (Month 24, Q4 2028)</h5>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-hairline text-sage-dim">
                    <th className="py-2 pr-3">Scenario</th>
                    <th className="py-2 px-3">Revenue Index</th>
                    <th className="py-2 px-3">Non-Spot Mix</th>
                    <th className="py-2 pl-3">Key Empirical Assumptions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 text-rose-400 font-bold">Worst Case</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-paper">140 (1.4×)</td>
                    <td className="py-2.5 px-3 text-amber-300">25%</td>
                    <td className="py-2.5 pl-3 text-sage">No GAA registration; USSD delayed past Month 12; spot falls 10% in line with market</td>
                  </tr>
                  <tr className="hover:bg-ink bg-brass/10">
                    <td className="py-2.5 pr-3 text-brass font-bold">Base Case</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-brass">200 (2.0×)</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">40%</td>
                    <td className="py-2.5 pl-3 text-paper font-medium">GAA registered; USSD live by Month 6; spot +5% (share gains offset market contraction)</td>
                  </tr>
                  <tr className="hover:bg-ink">
                    <td className="py-2.5 pr-3 text-emerald-400 font-bold">Best Case</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">280 (2.8×)</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">45%</td>
                    <td className="py-2.5 pl-3 text-sage">GAA + 2 county retainers secured; 2 regional syndication deals; spot +15%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* What Must Be True */}
          <div className="p-4 bg-ink rounded border border-hairline space-y-2.5 text-xs font-mono">
            <div className="text-brass font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-brass" />
              <span>What Must Be True for Base Case (2.0×) to Materialise:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sage text-[11px]">
              <div>1. USSD code live by Month 6 (Africa&apos;s Talking: 3–4 weeks to provision once approved)</div>
              <div>2. WhatsApp Business Solution Provider onboarded by Month 3</div>
              <div>3. GAA filing completed by Month 6</div>
              <div>4. At least one county government contract signed by Month 12</div>
              <div>5. Studio Phase 1 completed by Month 3</div>
              <div>6. At least two pre-recorded shows on air by Month 6</div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Interactive Payback & Sensitivity Engine */}
      <Reveal>
        <InteractivePaybackSimulator />
      </Reveal>


      {/* 3.5 The Single Biggest Risks */}
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="border-b border-hairline pb-3">
            <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
              SECTION 3.5
            </span>
            <h4 className="font-display text-paper text-base font-semibold">The Single Biggest Risks to the Proposal</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Revenue Risk */}
            <div className="p-4 bg-brick/20 border border-brick/60 rounded space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-wider text-[11px]">
                <ShieldAlert size={14} />
                <span>Single Biggest Risk to Revenue Case</span>
              </div>
              <p className="text-paper/90 font-body leading-relaxed text-xs">
                <strong>Failure to secure GAA registration and county government contracts.</strong> These are relationship-dependent, timeline-uncertain, and politically exposed. If neither materialises, the non-spot mix stalls at ~25%, and total station revenue reverts to the worst-case scenario (140 index).
              </p>
              <div className="text-sage text-[10px] pt-1">
                Mitigation: Firefly GM leads direct liaison from Month 1; prepare IFMIS prequalification paperwork immediately.
              </div>
            </div>

            {/* Audience Risk */}
            <div className="p-4 bg-brick/20 border border-brick/60 rounded space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-wider text-[11px]">
                <TrendingDown size={14} />
                <span>Single Biggest Risk to Audience Case</span>
              </div>
              <p className="text-paper/90 font-body leading-relaxed text-xs">
                <strong>Daily radio listenership keeps falling (75% → 41% nationally, MCK 2023–2025)</strong> faster than the station can convert listeners into directly addressable contacts. Weekly reach in Western Kenya is still 83% (CA, Apr–Jun 2026), so the window is open, but it is closing. If listenership decline accelerates in Western Kenya, the 250,000-contact target becomes unachievable regardless of studio quality.
              </p>
              <div className="text-sage text-[10px] pt-1">
                Mitigation: Immediate deployment of WhatsApp on-air CTAs + USSD shortcode to capture listeners before they drift off linear radio.
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
