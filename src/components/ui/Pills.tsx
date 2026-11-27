import { useId, type KeyboardEvent } from 'react'

interface PillsProps<T extends string> {
  label: string
  options: readonly { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  tone?: 'dark' | 'light'
}

/** Segmented pill toggle (radio group semantics, arrow-key navigation). */
export function Pills<T extends string>({ label, options, value, onChange, tone = 'dark' }: PillsProps<T>) {
  const id = useId()
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return
    e.preventDefault()
    const i = options.findIndex((o) => o.value === value)
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1
    const next = options[(i + step + options.length) % options.length]
    onChange(next.value)
    document.getElementById(`${id}-${next.value}`)?.focus()
  }
  const border = tone === 'light' ? 'border-ink/25' : 'border-hairline'
  return (
    <div role="radiogroup" aria-label={label} onKeyDown={onKey} className={`inline-flex flex-wrap gap-1 rounded-full border ${border} p-1`}>
      {options.map((o) => {
        const active = o.value === value
        const activeCls = tone === 'light' ? 'bg-ink text-paper' : 'bg-paper text-ink'
        const idleCls = tone === 'light' ? 'text-ink-on-paper hover:text-ink' : 'text-sage hover:text-paper'
        return (
          <button
            key={o.value}
            id={`${id}-${o.value}`}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(o.value)}
            className={`min-h-11 rounded-full px-4 text-small font-medium transition-colors ${active ? activeCls : idleCls}`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
