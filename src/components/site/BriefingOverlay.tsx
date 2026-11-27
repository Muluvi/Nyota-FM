import { inShort } from '../../content/chapters/intro'
import { asks } from '../../content/data/asks'
import { useSettings } from '../../state/settings'
import { Figure } from '../ui/Figure'
import { Rich } from '../ui/Rich'
import { Sheet } from '../ui/Sheet'

/** Briefing mode: the In short content in a focused overlay, from the same registry. */
export function BriefingOverlay() {
  const { overlay, closeOverlay } = useSettings()
  if (overlay !== 'briefing') return null
  return (
    <Sheet title="Board briefing" subtitle="The 30-second version" onClose={closeOverlay} side>
      <p className="m-0 font-display text-heading text-paper">
        <Rich text={inShort.recommendation} />
      </p>
      <p className="mt-4 text-body text-sage">
        <Rich text={inShort.whyNow} />
      </p>
      <ul className="m-0 mt-8 grid list-none gap-3 p-0 sm:grid-cols-3">
        {inShort.stats.map((s) => (
          <li key={s.figure} className="rounded-md border border-hairline p-4">
            <span className="block font-display text-heading text-paper"><Figure id={s.figure} /></span>
            <span className="mt-2 block text-small text-sage"><Rich text={s.label} /></span>
          </li>
        ))}
      </ul>
      <h3 className="mt-10 mb-3 text-body font-medium text-paper">The six decisions</h3>
      <ol className="m-0 list-none p-0">
        {asks.map((a) => (
          <li key={a.id} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-hairline py-3">
            <span className="font-mono text-small text-brass tabular">{a.id}</span>
            <span>
              <span className="block text-body text-paper">{a.title}</span>
              <span className="block text-small text-sage">{a.owner} · {a.when}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-8 mb-0">
        <a href="#asks" onClick={closeOverlay} className="inline-flex min-h-11 items-center text-brass underline underline-offset-4 hover:text-paper">Go to the asks →</a>
      </p>
    </Sheet>
  )
}
