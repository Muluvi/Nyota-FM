import { useEffect, useRef, useState } from 'react'
import { useMotionAllowed } from '../../motion/useMotionAllowed'
import { useSettings } from '../../state/settings'

const GLYPHS = '0123456789#%/*+=<>'

/**
 * E. Text scramble: characters cycle through random glyphs before settling,
 * each time the text scrolls into view. Screen readers get the real text only.
 */
export function Scramble({ text, className = '' }: { text: string; className?: string }) {
  const allowed = useMotionAllowed()
  const { motion } = useSettings()
  const [out, setOut] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !allowed || motion === 'calm') {
      setOut(text)
      return
    }
    let frame = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = (now - start) / 700
        setOut(
          text
            .split('')
            .map((ch, i) => (t > (i + 1) / (text.length + 1) || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(''),
        )
        if (t < 1) frame = requestAnimationFrame(tick)
        else setOut(text)
      }
      frame = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && run(), { threshold: 0.6 })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [allowed, motion, text])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  )
}
