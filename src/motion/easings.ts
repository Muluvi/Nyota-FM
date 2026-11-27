/**
 * Shared motion tokens. Every animation must orient, reveal or explain.
 * Easing curves live in CSS (--ease-out-expo, --ease-out-cubic in index.css);
 * JS-driven motion (count-up) reads its timing from here.
 */
export const duration = {
  fast: 200,
  base: 600,
  slow: 900,
  count: 1200,
  dial: 1400,
} as const
