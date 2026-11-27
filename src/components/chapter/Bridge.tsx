import { ArrowLeft, ArrowRight } from 'lucide-react'
import { neighbours } from '../../content/sections'
import { Rich } from '../ui/Rich'

/** One-line bridge to the next chapter, plus previous / next links. */
export function Bridge({ id, text }: { id: string; text: string }) {
  const { prev, next } = neighbours(id)
  return (
    <nav aria-label="Chapter navigation" className="no-print">
      {next && (
        <p className="m-0 font-display text-heading text-paper">
          <Rich text={text} />{' '}
          <a href={`#${next.id}`} className="whitespace-nowrap text-brass underline decoration-1 underline-offset-[0.2em] hover:text-paper">
            {next.number} {next.label} →
          </a>
        </p>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-5 text-small">
        {prev ? (
          <a href={`#${prev.id}`} className="inline-flex min-h-11 items-center gap-2 text-sage hover:text-paper">
            <ArrowLeft size={16} aria-hidden="true" /> {prev.number} {prev.label}
          </a>
        ) : <span />}
        {next && (
          <a href={`#${next.id}`} className="inline-flex min-h-11 items-center gap-2 text-sage hover:text-paper">
            {next.number} {next.label} <ArrowRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </nav>
  )
}
