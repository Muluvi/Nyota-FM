import type { KshRange, Tier } from './types.ts'

/**
 * The single capex register. Phase totals are computed from these lines.
 * `inModel: false` lines appeared elsewhere on the site but were missing from the
 * original phase totals (power, OB rig, podcast room, editing workstation); they are
 * now listed so the board sees the full envelope. Quote dates are 'TODO_OWNER' until
 * vendors re-quote; prices are exposed to the USD exchange rate.
 */
export type Phase = 'P1' | 'P2' | 'P3' | 'Power' | 'OB'

export type CapexLine = {
  id: string
  item: string
  phase: Phase
  vendor: string
  quoteDate: string
  cost: KshRange | null // null = not yet quoted (Tier 0)
  tier: Tier
  inModel: boolean
}

export const capex: readonly CapexLine[] = [
  // Phase 1 — visual radio essentials (Months 1–4)
  { id: 'p1-ptz', item: '2× PTZ cameras (KTUH86, NDI/HDMI)', phase: 'P1', vendor: 'Broadcast Solutions International', quoteDate: '2026-09-30', cost: { low: 228_000, high: 228_000 }, tier: 1, inModel: true },
  { id: 'p1-atem', item: 'ATEM Television Studio HD switcher', phase: 'P1', vendor: 'Cellular Kenya', quoteDate: '2026-09-30', cost: { low: 154_999, high: 154_999 }, tier: 1, inModel: true },
  { id: 'p1-lights', item: 'VISICO LED-50A 3-light kit', phase: 'P1', vendor: 'Rondamo', quoteDate: '2026-09-30', cost: { low: 34_300, high: 34_300 }, tier: 1, inModel: true },
  { id: 'p1-acoustic', item: 'Acoustic treatment (20 m² panels)', phase: 'P1', vendor: 'Soundproofing Kenya', quoteDate: '2026-09-30', cost: { low: 110_000, high: 250_000 }, tier: 1, inModel: true },
  { id: 'p1-encoder', item: 'Hardware streaming encoder', phase: 'P1', vendor: 'Industry estimate', quoteDate: 'TODO_OWNER', cost: { low: 50_000, high: 120_000 }, tier: 2, inModel: true },
  { id: 'p1-install', item: 'Cables, mounts & installation', phase: 'P1', vendor: 'Local technician', quoteDate: 'TODO_OWNER', cost: { low: 50_000, high: 50_000 }, tier: 2, inModel: true },

  // Phase 2 — multi-camera rig (Months 5–10)
  { id: 'p2-ptz', item: '4× additional PTZ cameras', phase: 'P2', vendor: 'Broadcast Solutions International', quoteDate: '2026-09-30', cost: { low: 456_000, high: 652_000 }, tier: 1, inModel: true },
  { id: 'p2-atem-hd8', item: 'ATEM Television Studio HD8', phase: 'P2', vendor: 'Rondamo Technologies', quoteDate: '2026-09-30', cost: { low: 455_800, high: 455_800 }, tier: 1, inModel: true },
  { id: 'p2-pc', item: 'vMix / OBS production workstation', phase: 'P2', vendor: 'Custom build', quoteDate: 'TODO_OWNER', cost: { low: 150_000, high: 300_000 }, tier: 2, inModel: true },
  { id: 'p2-intercom', item: 'Talk-back intercom system', phase: 'P2', vendor: 'Industry estimate', quoteDate: 'TODO_OWNER', cost: { low: 80_000, high: 150_000 }, tier: 2, inModel: true },
  { id: 'p2-control', item: 'Control room build-out', phase: 'P2', vendor: 'Partitioning & acoustic glass', quoteDate: 'TODO_OWNER', cost: { low: 500_000, high: 1_000_000 }, tier: 0, inModel: true },
  { id: 'p2-truss', item: 'Overhead lighting truss & grid', phase: 'P2', vendor: 'Rondamo / local riggers', quoteDate: 'TODO_OWNER', cost: { low: 200_000, high: 400_000 }, tier: 2, inModel: true },
  { id: 'p2-edit', item: 'Editing workstation (shown as "Phase 1" in the studio plan)', phase: 'P2', vendor: 'Computer City Kenya', quoteDate: 'TODO_OWNER', cost: { low: 145_000, high: 145_000 }, tier: 2, inModel: false },
  { id: 'p2-podcast', item: 'Podcast room gear (RODECaster Pro II, 2× SM7B + Cloudlifters, Sony ZV-E10)', phase: 'P2', vendor: 'Local distributors', quoteDate: 'TODO_OWNER', cost: { low: 313_000, high: 313_000 }, tier: 2, inModel: false },

  // Phase 3 — media hub (Months 11–18)
  { id: 'p3-studio2', item: 'Secondary studio (podcast / pre-records)', phase: 'P3', vendor: 'Quotes needed', quoteDate: 'TODO_OWNER', cost: { low: 1_500_000, high: 3_000_000 }, tier: 0, inModel: true },
  { id: 'p3-dam', item: 'Digital asset management server & indexing', phase: 'P3', vendor: 'Quotes needed', quoteDate: 'TODO_OWNER', cost: { low: 500_000, high: 1_500_000 }, tier: 0, inModel: true },
  { id: 'p3-archive', item: 'NAS storage + offsite cloud backup', phase: 'P3', vendor: 'Industry estimate', quoteDate: 'TODO_OWNER', cost: { low: 300_000, high: 800_000 }, tier: 2, inModel: true },
  { id: 'p3-ai', item: 'Auto-clipping, transcription & captioning tools', phase: 'P3', vendor: 'Industry estimate', quoteDate: 'TODO_OWNER', cost: { low: 200_000, high: 500_000 }, tier: 2, inModel: true },

  // Power resilience (needed regardless of phase; see the 7 Aug 2026 Musaga outage)
  { id: 'pw-generator', item: '15 kVA silent diesel generator', phase: 'Power', vendor: 'Asset register listing', quoteDate: 'TODO_OWNER', cost: { low: 650_000, high: 650_000 }, tier: 2, inModel: false },
  { id: 'pw-solar', item: '10 kVA hybrid solar inverter + 15 kWh LFP batteries', phase: 'Power', vendor: 'Asset register listing', quoteDate: 'TODO_OWNER', cost: { low: 480_000, high: 480_000 }, tier: 2, inModel: false },

  // Outside-broadcast rig
  { id: 'ob-bonding', item: '4G/5G bonding rig (LiveU / Teradek class)', phase: 'OB', vendor: 'Broadcast Solutions International', quoteDate: 'TODO_OWNER', cost: { low: 320_000, high: 320_000 }, tier: 2, inModel: false },
  { id: 'ob-pa', item: 'Powered PA system + inverter kit', phase: 'OB', vendor: 'Music World Kenya', quoteDate: 'TODO_OWNER', cost: { low: 185_000, high: 185_000 }, tier: 2, inModel: false },
  { id: 'ob-gazebos', item: 'Branded pop-up gazebos & flags', phase: 'OB', vendor: 'Local signage vendor', quoteDate: 'TODO_OWNER', cost: { low: 65_000, high: 65_000 }, tier: 2, inModel: false },
  { id: 'ob-vehicle', item: 'OB vehicle and conversion', phase: 'OB', vendor: 'Three quotes needed', quoteDate: 'TODO_OWNER', cost: null, tier: 0, inModel: false },
]

