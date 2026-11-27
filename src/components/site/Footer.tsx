import { SLOGAN, SUBMITTED_BY, UPDATED_ISO, UPDATED_LABEL, VERSION } from '../../content/meta'
import { Button } from '../ui/Button'
import { Gloss } from '../ui/Gloss'
import { BrandLogo } from './BrandLogo'

/** K1 + C10: closing line, one CTA, giant wordmark sign-off, slim facts. */
export function Footer() {
  const [first, second] = SLOGAN.split('. ')
  return (
    <footer className="fx-mesh band-ink relative overflow-hidden border-t border-hairline pb-28">
      <hr className="fx-divider absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto max-w-[90rem] px-5 pt-16 sm:px-8 sm:pt-20 lg:px-12">
        <p className="fx-kinetic m-0 font-display text-display-l italic text-paper">
          <Gloss term="hapa-tulipo">{`${first}.`}</Gloss> <Gloss term="twangaa">{second}</Gloss>
        </p>
        <div className="no-print mt-8">
          <Button href="#asks">Review the six asks</Button>
        </div>
        <p className="fx-tracking m-0 mt-16 select-none font-wordmark text-display-xl font-extrabold uppercase leading-[0.8]" aria-hidden="true" data-fx="parallax" style={{ ['--depth' as string]: '40px' }}>
          <span className="fx-stroke fx-3d">Nyota</span> <span className="fx-gradient-text">107.3</span>
        </p>
        <div className="mt-10 grid gap-6 border-t border-hairline pt-6 text-small text-sage sm:grid-cols-3">
          <p className="m-0">
            <BrandLogo />
            Nyota Frequency Modulation Limited
            <br />
            Bungoma · 107.3 MHz · licensed by CA Kenya
          </p>
          <p className="m-0">
            {SUBMITTED_BY}
            <br />
            Strictly confidential ·{' '}
            <a href="#sources" className="fx-underline hover:text-paper">Sources</a> ·{' '}
            <a href="#appendix" className="fx-underline hover:text-paper">Appendix</a>
          </p>
          <p className="m-0 sm:text-right">
            {VERSION} · updated <time dateTime={UPDATED_ISO}>{UPDATED_LABEL}</time>
          </p>
        </div>
      </div>
    </footer>
  )
}
