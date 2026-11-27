import { useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/** B9 · Back-to-top button with a reading-progress ring; appears after the hero. */
export function BackToTop() {
  const [show, setShow] = useState(false)
  const ring = useRef<SVGCircleElement>(null)
  const LEN = 2 * Math.PI * 20

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setShow(y > window.innerHeight * 1.5)
      if (ring.current) ring.current.style.strokeDashoffset = String(LEN * (1 - (max > 0 ? Math.min(1, y / max) : 0)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [LEN])

  return (
    <a
      href="#top"
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fx-ripple fx-scale no-print fixed right-4 bottom-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink-2/90 text-paper shadow-2xl backdrop-blur-md transition-[opacity,translate] duration-500 sm:right-6 sm:bottom-6 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="none" className="stroke-hairline" strokeWidth="2" />
        <circle ref={ring} cx="24" cy="24" r="20" fill="none" className="stroke-brass" strokeWidth="2" strokeLinecap="round" strokeDasharray={LEN} strokeDashoffset={LEN} />
      </svg>
      <ArrowUp size={18} aria-hidden="true" />
    </a>
  )
}
