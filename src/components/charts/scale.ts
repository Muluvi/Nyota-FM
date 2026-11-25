/** Minimal linear scale (no chart library): maps [d0, d1] onto [r0, r1]. */
export function linear(domain: [number, number], range: [number, number]) {
  const [d0, d1] = domain
  const [r0, r1] = range
  const span = d1 - d0 || 1
  return (v: number) => r0 + ((v - d0) / span) * (r1 - r0)
}

/** Round tick values covering [0, max]. */
export function ticks(max: number, count = 4): number[] {
  if (max <= 0) return [0]
  const raw = max / count
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw)!
  const out: number[] = []
  for (let v = 0; v <= max + 1e-9; v += step) out.push(+v.toFixed(10))
  if (out[out.length - 1] < max) out.push(+(out[out.length - 1] + step).toFixed(10))
  return out
}
