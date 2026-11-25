import {describe, expect, it} from 'vitest';
import {linear, ticks} from '../../src/components/charts/scale';

describe('chart scales', () => {
  it('maps domain to range linearly', () => {
    const x = linear([0, 100], [10, 210]);
    expect(x(0)).toBe(10);
    expect(x(50)).toBe(110);
    expect(x(100)).toBe(210);
  });
  it('handles a zero-width domain without dividing by zero', () => {
    expect(Number.isFinite(linear([5, 5], [0, 10])(5))).toBe(true);
  });
  it('produces round ticks that cover the maximum', () => {
    expect(ticks(1291)).toEqual([0, 500, 1000, 1500]);
    expect(ticks(83)).toEqual([0, 25, 50, 75, 100]);
    expect(ticks(0)).toEqual([0]);
    for (const m of [3.7, 52.26, 39.1, 1_867_579]) {
      const t = ticks(m);
      expect(t[t.length - 1]).toBeGreaterThanOrEqual(m);
    }
  });
});
