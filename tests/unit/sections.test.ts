import {describe, expect, it} from 'vitest';
import {sections} from '../../src/content/sections';

describe('sections', () => {
  it('has unique ids', () => {
    const ids = sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
