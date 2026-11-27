import { useEffect, useRef, useState } from 'react'
import { useMotionAllowed } from '../../motion/useMotionAllowed'
import { useSettings } from '../../state/settings'

/**
 * E. Typewriter: the full text is in the HTML (prerender, screen readers);
 * after hydration it is retyped character by character with a caret.
 */
export function Typewriter({ text, delay = 900, speed = 38, className = '' }: { text: string; delay?: number; speed?: number; className?: string }) {
  const allowed = useMotionAllowed()
  const { motion } = useSettings()
  const [shown, setShown] = useState(text.length)
  const [typing, setTyping] = useState(false)
  const timer = useRef(0)

  useEffect(() => {
    if (!allowed || motion === 'calm') {
      setShown(text.length)
      return
    }
    setShown(0)
    setTyping(true)
    let i = 0
    const step = () => {
      i += 1
      setShown(i)
      if (i < text.length) timer.current = window.setTimeout(step, speed + Math.random() * 30)
      else timer.current = window.setTimeout(() => setTyping(false), 1600)
    }
    timer.current = window.setTimeout(step, delay)
    return () => window.clearTimeout(timer.current)
  }, [allowed, motion, text, delay, speed])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={typing ? 'fx-caret' : ''}>
        {text.slice(0, shown)}
      </span>
    </span>
  )
}
