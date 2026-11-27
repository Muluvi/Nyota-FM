import { useEffect, useRef } from 'react'
import { useMotionAllowed } from './useMotionAllowed'

/**
 * Stacking cards: each `.stack-card` is CSS-sticky (≥768px). As the next card
 * slides over it, the covered card scales down slightly to show depth.
 * Below 768px, under reduced motion or in Lite mode, cards stack normally.
 */
export function useStickyStack<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const allowed = useMotionAllowed()

  useEffect(() => {
    const host = ref.current
    if (!host || !allowed || !window.matchMedia('(min-width: 768px)').matches) return
    const cards = Array.from(host.querySelectorAll<HTMLElement>('.stack-card'))
    let frame = 0
    const update = () => {
      frame = 0
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        const a = card.getBoundingClientRect()
        const b = next.getBoundingClientRect()
        const overlap = Math.min(1, Math.max(0, (a.bottom - b.top) / a.height))
        const inner = card.firstElementChild as HTMLElement | null
        if (inner) {
          inner.style.transform = `scale(${1 - overlap * 0.04})`
          inner.style.opacity = `${1 - overlap * 0.35}`
        }
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [allowed])

  return ref
}
