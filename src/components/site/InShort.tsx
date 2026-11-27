import { inShort } from '../../content/chapters/intro'
import { asks } from '../../content/data/asks'
import { useReveal } from '../../motion/useReveal'
import { useWordHighlight } from '../../motion/useWordHighlight'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Rich } from '../ui/Rich'

/** In short: the 30-second version on a paper band (O9 ghost numerals, O3 highlight). */
export function InShort() {
  const ref = useReveal<HTMLElement>({ stagger: 100 })
  const recRef = useWordHighlight<HTMLParagraphElement>()

  return (
    <section ref={ref} id="in-short" data-chapter="in-short" aria-labelledby="in-short-title" className="band-paper scroll-mt-16">
      <div className="mx-auto max-w-[90rem] px-4 py-20 sm:px-8 md:py-32 lg:px-12">
        <h2 id="in-short-title" className="m-0 font-mono text-body font-normal text-ink-on-paper">
          <span className="tabular">00</span> · In short
        </h2>
        <p ref={recRef} className="mt-6 mb-0 max-w-[30ch] font-display text-display-l text-ink text-balance">
          <Rich text={inShort.recommendation} highlight />
        </p>
        <p className="measure reveal mt-8 mb-0 text-body-l text-ink-on-paper">
          <Rich text={inShort.whyNow} />
        </p>

        <ul className="m-0 mt-14 grid list-none gap-4 p-0 md:grid-cols-3">
          {inShort.stats.map((s) => (
            <li key={s.figure} className="reveal print-avoid relative overflow-hidden rounded-md border border-ink/15 p-6 sm:p-8">
              <span className="pointer-events-none absolute -right-2 -bottom-10 font-wordmark text-[10rem] leading-none text-ink/[0.06]" aria-hidden="true">
                {s.ghost}
              </span>
              <span className="relative block font-display text-[clamp(2.25rem,1.3rem+2.4vw,3.6rem)] leading-none text-ink">
                <Figure id={s.figure} />
              </span>
              <span className="relative mt-4 block text-body text-ink-on-paper">
                <Rich text={s.label} />
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <h3 className="m-0 font-display text-heading font-normal text-ink lg:col-span-4">The six decisions</h3>
          <ol className="m-0 grid list-none gap-x-10 p-0 sm:grid-cols-2 lg:col-span-8">
            {asks.map((a) => (
              <li key={a.id} className="reveal flex gap-4 border-t border-ink/15 py-4">
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
