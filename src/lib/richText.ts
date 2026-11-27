import { figures, isFigureId } from '../content/figures'
import { glossary, isGlossaryKey } from '../content/glossary'

export type RichPart =
  | { kind: 'text'; text: string }
  | { kind: 'figure'; id: string }
  | { kind: 'gloss'; key: string; text?: string }

const TOKEN = /\{(f|g):([a-z0-9-]+)(?:\|([^}]+))?\}/g

/** Split copy into text, figure and glossary parts. Unknown tokens throw in dev. */
export function parseRich(input: string): RichPart[] {
  const parts: RichPart[] = []
  let last = 0
  for (const m of input.matchAll(TOKEN)) {
    const index = m.index ?? 0
    if (index > last) parts.push({ kind: 'text', text: input.slice(last, index) })
    const [, type, id, text] = m
    if (type === 'f') {
      if (!isFigureId(id)) throw new Error(`Unknown figure token: ${id}`)
      parts.push({ kind: 'figure', id })
    } else {
      if (!isGlossaryKey(id)) throw new Error(`Unknown glossary token: ${id}`)
      parts.push({ kind: 'gloss', key: id, text })
    }
    last = index + m[0].length
  }
  if (last < input.length) parts.push({ kind: 'text', text: input.slice(last) })
  return parts
}

/** Plain-text rendering for titles, meta tags, clipboard and search. */
export function renderPlain(input: string): string {
  return parseRich(input)
    .map((p) => {
      if (p.kind === 'text') return p.text
      if (p.kind === 'figure') return isFigureId(p.id) ? figures[p.id].display : ''
      return p.text ?? (isGlossaryKey(p.key) ? glossary[p.key].term : '')
    })
    .join('')
}
