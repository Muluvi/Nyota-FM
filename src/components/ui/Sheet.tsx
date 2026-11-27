import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { useFocusTrap } from '../../lib/useFocusTrap'

interface SheetProps {
  title: string
  subtitle?: string
  onClose: () => void
  children: ReactNode
  wide?: boolean
}

/** Focused modal sheet with focus trap, Esc to close and body scroll lock. */
export function Sheet({ title, subtitle, onClose, children, wide = false }: SheetProps) {
  const panel = useRef<HTMLDivElement>(null)
  useFocusTrap(panel, true, onClose)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/80 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-md border border-hairline bg-ink sm:rounded-md ${wide ? 'sm:max-w-5xl' : 'sm:max-w-3xl'}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-hairline px-5 py-4 sm:px-7">
          <div>
            <h2 className="m-0 font-display text-heading text-paper">{title}</h2>
            {subtitle && <p className="m-0 mt-1 text-small text-sage">{subtitle}</p>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline text-paper hover:border-paper">
            <X size={18} />
          </button>
        </div>
        <div className="legacy relative min-h-[50vh] overflow-y-auto overscroll-contain px-5 py-6 [transform:translateZ(0)] sm:px-7">{children}</div>
      </div>
    </div>
  )
}
