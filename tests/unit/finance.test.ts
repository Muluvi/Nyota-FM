import {describe, expect, it} from 'vitest';
import {run, rampFactor, pick, yDomain, tornado, defaultInputs, paybackStatement, type Inputs} from '../../src/model/finance';

/** A tiny model that can be checked by hand. */
const fixture = (over: Partial<Inputs> = {}): Inputs => ({
  horizonMonths: 6,
  streams: [{id: 's', name: 'Stream', annual: {low: 120_000, high: 360_000}, startMonth: 1}], // 10K–30K / month
  costs: [{id: 'c', monthly: {low: 2_000, high: 6_000}, startMonth: 1}],
  capex: [{id: 'k', phase: 'P1', amount: {low: 30_000, high: 50_000}, month: 1}],
  realisation: 1,
  rampMonths: 0,
  cannibalisation: 0,
  royaltyRate: 0,
  discountRate: 0,
  baselineMonthlyRevenue: null,
  spotGrowth: 0,
  scenario: 'base',
  ...over,
});

describe('helpers', () => {
  it('picks scenario points with costs pessimistic in the worst case', () => {
    expect(pick({low: 10, high: 30}, 'base', 'revenue')).toBe(20);
    expect(pick({low: 10, high: 30}, 'worst', 'revenue')).toBe(10);
    expect(pick({low: 10, high: 30}, 'worst', 'cost')).toBe(30);
    expect(pick({low: 10, high: 30}, 'best', 'cost')).toBe(10);
  });
  it('ramps linearly from the start month', () => {
    expect(rampFactor(2, 3, 4)).toBe(0);
    expect(rampFactor(3, 3, 4)).toBe(0.25);
    expect(rampFactor(6, 3, 4)).toBe(1);
    expect(rampFactor(9, 3, 4)).toBe(1);
    expect(rampFactor(3, 3, 0)).toBe(1);
  });
  it('y-domain always includes zero and every value', () => {
    const [lo, hi] = yDomain([5_000_000, 6_990_000]);
    expect(lo).toBeLessThanOrEqual(0);
    expect(hi).toBeGreaterThanOrEqual(6_990_000);
    expect(yDomain([0, 0])).toEqual([-1, 1]);
  });
});

describe('run: hand-computed scenarios', () => {
  it('base: 20K revenue − 4K opex per month, 40K capex in month 1 → payback month 3', () => {
    const r = run(fixture());
    expect(r.rows.map((x) => x.net)).toEqual([-24_000, 16_000, 16_000, 16_000, 16_000, 16_000]);
    expect(r.rows[2].cumulative).toBe(8_000);
    expect(r.paybackMonth).toBe(3);
    expect(r.peakFunding).toBe(24_000);
    expect(r.npv).toBeCloseTo(56_000, 6); // zero discount rate
  });
  it('worst: 10K − 6K, 50K capex → not within 6 months', () => {
    const r = run(fixture({scenario: 'worst'}));
    expect(r.rows[0].net).toBe(10_000 - 6_000 - 50_000);
    expect(r.rows[5].cumulative).toBe(-46_000 + 5 * 4_000);
    expect(r.paybackMonth).toBeNull();
  });
  it('best: 30K − 2K, 30K capex → payback month 2', () => {
    const r = run(fixture({scenario: 'best'}));
    expect(r.rows[0].net).toBe(-2_000);
    expect(r.paybackMonth).toBe(2);
  });
  it('applies cannibalisation and royalties to new revenue only', () => {
    const r = run(fixture({cannibalisation: 0.1, royaltyRate: 0.04, capex: [], costs: []}));
    // 20,000 − 2,000 cannibalised − 4% of 18,000
    expect(r.rows[0].net).toBeCloseTo(20_000 - 2_000 - 720, 6);
  });
  it('discounts later months', () => {
    const r = run(fixture({discountRate: 0.12}));
    expect(r.npv).toBeLessThan(56_000);
  });
  it('payback is never earlier than month 1', () => {
    for (const s of ['worst', 'base', 'best'] as const) {
      const p = run(defaultInputs({scenario: s})).paybackMonth;
      if (p !== null) expect(p).toBeGreaterThanOrEqual(1);
    }
  });
  it('reports a revenue index only when a baseline exists', () => {
    expect(run(fixture()).revenueIndex).toBeNull();
    const r = run(fixture({baselineMonthlyRevenue: 100_000}));
    expect(r.revenueIndex).toBeCloseTo(120, 6); // (100K + 20K) / 100K
  });
});

describe('data-driven model', () => {
  it('never credits baseline revenue to the plan and orders scenarios sensibly', () => {
    const [w, b, x] = (['worst', 'base', 'best'] as const).map((s) => run(defaultInputs({scenario: s})));
    expect(w.npv).toBeLessThan(b.npv);
    expect(b.npv).toBeLessThan(x.npv);
    expect(b.rows[0].revenue).toBe(0); // no lever earns in month 1
  });
  it('tornado lists every assumption, biggest swing first', () => {
    const t = tornado(defaultInputs());
    expect(t).toHaveLength(6);
    const swing = (b: (typeof t)[number]) => Math.abs(b.high - b.low);
    for (let i = 1; i < t.length; i++) expect(swing(t[i - 1])).toBeGreaterThanOrEqual(swing(t[i]));
  });
  it('payback statement keeps the headline honest', () => {
    expect(paybackStatement().headline).toBe('To be confirmed after the baseline audit');
  });
});

describe('phase selection', () => {
  it('Phase 1 only needs less funding than all phases', () => {
    const all = run(defaultInputs());
    const p1 = run(defaultInputs({}, ['P1']));
    expect(p1.totals.capex).toBeLessThan(all.totals.capex);
    expect(p1.peakFunding).toBeLessThan(all.peakFunding);
  });
});
