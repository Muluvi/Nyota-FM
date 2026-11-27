import { asks } from '../../content/data/asks'
import { sectionById } from '../../content/sections'
import { useReveal } from '../../motion/useReveal'
import { useWordHighlight } from '../../motion/useWordHighlight'
import { Button } from '../ui/Button'
import { Counter } from '../ui/Counter'
import { Rich } from '../ui/Rich'
import { ShareChip } from '../chapter/ShareChip'
import { Bridge } from '../chapter/Bridge'
import { closing } from '../../content/chapters/intro'

/** The decision: six asks with owner · measure · date (O9 ghost numerals). */
export function Asks() {
  const section = sectionById('asks')
  const ref = useReveal<HTMLElement>()
  const titleRef = useWordHighlight<HTMLHeadingElement>()
  if (!section) return null

  return (
    <section ref={ref} id="asks" data-chapter="asks" aria-labelledby="asks-title" className="band-ink-2 scroll-mt-16">
      <div className="mx-auto max-w-[90rem] px-4 py-20 sm:px-8 md:py-32 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <header className="lg:col-span-5">
            <p className="m-0 flex items-baseline gap-3 font-mono text-body text-brass">
              <span className="tabular">{section.number}</span>
              <span className="font-body font-medium">{section.label}</span>
            </p>
            <h2 ref={titleRef} id="asks-title" className="mt-5 mb-8 font-display text-display-l font-normal text-paper text-balance">
              <Rich text={section.actionTitle} highlight />
            </h2>
            <Counter value={String(asks.length)} label="decisions for the board" />
            <p className="measure mt-6 text-body text-sage">{closing.line}</p>
            <div className="no-print mt-8 flex flex-wrap gap-4">
              <Button href="?view=decision-sheet" variant="primary">Download decision sheet (PDF)</Button>
              <ShareChip id="asks" label="the asks" />
            </div>
          </header>

          <ol className="m-0 list-none p-0 lg:col-span-7">
            {asks.map((a) => (
              <li key={a.id} className="reveal print-avoid relative overflow-hidden border-t border-hairline py-8 last:border-b">
                <span className="pointer-events-none absolute -top-6 right-0 font-wordmark text-[9rem] leading-none text-paper/[0.04]" aria-hidden="true">
                  {a.id}
                </span>
                <h3 className="relative m-0 flex gap-4 font-display text-heading font-normal text-paper">
                  <span className="font-mono text-body text-brass tabular">{String(a.id).padStart(2, '0')}</span>
                  {a.title}
                </h3>
                <p className="measure relative mt-3 mb-5 text-body text-sage sm:ml-10">{a.desc}</p>
                <dl className="relative m-0 grid gap-4 text-small sm:ml-10 sm:grid-cols-3">
                  <div>
                    <dt className="text-sage-dim">Owner</dt>
                    <dd className="m-0 mt-1 text-paper">{a.owner}</dd>
                  </div>
                  <div>
                    <dt className="text-sage-dim">Measure</dt>
                    <dd className="m-0 mt-1 text-paper">{a.measure}</dd>
                  </div>
                  <div>
                    <dt className="text-sage-dim">When</dt>
                    <dd className="m-0 mt-1 text-paper">{a.when}</dd>
                  </div>
                </dl>
                <p className="relative m-0 mt-4 text-small text-sage-dim sm:ml-10">
                  Owner and measure mapped from {a.mappedFrom} (provisional).{' '}
                  <a href={a.detailHref} className="text-sage underline decoration-hairline underline-offset-4 hover:text-paper">See the evidence</a>
                </p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-16">
          <Bridge id="asks" text="Every figure above traces to a source." />
        </div>
      </div>
    </section>
  )
}
