import React, { useState, useEffect } from 'react';
import { Presentation, ChevronLeft, ChevronRight, X, Maximize2, Minimize2, FileText, CheckCircle2, Sparkles, Printer } from 'lucide-react';
import { factValue } from '../../data/facts';
import { paybackStatement } from '../../model/finance';
import { asks } from '../../data/asks';
import { Modal } from '../Modal';

interface Slide {
  id: number;
  title: string;
  kicker: string;
  headline: string;
  leadParagraph: string;
  bullets: string[];
  keyMetric: { value: string; label: string };
  speakerNotes: string;
}

const PAYBACK = paybackStatement();

const SLIDES: Slide[] = [
  {
    id: 1,
    kicker: 'Slide 01 of 08 · Board Proposal',
    title: 'The Strategic Mandates',
    headline: 'From a spot-dependent FM station to a multi-channel Western Kenya platform',
    leadParagraph: 'A costed 24-month plan, dated from Month 0 (board approval, assumed January 2027), to grow and diversify revenue.',
    bullets: [
      'Diversify from spot-heavy reliance to a multi-stream commercial portfolio.',
      'Target 40% non-spot revenue mix by Month 24.',
      'Add visual radio live streaming across YouTube, Facebook and TikTok.',
    ],
    keyMetric: { value: '2.0×', label: 'Base-case revenue target by Month 24 (Tier 2)' },
    speakerNotes:
      'Radio ad spend fell 5% in 2025 and radio took KES 11.9 B in H1 2026 (ReelAnalytics). The 2.0× multiplier is a target measured against an audited baseline we do not yet have; Ask 6 funds that baseline.',
  },
  {
    id: 2,
    kicker: 'Slide 02 of 08 · Market Realities',
    title: 'Market Baseline',
    headline: 'Fewer people listen daily, but most of Western Kenya still listens',
    leadParagraph: 'Figures are tiered by evidence. Tier 1 items cite CA Kenya, KNBS, MCK and ReelAnalytics; gaps are marked Tier 0.',
    bullets: [
      `Radio reach in Western Kenya is ${factValue('radio.reach.western')} (CA, Apr–Jun 2026); national daily listenership fell ${factValue('radio.dailyListenership')} (MCK, 2023–2025).`,
      'Only 16% of radio listening in Western is vernacular; Swahili dominates (CA). That supports a Swahili-first, Bukusu-flavoured format.',
      'Betting ad spend on radio fell 89% in one quarter (Jul–Sep 2025), but betting was the #3 sector market-wide in H1 2026. Nyota chooses not to depend on it.',
    ],
    keyMetric: { value: factValue('radio.reach.western'), label: 'Radio reach, Western (CA, Apr–Jun 2026)' },
    speakerNotes:
      'Leaving betting money is a values and regulatory choice, not a market fact. Lead with banking, agriculture (KES 494 M on radio in Apr–Jun 2026) and public-sector notices.',
  },
  {
    id: 3,
    kicker: 'Slide 03 of 08 · Addressable Audience',
    title: 'Regional Footprint',
    headline: '≈6.0 million people across five contiguous counties (KNBS 2019)',
    leadParagraph: 'Bungoma, Kakamega, Busia, Trans Nzoia and Vihiga: 6,012,184 people at the 2019 census, ≈6.6–6.8 M projected for 2025–26.',
    bullets: [
      'Kenya had 27.42 M feature-phone connections in June 2026 (CA): USSD reaches listeners without data.',
      'A Bungoma base gives local presence at market days that Nairobi-run stations do not have.',
      'Nyota’s own audience share is a Tier 0 gap until a Western Kenya survey is commissioned.',
    ],
    keyMetric: { value: '6.01M', label: 'Five-county population (KNBS 2019)' },
    speakerNotes: 'Projections are rounded because KNBS has not published county projections with a stated method for these years.',
  },
  {
    id: 4,
    kicker: 'Slide 04 of 08 · Studio Build Capex',
    title: 'Phased Capital Deployment',
    headline: 'Phase 1 capex: KSh 627,299 – 837,299',
    leadParagraph: 'Phase 1 only. Later phases return to the board once their revenue gates are met, and the all-phase total is being recomputed to include power and the OB rig.',
    bullets: [
      '2× robotic PTZ cameras for automated visual switching.',
      'Blackmagic ATEM Television Studio HD switcher.',
      'Studio acoustic treatment for the Bungoma on-air room.',
    ],
    keyMetric: { value: '≤ KSh 0.84M', label: 'Phase 1 capital requested' },
    speakerNotes: 'Vendor quotes need re-dating before procurement; prices are imported and exposed to the USD exchange rate.',
  },
  {
    id: 5,
    kicker: 'Slide 05 of 08 · Payback',
    title: 'Capital Recovery',
    headline: `Payback: ${PAYBACK.headline.toLowerCase()}`,
    leadParagraph: 'The model compares the plan with “do nothing”: new revenue minus displaced spot sales, new staff and services, royalties and capex.',
    bullets: [
      PAYBACK.detail,
      'The audited baseline (Ask 6) validates the lever ranges and unlocks the revenue index.',
      'Chapter 06 shows the cash curve, yearly P&L and which assumptions move NPV most.',
    ],
    keyMetric: { value: 'TBC', label: 'Payback, pending baseline audit' },
    speakerNotes: 'Quote the illustrative range only with its caveat; the board-ready number comes after the baseline audit (Ask 6).',
  },
  {
    id: 6,
    kicker: 'Slide 06 of 08 · Digital & Mobile Pipeline',
    title: 'First-Party Audience CRM',
    headline: 'USSD (code TBC) and the WhatsApp Business Platform',
    leadParagraph: 'Turning radio listeners into a consented, ODPC-registered contact base.',
    bullets: [
      'A dedicated Safaricom USSD code via Africa’s Talking costs KSh 70,000/month; 3–4 weeks to provision.', // data-ok: market fact, not a sponsor
      'WhatsApp is priced per message since 1 Jul 2025 (Rest of Africa: marketing $0.0225, utility $0.004).',
      'ODPC registration and opt-in consent come before any data is collected.',
    ],
    keyMetric: { value: '150K', label: 'Opt-in contacts by Month 24 (base target)' },
    speakerNotes: 'Advertisers want verified participation, not claimed listenership. The contact base starts near zero.',
  },
  {
    id: 7,
    kicker: 'Slide 07 of 08 · Gap Audit',
    title: 'Operational Readiness',
    headline: 'Known gaps are declared, owned and scheduled',
    leadParagraph: 'Part 7 lists every gap with one of three statuses: fixed, declared with a plan, or open.',
    bullets: [
      'ODPC registration: planned before the listener database opens (fees KSh 4,000–40,000 by tier).',
      'Music royalties: pay only CMOs licensed for the year under the 2026–2028 tariff (MCSK was not licensed for 2025–26).',
      'Audited revenue baseline and audience survey: open, funded through Ask 6.',
    ],
    keyMetric: { value: '3 statuses', label: 'Fixed · Declared · Open' },
    speakerNotes: 'We are not claiming everything is resolved. We are showing what is open and who owns it.',
  },
  ...[
    {
      id: 8,
      kicker: 'Slide 08 of 08 · Decisions',
      title: 'The Six Asks of Ownership',
      headline: 'Six decisions to start execution at Month 0',
      leadParagraph: 'The same six asks as the proposal and the executive briefing.',
      bullets: asks.map((a) => `${a.id}. ${a.title}${a.amount ? ` (${a.amount})` : ''}.`),
      keyMetric: { value: `${asks.length} asks`, label: 'Board decisions requested' },
      speakerNotes: 'If approved, procurement and filings start in Month 1. Payback is reported once the baseline audit is complete.',
    },
  ],
];

