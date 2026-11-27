import { useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { chapterSections, sections } from '../../content/sections'
import { renderPlain } from '../../lib/richText'
import { useFocusTrap } from '../../lib/useFocusTrap'
import { useSettings } from '../../state/settings'
import { accentBg } from '../chapter/accent'

interface MenuOverlayProps {
  active: string | null
  onPrint: () => void
}

/** Full-screen menu: numbered chapters with action titles (K3, O12) and tools. */
export function MenuOverlay({ active, onPrint }: MenuOverlayProps) {
  const { overlay, closeOverlay, openOverlay, lite, setLite, notify, readChapters, theme, setTheme, accent, setAccent, motion, setMotion, sound, setSound } = useSettings()
  const open = overlay === 'menu'
  const panel = useRef<HTMLDivElement>(null)
  useFocusTrap(panel, open, closeOverlay)

  const story = sections.filter((s) => s.kind !== 'reference')
  const read = chapterSections.filter((s) => readChapters.has(s.id)).length + (readChapters.has('asks') ? 1 : 0) + (readChapters.has('in-short') ? 1 : 0)
  const totalMinutes = Math.round(story.reduce((n, s) => n + s.readMinutes, 0))

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      notify('Link copied')
    } catch {
      notify('Copy failed. The link is in the address bar.')
    }
  }

  const tools: { label: string; hint?: string; onClick: () => void; pressed?: boolean }[] = [
    { label: 'Search', hint: '⌘K', onClick: () => openOverlay('search') },
    { label: 'Briefing', hint: 'B', onClick: () => openOverlay('briefing') },
    { label: 'Present', hint: 'P', onClick: () => openOverlay('presentation') },
    { label: 'Print / PDF', onClick: () => { closeOverlay(); onPrint() } },
    { label: 'Copy link', onClick: copyLink },
  ]

  // J. Smooth theme switch: colours cross-fade for 450ms only during the change.
  const switchTheme = () => {
    const root = document.documentElement
    root.classList.add('theme-switching')
    setTheme(theme === 'dark' ? 'light' : 'dark')
    window.setTimeout(() => root.classList.remove('theme-switching'), 450)
  }

  const switches: { label: string; on: boolean; onClick: () => void; hint: string }[] = [
    { label: 'Light mode', on: theme === 'light', onClick: switchTheme, hint: 'Paper background for daylight and print-like reading' },
    { label: 'Calm motion', on: motion === 'calm', onClick: () => setMotion(motion === 'calm' ? 'full' : 'calm'), hint: 'Turns off decorative effects; keeps the reading motion' },
    { label: 'Lite mode', on: lite, onClick: () => setLite(!lite), hint: 'System fonts, no effects, tools load on tap' },
    { label: 'Sound', on: sound, onClick: () => setSound(!sound), hint: 'Soft clicks on buttons and confirmations' },
  ]
  const accents: { id: 'brass' | 'moss' | 'brick'; label: string; swatch: string }[] = [
    { id: 'brass', label: 'Brass', swatch: 'bg-[#D6A75C]' },
    { id: 'moss', label: 'Moss', swatch: 'bg-[#76A486]' },
    { id: 'brick', label: 'Brick', swatch: 'bg-[#D08B72]' },
  ]

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      data-open={open}
      className="menu-overlay fixed inset-0 z-[60] overflow-y-auto bg-ink"
      {...(!open ? { inert: true } : {})}
    >
      <div className="mx-auto flex min-h-full max-w-[90rem] flex-col px-5 pb-10 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          <span className="font-wordmark text-[1.6rem] font-extrabold uppercase leading-none text-paper">
            Nyota <span className="text-brass">107.3</span>
          </span>
          <button type="button" onClick={closeOverlay} className="inline-flex min-h-11 items-center gap-3 rounded-full border border-sage-dim/50 py-1.5 pr-1.5 pl-5 text-paper hover:border-paper">
            Close
            <span className="grid h-8 w-8 place-items-center rounded-full bg-paper text-ink" aria-hidden="true"><X size={16} /></span>
          </button>
        </div>

        <nav aria-label="Chapters" className="mt-6 flex-1">
          <ol className="m-0 list-none p-0">
            {story.map((s, i) => {
              const current = s.id === active
              return (
                <li key={s.id} className="border-b border-hairline" style={{ transitionDelay: `${i * 40}ms` }}>
                  <a href={`#${s.id}`} onClick={closeOverlay} aria-current={current ? 'location' : undefined} className="group grid min-h-16 grid-cols-[3rem_1fr_auto] items-center gap-4 py-3 sm:grid-cols-[4rem_14rem_1fr_auto]">
                    <span className="font-mono text-small text-sage tabular">{s.number}</span>
                    <span className={`font-display text-heading text-paper ${current ? 'dotted-current' : ''}`}>{s.label}</span>
                    <span className="hidden text-small text-sage sm:block">
                      {renderPlain(s.actionTitle)}
                      <span className="ml-2 whitespace-nowrap text-sage-dim">· {Math.round(s.readMinutes * 60)} sec</span>
                    </span>
                    <span className={`grid h-10 w-10 place-items-center rounded-full text-ink transition-transform group-hover:scale-110 ${accentBg[s.accent]}`} aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </a>
                </li>
              )
            })}
          </ol>
          <p className="mt-6 flex flex-wrap gap-6 text-small">
            <a href="#asks" onClick={closeOverlay} className="inline-flex min-h-11 items-center font-medium text-brass hover:text-paper">→ The asks</a>
            <a href="#sources" onClick={closeOverlay} className="inline-flex min-h-11 items-center text-sage hover:text-paper">Sources</a>
            <a href="#appendix" onClick={closeOverlay} className="inline-flex min-h-11 items-center text-sage hover:text-paper">Appendix and toolkit</a>
          </p>
        </nav>

        <div className="mt-10 border-t border-hairline pt-6">
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {tools.map((t) => (
              <li key={t.label}>
                <button type="button" onClick={t.onClick} aria-pressed={t.pressed} className="fx-ripple fx-varweight fx-neon-hover inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-4 text-small text-paper hover:border-paper">
                  {t.label}
                  {t.hint && <kbd className="font-mono text-xs text-sage-dim">{t.hint}</kbd>}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto]">
            <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2" aria-label="Display and motion">
              {switches.map((sw) => (
                <li key={sw.label}>
                  <button type="button" onClick={sw.onClick} aria-pressed={sw.on} className="fx-bgslide flex min-h-11 w-full items-center justify-between gap-4 rounded-md px-3 py-2 text-left">
                    <span>
                      <span className="block text-small text-paper">{sw.label}</span>
                      <span className="block text-xs text-sage-dim">{sw.hint}</span>
                    </span>
                    <span className="fx-switch" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <fieldset className="m-0 border-0 p-0">
              <legend className="mb-2 text-small text-paper">Accent colour</legend>
              <div className="flex gap-2">
                {accents.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAccent(a.id)}
                    aria-pressed={accent === a.id}
                    aria-label={`${a.label} accent`}
                    className={`fx-scale grid h-11 w-11 place-items-center rounded-full border-2 transition-colors ${accent === a.id ? 'border-paper' : 'border-transparent hover:border-sage-dim'}`}
                  >
                    <span className={`block h-7 w-7 rounded-full ${a.swatch}`} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          <p className="m-0 mt-5 text-small text-sage" aria-live="polite">
            You've read {read} of {story.length} chapters · about {totalMinutes} minutes to skim the story.
          </p>
        </div>
      </div>
    </div>
  )
}
