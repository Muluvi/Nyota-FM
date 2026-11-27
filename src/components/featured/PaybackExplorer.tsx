import { useId, useMemo, useRef, useState } from 'react'
import { capexWaterfall, waterfallMonths, type WaterfallScenario } from '../../content/data/payback'
import { kshShort } from '../../lib/format'
import { Pills } from '../ui/Pills'
import { confetti } from '../../fx/confetti'
import { playSound } from '../../fx/useFxLayer'

const options = [
  { value: 'conservative', label: 'Conservative' },
  { value: 'base', label: 'Base' },
  { value: 'accelerated', label: 'Accelerated' },
] as const satisfies readonly { value: WaterfallScenario; label: string }[]

/** 03 · Scenario pills + month slider with a live readout and a cumulative-cash waterfall (O8, O10). */
export function PaybackExplorer() {
  const sliderId = useId()
  const [scenario, setScenario] = useState<WaterfallScenario>('base')
  const [month, setMonth] = useState(12)
  const data = capexWaterfall[scenario]

  const steps = useMemo(() => {
    let cum = data.initialCapex
    return data.monthlyNetProfit.map((p, i) => {
      const start = cum
      cum += p
      return { m: waterfallMonths[i], profit: p, start, end: cum }
    })
  }, [data])

  const breakIndex = steps.findIndex((s) => s.end >= 0)
  const readoutRef = useRef<HTMLSpanElement>(null)

  // D. Confetti + success sound when the slider crosses into break-even.
  const onMonth = (next: number) => {
    const crossed = month <= breakIndex && next > breakIndex
    setMonth(next)
    if (crossed) {
      const r = readoutRef.current?.getBoundingClientRect()
      confetti(r ? r.left + r.width / 2 : undefined, r ? r.top + r.height / 2 : undefined, 60)
      playSound('success')
    }
  }
  const at = steps[month - 1]
  const W = 600
  const H = 240
  const lo = data.initialCapex
  const hi = Math.max(...steps.map((s) => s.end))
  const y = (v: number) => 16 + ((hi - v) / (hi - lo)) * (H - 40)
  const bw = W / 13

  return (
    <div className="rounded-md border border-hairline p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Pills label="Scenario" options={options} value={scenario} onChange={setScenario} />
        <p className="m-0 text-right" aria-live="polite">
          <span className="block text-small text-sage">Break-even</span>
          <span ref={readoutRef} key={scenario} className="fx-bounce-in inline-block font-display text-display-l leading-none text-moss">{data.breakEvenMonth}</span>
        </p>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 block h-auto w-full" role="img" aria-label={`Cumulative cash after the Phase 1 outlay, ${scenario} scenario. Turns positive in ${data.breakEvenMonth}.`}>
        <line x1={0} x2={W} y1={y(0)} y2={y(0)} className="stroke-sage-dim" strokeDasharray="3 4" />
        <text x={4} y={y(0) - 8} className="chart-label fill-sage-dim">Capex recovered</text>
        <rect x={bw * 0.15} width={bw * 0.7} y={y(0)} height={y(lo) - y(0)} className="fill-brick" opacity={0.8} />
        {steps.map((s, i) => {
          const top = y(Math.max(s.start, s.end))
          const h = Math.max(1.5, Math.abs(y(s.start) - y(s.end)))
          const x = bw * (i + 1) + bw * 0.15
          const on = i < month
          return (
            <g key={`${scenario}-${s.m}`} opacity={on ? 1 : 0.25} className="transition-opacity duration-300">
              <rect x={x} width={bw * 0.7} y={top} height={h} className={`fx-svg-grow ${s.end >= 0 ? 'fill-moss' : 'fill-sage-dim'}`} style={{ animationDelay: `${i * 55}ms` }} />
              {i === breakIndex && (
                <text x={x + bw * 0.35} y={top - 8} textAnchor="middle" className="chart-label fill-paper">
                  ↓ {s.m}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      <label htmlFor={sliderId} className="mt-6 block text-small text-sage">
        Month <span className="font-mono text-paper tabular">{month}</span> of 12
      </label>
      <input
        id={sliderId}
        type="range"
        min={1}
        max={12}
        value={month}
        onChange={(e) => onMonth(Number(e.target.value))}
        className="mt-2 h-11 w-full accent-brass"
        aria-valuetext={`Month ${month}: cumulative cash ${kshShort(at.end)}`}
      />
      <p className="m-0 mt-2 grid grid-cols-2 gap-4 text-small text-sage">
        <span>
          Net profit in month {month}
          <span className="block font-mono text-body text-paper tabular">{kshShort(at.profit)}</span>
        </span>
        <span>
          Cumulative cash position
          <span className={`block font-mono text-body tabular ${at.end >= 0 ? 'text-moss' : 'text-brick-ink'}`}>{kshShort(at.end)}</span>
        </span>
      </p>
      <p className="m-0 mt-4 text-small text-sage-dim">
        Phase 1 outlay {kshShort(-data.initialCapex)} (low end of the researched range). Tier 2 model; monthly values in the capex waterfall tool.
      </p>
    </div>
  )
}
