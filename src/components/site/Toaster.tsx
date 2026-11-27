import { useSettings } from '../../state/settings'

/** D. Toast: bounces in with a drawn checkmark. */
export function Toaster() {
  const { toast } = useSettings()
  return (
    <div role="status" aria-live="polite" className="toaster pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex justify-center px-4">
      {toast && (
        <p key={toast} className="fx-bounce-in m-0 flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-small text-ink shadow-2xl">
          <svg width="16" height="16" viewBox="0 0 16 16" className="fx-check" aria-hidden="true">
            <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {toast}
        </p>
      )}
    </div>
  )
}
