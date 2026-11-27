import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

interface PopoverProps {
  trigger: (props: { id: string; open: boolean; toggle: () => void; onMouseEnter: () => void; onMouseLeave: () => void }) => ReactNode
  children: ReactNode
  label: string
}

/** Tap/click toggles; hover previews on pointer devices; Esc and outside click close. */
export function Popover({ trigger, children, label }: PopoverProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const host = useRef<HTMLSpanElement>(null)
  const hoverTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onDown = (e: PointerEvent) => {
      if (host.current && !host.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

  return (
    <span ref={host} className="relative inline">
      {trigger({
        id,
        open,
        toggle: () => setOpen((o) => !o),
        onMouseEnter: () => {
          if (!canHover) return
          window.clearTimeout(hoverTimer.current)
          hoverTimer.current = window.setTimeout(() => setOpen(true), 250)
        },
        onMouseLeave: () => {
          if (!canHover) return
          window.clearTimeout(hoverTimer.current)
          hoverTimer.current = window.setTimeout(() => setOpen(false), 200)
        },
      })}
      {open && (
        <span
          id={id}
          role="dialog"
          aria-label={label}
          className="absolute left-0 top-full z-50 mt-2 block w-[min(20rem,80vw)] rounded-md border border-hairline bg-ink-2 p-4 text-left font-body text-small font-normal normal-case tracking-normal text-sage shadow-2xl not-italic"
          onMouseEnter={() => window.clearTimeout(hoverTimer.current)}
          onMouseLeave={() => canHover && setOpen(false)}
        >
          {children}
        </span>
      )}
    </span>
  )
}
