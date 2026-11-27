/**
 * Five-county population, transcribed from the Part 2.1.1 table
 * (KNBS 2019 Census and county projections). scripts/verify-figures.mjs checks
 * every value against the pre-redesign source text.
 */
export interface County {
  name: string
  census2019: string
  projection2026: string
  estimated: boolean
  cluster: string
}

export const counties: County[] = [
  { name: 'Kakamega', census2019: '1,867,579', projection2026: '2,110,000', estimated: true, cluster: 'Maragoli, Isukha, Idakho, Tiriki' },
  { name: 'Bungoma', census2019: '1,670,570', projection2026: '1,932,168', estimated: false, cluster: 'Bukusu, Tachoni, Sabaot' },
  { name: 'Trans Nzoia', census2019: '990,341', projection2026: '1,080,000', estimated: true, cluster: 'Bukusu, Sabaot, mixed' },
  { name: 'Busia', census2019: '893,681', projection2026: '990,000', estimated: true, cluster: 'Samia, Khayo, Marachi, Teso' },
  { name: 'Vihiga', census2019: '590,013', projection2026: '650,000', estimated: true, cluster: 'Maragoli, Tiriki, Banyore' },
]

/** Numeric 2019 value, for bar scaling only. */
export const countyScale = (c: County): number => Number(c.census2019.replace(/,/g, ''))

export const countyTotals = { census2019: '6,012,184', projection2026: '≈ 6,762,168' }
