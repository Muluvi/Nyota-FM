import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function CapexWaterfallSimulator() {
  const [scenario, setScenario] = useState<'conservative' | 'base' | 'accelerated'>('base');

  // Month 1 to 12 data per scenario
  const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];

  const scenarioData = {
    conservative: {
      initialCapex: -627299,
      monthlyNetProfit: [45000, 60000, 75000, 90000, 110000, 130000, 150000, 165000, 180000, 195000, 210000, 230000],
      breakEvenMonth: 'Month 7',
      twelveMonthRoi: '+164%',
    },
    base: {
      initialCapex: -627299,
      monthlyNetProfit: [65000, 95000, 125000, 160000, 190000, 220000, 250000, 275000, 300000, 320000, 340000, 365000],
      breakEvenMonth: 'Month 5',
      twelveMonthRoi: '+332%',
    },
    accelerated: {
      initialCapex: -627299,
      monthlyNetProfit: [90000, 140000, 190000, 240000, 280000, 320000, 360000, 390000, 420000, 450000, 480000, 510000],
      breakEvenMonth: 'Month 4',
      twelveMonthRoi: '+517%',
    },
  };

  const current = scenarioData[scenario];

  // Calculate cumulative cash position
  let cumulative = current.initialCapex;
  const waterfallSteps = current.monthlyNetProfit.map((profit, idx) => {
    cumulative += profit;
    return {
      month: months[idx],
      monthlyProfit: profit,
      cumulativeCash: cumulative,
      isPositive: cumulative >= 0,
    };
  });

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <TrendingUp size={14} />
            <span className="uppercase tracking-widest font-semibold">Financial Modeling · Payback Cadence</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={2} citation="Base Case Payback & Monthly Sensitivity Model" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Studio Phase 1 Capex Payback Waterfall (Months 1–12)
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Simulate monthly cashflow recovery against the KSh 627,299 visual radio studio investment across three stress-tested market adoption scenarios.
          </p>
        </div>

        {/* Scenario Toggle */}
        <div className="flex rounded-lg border border-hairline bg-ink p-1">
          {(['conservative', 'base', 'accelerated'] as const).map((sc) => (
            <button
              key={sc}
              type="button"
              onClick={() => setScenario(sc)}
              className={`px-3 py-1.5 rounded text-xs font-mono capitalize transition-all ${
                scenario === sc
                  ? 'bg-brass text-ink font-bold shadow'
                  : 'text-sage hover:text-paper'
              }`}
            >
              {sc}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-hairline bg-ink p-3 space-y-1">
          <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block">
            Initial Capex (Outflow)
          </span>
          <span className="font-display text-xl font-bold text-rose-400 tabular-nums">
            -KSh 627,299
          </span>
          <span className="text-[10px] text-sage-dim font-mono block">2× PTZ, Switcher, Acoustics</span>
        </div>

        <div className="rounded-lg border border-hairline bg-ink p-3 space-y-1">
          <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block">
            Full Breakeven Point
          </span>
          <span className="font-display text-xl font-bold text-brass">
            {current.breakEvenMonth}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono block">Capital 100% Recovered</span>
        </div>

        <div className="rounded-lg border border-hairline bg-ink p-3 space-y-1">
          <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block">
            Year 1 Net Cumulative
          </span>
          <span className="font-display text-xl font-bold text-emerald-400 tabular-nums">
            +KSh {waterfallSteps[11].cumulativeCash.toLocaleString()}
          </span>
          <span className="text-[10px] text-sage-dim font-mono block">After capex recovery</span>
        </div>

        <div className="rounded-lg border border-hairline bg-ink p-3 space-y-1">
          <span className="text-[10px] font-mono text-sage-dim uppercase tracking-wider block">
            12-Month Net ROI
          </span>
          <span className="font-display text-xl font-bold text-paper tabular-nums">
            {current.twelveMonthRoi}
          </span>
          <span className="text-[10px] text-moss font-mono block">On capital invested</span>
        </div>
      </div>

      {/* Visual Waterfall Bars */}
      <div className="rounded-xl border border-hairline bg-ink p-4 space-y-3">
        <span className="text-[10px] font-mono text-brass uppercase tracking-wider font-semibold block">
          MONTH-BY-MONTH CUMULATIVE LIQUIDITY TRAJECTORY (KSh)
        </span>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 items-end h-40 pt-4 pb-2 border-b border-hairline">
          {waterfallSteps.map((step) => {
            const isPos = step.cumulativeCash >= 0;
            const barHeightPct = Math.min(100, Math.max(15, Math.abs(step.cumulativeCash) / 25000));
            return (
              <div key={step.month} className="flex flex-col items-center justify-end h-full gap-1">
                <div
                  className={`w-full rounded transition-all duration-300 ${
                    isPos ? 'bg-emerald-500/80 hover:bg-emerald-400' : 'bg-rose-500/80 hover:bg-rose-400'
                  }`}
                  style={{ height: `${barHeightPct}%` }}
                />
                <span className="text-[10px] font-mono text-sage-dim">{step.month}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-sage px-1">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span>Red = Net Capex Deficit</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Green = Net Retained Capital Surplus</span>
          </span>
        </div>
      </div>
    </div>
  );
}
