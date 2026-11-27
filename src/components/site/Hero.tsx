import { hero } from '../../content/chapters/intro'
import { SLOGAN } from '../../content/meta'
import { Button } from '../ui/Button'
import { Gloss } from '../ui/Gloss'
import { Rich } from '../ui/Rich'
import { FrequencyDial } from './FrequencyDial'
import { Typewriter } from './Typewriter'

/**
 * Hero. Load: curtain reveal, split-screen entrance, blur-in headline, fade
 * sequence, mask-rise wordmark with a brief glitch, dial scale-up and needle
 * sweep, typewriter card. Ambient: WebGL liquid gradient (CSS blobs fallback),
 * cursor-reactive particles, spotlight, dot texture, parallax layers.
 */
export function Hero() {
  const [first, second] = SLOGAN.split(', ')
  const [cardTitle, cardPeriod, cardKind] = hero.card.split(' · ')

  return (
    <section aria-labelledby="hero-title" data-spotlight-host className="band-ink relative isolate overflow-hidden">
      <div data-fx-host="shader" className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="fx-liquid">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="fx-dots pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div data-fx-host="particles" className="absolute inset-0 -z-10" aria-hidden="true" />
      <div className="fx-spotlight" aria-hidden="true" />
      <div className="fx-curtain" aria-hidden="true">
        <span />
        <span />
      </div>

      <div data-fx="blur-out" className="relative z-[2] mx-auto grid min-h-[100svh] max-w-[90rem] items-center gap-6 px-5 pt-[4.5rem] pb-12 sm:gap-8 sm:pt-20 sm:pb-16 lg:gap-10 lg:pt-24 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="fx-from-left order-2 lg:order-1 lg:col-span-7">
          <div data-fx="parallax" style={{ ['--depth' as string]: '-90px' }}>
            {/* Official station logo (brand kit §2), self-hosted cut-out of the master artwork */}
            <img
              src="/brand/nyota-star-512.webp"
              srcSet="/brand/nyota-star-256.webp 256w, /brand/nyota-star-512.webp 512w, /brand/nyota-star-1024.webp 1024w"
              sizes="(min-width: 1024px) 19rem, (min-width: 640px) 14rem, 10rem"
              width={512}
              height={512}
              alt="Nyota 107.3 FM logo: a gold star with a microphone and the tagline Hapo Tulipo, Twang'aa"
              fetchPriority="high"
              decoding="async"
              className="brand-mark fx-scale-up block h-auto w-40 select-none sm:w-56 lg:w-[19rem]"
              draggable={false}
            />
          </div>
          <h1 id="hero-title" className="fx-blur-in fx-text-shadow mt-6 mb-4 max-w-[24ch] sm:mt-8 sm:mb-5 font-display text-[clamp(1.75rem,1.1rem+2.2vw,3.25rem)] leading-[1.08] font-normal text-paper" style={{ ['--d' as string]: '120ms' }}>
            {hero.headline}
          </h1>
          <p className="fx-blur-in measure m-0 text-body text-sage" style={{ ['--d' as string]: '220ms' }}>
            <Rich text={hero.lede} />
          </p>
          <div className="fx-fade-seq">
            <p className="fx-kinetic m-0 mt-6 font-body text-[1.375rem] font-bold italic tracking-[-0.01em] text-paper sm:text-heading">
              <Gloss term="hapo-tulipo">{`${first},`}</Gloss> <Gloss term="twangaa">{second}</Gloss>
            </p>
            <div className="no-print mt-8 flex flex-wrap items-center gap-6 sm:mt-10">
              <Button href="#in-short" variant="primary" arrow="down" className="fx-magnetic fx-shine fx-ripple">
                {hero.cta}
              </Button>
            </div>
          </div>
        </div>

        <div className="fx-from-right order-1 mx-auto hidden w-full sm:block sm:max-w-[22rem] lg:order-2 lg:col-span-5 lg:max-w-[28rem]">
          <div data-fx="parallax" style={{ ['--depth' as string]: '70px' }}>
            <div className="fx-scale-up">
              <FrequencyDial />
            </div>
            <div className="fx-tilt fx-glow relative mx-auto -mt-2 hidden max-w-[22rem] rounded-md border border-paper/10 bg-paper/5 p-4 backdrop-blur-md sm:block">
              <p className="fx-depth m-0 text-small text-paper">
                <Typewriter text={cardTitle} />
              </p>
              <div className="dotted-current my-2 h-0 text-sage-dim" aria-hidden="true" />
              <p className="fx-depth m-0 flex justify-between text-small text-sage">
                <span>{cardPeriod}</span>
                <span>{cardKind}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="no-print pointer-events-none absolute right-2 top-1/2 z-[2] m-0 hidden -translate-y-1/2 rotate-180 font-mono text-small tracking-[0.2em] text-sage-dim [writing-mode:vertical-rl] md:block" aria-hidden="true">
        {hero.sideTab}
      </p>

      <a href="#in-short" className="fx-float no-print absolute bottom-8 left-1/2 z-[2] hidden h-24 w-24 -translate-x-1/2 place-items-center rounded-full border border-hairline text-sage transition-colors hover:border-paper hover:text-paper md:grid" aria-label="Scroll to continue">
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
