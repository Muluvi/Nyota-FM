import { useState } from 'react'
import { counties, countyScale, countyTotals } from '../../content/data/counties'
import { useReveal } from '../../motion/useReveal'

/** 02 · Five-county grid with tap/hover readouts (A5 stagger, O8 readout). */
export function Counties() {
  const [active, setActive] = useState(counties[1].name)
  const ref = useReveal<HTMLDivElement>({ stagger: 90 })
  const max = Math.max(...counties.map(countyScale))
  const current = counties.find((c) => c.name === active) ?? counties[0]

  return (
    <div ref={ref}>
      <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-5" aria-label="Counties: choose one to see its population">
        {counties.map((c) => {
          const on = c.name === active
          return (
            <li key={c.name} className="reveal">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setActive(c.name)}
                onMouseEnter={() => setActive(c.name)}
                onFocus={() => setActive(c.name)}
                className={`flex h-40 w-full flex-col justify-end rounded-md border p-3 text-left transition-colors ${on ? 'border-sage bg-ink-2' : 'border-hairline hover:border-sage-dim'}`}
              >
                <span className="relative mb-3 block h-full w-2 self-start overflow-hidden rounded-full bg-hairline" aria-hidden="true">
                  <span className={`absolute inset-x-0 bottom-0 rounded-full ${on ? 'bg-brass' : 'bg-sage-dim'}`} style={{ height: `${(countyScale(c) / max) * 100}%` }} />
                </span>
                <span className="text-body font-medium text-paper">{c.name}</span>
                <span className="font-mono text-small text-sage tabular">{c.census2019}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="mt-4 grid gap-4 rounded-md border border-hairline p-5 sm:grid-cols-3" aria-live="polite">
        <p className="m-0">
          <span className="block text-small text-sage">{current.name} · 2019 Census</span>
          <span className="font-display text-heading text-paper tabular">{current.census2019}</span>
        </p>
        <p className="m-0">
          <span className="block text-small text-sage">2026 projection{current.estimated ? ' (est.)' : ''}</span>
          <span className="font-display text-heading text-paper tabular">{current.projection2026}</span>
        </p>
        <p className="m-0">
          <span className="block text-small text-sage">Language cluster</span>
          <span className="text-body text-paper">{current.cluster}</span>
        </p>
      </div>
      <p className="m-0 mt-3 text-small text-sage-dim">
        Five-county total: {countyTotals.census2019} (2019) · {countyTotals.projection2026} (2026). Source [1] KNBS, [2] Bungoma County.
      </p>
    </div>
  )
}
