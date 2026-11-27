import { toolsFor } from '../toolkit/registry'

/** One line linking the chapter to its Toolkit group in the Appendix. */
export function ToolkitLink({ id, label }: { id: string; label: string }) {
  const count = toolsFor(id).length
  if (!count) return null
  return (
    <p className="no-print m-0 text-small text-sage">
      <a href={`#toolkit-${id}`} className="text-paper underline decoration-hairline decoration-1 underline-offset-4 hover:decoration-paper">
        Tools for {label}
      </a>{' '}
      ({count} interactive {count === 1 ? 'tool' : 'tools'} in the Appendix)
    </p>
  )
}
