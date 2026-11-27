import { glossary, type GlossaryKey } from '../../content/glossary'
import { Popover } from './Popover'

export function Gloss({ term, children }: { term: GlossaryKey; children?: string }) {
  const entry = glossary[term]
  return (
    <Popover
      label={`Definition of ${entry.term}`}
      trigger={({ id, open, toggle, onMouseEnter, onMouseLeave }) => (
        <button
          type="button"
          className="fig-btn gloss"
          aria-expanded={open}
          aria-controls={open ? id : undefined}
          aria-describedby={open ? id : undefined}
          onClick={toggle}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children ?? entry.term}
        </button>
      )}
    >
      <span className="block font-medium text-paper">{entry.term}</span>
      <span className="mt-1 block">{entry.definition}</span>
    </Popover>
  )
}
