import type { Tier } from './types.ts'

/**
 * The single rate card. Prices are the station's indicative list prices (Tier 2) until
 * a dated, published rate card exists. Totals are always computed, never typed in.
 * Source: data/Touchpoint_Ecosystem-8638d7.docx (its YouTube subtotal of 95,000 is an
 * arithmetic error; the items sum to 97,000 and the true total is 230,000).
 */
export type Touchpoint = { name: string; price: number }
export type TouchpointGroup = { id: string; platform: string; subtitle: string; touchpoints: Touchpoint[] }

export const RATE_CARD_TIER: Tier = 2
export const RATE_CARD_VALID_UNTIL = 'TODO_OWNER'

export const touchpointGroups: readonly TouchpointGroup[] = [
  {
    id: 'youtube',
    platform: 'YouTube',
    subtitle: 'Long-form video, livestreams & searchable archive',
    touchpoints: [
      { name: 'Video intro logo animation (5–10 sec)', price: 12000 },
      { name: 'Persistent lower-third logo', price: 12000 },
      { name: 'Top banner overlay', price: 8000 },
      { name: 'Mid-roll brand segment (30–60 sec)', price: 15000 },
      { name: 'Product placement — DJ booth', price: 6000 },
      { name: 'Product placement — bar/lounge', price: 6000 },
      { name: 'Branded venue elements', price: 5500 },
      { name: 'Equipment branding coverage', price: 4000 },
      { name: 'Apparel / merchandise placement', price: 4500 },
      { name: 'Crowd interaction shots', price: 5000 },
      { name: 'End credits sponsorship', price: 6000 },
      { name: 'Video title brand mention', price: 3000 },
      { name: 'Thumbnail branding', price: 4000 },
      { name: 'Pinned comment', price: 2000 },
      { name: 'Description top placement', price: 4000 },
    ],
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    subtitle: 'Visual discovery, Reels, Stories & product features',
    touchpoints: [
      { name: 'Feed post — brand tag', price: 3000 },
      { name: 'Feed post — product feature', price: 4500 },
      { name: 'Story — brand mention', price: 2000 },
      { name: 'Story — product feature', price: 3000 },
      { name: 'Story — swipe-up link', price: 2500 },
      { name: 'Reel — logo watermark', price: 4000 },
      { name: 'Reel — product placement', price: 5000 },
      { name: 'Reel — brand sound / audio', price: 3500 },
      { name: 'Live — brand shoutout', price: 2500 },
      { name: 'Carousel — dedicated slide', price: 3500 },
    ],
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    subtitle: 'Short-form cultural discovery & participatory formats',
    touchpoints: [
      { name: 'Video — brand tag', price: 2500 },
      { name: 'Video — logo watermark', price: 2500 },
      { name: 'Video — product feature', price: 4000 },
      { name: 'Duet / stitch feature', price: 3000 },
      { name: 'Live — brand mention', price: 2000 },
      { name: 'Hashtag challenge', price: 6000 },
      { name: 'Pinned comment', price: 1500 },
      { name: 'Temporary bio link', price: 2500 },
    ],
  },
  {
    id: 'multi',
    platform: 'Multi-platform & exclusive',
    subtitle: 'X, Facebook, conversion links and premium content',
    touchpoints: [
      { name: 'X — tweet brand tag', price: 1500 },
      { name: 'X — tweet product photo', price: 2500 },
      { name: 'X — thread brand feature', price: 3000 },
      { name: 'X — quote tweet', price: 1500 },
      { name: 'X — retweet brand mention', price: 1500 },
      { name: 'X — pinned tweet (1 week)', price: 3500 },
      { name: 'Facebook — post brand tag', price: 1500 },
      { name: 'Facebook — post product feature', price: 2500 },
      { name: 'Facebook — story brand mention', price: 1500 },
      { name: 'Facebook — video logo watermark', price: 2000 },
      { name: 'Facebook — event sponsor listing', price: 3000 },
      { name: 'Facebook — live brand shoutout', price: 2000 },
      { name: 'Promo code integration', price: 2500 },
      { name: 'Affiliate link', price: 3000 },
      { name: 'Hashtag campaign', price: 4000 },
      { name: 'Exclusive — dedicated social video', price: 25000 },
      { name: 'Exclusive — behind-the-scenes content', price: 15000 },
    ],
  },
]

