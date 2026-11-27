// Injects the server-rendered story into dist/index.html so the hero paints
// before JavaScript runs. Runs after `vite build` and the SSR build.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const ssrEntry = resolve('dist-ssr/entry-server.js')
const { render } = await import(pathToFileURL(ssrEntry).href)
const html = render()
const file = resolve('dist/index.html')
const template = readFileSync(file, 'utf8')
if (!template.includes('<div id="root"></div>')) throw new Error('Root placeholder not found in dist/index.html')
writeFileSync(file, template.replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${html}</div>`))
rmSync(resolve('dist-ssr'), { recursive: true, force: true })
console.log(`prerender: injected ${(html.length / 1024).toFixed(1)} KB of HTML into dist/index.html`)
