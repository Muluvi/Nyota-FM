import type { ProofPoint } from '../../content/chapters/types'
import { Figure } from '../ui/Figure'
import { Rich } from '../ui/Rich'
import { Sparkline } from '../ui/Sparkline'

/** At most three proof points: number, label, source marker (via Figure). */
export function ProofList({ proof }: { proof: readonly ProofPoint[] }) {
  return (
    <ul className="m-0 grid list-none gap-px overflow-visible border-y border-hairline p-0 sm:grid-cols-3">
      {proof.slice(0, 3).map((p) => (
        <li key={p.figure} className="reveal print-avoid flex flex-col gap-3 border-hairline py-6 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
          <span className="font-display text-heading leading-none text-paper">
            <Figure id={p.figure} />
          </span>
          <span className="text-small text-sage">
            <Rich text={p.label} />
          </span>
          {p.trend && <Sparkline values={p.trend} label={`${p.trendLabel ?? 'Trend'}: ${p.trend.join(', ')}`} className="mt-auto text-sage" />}
        </li>
      ))}
    </ul>
  )
}
