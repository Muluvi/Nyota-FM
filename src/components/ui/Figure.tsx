import { conflictVariants, figures, type FigureId } from '../../content/figures'
import { sourceHref, sourceLabel, externalSource } from '../../content/sources'
import { Popover } from './Popover'

interface FigureProps {
  id: FigureId
  /** Show the exact source value instead of the house-style display. */
  exact?: boolean
  className?: string
}

/** Every number on the site renders through here, with a citation popover. */
export function Figure({ id, exact = false, className = '' }: FigureProps) {
  const entry = figures[id]
  const text = exact && entry.exact ? entry.exact : entry.display
  const ext = externalSource(entry.sourceId)
  const variants = conflictVariants(entry)

  return (
    <Popover
      label={`Source for ${text}`}
      trigger={({ id: popId, open, toggle, onMouseEnter, onMouseLeave }) => (
        <button
          type="button"
          className={`fig-btn whitespace-nowrap ${className}`}
          aria-expanded={open}
          aria-controls={open ? popId : undefined}
          onClick={toggle}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          data-figure={id}
        >
          <span className="fig-value tabular">{text}</span>
          {!entry.verified && (
            <>
              <span className="fig-prov" aria-hidden="true" />
              <span className="sr-only"> (provisional)</span>
            </>
          )}
        </button>
      )}
    >
      <span className="block text-paper">{entry.note}</span>
      {entry.exact && entry.exact !== entry.display && (
        <span className="mt-2 block font-mono text-xs text-sage-dim">Source value: {entry.exact}</span>
      )}
      <a href={sourceHref(entry.sourceId)} className="mt-3 block text-brass underline-offset-4 hover:underline">
        {sourceLabel(entry.sourceId)}
        {ext ? ` · accessed ${ext.accessDate}` : ''}
      </a>
      {!entry.verified && (
        <span className="mt-3 block border-t border-hairline pt-3 text-xs text-sage-dim">
          Provisional: {entry.sourceId === 'unsourced' ? 'no source recorded.' : 'modelled or conflicting; awaiting owner confirmation.'}
          {variants.length > 0 && (
            <span className="mt-1 block">
              Other values for this concept: {variants.map((v) => v.display).join(' · ')}
            </span>
          )}
        </span>
      )}
    </Popover>
  )
}
