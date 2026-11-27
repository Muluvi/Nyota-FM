import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { resolveHash } from './content/sections'
import { SettingsProvider, useSettings } from './state/settings'
import { useActiveSection } from './motion/useActiveSection'
import { useMotionAllowed } from './motion/useMotionAllowed'
import { preloadAllDetail } from './components/chapter/detailLoaders'
import { Skeleton } from './components/chapter/DetailBlock'
import { Header } from './components/site/Header'
import { Hero } from './components/site/Hero'
import { InShort } from './components/site/InShort'
import { Footer } from './components/site/Footer'
import { MenuOverlay } from './components/site/MenuOverlay'
import { Toaster } from './components/site/Toaster'

const Appendix = lazy(() => import('./components/site/Appendix'))
const DecisionSheet = lazy(() => import('./components/site/DecisionSheet'))
const loadChapters = () => import('./components/site/Chapters')
const Chapters = lazy(loadChapters)
// Start fetching the chapters while the prerendered hero hydrates.
if (typeof window !== 'undefined') void loadChapters()
const SearchPanel = lazy(() => import('./components/site/SearchPanel').then((m) => ({ default: m.SearchPanel })))
const BriefingOverlay = lazy(() => import('./components/site/BriefingOverlay').then((m) => ({ default: m.BriefingOverlay })))
const PresentationMode = lazy(() => import('./components/site/PresentationMode').then((m) => ({ default: m.PresentationMode })))
const ToolSheetHost = lazy(() => import('./components/toolkit/ToolSheetHost').then((m) => ({ default: m.ToolSheetHost })))

const APPENDIX_HASH = /^#(appendix|toolkit|annex-|figure|glossary)/

/** Scroll to a hash target, waiting briefly for lazy content to mount. */
function scrollToHash(hash: string, tries = 40) {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  if (!id) return
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ block: 'start' })
    return
  }
  if (tries > 0) window.setTimeout(() => scrollToHash(hash, tries - 1), 75)
}

/** Appendix loads when the reader nears it, or straight away for a deep link into it. */
function DeferredAppendix() {
  const [show, setShow] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (show) return
    if (APPENDIX_HASH.test(window.location.hash)) {
      setShow(true)
      return
    }
    const onHash = () => APPENDIX_HASH.test(window.location.hash) && setShow(true)
    window.addEventListener('hashchange', onHash)
    const el = sentinel.current
    const io = el ? new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { rootMargin: '1200px 0px' }) : null
    if (el && io) io.observe(el)
    return () => {
      window.removeEventListener('hashchange', onHash)
      io?.disconnect()
    }
  }, [show])
  if (!show) return <div ref={sentinel} id="appendix" className="min-h-40" />
  return (
    <Suspense fallback={<div className="mx-auto max-w-[90rem] px-4 py-20 sm:px-8 lg:px-12"><Skeleton label="Loading the appendix" /></div>}>
      <Appendix />
    </Suspense>
  )
}

function useSmoothScroll() {
  const allowed = useMotionAllowed()
  useEffect(() => {
    if (!allowed || !window.matchMedia('(pointer: fine)').matches) return
    let destroyed = false
    let instance: { destroy: () => void } | null = null
    import('lenis').then(({ default: Lenis }) => {
      if (destroyed) return
      instance = new Lenis({ autoRaf: true, anchors: { offset: -72 }, lerp: 0.12 })
    })
    return () => {
      destroyed = true
      instance?.destroy()
    }
  }, [allowed])
}

const chaptersPlaceholder = (
  <div className="mx-auto min-h-[100vh] max-w-[90rem] px-4 py-20 sm:px-8 lg:px-12">
    <Skeleton label="Loading the chapters" />
  </div>
)

function Story() {
  // Lazy chapters mount after hydration so the prerendered HTML matches exactly.
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  const [chaptersReady, setChaptersReady] = useState(false)
  const onChaptersReady = useCallback(() => setChaptersReady(true), [])
  const active = useActiveSection(chaptersReady)
  const settings = useSettings()
  const { overlay, openOverlay, setExpandAll } = settings
  useSmoothScroll()

  // Deep links: resolve legacy ids (#part-3), open details, scroll after mount.
  useEffect(() => {
    const go = () => {
      const resolved = resolveHash(window.location.hash)
      if (resolved && window.location.hash !== `#${resolved.anchor}` && !window.location.hash.startsWith(`#${resolved.anchor}`)) {
        history.replaceState(null, '', `#${resolved.anchor}`)
        window.dispatchEvent(new Event('nyota:open-detail'))
      }
      if (window.location.hash) requestAnimationFrame(() => scrollToHash(window.location.hash))
    }
    go()
    window.addEventListener('hashchange', go)
    return () => window.removeEventListener('hashchange', go)
  }, [])

  // Keyboard shortcuts: ⌘K and / search, B briefing, P present.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes((document.activeElement?.tagName ?? '').toUpperCase())
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        openOverlay(overlay === 'search' ? null : 'search')
      } else if (!typing && !overlay && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key === '/') {
          e.preventDefault()
          openOverlay('search')
        } else if (e.key.toLowerCase() === 'b') openOverlay('briefing')
        else if (e.key.toLowerCase() === 'p') openOverlay('presentation')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [overlay, openOverlay])

  // Print: expand every chapter detail. Ctrl+P expands whatever is loaded.
  useEffect(() => {
    const before = () => flushSync(() => setExpandAll(true))
    const after = () => setExpandAll(false)
    window.addEventListener('beforeprint', before)
    window.addEventListener('afterprint', after)
    return () => {
      window.removeEventListener('beforeprint', before)
      window.removeEventListener('afterprint', after)
    }
  }, [setExpandAll])

  const printStory = useCallback(async () => {
    settings.notify('Preparing the full document…')
    await preloadAllDetail()
    flushSync(() => setExpandAll(true))
    await new Promise((r) => window.setTimeout(r, 600))
    window.print()
  }, [setExpandAll, settings])

  return (
    <>
      <a href="#main" className="skip-link sr-only-focusable fixed top-2 left-2 z-[100] rounded-full bg-brass px-5 py-3 text-ink">
        Skip to the story
      </a>
      <Header active={active} />
      <main id="main" tabIndex={-1} className="outline-none">
        <div id="top" />
        <Hero />
        <InShort />
        {hydrated ? (
          <Suspense fallback={chaptersPlaceholder}>
            <Chapters onReady={onChaptersReady} />
          </Suspense>
        ) : (
          chaptersPlaceholder
        )}
        <DeferredAppendix />
      </main>
      <Footer />
      <MenuOverlay active={active} onPrint={printStory} />
      <Suspense fallback={null}>
        {overlay === 'search' && <SearchPanel />}
        {overlay === 'briefing' && <BriefingOverlay />}
        {overlay === 'presentation' && <PresentationMode />}
        {settings.sheet && <ToolSheetHost />}
      </Suspense>
      <Toaster />
    </>
  )
}

export default function App() {
  const view = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('view')
  return (
    <SettingsProvider>
      {view === 'decision-sheet' ? (
        <Suspense fallback={null}>
          <DecisionSheet />
        </Suspense>
      ) : (
        <Story />
      )}
    </SettingsProvider>
  )
}
