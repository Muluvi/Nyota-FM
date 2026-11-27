import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Build-time prerender of the story (hero and In short paint from HTML; lazy
 * chapters stream in after hydration). Used by scripts/prerender.mjs.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
