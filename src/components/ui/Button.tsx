import type { ReactNode, MouseEventHandler } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

type Variant = 'outline' | 'primary'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  /** Arrow direction in the circle. */
  arrow?: 'up-right' | 'down' | 'none'
  className?: string
  tone?: 'dark' | 'light'
}

type ButtonProps = BaseProps & ({ href: string; onClick?: MouseEventHandler<HTMLAnchorElement> } | { href?: undefined; onClick: MouseEventHandler<HTMLButtonElement>; type?: 'button' | 'submit' })

/**
 * The one button style: an outline pill with an arrow in a circle.
 * `primary` (brass fill) is used once per screen.
 */
export function Button(props: ButtonProps) {
  const { children, variant = 'outline', arrow = 'up-right', className = '', tone = 'dark' } = props
  const base =
    'group inline-flex min-h-11 items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-body font-medium transition-colors duration-200'
  const styles =
    variant === 'primary'
      ? 'bg-brass text-ink hover:bg-paper'
      : tone === 'light'
        ? 'border border-ink/30 text-ink hover:border-ink'
        : 'border border-sage-dim/50 text-paper hover:border-paper'
  const circle =
    variant === 'primary' ? 'bg-ink text-brass' : tone === 'light' ? 'bg-ink text-paper' : 'bg-paper text-ink'
  const Icon = arrow === 'down' ? ArrowDown : ArrowUpRight
  const content = (
    <>
      <span>{children}</span>
      {arrow !== 'none' && (
        <span className={`grid h-8 w-8 place-items-center rounded-full ${circle}`} aria-hidden="true">
          <span className={`arrow-roll ${arrow === 'down' ? 'arrow-down-roll' : ''}`}>
            <Icon size={16} strokeWidth={2} />
            <Icon size={16} strokeWidth={2} />
          </span>
        </span>
      )}
    </>
  )
  if (props.href !== undefined) {
    return (
      <a href={props.href} onClick={props.onClick} className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    )
  }
  return (
    <button type={'type' in props && props.type ? props.type : 'button'} onClick={props.onClick} className={`${base} ${styles} ${className}`}>
      {content}
    </button>
  )
}
