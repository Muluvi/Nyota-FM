/**
 * Station identity and contact channels (see src/config.ts for the values).
 */
import { STREAM_URL_LOW, STREAM_URL_HIGH, SALES_EMAIL, SALES_WHATSAPP, SALES_PHONE } from '../config'

export const station = {
  name: 'Nyota FM 107.3',
  legalName: 'Nyota Frequency Modulation Limited',
  frequency: '107.3 FM',
  hq: 'Bungoma',
  /** Live stream: low-bitrate by default (data saver); empty = "Stream link pending". */
  streamUrl: STREAM_URL_LOW,
  streamUrlHigh: STREAM_URL_HIGH,
  salesEmail: SALES_EMAIL,
  salesPhone: SALES_PHONE,
  salesWhatsApp: SALES_WHATSAPP,
} as const

/**
 * Planning convention: every milestone is expressed relative to Month 0,
 * the month the board approves the proposal. Assumed Month 0 = January 2027.
 */
export const monthZero = { label: 'Month 0', assumed: 'January 2027 (Q1 2027)' } as const
