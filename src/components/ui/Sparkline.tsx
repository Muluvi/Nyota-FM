interface SparklineProps {
  values: readonly number[]
  label: string
  className?: string
}

/** Tiny trend line. The final point is highlighted; the label is the text alternative. */
export function Sparkline({ values, label, className = '' }: SparklineProps) {
  const w = 120
  const h = 32
  const min = Math.min(...values)
  const max = Math.max(...values)
  const pts = values.map((v, i) => {
    const x = (i / Math.max(1, values.length - 1)) * (w - 6) + 3
    const y = h - 4 - ((v - min) / Math.max(1, max - min)) * (h - 8)
    return [x, y] as const
  })
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const [lx, ly] = pts[pts.length - 1]
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" aria-label={label} className={className}>
      <path d={d} fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r={3} className="fill-brass" />
    </svg>
  )
}
