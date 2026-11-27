import { useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { inShort } from '../../content/chapters/intro'
import { asks } from '../../content/data/asks'
import { figures } from '../../content/figures'
import { sourceLabel } from '../../content/sources'
import { useReveal } from '../../motion/useReveal'
import { useWordHighlight } from '../../motion/useWordHighlight'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Rich } from '../ui/Rich'

type Stat = (typeof inShort.stats)[number]

/** D. 3D card flip: front shows the number, back shows where it comes from. */
function StatCard({ stat }: { stat: Stat }) {
  const [flipped, setFlipped] = useState(false)
  const entry = figures[stat.figure]
  return (
    <div className="fx-flip h-full" data-flipped={flipped}>
      <div className="fx-flip-inner h-full">
        <div className="fx-tilt fx-lift relative flex h-full flex-col overflow-hidden rounded-md border border-ink/15 bg-paper p-6 sm:p-8" data-tilt-max="6" aria-hidden={flipped} {...(flipped ? { inert: true } : {})}>
          <span className="pointer-events-none absolute -right-2 -bottom-10 font-wordmark text-[10rem] leading-none text-ink/[0.07]" aria-hidden="true">
            {stat.ghost}
          </span>
          <span className="fx-depth relative block font-display text-[clamp(2.25rem,1.3rem+2.4vw,3.6rem)] leading-none text-ink">
            <Figure id={stat.figure} countUp />
          </span>
          <span className="relative mt-4 block text-body text-ink-on-paper">
            <Rich text={stat.label} />
          </span>
          <button type="button" onClick={() => setFlipped(true)} className="fx-underline relative mt-auto self-start pt-6 text-small text-ink">
            Where this comes from
          </button>
        </div>
        <div className="flex h-full flex-col rounded-md border border-ink/15 bg-ink p-6 text-paper sm:p-8" aria-hidden={!flipped} {...(!flipped ? { inert: true } : {})}>
          <p className="m-0 text-small text-sage">{entry.note}</p>
          <p className="m-0 mt-3 text-small text-paper">{sourceLabel(entry.sourceId)}</p>
          {!entry.verified && <p className="m-0 mt-3 text-xs text-sage-dim">Provisional: awaiting owner confirmation.</p>}
          <button type="button" onClick={() => setFlipped(false)} className="fx-icon-spin mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-4 text-small text-paper">
            <RotateCcw size={14} aria-hidden="true" /> Back to the number
          </button>
        </div>
      </div>
    </div>
  )
}

/** In short: the 30-second version as a bento grid on a paper band (O9, O3, E drop cap). */
export function InShort() {
  const ref = useReveal<HTMLElement>({ stagger: 100 })
  const recRef = useWordHighlight<HTMLParagraphElement>()
  const track = useRef<HTMLUListElement>(null)
  const [slide, setSlide] = useState(0)

  const onTrackScroll = () => {
    const el = track.current
    if (!el) return
    setSlide(Math.round(el.scrollLeft / Math.max(1, el.scrollWidth / inShort.stats.length)))
  }
  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    el.scrollTo({ left: (el.scrollWidth / inShort.stats.length) * i, behavior: 'smooth' })
  }

  return (
    <section ref={ref} id="in-short" data-chapter="in-short" aria-labelledby="in-short-title" className="band-paper relative isolate scroll-mt-16 overflow-hidden">
      {/* B. Rotation on scroll: a dial ring turns as the section passes */}
      <svg data-fx="rotate" style={{ ['--deg' as string]: '140deg' }} viewBox="0 0 200 200" className="pointer-events-none absolute -top-40 -right-40 -z-10 h-[34rem] w-[34rem] text-ink/10" aria-hidden="true">
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="0.6 4.6" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="10 6" />
      </svg>
      <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 md:py-32 lg:px-12">
        <h2 id="in-short-title" className="fx-tracking m-0 font-mono text-body font-normal text-ink-on-paper">
          <span className="tabular">00</span> · In short
        </h2>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p ref={recRef} className="m-0 max-w-[30ch] font-display text-display-l text-ink text-balance">
              <Rich text={inShort.recommendation} highlight />
            </p>
          </div>
          <div className="fx-slide-right reveal self-end rounded-md border border-ink/15 p-6 lg:col-span-4">
            <p className="fx-dropcap measure m-0 text-body text-ink-on-paper">
              <Rich text={inShort.whyNow} />
            </p>
          </div>
        </div>

        {/* Bento row; on phones a scroll-snap carousel with dot navigation */}
        <ul
          ref={track}
          onScroll={onTrackScroll}
          className="m-0 mt-10 -mx-5 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:snap-none md:grid-cols-3 md:overflow-visible md:px-0"
          aria-label="Three numbers"
        >
          {inShort.stats.map((s, i) => (
            <li key={s.figure} className="reveal print-avoid w-[85%] shrink-0 snap-center md:w-auto" style={{ ['--reveal-delay' as string]: `${i * 120}ms` }}>
              <StatCard stat={s} />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Choose a number">
          {inShort.stats.map((s, i) => (
            <button
              key={s.figure}
              type="button"
              role="tab"
              aria-selected={slide === i}
              aria-label={`Number ${i + 1}`}
              onClick={() => goTo(i)}
              className="grid h-11 w-11 place-items-center"
            >
              <span className={`block h-2 rounded-full bg-ink transition-all duration-500 ${slide === i ? 'w-8' : 'w-2 opacity-40'}`} />
            </button>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <h3 className="fx-slide-left reveal m-0 font-display text-heading font-normal text-ink lg:col-span-4">The six decisions</h3>
          <ol className="m-0 grid list-none gap-x-10 p-0 sm:grid-cols-2 lg:col-span-8">
            {asks.map((a) => (
              <li key={a.id} className="reveal fx-bgslide flex gap-4 border-t border-ink/15 px-2 py-4">
                <span className="font-mono text-body text-ink-on-paper tabular">{a.id}</span>
                <span className="text-body text-ink">{a.title}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="no-print mt-10">
          <Button href="#asks" tone="light">Go to the asks</Button>
        </div>
      </div>
    </section>
  )
}