const add = (a: KshRange, b: KshRange): KshRange => ({ low: a.low + b.low, high: a.high + b.high })
const ZERO: KshRange = { low: 0, high: 0 }

/** Sum of quoted lines (unquoted lines are counted separately). */
export function phaseTotal(phase: Phase, opts: { inModelOnly?: boolean } = {}): KshRange {
  return capex
    .filter((l) => l.phase === phase && l.cost && (!opts.inModelOnly || l.inModel))
    .reduce((t, l) => add(t, l.cost as KshRange), ZERO)
}

export const unquotedLines = (phase?: Phase) => capex.filter((l) => !l.cost && (!phase || l.phase === phase))

export const PHASES: readonly { id: Phase; label: string; months: string }[] = [
  { id: 'P1', label: 'Phase 1 · Visual radio essentials', months: 'Months 1–4' },
  { id: 'P2', label: 'Phase 2 · Multi-camera rig', months: 'Months 5–10' },
  { id: 'P3', label: 'Phase 3 · Media hub', months: 'Months 11–18' },
  { id: 'Power', label: 'Power resilience', months: 'Months 1–6' },
  { id: 'OB', label: 'Outside-broadcast rig', months: 'Months 7–9' },
]

/** Total of every quoted line across all phases. */
export const capexTotal = (): KshRange => PHASES.reduce((t, p) => add(t, phaseTotal(p.id)), ZERO)

/** The three studio phases as originally scheduled (P1–P3, in-model lines only). */
export const studioPhasesTotal = (): KshRange =>
  (['P1', 'P2', 'P3'] as const).reduce((t, p) => add(t, phaseTotal(p, { inModelOnly: true })), ZERO)
