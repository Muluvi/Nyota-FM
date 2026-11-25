/**
 * Data integrity check (run by `pnpm check`). Fails the build when:
 *  (a) a Tier 1 fact has no source, or its source lacks a URL or access date;
 *  (b) the same fact key appears twice with different values;
 *  (c) a component gains hard-coded currency/percent literals beyond the recorded
 *      baseline (lines marked `data-ok` are allowed). The baseline only ratchets down;
 *  (d) a plan month (strategies, opex) is before Month 0;
 *  (e) an uncontracted brand from partners.ts appears in a component without `data-ok`.
 * Writes src/data/integrity.json (counts + data hash) for the Integrity panel and print footer.
 */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, relative, extname } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const { facts } = await import(resolve(root, 'src/data/facts.ts'))
const { sources } = await import(resolve(root, 'src/data/sources.ts'))
const { partners } = await import(resolve(root, 'src/data/partners.ts'))
const { opex } = await import(resolve(root, 'src/data/opex.ts'))
const strategiesPath = resolve(root, 'src/data/strategies.ts')
const strategies = existsSync(strategiesPath) ? (await import(strategiesPath)).strategies : []

const errors = []
const sourceIds = new Map(sources.map((s) => [s.id, s]))

// (a)
for (const f of facts) {
  if (f.tier !== 1) continue
  const s = f.sourceId && sourceIds.get(f.sourceId)
  if (!s) errors.push(`(a) Tier 1 fact "${f.key}" has no valid sourceId`)
  else if (!s.url || !s.accessed) errors.push(`(a) source "${s.id}" for "${f.key}" lacks url or accessed date`)
}

// (b)
const byKey = new Map()
let contradictions = 0
for (const f of facts) {
  if (byKey.has(f.key) && byKey.get(f.key) !== f.value) {
    contradictions++
    errors.push(`(b) fact key "${f.key}" has two values: "${byKey.get(f.key)}" vs "${f.value}"`)
  }
  byKey.set(f.key, f.value)
}

// (c) + (e)
const LITERAL = /KSh\s?[\d,]+|\d+(\.\d+)?\s?%/g
const files = []
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = resolve(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (['.ts', '.tsx'].includes(extname(p))) files.push(p)
  }
}
walk(resolve(root, 'src/components'))

const baselinePath = resolve(root, 'scripts/literal-baseline.json')
const baseline = existsSync(baselinePath) ? JSON.parse(readFileSync(baselinePath, 'utf8')) : {}
const counts = {}
const brandPatterns = partners.filter((p) => !p.contracted).map((p) => ({ name: p.name, re: new RegExp(p.pattern) }))
for (const file of files) {
  const rel = relative(root, file)
  let n = 0
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (line.includes('data-ok')) return
      n += (line.match(LITERAL) ?? []).length
      for (const b of brandPatterns) {
        if (b.re.test(line)) errors.push(`(e) ${rel}:${i + 1} names "${b.name}" (not contracted); remove it or mark the line data-ok if it is a sourced market fact`)
      }
    })
  if (n) counts[rel] = n
}
const updateBaseline = process.argv.includes('--update-baseline')
for (const [rel, n] of Object.entries(counts)) {
  const allowed = baseline[rel] ?? 0
  if (n > allowed && !updateBaseline) errors.push(`(c) ${rel} has ${n} hard-coded currency/percent literals (baseline ${allowed}); move figures to src/data`)
}
if (updateBaseline) {
  // Only ever lower the baseline (or record a new one on first run).
  const next = {}
  // New files are never grandfathered in: they must not contain hard-coded figures.
  const first = Object.keys(baseline).length === 0
  for (const [rel, n] of Object.entries(counts)) {
    if (baseline[rel] != null) next[rel] = Math.min(n, baseline[rel])
    else if (first) next[rel] = n
    else errors.push(`(c) ${rel} is new and has ${n} hard-coded currency/percent literals; move figures to src/data`)
  }
  writeFileSync(baselinePath, JSON.stringify(Object.fromEntries(Object.entries(next).sort()), null, 2) + '\n')
}

// (d)
for (const s of strategies) {
  if (s.startMonth < 0 || s.endMonth < s.startMonth) errors.push(`(d) strategy ${s.id} has an invalid month range ${s.startMonth}–${s.endMonth}`)
}
for (const o of opex) if (o.startMonth < 0) errors.push(`(d) opex ${o.id} starts before Month 0`)

// Integrity summary
const dataDir = resolve(root, 'src/data')
const hash = createHash('sha256')
for (const f of readdirSync(dataDir).filter((f) => f.endsWith('.ts')).sort()) hash.update(readFileSync(resolve(dataDir, f)))
const tierCounts = { 0: 0, 1: 0, 2: 0 }
facts.forEach((f) => tierCounts[f.tier]++)
const summary = {
  dataHash: hash.digest('hex').slice(0, 12),
  facts: facts.length,
  factsByTier: tierCounts,
  tier0Gaps: facts.filter((f) => f.tier === 0).map((f) => f.label),
  sources: sources.length,
  deepLinkedSources: sources.filter((s) => s.deep).length,
  contradictions,
  hardcodedLiteralsRemaining: Object.values(counts).reduce((a, b) => a + b, 0),
  componentsWithLiterals: Object.keys(counts).length,
}
const summaryPath = resolve(dataDir, 'integrity.json')
const nextSummary = JSON.stringify(summary, null, 2) + '\n'
if (!existsSync(summaryPath) || readFileSync(summaryPath, 'utf8') !== nextSummary) writeFileSync(summaryPath, nextSummary)

if (errors.length) {
  console.error(`check-data: ${errors.length} problem(s)`)
  errors.forEach((e) => console.error(' - ' + e))
  process.exitCode = 1
} else {
  console.log(
    `check-data: OK · ${summary.facts} facts (T1 ${tierCounts[1]}, T2 ${tierCounts[2]}, T0 ${tierCounts[0]}) · ${summary.deepLinkedSources}/${summary.sources} deep-linked sources · ${summary.hardcodedLiteralsRemaining} hard-coded literals left in ${summary.componentsWithLiterals} components · hash ${summary.dataHash}`,
  )
}
