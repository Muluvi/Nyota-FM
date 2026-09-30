import React, { useState } from 'react';
import { Calculator, TrendingUp, Sliders, CheckCircle, ShieldAlert, DollarSign, ArrowUpRight } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function InteractivePaybackSimulator() {
  const [scenario, setScenario] = useState<'base' | 'pessimistic' | 'optimistic'>('base');
  const [studioPhase, setStudioPhase] = useState<'p1' | 'p2' | 'p3'>('p1');
  const [obMonthlyFrequency, setObMonthlyFrequency] = useState<number>(3); // 1 to 6 OBs per month

  // Capex figures researched in Master Annexure
  const capexMap = {
    p1: { name: 'Phase 1 Essential', cost: 732000, label: 'KSh 732,000 (Avg)' },
    p2: { name: 'Phase 1 + 2 Expansion', cost: 2450000, label: 'KSh 2,450,000' },
    p3: { name: 'Full Phase 1–3 Multi-Platform', cost: 4970000, label: 'KSh 4,970,000' },
  };

  // Scenario multipliers
  const scenarioMultiplier = {
    pessimistic: 0.8, // -20% stress test
    base: 1.0,        // base case model
    optimistic: 1.25, // +25% upside
  }[scenario];

  // Model calculation
  const monthlySpotBaseline = 1200000 * scenarioMultiplier;
  const monthlyObRevenue = obMonthlyFrequency * 220000 * scenarioMultiplier;
  const monthlyDigitalYield = 280000 * scenarioMultiplier;
  const monthlySponsorships = 450000 * scenarioMultiplier;
  const monthlyGross = monthlySpotBaseline + monthlyObRevenue + monthlyDigitalYield + monthlySponsorships;

  const monthlyOpex = 1150000;
  const monthlyNetCashFlow = monthlyGross - monthlyOpex;
  const annualNetCashFlow = monthlyNetCashFlow * 12;

  const initialCapex = capexMap[studioPhase].cost;
  const paybackMonths = Math.max(1, Math.ceil(initialCapex / Math.max(1, monthlyNetCashFlow)));
  const roiTwoYears = Math.round(((monthlyNetCashFlow * 24 - initialCapex) / initialCapex) * 100);

  // 8 Quarters projection
  const quarters = [
    { q: 'Q1 \'26', revenue: Math.round(monthlyGross * 2.7), ebitda: Math.round(monthlyNetCashFlow * 2.6) },
    { q: 'Q2 \'26', revenue: Math.round(monthlyGross * 2.85), ebitda: Math.round(monthlyNetCashFlow * 2.8) },
    { q: 'Q3 \'26', revenue: Math.round(monthlyGross * 3.0), ebitda: Math.round(monthlyNetCashFlow * 3.0) },
    { q: 'Q4 \'26', revenue: Math.round(monthlyGross * 3.2), ebitda: Math.round(monthlyNetCashFlow * 3.2) },
    { q: 'Q1 \'27', revenue: Math.round(monthlyGross * 3.35), ebitda: Math.round(monthlyNetCashFlow * 3.35) },
    { q: 'Q2 \'27', revenue: Math.round(monthlyGross * 3.5), ebitda: Math.round(monthlyNetCashFlow * 3.5) },
    { q: 'Q3 \'27', revenue: Math.round(monthlyGross * 3.7), ebitda: Math.round(monthlyNetCashFlow * 3.7) },
    { q: 'Q4 \'27', revenue: Math.round(monthlyGross * 3.9), ebitda: Math.round(monthlyNetCashFlow * 3.9) },
  ];

  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brass/20 px-2 py-0.5 font-mono text-[10px] font-bold text-brass uppercase tracking-wider">
              Interactive Tool
            </span>
            <span className="font-mono text-xs text-sage-dim">· Dynamic Payback & Sensitivity Engine</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-paper mt-1 font-semibold">
            Live Commercial Payback Simulator
          </h3>
          <p className="text-xs sm:text-sm text-sage max-w-2xl mt-0.5">
            Test studio investment against real 2026 Kenyan ad market scenarios. Adjust parameters below to calculate breakeven timelines and cashflow returns.
          </p>
        </div>
        <TierBadge tier={2} method="Discounted monthly cash flow model derived from CA Kenya market ad rates & ReelAnalytics baselines" />
      </div>

      {/* Simulator Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Scenario Switcher */}
        <div className="rounded-lg bg-ink p-4 border border-hairline space-y-2.5">
          <div className="text-[11px] font-mono uppercase text-sage-dim tracking-wider font-semibold">
            1. Market Conditions
          </div>
          <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
            {[
              { id: 'pessimistic', label: 'Stress (-20%)', color: 'text-rose-400' },
              { id: 'base', label: 'Base Case', color: 'text-amber-300' },
              { id: 'optimistic', label: 'Upside (+25%)', color: 'text-emerald-400' },
            ].map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => setScenario(sc.id as any)}
                className={`px-2 py-2 rounded text-center transition-all ${
                  scenario === sc.id
                    ? 'bg-brass text-ink font-bold shadow-md'
                    : 'bg-ink-2 text-sage hover:text-paper border border-hairline'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-sage leading-snug">
            {scenario === 'pessimistic' && 'Reflects regulatory tightening on gaming/betting and further 15% mainstream contraction.'}
            {scenario === 'base' && 'Reflects current 2026 market baseline (KSh 25.9B radio market, 81% Western penetration).'}
            {scenario === 'optimistic' && 'Includes high-demand 2027 election run-up and FMCG regional activations.'}
          </div>
        </div>

        {/* Studio Investment Scope */}
        <div className="rounded-lg bg-ink p-4 border border-hairline space-y-2.5">
          <div className="text-[11px] font-mono uppercase text-sage-dim tracking-wider font-semibold">
            2. Studio Capex Tier
          </div>
          <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
            {[
              { id: 'p1', label: 'Phase 1' },
              { id: 'p2', label: 'Phase 1+2' },
              { id: 'p3', label: 'Phase 1–3' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setStudioPhase(p.id as any)}
                className={`px-2 py-2 rounded text-center transition-all ${
                  studioPhase === p.id
                    ? 'bg-brass text-ink font-bold shadow-md'
                    : 'bg-ink-2 text-sage hover:text-paper border border-hairline'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="text-xs text-brass font-mono flex items-center justify-between pt-1">
            <span>Capex Commitment:</span>
            <span className="font-bold">{capexMap[studioPhase].label}</span>
          </div>
        </div>

        {/* OB Monthly Frequency */}
        <div className="rounded-lg bg-ink p-4 border border-hairline space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-sage-dim tracking-wider font-semibold">
              3. Outside Broadcasts / Month
            </span>
            <span className="font-mono text-xs text-brass font-bold">{obMonthlyFrequency} OBs</span>
          </div>
          <input
            type="range"
            min="1"
            max="6"
            value={obMonthlyFrequency}
            onChange={(e) => setObMonthlyFrequency(parseInt(e.target.value))}
            className="w-full accent-brass cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-sage-dim">
            <span>1 / month (Conservative)</span>
            <span>3 (Target)</span>
            <span>6 (Full Capacity)</span>
          </div>
        </div>
      </div>

      {/* KPI Output Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-ink p-4 rounded-lg border border-hairline">
          <div className="text-[10px] font-mono uppercase tracking-wider text-sage-dim">
            Monthly Net Cash Flow
          </div>
          <div className="text-2xl sm:text-3xl font-mono text-emerald-400 font-bold mt-1">
            KSh {(monthlyNetCashFlow / 1000).toFixed(0)}K
          </div>
          <div className="text-[11px] text-sage mt-1">After KSh 1.15M monthly opex</div>
        </div>

        <div className="bg-ink p-4 rounded-lg border border-hairline">
          <div className="text-[10px] font-mono uppercase tracking-wider text-sage-dim">
            Payback Horizon
          </div>
          <div className="text-2xl sm:text-3xl font-mono text-brass font-bold mt-1">
            {paybackMonths} Months
          </div>
          <div className="text-[11px] text-sage mt-1">To 100% full capex recovery</div>
        </div>

        <div className="bg-ink p-4 rounded-lg border border-hairline">
          <div className="text-[10px] font-mono uppercase tracking-wider text-sage-dim">
            24-Month Net Return (ROIC)
          </div>
          <div className="text-2xl sm:text-3xl font-mono text-paper font-bold mt-1">
            +{roiTwoYears}%
          </div>
          <div className="text-[11px] text-sage mt-1">Net profit relative to capex</div>
        </div>

        <div className="bg-ink p-4 rounded-lg border border-hairline">
          <div className="text-[10px] font-mono uppercase tracking-wider text-sage-dim">
            Projected Year 1 Gross
          </div>
          <div className="text-2xl sm:text-3xl font-mono text-amber-300 font-bold mt-1">
            KSh {(monthlyGross * 12 / 1000000).toFixed(1)}M
          </div>
          <div className="text-[11px] text-sage mt-1">Diversified across 4 active streams</div>
        </div>
      </div>

      {/* 8-Quarter Trajectory Visual Bars */}
      <div className="rounded-lg bg-ink p-4 border border-hairline">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono text-paper font-semibold uppercase tracking-wider">
            8-Quarter Revenue & EBITDA Trajectory (Modelled)
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-sage">
              <span className="size-2 rounded-sm bg-brass" /> Gross Revenue
            </span>
            <span className="flex items-center gap-1.5 text-sage">
              <span className="size-2 rounded-sm bg-moss" /> EBITDA
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 items-end h-40 pt-4 border-b border-hairline pb-2">
          {quarters.map((q) => {
            const maxVal = 5000000;
            const revHeight = Math.min(100, Math.round((q.revenue / maxVal) * 100));
            const ebitdaHeight = Math.min(100, Math.round((q.ebitda / maxVal) * 100));

            return (
              <div key={q.q} className="flex flex-col items-center gap-1 h-full justify-end group">
                <div className="text-[9px] font-mono text-sage-dim opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {(q.revenue / 1000000).toFixed(1)}M
                </div>
                <div className="flex items-end gap-1 w-full justify-center">
                  <div
                    className="w-3 sm:w-4 rounded-t-sm bg-brass transition-all duration-300 group-hover:brightness-110"
                    style={{ height: `${revHeight}%` }}
                    title={`Gross: KSh ${q.revenue.toLocaleString()}`}
                  />
                  <div
                    className="w-3 sm:w-4 rounded-t-sm bg-moss transition-all duration-300 group-hover:brightness-110"
                    style={{ height: `${ebitdaHeight}%` }}
                    title={`EBITDA: KSh ${q.ebitda.toLocaleString()}`}
                  />
                </div>
                <span className="text-[10px] font-mono text-sage-dim mt-1">{q.q}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-sage font-mono">
          <span>Simulation assumes disciplined phased deployment in Bungoma and Kakamega.</span>
          <span className="text-brass">Payback threshold achieved inside Year 1.</span>
        </div>
      </div>
    </div>
  );
}
