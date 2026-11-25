/** The top risks shown in the Decision Summary (detail in chapter 07). */
export const topRisks = [
  {
    id: 'gaa-county',
    title: 'Government and county revenue does not materialise',
    detail: 'GAA and county work is relationship-dependent and politically exposed; without it the non-spot mix stalls near the worst case.',
    mitigation: 'GM leads liaison from Month 1; county prequalification filed in Months 1–3.',
  },
  {
    id: 'no-baseline',
    title: 'No audited revenue baseline',
    detail: 'Every growth multiple and the payback month depend on a baseline the station has not yet documented.',
    mitigation: 'Ask 6 funds the baseline audit and audience survey in Month 0–1.',
  },
  {
    id: 'daily-listening',
    title: 'Daily radio listening keeps falling',
    detail: 'Daily listenership fell from 75% to 41% nationally (MCK, 2023–2025), even though weekly reach in Western Kenya is 83% (CA).',
    mitigation: 'WhatsApp and USSD capture listeners into a consented contact base from Month 3.',
  },
] as const
