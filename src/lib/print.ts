/**
 * Print one part of the page (a quote, the briefing, the resolution sheet) instead
 * of the whole site. The element is cloned into a temporary #print-root; print CSS
 * hides everything else, so the output is a short document, not 70 pages.
 */
export function printSection(elementId: string): void {
  const source = document.getElementById(elementId)
  if (!source) {
    window.print()
    return
  }
  document.getElementById('print-root')?.remove()
  const root = document.createElement('div')
  root.id = 'print-root'
  const clone = source.cloneNode(true) as HTMLElement
  clone.removeAttribute('id')
  clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'))
  root.appendChild(clone)
  document.body.appendChild(root)
  document.body.dataset.print = 'section'
  const cleanup = () => {
    root.remove()
    delete document.body.dataset.print
  }
  window.addEventListener('afterprint', cleanup, { once: true })
  window.print()
}
