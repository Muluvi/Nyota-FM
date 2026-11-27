import { useEffect } from 'react'
import { asks } from '../../content/data/asks'
import { inShort } from '../../content/chapters/intro'
import { PROPOSAL_PERIOD, PROPOSAL_TITLE, STATION, SUBMITTED_BY, UPDATED_LABEL, VERSION } from '../../content/meta'
import { renderPlain } from '../../lib/richText'

/** One-page decision sheet: the six asks with owner, measure and date. Print-first. */
export default function DecisionSheet() {
  useEffect(() => {
    document.title = `Decision sheet · ${STATION}`
    document.documentElement.classList.add('decision-sheet')
  }, [])

  return (
    <main className="mx-auto min-h-screen max-w-[52rem] bg-paper px-6 py-10 text-ink print:p-0">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
        <a href="./" className="inline-flex min-h-11 items-center text-ink underline underline-offset-4">← Back to the proposal</a>
        <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-paper">
          Print or save as PDF
        </button>
      </div>
      <header className="border-b border-ink/20 pb-5">
        <p className="m-0 font-mono text-small text-ink-on-paper">{STATION} · {PROPOSAL_TITLE} · {PROPOSAL_PERIOD}</p>
        <h1 className="mt-2 mb-0 font-display text-heading font-normal">Decision sheet</h1>
        <p className="mt-3 mb-0 text-body">{renderPlain(inShort.recommendation)}</p>
      </header>
      <table className="mt-6 w-full border-collapse text-left text-small">
        <caption className="sr-only">The six asks with owner, measure and date</caption>
        <thead>
          <tr className="border-b border-ink/30">
            <th scope="col" className="py-2 pr-2 font-medium">#</th>
            <th scope="col" className="py-2 pr-3 font-medium">Decision</th>
            <th scope="col" className="py-2 pr-3 font-medium">Owner</th>
            <th scope="col" className="py-2 pr-3 font-medium">Measure</th>
            <th scope="col" className="py-2 pr-3 font-medium">When</th>
            <th scope="col" className="py-2 font-medium">Approved</th>
          </tr>
        </thead>
        <tbody>
          {asks.map((a) => (
            <tr key={a.id} className="border-b border-ink/15 align-top">
              <td className="py-3 pr-2 font-mono">{a.id}</td>
              <td className="py-3 pr-3"><strong className="font-medium">{a.title}</strong><span className="block text-ink-on-paper">{a.desc}</span></td>
              <td className="py-3 pr-3">{a.owner}</td>
              <td className="py-3 pr-3">{a.measure}</td>
              <td className="py-3 pr-3">{a.when}</td>
              <td className="py-3"><span className="inline-block h-5 w-5 border border-ink/50" aria-label="Approval box" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs text-ink-on-paper">Owners and measures are mapped from the matching strategy or governance section and are provisional until confirmed by ownership.</p>
      <div className="mt-10 grid grid-cols-2 gap-10 text-small">
        <p className="m-0 border-t border-ink/40 pt-2">Chair, signature and date</p>
        <p className="m-0 border-t border-ink/40 pt-2">Station GM, signature and date</p>
      </div>
      <footer className="mt-10 border-t border-ink/20 pt-3 text-xs text-ink-on-paper">
        {SUBMITTED_BY} · Strictly confidential · {VERSION} · updated {UPDATED_LABEL}
      </footer>
    </main>
  )
}
