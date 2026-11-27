import { ArrowUpRight } from 'lucide-react'
import { toolById } from './registry'
import { useSettings } from '../../state/settings'

/** A compact row of tools, used where the detail layer once embedded widgets inline. */
export function ToolkitInline({ ids }: { ids: string[] }) {
  const { openSheet } = useSettings()
  const list = ids.map(toolById).filter((t): t is NonNullable<typeof t> => Boolean(t))
  if (!list.length) return null
  return (
    <div className="not-prose rounded-md border border-hairline p-4 sm:p-5">
      <p className="m-0 mb-3 text-small text-sage">Interactive tools for this section (open in a focused view):</p>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {list.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => openSheet(t.id)}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-4 text-small text-paper hover:border-paper"
            >
              {t.name}
              {t.illustrative && <span className="text-xs text-sage-dim">(illustrative)</span>}
              <ArrowUpRight size={14} aria-hidden="true" className="text-brass" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
