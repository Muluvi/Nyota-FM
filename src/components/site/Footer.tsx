import { SLOGAN, SUBMITTED_BY, UPDATED_ISO, UPDATED_LABEL, VERSION } from '../../content/meta'
import { Button } from '../ui/Button'
import { Gloss } from '../ui/Gloss'

/** K1 + C10: closing line, one CTA, giant wordmark sign-off, slim facts. */
export function Footer() {
  const [first, second] = SLOGAN.split('. ')
  return (
    <footer className="band-ink overflow-hidden border-t border-hairline pb-28">
      <div className="mx-auto max-w-[90rem] px-4 pt-20 sm:px-8 lg:px-12">
        <p className="m-0 font-display text-display-l italic text-paper">
          <Gloss term="hapa-tulipo">{`${first}.`}</Gloss> <Gloss term="twangaa">{second}</Gloss>
        </p>
        <div className="no-print mt-8">
          <Button href="#asks">Review the six asks</Button>
        </div>
        <p className="m-0 mt-16 select-none font-wordmark text-display-xl font-extrabold uppercase leading-[0.8] text-paper/90" aria-hidden="true">
          Nyota 107.3
        </p>
        <div className="mt-10 grid gap-6 border-t border-hairline pt-6 text-small text-sage sm:grid-cols-3">
          <p className="m-0">
            Nyota Frequency Modulation Limited
            <br />
            Bungoma · 107.3 MHz · licensed by CA Kenya
          </p>
          <p className="m-0">
            {SUBMITTED_BY}
            <br />
            Strictly confidential ·{' '}
            <a href="#sources" className="underline decoration-hairline underline-offset-4 hover:text-paper">Sources</a> ·{' '}
            <a href="#appendix" className="underline decoration-hairline underline-offset-4 hover:text-paper">Appendix</a>
          </p>
          <p className="m-0 sm:text-right">
            {VERSION} · updated <time dateTime={UPDATED_ISO}>{UPDATED_LABEL}</time>
          </p>
        </div>
      </div>
    </footer>
  )
}
