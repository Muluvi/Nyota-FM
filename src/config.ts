/**
 * Deployment configuration (decisions D2 and D4). Build-time VITE_* variables, if set,
 * override these defaults. Values marked TODO_OWNER must be supplied by the station.
 */
const env = import.meta.env

/** D2: live stream URLs. Empty = player shows "Stream link pending" and play is disabled. */
export const STREAM_URL_LOW = (env.VITE_STREAM_URL_LOW ?? env.VITE_STREAM_URL ?? '').trim() // TODO_OWNER (e.g. 32–64 kbps mount)
export const STREAM_URL_HIGH = (env.VITE_STREAM_URL_HIGH ?? '').trim() // TODO_OWNER (e.g. 128 kbps mount)

/** D4: sales contact channel. Forms open a pre-filled email or WhatsApp message (no backend). */
export const SALES_EMAIL = (env.VITE_SALES_EMAIL ?? 'fireflymanagement.ke@gmail.com').trim()
export const SALES_PHONE = '0726 766 800'
export const SALES_WHATSAPP = (env.VITE_SALES_WHATSAPP ?? '254726766800').replace(/\D/g, '')

/** Future form service endpoint. Empty until a service is chosen (TODO_OWNER). */
export const INQUIRY_ENDPOINT = (env.VITE_INQUIRY_ENDPOINT ?? '').trim()

/** Show illustrative listener voices (vox pops). Off until consented recordings exist. */
export const SHOW_ILLUSTRATIVE = false
