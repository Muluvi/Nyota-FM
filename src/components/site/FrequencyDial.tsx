import { useEffect, useRef } from 'react'

const MIN = 87.5
const MAX = 108
const SWEEP = 240
const START = -120
const FREQ = 107.3
const C = 200
const R = 160

const angleFor = (mhz: number) => START + ((mhz - MIN) / (MAX - MIN)) * SWEEP
const polar = (deg: number, r: number) => {
  const rad = ((deg - 90) * Math.PI) / 180
  return [C + r * Math.cos(rad), C + r * Math.sin(rad)] as const
}
const arc = (a0: number, a1: number, r: number) => {
  const [x0, y0] = polar(a0, r)
  const [x1, y1] = polar(a1, r)
  return `M${x0},${y0} A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1},${y1}`
}

/** A1 · FM dial whose needle settles on 107.3 (CSS); the wave idles only while visible. */
export function FrequencyDial() {
  const host = useRef<SVGSVGElement>(null)

  // The idle wave only runs while the dial is on screen.
  useEffect(() => {
    const h = host.current
    if (!h) return
    const io = new IntersectionObserver(([e]) => h.setAttribute('data-visible', e.isIntersecting ? 'true' : 'false'))
    io.observe(h)
    return () => io.disconnect()
  }, [])

  const ticks = []
  for (let f = 88; f <= MAX + 0.001; f += 0.5) {
    const major = Math.abs(f % 4) < 0.001
    const a = angleFor(f)
    const [x0, y0] = polar(a, R - (major ? 18 : 9))
    const [x1, y1] = polar(a, R)
    ticks.push(<line key={f} x1={x0} y1={y0} x2={x1} y2={y1} className={major ? 'stroke-sage' : 'stroke-sage-dim'} strokeWidth={major ? 2 : 1} />)
    if (major) {
      const [lx, ly] = polar(a, R - 40)
      ticks.push(
        <text key={`l${f}`} x={lx} y={ly + 6} textAnchor="middle" className="fill-sage-dim font-mono" fontSize={20}>
          {f}
        </text>,
      )
    }
  }

  const wavePath = Array.from({ length: 9 }, (_, i) => `q20,${i % 2 ? 14 : -14} 40,0`).join(' ')

  return (
    <svg ref={host} viewBox="0 0 400 400" className="dial h-auto w-full" data-visible="false" role="img" aria-label="FM dial tuned to 107.3 megahertz">
      <defs>
        <clipPath id="dial-wave-clip">
          <rect x={120} y={262} width={160} height={40} />
        </clipPath>
      </defs>
      <circle cx={C} cy={C} r={R + 22} className="fill-none stroke-hairline" strokeWidth={1} />
      <path d={arc(START, START + SWEEP, R + 8)} className="fill-none stroke-hairline" strokeWidth={4} strokeLinecap="round" />
      <path d={arc(angleFor(104), angleFor(MAX), R + 8)} className="fill-none stroke-brass" strokeOpacity={0.35} strokeWidth={4} strokeLinecap="round" />
      <path d={arc(angleFor(FREQ) - 1.5, angleFor(FREQ) + 1.5, R + 8)} className="fill-none stroke-brass" strokeWidth={6} strokeLinecap="round" />
      {ticks}
      <g className="dial-needle" style={{ ['--from' as string]: `${angleFor(MIN)}deg`, ['--to' as string]: `${angleFor(FREQ)}deg` }}>
        <line x1={C} y1={C + 18} x2={C} y2={C - R + 4} className="stroke-brass" strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={C} cy={C} r={7} className="fill-brass" />
      </g>
      <text x={C} y={C - 44} textAnchor="middle" className="fill-paper" fontSize={44} style={{ fontFamily: 'var(--font-wordmark)', fontWeight: 800 }}>
        107.3
      </text>
      <text x={C} y={C - 16} textAnchor="middle" className="fill-sage-dim font-mono" fontSize={19}>
        MHz
      </text>
      <g clipPath="url(#dial-wave-clip)">
        <g className="dial-wave">
          <path d={`M120,282 ${wavePath}`} className="fill-none stroke-moss" strokeWidth={2} />
        </g>
      </g>
    </svg>
  )
}
