/**
 * Headline counts for the first screen. Kept here (not derived) so the hero does not pull
 * the full source and strategy lists into the first-view bundle. tests/unit/data.test.ts
 * fails if any count drifts from the real lists.
 */
export const counts = {
  sources: 50,
  strategies: 21,
  buildChecklistItems: 40,
} as const
