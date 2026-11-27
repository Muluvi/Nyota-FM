import { useEffect, useState } from 'react'
import { useSettings } from '../state/settings'

const query = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(query).matches
}

/** True when the user has not asked for reduced motion and Lite mode is off. */
export function useMotionAllowed(): boolean {
  const { lite } = useSettings()
  const [reduced, setReduced] = useState(prefersReducedMotion)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return !reduced && !lite
}
