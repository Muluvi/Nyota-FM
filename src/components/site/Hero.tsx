import { hero } from '../../content/chapters/intro'
import { SLOGAN } from '../../content/meta'
import { useMaskRise } from '../../motion/useMaskRise'
import { Button } from '../ui/Button'
import { Gloss } from '../ui/Gloss'
import { Rich } from '../ui/Rich'
import { FrequencyDial } from './FrequencyDial'

function MaskWord({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`block ${className}`} aria-hidden="true">
      {text.split('').map((ch, i) => (
        <span key={i} className="mask-line">
          <span>{ch}</span>
        </span>
      ))}
    </span>
  )
}

/** Hero: K1 wordmark, O2 mask rise, A1 dial, O5 glass card, O6 side tab, O7 scroll cue. */
export function Hero() {
  const wordmarkRef = useMaskRise<HTMLDivElement>()
  const [first, second] = SLOGAN.split('. ')

  return (
    <section aria-labelledby="hero-title" className="band-ink relative overflow-hidden">
      <div className="mx-auto grid min-h-[100svh] max-w-[90rem] items-center gap-8 px-4 pt-20 pb-16 lg:gap-10 lg:pt-24 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <div ref={wordmarkRef} className="select-none font-wordmark text-display-xl font-extrabold uppercase tracking-[-0.01em] text-paper">
            <MaskWord text="Nyota" />
            <MaskWord text="107.3" className="text-brass" />
          </div>
          <h1 id="hero-title" className="mt-8 mb-5 max-w-[24ch] font-display text-[clamp(1.75rem,1.1rem+2.2vw,3.25rem)] leading-[1.08] font-normal text-paper">
            {hero.headline}
          </h1>
          <p className="measure m-0 text-body text-sage">
            <Rich text={hero.lede} />
          </p>
          <p className="m-0 mt-6 font-display text-heading italic text-paper">
            <Gloss term="hapa-tulipo">{`${first}.`}</Gloss> <Gloss term="twangaa">{second}</Gloss>
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href="#in-short" variant="primary" arrow="down">
              {hero.cta}
            </Button>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[16rem] sm:max-w-[22rem] lg:order-2 lg:col-span-5 lg:max-w-[28rem]">
          <FrequencyDial />
          <div className="mx-auto -mt-2 hidden max-w-[22rem] rounded-md sm:block border border-paper/10 bg-paper/5 p-4 backdrop-blur-md">
            <p className="m-0 text-small text-paper">{hero.card.split(' · ')[0]}</p>
            <div className="dotted-current my-2 h-0 text-sage-dim" aria-hidden="true" />
            <p className="m-0 flex justify-between text-small text-sage">
              <span>{hero.card.split(' · ')[1]}</span>
              <span>{hero.card.split(' · ')[2]}</span>
            </p>
          </div>
        </div>
      </div>

      <p className="pointer-events-none absolute right-2 top-1/2 m-0 hidden -translate-y-1/2 rotate-180 font-mono text-small tracking-[0.2em] text-sage-dim [writing-mode:vertical-rl] md:block" aria-hidden="true">
        {hero.sideTab}
      </p>

      <a href="#in-short" className="no-print absolute bottom-8 left-1/2 hidden h-24 w-24 -translate-x-1/2 place-items-center rounded-full border border-hairline text-sage transition-colors hover:border-paper hover:text-paper md:grid" aria-label="Scroll to continue">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <path id="scroll-cue-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
          </defs>
          <text className="fill-current font-mono" fontSize={12.5} letterSpacing={2.2}>
            <textPath href="#scroll-cue-circle">SCROLL TO CONTINUE ·</textPath>
          </text>
        </svg>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}
