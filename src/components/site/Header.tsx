import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { sectionById } from '../../content/sections'
import { useSettings } from '../../state/settings'
import { accentBg } from '../chapter/accent'
import { OnAirCard } from './OnAirCard'

/**
 * One header: wordmark, live chapter indicator, search, ON AIR, Menu.
 * Transparent over the hero, frosted once scrolled (B10); hides on scroll down;
 * the reading-progress line takes the active chapter's accent (colour shift).
 */
export function Header({ active }: { active: string | null }) {
  const { openOverlay, overlay } = useSettings()
  const [hidden, setHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [logoAnim, setLogoAnim] = useState(false)
  const [menuAnim, setMenuAnim] = useState(false)
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
      setAtTop(y < window.innerHeight * 0.6)
      const delta = y - lastY
      if (Math.abs(delta) > window.innerHeight) {
        // A jump (deep link, menu, anchor) keeps the header visible.
        setHidden(false)
        lastY = y
      } else if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 240)
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
    <header
      className="site-header fixed inset-x-0 top-0 z-50 border-b border-hairline/60 bg-ink/85 backdrop-blur-md transition-[background-color,border-color] duration-500"
      data-hidden={hidden && overlay !== 'menu' ? 'true' : 'false'}
      data-top={atTop && !overlay ? 'true' : 'false'}
    >
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          onClick={() => setLogoAnim(true)}
          onAnimationEnd={() => setLogoAnim(false)}
          className={`fx-tracking flex min-h-11 items-center gap-2.5 whitespace-nowrap font-wordmark text-[1.2rem] uppercase leading-none text-paper sm:text-[1.45rem] ${logoAnim ? 'fx-rubber' : ''}`}
          aria-label="Nyota FM 107.3, back to top"
        >
          <img src="/brand/nyota-star-128.webp" srcSet="/brand/nyota-star-128.webp 128w, /brand/nyota-star-256.webp 256w" sizes="2.5rem" width={128} height={128} alt="" aria-hidden="true" decoding="async" className="brand-mark h-10 w-10 shrink-0" draggable={false} />
          <span>
            Nyota <span className="text-brass">107.3</span>
          </span>
        </a>
        <p className="m-0 hidden min-w-0 flex-1 truncate text-center text-small text-sage sm:block" aria-hidden="true">
          <span key={section?.id ?? 'none'} className="fx-lightspeed inline-block">
            {section ? (
              <>
                {section.number && <span className="font-mono text-paper tabular">{section.number}</span>}
                {section.number && ' · '}
                {section.label}
              </>
            ) : (
              "Twang'aa Transformation · Board proposal"
            )}
          </span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openOverlay('search')}
            aria-label="Search the proposal"
            className="group fx-ripple hidden min-h-11 items-center gap-0 overflow-hidden rounded-full border border-hairline px-3 text-small text-paper transition-[gap,padding,border-color] duration-500 hover:gap-2 hover:border-paper hover:px-4 focus-visible:gap-2 focus-visible:px-4 md:inline-flex"
          >
            <Search size={16} aria-hidden="true" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sage transition-[max-width] duration-500 group-hover:max-w-40 group-focus-visible:max-w-40">
              Search <kbd className="font-mono text-xs">⌘K</kbd>
            </span>
          </button>
          <OnAirCard />
          <button
            type="button"
            onClick={() => {
              setMenuAnim(true)
              openOverlay('menu')
            }}
            onAnimationEnd={() => setMenuAnim(false)}
            aria-haspopup="dialog"
            aria-expanded={overlay === 'menu'}
            className={`fx-ripple fx-magnetic group inline-flex min-h-11 items-center gap-3 rounded-full border border-sage-dim/50 py-1.5 pr-1.5 pl-5 text-body text-paper hover:border-paper ${menuAnim ? 'fx-jello' : ''}`}
          >
            Menu
            <span className="fx-icon-spin grid h-8 w-8 place-items-center rounded-full bg-paper text-ink" aria-hidden="true">
              <svg width="14" height="10" viewBox="0 0 14 10"><path d="M0 1h14M0 5h14M0 9h14" stroke="currentColor" strokeWidth="1.6" /></svg>
            </span>
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-transparent">
        <div ref={progress} className={`h-[2px] w-full origin-left transition-colors duration-700 ${section ? accentBg[section.accent] : 'bg-brass'}`} style={{ transform: 'scaleX(0)' }} />
      </div>
      {/* Extra mobile bottom gold progress */}
      <div className="mobile-progress sm:hidden" aria-hidden="true">
        <span style={{ transform: 'scaleX(0)' }} />
      </div>
    </header>
  )
}
