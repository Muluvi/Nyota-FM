import { useEffect, useRef, useState } from 'react'

/** The station logo (as used on the earlier site), served from its CDN. */
const LOGO_URL = 'https://res.cloudinary.com/da5j0zjok/image/upload/v1780508039/Untitled_design_20260603_203332_0000_e2md3o.png'

/**
 * F. Image lazy loading with a blur-up: the logo starts blurred and transparent
 * and sharpens once loaded. Rendered as a silhouette that follows the theme.
 * Lite mode never requests it.
 */
export function BrandLogo() {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const img = useRef<HTMLImageElement>(null)
  // A prerendered image may finish before hydration attaches onLoad.
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth > 0) setLoaded(true)
  }, [])
  if (failed) return null
  return (
    <span className="lite-hidden mb-3 block">
      <img
        ref={img}
        src={LOGO_URL}
        alt="Nyota FM logo"
        width={112}
        height={28}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`brand-logo h-7 w-auto object-contain transition-[filter,opacity] duration-700 ${loaded ? 'opacity-95' : 'opacity-0 blur-md'}`}
      />
    </span>
  )
}
