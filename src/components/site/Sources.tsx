import { externalSources, internalSources } from '../../content/sources'
import { sectionById } from '../../content/sections'
import { Rich } from '../ui/Rich'

/** Trust: every source, numbered and linkable (#source-n). */
export function Sources() {
  const section = sectionById('sources')
  if (!section) return null
  return (
    <section id="sources" data-chapter="sources" aria-labelledby="sources-title" className="band-ink scroll-mt-16 border-t border-hairline">
      <div className="mx-auto max-w-[90rem] px-4 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <header className="lg:col-span-4">
            <h2 id="sources-title" className="m-0 font-display text-heading font-normal text-paper">Sources</h2>
            <p className="mt-4 text-body text-sage">
              <Rich text={section.actionTitle} />
            </p>
            <p className="mt-4 text-small text-sage-dim">All accessed 30 September 2026. Tap any figure on the page to see its source.</p>
          </header>
          <div className="lg:col-span-8">
            <ol className="m-0 list-none p-0">
              {externalSources.map((s) => (
                <li key={s.id} id={`source-${s.id}`} className="grid scroll-mt-24 grid-cols-[2.5rem_1fr] gap-x-3 border-b border-hairline py-3 target:bg-ink-2 sm:grid-cols-[2.5rem_1fr_auto]">
                  <span className="font-mono text-small text-sage tabular">{s.id}</span>
                  <span className="text-body text-paper">
                    {s.org}
                    <span className="block text-small text-sage">{s.title}</span>
                  </span>
                  <a href={`https://${s.url}`} target="_blank" rel="noopener noreferrer" className="col-start-2 inline-flex min-h-11 items-center font-mono text-small text-sage underline decoration-hairline underline-offset-4 hover:text-paper sm:col-start-3 sm:justify-end">
                    {s.url}
                  </a>
                </li>
              ))}
            </ol>
            <h3 className="mt-12 mb-3 text-body font-medium text-paper">Internal references</h3>
            <ul className="m-0 list-none p-0 text-small text-sage">
              {Object.values(internalSources).map((s) => (
                <li key={s.id} className="border-b border-hairline py-3">
                  <span className="text-paper">{s.org}</span> · {s.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