export function PresentationModeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const slide = SLIDES[currentSlideIndex];

  // Keyboard navigation: Left/Right arrows, Esc to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(SLIDES.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 rounded-lg border border-hairline bg-ink px-3 py-1.5 text-xs font-mono text-sage hover:border-brass hover:text-paper transition-all shadow-sm"
        title="Launch Boardroom Presentation Deck"
        aria-label="Presentation deck"
        data-ripple=""
      >
        <Presentation size={14} className="text-brass" />
        <span className="hidden 2xl:inline">Presentation </span>
        <span>Deck</span>
      </button>

      {/* Fullscreen Presentation Modal */}
      <Modal open={isOpen} onClose={() => setIsOpen(false)} label="Board presentation deck" className="m-0 h-dvh max-h-none w-screen max-w-none">
        <div className="flex h-full flex-col bg-ink text-paper select-none">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between border-b border-hairline px-6 py-3.5 bg-ink-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-brass uppercase tracking-widest">
                NYOTA FM 107.3 · BOARD PRESENTATION DECK
              </span>
              <span className="text-sage-dim">·</span>
              <span className="font-mono text-xs text-sage">
                Slide {currentSlideIndex + 1} of {SLIDES.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowNotes(!showNotes)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all border ${
                  showNotes
                    ? 'border-brass bg-brass text-ink font-bold'
                    : 'border-hairline bg-ink text-sage hover:text-paper'
                }`}
              >
                Speaker Notes
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded flex items-center justify-center border border-hairline text-sage hover:text-paper hover:border-brass transition-colors ml-2"
                aria-label="Close presentation"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main Slide Stage */}
          <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-6 py-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <span className="text-xs font-mono text-brass uppercase tracking-widest font-bold">
                  {slide.kicker}
                </span>
                <span className="text-xs font-mono text-sage-dim">
                  Western Kenya Broadcast Transformation
                </span>
              </div>

              <div>
                <span className="font-mono text-sm text-sage-dim uppercase tracking-wider block">
                  {slide.title}
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-paper mt-1 leading-tight">
                  {slide.headline}
                </h2>
              </div>

              <p className="font-serif italic text-lg sm:text-xl text-sage max-w-3xl leading-relaxed">
                "{slide.leadParagraph}"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                <div className="md:col-span-8 space-y-3">
                  {slide.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm sm:text-base text-paper">
                      <span className="h-2 w-2 rounded-full bg-brass shrink-0 mt-2" />
                      <span className="leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-4 rounded-xl border border-brass/50 bg-ink-2 p-5 text-center space-y-1 shadow-xl">
                  <span className="text-xs font-mono text-sage-dim uppercase tracking-wider block">
                    {slide.keyMetric.label}
                  </span>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-brass tabular-nums block">
                    {slide.keyMetric.value}
                  </span>
                </div>
              </div>

              {/* Speaker Notes Drawer */}
              {showNotes && (
                <div className="rounded-lg bg-ink-2 border border-hairline p-4 text-xs font-mono text-sage space-y-1 animate-section-entrance">
                  <span className="text-brass font-bold uppercase tracking-wider block">
                    SPEAKER EXECUTIVE NOTES:
                  </span>
                  <p className="font-sans leading-relaxed text-paper/90">{slide.speakerNotes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Slide Navigation Bar */}
          <div className="border-t border-hairline px-6 py-3 bg-ink-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-mono font-bold border border-hairline bg-ink disabled:opacity-30 disabled:cursor-not-allowed hover:border-brass transition-all"
            >
              <ChevronLeft size={16} />
              <span>Previous Slide</span>
            </button>

            {/* Slide Dots */}
            <div className="flex items-center gap-2">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlideIndex === idx ? 'w-8 bg-brass' : 'w-2 bg-hairline hover:bg-sage-dim'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentSlideIndex((prev) => Math.min(SLIDES.length - 1, prev + 1))}
              disabled={currentSlideIndex === SLIDES.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-mono font-bold bg-brass text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all shadow"
            >
              <span>Next Slide</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
