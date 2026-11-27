import { useCallback, useRef } from 'react'
import { useMotionAllowed } from './useMotionAllowed'
import { useScrollProgress } from './useScrollProgress'

/**
 * Words inside the element marked `.hl-word` turn from grey to full colour as
 * the element scrolls through the viewport. Writes to the DOM directly so it
 * never re-renders React.
 */
export function useWordHighlight<T extends HTMLElement>() {
  const allowed = useMotionAllowed()
  const words = useRef<HTMLElement[] | null>(null)
  const lastOn = useRef(-1)

  const onProgress = useCallback((p: number) => {
    const host = ref.current
    if (!host) return
    if (!words.current) words.current = Array.from(host.querySelectorAll<HTMLElement>('.hl-word'))
    const list = words.current
    const on = Math.round(p * list.length)
    if (on === lastOn.current) return
    lastOn.current = on
    list.forEach((w, i) => (w.dataset.on = i < on ? 'true' : 'false'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ref = useScrollProgress<T>(onProgress, { start: 0.85, end: 0.45, enabled: allowed })
  return ref
}