export const groupTotal = (g: TouchpointGroup) => g.touchpoints.reduce((sum, t) => sum + t.price, 0)
export const touchpointCount = touchpointGroups.reduce((n, g) => n + g.touchpoints.length, 0)
export const touchpointTotal = touchpointGroups.reduce((sum, g) => sum + groupTotal(g), 0)

/**
 * Spot airtime dayparts (30-second spot). Illustrative Tier 2 prices used by the media-plan
 * preview until the station publishes a rate card with a validity date.
*/
export const spotDayparts = [
  { id: 'breakfast', label: 'Breakfast', hours: '06:00–10:00', rate: 2800 },
  { id: 'midday', label: 'Midday market', hours: '10:00–14:00', rate: 1800 },
  { id: 'drive', label: 'Drive time', hours: '16:00–19:00', rate: 2500 },
  { id: 'evening', label: 'Evening', hours: '19:00–22:00', rate: 1200 },
  { id: 'ros', label: 'Run of station', hours: 'Any', rate: 2100 },
] as const

/** One outside-broadcast unit-economics record used everywhere (Tier 0 until quoted). */
export const obEconomics = {
  revenuePerActivation: { low: 160_000, high: 380_000 },
  costPerActivation: { low: 250_000, high: 400_000 },
  tier: 0 as Tier,
  note: 'Revenue range from the OB explorer and cost range from Strategy 5.11; both unvalidated. Get three vehicle/conversion quotes and pilot one activation.',
} as const

/** Add-ons for the media-plan preview (illustrative list prices, Tier 2). */
export const quoteAddOns = {
  obDay: { label: 'Outside-broadcast day (one market activation)', price: 180_000 },
  whatsappPush: { label: 'WhatsApp push to opted-in contacts (per fortnight, once the base exists)', price: 35_000 },
} as const

/** One volume-discount ladder, applied to airtime only (station policy, to confirm). */
export const volumeDiscounts: readonly { minWeeks: number; rate: number }[] = [
  { minWeeks: 8, rate: 0.2 },
  { minWeeks: 4, rate: 0.15 },
  { minWeeks: 2, rate: 0.05 },
  { minWeeks: 0, rate: 0 },
]

export const discountForWeeks = (weeks: number) => volumeDiscounts.find((d) => weeks >= d.minWeeks)!.rate

/** Kenya standard VAT rate, applied when the client is VAT-registered or the quote is to a business. */
export const VAT_RATE = 0.16

/** Pure quote calculation, shared by the preview and its tests. */
export function quote(opts: { daypartId: string; spotsPerDay: number; weeks: number; obDays: number; whatsappPush: boolean; vat: boolean }) {
  const dp = spotDayparts.find((d) => d.id === opts.daypartId) ?? spotDayparts[0]
  const spots = opts.spotsPerDay * 7 * opts.weeks
  const airtime = spots * dp.rate
  const discountRate = discountForWeeks(opts.weeks)
  const discount = Math.round(airtime * discountRate)
  const ob = opts.obDays * quoteAddOns.obDay.price
  const whatsapp = opts.whatsappPush ? Math.ceil(opts.weeks / 2) * quoteAddOns.whatsappPush.price : 0
  const subtotal = airtime - discount + ob + whatsapp
  const vat = opts.vat ? Math.round(subtotal * VAT_RATE) : 0
  return { daypart: dp, spots, airtime, discountRate, discount, ob, whatsapp, subtotal, vat, total: subtotal + vat }
}
