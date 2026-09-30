import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, DollarSign, Calendar, Clock, Users, Video, 
  Share2, ShieldCheck, ChevronRight, ChevronDown, ChevronUp, Search, Radio
} from 'lucide-react';
import { TierBadge } from './TierBadge';
import { Reveal } from '../ledger/Reveal';

interface StrategyItem {
  id: string;
  num: string;
  title: string;
  category: 'Content & Programming' | 'Studio Build' | 'Digital & Mobile' | 'Commercial & Revenue' | 'Community & Governance';
  strategy: string;
  whyThisWorks: string;
  dataReceipts: string[];
  execution: {
    lead: string;
    budget: string;
    timeline: string;
  };
  revenueMechanism: string;
  kpiMilestones?: {
    metric: string;
    m3: string;
    m6: string;
    m12: string;
    m24: string;
  }[];
  simpleKpis?: string[];
}

export function Part5Strategies() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>('5.1');

  const strategies: StrategyItem[] = [
    {
      id: '5.1',
      num: '5.1',
      title: 'Content Creation & The Four Pre-Recorded Shows',
      category: 'Content & Programming',
      strategy:
        'Produce four pristine, pre-recorded show formats — Asuhi ya Imani (Sunday morning gospel), Hapa Tulipo Mix (Friday night DJ set), Sauti ya Nchi (Sunday evening civic education), and Wanawake wa Twang\'aa (Saturday mid-morning women\'s lifestyle) — each packaged for title sponsorship, segment sponsorship, and derivative content across YouTube, TikTok, Instagram, and WhatsApp.',
      whyThisWorks:
        'Radio remains the most consumed medium in rural Kenya, with 81% listenership in Western Kenya (CA Kenya, Tier 1). Branded content commands a premium over spot advertising (2–3× spot CPM). The four shows cover four distinct advertiser categories: faith, music, civic, and women’s FMCG.',
      dataReceipts: [
        'Radio listenership Western Kenya: 81% (CA Kenya Q2 2025/26) → Justifies high production investment',
        'Betting ad spend collapsed 89% (ReelAnalytics) → Diversify away from betting reliance',
        'Financial services top radio sector (21%) → Target financial institutions for civic/lifestyle shows',
        'YouTube RPM Kenya: $0.67 (Dynamoi Data) → Derivative video creates incremental monetization'
      ],
      execution: {
        lead: 'Head of Digital + Content Producer',
        budget: 'KSh 150,000–250,000 per show / month',
        timeline: 'Shows 1 & 2 launch Q2 2026; Shows 3 & 4 launch Q3 2026'
      },
      revenueMechanism:
        'Title sponsor (KSh 80,000–150,000/month), Segment sponsor (KSh 30,000–50,000/month), Spot package (KSh 50,000–100,000/month), and YouTube AdSense revenue share.',
      kpiMilestones: [
        { metric: 'Shows on air', m3: '2', m6: '4', m12: '4', m24: '4' },
        { metric: 'Title sponsors signed', m3: '0', m6: '2', m12: '3', m24: '4' },
        { metric: 'YouTube subscribers', m3: '10,000', m6: '20,000', m12: '50,000', m24: '100,000' },
        { metric: 'Monthly show revenue', m3: 'KSh 200K', m6: 'KSh 500K', m12: 'KSh 800K', m24: 'KSh 1.2M' },
      ]
    },
    {
      id: '5.2',
      num: '5.2',
      title: 'Studio Build — Phase 1 (Visual Radio Foundation)',
      category: 'Studio Build',
      strategy:
        'Install two PTZ cameras, a Blackmagic ATEM Television Studio HD switcher, basic LED lighting, streaming encoder, and acoustic treatment in the main studio. This enables credible filmed radio and live streaming immediately.',
      whyThisWorks:
        'Transforms audio radio into video inventory for YouTube and Facebook livestreams. Allows sponsors visual product placement in front of on-air talent.',
      dataReceipts: [
        'PTZ camera KTUH86: KSh 114,000 (BS International, Tier 1)',
        'ATEM Television Studio HD: KSh 154,999 (Cellular Kenya, Tier 1)',
        'VISICO LED-50A 3-Light Kit: KSh 34,300 (Rondamo, Tier 1)',
        'Acoustic panels: KSh 5,500–12,500 (Soundproofing Kenya, Tier 1)'
      ],
      execution: {
        lead: 'Lead Station Engineer / IT-AV Lead',
        budget: 'KSh 627,299–837,299',
        timeline: 'Months 1–4 (Complete by Month 4)'
      },
      revenueMechanism:
        'Visual in-studio branded backdrop banners, video lower-thirds on livestreams, and live YouTube pre-roll ad insertions.',
      simpleKpis: [
        'Phase 1 installation 100% complete by Month 4',
        'Live streaming active on air with minimum 2× weekly full YouTube video streams by Month 6'
      ]
    },
    {
      id: '5.3',
      num: '5.3',
      title: 'Studio Build — Phase 2 (Multi-Cam Live Production)',
      category: 'Studio Build',
      strategy:
        'Expand to four PTZ cameras plus one operated camera, upgrade to ATEM Television Studio HD8 or Pro 4K, add dedicated vMix/OBS production computer, talk-back system, control-room build-out, and full lighting grid.',
      whyThisWorks:
        'Enables high-fidelity multi-guest debates, live musical performances, and broadcast-grade switcher transitions for national syndication.',
      dataReceipts: [
        'ATEM Television Studio HD8: KSh 455,800 (Rondamo, Tier 1)',
        '4× PTZ cameras: KSh 456,000–652,000 (BS International, Tier 1)'
      ],
      execution: {
        lead: 'Lead Station Engineer / IT-AV Lead',
        budget: 'KSh 1,841,800–2,957,800',
        timeline: 'Months 5–10'
      },
      revenueMechanism:
        'Live sponsored roundtable panel debates, multi-sponsor live music jam sessions, and video OB feeds.',
      simpleKpis: [
        'Control room operational with multi-camera live switcher by Month 10',
        'Daily 4-camera visual broadcast across morning and evening drive shows'
      ]
    },
    {
      id: '5.4',
      num: '5.4',
      title: 'Studio Build — Phase 3 (Full Multi-Platform Hub)',
      category: 'Studio Build',
      strategy:
        'Construct a secondary dedicated podcast and pre-record studio, install Digital Asset Management (DAM) system, long-term archive infrastructure, audience-data integration, and automated AI video clipping tooling.',
      whyThisWorks:
        'Decouples high-value pre-production from live on-air studio conflicts; auto-clipping tool extracts 10–15 short clips per show automatically.',
      dataReceipts: [
        'Second studio fit-out: KSh 1.5M–3.0M (modelled estimate)',
        'AI auto-clipping & DAM tooling: KSh 200,000–500,000 (industry benchmark)'
      ],
      execution: {
        lead: 'Head of Digital + Station Engineer',
        budget: 'KSh 2,500,000–5,800,000',
        timeline: 'Months 11–18'
      },
      revenueMechanism:
        'External studio rental to Western Kenya podcasters/NGOs, commercial audio production, and instant viral social short clip licensing.',
      simpleKpis: [
        'Secondary studio operational by Month 14',
        'DAM system archiving 100% of broadcast material with searchable transcript metadata'
      ]
    },
    {
      id: '5.5',
      num: '5.5',
      title: 'WhatsApp Business API Deployment',
      category: 'Digital & Mobile',
      strategy:
        'Onboard Africa\'s Talking as verified WhatsApp BSP. Deploy WhatsApp Channels, broadcast lists, and status updates for hyper-local daily engagement. Build opt-in database through on-air presenter CTAs and USSD cross-promotions.',
      whyThisWorks:
        'WhatsApp boasts 19.8% direct usage in Kenya (Media Council 2025). Direct push notifications bypass unpredictable social media algorithms.',
      dataReceipts: [
        'WhatsApp utility rate: $0.0040 (~KSh 0.52) per conversation (Meta/Ominiflow, Tier 1)',
        'Africa\'s Talking BSP setup: $85 setup + $50/month maintenance (Tier 1)'
      ],
      execution: {
        lead: 'Head of Digital + Community Manager',
        budget: 'KSh 50,000 setup + KSh 30,000/month messaging credit',
        timeline: 'Onboarding in Q1 2026; live on-air Q2 2026'
      },
      revenueMechanism:
        'Sponsored community announcements, paid event reminders, local agribusiness job alerts, and premium WhatsApp classified bulletins.',
      kpiMilestones: [
        { metric: 'Verified opt-in contacts', m3: '5,000', m6: '20,000', m12: '60,000', m24: '120,000' },
        { metric: 'Monthly WhatsApp revenue', m3: 'KSh 50K', m6: 'KSh 150K', m12: 'KSh 300K', m24: 'KSh 500K' },
      ]
    },
    {
      id: '5.6',
      num: '5.6',
      title: 'USSD Shortcode Deployment (*...#)',
      category: 'Digital & Mobile',
      strategy:
        'Procure dedicated USSD shortcode through CA Kenya and Africa\'s Talking. Design multi-lingual interactive menus (Swahili, Bukusu, Maragoli, English). Core use cases: micro-donations/M-Pesa voting, loyalty enrollment, on-air polling, daily agricultural alerts, and local business directory.',
      whyThisWorks:
        'Bridges the 27.42 million Kenyan feature phone connections (CA Kenya). Reaches rural listeners with zero mobile data bundles required.',
      dataReceipts: [
        'USSD setup: KES 145,000 setup + KES 70,000/mo maintenance (Africa\'s Talking, Tier 1)',
        'Feature phone user base: 27.42M active connections in Kenya (CA Kenya Sector Stats, Tier 1)'
      ],
      execution: {
        lead: 'Head of Digital + Developer Lead',
        budget: 'KSh 250,000 setup + KSh 80,000/month',
        timeline: 'Application Q1 2026; live on air by Q3 2026'
      },
      revenueMechanism:
        'Sponsored agricultural tips (KSh 10/query), premium on-air talent voting, SME classified listings, and mobile airtime sweepstakes.',
      simpleKpis: [
        'USSD shortcode fully live and operational in Q3 2026',
        '20,000 active monthly user sessions by Month 12',
        'KSh 600,000/month recurring gross mobile session revenue by Month 24'
      ]
    },
    {
      id: '5.7',
      num: '5.7',
      title: 'Social Media Channel Architecture',
      category: 'Digital & Mobile',
      strategy:
        'Maintain a disciplined platform matrix across Facebook (livestreams and community groups), TikTok (organic cultural discovery), Instagram (visual aesthetic and presenter lifestyle), X (real-time civic debate), and LinkedIn (B2B advertiser credibility).',
      whyThisWorks:
        'Prevents lazy duplicate posting. Each platform fulfills a distinct audience conversion job in the listener funnel.',
      dataReceipts: [
        'Nyota baseline: ~5,740 Facebook followers (v1.0 audited baseline)',
        'Smartphone penetration: 92.9% across mobile devices in Kenya (CA Kenya, Tier 1)'
      ],
      execution: {
        lead: 'Social Media Manager',
        budget: 'KSh 80,000/month operational tools & assets',
        timeline: 'Immediate implementation from Month 1'
      },
      revenueMechanism:
        'Brand cross-posting packages, influencer presenter endorsements, sponsored story takeovers, and co-branded TikTok challenges.',
      kpiMilestones: [
        { metric: 'Facebook Followers', m3: '8,000', m6: '15,000', m12: '40,000', m24: '80,000' },
        { metric: 'TikTok Followers', m3: '5,000', m6: '15,000', m12: '50,000', m24: '100,000' },
        { metric: 'Instagram Followers', m3: '3,000', m6: '8,000', m12: '20,000', m24: '40,000' },
      ]
    },
    {
      id: '5.8',
      num: '5.8',
      title: 'YouTube & Long-Form Video Strategy',
      category: 'Digital & Mobile',
      strategy:
        'Position YouTube as the long-form digital library and living video archive of Western Kenya. Publish complete show replays, full studio livestream VODs, investigative mini-docs, and acoustic studio sessions.',
      whyThisWorks:
        'YouTube provides evergreen programmatic monetization (AdSense) that continues to generate cash flow years after broadcast.',
      dataReceipts: [
        'Kenyan music/culture YouTube RPM: $0.6719 per 1,000 views (Dynamoi Data, Tier 1)',
        'Partner threshold: 1,000 subscribers + 4,000 watch hours (YouTube Policy, Tier 1)'
      ],
      execution: {
        lead: 'Video Producer + Head of Digital',
        budget: 'KSh 70,000/month editing & thumbnails',
        timeline: 'Relaunch in Q2 2026'
      },
      revenueMechanism:
        'YouTube Partner Program AdSense revenue, YouTube Channel Memberships, and integrated mid-video branded shout-outs.',
      simpleKpis: [
        'Reach 40,000 subscribers & 500,000 monthly views by Month 12',
        'Achieve KSh 300,000/month recurring YouTube AdSense & sponsorship revenue by Month 24'
      ]
    },
    {
      id: '5.9',
      num: '5.9',
      title: 'Podcast Strategy & Global Distribution',
      category: 'Content & Programming',
      strategy:
        'Extract and remaster the audio tracks of the four pre-recorded shows for syndication across Spotify, Apple Podcasts, and Google. Build an on-demand listener franchise untethered from the linear FM transmitter.',
      whyThisWorks:
        'Engages the affluent urban commuter and international Luhya diaspora who cannot tune into 107.3 FM in Western Kenya.',
      dataReceipts: [
        'African podcast programmatic CPM: $3–$8 per 1,000 downloads (AfroTools, Tier 1)',
        'Sponsorship flat rates: $500–$5,000 per episode for established shows (AfroTools, Tier 1)'
      ],
      execution: {
        lead: 'Audio Sound Designer / Producer',
        budget: 'KSh 30,000/month hosting & mastering',
        timeline: 'Launch Q2 2026'
      },
      revenueMechanism:
        'Dynamic ad insertion (DAI), host-read sponsor endorsements, and branded corporate podcast miniseries.',
      simpleKpis: [
        '40 episodes published across 4 branded seasons by Month 12',
        '20,000 monthly podcast downloads by Month 12'
      ]
    },
    {
      id: '5.10',
      num: '5.10',
      title: 'Streaming & Simulcast Stack',
      category: 'Digital & Mobile',
      strategy:
        'Solidify low-latency 24/7 audio simulcast via Zeno.fm and TuneIn; integrate redundant multi-stream encoders broadcasting live video to YouTube and Facebook simultaneously.',
      whyThisWorks:
        'Captures the diaspora audience in Nairobi, Mombasa, and overseas who desire an authentic home connection.',
      dataReceipts: [
        'Zeno.fm baseline: ~2,000 concurrent listeners recorded (v1.0 baseline observation)'
      ],
      execution: {
        lead: 'Station IT / AV Engineer',
        budget: 'KSh 25,000/month cloud streaming bandwidth',
        timeline: 'Immediate optimization in Month 1'
      },
      revenueMechanism:
        'Audio stream pre-roll programmatic audio adverts and diaspora-targeted remittances ad banners.',
      simpleKpis: [
        'Reach 5,000 concurrent audio listeners and 2,000 simultaneous video livestream viewers by Month 12'
      ]
    },
    {
      id: '5.11',
      num: '5.11',
      title: 'Outside Broadcast (OB) & Events Circuit',
      category: 'Commercial & Revenue',
      strategy:
        'Execute a recurring branded roadshow circuit across the five counties: open-air market centres, agricultural shows, college campuses, and county town plazas under the banner "Hapa Tulipo Tour".',
      whyThisWorks:
        'Physical presence cements vernacular community loyalty and provides commercial brands with experiential BTL sampling booths.',
      dataReceipts: [
        'Western Kenya radio reach: 81% in rural regions (CA Kenya, Tier 1)'
      ],
      execution: {
        lead: 'Commercial Director + Events Coordinator',
        budget: 'KSh 250,000–400,000 per OB activation',
        timeline: 'First activation Q3 2026; monthly cadence in Year 2'
      },
      revenueMechanism:
        'Anchor brand experiential naming rights (KSh 300K–600K/stop), booth vendor setup fees, and county health sponsorship.',
      simpleKpis: [
        '6 field activations completed in Year 1; 12 activations in Year 2',
        'KSh 3,000,000 annual event revenue generated by Month 24'
      ]
    },
    {
      id: '5.12',
      num: '5.12',
      title: 'Branded & Sponsored Show Packages',
      category: 'Commercial & Revenue',
      strategy:
        'Package marquee live and pre-recorded slots into comprehensive 360-degree commercial bundles: verbal presenter mentions, visual logo overlays on YouTube, WhatsApp community shout-outs, and guaranteed digital clip derivatives.',
      whyThisWorks:
        'Moves advertisers away from commoditised 30-second spots into high-retention contextual content partnerships.',
      dataReceipts: [
        'Radio ad market contracted 5% (ReelAnalytics) → Spot discounting pressure requires bundled packages'
      ],
      execution: {
        lead: 'Head of Sales + Commercial Traffic Lead',
        budget: 'Existing sales commission structures',
        timeline: 'Sales collateral roll-out in Q2 2026'
      },
      revenueMechanism:
        'Monthly retainer show sponsorships (Tier 2 model: KSh 150,000–350,000/month per show).',
      simpleKpis: [
        '3 title sponsors secured by Month 12',
        'KSh 1,000,000/month branded show revenue achieved by Month 24'
      ]
    },
    {
      id: '5.13',
      num: '5.13',
      title: 'Digital Advertising & Advertiser Portal',
      category: 'Commercial & Revenue',
      strategy:
        'Deploy an automated, self-serve advertiser portal on the revamped nyotafm.com web domain. Allow regional SMEs, schools, and event promoters to book classifieds, digital banners, and radio spot combos using M-Pesa.',
      whyThisWorks:
        'Reduces sales friction for small rural merchants in Kimilili, Webuye, Kitale, and Bungoma who cannot afford agency bookings.',
      dataReceipts: [
        'Kenya M-Pesa merchant integration: standard Safaricom Daraja API'
      ],
      execution: {
        lead: 'Head of Digital + Web Lead',
        budget: 'KSh 200,000–350,000 portal development',
        timeline: 'Go-live in Q4 2026'
      },
      revenueMechanism:
        'Direct automated M-Pesa till receipts for digital classifieds (KSh 1,000–5,000) and display banner packages (KSh 10,000–30,000).',
      simpleKpis: [
        'Advertiser portal live in Q4 2026',
        '30 active self-serve digital advertisers and KSh 300,000/month revenue by Month 24'
      ]
    },
    {
      id: '5.14',
      num: '5.14',
      title: 'Government & Development Partner Funding',
      category: 'Commercial & Revenue',
      strategy:
        'Complete registration on the GAA National Register of Accredited Media Providers; submit IFMIS prequalification for Bungoma and Kakamega counties; package "Sauti ya Nchi" for grant funding from USAID, DFID, and climate NGOs.',
      whyThisWorks:
        'Government and development partners represent the largest single institutional spenders on civic education and health campaigns in Kenya.',
      dataReceipts: [
        'Bungoma Assembly Tender BGM/CNTY/OT/FWC/05/07/2026-2028 (Tier 1)',
        'GAA National Register prequalification guidelines (Tier 1)'
      ],
      execution: {
        lead: 'General Manager + Firefly Advisory',
        budget: 'KSh 150,000 compliance filing and legal costs',
        timeline: 'GAA application in Q1 2026; approvals Q2 2026'
      },
      revenueMechanism:
        'Annual county communication framework contracts and NGO civic airtime underwriting.',
      simpleKpis: [
        'GAA registration secured by Q2 2026',
        'KSh 2,000,000 institutional revenue in Year 1; KSh 5,000,000 in Year 2'
      ]
    },
    {
      id: '5.15',
      num: '5.15',
      title: 'Merchandise Catalogue (12 SKUs)',
      category: 'Commercial & Revenue',
      strategy:
        'Roll out a curated 12-item branded merchandise line: T-shirts, branded lanyards, ceramic mugs, trucker caps, hoodies, tote bags, water bottles, golf umbrellas, notebooks, metal pens, die-cut stickers, and vehicle decals. Utilize local print-on-demand suppliers in Nairobi and Eldoret to eliminate inventory holding risk.',
      whyThisWorks:
        'Turns listeners into walking billboards and creates physical touchpoints at OB activations without committing tied-up working capital.',
      dataReceipts: [
        'Mocky.co.ke local printing benchmarks: T-shirts KSh 450–700 unit cost (Tier 1)'
      ],
      execution: {
        lead: 'Community Manager',
        budget: 'KSh 100,000 sample runs & promotional inventory',
        timeline: 'Catalogue launch in Q3 2026'
      },
      revenueMechanism:
        'Direct retail sales on-air, at OB roadshows, and bundled with loyalty VIP memberships.',
      simpleKpis: [
        '3,000 units sold across 5 counties by Month 12',
        'KSh 500,000 net profit generated by Month 12'
      ]
    },
    {
      id: '5.16',
      num: '5.16',
      title: 'Syndication & Content Licensing',
      category: 'Commercial & Revenue',
      strategy:
        'Format and master high-production cultural segments, legal civic explainers, and Bukusu agricultural guides for syndication to border radio stations in Busia Uganda, Tororo, and North Rift community frequencies.',
      whyThisWorks:
        'Generates pure 100% margin revenue on assets whose production cost has already been written off in primary broadcast.',
      dataReceipts: [
        'East Africa border vernacular listeners: cross-border Samia and Bukusu populations'
      ],
      execution: {
        lead: 'Commercial Director',
        budget: 'KSh 50,000 syndication contract agreements',
        timeline: 'Initial deals in Year 2 (Q2 2027)'
      },
      revenueMechanism:
        'Monthly show licensing fees (KSh 30,000–80,000/month per affiliate station) or airtime barter barter-split.',
      simpleKpis: [
        '1 syndication contract signed by Month 12',
        '3 active affiliate stations generating KSh 1,000,000 annual licensing revenue by Month 24'
      ]
    },
    {
      id: '5.17',
      num: '5.17',
      title: 'Diaspora Engagement & Remittances Layer',
      category: 'Commercial & Revenue',
      strategy:
        'Launch dedicated diaspora programming blocks on Sunday afternoons. Partner with cross-border remittance providers and diaspora property developers in Nairobi for sponsored greeting slots and real estate showcases.',
      whyThisWorks:
        'The Luhya diaspora maintains massive familial financial flow back to Western Kenya for agriculture, land, and school fees.',
      dataReceipts: [
        'Central Bank of Kenya diaspora remittance inflows exceed $4 billion annually'
      ],
      execution: {
        lead: 'Head of Sales + Weekend Producer',
        budget: 'KSh 100,000 marketing to diaspora social groups',
        timeline: 'Launch in Q2 2027'
      },
      revenueMechanism:
        'Sponsored diaspora family greetings, property developer title sponsorships, and remittance promo codes.',
      simpleKpis: [
        '20,000 diaspora contacts in WhatsApp channel by Month 24',
        'KSh 200,000/month diaspora advertising revenue achieved by Month 24'
      ]
    },
    {
      id: '5.18',
      num: '5.18',
      title: 'Listener Data & "Twang\'aa Club" Loyalty Programme',
      category: 'Community & Governance',
      strategy:
        'Establish a structured, tiered listener loyalty club (Bronze, Silver, Gold). Listeners accumulate points via USSD check-ins, WhatsApp poll answers, and event attendance, redeemable for airtime top-ups, merchandise, and VIP OB access.',
      whyThisWorks:
        'Incentivises continuous cross-platform engagement, driving up the Cross-Platform Engagement Index (CPEI) in the Net Listener Score formula.',
      dataReceipts: [
        'ODPC Data Controller registration fee: KSh 4,000 (Tier 1 legal compliance)'
      ],
      execution: {
        lead: 'Community Manager + Data Insights Lead',
        budget: 'KSh 100,000 loyalty software setup + airtime reward pool',
        timeline: 'Roll-out in Q4 2026'
      },
      revenueMechanism:
        'Sponsored loyalty reward partners (e.g. FMCG brands offering airtime discounts in exchange for survey answers).',
      simpleKpis: [
        '20,000 active club members by Month 12',
        '50,000 registered loyalty members by Month 24'
      ]
    },
    {
      id: '5.19',
      num: '5.19',
      title: 'Community Management SLAs & Paid Media Pillars',
      category: 'Community & Governance',
      strategy:
        'Enforce strict digital response-time Service Level Agreements (WhatsApp: 30 mins, X: 1 hr, Facebook: 2 hrs, Instagram: 4 hrs). Structure paid media across three disciplined tiers: Brand Building (awareness), Always-On (retention), and Moment-Based (live breaking campaigns).',
      whyThisWorks:
        'Fast response turns casual callers into passionate advocates. Prevents listener alienation across social channels.',
      dataReceipts: [
        'Meta advertising CPM benchmark: KSh 50–150 (industry standard)'
      ],
      execution: {
        lead: 'Community Manager + Social Media Lead',
        budget: 'KSh 50,000–100,000/month paid social budget',
        timeline: 'SOPs operational from Day 30'
      },
      revenueMechanism:
        'Protects customer retention; drives conversion velocity for sponsored client marketing campaigns.',
      simpleKpis: [
        '95% digital SLA compliance maintained monthly',
        '120% overall follower growth achieved across verified accounts by Month 24'
      ]
    },
    {
      id: '5.20',
      num: '5.20',
      title: 'Agricultural Value-Chain Advertising Engine',
      category: 'Commercial & Revenue',
      strategy:
        'Develop specialized agricultural commercial packages targeting maize seed companies, fertilizer suppliers, sugar millers, and tractor leasing services across Bungoma and Trans Nzoia. Bundle radio talk-ins with sponsored USSD crop alerts.',
      whyThisWorks:
        'Agriculture is the undisputed economic bedrock of Bungoma and Trans Nzoia counties, largely unimpacted by urban media shifts.',
      dataReceipts: [
        'Bungoma & Trans Nzoia produce >40% of Western Kenya commercial maize'
      ],
      execution: {
        lead: 'Commercial Director + Agribusiness Show Host',
        budget: 'KSh 50,000 collateral packaging',
        timeline: 'Deploy ahead of planting season in Q3 2026'
      },
      revenueMechanism:
        'Annual agro-dealer marketing packages and per-session sponsored USSD agricultural market-price queries.',
      simpleKpis: [
        '3 anchor agricultural corporate sponsors signed by Month 12',
        'KSh 1,500,000 annual dedicated agribusiness revenue by Month 24'
      ]
    },
    {
      id: '5.21',
      num: '5.21',
      title: 'Political Cycle Commercial & Editorial Planning (2027)',
      category: 'Commercial & Revenue',
      strategy:
        'Design a clear, upfront political advertising rate card for the 2027 General Election cycle featuring 100% advance payment terms and premium pricing. Enforce strict CA Kenya balanced airtime guidelines and anti-hate-speech moderation protocols.',
      whyThisWorks:
        'Kenyan general elections inject billions of shillings into media campaigns. Advance planning captures premium cash flow while insulating the station from licensing fines.',
      dataReceipts: [
        '2022 General Election media spend in Western Kenya exceeded KSh 150M across regional outlets'
      ],
      execution: {
        lead: 'General Manager + Commercial Director + Legal Counsel',
        budget: 'KSh 100,000 regulatory legal compliance review',
        timeline: 'Rate card published Q1 2027; execution through August 2027'
      },
      revenueMechanism:
        'Premium political town hall broadcast packages, live outdoor rally OB coverage, and candidate profile spots.',
      simpleKpis: [
        'Political rate card published and circulated by Q1 2027',
        'KSh 3,000,000+ incremental political ad revenue collected across 2027 with 0 CA sanctions'
      ]
    }
  ];

  const categories = [
    'all',
    'Content & Programming',
    'Studio Build',
    'Digital & Mobile',
    'Commercial & Revenue',
    'Community & Governance'
  ];

  const filtered = strategies.filter((st) => {
    const matchesCat = selectedCategory === 'all' || st.category === selectedCategory;
    const matchesQuery =
      st.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.strategy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.num.includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="bg-ink-2 border border-hairline rounded p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
            <div>
              <span className="text-[10px] font-mono text-brass uppercase tracking-widest font-semibold block">
                PART 5 · THE 21 ACTION STRATEGIES
              </span>
              <h4 className="font-display text-paper text-base font-semibold">
                Comprehensive Implementation Plans (5.1 through 5.21)
              </h4>
              <p className="text-xs text-sage mt-0.5">
                Every strategy includes rationale, verified data receipts, budget, leads, specific revenue mechanisms, and measurable milestone KPIs.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-moss/20 text-emerald-300 border border-moss/60 font-semibold self-start sm:self-auto">
              21 / 21 Fully Detailed
            </span>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-dim pointer-events-none" />
              <input
                type="text"
                placeholder="Search strategies (e.g. USSD, Studio, YouTube, WhatsApp, Politics)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-ink border border-hairline rounded pl-9 pr-3 py-2 text-paper focus:border-brass focus:outline-none text-xs"
              />
            </div>
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded whitespace-nowrap text-[11px] transition-colors ${
                    selectedCategory === cat
                      ? 'bg-brass text-ink font-bold'
                      : 'bg-ink text-sage hover:text-paper hover:bg-hairline'
                  }`}
                >
                  {cat === 'all' ? 'All (21)' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Strategy Accordion Items */}
          <div className="space-y-3 pt-2">
            {filtered.map((st) => {
              const isExpanded = expandedStrategy === st.id;
              return (
                <div
                  key={st.id}
                  className="bg-ink rounded border border-hairline overflow-hidden transition-all duration-200"
                >
                  {/* Strategy Header */}
                  <div
                    onClick={() => setExpandedStrategy(isExpanded ? null : st.id)}
                    className="p-4 flex items-start sm:items-center justify-between cursor-pointer hover:bg-ink-2 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-brass/10 border border-brass/40 text-brass shrink-0">
                        {st.num}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase text-sage-dim tracking-wider">
                            {st.category}
                          </span>
                        </div>
                        <h4 className="font-display text-sm sm:text-base text-paper font-medium">
                          {st.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden md:inline font-mono text-[11px] text-sage">
                        {st.execution.timeline}
                      </span>
                      <button className="text-sage hover:text-paper p-1">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 pt-1 border-t border-hairline space-y-4 text-xs font-body">
                      {/* Strategy statement */}
                      <div className="p-3 bg-ink-2 rounded border border-hairline">
                        <strong className="text-brass font-mono uppercase tracking-wider text-[10px] block mb-1">
                          Strategic Action Statement
                        </strong>
                        <p className="text-paper/95 leading-relaxed sm:text-[13px]">
                          {st.strategy}
                        </p>
                      </div>

                      {/* Why it works & Data Receipts */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-ink-2 rounded border border-hairline space-y-1">
                          <strong className="text-paper font-mono uppercase tracking-wider text-[10px] block">
                            Why This Strategy Works
                          </strong>
                          <p className="text-sage leading-relaxed">
                            {st.whyThisWorks}
                          </p>
                        </div>

                        <div className="p-3 bg-moss/10 rounded border border-moss/40 space-y-1.5 font-mono">
                          <strong className="text-emerald-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
                            <CheckCircle2 size={11} /> Data Receipts
                          </strong>
                          <ul className="space-y-1 text-[11px] text-sage">
                            {st.dataReceipts.map((rcpt, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-400">•</span>
                                <span>{rcpt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Execution Details & Revenue Mechanism */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                        <div className="p-2.5 bg-ink-2 rounded border border-hairline">
                          <span className="text-sage-dim text-[10px] block uppercase">Operational Lead</span>
                          <span className="text-paper font-semibold block mt-0.5">{st.execution.lead}</span>
                        </div>
                        <div className="p-2.5 bg-ink-2 rounded border border-hairline">
                          <span className="text-sage-dim text-[10px] block uppercase">Allocated Budget</span>
                          <span className="text-brass font-bold block mt-0.5">{st.execution.budget}</span>
                        </div>
                        <div className="p-2.5 bg-ink-2 rounded border border-hairline">
                          <span className="text-sage-dim text-[10px] block uppercase">Deployment Window</span>
                          <span className="text-paper font-semibold block mt-0.5">{st.execution.timeline}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-ink-2 rounded border border-brass/40 space-y-1 font-mono">
                        <span className="text-brass text-[10px] font-bold uppercase tracking-wider block">
                          Specific Revenue Generation Mechanism
                        </span>
                        <p className="text-paper/90 font-body text-xs leading-relaxed">
                          {st.revenueMechanism}
                        </p>
                      </div>

                      {/* Milestone KPIs Table if present */}
                      {st.kpiMilestones && (
                        <div className="space-y-1.5">
                          <span className="text-paper font-mono text-xs font-semibold block">
                            Milestone Scorecard (Months 3 to 24)
                          </span>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs font-mono">
                              <thead>
                                <tr className="border-b border-hairline text-sage-dim">
                                  <th className="py-1.5 pr-2">Metric</th>
                                  <th className="py-1.5 px-2">3 Months</th>
                                  <th className="py-1.5 px-2">6 Months</th>
                                  <th className="py-1.5 px-2">12 Months</th>
                                  <th className="py-1.5 pl-2">24 Months</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-hairline text-paper/90">
                                {st.kpiMilestones.map((kpi, kIdx) => (
                                  <tr key={kIdx} className="hover:bg-ink-2">
                                    <td className="py-2 pr-2 text-brass font-medium">{kpi.metric}</td>
                                    <td className="py-2 px-2">{kpi.m3}</td>
                                    <td className="py-2 px-2 text-sage">{kpi.m6}</td>
                                    <td className="py-2 px-2 text-paper font-semibold">{kpi.m12}</td>
                                    <td className="py-2 pl-2 text-emerald-400 font-bold">{kpi.m24}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Simple KPIs list if present */}
                      {st.simpleKpis && (
                        <div className="p-3 bg-ink-2 rounded border border-hairline space-y-1 font-mono text-xs">
                          <span className="text-paper font-semibold text-[11px] block">Key Target Deliverables:</span>
                          <ul className="space-y-1 text-sage text-[11px]">
                            {st.simpleKpis.map((skpi, sIdx) => (
                              <li key={sIdx} className="flex items-center gap-2">
                                <span className="text-brass">✔</span>
                                <span>{skpi}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
