import { sixAsks } from './sourceList'

/**
 * The six asks of ownership. Title, description and timing come verbatim from
 * the v2.0 source list. The source gives no owner or measure per ask, so each
 * is mapped from the lead and KPI of the matching strategy (Part 5) or
 * governance section (Part 6). Mapped fields are flagged in the UI and logged
 * in docs/OPEN_QUESTIONS.md.
 */
export interface Ask {
  id: number
  title: string
  desc: string
  when: string
  owner: string
  measure: string
  mappedFrom: string
  detailHref: string
}

const mapping: Record<number, Pick<Ask, 'owner' | 'measure' | 'mappedFrom' | 'detailHref'>> = {
  1: {
    owner: 'Ownership (board)',
    measure: 'Market-leadership assertion and independent GeoPoll audience audit in Q4 2027',
    mappedFrom: 'Roadmap Q4 2027 (6.1)',
    detailHref: '#build-detail',
  },
  2: {
    owner: 'Lead Station Engineer / IT-AV Lead',
    measure: 'Phase 1 installation complete by Month 4',
    mappedFrom: 'Strategy 5.2',
    detailHref: '#build-detail',
  },
  3: {
    owner: 'Head of Digital',
    measure: 'WhatsApp BSP onboarded in Q1 2026; USSD shortcode live on air by Q3 2026',
    mappedFrom: 'Strategies 5.5 and 5.6; checklist B items 36–37',
    detailHref: '#strategies-detail',
  },
  4: {
    owner: 'Head of Digital + Content Producer',
    measure: 'Four shows on air and two title sponsors signed by Month 6',
    mappedFrom: 'Strategy 5.1 milestone scorecard',
    detailHref: '#strategies-detail',
  },
  5: {
    owner: 'General Manager + Firefly Advisory',
    measure: 'GAA registration secured (Q2 2026 in 5.14; Q2 2027 in Part 3)',
    mappedFrom: 'Strategy 5.14; Part 3.4',
    detailHref: '#strategies-detail',
  },
  6: {
    owner: 'Ownership + Firefly + Station GM',
    measure: 'Monthly committee meetings releasing budget phase-gates',
    mappedFrom: 'Governance 6.5',
    detailHref: '#build-detail',
  },
}

export const asks: Ask[] = sixAsks.map((a) => ({
  id: a.id,
  title: a.title,
  desc: a.desc,
  when: a.urgency,
  ...mapping[a.id],
}))
