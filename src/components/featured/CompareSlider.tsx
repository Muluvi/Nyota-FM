import { useId, useState } from 'react'
import { Figure } from '../ui/Figure'

/**
 * F. Before/after comparison slider: v1.0's unresearched studio envelope vs
 * v2.0's researched, phase-gated build. The range input is the accessible control.
 */
export function CompareSlider() {
  const id = useId()
  const [pos, setPos] = useState(50)
  return (
    <div className="rounded-md border border-hairline p-4 sm:p-6">
      <div className="relative h-56 overflow-hidden rounded-md select-none" aria-hidden="true">
        <div className="fx-mesh absolute inset-0 flex flex-col justify-end bg-band-brick p-5">
          <p className="m-0 text-small text-sage">v1.0 envelope (unresearched)</p>
          <p className="m-0 mt-1 font-display text-heading text-paper">
            <Figure id="capex-v1-total" />
          </p>
        </div>
        <div className="absolute inset-0 flex flex-col items-end justify-end bg-band-moss p-5 text-right" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <p className="m-0 text-small text-sage">v2.0 researched, three gated phases</p>
          <p className="m-0 mt-1 font-display text-heading text-paper">
            <Figure id="capex-total" />
          </p>
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-brass" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brass font-mono text-small text-ink shadow-xl">⇆</span>
        </div>
      </div>
      <label htmlFor={id} className="mt-4 block text-small text-sage">
        Drag to compare v1.0 with v2.0
      </label>
      <input id={id} type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="mt-2 h-11 w-full accent-brass" aria-valuetext={`${pos}% showing v2.0`} />
      <p className="sr-only">
        v1.0 envelope: <Figure id="capex-v1-total" />. v2.0 researched build: <Figure id="capex-total" />.
      </p>
    </div>
  )
}
