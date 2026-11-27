import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { opportunities } from '../../content/data/opportunities'
import { Counter } from '../ui/Counter'

const VISIBLE = 6
const dot: Record<string, string> = { Low: 'bg-moss', Medium: 'bg-brass', High: 'bg-brick' }

/** 04 · "(12) revenue streams" above a hairline index table (K5, A7). */
export function OpportunityIndex() {
  const [all, setAll] = useState(false)
  const rows = all ? opportunities : opportunities.slice(0, VISIBLE)
  return (
    <div>
      <Counter value={String(opportunities.length)} label="revenue streams, ranked by composite score" />
      <table className="mt-6 w-full border-collapse text-left">
        <caption className="sr-only">Revenue streams ranked by expected value score, with annual revenue at maturity and difficulty</caption>
        <thead>
          <tr className="border-b border-hairline text-small text-sage">
            <th scope="col" className="py-3 pr-3 font-normal">№</th>
            <th scope="col" className="py-3 pr-3 font-normal">Stream</th>
            <th scope="col" className="hidden py-3 pr-3 text-right font-normal sm:table-cell">Annual revenue</th>
            <th scope="col" className="py-3 text-right font-normal">Score</th>
            <th scope="col" className="w-10 py-3"><span className="sr-only">Detail</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => (
            <tr key={o.rank} className="border-b border-hairline align-top">
              <td className="py-4 pr-3 font-mono text-small text-sage tabular">{String(o.rank).padStart(2, '0')}</td>
              <td className="py-4 pr-3">
                <span className="block text-body text-paper">{o.name}</span>
                <span className="mt-1 flex items-center gap-2 text-small text-sage">
                  <span className={`h-2 w-2 rounded-full ${dot[o.difficulty]}`} aria-hidden="true" />
                  {o.difficulty} difficulty · {o.time}
                  <span className="sm:hidden"> · {o.revenue}</span>
                </span>
              </td>
              <td className="hidden py-4 pr-3 text-right font-mono text-small text-paper tabular sm:table-cell">{o.revenue}</td>
              <td className="py-4 text-right font-mono text-body text-brass tabular">{o.score.toFixed(1)}</td>
              <td className="py-4 text-right">
                <a href="#opportunities-detail" aria-label={`${o.name}: read the rationale`} className="inline-grid h-11 w-11 place-items-center rounded-full text-sage hover:text-paper">
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="m-0 flex flex-wrap gap-4 text-small text-sage" aria-label="Difficulty key">
          {Object.entries(dot).map(([k, c]) => (
            <span key={k} className="inline-flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${c}`} aria-hidden="true" /> {k}
            </span>
          ))}
        </p>
        <button type="button" onClick={() => setAll((a) => !a)} aria-expanded={all} className="min-h-11 text-small text-paper underline decoration-hairline underline-offset-4 hover:decoration-paper">
          {all ? 'Show top six' : `Show all (${opportunities.length})`}
        </button>
      </div>
    </div>
  )
}
