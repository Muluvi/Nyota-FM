import { useEffect, type ReactNode } from 'react'
import type { Section } from '../../content/sections'
import type { ChapterCopy } from '../../content/chapters/types'
import { useReveal } from '../../motion/useReveal'
import { useWordHighlight } from '../../motion/useWordHighlight'
import { useSettings } from '../../state/settings'
import { Rich } from '../ui/Rich'
import { accentText } from './accent'
import { Bridge } from './Bridge'
import { DetailBlock } from './DetailBlock'
import { ProofList } from './ProofList'
import { ShareChip } from './ShareChip'
import { ToolkitLink } from './ToolkitLink'
import { Scramble } from '../site/Scramble'

interface ChapterShellProps {
  section: Section
  copy: ChapterCopy
  featured: ReactNode
}

/**
 * Chapter template. Skim: number, label, action title, core sentence.
 * Read: three proof points and one featured visual. Audit: the detail disclosure.
 */
export function ChapterShell({ section, copy, featured }: ChapterShellProps) {
  const revealRef = useReveal<HTMLElement>()
  const titleRef = useWordHighlight<HTMLHeadingElement>()
  const { markRead } = useSettings()
  const accent = accentText[section.accent]

  useEffect(() => {
    const el = revealRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && markRead(section.id), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [markRead, revealRef, section.id])

  return (
    <section
      ref={revealRef}
      id={section.id}
      data-chapter={section.id}
      aria-labelledby={`${section.id}-title`}
      className={`band-${section.bg} relative isolate scroll-mt-16 overflow-x-clip`}
    >
      <hr className="fx-divider absolute inset-x-0 top-0" aria-hidden="true" />
      {/* Parallax ghost numeral with a text stroke (E, B parallax layers) */}
      <span
        data-fx="parallax"
        style={{ ['--depth' as string]: '-220px' }}
        className="fx-stroke pointer-events-none absolute -top-10 -right-6 -z-10 select-none font-wordmark text-[clamp(12rem,30vw,28rem)] leading-none font-extrabold opacity-[0.12]"
        aria-hidden="true"
      >
        {section.number}
      </span>
      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 py-20 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <header className="fx-slide-left lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className={`reveal-x m-0 flex items-baseline gap-3 font-mono text-body ${accent}`}>
              <Scramble text={section.number} className="tabular" />
              <span className="fx-tracking font-body font-medium">{section.label}</span>
            </p>
            <h2 ref={titleRef} id={`${section.id}-title`} className="mt-5 mb-8 font-display text-display-l font-normal text-paper text-balance">
              <Rich text={section.actionTitle} highlight />
            </h2>
            <ShareChip id={section.id} label={section.label} />
          </div>
        </header>

        <div className="fx-slide-right flex min-w-0 flex-col gap-12 lg:col-span-7">
          <p className="reveal measure m-0 text-body-l font-medium text-paper">
            <Rich text={copy.core} mark />
          </p>
          <ProofList proof={copy.proof} />
          <figure className="reveal fx-clip-reveal m-0 print-avoid" aria-labelledby={`${section.id}-featured-title`}>
            <figcaption className="mb-6">
              <span id={`${section.id}-featured-title`} className="block font-display text-heading text-paper">
                <Rich text={copy.featuredTitle} />
              </span>
              <span className="mt-2 block text-small text-sage">
                <Rich text={copy.featuredSummary} />
              </span>
            </figcaption>
            {featured}
          </figure>
          <div className="flex flex-col gap-5">
            <DetailBlock id={section.id} label={section.label} summary={copy.detailSummary} />
            <ToolkitLink id={section.id} label={section.label} />
          </div>
          <div data-fx="fade-zone">
            <Bridge id={section.id} text={copy.bridge} />
          </div>
        </div>
      </div>
    </section>
  )
}
