/** Evidence tier: 1 = published source, 2 = modelled from stated inputs, 0 = declared gap. */
export type Tier = 0 | 1 | 2

/** Marker for values the station or owner must supply. Rendered as "To be confirmed". */
export const TODO_OWNER = 'TODO_OWNER' as const
export type TodoOwner = typeof TODO_OWNER

export type Source = {
  id: string
  publisher: string
  title: string
  /** Full https URL. `deep: true` means it points at the exact document, not a home page. */
  url: string
  deep: boolean
  published?: string
  accessed: string // ISO date
}

export type Fact = {
  id: string
  /** Stable key; the same key must never appear with two different values. */
  key: string
  label: string
  value: string
  unit?: string
  period?: string
  geo?: string
  tier: Tier
  sourceId?: string
  method?: string
  inputs?: string
  note?: string
}

/** A money range in KSh. A missing value (Tier 0) is represented by `null`. */
export type KshRange = { low: number; high: number }
