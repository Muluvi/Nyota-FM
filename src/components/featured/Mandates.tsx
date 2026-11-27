import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { objectiveData } from '../../content/data/objectives'
import { useStickyStack } from '../../motion/useStickyStack'

const tints = ['bg-band-brass', 'bg-band-moss', 'bg-band-sage', 'bg-band-ink-2', 'bg-band-brass'] as const

/**
 * 01 · Five sticky stacking cards (K4, F card stack), one per mandate. Each card
 * tilts and glows on hover, and expands (smooth height) to show its reality check.
 */
export function Mandates() {
  const ref = useStickyStack<HTMLOListElement>()
  const [open, setOpen] = useState<string | null>(null)
  return (
    <ol ref={ref} className="m-0 flex list-none flex-col gap-4 p-0">
      {objectiveData.map((o, i) => {
        const isOpen = open === o.id
        return (
          <li key={o.id} className="stack-card" style={{ ['--stack-i' as string]: i }}>
            <article className={`fx-tilt fx-glow relative origin-top rounded-md border border-hairline p-6 sm:p-8 ${tints[i]}`} data-tilt-max="4" aria-labelledby={`mandate-${o.id}`}>
              <div className="flex items-start justify-between gap-6">
                <p className="m-0 flex items-center gap-3 font-mono text-small text-brass">
                  <span className="fx-float grid h-9 w-9 place-items-center rounded-full border border-brass/50 text-body" style={{ animationDelay: `${i * -1.1}s` }} aria-hidden="true">
                    {o.letter}
                  </span>
                  Objective {o.letter}
                </p>
                <p className="m-0 text-right font-mono text-small text-sage">{o.keyStat.badgeText}</p>
              </div>
              <h3 id={`mandate-${o.id}`} className="fx-depth mt-3 mb-4 font-display text-heading font-normal text-paper">
                {o.title}
              </h3>
              <p className="m-0 text-body text-sage">
                <span className="text-paper">v2.0 target. </span>
                {o.v2Target}
              </p>
              <p className="m-0 mt-5 flex items-baseline gap-3 border-t border-hairline pt-4">
                <span className="font-display text-heading text-paper tabular">{o.keyStat.value}</span>
                <span className="text-small text-sage">{o.keyStat.label}</span>
              </p>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`mandate-${o.id}-check`}
                onClick={() => setOpen(isOpen ? null : o.id)}
                className="fx-underline mt-4 inline-flex min-h-11 items-center gap-2 text-small text-paper"
              >
                {isOpen ? 'Hide the reality check' : 'Read the reality check'}
                <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <div id={`mandate-${o.id}-check`} className="fx-accordion" data-open={isOpen} aria-hidden={!isOpen} {...(!isOpen ? { inert: true } : {})}>
                <div>
                  <p className="m-0 pt-3 text-small text-sage">{o.realityCheck}</p>
                </div>
              </div>
            </article>
          </li>
        )
      })}
    </ol>
  )
}
