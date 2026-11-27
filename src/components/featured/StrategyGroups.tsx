import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { strategies, type StrategyItem } from '../../content/data/strategies'
import { Counter } from '../ui/Counter'

type Category = StrategyItem['category']
const order: Category[] = ['Commercial & Revenue', 'Digital & Mobile', 'Studio Build', 'Content & Programming', 'Community & Governance']

/** 05 · "(21)" counter with strategies grouped by workstream as expandable rows (K5). */
export function StrategyGroups() {
  const [open, setOpen] = useState<Category | null>('Commercial & Revenue')
  return (
    <div>
      <Counter value={String(strategies.length)} label="costed strategies in five workstreams" />
      <ul className="m-0 mt-6 list-none border-t border-hairline p-0">
        {order.map((cat) => {
          const items = strategies.filter((s) => s.category === cat)
          const isOpen = open === cat
          const panel = `ws-${cat.replace(/\W+/g, '-')}`
          return (
            <li key={cat} className="border-b border-hairline">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : cat)}
                className="flex min-h-14 w-full items-center gap-4 py-4 text-left"
              >
                <span className="w-10 font-mono text-heading text-paper tabular">{items.length}</span>
                <span className="flex-1 text-body font-medium text-paper">{cat}</span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-paper" aria-hidden="true">
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <ol id={panel} hidden={!isOpen} className="m-0 mb-5 list-none space-y-0 p-0 sm:pl-14">
                {items.map((s) => (
                  <li key={s.id} className="grid gap-1 border-t border-hairline/60 py-3 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-4">
                    <span className="font-mono text-small text-sage tabular">{s.num}</span>
                    <span className="text-body text-paper">
                      {s.title}
                      <span className="block text-small text-sage">Lead: {s.execution.lead}</span>
                    </span>
                    <span className="text-small text-sage sm:max-w-[14rem] sm:text-right">{s.execution.timeline}</span>
                  </li>
                ))}
              </ol>
            </li>
          )
        })}
      </ul>
      <p className="m-0 mt-4 text-small text-sage">
        Budgets, data receipts and milestone KPIs for each strategy are in the{' '}
        <a href="#strategies-detail" className="text-paper underline decoration-hairline underline-offset-4 hover:decoration-paper">detail</a>.
      </p>
    </div>
  )
}
