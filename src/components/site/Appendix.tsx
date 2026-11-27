import { lazy, Suspense } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { chapterSections, sectionById } from '../../content/sections'
import { selfChecks } from '../../content/data/sourceList'
import { glossary } from '../../content/glossary'
import { useSettings } from '../../state/settings'
import { tools, toolsFor } from '../toolkit/registry'
import { Disclosure } from '../ui/Disclosure'
import { LoadBoundary, Skeleton } from '../chapter/DetailBlock'
import { FigureRegister } from './FigureRegister'
import { renderPlain } from '../../lib/richText'

const DocumentHero = lazy(() => import('../v2/DocumentHero').then((m) => ({ default: m.DocumentHero })))
const DataEnrichedAnnexure = lazy(() => import('../v2/DataEnrichedAnnexure').then((m) => ({ default: m.DataEnrichedAnnexure })))
const VisualPlaybook = lazy(() => import('../v2/VisualPlaybook').then((m) => ({ default: m.VisualPlaybook })))

function Lazy({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <LoadBoundary label={label}>
      <Suspense fallback={<Skeleton label={`Loading ${label}`} />}>
        <div className="legacy pt-6">{children}</div>
      </Suspense>
    </LoadBoundary>
  )
}

function ToolGroup({ id, label, number }: { id: string; label: string; number: string }) {
  const { openSheet } = useSettings()
  const list = toolsFor(id)
  if (!list.length) return null
  return (
    <div id={`toolkit-${id}`} className="scroll-mt-24 border-t border-hairline py-8">
      <h4 className="m-0 mb-5 flex items-baseline gap-3 text-body font-medium text-paper">
        {number && <span className="font-mono text-small text-sage tabular">{number}</span>}
        {label}
        <span className="text-small font-normal text-sage">({list.length})</span>
      </h4>
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((t) => (
          <li key={t.id}>
            <button type="button" onClick={() => openSheet(t.id)} className="group flex h-full min-h-28 w-full flex-col justify-between gap-4 rounded-md border border-hairline p-5 text-left transition-colors hover:border-sage-dim">
              <span>
                <span className="block text-body text-paper">{t.name}</span>
                <span className="mt-1 block text-small text-sage">{t.answers}</span>
              </span>
              <span className="flex items-center justify-between text-small text-sage">
                {t.illustrative ? 'Illustrative' : 'Interactive'}
                <span className="inline-flex items-center gap-1 text-paper">Open <ArrowUpRight size={14} aria-hidden="true" className="text-brass" /></span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Depth: the Toolkit (every widget), annexures, earlier drafts, figure register, glossary. */
export default function Appendix() {
  const section = sectionById('appendix')
  return (
    <section id="appendix" data-chapter="appendix" aria-labelledby="appendix-title" className="band-ink scroll-mt-16 border-t border-hairline">
      <div className="mx-auto max-w-[90rem] px-4 py-20 sm:px-8 md:py-28 lg:px-12">
        <h2 id="appendix-title" className="m-0 font-display text-heading font-normal text-paper">Appendix</h2>
        <p className="measure mt-4 text-body text-sage">{section?.actionTitle} Nothing from the earlier site was deleted; it lives here or in each chapter's detail.</p>

        <div className="no-print">
        <h3 id="toolkit" className="mt-14 mb-2 font-display text-heading font-normal text-paper">Toolkit</h3>
        <p className="m-0 mb-4 text-small text-sage">{tools.length} interactive tools, grouped by chapter. Each opens in a focused view.</p>
        {chapterSections.map((s) => (
          <ToolGroup key={s.id} id={s.id} label={s.label} number={s.number} />
        ))}
        <ToolGroup id="appendix" label="Earlier drafts and site chrome" number="" />
        </div>

        <h3 className="mt-14 mb-4 font-display text-heading font-normal text-paper">Annexures</h3>
        <div className="flex flex-col">
          <Disclosure id="annex-evidence" title="Evidence standard and the earlier front page" summary="The three-tier evidence standard (hard data, modelled, data gap) and the v2.0 cover page.">
            {() => <Lazy label="the evidence standard"><DocumentHero onNavigate={(id) => (window.location.hash = id)} /></Lazy>}
          </Disclosure>
          <Disclosure id="annex-data-room" title="Sourced data room" summary="Thirteen annexure tables: market, census, connectivity, social, costs, salaries and studio quotes.">
            {() => <Lazy label="the data room"><DataEnrichedAnnexure /></Lazy>}
          </Disclosure>
          <Disclosure id="annex-playbook" title="The signal in motion (earlier visual playbook)" summary={renderPlain('Includes the unsourced {f:reach-weekly} reach, {f:digital-share} digital share and {f:commercial-yield} yield figures, kept for reference.')}>
            {() => <Lazy label="the playbook"><VisualPlaybook /></Lazy>}
          </Disclosure>
          <Disclosure id="annex-self-check" title="Self-check: twelve governance criteria" summary="The v2.0 compliance checklist as submitted.">
            {() => (
              <ol className="m-0 list-none p-0 pt-4">
                {selfChecks.map((c) => (
                  <li key={c.num} className="flex gap-4 border-b border-hairline py-3 text-body text-paper">
                    <span className="font-mono text-small text-sage tabular">{c.num}</span>
                    <span className="flex-1">{c.text}</span>
                    <span className="font-mono text-small text-moss">{c.status ? 'Pass' : 'Open'}</span>
                  </li>
                ))}
              </ol>
            )}
          </Disclosure>
          <Disclosure id="figure" title="Figure register" summary="Every number on the site, its source, and the values still awaiting owner confirmation.">
            {() => <FigureRegister />}
          </Disclosure>
          <Disclosure id="glossary" title="Glossary" summary={`${Object.keys(glossary).length} terms used in the proposal.`}>
            {() => (
              <dl className="m-0 grid gap-x-10 pt-4 sm:grid-cols-2">
                {Object.entries(glossary).map(([k, g]) => (
                  <div key={k} id={`glossary-${k}`} className="scroll-mt-24 border-b border-hairline py-3">
                    <dt className="text-body text-paper">{g.term}</dt>
                    <dd className="m-0 mt-1 text-small text-sage">{g.definition}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Disclosure>
        </div>
      </div>
    </section>
  )
}
