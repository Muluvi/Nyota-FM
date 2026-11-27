import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

/** Props every toolkit entry may receive. Most widgets ignore them. */
export interface ToolProps {
  onClose: () => void
  onNavigate: (id: string) => void
}

export interface Tool {
  id: string
  name: string
  /** One line: what question this tool answers. */
  answers: string
  chapter: string
  /** Shown with an "illustrative" label (OPEN_QUESTIONS: unverified people, quotes or KPIs). */
  illustrative?: boolean
  /** The component renders its own full-screen overlay (no sheet wrapper). */
  ownsOverlay?: boolean
  Component: LazyExoticComponent<ComponentType<ToolProps>>
}

type Loader = () => Promise<Record<string, unknown>>

function load(loader: Loader, name: string): LazyExoticComponent<ComponentType<ToolProps>> {
  return lazy(() =>
    loader().then((m) => ({ default: (m[name] ?? m.default) as ComponentType<ToolProps> })),
  )
}

const w = (file: string): Loader => {
  const map: Record<string, Loader> = {
    InteractiveSchedule: () => import('../website/InteractiveSchedule'),
    TwangaaLexicon: () => import('../website/TwangaaLexicon'),
    PresenterRoster: () => import('../website/PresenterRoster'),
    EmergencyAlertConsole: () => import('../website/EmergencyAlertConsole'),
    CountyCoverageExplorer: () => import('../website/CountyCoverageExplorer'),
    CountyEconomicExplorer: () => import('../website/CountyEconomicExplorer'),
    TransmitterElevationTool: () => import('../website/TransmitterElevationTool'),
    CompetitorDialMap: () => import('../website/CompetitorDialMap'),
    AgriCommodityIndex: () => import('../website/AgriCommodityIndex'),
    ListenerVoxPop: () => import('../website/ListenerVoxPop'),
    CMORoyaltyCalculator: () => import('../website/CMORoyaltyCalculator'),
    InteractivePaybackSimulator: () => import('../website/InteractivePaybackSimulator'),
    CapexWaterfallSimulator: () => import('../website/CapexWaterfallSimulator'),
    TouchpointFilter: () => import('../TouchpointFilter'),
    TouchpointEcosystem: () => import('../v2/TouchpointEcosystem'),
    AdCampaignCalculator: () => import('../website/AdCampaignCalculator'),
    AdvertiserQuoteBuilder: () => import('../website/AdvertiserQuoteBuilder'),
    PodcastArchivePlayer: () => import('../website/PodcastArchivePlayer'),
    StrategyTracker: () => import('../website/StrategyTracker'),
    TwangaaMobileSimulator: () => import('../website/TwangaaMobileSimulator'),
    CivicNoticeBuilder: () => import('../website/CivicNoticeBuilder'),
    PoliticalRateCardEngine: () => import('../website/PoliticalRateCardEngine'),
    DiasporaHub: () => import('../website/DiasporaHub'),
    LoyaltyClubEngine: () => import('../website/LoyaltyClubEngine'),
    EditorialPolicyHandbook: () => import('../website/EditorialPolicyHandbook'),
    InteractiveStudioPlan: () => import('../website/InteractiveStudioPlan'),
    VisualRadioStudioSimulator: () => import('../website/VisualRadioStudioSimulator'),
    PowerResilienceMatrix: () => import('../website/PowerResilienceMatrix'),
    OBVanExplorer: () => import('../website/OBVanExplorer'),
    EquipmentLifecycleLog: () => import('../website/EquipmentLifecycleLog'),
    BrandIdentityViewer: () => import('../website/BrandIdentityViewer'),
    InteractiveGapAuditWorkbench: () => import('../website/InteractiveGapAuditWorkbench'),
    ExecutiveBriefingMode: () => import('../website/ExecutiveBriefingMode'),
    PresentationModeToggle: () => import('../website/PresentationModeToggle'),
    WebsiteFooter: () => import('../website/WebsiteFooter'),
    LiveRadioPlayer: () => import('../website/LiveRadioPlayer'),
  }
  return map[file]
}

const tool = (id: string, chapter: string, name: string, answers: string, file: string, extra: Partial<Tool> = {}): Tool => ({
  id,
  chapter,
  name,
  answers,
  Component: load(w(file), file),
  ...extra,
})

