import {test, expect} from '@playwright/test';
import {sections} from '../../src/content/sections';

test('page loads without script errors', async ({page}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    // Third-party resources (fonts, images) can be blocked by the network; only report app errors.
    if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) errors.push(m.text());
  });
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('every section id exists exactly once and no id is duplicated', async ({page}) => {
  await page.goto('/');
  for (const {id} of sections) {
    await expect(page.locator(`[id="${id}"]`), id).toHaveCount(1);
  }
  const dupes = await page.evaluate(() => {
    const counts: Record<string, number> = {};
    document.querySelectorAll('[id]').forEach((el) => (counts[el.id] = (counts[el.id] ?? 0) + 1));
    return Object.entries(counts).filter(([, n]) => n > 1);
  });
  expect(dupes).toEqual([]);
});

test('no fabricated claims are rendered', async ({page}) => {
  await page.goto('/');
  const text = await page.locator('body').innerText();
  for (const bad of ['P051284920K', 'GAA APPROVED', 'REPUBLIC OF KENYA', 'COMPLIANCE CLEARED', 'Board Approved', 'ODPC Registered', '4,621']) {
    expect(text, bad).not.toContain(bad);
  }
});
