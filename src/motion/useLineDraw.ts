import { useCallback, useRef } from 'react'
import { useMotionAllowed } from './useMotionAllowed'
import { useScrollProgress } from './useScrollProgress'

/**
 * Draws an SVG path (`[data-draw]`) in proportion to scroll progress and marks
 * milestones (`[data-at]`, 0–1) as reached when the line passes them.
 */
export function useLineDraw<T extends HTMLElement>() {
  const allowed = useMotionAllowed()
  const onProgress = useCallback((p: number) => {
    const host = ref.current
    if (!host) return
    host.querySelectorAll<SVGPathElement>('[data-draw]').forEach((path) => {
      const len = path.getTotalLength()
      path.style.strokeDasharray = `${len}`
      path.style.strokeDashoffset = `${len * (1 - p)}`
    })
    host.querySelectorAll<HTMLElement>('[data-at]').forEach((m) => {
      m.dataset.reached = Number(m.dataset.at) <= p + 0.02 ? 'true' : 'false'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const ref = useScrollProgress<T>(onProgress, { start: 0.8, end: 0.2, enabled: allowed })
  return ref
}
