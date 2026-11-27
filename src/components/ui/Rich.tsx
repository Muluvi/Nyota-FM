import { Fragment } from 'react'
import { parseRich } from '../../lib/richText'
import type { FigureId } from '../../content/figures'
import type { GlossaryKey } from '../../content/glossary'
import { Figure } from './Figure'
import { Gloss } from './Gloss'

interface RichProps {
  text: string
  /** Split plain words into `.hl-word` spans for the scroll highlight. */
  highlight?: boolean
}

/** Renders copy containing {f:id} and {g:key} tokens. */
export function Rich({ text, highlight = false }: RichProps) {
  return (
    <>
      {parseRich(text).map((part, i) => {
        if (part.kind === 'figure') return <Figure key={i} id={part.id as FigureId} className={highlight ? 'hl-word' : ''} />
        if (part.kind === 'gloss') return <Gloss key={i} term={part.key as GlossaryKey}>{part.text}</Gloss>
        if (!highlight) return <Fragment key={i}>{part.text}</Fragment>
        return (
          <Fragment key={i}>
            {part.text.split(/(\s+)/).map((w, j) =>
              /^\s+$/.test(w) || w === '' ? w : (
                <span key={j} className="hl-word">
                  {w}
                </span>
              ),
            )}
          </Fragment>
        )
      })}
    </>
  )
}
