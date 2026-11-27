import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { opportunities, type Opportunity } from '../../content/data/opportunities'
import { Counter } from '../ui/Counter'
import { Pills } from '../ui/Pills'

const VISIBLE = 6
const dot: Record<string, string> = { Low: 'bg-moss', Medium: 'bg-brass', High: 'bg-brick' }
type SortKey = 'score' | 'revenue' | 'speed'

/** Upper bound of a revenue range in KSh, parsed from the source string (for sorting only). */
function revenueTop(o: Opportunity): number {
  const nums = [...o.revenue.matchAll(/(\d+(?:\.\d+)?)\s*([KM])/g)].map(([, n, u]) => Number(n) * (u === 'M' ? 1e6 : 1e3))
  return nums.length ? Math.max(...nums) : 0
}
/** First month figure in "time to revenue"; episodic dates sort last. */
function monthsFirst(o: Opportunity): number {
  const m = o.time.match(/(\d+)\s*[–-]\s*\d+\s*months/)
  return m ? Number(m[1]) : 99
}
const sorters: Record<SortKey, (a: Opportunity, b: Opportunity) => number> = {
  score: (a, b) => b.score - a.score,
  revenue: (a, b) => revenueTop(b) - revenueTop(a),
  speed: (a, b) => monthsFirst(a) - monthsFirst(b) || b.score - a.score,
}

/** 04 · "(12) revenue streams" above a sortable hairline index with score bars (K5, A7, D sortable). */
export function OpportunityIndex() {
  const [all, setAll] = useState(false)
  const [sort, setSort] = useState<SortKey>('score')
  const body = useRef<HTMLTableSectionElement>(null)
  const prev = useRef(new Map<number, number>())

  const sorted = useMemo(() => [...opportunities].sort(sorters[sort]), [sort])
  const rows = all ? sorted : sorted.slice(0, VISIBLE)

  // FLIP: rows glide from their old position to the new one after a sort.
  useLayoutEffect(() => {
    const tb = body.current
    if (!tb) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    tb.querySelectorAll<HTMLTableRowElement>('tr[data-rank]').forEach((tr) => {
      const rank = Number(tr.dataset.rank)
      const top = tr.getBoundingClientRect().top
      const before = prev.current.get(rank)
      if (before !== undefined && before !== top && !reduced) {
        tr.animate([{ transform: `translateY(${before - top}px)` }, { transform: 'none' }], { duration: 550, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' })
      }
      prev.current.set(rank, top)
    })
  }, [rows])

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Counter value={String(opportunities.length)} label="revenue streams, ranked" />
        <Pills
          label="Sort streams by"
          options={[
            { value: 'score', label: 'Score' },
            { value: 'revenue', label: 'Revenue' },
            { value: 'speed', label: 'Speed' },
          ]}
          value={sort}
          onChange={setSort}
        />
      </div>
      <table className="mt-6 w-full border-collapse text-left">
        <caption className="sr-only">Revenue streams ranked by expected value score, with annual revenue at maturity and difficulty. Sorted by {sort}.</caption>
        <thead>
          <tr className="border-b border-hairline text-small text-sage">
            <th scope="col" className="py-3 pr-3 font-normal">№</th>
            <th scope="col" className="py-3 pr-3 font-normal">Stream</th>
            <th scope="col" className="hidden py-3 pr-3 text-right font-normal sm:table-cell">Annual revenue</th>
            <th scope="col" className="py-3 text-right font-normal">Score</th>
            <th scope="col" className="w-10 py-3"><span className="sr-only">Detail</span></th>
          </tr>
        </thead>
        <tbody ref={body}>
          {rows.map((o) => (
            <tr key={o.rank} data-rank={o.rank} className="border-b border-hairline align-top transition-colors duration-300 hover:bg-ink-2">
              <td className="py-4 pr-3 font-mono text-small text-sage tabular">{String(o.rank).padStart(2, '0')}</td>
              <td className="py-4 pr-3">
                <span className="block text-body text-paper">{o.name}</span>
                <span className="mt-1 flex items-center gap-2 text-small text-sage">
                  <span className={`h-2 w-2 rounded-full ${dot[o.difficulty]}`} aria-hidden="true" />
                  {o.difficulty} difficulty · {o.time}
                  <span className="sm:hidden"> · {o.revenue}</span>
                </span>
                <span className="fx-progress mt-3 block max-w-[16rem]" aria-hidden="true">
                  <span style={{ ['--v' as string]: o.score / 10 }} />
                </span>
              </td>
              <td className="hidden py-4 pr-3 text-right font-mono text-small text-paper tabular sm:table-cell">{o.revenue}</td>
              <td className="py-4 text-right font-mono text-body text-brass tabular">{o.score.toFixed(1)}</td>
              <td className="py-4 text-right">
                <a href="#opportunities-detail" aria-label={`${o.name}: read the rationale`} className="fx-icon-spin inline-grid h-11 w-11 place-items-center rounded-full text-sage hover:text-paper">
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
        <button type="button" onClick={() => setAll((a) => !a)} aria-expanded={all} className="fx-underline min-h-11 text-small text-paper">
          {all ? 'Show top six' : `Show all (${opportunities.length})`}
        </button>
      </div>
    </div>
  )
}
