import { useCountUp } from '../../motion/useCountUp'

interface ProgressRingProps {
  value: number
  total: number
  label: string
}

/** D. Circular progress: the stroke draws to value/total when revealed; the count runs up. */
export function ProgressRing({ value, total, label }: ProgressRingProps) {
  const ref = useCountUp<HTMLSpanElement>()
  const r = 30
  const len = 2 * Math.PI * r
  return (
    <figure className="fx-ring m-0 flex items-center gap-4" aria-label={`${value} of ${total} ${label}`}>
      <span className="relative grid h-20 w-20 shrink-0 place-items-center">
        <svg viewBox="0 0 72 72" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="36" cy="36" r={r} fill="none" className="stroke-hairline" strokeWidth="5" />
          <circle cx="36" cy="36" r={r} fill="none" className="fx-ring-value stroke-brass" strokeWidth="5" strokeLinecap="round" style={{ ['--len' as string]: len, ['--v' as string]: value / total }} />
        </svg>
        <span ref={ref} className="font-mono text-body text-paper tabular" aria-hidden="true">
          {value}
        </span>
      </span>
      <figcaption className="text-small text-sage">
        <span className="block text-paper">of {total}</span>
        {label}
      </figcaption>
    </figure>
  )
}
