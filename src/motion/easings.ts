/** Shared motion tokens. Every animation must orient, reveal or explain. */
export const duration = {
  fast: 200,
  base: 600,
  slow: 900,
  count: 1200,
  dial: 1400,
} as const

export const ease = {
  outExpo: 'outExpo',
  outCubic: 'outCubic',
  inOutSine: 'inOutSine',
  dial: 'outElastic(1, .6)',
} as const

export const stagger = {
  letters: 60,
  items: 80,
  menu: 40,
  stats: 100,
} as const
