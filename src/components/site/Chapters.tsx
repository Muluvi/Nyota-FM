import { useEffect } from 'react'
import { chapters } from '../../content/chapters'
import { chapterSections } from '../../content/sections'
import type { FeaturedKey } from '../../content/chapters/types'
import { ChapterShell } from '../chapter/ChapterShell'
import { Mandates } from '../featured/Mandates'
import { Counties } from '../featured/Counties'
import { PaybackExplorer } from '../featured/PaybackExplorer'
import { OpportunityIndex } from '../featured/OpportunityIndex'
import { StrategyGroups } from '../featured/StrategyGroups'
import { BuildRoadmap } from '../featured/BuildRoadmap'
import { GapChecklist } from '../featured/GapChecklist'
import { Asks } from './Asks'
import { Sources } from './Sources'

const featured: Record<FeaturedKey, () => React.ReactNode> = {
  mandates: () => <Mandates />,
  counties: () => <Counties />,
  payback: () => <PaybackExplorer />,
  opportunities: () => <OpportunityIndex />,
  strategies: () => <StrategyGroups />,
  build: () => <BuildRoadmap />,
  gaps: () => <GapChecklist />,
}

/** Chapters 01–07, the asks and sources: loaded right after the first paint. */
export default function Chapters({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady()
  }, [onReady])
  return (
    <>
      {chapterSections.map((s) => (
        <ChapterShell key={s.id} section={s} copy={chapters[s.id]} featured={featured[chapters[s.id].featured]()} />
      ))}
      <Asks />
      <Sources />
    </>
  )
}
