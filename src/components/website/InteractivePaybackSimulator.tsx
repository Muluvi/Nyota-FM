import React, { useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';
import { run, defaultInputs, tornado, yDomain, ASSUMPTION_NOTES, type Scenario } from '../../model/finance';
import type { Phase } from '../../data/capex';

const PHASE_SETS: { id: string; label: string; phases: Phase[] }[] = [
  { id: 'p1', label: 'Phase 1 only', phases: ['P1'] },
  { id: 'p1p2', label: 'Phases 1–2 + power', phases: ['P1', 'Power', 'P2'] },
  { id: 'all', label: 'All phases, power and OB', phases: ['P1', 'Power', 'P2', 'OB', 'P3'] },
];

const m = (n: number) => `${n < 0 ? '−' : ''}KSh ${(Math.abs(n) / 1_000_000).toFixed(2)}M`;
const monthText = (p: number | null) => (p == null ? 'Not within 24 months' : `Month ${p}`);

/** Cumulative incremental cash: scenario band (worst–best), base line, zero line and break-even marker. */
function CashChart({ worst, base, best, payback }: { worst: number[]; base: number[]; best: number[]; payback: number | null }) {
  const W = 640;
  const H = 240;
  const P = { l: 64, r: 12, t: 12, b: 28 };
  const [lo, hi] = yDomain([...worst, ...base, ...best]);
  const x = (i: number) => P.l + (i / (base.length - 1)) * (W - P.l - P.r);
  const y = (v: number) => P.t + ((hi - v) / (hi - lo)) * (H - P.t - P.b);
  const line = (vs: number[]) => vs.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const band = `${line(best)} ${worst.map((v, i) => `L${x(worst.length - 1 - i).toFixed(1)},${y(worst[worst.length - 1 - i]).toFixed(1)}`).join(' ')} Z`;
  const ticks = [lo, (lo + hi) / 2, hi, 0].filter((v, i, a) => a.indexOf(v) === i);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-labelledby="cash-title cash-desc">
      <title id="cash-title">Cumulative incremental cash over 24 months</title>
      <desc id="cash-desc">
        Shaded band from worst to best case; line is the base case. Base-case payback: {monthText(payback)}. Month-by-month values
        are in the table below.
      </desc>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="var(--color-hairline)" strokeDasharray={t === 0 ? undefined : '2 4'} />
          <text x={P.l - 6} y={y(t) + 4} textAnchor="end" fontSize="10" fill="var(--color-sage)" fontFamily="var(--font-mono)">
            {(t / 1_000_000).toFixed(1)}M
          </text>
        </g>
      ))}
      {[1, 6, 12, 18, 24].map((mo) => (
        <text key={mo} x={x(mo - 1)} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--color-sage)" fontFamily="var(--font-mono)">
          M{mo}
        </text>
      ))}
      <path d={band} fill="var(--color-brass)" opacity="0.15" />
      <path d={line(base)} fill="none" stroke="var(--color-brass)" strokeWidth="2.5" />
      {payback != null && (
        <g>
          <line x1={x(payback - 1)} x2={x(payback - 1)} y1={P.t} y2={H - P.b} stroke="var(--color-moss)" strokeDasharray="4 3" />
          <text x={x(payback - 1) + 4} y={P.t + 12} fontSize="10" fill="var(--color-moss)" fontFamily="var(--font-mono)">
            break-even M{payback}
          </text>
        </g>
      )}
    </svg>
  );
}

function Tornado({ bars }: { bars: ReturnType<typeof tornado> }) {
  const max = Math.max(1, ...bars.flatMap((b) => [Math.abs(b.low), Math.abs(b.high)]));
  return (
    <div className="space-y-1.5" role="img" aria-label="Sensitivity of NPV to a 20 percent change in each assumption">
      {bars.map((b) => {
        const left = Math.min(b.low, b.high);
        const right = Math.max(b.low, b.high);
        return (
          <div key={b.input} className="grid grid-cols-[8rem_1fr] items-center gap-2 text-xs">
            <span className="text-sage">{b.label}</span>
            <div className="relative h-4 rounded bg-ink">
              <span className="absolute inset-y-0 left-1/2 w-px bg-hairline" aria-hidden="true" />
              <span
                className="absolute inset-y-0.5 rounded bg-brass/70"
                style={{ left: `${50 + (left / max) * 50}%`, width: `${((right - left) / max) * 50}%` }}
                title={`${m(b.low)} to ${m(b.high)}`}
              />
            </div>
          </div>
        );
      })}
      <p className="text-[11px] text-sage-dim">Bars show the change in NPV when each assumption moves ±20%.</p>
    </div>
  );
}

