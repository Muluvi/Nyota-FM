import { useEffect, useRef, useState } from 'react'

/**
 * Official Nyota FM logo (brand kit §2), full colour, self-hosted: a transparent
 * cut-out of the master artwork in /public/brand. Lazy-loaded with a blur-up.
 * The star silhouette, proportions and internal elements are never altered.
 */
export function BrandLogo({ className = 'w-28' }: { className?: string }) {
  const [loaded, setLoaded] = useState(false)
  const img = useRef<HTMLImageElement>(null)
  // A prerendered image may finish before hydration attaches onLoad.
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth > 0) setLoaded(true)
  }, [])
  return (
    <span className="lite-hidden mb-4 block">
      <img
        ref={img}
        src="/brand/nyota-star-256.webp"
        srcSet="/brand/nyota-star-128.webp 128w, /brand/nyota-star-256.webp 256w, /brand/nyota-star-512.webp 512w"
        sizes="7rem"
        alt="Nyota 107.3 FM logo"
        width={256}
        height={256}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`brand-mark h-auto transition-[filter,opacity] duration-700 ${loaded ? 'opacity-100' : 'opacity-0 blur-md'} ${className}`}
      />
    </span>
  )
}
