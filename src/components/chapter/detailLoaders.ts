import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

/**
 * Audit layer: the original Part modules, unchanged in content, loaded only
 * when a reader opens "Read the detail" (or prints).
 */
const named = <K extends string>(p: Promise<Record<K, ComponentType>>, k: K) => p.then((m) => ({ default: m[k] }))

export const detailLoaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  objectives: () => named(import('../v2/Part1Objectives'), 'Part1Objectives'),
  market: () => named(import('../v2/Part2MasterData'), 'Part2MasterData'),
  model: () => named(import('../v2/Part3DataAnalysis'), 'Part3DataAnalysis'),
  opportunities: () => named(import('../v2/Part4Opportunities'), 'Part4Opportunities'),
  strategies: () => named(import('../v2/Part5Strategies'), 'Part5Strategies'),
  build: () => named(import('../v2/Part6TheBuild'), 'Part6TheBuild'),
  'gap-audit': () => named(import('../v2/Part7GapAudit'), 'Part7GapAudit'),
}

export const detailComponents: Record<string, LazyExoticComponent<ComponentType>> = Object.fromEntries(
  Object.entries(detailLoaders).map(([k, loader]) => [k, lazy(loader)]),
)

/** Warm every detail chunk (print, presentation). */
export function preloadAllDetail(): Promise<unknown> {
  return Promise.all(Object.values(detailLoaders).map((l) => l()))
}
