import type { FigureId } from '../figures'
import type { Rich } from './types'

export const hero = {
  headline: 'The plan to make Nyota FM the cultural and commercial anchor of Western Kenya.',
  lede: 'A data-backed, board-ready proposal for brand, studio, programming, digital and commercial leadership, {f:roadmap-months} from approval to market leadership.',
  cta: 'Read the 3-minute version',
  card: "Twang'aa Transformation · 2026–2028 · Board proposal",
  sideTab: "TWANG'AA v2.0",
} as const

export interface InShortStat {
  figure: FigureId
  label: Rich
  ghost: string
}

export const inShort = {
  recommendation: 'Approve {f:asks-count} decisions that make Nyota FM 107.3 the cultural and commercial anchor of Western Kenya by Q4 2027.',
  whyNow:
    'Radio ad spend fell {f:radio-adspend-change} to {f:radio-adspend} in 2025, and betting money on radio fell {f:betting-radio-change}. But {f:listenership-western} of Western Kenya still listens. The station keeps its spot base and builds new income from government, mobile and branded shows.',
  stats: [
    { figure: 'rev-multiple-base', label: 'revenue by Q4 2027 in the base case', ghost: '2' },
    { figure: 'capex-p1', label: 'for Studio Phase 1, about {f:capex-p1-saving} less than v1.0', ghost: '1' },
    { figure: 'breakeven-range', label: 'to recover the Phase 1 outlay', ghost: '5' },
  ] satisfies InShortStat[],
} as const

export const closing = {
  line: 'With these six decisions, the plan moves from proposal to live execution.',
  cta: 'Go to the asks',
} as const
