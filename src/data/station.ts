/**
 * Station configuration. Values that must come from the station (stream URL,
 * sales contacts) are read from build-time environment variables so the site
 * never ships a guessed URL or phone number. See `.env.example`.
 */
const env = import.meta.env

export const station = {
  name: 'Nyota FM 107.3',
  legalName: 'Nyota Frequency Modulation Limited',
  frequency: '107.3 FM',
  hq: 'Bungoma',
  /** Direct audio stream (e.g. a Zeno.FM mount). Empty = player shows "not configured". */
  streamUrl: (env.VITE_STREAM_URL ?? '').trim(),
  /** Sales desk email for inquiries. */
  salesEmail: (env.VITE_SALES_EMAIL ?? '').trim(),
  /** Sales WhatsApp number in international format, digits only (e.g. 2547XXXXXXXX). */
  salesWhatsApp: (env.VITE_SALES_WHATSAPP ?? '').replace(/\D/g, ''),
} as const

/**
 * Planning convention: every milestone is expressed relative to Month 0,
 * the month the board approves the proposal. Assumed Month 0 = January 2027.
 */
export const monthZero = { label: 'Month 0', assumed: 'January 2027 (Q1 2027)' } as const

/** IEBC 2027 general-election calendar (Business Today / Citizen Digital, accessed 25 Nov 2026). */
export const electionCalendar = {
  primariesBy: '8 May 2027',
  campaignStart: '29 May 2027',
  campaignEnd: '7 Aug 2027',
  electionDay: '10 Aug 2027',
} as const
