export const NAV_OFFSET = 74

export function scrollToSection(id: string, offset = NAV_OFFSET) {
  const element = document.getElementById(id)
  if (!element) return false
  const top = element.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
  return true
}
