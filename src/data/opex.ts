import type { KshRange, Tier } from './types.ts'

/** Monthly operating costs the plan adds, with the plan month they start. */
export type OpexLine = { id: string; item: string; monthly: KshRange | null; startMonth: number; tier: Tier; sourceId?: string; note?: string }

export const opex: readonly OpexLine[] = [
  { id: 'hire-digital', item: 'Head of Digital', monthly: { low: 120_000, high: 200_000 }, startMonth: 1, tier: 2, note: 'Payscale-based benchmark; not re-verified' },
  { id: 'hire-video', item: 'Video Producer', monthly: { low: 60_000, high: 100_000 }, startMonth: 1, tier: 2 },
  { id: 'hire-social', item: 'Social Media Manager', monthly: { low: 60_000, high: 100_000 }, startMonth: 1, tier: 2 },
  { id: 'hire-community', item: 'Community Manager', monthly: { low: 50_000, high: 80_000 }, startMonth: 1, tier: 2 },
  { id: 'hire-data', item: 'Data & Insights Lead', monthly: { low: 80_000, high: 150_000 }, startMonth: 4, tier: 2 },
  { id: 'ussd', item: 'USSD dedicated code (Safaricom)', monthly: { low: 70_000, high: 70_000 }, startMonth: 4, tier: 1, sourceId: 'at-ussd-dedicated' },
  { id: 'shows', item: 'Pre-recorded show production', monthly: { low: 150_000, high: 250_000 }, startMonth: 4, tier: 2, note: 'Per show per month; one show assumed until all four launch' },
  { id: 'messaging', item: 'WhatsApp messaging and BSP fees', monthly: null, startMonth: 3, tier: 0, note: 'Depends on contact base and message mix' },
  { id: 'royalties', item: 'Music royalties (4% of net revenue)', monthly: null, startMonth: 1, tier: 0, note: 'Needs audited net revenue' },
  { id: 'paid-social', item: 'Paid social acquisition', monthly: null, startMonth: 3, tier: 0 },
]

/** Sum of the quoted monthly lines active in month m. */
export function monthlyOpex(m: number): KshRange {
  return opex
    .filter((l) => l.monthly && m >= l.startMonth)
    .reduce((t, l) => ({ low: t.low + (l.monthly as KshRange).low, high: t.high + (l.monthly as KshRange).high }), { low: 0, high: 0 })
}

export const newHiresMonthly = (): KshRange =>
  opex.filter((l) => l.id.startsWith('hire-')).reduce((t, l) => ({ low: t.low + l.monthly!.low, high: t.high + l.monthly!.high }), { low: 0, high: 0 })

/**
 * Cost to the station of one ~20-second USSD session (Safaricom KSh 1.00 + Africa's Talking
 * KSh 0.25), as stated in the v2.0 data room. Tier 2 until confirmed on an Africa's Talking quote.
 */
export const USSD_SESSION_COST_KSH = 1.25
