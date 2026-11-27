import { useState } from 'react'
import { Check } from 'lucide-react'

type State = 'idle' | 'loading' | 'done'

/**
 * D22 · State button: idle → loading (spinner) → success (drawn check).
 * Used to mark an ask as discussed in a session. Saved on this device only.
 */
export function AskMarker({ done, onChange, title }: { done: boolean; onChange: (done: boolean) => void; title: string }) {
  const [state, setState] = useState<State>(done ? 'done' : 'idle')
  const shown: State = state === 'loading' ? 'loading' : done ? 'done' : 'idle'

  const click = () => {
    if (done) {
      onChange(false)
      setState('idle')
      return
    }
    setState('loading')
    window.setTimeout(() => {
      setState('done')
      onChange(true)
    }, 550)
  }

  return (
    <button
      type="button"
      onClick={click}
      aria-pressed={done}
      aria-label={`${done ? 'Unmark' : 'Mark'} "${title}" as discussed`}
      className={`fx-ripple fx-scale no-print inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-small transition-colors duration-300 ${
        shown === 'done' ? 'fx-flash border-moss bg-moss/15 text-paper' : 'border-hairline text-sage hover:border-paper hover:text-paper'
      }`}
    >
      {shown === 'loading' && <span className="fx-spinner" aria-hidden="true" />}
      {shown === 'done' && (
        <svg width="16" height="16" viewBox="0 0 16 16" className="fx-check text-moss" aria-hidden="true">
          <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {shown === 'idle' && <Check size={14} aria-hidden="true" />}
      {shown === 'loading' ? 'Saving…' : shown === 'done' ? 'Discussed' : 'Mark as discussed'}
    </button>
  )
}
