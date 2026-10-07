export type Section = {
  id: string
  number: string
  title: string
  shortTitle: string
}

export const sections: readonly Section[] = [
  { id: 'part-1', number: '01', title: 'The Objectives — 5 Strategic Mandates', shortTitle: 'Objectives' },
  { id: 'part-2', number: '02', title: 'Sourced Master Data Room & Benchmark Tables', shortTitle: 'Master data' },
  { id: 'part-3', number: '03', title: 'Data Analysis, Sensitivity & Payback Simulator', shortTitle: 'Payback' },
  { id: 'part-4', number: '04', title: 'The Commercial Opportunities & Expected Value Matrix', shortTitle: 'Opportunities' },
  { id: 'part-5', number: '05', title: 'Action Execution Plans (21 Concrete Strategies)', shortTitle: 'Strategies' },
  { id: 'part-6', number: '06', title: 'Studio Build, Phased Capex & Governance Roadmap', shortTitle: 'The build' },
  { id: 'part-7', number: '07', title: 'The Gap Audit (Comprehensive Centerpiece Checklists)', shortTitle: 'Gap audit' },
  { id: 'part-asks', number: '08', title: 'Source List & Ownership Asks', shortTitle: 'Asks' },
] as const

export const sectionIds = sections.map(({ id }) => id)