/** The Money chapter's model, built on src/model/finance.ts. */
export function InteractivePaybackSimulator() {
  const [scenario, setScenario] = useState<Scenario>('base');
  const [phaseSet, setPhaseSet] = useState('all');
  const [realisation, setRealisation] = useState(0.5);
  const [cannibalisation, setCannibalisation] = useState(0.1);
  const [discountRate, setDiscountRate] = useState(0.14);
  const [rampMonths, setRampMonths] = useState(6);

  const phases = PHASE_SETS.find((p) => p.id === phaseSet)!.phases;
  const model = useMemo(() => {
    const base = { realisation, cannibalisation, discountRate, rampMonths };
    const r = (s: Scenario) => run(defaultInputs({ ...base, scenario: s }, phases));
    return { worst: r('worst'), base: r('base'), best: r('best'), current: r(scenario), tornado: tornado(defaultInputs({ ...base, scenario }, phases)) };
  }, [scenario, phases, realisation, cannibalisation, discountRate, rampMonths]);

  const cur = model.current;
  const year = (y: 1 | 2) => {
    const rows = cur.rows.slice((y - 1) * 12, y * 12);
    const sum = (k: 'revenue' | 'cannibalised' | 'opex' | 'royalties' | 'capex' | 'net') => rows.reduce((s, r) => s + r[k], 0);
    return { revenue: sum('revenue') - sum('cannibalised'), opex: sum('opex') + sum('royalties'), capex: sum('capex'), net: sum('net') };
  };

  const sliders = [
    { id: 'realisation', label: 'Lever realisation', value: realisation, set: setRealisation, min: 0.1, max: 1, step: 0.05, fmt: (v: number) => `${Math.round(v * 100)}%` }, // data-ok: UI format
    { id: 'cannibalisation', label: 'Spot cannibalisation', value: cannibalisation, set: setCannibalisation, min: 0, max: 0.5, step: 0.05, fmt: (v: number) => `${Math.round(v * 100)}%` }, // data-ok: UI format
    { id: 'rampMonths', label: 'Ramp to full run-rate', value: rampMonths, set: setRampMonths, min: 0, max: 12, step: 1, fmt: (v: number) => `${v} months` },
    { id: 'discountRate', label: 'Discount rate (annual)', value: discountRate, set: setDiscountRate, min: 0.05, max: 0.3, step: 0.01, fmt: (v: number) => `${Math.round(v * 100)}%` }, // data-ok: UI format
  ];

  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <h3 className="font-display text-2xl sm:text-3xl text-paper font-semibold">Incremental payback model</h3>
          <p className="text-xs sm:text-sm text-sage max-w-2xl mt-1">
            The plan against &ldquo;do nothing&rdquo;: new revenue from the 12 levers, minus displaced spot sales, new staff and
            services, music royalties and capex. Revenue the station would earn anyway is not counted.
          </p>
        </div>
        <TierBadge tier={2} method="Incremental monthly cash flow over 24 months, discounted at the board rate" inputs="levers.ts, opex.ts, capex.ts and the assumptions below" />
      </div>

      <div className="flex gap-2 rounded border border-brick/50 bg-brick/10 p-3 text-xs text-paper" role="note">
        <AlertTriangle size={14} className="text-brick-text shrink-0 mt-0.5" />
        <span>
          Illustrative until the baseline audit is supplied. Lever revenue ranges and the realisation rate are Tier 2 assumptions;
          the audited baseline (Tier 0) is needed for the revenue index and to validate the ranges.
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <fieldset className="space-y-3 rounded-lg border border-hairline bg-ink p-4">
          <legend className="px-1 text-[11px] font-mono uppercase tracking-wider text-sage-dim">Assumptions</legend>
          <div className="flex gap-1" role="group" aria-label="Scenario">
            {(['worst', 'base', 'best'] as const).map((s) => (
              <button key={s} type="button" aria-pressed={scenario === s} onClick={() => setScenario(s)} className={`flex-1 rounded px-2 py-1.5 text-xs font-mono capitalize ${scenario === s ? 'bg-brass text-ink font-bold' : 'border border-hairline text-sage hover:text-paper'}`}>
                {s}
              </button>
            ))}
          </div>
          <label className="block text-xs text-sage">
            Capex included
            <select value={phaseSet} onChange={(e) => setPhaseSet(e.target.value)} className="mt-1 w-full rounded border border-hairline bg-ink-2 px-2 py-1.5 text-paper">
              {PHASE_SETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          {sliders.map((sl) => (
            <label key={sl.id} className="block text-xs text-sage">
              <span className="flex justify-between">
                <span>{sl.label}</span>
                <span className="font-mono text-brass">{sl.fmt(sl.value)}</span>
              </span>
              <input type="range" min={sl.min} max={sl.max} step={sl.step} value={sl.value} onChange={(e) => sl.set(Number(e.target.value))} className="w-full accent-brass" />
              <span className="block text-[11px] text-sage-dim">{ASSUMPTION_NOTES[sl.id]}</span>
            </label>
          ))}
        </fieldset>

        <div className="lg:col-span-2 space-y-4">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-2" aria-live="polite">
            {[
              { k: 'Payback', v: monthText(cur.paybackMonth) },
              { k: 'NPV (24 months)', v: m(cur.npv) },
              { k: 'Peak funding need', v: m(cur.peakFunding) },
              { k: 'Revenue index', v: cur.revenueIndex == null ? 'Needs baseline' : cur.revenueIndex.toFixed(0) },
            ].map((t) => (
              <div key={t.k} className="rounded border border-hairline bg-ink p-3">
                <dt className="text-[11px] font-mono uppercase text-sage-dim">{t.k}</dt>
                <dd className="font-mono text-base text-paper">{t.v}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-lg border border-hairline bg-ink p-3">
            <CashChart
              worst={model.worst.rows.map((r) => r.cumulative)}
              base={model.base.rows.map((r) => r.cumulative)}
              best={model.best.rows.map((r) => r.cumulative)}
              payback={model.base.paybackMonth}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-x-auto rounded-lg border border-hairline bg-ink p-3">
          <table className="w-full text-xs font-mono">
            <caption className="text-left text-[11px] uppercase tracking-wider text-sage-dim pb-2">Incremental P&amp;L by year ({scenario} case)</caption>
            <thead>
              <tr className="text-sage-dim">
                <th scope="col" className="text-left py-1">KSh</th>
                <th scope="col" className="text-right py-1">Year 1</th>
                <th scope="col" className="text-right py-1">Year 2</th>
              </tr>
            </thead>
            <tbody className="text-paper">
              {(
                [
                  ['New revenue (net of cannibalisation)', 'revenue'],
                  ['Opex + royalties', 'opex'],
                  ['Capex', 'capex'],
                  ['Net incremental cash', 'net'],
                ] as const
              ).map(([label, k]) => (
                <tr key={k} className="border-t border-hairline">
                  <th scope="row" className="text-left font-normal text-sage py-1.5">{label}</th>
                  <td className="text-right">{m(year(1)[k])}</td>
                  <td className="text-right">{m(year(2)[k])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-hairline bg-ink p-3">
          <p className="text-[11px] font-mono uppercase tracking-wider text-sage-dim pb-2">What moves NPV most</p>
          <Tornado bars={model.tornado} />
        </div>
      </div>

      <details className="rounded-lg border border-hairline bg-ink p-3 text-xs">
        <summary className="cursor-pointer text-sage">Month-by-month cumulative cash (accessible table)</summary>
        <table className="mt-2 w-full font-mono">
          <thead>
            <tr className="text-sage-dim">
              <th scope="col" className="text-left">Month</th>
              <th scope="col" className="text-right">Worst</th>
              <th scope="col" className="text-right">Base</th>
              <th scope="col" className="text-right">Best</th>
            </tr>
          </thead>
          <tbody className="text-paper">
            {model.base.rows.map((r, i) => (
              <tr key={r.month}>
                <th scope="row" className="text-left font-normal">M{r.month}</th>
                <td className="text-right">{m(model.worst.rows[i].cumulative)}</td>
                <td className="text-right">{m(r.cumulative)}</td>
                <td className="text-right">{m(model.best.rows[i].cumulative)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
