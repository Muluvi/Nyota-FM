/**
 * Proposed weekday programme clock (East Africa Time). Hosts are TBC until
 * contracted; names shown elsewhere on the site are illustrative.
 */
export type Daypart = {
  start: number // hour, inclusive (EAT)
  end: number // hour, exclusive (EAT)
  show: string
  host: string
}

export const weekdayDayparts: readonly Daypart[] = [
  { start: 6, end: 10, show: 'The Morning Signal (Kumekucha)', host: 'Host TBC' },
  { start: 10, end: 14, show: 'Mulembe Midday & Soko Nyota', host: 'Host TBC' },
  { start: 14, end: 16, show: 'The Community Desk & Civic Radar', host: 'Nyota newsroom' },
  { start: 16, end: 19, show: 'Drive Home 107.3 (Kurejea Nyumbani)', host: 'Host TBC' },
  { start: 19, end: 22, show: 'The Night Beacon (Mwangaza wa Usiku)', host: 'Host TBC' },
]

const overnight: Daypart = { start: 22, end: 6, show: 'Nyota Overnight', host: 'Automated playout' }

/** Current hour in Africa/Nairobi regardless of the viewer's device time zone. */
export function eatHour(now: Date = new Date()): number {
  const hour = new Intl.DateTimeFormat('en-KE', {
    timeZone: 'Africa/Nairobi',
    hour: 'numeric',
    hourCycle: 'h23',
  }).format(now)
  return Number.parseInt(hour, 10) % 24
}

export function currentDaypart(now: Date = new Date()): Daypart {
  const h = eatHour(now)
  return weekdayDayparts.find((d) => h >= d.start && h < d.end) ?? overnight
}

export const formatHour = (h: number) => `${String(h).padStart(2, '0')}:00`
