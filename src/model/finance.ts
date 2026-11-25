/**
 * Incremental finance model: the plan compared with "do nothing".
 *
 *   Δcash_t = (new revenue_t − cannibalised spot_t) − (new opex_t + royalties_t) − capex_t
 *
 * All functions are pure. `defaultInputs()` assembles inputs from src/data; tests use
 * hand-built inputs. Station revenue that would happen anyway is never credited to
 * the plan (the error in the old simulator).
 */
import { capex, type Phase } from '../data/capex.ts'
import { levers } from '../data/levers.ts'
import { opex } from '../data/opex.ts'

export type Scenario = 'worst' | 'base' | 'best'

export type RevenueStream = {
  id: string
  name: string
  /** Annual revenue at full run-rate (KSh). */
  annual: { low: number; high: number }
  /** First month revenue appears (1 = first month after approval). */
  startMonth: number
}

export type CostLine = { id: string; monthly: { low: number; high: number }; startMonth: number }
export type CapexSpend = { id: string; phase: Phase; amount: { low: number; high: number }; month: number }

export type Inputs = {
  horizonMonths: number
  streams: RevenueStream[]
  costs: CostLine[]
  capex: CapexSpend[]
  /** Share of each lever's revenue range actually realised (0–1). Tier 2 assumption. */
  realisation: number
  /** Months to ramp from zero to full run-rate once a stream starts. */
  rampMonths: number
  /** Share of new sponsored revenue that displaces existing spot sales (0–1). */
  cannibalisation: number
  /** Music royalty rate on new revenue (Consolidated Music Tariffs 2026–2028: 4%). */
  royaltyRate: number
  /** Annual discount rate (board-set hurdle rate). */
  discountRate: number
  /** Audited baseline monthly revenue; null while it is a Tier 0 gap. */
  baselineMonthlyRevenue: number | null
  /** Annual growth of existing spot revenue (used only for the revenue index). */
  spotGrowth: number
  scenario: Scenario
}

export type MonthRow = {
  month: number
  revenue: number
  cannibalised: number
  opex: number
  royalties: number
  capex: number
  net: number
  cumulative: number
}

export type Result = {
  rows: MonthRow[]
  paybackMonth: number | null
  npv: number
  peakFunding: number
  /** Revenue index at the horizon vs baseline (baseline = 100), or null without a baseline. */
  revenueIndex: number | null
  totals: { revenue: number; costs: number; capex: number }
}

/** Pick a point in a range for a scenario. Costs use the expensive end in the worst case. */
export const pick = (r: { low: number; high: number }, s: Scenario, kind: 'revenue' | 'cost') => {
  const mid = (r.low + r.high) / 2
  if (s === 'base') return mid
  const good = kind === 'revenue' ? r.high : r.low
  const bad = kind === 'revenue' ? r.low : r.high
  return s === 'best' ? good : bad
}

export function rampFactor(month: number, start: number, rampMonths: number): number {
  if (month < start) return 0
  if (rampMonths <= 0) return 1
  return Math.min(1, (month - start + 1) / rampMonths)
}

export function run(inp: Inputs): Result {
  const rows: MonthRow[] = []
  let cumulative = 0
  let npv = 0
  let minCum = 0
  let everNegative = false
  let paybackMonth: number | null = null
  const monthlyRate = Math.pow(1 + inp.discountRate, 1 / 12) - 1

  for (let m = 1; m <= inp.horizonMonths; m++) {
    const revenue = inp.streams.reduce(
      (sum, s) => sum + (pick(s.annual, inp.scenario, 'revenue') / 12) * inp.realisation * rampFactor(m, s.startMonth, inp.rampMonths),
      0,
    )
    const cannibalised = revenue * inp.cannibalisation
    const opexM = inp.costs.filter((c) => m >= c.startMonth).reduce((sum, c) => sum + pick(c.monthly, inp.scenario, 'cost'), 0)
    const royalties = (revenue - cannibalised) * inp.royaltyRate
    const capexM = inp.capex.filter((c) => c.month === m).reduce((sum, c) => sum + pick(c.amount, inp.scenario, 'cost'), 0)
    const net = revenue - cannibalised - opexM - royalties - capexM
    cumulative += net
    npv += net / Math.pow(1 + monthlyRate, m)
    if (cumulative < 0) everNegative = true
    minCum = Math.min(minCum, cumulative)
    if (paybackMonth === null && everNegative && cumulative >= 0) paybackMonth = m
    rows.push({ month: m, revenue, cannibalised, opex: opexM, royalties, capex: capexM, net, cumulative })
  }

  let revenueIndex: number | null = null
  if (inp.baselineMonthlyRevenue && inp.baselineMonthlyRevenue > 0) {
    const last = rows[rows.length - 1]
    const grownBaseline = inp.baselineMonthlyRevenue * Math.pow(1 + inp.spotGrowth, inp.horizonMonths / 12)
    revenueIndex = (100 * (grownBaseline + last.revenue - last.cannibalised)) / inp.baselineMonthlyRevenue
  }

  return {
    rows,
    paybackMonth,
    npv,
    peakFunding: -minCum,
    revenueIndex,
    totals: {
      revenue: rows.reduce((s, r) => s + r.revenue - r.cannibalised, 0),
      costs: rows.reduce((s, r) => s + r.opex + r.royalties, 0),
      capex: rows.reduce((s, r) => s + r.capex, 0),
    },
  }
}

