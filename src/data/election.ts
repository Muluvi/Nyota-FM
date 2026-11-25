/** IEBC 2027 general-election calendar (Business Today, accessed 2026-11-25). */
export const election = {
  sourceId: 'businesstoday-iebc-2027',
  primariesBy: '2027-05-08',
  campaignStart: '2027-05-29',
  campaignEnd: '2027-08-07',
  electionDay: '2027-08-10',
} as const

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-KE', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`))
