import { useEffect, useRef } from 'react'
import { animate } from 'animejs/animation'
import { stagger } from 'animejs/utils'
import { duration, stagger as gaps } from './easings'
import { useMotionAllowed } from './useMotionAllowed'

/** Letters (`.mask-line > span`) rise from behind their mask on mount. */
export function useMaskRise<T extends HTMLElement>(delay = 150) {
  const ref = useRef<T>(null)
  const allowed = useMotionAllowed()

  useEffect(() => {
    const el = ref.current
    if (!el || !allowed) return
    const letters = el.querySelectorAll<HTMLElement>('.mask-line > span')
    const anim = animate(letters, {
      translateY: ['105%', '0%'],
      duration: duration.slow,
      delay: stagger(gaps.letters, { start: delay }),
      ease: 'outExpo',
    })
    return () => {
      anim.revert()
    }
  }, [allowed, delay])

  return ref
}
