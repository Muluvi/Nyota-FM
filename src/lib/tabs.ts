import type React from 'react'

/** Arrow-key, Home and End navigation for a role="tablist" (automatic activation). */
export function onTabListKeyDown(e: React.KeyboardEvent<HTMLElement>) {
  const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End']
  if (!keys.includes(e.key)) return
  const tabs = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'))
  const i = tabs.indexOf(document.activeElement as HTMLElement)
  if (i < 0) return
  e.preventDefault()
  const n =
    e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length
  tabs[n].focus()
  tabs[n].click()
}
