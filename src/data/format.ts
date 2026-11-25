import { TODO_OWNER } from './types.ts'
import type { KshRange } from './types.ts'

export const formatKsh = (n: number) => `KSh ${Math.round(n).toLocaleString('en-KE')}`

export const formatKshRange = (r: KshRange | null) =>
  r == null ? 'To be confirmed' : r.low === r.high ? formatKsh(r.low) : `KSh ${r.low.toLocaleString('en-KE')}–${r.high.toLocaleString('en-KE')}`

/** Compact millions, e.g. 627299 → "0.63", used as "KSh 0.63–0.84 M". */
export const toMillions = (n: number, digits = 2) => (n / 1_000_000).toFixed(digits)

export const formatKshRangeM = (r: KshRange, digits = 2) =>
  r.low === r.high ? `KSh ${toMillions(r.low, digits)} M` : `KSh ${toMillions(r.low, digits)}–${toMillions(r.high, digits)} M`

export const displayValue = (v: string) => (v === TODO_OWNER ? 'To be confirmed' : v)
