/**
 * Builds dist/Nyota-FM-Board-Pack.pdf from the production build: serves dist/,
 * expands every <details>, loads lazy sections, and prints with Chromium.
 * Run after `pnpm build` (or use `pnpm board-pack`, which builds first).
 */
import { preview } from 'vite'
import { chromium } from '@playwright/test'
import { readFileSync, statSync } from 'node:fs'

const integrity = JSON.parse(readFileSync(new URL('../src/data/integrity.json', import.meta.url), 'utf8'))
const server = await preview({ preview: { port: 4317, strictPort: true }, logLevel: 'silent' })
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } })
  await page.goto('http://localhost:4317/', { waitUntil: 'networkidle' })
  // Scroll through once so deferred content renders, then open every <details>.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 1200) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 30))
    }
    window.scrollTo(0, 0)
    document.querySelectorAll('details').forEach((d) => (d.open = true))
  })
  await page.emulateMedia({ media: 'print' })
  const date = new Date().toISOString().slice(0, 10)
  const out = new URL('../dist/Nyota-FM-Board-Pack.pdf', import.meta.url).pathname
  const pdf = await page.pdf({
    path: out,
    format: 'A4',
    printBackground: false,
    scale: 0.78,
    margin: { top: '16mm', bottom: '18mm', left: '14mm', right: '14mm' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="font-size:8px;width:100%;padding:0 14mm;color:#555;display:flex;justify-content:space-between"><span>Nyota FM 107.3 · Board proposal v2.1 · Confidential · data ${integrity.dataHash} · ${date}</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
  })
  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length
  console.log(`board-pack: ${out} · ${pages} pages · ${(statSync(out).size / 1024).toFixed(0)} KB`)
  if (pages > 30) {
    console.error('board-pack: more than 30 pages; trim print content')
    process.exitCode = 1
  }
} finally {
  await browser.close()
  await new Promise((r) => server.httpServer.close(r))
}
