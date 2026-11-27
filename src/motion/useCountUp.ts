import { useEffect, useRef } from 'react'
import { animate } from 'animejs/animation'
import { duration } from './easings'
import { useMotionAllowed } from './useMotionAllowed'

/**
 * Counts the leading number in an element's text up from zero once, when it
 * enters view. The final text is always what React rendered, so screen readers
 * and no-JS print show the real value.
 */
export function useCountUp<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null)
  const allowed = useMotionAllowed()

  useEffect(() => {
    const el = ref.current
    if (!el || !allowed) return
    const finalText = el.textContent ?? ''
    const match = finalText.match(/(\d[\d,]*\.?\d*)/)
    if (!match || match.index === undefined) return
    const target = Number(match[1].replace(/,/g, ''))
    const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0
    const before = finalText.slice(0, match.index)
    const after = finalText.slice(match.index + match[1].length)
    const state = { v: 0 }
    let anim: ReturnType<typeof animate> | undefined
    el.setAttribute('aria-label', finalText)
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      anim = animate(state, {
        v: target,
        duration: duration.count,
        delay,
        ease: 'outExpo',
        onUpdate: () => {
          el.textContent = before + state.v.toFixed(decimals) + after
        },
        onComplete: () => {
          el.textContent = finalText
        },
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => {
      io.disconnect()
      anim?.revert()
      el.textContent = finalText
    }
  }, [allowed, delay])

  return ref
}
