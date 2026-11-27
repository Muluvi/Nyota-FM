/**
 * On-air schedule shown in the ON AIR card. Copied from the v2.0 floating
 * radio player (LiveRadioPlayer). Presenter names are illustrative
 * (OPEN_QUESTIONS.md: unverified presenters).
 */
export interface Slot {
  from: number
  to: number
  show: string
  hosts: string
  time: string
}

export const schedule: Slot[] = [
  { from: 6, to: 10, show: 'The Morning Signal', hosts: 'Achieng & Otieno', time: '06:00 – 10:00 EAT' },
  { from: 10, to: 14, show: 'Mulembe Midday & Soko Nyota', hosts: 'Miriam Wekesa', time: '10:00 – 14:00 EAT' },
  { from: 14, to: 18, show: 'Community Desk & Civic Radar', hosts: 'Nyota Newsroom Hub', time: '14:00 – 18:00 EAT' },
  { from: 18, to: 30, show: "The Drive Home & Twang'aa Beats", hosts: 'Juma & Sifa', time: '18:00 – 22:00 EAT' },
]

export function slotAt(date: Date): Slot {
  const h = date.getHours()
  return schedule.find((s) => (h >= s.from && h < s.to) || (s.to > 24 && h < s.to - 24)) ?? schedule[schedule.length - 1]
}

/** Live stream URL. None is configured in the source, so the card shows an offline state. */
export const STREAM_URL: string | null = null
