/** Brand tokens. Must match @theme in src/index.css (checked by tests/unit/brand.test.ts). */
export const palette = [
  { token: 'ink', hex: '#090B0A', role: 'Page background' },
  { token: 'ink-2', hex: '#111513', role: 'Panels' },
  { token: 'paper', hex: '#F7F8F4', role: 'Body text' },
  { token: 'sage', hex: '#B4C2B9', role: 'Secondary text' },
  { token: 'sage-dim', hex: '#8A9A90', role: 'Captions' },
  { token: 'brass', hex: '#D6A75C', role: 'Accent, Tier 2' },
  { token: 'moss', hex: '#76A486', role: 'Positive, Tier 1' },
  { token: 'brick', hex: '#9B624C', role: 'Fills, Tier 0' },
  { token: 'brick-text', hex: '#C47F66', role: 'Warning text' },
  { token: 'hairline', hex: '#27312C', role: 'Rules and borders' },
] as const

export const typefaces = [
  { role: 'Display', family: 'Instrument Serif', note: 'Self-hosted, regular and italic' },
  { role: 'Body', family: 'DM Sans (variable)', note: 'Self-hosted' },
  { role: 'Figures', family: 'System monospace', note: 'Tabular numerals; DM Mono dropped' },
] as const

const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}

/** WCAG contrast ratio between two hex colours. */
export function contrast(a: string, b: string): number {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}
