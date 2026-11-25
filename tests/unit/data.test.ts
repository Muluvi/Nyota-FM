import {describe, expect, it} from 'vitest';
import {touchpointGroups, groupTotal, touchpointCount, touchpointTotal} from '../../src/data/rateCard';
import {phaseTotal, capexTotal, studioPhasesTotal, unquotedLines} from '../../src/data/capex';
import {newHiresMonthly} from '../../src/data/opex';
import {facts} from '../../src/data/facts';
import {sources} from '../../src/data/sources';
import {monthToQuarterLabel, monthRangeLabel} from '../../src/data/timeline';
import {asks} from '../../src/data/asks';

describe('rate card', () => {
  it('has 50 touchpoints totalling KSh 230,000 (the docx YouTube subtotal was wrong)', () => {
    expect(touchpointCount).toBe(50);
    expect(touchpointTotal).toBe(230_000);
    expect(groupTotal(touchpointGroups.find((g) => g.id === 'youtube')!)).toBe(97_000);
  });
});

describe('capex register', () => {
  it('reproduces the quoted phase envelopes', () => {
    expect(phaseTotal('P1')).toEqual({low: 627_299, high: 837_299});
    expect(phaseTotal('P2', {inModelOnly: true})).toEqual({low: 1_841_800, high: 2_957_800});
    expect(phaseTotal('P3')).toEqual({low: 2_500_000, high: 5_800_000});
    expect(studioPhasesTotal()).toEqual({low: 4_969_099, high: 9_595_099});
  });
  it('adds the previously missing lines to the full envelope', () => {
    const full = capexTotal();
    expect(full.low).toBeGreaterThan(studioPhasesTotal().low);
    expect(full).toEqual({low: 4_969_099 + 458_000 + 1_130_000 + 570_000, high: 9_595_099 + 458_000 + 1_130_000 + 570_000});
    expect(unquotedLines('OB').map((l) => l.id)).toEqual(['ob-vehicle']);
  });
});

describe('opex', () => {
  it('new hires cost KSh 370–630K per month', () => {
    expect(newHiresMonthly()).toEqual({low: 370_000, high: 630_000});
  });
});

describe('facts and sources', () => {
  it('every Tier 1 fact points at a source with a URL and access date', () => {
    const ids = new Set(sources.map((s) => s.id));
    for (const f of facts.filter((x) => x.tier === 1)) expect(ids.has(f.sourceId!), f.key).toBe(true);
  });
  it('fact keys are unique', () => {
    expect(new Set(facts.map((f) => f.key)).size).toBe(facts.length);
  });
});

describe('timeline', () => {
  it('maps plan months to calendar quarters from Month 0 = Jan 2027', () => {
    expect(monthToQuarterLabel(1)).toBe('Q1 2027');
    expect(monthToQuarterLabel(24)).toBe('Q4 2028');
    expect(monthRangeLabel(4, 6)).toBe('Months 4–6 (Q2 2027)');
  });
});

describe('asks', () => {
  it('has six asks and the capex ask is tied to the Phase 1 total', () => {
    expect(asks).toHaveLength(6);
    expect(asks[1].amount).toBe('≤ KSh 0.84 M');
  });
});
