import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PopoverProps {
  trigger: (props: { id: string; open: boolean; toggle: () => void; onMouseEnter: () => void; onMouseLeave: () => void }) => ReactNode
  children: ReactNode
  label: string
}

const WIDTH = 320

/**
 * Tap/click toggles; hover previews on pointer devices; Esc, scroll and outside
 * click close. Rendered in a portal so cards with overflow never clip it.
 */
export function Popover({ trigger, children, label }: PopoverProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const anchor = useRef<HTMLSpanElement>(null)
  const panel = useRef<HTMLSpanElement>(null)
  const hoverTimer = useRef<number | undefined>(undefined)
  const canHover = () => window.matchMedia('(hover: hover)').matches

  const place = useCallback(() => {
    const r = anchor.current?.getBoundingClientRect()
    if (!r) return
    const width = Math.min(WIDTH, window.innerWidth - 16)
    const left = Math.min(Math.max(8, r.left), window.innerWidth - width - 8)
    const below = r.bottom + 8
    const panelH = panel.current?.offsetHeight ?? 160
    const top = below + panelH > window.innerHeight - 8 && r.top - panelH - 8 > 8 ? r.top - panelH - 8 : below
    setPos({ top, left, width })
  }, [])

  useLayoutEffect(() => {
    if (open) place()
  }, [open, place])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (!anchor.current?.contains(t) && !panel.current?.contains(t)) setOpen(false)
    }
    const onScroll = () => setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [open])

  return (
    <span ref={anchor} className="inline">
      {trigger({
        id,
        open,
        toggle: () => setOpen((o) => !o),
        onMouseEnter: () => {
          if (!canHover()) return
          window.clearTimeout(hoverTimer.current)
          hoverTimer.current = window.setTimeout(() => setOpen(true), 250)
        },
        onMouseLeave: () => {
          if (!canHover()) return
          window.clearTimeout(hoverTimer.current)
          hoverTimer.current = window.setTimeout(() => setOpen(false), 200)
        },
      })}
      {open &&
        createPortal(
          <span
            ref={panel}
            id={id}
            role="dialog"
            aria-label={label}
            style={{ position: 'fixed', top: pos?.top ?? -9999, left: pos?.left ?? 0, width: pos?.width ?? WIDTH }}
            className="z-[95] block rounded-md border border-hairline bg-ink-2 p-4 text-left font-body text-small font-normal not-italic normal-case tracking-normal text-sage shadow-2xl"
            onMouseEnter={() => window.clearTimeout(hoverTimer.current)}
            onMouseLeave={() => canHover() && setOpen(false)}
          >
            {children}
          </span>,
          document.body,
        )}
    </span>
  )
}
