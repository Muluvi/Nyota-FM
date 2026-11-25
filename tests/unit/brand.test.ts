import {describe, expect, it} from 'vitest';
import {readFileSync} from 'node:fs';
import {palette, contrast} from '../../src/data/brand';

describe('brand tokens', () => {
  const css = readFileSync('src/index.css', 'utf8');
  it('match the @theme colours in index.css', () => {
    for (const c of palette) expect(css, c.token).toMatch(new RegExp(`--color-${c.token}:\\s*${c.hex}`, 'i'));
  });
  it('brick-text meets AA contrast on ink while plain brick does not', () => {
    expect(contrast('#C47F66', '#090B0A')).toBeGreaterThan(4.5);
    expect(contrast('#9B624C', '#090B0A')).toBeLessThan(4.5);
  });
});
