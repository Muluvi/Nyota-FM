import { useEffect, useRef, useState } from 'react'
import { sections } from '../content/sections'
import { renderPlain } from '../lib/richText'
import { STATION } from '../content/meta'

const BASE_TITLE = `${STATION} · Twang'aa Transformation v2.0`
const BASE_DESCRIPTION =
  'A board-ready proposal to make Nyota FM 107.3 the cultural and commercial anchor of Western Kenya, 2026–2028.'

/**
 * Tracks the section crossing the upper third of the viewport. Updates the URL
 * hash (replaceState, no history spam), document title and meta description.
 */
export function useActiveSection(ready = true): string | null {
  const [active, setActive] = useState<string | null>(null)
  const hadActive = useRef(false)

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return
    const visible = new Map<string, number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top)
          else visible.delete(e.target.id)
        }
        let best: string | null = null
        let bestTop = -Infinity
        for (const [id, top] of visible) {
          if (top <= window.innerHeight * 0.4 && top > bestTop) {
            best = id
            bestTop = top
          }
        }
        setActive(best)
      },
      { rootMargin: '0px 0px -60% 0px', threshold: [0, 0.01] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ready])

  useEffect(() => {
    const section = sections.find((s) => s.id === active)
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (section) {
      hadActive.current = true
      document.title = `${section.number ? `${section.number} · ` : ''}${section.label} · ${STATION}`
      meta?.setAttribute('content', renderPlain(section.actionTitle))
      const current = window.location.hash.replace('#', '')
      if (!current.startsWith(section.id)) {
        history.replaceState(null, '', `#${section.id}`)
      }
    } else {
      document.title = BASE_TITLE
      meta?.setAttribute('content', BASE_DESCRIPTION)
      // Only clear the hash once the reader has scrolled back to the hero, never on load.
      if (hadActive.current && window.location.hash && window.scrollY < 50) history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [active])

  return active
}