export const tools: Tool[] = [
  // 01 Objectives
  tool('schedule', 'objectives', '24-hour programming clock', 'What airs when, and which shows carry sponsors?', 'InteractiveSchedule'),
  tool('lexicon', 'objectives', "Twang'aa dialect lexicon", 'Which local words and phrases give the station its identity?', 'TwangaaLexicon'),
  tool('presenters', 'objectives', 'On-air presenter roster', 'Who presents, and which endorsements could they carry?', 'PresenterRoster', { illustrative: true }),
  tool('emergency', 'objectives', 'Emergency alert console', 'How would the station broadcast flood and safety alerts?', 'EmergencyAlertConsole'),
  // 02 Market data
  tool('coverage', 'market', 'County signal coverage explorer', 'Which towns and counties does 107.3 reach?', 'CountyCoverageExplorer'),
  tool('economy', 'market', 'County economic explorer', 'What does each county buy, grow and spend on?', 'CountyEconomicExplorer'),
  tool('elevation', 'market', 'Transmitter elevation tool', 'How do mast height and terrain change coverage?', 'TransmitterElevationTool'),
  tool('dial', 'market', 'Competitor dial map', 'Where does Nyota sit among ten regional stations?', 'CompetitorDialMap'),
  tool('agri', 'market', 'Agri-commodity price index', 'What would a sponsored crop-price bulletin look like?', 'AgriCommodityIndex'),
  tool('voxpop', 'market', 'Listener vox pop', 'What do listeners say they want? (sample voices)', 'ListenerVoxPop', { illustrative: true }),
  tool('royalties', 'market', 'Music royalty calculator', 'What will CMO music licences cost at different rotations?', 'CMORoyaltyCalculator'),
  // 03 The model
  tool('payback-sim', 'model', 'Payback simulator', 'How do scenario, studio phase and OB frequency change payback?', 'InteractivePaybackSimulator'),
  tool('waterfall', 'model', 'Capex payback waterfall', 'Month by month, when is the Phase 1 outlay recovered?', 'CapexWaterfallSimulator'),
  // 04 Opportunities
  tool('touchpoints', 'opportunities', 'Touchpoint ecosystem', 'What can a brand buy beyond airtime, and at what price?', 'TouchpointEcosystem'),
  tool('touchpoint-filter', 'opportunities', 'Social and streaming rate card', 'Which social and streaming placements fit a campaign budget?', 'TouchpointFilter'),
  tool('ad-calc', 'opportunities', 'Ad campaign calculator', 'What does a spot campaign cost by daypart and duration?', 'AdCampaignCalculator'),
  tool('quote', 'opportunities', 'Advertiser quote builder', 'What would a pro-forma quote for an advertiser contain?', 'AdvertiserQuoteBuilder'),
  tool('podcasts', 'opportunities', 'Podcast archive player', 'How would on-demand shows be packaged and sponsored?', 'PodcastArchivePlayer'),
  // 05 Strategies
  tool('tracker', 'strategies', 'Strategy tracker', 'Where is each strategy in the implementation sequence?', 'StrategyTracker'),
  tool('mobile-sim', 'strategies', 'USSD and WhatsApp journey', 'What does a listener see on a feature phone or WhatsApp?', 'TwangaaMobileSimulator'),
  tool('civic', 'strategies', 'Civic notice builder', 'How would a county notice or town hall be packaged?', 'CivicNoticeBuilder'),
  tool('political', 'strategies', 'Political rate card engine', 'How are 2027 election adverts priced and kept compliant?', 'PoliticalRateCardEngine'),
  tool('diaspora', 'strategies', 'Diaspora hub', 'How does the stream reach listeners outside Western Kenya?', 'DiasporaHub'),
  tool('loyalty', 'strategies', "Twang'aa Club loyalty engine", 'How do listeners earn and redeem loyalty points?', 'LoyaltyClubEngine'),
  tool('editorial', 'strategies', 'Editorial policy handbook', 'What editorial and fact-checking rules does the newsroom follow?', 'EditorialPolicyHandbook'),
  // 06 The build
  tool('studio-plan', 'build', 'Studio floor plan', 'Where does each piece of equipment go, and what does it cost?', 'InteractiveStudioPlan'),
  tool('switcher', 'build', 'Visual radio switcher', 'What does multi-camera visual radio look like on air?', 'VisualRadioStudioSimulator'),
  tool('power', 'build', 'Power resilience matrix', 'How does the studio stay on air through power cuts?', 'PowerResilienceMatrix'),
  tool('ob-van', 'build', 'OB van explorer', 'What does the outside broadcast unit carry and earn?', 'OBVanExplorer'),
  tool('equipment', 'build', 'Equipment lifecycle log', 'How is studio equipment registered and maintained?', 'EquipmentLifecycleLog'),
  tool('brand', 'build', 'Brand identity viewer', 'What are the proposed brand colours, type and usage rules?', 'BrandIdentityViewer'),
  // 07 Gap audit
  tool('workbench', 'gap-audit', 'Operational readiness workbench', 'Which readiness items are done, and what do they cost?', 'InteractiveGapAuditWorkbench'),
  // Appendix: earlier drafts and site chrome kept for completeness
  tool('briefing-memo', 'appendix', 'Five-resolution briefing memo (earlier draft)', 'What did the earlier board memo ask for? Superseded by the six asks.', 'ExecutiveBriefingMode'),
  tool('slide-deck', 'appendix', 'Eight-slide boardroom deck (earlier draft)', 'What did the earlier presentation deck say?', 'PresentationModeToggle'),
  tool('radio-player', 'appendix', 'Floating radio player (earlier version)', 'What did the earlier player look like? It plays a synthesised tone, not a live stream.', 'LiveRadioPlayer'),
  tool('station-profile', 'appendix', 'Station profile, inquiry form and privacy note', 'Who is the licensee, and how is listener data handled? (The inquiry form does not send.)', 'WebsiteFooter'),
]

export function toolsFor(chapter: string): Tool[] {
  return tools.filter((t) => t.chapter === chapter)
}

export function toolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id)
}
