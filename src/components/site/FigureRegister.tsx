import { figureList } from '../../content/figures'
import { sourceHref, sourceLabel } from '../../content/sources'

/** Audit view of the registry: exact values, sources, conflicts and where each appeared. */
export function FigureRegister() {
  const groups = [...new Set(figureList.map((f) => ('conflict' in f && f.conflict) || ''))]
  return (
    <div className="overflow-x-auto pt-4">
      <table className="w-full min-w-[44rem] border-collapse text-left text-small">
        <caption className="sr-only">All registered figures with source, status and conflict group</caption>
        <thead>
          <tr className="border-b border-hairline text-sage">
            <th scope="col" className="py-3 pr-3 font-normal">Value</th>
            <th scope="col" className="py-3 pr-3 font-normal">What it is</th>
            <th scope="col" className="py-3 pr-3 font-normal">Source</th>
            <th scope="col" className="py-3 pr-3 font-normal">Conflict group</th>
            <th scope="col" className="py-3 font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {figureList.map((f) => {
            const conflict = 'conflict' in f ? f.conflict : undefined
            return (
              <tr key={f.id} id={`figure-${f.id}`} className="scroll-mt-24 border-b border-hairline align-top target:bg-ink-2">
                <td className="py-3 pr-3 font-mono text-paper tabular whitespace-nowrap">
                  {f.display}
                  {'exact' in f && f.exact && f.exact !== f.display && <span className="block text-xs text-sage-dim">{f.exact}</span>}
                </td>
                <td className="py-3 pr-3 text-sage">
                  {f.note}
                  {'appears' in f && f.appears && <span className="block text-xs text-sage-dim">Appeared in: {f.appears}</span>}
                </td>
                <td className="py-3 pr-3"><a href={sourceHref(f.sourceId)} className="text-sage underline decoration-hairline underline-offset-4 hover:text-paper">{sourceLabel(f.sourceId)}</a></td>
                <td className="py-3 pr-3 font-mono text-sage">{conflict ?? '—'}</td>
                <td className={`py-3 ${f.verified ? 'text-moss' : 'text-brass'}`}>{f.verified ? 'Verified' : 'Provisional'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-sage-dim">{groups.filter(Boolean).length} conflict groups awaiting owner decision. See docs/OPEN_QUESTIONS.md.</p>
    </div>
  )
}