/** Plan month in which each capex phase is spent. */
export const PHASE_MONTH: Record<Phase, number> = { P1: 1, Power: 2, P2: 5, OB: 7, P3: 11 }

/** Inputs assembled from the data layer. Unquoted (Tier 0) lines are left out and reported. */
export function defaultInputs(overrides: Partial<Inputs> = {}, phases: readonly Phase[] = ['P1', 'Power', 'P2', 'OB', 'P3']): Inputs {
  return {
    horizonMonths: 24,
    streams: levers.map((l) => ({ id: l.id, name: l.name, annual: { low: l.lowKsh, high: l.highKsh }, startMonth: l.monthsToFirstRevenue })),
    costs: opex.filter((o) => o.monthly).map((o) => ({ id: o.id, monthly: o.monthly!, startMonth: o.startMonth })),
    capex: capex.filter((c) => c.cost && phases.includes(c.phase)).map((c) => ({ id: c.id, phase: c.phase, amount: c.cost!, month: PHASE_MONTH[c.phase] })),
    realisation: 0.5,
    rampMonths: 6,
    cannibalisation: 0.1,
    royaltyRate: 0.04,
    discountRate: 0.14,
    baselineMonthlyRevenue: null,
    spotGrowth: 0,
    scenario: 'base',
    ...overrides,
  }
}

/** Which assumptions are illustrative (Tier 2) rather than sourced. Shown next to the sliders. */
export const ASSUMPTION_NOTES: Record<string, string> = {
  realisation: 'Tier 2 assumption: share of each lever’s revenue range that is realised. No probabilities have been agreed yet.',
  rampMonths: 'Tier 2 assumption: months from launch to full run-rate.',
  cannibalisation: 'Tier 2 assumption: sponsored formats that replace existing spot sales.',
  royaltyRate: 'Tier 1: 4% of net revenue (Consolidated Music Tariffs 2026–2028).',
  discountRate: 'Board decision: hurdle rate, e.g. the company’s bank lending rate.',
}

export type TornadoBar = { input: string; label: string; low: number; high: number }

/** Effect of ±20% on each numeric assumption on NPV (sorted, biggest swing first). */
export function tornado(inp: Inputs): TornadoBar[] {
  const base = run(inp).npv
  const scaleAll = <T extends { [k: string]: unknown }>(items: T[], key: keyof T, f: number) =>
    items.map((it) => {
      const v = it[key] as { low: number; high: number }
      return { ...it, [key]: { low: v.low * f, high: v.high * f } }
    })
  const variants: { input: string; label: string; apply: (f: number) => Inputs }[] = [
    { input: 'revenue', label: 'Lever revenue', apply: (f) => ({ ...inp, streams: scaleAll(inp.streams, 'annual', f) }) },
    { input: 'opex', label: 'Operating costs', apply: (f) => ({ ...inp, costs: scaleAll(inp.costs, 'monthly', f) }) },
    { input: 'capex', label: 'Capex', apply: (f) => ({ ...inp, capex: scaleAll(inp.capex, 'amount', f) }) },
    { input: 'realisation', label: 'Realisation', apply: (f) => ({ ...inp, realisation: Math.min(1, inp.realisation * f) }) },
    { input: 'cannibalisation', label: 'Cannibalisation', apply: (f) => ({ ...inp, cannibalisation: Math.min(1, inp.cannibalisation * f) }) },
    { input: 'discountRate', label: 'Discount rate', apply: (f) => ({ ...inp, discountRate: inp.discountRate * f }) },
  ]
  return variants
    .map((v) => ({ input: v.input, label: v.label, low: run(v.apply(0.8)).npv - base, high: run(v.apply(1.2)).npv - base }))
    .sort((a, b) => Math.abs(b.high - b.low) - Math.abs(a.high - a.low))
}

/** Nice y-axis domain that always includes zero and every value (fixes the old clamp-at-100% bug). */
export function yDomain(values: number[]): [number, number] {
  const lo = Math.min(0, ...values)
  const hi = Math.max(0, ...values)
  if (lo === hi) return [lo - 1, hi + 1]
  const pad = (hi - lo) * 0.05
  return [lo - pad, hi + pad]
}

const fmtMonth = (m: number | null) => (m == null ? 'not within 24 months' : `Month ${m}`)

/** Text used by the Decision Summary, briefing and deck. */
export function paybackStatement() {
  const results = (['worst', 'base', 'best'] as const).map((s) => run(defaultInputs({ scenario: s })))
  const [worst, base, best] = results
  return {
    headline: 'To be confirmed after the baseline audit',
    detail: `Illustrative incremental model with every quoted phase and the full hiring plan (Tier 2 assumptions): base case ${fmtMonth(base.paybackMonth)}; best case ${fmtMonth(best.paybackMonth)}; worst case ${fmtMonth(worst.paybackMonth)}.`,
    base,
    worst,
    best,
  }
}
