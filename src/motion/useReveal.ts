import { useEffect, useRef } from 'react'

/**
 * Marks an element (and any `.reveal` children) as revealed once its top edge
 * passes 85% of the viewport height (works for elements of any height). CSS owns the transition; reduced motion and Lite show final states.
 */
export function useReveal<T extends HTMLElement>(options: { stagger?: number } = {}) {
  const ref = useRef<T>(null)
  const { stagger = 80 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = [el, ...Array.from(el.querySelectorAll<HTMLElement>('.reveal, .reveal-x'))]
    targets.forEach((t, i) => {
      if (t !== el) t.style.setProperty('--reveal-delay', `${Math.min(i - 1, 8) * stagger}ms`)
    })
    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => (t.dataset.revealed = 'true'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            targets.forEach((t) => (t.dataset.revealed = 'true'))
            io.disconnect()
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -15% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [stagger])

  return ref
}
