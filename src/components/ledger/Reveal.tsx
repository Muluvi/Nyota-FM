import React from 'react';

/**
 * Scroll-driven reveal in pure CSS (see `.reveal` in index.css). Content is always
 * present and visible without JavaScript, in print, under reduced motion, and in
 * browsers without `animation-timeline`.
 */
export function Reveal({ children, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
