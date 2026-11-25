/**
 * Lite mode: `data-lite="true"` on <html> turns off animation, waveforms and video.
 * On automatically for Data Saver or low-core devices; the viewer can override it.
 */
const KEY = 'nyota-lite'

export function autoLite(): boolean {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
  return Boolean(nav.connection?.saveData) || (navigator.hardwareConcurrency ?? 8) <= 4
}

export function initLite(): boolean {
  let pref: string | null = null
  try {
    pref = localStorage.getItem(KEY)
  } catch {
    /* storage may be blocked */
  }
  const on = pref == null ? autoLite() : pref === 'on'
  document.documentElement.dataset.lite = String(on)
  return on
}

export function setLite(on: boolean) {
  document.documentElement.dataset.lite = String(on)
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    /* ignore */
  }
}
