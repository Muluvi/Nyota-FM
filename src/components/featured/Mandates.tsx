import { objectiveData } from '../../content/data/objectives'
import { useStickyStack } from '../../motion/useStickyStack'

const tints = ['bg-band-brass', 'bg-band-moss', 'bg-band-sage', 'bg-band-ink-2', 'bg-band-brass'] as const

/** 01 · Five sticky stacking cards, one per mandate (K4). Normal stack below 768px. */
export function Mandates() {
  const ref = useStickyStack<HTMLOListElement>()
  return (
    <ol ref={ref} className="m-0 flex list-none flex-col gap-4 p-0">
      {objectiveData.map((o, i) => (
        <li key={o.id} className="stack-card" style={{ ['--stack-i' as string]: i }}>
          <article className={`origin-top rounded-md border border-hairline p-6 sm:p-8 ${tints[i]}`} aria-labelledby={`mandate-${o.id}`}>
            <div className="flex items-start justify-between gap-6">
              <p className="m-0 font-mono text-small text-brass">Objective {o.letter}</p>
              <p className="m-0 text-right font-mono text-small text-sage">{o.keyStat.badgeText}</p>
            </div>
            <h3 id={`mandate-${o.id}`} className="mt-3 mb-4 font-display text-heading font-normal text-paper">
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
          </article>
        </li>
      ))}
    </ol>
  )
}
