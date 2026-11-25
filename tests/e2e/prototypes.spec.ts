import {test, expect} from '@playwright/test';

test('no AudioContext is created on page load', async ({page}) => {
  await page.addInitScript(() => {
    (window as unknown as {__audioCtx: number}).__audioCtx = 0;
    const Orig = window.AudioContext;
    window.AudioContext = class extends Orig {
      constructor(...a: ConstructorParameters<typeof AudioContext>) {
        super(...a);
        (window as unknown as {__audioCtx: number}).__audioCtx++;
      }
    };
  });
  await page.goto('/');
  await page.mouse.wheel(0, 20000);
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => (window as unknown as {__audioCtx: number}).__audioCtx)).toBe(0);
});

test('player does not fake a stream when no URL is configured', async ({page}) => {
  const media: string[] = [];
  page.on('request', (r) => {
    if (r.resourceType() === 'media') media.push(r.url());
  });
  await page.goto('/');
  await page.getByRole('button', {name: 'Expand live radio player'}).click();
  const player = page.getByRole('region', {name: 'Live radio player'});
  await expect(player).toContainText('Stream link pending');
  await expect(player.getByRole('button', {name: 'Play radio'})).toBeDisabled();
  expect(media).toEqual([]);
});

test('the sample quote prints on its own', async ({page, browserName}) => {
  test.skip(browserName !== 'chromium', 'PDF output is Chromium-only');
  await page.goto('/');
  await page.evaluate(() => {
    window.print = () => {};
  });
  const quote = page.locator('#preview-advertiser');
  await quote.scrollIntoViewIfNeeded();
  await page.getByRole('button', {name: 'Print'}).first().waitFor();
  await page.locator('#media-quote').getByRole('button', {name: 'Print'}).click();
  await page.emulateMedia({media: 'print'});
  const pdf = await page.pdf({format: 'A4'});
  const pages = (pdf.toString('latin1').match(/\/Type \/Page[^s]/g) ?? []).length;
  expect(pages).toBeLessThanOrEqual(2);
});
