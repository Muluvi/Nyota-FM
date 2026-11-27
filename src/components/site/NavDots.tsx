import { sections } from '../../content/sections'
import { accentBg } from '../chapter/accent'

/**
 * B8 · Side-mounted dots for section awareness (desktop). They mirror the menu
 * spine; the active dot grows and takes its chapter's accent; labels slide in
 * on hover or focus.
 */
export function NavDots({ active }: { active: string | null }) {
  const list = sections.filter((s) => s.kind !== 'reference')
  return (
    <nav aria-label="Section dots" className="no-print fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 xl:block">
      <ol className="m-0 flex list-none flex-col gap-1 p-0">
        {list.map((s) => {
          const on = s.id === active
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-current={on ? 'location' : undefined} className="group relative flex h-7 w-7 items-center justify-center" aria-label={`${s.number} ${s.label}`}>
                <span
                  className={`block rounded-full transition-all duration-500 ${on ? `h-3 w-3 ${accentBg[s.accent]}` : 'h-1.5 w-1.5 bg-sage-dim group-hover:h-2.5 group-hover:w-2.5 group-hover:bg-paper'}`}
                  aria-hidden="true"
                />
                <span className="pointer-events-none absolute right-8 translate-x-2 whitespace-nowrap rounded-full bg-ink-2 px-3 py-1 text-small text-paper opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" aria-hidden="true">
                  <span className="font-mono text-sage">{s.number}</span> {s.label}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
