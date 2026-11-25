/**
 * Planning convention (decision D1): Month 0 is the month of board approval,
 * assumed January 2027. Every plan date is a month offset from Month 0.
 */
export const MONTH_0 = { year: 2027, month: 1 } as const // January 2027
export const MONTH_0_ISO = '2027-01'
export const MONTH_0_LABEL = 'Month 0 (board approval, assumed January 2027)'

/** Calendar date of the start of plan month `m` (m = 1 is the first month after approval). */
export function monthToDate(m: number): Date {
  return new Date(Date.UTC(MONTH_0.year, MONTH_0.month - 1 + Math.max(0, m - 1), 1))
}

/** "Q2 2027" for plan month m. */
export function monthToQuarterLabel(m: number): string {
  const d = monthToDate(m)
  return `Q${Math.floor(d.getUTCMonth() / 3) + 1} ${d.getUTCFullYear()}`
}

/** "Months 4–6 (Q2 2027)". */
export function monthRangeLabel(start: number, end: number): string {
  const q1 = monthToQuarterLabel(start)
  const q2 = monthToQuarterLabel(end)
  const months = start === end ? `Month ${start}` : `Months ${start}–${end}`
  return `${months} (${q1 === q2 ? q1 : `${q1}–${q2}`})`
}
