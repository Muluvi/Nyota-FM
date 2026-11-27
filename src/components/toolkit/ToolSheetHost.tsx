import { Suspense } from 'react'
import { useSettings } from '../../state/settings'
import { LoadBoundary, Skeleton } from '../chapter/DetailBlock'
import { Sheet } from '../ui/Sheet'
import { toolById } from './registry'

/** Opens a Toolkit widget in a focused sheet. Widgets load only on open. */
export function ToolSheetHost() {
  const { sheet, openSheet } = useSettings()
  const tool = sheet ? toolById(sheet) : undefined
  if (!tool) return null
  const close = () => openSheet(null)
  const navigate = (id: string) => {
    close()
    const map: Record<string, string> = { 'part-1': 'objectives', 'part-2': 'market', 'part-3': 'model', 'part-4': 'opportunities', 'part-5': 'strategies', 'part-6': 'build', 'part-7': 'gap-audit', 'part-asks': 'asks' }
    window.location.hash = map[id] ?? id
  }
  const body = (
    <LoadBoundary label={tool.name}>
      <Suspense fallback={<Skeleton label={`Loading ${tool.name}`} />}>
        <tool.Component onClose={close} onNavigate={navigate} />
      </Suspense>
    </LoadBoundary>
  )
  if (tool.ownsOverlay) return body
  return (
    <Sheet title={tool.name} subtitle={tool.illustrative ? `${tool.answers} Illustrative: names, quotes and figures are examples, not verified evidence.` : tool.answers} onClose={close} wide>
      {body}
    </Sheet>
  )
}
