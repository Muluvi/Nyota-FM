import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { chapters } from '../../content/chapters'
import { inShort, hero } from '../../content/chapters/intro'
import { asks } from '../../content/data/asks'
import { sections } from '../../content/sections'
import { useFocusTrap } from '../../lib/useFocusTrap'
import { useSettings } from '../../state/settings'
import { Figure } from '../ui/Figure'
import { Rich } from '../ui/Rich'
import { accentText } from '../chapter/accent'

const slides = sections.filter((s) => s.kind !== 'reference')

function useElapsed(running: boolean) {
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    if (!running) return
    setSecs(0)
    const t = window.setInterval(() => setSecs((s) => s + 1), 1000)
    return () => window.clearInterval(t)
  }, [running])
  return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`
}

/** One chapter per 16:9 screen for the boardroom TV. Arrow keys, large type, timer. */
export function PresentationMode() {
  const { overlay, closeOverlay } = useSettings()
  const open = overlay === 'presentation'
  const [i, setI] = useState(0)
  const panel = useRef<HTMLDivElement>(null)
  useFocusTrap(panel, open, closeOverlay)
  const elapsed = useElapsed(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        setI((n) => Math.min(slides.length - 1, n + 1))
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        setI((n) => Math.max(0, n - 1))
      }
    }
    document.addEventListener('keydown', onKey)
    document.documentElement.requestFullscreen?.().catch(() => undefined)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (document.fullscreenElement) document.exitFullscreen().catch(() => undefined)
    }
  }, [open])

  if (!open) return null
  const s = slides[i]
  const copy = chapters[s.id]

  return (
    <div ref={panel} role="dialog" aria-modal="true" aria-label="Presentation mode" className="fixed inset-0 z-[80] grid place-items-center bg-ink p-4">
      <div key={i} className="fx-tab-panel relative flex aspect-video w-full max-w-[min(100vw-2rem,calc((100vh-6rem)*16/9))] flex-col justify-between overflow-hidden rounded-md border border-hairline bg-ink-2 p-[4%]">
        <div aria-live="polite">
          <p className={`m-0 font-mono text-[clamp(1rem,1.6vw,1.5rem)] ${accentText[s.accent]}`}>
            {s.number} · {s.label}
          </p>
          <h2 className="mt-[2%] mb-0 max-w-[24ch] font-display text-[clamp(1.75rem,4.2vw,4.5rem)] font-normal leading-[1.05] text-paper">
            {s.id === 'in-short' ? <Rich text={inShort.recommendation} /> : <Rich text={s.actionTitle} />}
          </h2>
          {copy && <p className="mt-[2%] mb-0 max-w-[60ch] text-[clamp(1rem,1.7vw,1.6rem)] text-sage"><Rich text={copy.core} /></p>}
        </div>
        <ul className="m-0 grid list-none grid-cols-3 gap-[3%] p-0">
          {(s.id === 'in-short' ? inShort.stats.map((x) => ({ figure: x.figure, label: x.label })) : copy?.proof ?? []).slice(0, 3).map((p) => (
            <li key={p.figure} className="border-t border-hairline pt-[4%]">
              <span className="block font-display text-[clamp(1.5rem,3.4vw,3.5rem)] leading-none text-paper"><Figure id={p.figure} /></span>
              <span className="mt-2 block text-[clamp(0.85rem,1.2vw,1.15rem)] text-sage"><Rich text={p.label} /></span>
            </li>
          ))}
          {s.id === 'asks' && asks.slice(0, 6).map((a) => (
            <li key={a.id} className="border-t border-hairline pt-[3%] text-[clamp(0.85rem,1.3vw,1.25rem)] text-paper">
              <span className="font-mono text-brass">{a.id}</span> {a.title}
            </li>
          ))}
        </ul>
        {s.id === 'in-short' && <p className="sr-only">{hero.headline}</p>}
      </div>
      <div className="no-print fixed inset-x-0 bottom-0 flex items-center justify-between gap-4 px-4 py-3 text-small text-sage">
        <span className="font-mono tabular" aria-label="Elapsed time">{elapsed}</span>
        <span className="font-mono tabular">{i + 1} / {slides.length}</span>
        <span className="flex gap-2">
          <button type="button" onClick={() => setI((n) => Math.max(0, n - 1))} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-paper hover:border-paper"><ArrowLeft size={18} /></button>
          <button type="button" onClick={() => setI((n) => Math.min(slides.length - 1, n + 1))} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-paper hover:border-paper"><ArrowRight size={18} /></button>
          <button type="button" onClick={closeOverlay} aria-label="Exit presentation" className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-paper hover:border-paper"><X size={18} /></button>
        </span>
      </div>
    </div>
  )
}
