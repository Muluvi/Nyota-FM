import { useState } from 'react'
import { capexPhases, type CapexPhase } from '../../content/data/capexPhases'
import { roadmapQuarters } from '../../content/data/roadmap'
import { useLineDraw } from '../../motion/useLineDraw'
import { Figure } from '../ui/Figure'
import { Pills } from '../ui/Pills'
import { CompareSlider } from './CompareSlider'

/** 06 · Phase pills (O10) and a self-drawing 8-quarter roadmap with typographic dates (K7). */
export function BuildRoadmap() {
  const [phase, setPhase] = useState<CapexPhase['id']>('p1')
  const current = capexPhases.find((p) => p.id === phase) ?? capexPhases[0]
  const lineRef = useLineDraw<HTMLDivElement>()

  return (
    <div className="flex flex-col gap-12">
      <div className="rounded-md border border-hairline p-5 sm:p-6">
        <Pills label="Studio phase" options={capexPhases.map((p) => ({ value: p.id, label: p.label }))} value={phase} onChange={setPhase} />
        <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_1.4fr]" aria-live="polite">
          <div>
            <p className="m-0 text-small text-sage">{current.months} · {current.name}</p>
            <p className="m-0 mt-2 font-display text-heading text-paper">
              <Figure id={current.figure} />
            </p>
          </div>
          <ul className="m-0 list-none space-y-2 p-0 text-small text-sage">
            {current.items.map((item) => (
              <li key={item} className="border-b border-hairline pb-2">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <CompareSlider />

      {/* B. Horizontal scroll section, pinned while the page scrolls (desktop); vertical line-draw on phones */}
      <div ref={lineRef} className="fx-hscroll relative">
        <div className="fx-hscroll-pin">
        <h3 className="m-0 mb-6 text-body font-medium text-paper">The 24-month roadmap</h3>
        <div className="fx-hscroll-bar mb-6 hidden h-0.5 bg-hairline" aria-hidden="true">
          <span className="block h-full origin-left bg-moss" style={{ transform: 'scaleX(var(--hsp, 0))' }} />
        </div>
        <svg className="fx-hscroll-vline absolute left-[0.6rem] top-14 h-[calc(100%-3.5rem)] w-2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100" aria-hidden="true">
          <path d="M1 0 V100" className="stroke-hairline" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          <path data-draw d="M1 0 V100" className="stroke-moss" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </svg>
        <ol className="fx-hscroll-track m-0 list-none space-y-10 p-0">
          {roadmapQuarters.map((q, i) => {
            const [qq, year] = q.q.split(' ')
            return (
              <li key={q.q} data-at={(i / (roadmapQuarters.length - 1)).toFixed(3)} className="fx-hscroll-card group relative pl-10" data-reached="true">
                <span className="absolute left-0 top-2 h-5 w-5 rounded-full border-2 border-moss bg-ink transition-colors group-data-[reached=true]:bg-moss" aria-hidden="true" />
                <p className="m-0 flex items-baseline gap-3 font-display text-heading leading-none text-paper">
                  <span>{qq}</span>
                  <span className="text-sage-dim">/</span>
                  <span>{year}</span>
                  <span className="font-mono text-small text-sage">M{i * 3 + 1}–M{i * 3 + 3}</span>
                </p>
                <p className="m-0 mt-2 text-body font-medium text-paper">{q.title}</p>
                <ul className="m-0 mt-2 list-none space-y-1 p-0 text-small text-sage">
                  {q.milestones.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>
        </div>
      </div>
    </div>
  )
}
