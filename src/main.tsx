import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element missing')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The story is prerendered at build time; other views (decision sheet) and dev render fresh.
const isStory = !new URLSearchParams(window.location.search).get('view')
if (root.dataset.prerendered === 'true' && isStory) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  createRoot(root).render(app)
}
