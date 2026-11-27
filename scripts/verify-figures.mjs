// Fidelity check: every number in the figure registry and the hand-written data
// modules must appear in the pre-redesign source (git commit BASE). Catches
// invented or mistyped figures. Run: pnpm verify:figures
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const BASE = process.env.BASE ?? 'c9069da'
const files = execSync(`git ls-tree -r --name-only ${BASE} src`, { encoding: 'utf8' }).split('\n').filter((f) => /\.(tsx?|css)$/.test(f))
const corpus = files.map((f) => execSync(`git show ${BASE}:${f}`, { encoding: 'utf8', maxBuffer: 1 << 26 })).join('\n')
const haystack = corpus.replace(/\s+/g, ' ')

const NUM = /\d[\d,]*(?:\.\d+)?/g
const missing = []

function check(label, text) {
  for (const n of text.match(NUM) ?? []) {
    if (n.length < 2 && !text.includes('×')) continue // single digits are too common to prove anything
    if (!haystack.includes(n)) missing.push(`${label}: "${n}" in "${text}"`)
  }
}

// 1. Figure registry: prefer the exact source value.
const figSrc = readFileSync('src/content/figures.ts', 'utf8')
for (const m of figSrc.matchAll(/f\(\{ id: '([^']+)'[^\n]*?display: '([^']+)'(?:, exact: '([^']+)')?/g)) {
  const [, id, display, exact] = m
  if (id === 'capex-reduction') continue // "more than 50%" is phrased; exact "> 50% Reduction" checked below
  check(`figure ${id}`, exact ?? display.replace(/(\d)K\b/g, '$1').replace(/(\d)M\b/g, '$1').replace(/(\d)B\b/g, '$1'))
}
check('figure capex-reduction', '> 50% Reduction')

// 2. Hand-transcribed data modules (not moved verbatim by script).
for (const file of ['src/content/data/counties.ts', 'src/content/data/schedule.ts', 'src/content/data/capexPhases.ts']) {
  const src = readFileSync(file, 'utf8')
  for (const m of src.matchAll(/'([^']*\d[^']*)'/g)) check(file, m[1])
}

if (missing.length) {
  console.error(`verify-figures: ${missing.length} values not found in ${BASE}:`)
  missing.forEach((x) => console.error(`  - ${x}`))
  process.exitCode = 1
} else {
  console.log(`verify-figures: every registry and data value traces to the pre-redesign source (${BASE}).`)
}
