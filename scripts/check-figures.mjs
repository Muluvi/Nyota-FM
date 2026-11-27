// Fails the build if raw currency, percentage or multiple literals appear in the
// story layer. Every number there must render through <Figure id="..." /> or a
// {f:id} token backed by src/content/figures.ts.
//
// Scope
// - Strict: every .tsx file outside the legacy audit layer, plus chapter copy.
// - Ratchet: the legacy audit layer (the original Part modules and widgets, kept
//   verbatim so no figure is retyped) may not gain new literals. Its count is
//   pinned in scripts/figures-baseline.json; it can only go down.
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const root = resolve('src')
const baselineFile = resolve('scripts/figures-baseline.json')
const LEGACY = [/^components\/v2\//, /^components\/website\//, /^components\/ledger\//, /^components\/(TouchpointFilter|AnimatedCounter|Reveal)\.tsx$/]
const COPY = [/^content\/chapters\/.+\.ts$/, /^content\/sections\.ts$/]
const PATTERNS = [
  { name: 'currency', re: /\b(?:KSh|Ksh|KES|Kshs)\.?\s?\d|\$\s?\d/g },
  { name: 'percentage', re: /\d\s?%/g },
  { name: 'multiple', re: /\d(?:\.\d+)?\s?×/g },
]

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name)
    if (statSync(file).isDirectory()) walk(file, out)
    else out.push(file)
  }
  return out
}

function scrub(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
    .replace(/className=(\{`[^`]*`\}|"[^"]*"|'[^']*')/g, '')
    .replace(/\{f:[a-z0-9-]+\}/g, '')
}

function scan(file) {
  const text = scrub(readFileSync(file, 'utf8'))
  const hits = []
  text.split('\n').forEach((line, i) => {
    for (const { name, re } of PATTERNS) {
      for (const m of line.matchAll(re)) hits.push({ line: i + 1, kind: name, match: m[0], text: line.trim().slice(0, 100) })
    }
  })
  return hits
}

const files = walk(root).map((f) => ({ abs: f, rel: relative(root, f).replaceAll('\\', '/') }))
const strict = files.filter((f) => (f.rel.endsWith('.tsx') && !LEGACY.some((r) => r.test(f.rel))) || COPY.some((r) => r.test(f.rel)))
const legacy = files.filter((f) => f.rel.endsWith('.tsx') && LEGACY.some((r) => r.test(f.rel)))

let failed = false
for (const f of strict) {
  for (const h of scan(f.abs)) {
    failed = true
    console.error(`src/${f.rel}:${h.line} raw ${h.kind} "${h.match}" → use <Figure> or {f:id}\n    ${h.text}`)
  }
}

const legacyCount = legacy.reduce((n, f) => n + scan(f.abs).length, 0)
let baseline = null
try {
  baseline = JSON.parse(readFileSync(baselineFile, 'utf8')).legacyLiterals
} catch {
  baseline = null
}
if (process.argv.includes('--update-baseline') || baseline === null) {
  writeFileSync(baselineFile, `${JSON.stringify({ legacyLiterals: legacyCount, note: 'Literals in the verbatim legacy audit layer. May only decrease.' }, null, 2)}\n`)
  console.log(`Legacy baseline written: ${legacyCount}`)
} else if (legacyCount > baseline) {
  failed = true
  console.error(`Legacy audit layer gained figure literals: ${legacyCount} > baseline ${baseline}. Add new numbers to src/content/figures.ts instead.`)
}

if (failed) {
  process.exitCode = 1
} else {
  console.log(`check-figures: ${strict.length} story files clean; legacy layer ${legacyCount} literals (baseline ${baseline ?? legacyCount}).`)
}
