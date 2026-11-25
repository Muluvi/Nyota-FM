/**
 * Post-build: renders src/prerender.tsx to HTML and places it inside #root in
 * dist/index.html (replacing the spinner), so the decision summary is readable
 * without JavaScript and appears before the app bundle has run.
 */
import { createServer } from 'vite'
import { readFileSync, writeFileSync } from 'node:fs'

// Minimal config: the app config aliases react to a file path, which breaks SSR module loading.
const vite = await createServer({
  configFile: false,
  root: new URL('..', import.meta.url).pathname,
  esbuild: { jsx: 'automatic' },
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})
try {
  const { render } = await vite.ssrLoadModule('/src/prerender.tsx')
  const html = render()
  const file = new URL('../dist/index.html', import.meta.url)
  const page = readFileSync(file, 'utf8')
  const start = page.indexOf('<div id="root">')
  const end = page.indexOf('</body>', start)
  if (start === -1 || end === -1) throw new Error('could not find #root in dist/index.html')
  const out = page.slice(0, start) + `<div id="root">${html}</div>\n  ` + page.slice(end)
  writeFileSync(file, out)
  console.log(`prerender: ${(html.length / 1024).toFixed(1)} KB of static HTML in #root`)
} finally {
  await vite.close()
}
