/**
 * Glossary: plain-English definitions shown as dotted-underline tooltips.
 * Kiswahili glosses come from the Twang'aa lexicon in the v2.0 proposal.
 */
export interface GlossaryEntry {
  term: string
  definition: string
}

export const glossary = {
  capex: { term: 'Capex', definition: 'Capital expenditure: one-off spending on equipment and fit-out, recovered over time from revenue.' },
  ebitda: { term: 'EBITDA', definition: 'Earnings before interest, tax, depreciation and amortisation: operating profit before financing and accounting charges.' },
  'non-spot': { term: 'Non-spot revenue', definition: 'Income that is not sold as 30-second radio adverts: sponsored shows, outside broadcasts, WhatsApp and USSD products, digital and events.' },
  spot: { term: 'Spot advertising', definition: 'Traditional radio adverts sold per 30-second slot, priced by daypart.' },
  ussd: { term: 'USSD', definition: 'Menu codes such as *123# that work on any phone without mobile data. Reaches feature-phone listeners.' },
  bsp: { term: 'WhatsApp BSP', definition: "Business Solution Provider: an approved partner (here Africa's Talking) that connects the station to the WhatsApp Business API." },
  gaa: { term: 'GAA', definition: 'Government Advertising Agency: national register that media must join to carry government campaigns.' },
  ifmis: { term: 'IFMIS', definition: 'Integrated Financial Management Information System: the government system for supplier prequalification and county tenders.' },
  'ob-van': { term: 'OB van', definition: 'Outside broadcast vehicle: a mobile studio used to broadcast live from markets, shows and events.' },
  ob: { term: 'Outside broadcast (OB)', definition: 'A live broadcast from a location outside the studio, usually sponsored.' },
  'ev-matrix': { term: 'EV matrix', definition: 'Expected-value ranking: (expected value × probability of success) ÷ time to revenue.' },
  'cmo-royalties': { term: 'CMO royalties', definition: 'Fees paid to collective management organisations (MCSK, KAMP, PRISK, PAVRISK) for the right to broadcast or stream music.' },
  nls: { term: 'Net Listener Score', definition: 'The v2.0 loyalty measure combining weekly listeners, listening hours, repeat callers and cross-platform engagement.' },
  odpc: { term: 'ODPC', definition: 'Office of the Data Protection Commissioner. Registration is required before collecting listener contacts.' },
  ptz: { term: 'PTZ camera', definition: 'Pan-tilt-zoom camera controlled remotely; the basis of visual radio.' },
  dam: { term: 'DAM', definition: 'Digital asset management: a searchable archive of every broadcast and clip.' },
  rpm: { term: 'RPM', definition: 'Revenue per thousand views actually paid to the channel owner.' },
  karf: { term: 'KARF', definition: 'Kenya Audience Research Foundation: industry audience measurement panel.' },
  'tier-1': { term: 'Tier 1', definition: 'Hard data traceable to a named institution or vendor quote.' },
  'tier-2': { term: 'Tier 2', definition: 'A modelled estimate with its method and inputs stated.' },
  'tier-0': { term: 'Tier 0', definition: 'A declared data gap that needs field research before it can be filled.' },
  'hapo-tulipo': { term: 'Hapo Tulipo', definition: 'Kiswahili: "Right where we are", on the ground with the people.' },
  twangaa: { term: "Twang'aa", definition: 'Kiswahili: to shine brightly, radiate excellence, illuminate the community.' },
} as const satisfies Record<string, GlossaryEntry>

export type GlossaryKey = keyof typeof glossary

export function isGlossaryKey(key: string): key is GlossaryKey {
  return key in glossary
}
