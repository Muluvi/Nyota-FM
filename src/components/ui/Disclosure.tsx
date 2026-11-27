import { useEffect, useState, type ReactNode } from 'react'
import { Plus, Minus } from 'lucide-react'
import { useSettings } from '../../state/settings'

interface DisclosureProps {
  id: string
  /** Open when printing the whole story (chapter details). */
  expandOnPrint?: boolean
  title: string
  summary?: string
  children: (open: boolean) => ReactNode
}

/**
 * Audit layer: closed by default, deep-linkable (#<id>), force-opened for print.
 * Children render only once opened, so lazy detail is never fetched up front.
 */
export function Disclosure({ id, title, summary, children, expandOnPrint = false }: DisclosureProps) {
  const { expandAll } = useSettings()
  const [open, setOpen] = useState(false)
  const [everOpened, setEverOpened] = useState(false)
  const isOpen = open || (expandOnPrint && expandAll)

  useEffect(() => {
    const check = () => {
      const hash = decodeURIComponent(window.location.hash)
      if (hash === `#${id}` || hash.startsWith(`#${id}-`)) {
        setOpen(true)
        setEverOpened(true)
      }
    }
    check()
    window.addEventListener('hashchange', check)
    window.addEventListener('nyota:open-detail', check)
    return () => {
      window.removeEventListener('hashchange', check)
      window.removeEventListener('nyota:open-detail', check)
    }
  }, [id])

  useEffect(() => {
    if (isOpen) setEverOpened(true)
  }, [isOpen])

  return (
    <div id={id} className="scroll-mt-24 border-y border-hairline">
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((o) => !o)}
          className="fx-bgslide no-print group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left"
        >
          <span>
            <span className="block text-body font-medium text-paper">{title}</span>
            {summary && <span className="mt-1 block text-small text-sage">{summary}</span>}
          </span>
          <span className="fx-icon-spin grid h-10 w-10 shrink-0 place-items-center rounded-full border border-hairline text-paper transition-colors group-hover:border-paper" aria-hidden="true">
            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
          </span>
        </button>
      </h3>
      <div id={`${id}-panel`} className="fx-accordion" data-open={isOpen} aria-hidden={!isOpen} {...(!isOpen ? { inert: true } : {})}>
        <div>
          <div className="pb-10">{everOpened && children(isOpen)}</div>
        </div>
      </div>
    </div>
  )
}
