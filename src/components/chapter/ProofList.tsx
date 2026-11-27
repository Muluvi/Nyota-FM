import type { ProofPoint } from '../../content/chapters/types'
import { Figure } from '../ui/Figure'
import { Rich } from '../ui/Rich'
import { Sparkline } from '../ui/Sparkline'

/** At most three proof points: number, label, source marker (via Figure). */
export function ProofList({ proof }: { proof: readonly ProofPoint[] }) {
  return (
    <ul className="m-0 grid list-none gap-px overflow-visible border-y border-hairline p-0 sm:grid-cols-3">
      {proof.slice(0, 3).map((p) => (
        <li key={p.figure} className="reveal print-avoid border-b border-hairline py-4 last:border-b-0 sm:border-b-0 sm:py-6 sm:border-r sm:px-3 sm:first:pl-0 sm:last:border-r-0">
          {/* B zoom-in on scroll; C 3D tilt, card lift and border glow; D count-up that resets on re-entry */}
          <div data-fx="zoom" className="h-full">
            <div className="fx-tilt fx-lift fx-glow relative flex h-full flex-col gap-3 rounded-md p-2 sm:p-3">
              <span className="fx-depth font-display text-[2.25rem] leading-none text-paper sm:text-heading">
                <Figure id={p.figure} countUp />
              </span>
              <span className="text-[0.9375rem] leading-snug text-sage sm:text-small">
                <Rich text={p.label} />
              </span>
              {p.trend && <Sparkline values={p.trend} label={`${p.trendLabel ?? 'Trend'}: ${p.trend.join(', ')}`} className="mt-auto text-sage" />}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
