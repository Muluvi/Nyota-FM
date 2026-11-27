import { Component, Suspense, type ReactNode } from 'react'
import { Disclosure } from '../ui/Disclosure'
import { detailComponents } from './detailLoaders'

export function Skeleton({ label = 'Loading' }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="space-y-3 py-4">
      <span className="sr-only">{label}…</span>
      <div className="skeleton h-6 w-2/3 rounded-md" />
      <div className="skeleton h-4 w-full rounded-md" />
      <div className="skeleton h-4 w-5/6 rounded-md" />
      <div className="skeleton h-40 w-full rounded-md" />
    </div>
  )
}

interface BoundaryState {
  failed: boolean
  attempt: number
}

/** Shows a calm retry when a lazy chunk fails (offline, flaky mobile data). */
export class LoadBoundary extends Component<{ children: ReactNode; label: string }, BoundaryState> {
  state: BoundaryState = { failed: false, attempt: 0 }
  static getDerivedStateFromError(): Partial<BoundaryState> {
    return { failed: true }
  }
  render() {
    if (this.state.failed) {
      return (
        <div role="alert" className="rounded-md border border-hairline p-5 text-small text-sage">
          <p className="m-0 text-paper">{this.props.label} did not load. Check the connection and try again.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 inline-flex min-h-11 items-center rounded-full border border-hairline px-4 text-paper hover:border-paper"
          >
            Retry
          </button>
        </div>
      )
    }
    return <div key={this.state.attempt}>{this.props.children}</div>
  }
}

/** The audit layer for a chapter: the original Part, closed by default. */
export function DetailBlock({ id, label, summary }: { id: string; label: string; summary: string }) {
  const Detail = detailComponents[id]
  return (
    <Disclosure id={`${id}-detail`} expandOnPrint title={`Read the detail: ${label}`} summary={summary}>
      {() => (
        <LoadBoundary label="The detail">
          <Suspense fallback={<Skeleton label="Loading the detail" />}>
            <div className="legacy pt-6">
              <Detail />
            </div>
          </Suspense>
        </LoadBoundary>
      )}
    </Disclosure>
  )
}
