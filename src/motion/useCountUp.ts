import { useEffect, useRef } from 'react'
import { duration } from './easings'
import { useMotionAllowed } from './useMotionAllowed'

const outExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t))

/**
 * Counts the leading number in an element's text up from zero once, when it
 * enters view. The final text is always what React rendered, so screen readers,
 * prerendered HTML and print show the real value.
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
    let frame = 0
    let timer = 0
    el.setAttribute('aria-label', finalText)
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration.count)
        el.textContent = before + (target * outExpo(t)).toFixed(decimals) + after
        if (t < 1) frame = requestAnimationFrame(tick)
        else el.textContent = finalText
      }
      frame = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      timer = window.setTimeout(run, delay)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
      el.textContent = finalText
    }
  }, [allowed, delay])

  return ref
}
