/** House-style currency for values computed at runtime (model outputs). */
export function kshShort(value: number): string {
  const sign = value < 0 ? '−' : ''
  const v = Math.abs(value)
  const cur = 'KSh'
  if (v >= 1_000_000_000) return `${sign}${cur} ${(v / 1_000_000_000).toFixed(1)}B`
  if (v >= 1_000_000) return `${sign}${cur} ${(v / 1_000_000).toFixed(2).replace(/0$/, '')}M`
  if (v >= 1_000) return `${sign}${cur} ${Math.round(v / 1_000)}K`
  return `${sign}${cur} ${Math.round(v)}`
}
