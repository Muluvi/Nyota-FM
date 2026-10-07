import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname, extname } from 'node:path'

const root = resolve('src')
const entry = resolve(root, 'main.tsx')
const visited = new Set()
const extensions = ['', '.ts', '.tsx', '.js', '.jsx']

function resolveImport(from, specifier) {
  if (!specifier.startsWith('.')) return null
  const base = resolve(dirname(from), specifier)
  for (const extension of extensions) {
    const candidate = extension ? `${base}${extension}` : base
    if (existsSync(candidate)) return candidate
  }
  for (const extension of ['.ts', '.tsx']) {
    const candidate = resolve(base, `index${extension}`)
    if (existsSync(candidate)) return candidate
  }
  return null
}

function visit(file) {
  if (!file || visited.has(file)) return
  visited.add(file)
  const source = readFileSync(file, 'utf8')
  const imports = [...source.matchAll(/(?:import|export)\s+(?:[^'";]+?\s+from\s+)?['"]([^'"]+)['"]/g)]
  for (const [, specifier] of imports) visit(resolveImport(file, specifier))
}

visit(entry)
const files = []
function collect(directory) {
  for (const name of readdirSync(directory, { withFileTypes: true })) {
    const file = resolve(directory, name.name)
    if (name.isDirectory()) collect(file)
    else if (['.ts', '.tsx'].includes(extname(file))) files.push(file)
  }
}
const { readdirSync } = await import('node:fs')
collect(root)
const orphaned = files.filter((file) => !visited.has(file))
if (orphaned.length) {
  console.error(`Found ${orphaned.length} unreachable source files:`)
  orphaned.forEach((file) => console.error(`- ${file.replace(`${root}/`, '')}`))
  process.exitCode = 1
} else {
  console.log(`Import graph is complete: ${files.length} source files reachable.`)
}
