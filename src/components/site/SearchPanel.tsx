import { useEffect, useMemo, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { chapters } from '../../content/chapters'
import { figureList } from '../../content/figures'
import { glossary } from '../../content/glossary'
import { sections } from '../../content/sections'
import { renderPlain } from '../../lib/richText'
import { useFocusTrap } from '../../lib/useFocusTrap'
import { useSettings } from '../../state/settings'
import { tools } from '../toolkit/registry'
import { playSound } from '../../fx/useFxLayer'

interface Entry {
  kind: 'Chapter' | 'Figure' | 'Glossary' | 'Tool'
  title: string
  detail: string
  go: () => void
}

/** Find the first chapter whose copy uses a figure token. */
function chapterForFigure(id: string): string {
  const token = `{f:${id}}`
  for (const c of Object.values(chapters)) {
    if (JSON.stringify(c).includes(token) || c.proof.some((p) => p.figure === id)) return c.id
  }
  return 'appendix'
}

/** Search across labels, action titles, figures, glossary terms and tool names. */
export function SearchPanel() {
  const { overlay, closeOverlay, openSheet } = useSettings()
  const [q, setQ] = useState('')
  const [typing, setTyping] = useState(false)
  const [shake, setShake] = useState(false)
  const typingTimer = useRef(0)
  const panel = useRef<HTMLDivElement>(null)
  useFocusTrap(panel, overlay === 'search', closeOverlay)

  const index = useMemo<Entry[]>(() => {
    const goHash = (hash: string) => () => {
      closeOverlay()
      window.location.hash = hash
    }
    return [
      ...sections.map((s) => ({ kind: 'Chapter' as const, title: `${s.number ? `${s.number} ` : ''}${s.label}`, detail: renderPlain(s.actionTitle), go: goHash(s.id) })),
      ...figureList.map((f) => ({ kind: 'Figure' as const, title: f.display, detail: f.note, go: goHash(chapterForFigure(f.id) === 'appendix' ? `figure-${f.id}` : chapterForFigure(f.id)) })),
      ...Object.entries(glossary).map(([k, g]) => ({ kind: 'Glossary' as const, title: g.term, detail: g.definition, go: goHash(`glossary-${k}`) })),
      ...tools.map((t) => ({ kind: 'Tool' as const, title: t.name, detail: t.answers, go: () => { closeOverlay(); openSheet(t.id) } })),
    ]
  }, [closeOverlay, openSheet])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return index.filter((e) => e.kind === 'Chapter')
    return index.filter((e) => `${e.title} ${e.detail}`.toLowerCase().includes(term)).slice(0, 30)
  }, [q, index])

  // G. Error shake + sound when a finished query finds nothing.
  useEffect(() => {
    if (typing || !q.trim() || results.length) return
    setShake(true)
    playSound('error')
  }, [typing, q, results.length])

  const onType = (value: string) => {
    setQ(value)
    setTyping(true)
    window.clearTimeout(typingTimer.current)
    typingTimer.current = window.setTimeout(() => setTyping(false), 350)
  }

  if (overlay !== 'search') return null
  return (
    <div className="fx-modal-backdrop fixed inset-0 z-[70] flex items-start justify-center bg-ink/80 p-4 pt-[10vh] backdrop-blur-sm" onClick={closeOverlay}>
      <div ref={panel} role="dialog" aria-modal="true" aria-label="Search" onClick={(e) => e.stopPropagation()} className={`fx-modal w-full max-w-2xl overflow-hidden rounded-md border border-hairline bg-ink ${shake ? 'fx-shake' : ''}`} onAnimationEnd={() => setShake(false)}>
        <div className="flex items-center gap-3 border-b border-hairline px-5">
          <Search size={18} className="text-sage" aria-hidden="true" />
          <div className="relative flex-1 pt-3">
            {/* E27 · Floating label: rises and shrinks on focus or when filled */}
            <input
              id="site-search"
              type="search"
              value={q}
              onChange={(e) => onType(e.target.value)}
              placeholder=" "
              className="fx-input peer min-h-12 w-full rounded-md bg-transparent px-2 text-body text-paper"
            />
            <label
              htmlFor="site-search"
              className="pointer-events-none absolute top-1/2 left-2 origin-left -translate-y-1/3 text-body text-sage-dim transition-all duration-300 peer-focus:top-2 peer-focus:scale-75 peer-focus:text-brass peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75"
            >
              Search chapters, figures, terms, tools
            </label>
          </div>
          {typing && (
            <span className="fx-typing text-sage" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          )}
          <kbd className="hidden font-mono text-xs text-sage-dim sm:block">Esc</kbd>
        </div>
        <ul className="m-0 max-h-[60vh] list-none overflow-y-auto p-2" aria-live="polite">
          {results.length === 0 && <li className="p-4 text-small text-sage">No matches. Try “capex”, “USSD” or “Bungoma”.</li>}
          {results.map((r, i) => (
            <li key={`${q}-${r.kind}-${r.title}-${i}`} className="fx-fade-seq-item" style={{ animationDelay: `${Math.min(i, 10) * 30}ms` }}>
              <button type="button" onClick={r.go} className="fx-bgslide fx-ripple grid w-full grid-cols-[5.5rem_1fr] gap-3 rounded-md px-3 py-3 text-left hover:bg-ink-2 focus-visible:bg-ink-2">
                <span className="font-mono text-xs text-sage-dim">{r.kind}</span>
                <span>
                  <span className="block text-body text-paper">{r.title}</span>
                  <span className="line-clamp-2 block text-small text-sage">{r.detail}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
