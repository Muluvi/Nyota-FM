import type { FigureId } from '../figures'

/**
 * Copy strings may contain tokens:
 *   {f:figure-id}            renders a registered figure with its citation
 *   {g:glossary-key}         renders the glossary term with a tooltip
 *   {g:glossary-key|text}    renders custom text with the glossary tooltip
 * Raw currency, percentages and multiples are not allowed in copy (check-figures).
 */
export type Rich = string

export interface ProofPoint {
  figure: FigureId
  label: Rich
  /** Optional trend for a sparkline (values in display order). */
  trend?: readonly number[]
  trendLabel?: string
}

export type FeaturedKey = 'mandates' | 'counties' | 'payback' | 'opportunities' | 'strategies' | 'build' | 'gaps'

export interface ChapterCopy {
  id: string
  core: Rich
  proof: readonly ProofPoint[]
  featured: FeaturedKey
  /** The takeaway title of the featured visual (one chart = one message). */
  featuredTitle: Rich
  /** Text alternative / summary sentence for the featured visual. */
  featuredSummary: Rich
  /** One line saying what the detail layer holds. */
  detailSummary: string
  bridge: Rich
}
