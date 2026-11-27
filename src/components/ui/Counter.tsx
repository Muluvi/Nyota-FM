import { useCountUp } from '../../motion/useCountUp'

/** Parenthesised signpost counter, e.g. "(21) strategies". */
export function Counter({ value, label, tone = 'dark' }: { value: string; label: string; tone?: 'dark' | 'light' }) {
  const ref = useCountUp<HTMLSpanElement>()
  return (
    <p className={`m-0 flex items-baseline gap-2 font-mono text-small ${tone === 'light' ? 'text-ink-on-paper' : 'text-sage'}`}>
      <span className={`text-heading tabular ${tone === 'light' ? 'text-ink' : 'text-paper'}`}>
        (<span ref={ref}>{value}</span>)
      </span>
      <span>{label}</span>
    </p>
  )
}
