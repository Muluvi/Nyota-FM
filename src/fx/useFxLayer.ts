import { useEffect } from 'react'
import { useMotionAllowed } from '../motion/useMotionAllowed'
import { useSettings } from '../state/settings'

/** Loads the runtime effects chunk when the browser is idle, only if motion is wanted. */
export function useFxLayer(ready: boolean) {
  const allowed = useMotionAllowed()
  const { motion, sound } = useSettings()

  useEffect(() => {
    if (!ready || !allowed || motion === 'calm') return
    let cleanup: (() => void) | undefined
    let cancelled = false
    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches
    const hasIdle = typeof window.requestIdleCallback === 'function'
    const run = () => {
      void import('./runtime').then(({ startFx }) => {
        if (!cancelled) cleanup = startFx({ sound, finePointer })
      })
    }
    const handle = hasIdle ? window.requestIdleCallback(run, { timeout: 2000 }) : window.setTimeout(run, 600)
    return () => {
      cancelled = true
      if (hasIdle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
      cleanup?.()
    }
  }, [ready, allowed, motion, sound])
}

/** Fire a micro-interaction sound (only plays if the runtime and Sound are on). */
export function playSound(kind: 'success' | 'error') {
  window.dispatchEvent(new CustomEvent('nyota:sound', { detail: kind }))
}
