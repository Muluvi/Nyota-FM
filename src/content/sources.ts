import { sourceList, type SourceItem } from './data/sourceList'

/**
 * Source registry. Numbered external sources come verbatim from the v2.0 master
 * source list. Internal sources describe where a figure comes from when it is a
 * model output or an earlier draft, so every figure can point at something.
 */
export type ExternalSourceId = `s${number}`
export type InternalSourceId = 'model' | 'v1' | 'unsourced'
export type SourceId = ExternalSourceId | InternalSourceId

export interface InternalSource {
  id: InternalSourceId
  org: string
  title: string
  anchor: string
}

export const internalSources: Record<InternalSourceId, InternalSource> = {
  model: {
    id: 'model',
    org: 'Firefly Management',
    title: 'v2.0 modelled estimate (Tier 2): method shown in the chapter detail',
    anchor: 'model-detail',
  },
  v1: {
    id: 'v1',
    org: 'Firefly Management',
    title: 'v1.0 proposal (May 2026), quoted for comparison only',
    anchor: 'gap-audit-detail',
  },
  unsourced: {
    id: 'unsourced',
    org: 'No source recorded',
    title: 'Appears on the earlier site without a citation. Logged in OPEN_QUESTIONS.md',
    anchor: 'sources',
  },
}

export const externalSources: readonly SourceItem[] = sourceList

export function externalSource(id: SourceId): SourceItem | undefined {
  if (!id.startsWith('s')) return undefined
  const n = Number(id.slice(1))
  return sourceList.find((s) => s.id === n)
}

export function sourceLabel(id: SourceId): string {
  const ext = externalSource(id)
  if (ext) return `[${ext.id}] ${ext.org}: ${ext.title}`
  const internal = internalSources[id as InternalSourceId]
  return internal ? `${internal.org}: ${internal.title}` : 'Unknown source'
}

export function sourceHref(id: SourceId): string {
  const ext = externalSource(id)
  if (ext) return `#source-${ext.id}`
  const internal = internalSources[id as InternalSourceId]
  return `#${internal ? internal.anchor : 'sources'}`
}
