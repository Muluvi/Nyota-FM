import { useSettings } from '../../state/settings'

export function Toaster() {
  const { toast } = useSettings()
  return (
    <div role="status" aria-live="polite" className="toaster pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex justify-center px-4">
      {toast && <p className="m-0 rounded-full bg-paper px-5 py-3 text-small text-ink shadow-2xl">{toast}</p>}
    </div>
  )
}
