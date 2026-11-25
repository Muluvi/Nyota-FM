/**
 * The single list of board asks. SourceListAndAsks, ExecutiveBriefingMode and the
 * presentation deck all read from here so the count and wording never diverge.
 * Asks are decisions; the payback model is evidence, not an ask.
 */
import { phaseTotal } from './capex.ts'
import { formatKsh, toMillions } from './format.ts'

const p1 = phaseTotal('P1')

export type Ask = {
  id: number
  title: string
  resolution: string // wording for the printable resolution sheet
  detail: string
  amount?: string
  owner: string
  timing: string
  sectionId: string
}

export const asks: readonly Ask[] = [
  {
    id: 1,
    title: 'Approve the transformation thesis and 24-month roadmap',
    resolution: 'Approve the Twang\'aa v2 thesis and the 24-month roadmap, running from Month 0 (board approval).',
    detail:
      'Endorse the v2 thesis and the roadmap, with every milestone dated relative to Month 0 (assumed January 2027) and anchored to the IEBC 2027 election calendar.',
    owner: 'Board',
    timing: 'Month 0',
    sectionId: 'plan',
  },
  {
    id: 2,
    title: 'Commit Studio Phase 1 capital',
    resolution: `Approve Phase 1 visual-radio capex not exceeding KSh ${toMillions(p1.high)} M.`,
    detail:
      `Commit capital for Studio Phase 1 within the quoted envelope of ${formatKsh(p1.low)}–${p1.high.toLocaleString('en-KE')} (PTZ cameras, switcher, lighting, acoustics). Phases 2 and 3 return to the board once their gates are met.`,
    amount: `≤ KSh ${toMillions(p1.high)} M`,
    owner: 'Board → Station Engineer',
    timing: 'Month 0–1',
    sectionId: 'build',
  },
  {
    id: 3,
    title: 'Authorise WhatsApp, USSD and ODPC registration',
    resolution: 'Authorise engagement of a WhatsApp Business Solution Provider, a USSD code, and ODPC registration before any listener data is collected.',
    detail:
      'Engage a WhatsApp Business Solution Provider (per-message pricing), apply for a USSD code via Africa\'s Talking (Safaricom dedicated code KSh 70,000/month), and register with the ODPC as data controller before the listener database opens.',
    owner: 'Head of Digital',
    timing: 'Month 1',
    sectionId: 'plan',
  },
  {
    id: 4,
    title: 'Adopt the four pre-recorded formats',
    resolution: 'Adopt the four pre-recorded formats as the commercial content spine.',
    detail:
      'Asubuhi ya Imani, Hapa Tulipo Mix, Sauti ya Nchi and Wanawake wa Twang\'aa become sponsorable, repeatable content that can be sold ahead of air.',
    owner: 'Programme Controller',
    timing: 'Month 2',
    sectionId: 'plan',
  },
  {
    id: 5,
    title: 'Open the government and county commercial desk',
    resolution: 'Authorise the government and county commercial desk, including GAA and county supplier filings.',
    detail:
      'File with the Government Advertising Agency (which authorises national-government advertising) and pursue county supplier prequalification separately, starting with Bungoma and Kakamega.',
    owner: 'General Manager',
    timing: 'Month 1–3',
    sectionId: 'plan',
  },
  {
    id: 6,
    title: 'Constitute the Joint Steering Committee and fund the baseline',
    resolution:
      'Constitute the Joint Steering Committee and approve a baseline audit and Western Kenya audience survey budget of KSh 0.5–1 M.',
    detail:
      'Appoint ownership representatives to a monthly committee with Firefly Management and the Station GM, and fund the audited revenue baseline and audience survey that turn the plan\'s Tier 0 gaps into evidence.',
    amount: 'KSh 0.5–1 M',
    owner: 'Board + Firefly Management',
    timing: 'Month 0',
    sectionId: 'risks',
  },
]
