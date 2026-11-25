/**
 * Numeric series for charts. Each series names the fact/source it comes from, so
 * charts and text never disagree. Values in KES millions unless stated.
 */
export type Series = { id: string; title: string; unit: string; sourceId: string; note?: string; points: { label: string; value: number }[] }

export const radioSectors: Series = {
  id: 'radio-sectors',
  title: 'Radio ad spend by sector, Apr–Jun 2026',
  unit: 'KES M',
  sourceId: 'ca-amr-q4-fy2526',
  note: 'National; total KES 5,073M',
  points: [
    { label: 'Banking & Finance', value: 1291 },
    { label: 'Servicing', value: 623 },
    { label: 'Agriculture & gardening equipment', value: 494 },
    { label: 'Entertainment', value: 444 },
    { label: 'Media', value: 354 },
    { label: 'Foods', value: 332 },
  ],
}

export const dailyListenership: Series = {
  id: 'daily-listenership',
  title: 'Daily radio listenership, Kenya',
  unit: '%',
  sourceId: 'mck-som-2025-star',
  note: 'MCK State of the Media (daily listening)',
  points: [
    { label: '2023', value: 75 },
    { label: '2024', value: 57 },
    { label: '2025', value: 41 },
  ],
}

export const radioReach: Series = {
  id: 'radio-reach',
  title: 'Radio reach, Apr–Jun 2026',
  unit: '%',
  sourceId: 'ca-amr-q4-fy2526',
  note: 'CA Audience Measurement, Table 3 (reach, not daily listening)',
  points: [
    { label: 'Western', value: 83 },
    { label: 'Lake', value: 81 },
    { label: 'Rift', value: 80 },
    { label: 'National', value: 75 },
    { label: 'Nairobi', value: 63 },
  ],
}

export const adMarket: Series = {
  id: 'ad-market',
  title: 'Mainstream ad spend by medium, 2025',
  unit: 'KES B',
  sourceId: 'khusoko-adspend-2025',
  note: 'ReelAnalytics; total KES 66.3B (−22%)',
  points: [
    { label: 'TV', value: 39.1 },
    { label: 'Radio', value: 25.9 },
    { label: 'Outdoor', value: 6.4 },
    { label: 'Print', value: 1.4 },
  ],
}

export const mobileConnections: Series = {
  id: 'mobile-connections',
  title: 'Mobile connections, June 2026',
  unit: 'M',
  sourceId: 'techtrendske-smartphones',
  note: 'Connections, not people',
  points: [
    { label: 'Smartphones', value: 52.26 },
    { label: 'Feature phones', value: 27.42 },
  ],
}

/** KNBS 2019 Census population by county (persons). */
export const countyPopulation: Series = {
  id: 'county-population',
  title: 'Population by county, 2019 Census',
  unit: 'people',
  sourceId: 'knbs-census-2019',
  points: [
    { label: 'Kakamega', value: 1_867_579 },
    { label: 'Bungoma', value: 1_670_570 },
    { label: 'Trans Nzoia', value: 990_341 },
    { label: 'Busia', value: 893_681 },
    { label: 'Vihiga', value: 590_013 },
  ],
}
