import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useSettings } from '../../state/settings'
import { playSound } from '../../fx/useFxLayer'

/** A6 · "Copy link to this chapter" chip: glow flash, checkmark and toast on success. */
export function ShareChip({ id, label }: { id: string; label: string }) {
  const { notify } = useSettings()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    try {
      await navigator.clipboard.writeText(url)
      notify(`Link to ${label} copied`)
      playSound('success')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      notify('Copy failed. The link is in the address bar.')
      playSound('error')
      history.replaceState(null, '', `#${id}`)
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={`fx-ripple fx-bgslide no-print inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-4 text-small text-sage transition-colors hover:border-paper hover:text-paper ${copied ? 'fx-flash border-moss text-paper' : ''}`}
    >
      {copied ? 'Link copied' : 'Copy link to this chapter'}
      {copied ? <Check size={14} aria-hidden="true" className="text-moss" /> : <Copy size={14} aria-hidden="true" />}
    </button>
  )
}
