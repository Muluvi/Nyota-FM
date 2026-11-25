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

test('the Western reach fact renders the same in Hero, Search and Deck', async ({page, isMobile}) => {
  const {factValue} = await import('../../src/data/facts');
  const reach = factValue('radio.reach.western');
  await page.goto('/');
  await expect(page.locator('[data-fact="radio.reach.western"]')).toContainText(reach);

  await page.keyboard.press('Control+k');
  await page.getByRole('textbox').first().fill('Radio Reach');
  await expect(page.getByRole('heading', {name: `${reach} Radio Reach in Western Kenya`})).toBeVisible();
  await page.keyboard.press('Escape');

  test.skip(isMobile, 'Deck trigger lives in the desktop navbar');
  await page.reload();
  await page.getByRole('button', {name: /Presentation Mode/}).click();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog')).toContainText(reach);
});

test('sections render in decision order and the rail lists every section', async ({page, isMobile}) => {
  const {sections} = await import('../../src/content/sections');
  await page.goto('/');
  const order = await page.evaluate((ids) => ids.map((id) => document.getElementById(id)!.getBoundingClientRect().top + window.scrollY), sections.map((s) => s.id));
  expect([...order].sort((a, b) => a - b)).toEqual(order);
  if (!isMobile) {
    const rail = page.locator('nav, aside').filter({hasText: 'B. Preview'}).first();
    for (const s of sections) await expect(rail).toContainText(s.shortTitle);
  }
});

test('no 2026 quarter milestones remain in the chapters', async ({page}) => {
  const {chapterSections} = await import('../../src/content/sections');
  await page.goto('/');
  for (const s of chapterSections) {
    // Source titles in Appendix A may legitimately cite 2026 reports; plan chapters may not.
    const text = await page.locator(`[id="${s.id}"]`).innerText();
    expect(text, s.id).not.toMatch(/Q[1-4] 2026/);
  }
});

test('axe: no serious or critical accessibility violations in the board chapters', async ({page}) => {
  const {default: AxeBuilder} = await import('@axe-core/playwright');
  await page.goto('/');
  const results = await new AxeBuilder({page}).include('main').exclude('#appendix-preview').analyze();
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  console.log(serious.map((v) => `${v.id} (${v.nodes.length})`).join('\n'));
  expect.soft(serious.length).toBe(0);
});
