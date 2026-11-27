import { useEffect, useRef } from 'react'

/**
 * Calls `onProgress(p)` with 0→1 as the element travels from `start` to `end`
 * of the viewport (fractions of viewport height from the top). rAF-throttled,
 * passive, and paused while the element is off-screen.
 */
export function useScrollProgress<T extends HTMLElement>(
  onProgress: (p: number) => void,
  { start = 0.9, end = 0.35, enabled = true }: { start?: number; end?: number; enabled?: boolean } = {},
) {
  const ref = useRef<T>(null)
  const cb = useRef(onProgress)
  cb.current = onProgress

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!enabled) {
      cb.current(1)
      return
    }
    let frame = 0
    let visible = false
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const from = vh * start
      const to = vh * end - rect.height * 0.5
      const p = (from - rect.top) / Math.max(1, from - to)
      cb.current(Math.min(1, Math.max(0, p)))
    }
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update)
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) update()
    }, { rootMargin: '20% 0px' })
    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [start, end, enabled])

  return ref
}
