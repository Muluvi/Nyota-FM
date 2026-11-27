import React from 'react'

/** Legacy wrapper kept for the detail layer: renders content immediately (no hidden-until-scrolled state). */
export function Reveal({ children, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <div className={className}>{children}</div>
}
