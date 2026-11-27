import { Copy } from 'lucide-react'
import { useSettings } from '../../state/settings'

/** "Copy link to this chapter" chip with toast confirmation. */
export function ShareChip({ id, label }: { id: string; label: string }) {
  const { notify } = useSettings()
  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    try {
      await navigator.clipboard.writeText(url)
      notify(`Link to ${label} copied`)
    } catch {
      notify('Copy failed. The link is in the address bar.')
      history.replaceState(null, '', `#${id}`)
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="no-print inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-4 text-small text-sage transition-colors hover:border-paper hover:text-paper"
    >
      Copy link to this chapter <Copy size={14} aria-hidden="true" />
    </button>
  )
}
