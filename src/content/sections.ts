/**
 * The story spine. Every navigation element (header indicator, menu, search,
 * presentation mode, prev/next links, print) reads from this list.
 */
export type Accent = 'brass' | 'moss' | 'sage' | 'brick' | 'paper'
export type Band = 'ink' | 'ink-2' | 'brass' | 'moss' | 'sage' | 'brick' | 'paper'

export interface Section {
  id: string
  /** Two-digit chapter number, or empty for unnumbered sections. */
  number: string
  label: string
  /** One-sentence conclusion, ≤ 14 words. May contain {f:id} figure tokens. */
  actionTitle: string
  accent: Accent
  bg: Band
  /** Estimated minutes to skim + read (not detail). */
  readMinutes: number
  /** Ids from the pre-redesign site that should resolve here. */
  legacyIds?: string[]
  kind: 'intro' | 'chapter' | 'decision' | 'reference'
}

export const sections: readonly Section[] = [
  { id: 'in-short', number: '00', label: 'In short', actionTitle: 'The recommendation, three numbers and {f:asks-count} decisions.', accent: 'brass', bg: 'paper', readMinutes: 0.5, kind: 'intro', legacyIds: ['overview'] },
  { id: 'objectives', number: '01', label: 'Objectives', actionTitle: "Ownership's five mandates stand; the targets are reset against 2025/26 data.", accent: 'brass', bg: 'ink', readMinutes: 0.3, kind: 'chapter', legacyIds: ['part-1'] },
  { id: 'market', number: '02', label: 'Market data', actionTitle: 'Radio spend is shrinking and betting has collapsed, so growth must come elsewhere.', accent: 'sage', bg: 'sage', readMinutes: 0.3, kind: 'chapter', legacyIds: ['part-2'] },
  { id: 'model', number: '03', label: 'The model', actionTitle: 'The base case doubles revenue by Q4 2027; Phase 1 pays back by {f:breakeven-base}.', accent: 'moss', bg: 'moss', readMinutes: 0.3, kind: 'chapter', legacyIds: ['part-3'] },
  { id: 'opportunities', number: '04', label: 'Opportunities', actionTitle: 'Government, mobile and branded shows lead twelve ranked revenue streams.', accent: 'brass', bg: 'brass', readMinutes: 0.3, kind: 'chapter', legacyIds: ['part-4'] },
  { id: 'strategies', number: '05', label: 'Strategies', actionTitle: 'Twenty-one costed actions, each with a lead, a budget and a date.', accent: 'sage', bg: 'ink-2', readMinutes: 0.3, kind: 'chapter', legacyIds: ['part-5'] },
  { id: 'build', number: '06', label: 'The build', actionTitle: 'The studio is built in three gated phases over eighteen months.', accent: 'moss', bg: 'ink', readMinutes: 0.3, kind: 'chapter', legacyIds: ['part-6'] },
  { id: 'gap-audit', number: '07', label: 'Gap audit', actionTitle: 'All twenty v1.0 gaps are closed; forty build items each have an owner.', accent: 'brick', bg: 'brick', readMinutes: 0.3, kind: 'chapter', legacyIds: ['part-7'] },
  { id: 'asks', number: '08', label: 'The asks', actionTitle: 'Six decisions move the plan from proposal to execution.', accent: 'brass', bg: 'ink-2', readMinutes: 0.5, kind: 'decision', legacyIds: ['part-asks'] },
  { id: 'sources', number: '', label: 'Sources', actionTitle: 'Every figure traces to one of {f:sources-count} named sources.', accent: 'sage', bg: 'ink', readMinutes: 0.25, kind: 'reference' },
  { id: 'appendix', number: '', label: 'Appendix', actionTitle: 'Every tool, annexure and earlier draft, kept in full.', accent: 'sage', bg: 'ink', readMinutes: 0.25, kind: 'reference' },
] as const

export const storySections = sections.filter((s) => s.kind !== 'reference')
export const chapterSections = sections.filter((s) => s.kind === 'chapter')

export function sectionById(id: string): Section | undefined {
  return sections.find((s) => s.id === id)
}

/** Resolve a hash (including pre-redesign ids like #part-3) to a section and optional detail flag. */
export function resolveHash(hash: string): { section: Section; detail: boolean; anchor: string } | undefined {
  const raw = decodeURIComponent(hash.replace(/^#/, ''))
  if (!raw) return undefined
  const detail = raw.endsWith('-detail')
  const base = detail ? raw.slice(0, -'-detail'.length) : raw
  const section = sections.find((s) => s.id === base || s.legacyIds?.includes(base))
  if (!section) return undefined
  return { section, detail, anchor: detail ? `${section.id}-detail` : section.id }
}

export function neighbours(id: string): { prev?: Section; next?: Section } {
  const list = sections.filter((s) => s.kind !== 'reference' || s.id === 'sources')
  const i = list.findIndex((s) => s.id === id)
  return { prev: i > 0 ? list[i - 1] : undefined, next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined }
}
