/**
 * Real organisations that may appear on the site. A brand may be shown as a Nyota
 * sponsor, endorser or partner only when `contracted: true` and evidence exists.
 * Otherwise it may appear only as a sourced market fact. `scripts/check-data.mjs`
 * fails the build if an uncontracted brand appears in a component without `// data-ok`.
 */
export type Partner = { name: string; pattern: string; contracted: boolean; evidenceUrl?: string }

export const partners: readonly Partner[] = [
  { name: 'Safaricom', pattern: 'Safaricom', contracted: false },
  { name: 'Equity Bank', pattern: 'Equity Bank', contracted: false },
  { name: 'Kenya Seed Company', pattern: 'Kenya Seed', contracted: false },
  { name: 'KCB', pattern: '\\bKCB\\b', contracted: false },
  { name: 'One Acre Fund', pattern: 'One Acre', contracted: false },
  { name: 'Kenchic', pattern: 'Kenchic', contracted: false },
  { name: 'Unga', pattern: 'Unga Limited', contracted: false },
  { name: 'TotalEnergies', pattern: 'TotalEnergies', contracted: false },
  { name: 'Co-operative Bank', pattern: 'Co-op(erative)? Bank', contracted: false },
  { name: 'New KCC', pattern: 'New KCC', contracted: false },
  { name: 'd.light', pattern: 'D\\.?Light', contracted: false },
  { name: 'Farm Radio International', pattern: 'Farm Radio International', contracted: false },
  { name: 'BBC Media Action', pattern: 'BBC Media Action', contracted: false },
]
