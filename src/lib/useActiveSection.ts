import { useSyncExternalStore } from 'react'
import { sectionIds } from '../content/sections'

/**
 * One shared scroll store for the navbar, rail and dock: the active section (via
 * IntersectionObserver, no layout reads on scroll) and scroll progress (one passive,
 * rAF-throttled listener). Components subscribe instead of each adding listeners.
 */
type State = { active: string; progress: number; scrollY: number; dir: 'up' | 'down' }
let state: State = { active: 'overview', progress: 0, scrollY: 0, dir: 'up' }
const listeners = new Set<() => void>()
let started = false

const emit = (next: Partial<State>) => {
  const merged = { ...state, ...next }
  if (merged.active !== state.active) document.documentElement.dataset.activeChapter = merged.active
  if (merged.active === state.active && merged.dir === state.dir && Math.round(merged.progress) === Math.round(state.progress) && (merged.scrollY > 20) === (state.scrollY > 20) && (merged.scrollY > 400) === (state.scrollY > 400)) {
    state = merged
    return
  }
  state = merged
  listeners.forEach((l) => l())
}

function start() {
  if (started || typeof window === 'undefined') return
  started = true
  let ticking = false
  let lastY = window.scrollY
  let lastT = performance.now()
  let decay = 0
  const root = document.documentElement
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false
      const y = window.scrollY
      const t = performance.now()
      // Scroll velocity (px/ms ×10, clamped) feeds the ticker skew; it decays back to 0.
      const v = Math.max(-60, Math.min(60, ((y - lastY) / Math.max(1, t - lastT)) * 10))
      if (root.classList.contains('motion')) root.style.setProperty('--scroll-velocity', v.toFixed(1))
      window.clearTimeout(decay)
      decay = window.setTimeout(() => root.style.setProperty('--scroll-velocity', '0'), 120)
      const dir = Math.abs(y - lastY) < 4 ? state.dir : y > lastY ? 'down' : 'up'
      lastY = y
      lastT = t
      const max = root.scrollHeight - window.innerHeight
      emit({ progress: max > 0 ? (y / max) * 100 : 0, scrollY: y, dir })
    })
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  if (typeof IntersectionObserver === 'undefined') return
  const visible = new Map<string, boolean>()
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => visible.set(e.target.id, e.isIntersecting))
      // The active section is the last one (in page order) whose top band is on screen.
      const hit = sectionIds.filter((id) => visible.get(id))
      if (hit.length) emit({ active: hit[hit.length - 1] })
    },
    { rootMargin: '-120px 0px -60% 0px' },
  )
  const observe = () => sectionIds.forEach((id) => {
    const el = document.getElementById(id)
    if (el) io.observe(el)
  })
  observe()
  // Sections render after the first paint; observe again once the app has mounted.
  requestAnimationFrame(observe)
}

const subscribe = (cb: () => void) => {
  start()
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function useScrollState(): State {
  return useSyncExternalStore(subscribe, () => state, () => state)
}
