import { useEffect, useRef, useState } from 'react'
import { sectionById } from '../../content/sections'
import { useSettings } from '../../state/settings'
import { OnAirCard } from './OnAirCard'

/** One header: wordmark, live chapter indicator, Menu. Hides on scroll down. */
export function Header({ active }: { active: string | null }) {
  const { openOverlay, overlay } = useSettings()
  const [hidden, setHidden] = useState(false)
  const progress = useRef<HTMLDivElement>(null)
  const section = active ? sectionById(active) : undefined

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 240)
        lastY = y
      }
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
  }, [])

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-hairline/60 bg-ink/85 backdrop-blur-md" data-hidden={hidden && overlay !== 'menu' ? 'true' : 'false'}>
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        <a href="#top" className="flex min-h-11 items-center gap-2 font-wordmark text-[1.6rem] font-extrabold uppercase leading-none text-paper" aria-label="Nyota FM 107.3, back to top">
          Nyota <span className="text-brass">107.3</span>
        </a>
        <p className="m-0 hidden min-w-0 flex-1 truncate text-center text-small text-sage sm:block" aria-hidden="true">
          {section ? (
            <>
              {section.number && <span className="font-mono text-paper tabular">{section.number}</span>}
              {section.number && ' · '}
              {section.label}
            </>
          ) : (
            "Twang'aa Transformation · Board proposal"
          )}
        </p>
        <div className="flex items-center gap-2">
        <OnAirCard />
        <button
          type="button"
          onClick={() => openOverlay('menu')}
          aria-haspopup="dialog"
          aria-expanded={overlay === 'menu'}
          className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-sage-dim/50 py-1.5 pr-1.5 pl-5 text-body text-paper hover:border-paper"
        >
          Menu
          <span className="grid h-8 w-8 place-items-center rounded-full bg-paper text-ink" aria-hidden="true">
            <svg width="14" height="10" viewBox="0 0 14 10"><path d="M0 1h14M0 5h14M0 9h14" stroke="currentColor" strokeWidth="1.6" /></svg>
          </span>
        </button>
        </div>
      </div>
      <div className="h-px w-full bg-transparent">
        <div ref={progress} className="h-px w-full origin-left bg-brass" style={{ transform: 'scaleX(0)' }} />
      </div>
    </header>
  )
}
