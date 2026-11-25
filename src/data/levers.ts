import type { Tier } from './types.ts'

/**
 * Revenue levers (annual revenue range in KSh). `pSuccess` is left null until the
 * team agrees probabilities with the board; it is never guessed in code.
 * `legacyScore` is the v2.0 composite score, shown for continuity only.
 */
export type Lever = {
  id: string
  name: string
  lowKsh: number
  highKsh: number
  pSuccess: number | null
  monthsToFirstRevenue: number
  timeLabel: string
  activationCost: 'Low' | 'Low–Medium' | 'Medium' | 'High'
  difficulty: 'Low' | 'Medium' | 'High'
  tier: Tier
  legacyScore: number
  rationale: string
  strategyId?: string
}

export const levers: readonly Lever[] = [
  { id: 'gaa-county', name: 'GAA / County Government Vendor', lowKsh: 2_000_000, highKsh: 8_000_000, pSuccess: null, monthsToFirstRevenue: 6, timeLabel: '6–12 months', activationCost: 'Low–Medium', difficulty: 'Medium', tier: 2, legacyScore: 8.5, strategyId: '5.14', rationale: 'Relationship-driven institutional spend. The GAA covers national-government advertising; counties procure separately.' },
  { id: 'whatsapp-ussd', name: 'WhatsApp / USSD Engagement Products', lowKsh: 1_000_000, highKsh: 3_000_000, pSuccess: null, monthsToFirstRevenue: 3, timeLabel: '3–6 months', activationCost: 'Medium', difficulty: 'Medium', tier: 2, legacyScore: 8.2, strategyId: '5.5', rationale: 'Builds the addressable audience and creates sponsorable, measurable participation.' },
  { id: 'branded-shows', name: 'Branded / Sponsored Pre-Recorded Shows', lowKsh: 2_000_000, highKsh: 5_000_000, pSuccess: null, monthsToFirstRevenue: 3, timeLabel: '3–6 months', activationCost: 'Medium', difficulty: 'Low', tier: 2, legacyScore: 7.8, strategyId: '5.1', rationale: 'Four show packages with title-sponsorship potential and low execution risk.' },
  { id: 'ob-circuit', name: 'Outside Broadcast (OB) Circuit', lowKsh: 2_000_000, highKsh: 4_000_000, pSuccess: null, monthsToFirstRevenue: 6, timeLabel: '3–6 months after the OB rig', activationCost: 'High', difficulty: 'Medium', tier: 2, legacyScore: 7.2, strategyId: '5.11', rationale: 'Market-day activations; unit economics are Tier 0 until a pilot activation is costed.' },
  { id: 'youtube-social', name: 'YouTube + Social Media Monetisation', lowKsh: 600_000, highKsh: 2_400_000, pSuccess: null, monthsToFirstRevenue: 3, timeLabel: '3–6 months', activationCost: 'Low', difficulty: 'Medium', tier: 2, legacyScore: 6.9, strategyId: '5.10', rationale: 'Low marginal cost; TikTok Creator Rewards are not available in Kenya, so brand deals carry the revenue.' },
  { id: 'podcast', name: 'Podcast Advertising & Distribution', lowKsh: 500_000, highKsh: 2_000_000, pSuccess: null, monthsToFirstRevenue: 6, timeLabel: '6–12 months', activationCost: 'Low', difficulty: 'Medium', tier: 2, legacyScore: 6.5, strategyId: '5.9', rationale: 'Aimed at Nairobi and diaspora listeners, where most Kenyan podcast streaming happens.' },
  { id: 'political', name: 'Political Advertising (2027 General Election)', lowKsh: 2_000_000, highKsh: 10_000_000, pSuccess: null, monthsToFirstRevenue: 4, timeLabel: 'Campaign window 29 May–7 Aug 2027', activationCost: 'Low', difficulty: 'High', tier: 2, legacyScore: 6.2, strategyId: '5.21', rationale: 'Large episodic revenue with heavy compliance and reputational load; spending limits are stayed by the High Court.' },
  { id: 'agri', name: 'Agriculture Value-Chain Advertising', lowKsh: 500_000, highKsh: 2_000_000, pSuccess: null, monthsToFirstRevenue: 6, timeLabel: '6–12 months', activationCost: 'Medium', difficulty: 'Medium', tier: 2, legacyScore: 5.8, strategyId: '5.20', rationale: 'Agriculture & gardening equipment was a KES 494M radio sector in Apr–Jun 2026; Farm Radio International-style interactive formats are a partnership option.' },
  { id: 'syndication', name: 'Syndication & Content Licensing', lowKsh: 500_000, highKsh: 2_000_000, pSuccess: null, monthsToFirstRevenue: 12, timeLabel: '12–18 months', activationCost: 'Medium', difficulty: 'High', tier: 2, legacyScore: 5.2, strategyId: '5.16', rationale: 'Distribution of produced shows to community stations.' },
  { id: 'diaspora', name: 'Diaspora Engagement & Greetings', lowKsh: 500_000, highKsh: 2_000_000, pSuccess: null, monthsToFirstRevenue: 6, timeLabel: '6–12 months', activationCost: 'Medium', difficulty: 'High', tier: 2, legacyScore: 5.0, strategyId: '5.17', rationale: 'Lead with the US (43.5% of remittance inflows), the Gulf and Nairobi rather than the UK.' },
  { id: 'merch', name: 'Merchandise Catalogue (12 SKUs)', lowKsh: 200_000, highKsh: 500_000, pSuccess: null, monthsToFirstRevenue: 3, timeLabel: '3–6 months', activationCost: 'Low–Medium', difficulty: 'Low', tier: 2, legacyScore: 4.8, strategyId: '5.15', rationale: 'Net figures; print-on-demand limits inventory risk.' },
  { id: 'events', name: 'Live Events Ticketing', lowKsh: 500_000, highKsh: 3_000_000, pSuccess: null, monthsToFirstRevenue: 6, timeLabel: '6–12 months', activationCost: 'High', difficulty: 'High', tier: 2, legacyScore: 4.5, rationale: 'Volatile logistics and security exposure; annual tentpoles only.' },
]

export const leverMidpoint = (l: Lever) => (l.lowKsh + l.highKsh) / 2
