export type Section = {
  id: string
  number: string
  title: string
  shortTitle: string
  /** Main chapters appear in the top navbar; appendices only in the rail, dock and footer. */
  appendix?: boolean
}

/** The single source for page order and every navigation list (navbar, rail, dock, footer). */
export const sections: readonly Section[] = [
  { id: 'overview', number: '00', title: 'Cover & Decision Summary', shortTitle: 'Overview' },
  { id: 'situation', number: '01', title: 'The Situation: Market Evidence', shortTitle: 'Situation' },
  { id: 'objectives', number: '02', title: 'The Objectives (A–E)', shortTitle: 'Objectives' },
  { id: 'opportunity', number: '03', title: 'The Opportunity: Revenue Levers & Rate Card', shortTitle: 'Opportunity' },
  { id: 'plan', number: '04', title: 'The Plan: 21 Strategies from Month 0', shortTitle: 'Plan' },
  { id: 'build', number: '05', title: 'The Build: Studio, Power, OB & People', shortTitle: 'Build' },
  { id: 'money', number: '06', title: 'The Money: Revenue Index & Payback', shortTitle: 'Money' },
  { id: 'risks', number: '07', title: 'Risks & Gap Audit', shortTitle: 'Risks' },
  { id: 'asks', number: '08', title: 'The Asks & Governance', shortTitle: 'Asks' },
  { id: 'appendix-data', number: 'A', title: 'Appendix A: Data Room & Sources', shortTitle: 'Data room', appendix: true },
  { id: 'appendix-preview', number: 'B', title: 'Appendix B: Product Preview', shortTitle: 'Preview', appendix: true },
] as const

export const sectionIds = sections.map(({ id }) => id)
export const chapterSections = sections.filter((s) => !s.appendix)
