import { useMemo, useState } from 'react'
import { checklistA, checklistB, checklistC } from '../../content/data/gaps'
import { ProgressRing } from '../ui/ProgressRing'
import { Pills } from '../ui/Pills'

type List = 'A' | 'B' | 'C'
const VISIBLE = 6

interface Row {
  key: string
  n: number
  title: string
  meta: string
  right: string
}

/** 07 · Counters above a filterable hairline checklist (K5). */
export function GapChecklist() {
  const [list, setList] = useState<List>('A')
  const [owner, setOwner] = useState('all')
  const [all, setAll] = useState(false)

  const owners = useMemo(() => ['all', ...new Set(checklistB.map((b) => b.owner))], [])
  const rows: Row[] = useMemo(() => {
    if (list === 'A') return checklistA.map((g) => ({ key: `a${g.id}`, n: g.id, title: g.v1, meta: `Fix: ${g.fix}`, right: g.ref }))
    if (list === 'B')
      return checklistB
        .filter((b) => owner === 'all' || b.owner === owner)
        .map((b) => ({ key: `b${b.id}`, n: b.id, title: b.item, meta: `${b.cat} · ${b.when} · Owner: ${b.owner}`, right: b.cost }))
    return checklistC.map((c) => ({ key: `c${c.id}`, n: c.id, title: c.lever, meta: c.why, right: c.value }))
  }, [list, owner])

  const shown = all ? rows : rows.slice(0, VISIBLE)

  return (
    <div>
      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <ProgressRing value={checklistA.length} total={checklistA.length} label="v1.0 gaps closed" />
        <ProgressRing value={checklistB.filter((b) => b.owner).length} total={checklistB.length} label="build items with an owner" />
        <ProgressRing value={checklistC.filter((c) => !c.ref.startsWith('Rec.')).length} total={checklistC.length} label="added levers already addressed in v2.0 (the rest are recommended for later)" />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Pills
          label="Checklist"
          options={[
            { value: 'A', label: 'Gaps' },
            { value: 'B', label: 'Build items' },
            { value: 'C', label: 'Levers' },
          ]}
          value={list}
          onChange={(v) => {
            setList(v)
            setAll(false)
          }}
        />
        {list === 'B' && (
          <label className="inline-flex min-h-11 items-center gap-2 text-small text-sage">
            Owner
            <select value={owner} onChange={(e) => setOwner(e.target.value)} className="fx-input min-h-11 rounded-md border border-hairline bg-ink px-3 text-paper">
              {owners.map((o) => (
                <option key={o} value={o}>{o === 'all' ? 'All owners' : o}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      <ol key={`${list}-${owner}`} className="fx-tab-panel m-0 mt-6 list-none border-t border-hairline p-0" aria-live="polite">
        {shown.map((r) => (
          <li key={r.key} className="fx-bgslide grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-hairline py-4 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-x-6">
            <span className="font-mono text-small text-sage tabular">{String(r.n).padStart(2, '0')}</span>
            <span>
              <span className="block text-body text-paper">{r.title}</span>
              <span className="mt-1 block text-small text-sage">{r.meta}</span>
            </span>
            <span className="col-start-2 mt-1 font-mono text-small text-paper tabular sm:col-start-3 sm:mt-0 sm:text-right">{r.right}</span>
          </li>
        ))}
      </ol>
      {rows.length > VISIBLE && (
        <button type="button" onClick={() => setAll((a) => !a)} aria-expanded={all} className="mt-4 min-h-11 text-small text-paper underline decoration-hairline underline-offset-4 hover:decoration-paper">
          {all ? 'Show fewer' : `Show all (${rows.length})`}
        </button>
      )}
    </div>
  )
}
