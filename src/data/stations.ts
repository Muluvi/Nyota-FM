/**
 * Stations receivable in or around Bungoma, for the FM dial. Frequencies are from
 * the verified register (audit §8 D-14); ownership is shown only where sourced.
 * Audience shares are a Tier 0 gap until a Western Kenya survey is commissioned.
 */
export type Station = {
  freq: number
  name: string
  owner: string
  note: string
  sourceId?: string
  isNyota?: boolean
}

export const stations: readonly Station[] = [
  { freq: 87.6, name: 'WAI FM', owner: 'Not verified', note: 'Bungoma-area station' },
  { freq: 89.6, name: 'Sulwe FM', owner: 'Royal Media Services', note: 'Luhya-language station', sourceId: 'citizen-sulwe' },
  { freq: 90.2, name: 'Mumbo FM', owner: 'Sister station to West FM', note: 'Bukusu-language station' },
  { freq: 91.3, name: 'Radio Simba', owner: 'Not verified', note: 'Bungoma-area station' },
  { freq: 94.9, name: 'West FM', owner: 'Independent (Western Kenya)', note: 'Main frequency; also 104.1' },
  { freq: 98.3, name: 'Sema FM', owner: 'Not verified', note: 'Bungoma-area station' },
  { freq: 99.0, name: 'Mulembe FM', owner: 'Royal Media Services', note: 'Luhya-language; 99.0 / 99.2 in Western, 95.8 Eldoret, 97.9 Nairobi', sourceId: 'citizen-mulembe' },
  { freq: 100.0, name: 'Pepea Radio', owner: 'Not verified', note: 'Bungoma-area station' },
  { freq: 100.5, name: 'Ingo FM', owner: 'Not verified', note: 'Also 103.5' },
  { freq: 107.3, name: 'Nyota FM', owner: 'Nyota Frequency Modulation Ltd', note: 'Bungoma; Swahili with Bukusu', isNyota: true },
  { freq: 107.9, name: 'Khendo FM', owner: 'Not verified', note: 'Bungoma-area station' },
]

export const DIAL_MIN = 87.5
export const DIAL_MAX = 108
