import { externalSources, internalSources } from '../../content/sources'
import { sectionById } from '../../content/sections'
import { useEffect, useRef, useState } from 'react'
import { Rich } from '../ui/Rich'
import { useSettings } from '../../state/settings'

const FIRST = 12
const STEP = 9

/** Trust: every source, numbered and linkable (#source-n). */
export function Sources() {
  const section = sectionById('sources')
  const { expandAll } = useSettings()
  const [count, setCount] = useState(FIRST)
  const [loading, setLoading] = useState(false)
  const sentinel = useRef<HTMLLIElement>(null)
  const orgs = [...new Set(externalSources.map((s) => s.org))]

  // D. Infinite scroll: more sources load as the reader reaches the end of the list.
  useEffect(() => {
    if (/^#source-/.test(window.location.hash)) setCount(externalSources.length)
    const onHash = () => /^#source-/.test(window.location.hash) && setCount(externalSources.length)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  useEffect(() => {
    const el = sentinel.current
    if (!el || count >= externalSources.length) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      setLoading(true)
      window.setTimeout(() => {
        setCount((c) => Math.min(externalSources.length, c + STEP))
        setLoading(false)
      }, 350)
    }, { rootMargin: '200px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [count])

  if (!section) return null
  const visible = expandAll ? externalSources : externalSources.slice(0, count)
  return (
    <section id="sources" data-chapter="sources" aria-labelledby="sources-title" className="band-ink scroll-mt-16 border-t border-hairline">
      {/* D20 · Marquee of cited organisations; F29 masked edges; speed follows scroll velocity */}
      <div className="fx-marquee border-b border-hairline py-5" aria-hidden="true">
        <div className="fx-marquee-track font-display text-heading text-sage-dim" style={{ ['--dur' as string]: '70s' }}>
          {[...orgs, ...orgs].map((o, i) => (
            <span key={i} className="whitespace-nowrap">
              {o} <span className="text-brass">✦</span>
            </span>
          ))}
        </div>
      </div>
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
              {visible.map((s, i) => (
                <li key={s.id} id={`source-${s.id}`} style={{ animationDelay: `${(i % STEP) * 40}ms` }} className="fx-fade-seq-item fx-bgslide grid scroll-mt-24 grid-cols-[2.5rem_1fr] gap-x-3 border-b border-hairline py-3 target:bg-ink-2 sm:grid-cols-[2.5rem_1fr_auto]">
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
              {!expandAll && count < externalSources.length && (
                <li ref={sentinel} className="flex items-center gap-3 py-5 text-small text-sage" aria-live="polite">
                  {loading ? (
                    <>
                      <span className="fx-typing" aria-hidden="true"><i /><i /><i /></span> Loading more sources…
                    </>
                  ) : (
                    <button type="button" onClick={() => setCount(externalSources.length)} className="fx-underline min-h-11 text-paper">
                      Show all {externalSources.length} sources
                    </button>
                  )}
                </li>
              )}
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
