import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Radio, X } from 'lucide-react'
import { slotAt, STREAM_URL, type Slot } from '../../content/data/schedule'

type Status = 'idle' | 'playing' | 'offline'

/**
 * O7 · ON AIR card. Lives in the header as a pill and opens a small card below it,
 * so it never covers story content.
 */
export function OnAirCard() {
  const [expanded, setExpanded] = useState(false)
  const [status, setStatus] = useState<Status>(STREAM_URL ? 'idle' : 'offline')
  const audio = useRef<HTMLAudioElement | null>(null)
  const [slot, setSlot] = useState<Slot | null>(null)

  const host = useRef<HTMLDivElement>(null)

  // Time-of-day schedule is resolved after mount so prerendered HTML stays stable.
  useEffect(() => setSlot(slotAt(new Date())), [])
  useEffect(() => () => audio.current?.pause(), [])

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setExpanded(false)
    const onDown = (e: PointerEvent) => host.current && !host.current.contains(e.target as Node) && setExpanded(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [expanded])

  const toggle = async () => {
    if (!STREAM_URL) return
    if (!audio.current) {
      audio.current = new Audio(STREAM_URL)
      audio.current.addEventListener('error', () => setStatus('offline'))
    }
    if (status === 'playing') {
      audio.current.pause()
      setStatus('idle')
      return
    }
    try {
      await audio.current.play()
      setStatus('playing')
    } catch {
      setStatus('offline')
    }
  }

  const live = status === 'playing'

  return (
    <div ref={host} className="onair-card no-print relative">
      {!expanded ? (
        <button type="button" onClick={() => setExpanded(true)} aria-expanded={false} aria-label={`${live ? 'On air' : '107.3 FM schedule'}${slot ? `: ${slot.show}` : ''}`} className="flex min-h-11 items-center gap-2 rounded-full border border-hairline px-3 text-small text-paper hover:border-sage-dim">
          <span className={`h-2.5 w-2.5 rounded-full ${live ? 'onair-dot fx-heartbeat bg-brick-ink' : 'bg-moss'}`} aria-hidden="true" />
          <span className={`hidden font-mono sm:inline ${live ? 'fx-neon' : ''}`}>{live ? 'ON AIR' : '107.3 FM'}</span>
          <span className="fx-wave hidden text-moss sm:inline-flex" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          {slot && <span className="hidden max-w-[12rem] truncate text-sage xl:inline">{slot.show}</span>}
        </button>
      ) : (
        <div role="dialog" aria-label="On air" className="fx-modal absolute right-0 top-0 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-md border border-hairline bg-ink-2 p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <p className="m-0 flex items-center gap-2 font-mono text-small text-paper">
              <span className={`h-2.5 w-2.5 rounded-full ${live ? 'onair-dot bg-brick-ink' : 'bg-sage-dim'}`} aria-hidden="true" />
              {live ? 'ON AIR' : 'Schedule'}
            </p>
            <span className="flex gap-1">
              <button type="button" onClick={() => setExpanded(false)} aria-label="Collapse player" className="grid h-11 w-11 place-items-center rounded-full text-sage hover:text-paper">
                <Radio size={16} />
              </button>
              <button type="button" onClick={() => { audio.current?.pause(); setStatus(STREAM_URL ? 'idle' : 'offline'); setExpanded(false) }} aria-label="Close player" className="grid h-11 w-11 place-items-center rounded-full text-sage hover:text-paper">
                <X size={16} />
              </button>
            </span>
          </div>
          {slot && <p className="m-0 mt-2 text-body text-paper">{slot.show}</p>}
          {slot && <p className="m-0 text-small text-sage">{slot.hosts} (illustrative) · {slot.time}</p>}
          {status === 'offline' ? (
            <p className="m-0 mt-3 border-t border-hairline pt-3 text-small text-sage" role="status">
              The live stream is not connected in this proposal site. Listen on 107.3 FM across Western Kenya.
            </p>
          ) : (
            <button type="button" onClick={toggle} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 text-small font-medium text-ink">
              {live ? <Pause size={16} /> : <Play size={16} />} {live ? 'Pause' : 'Listen live'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
