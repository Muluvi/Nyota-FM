import React, { useState, useEffect } from 'react';
import { Presentation, ChevronLeft, ChevronRight, X, Maximize2, Minimize2, FileText, CheckCircle2, Sparkles, Printer } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

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

const SLIDES: Slide[] = [
  {
    id: 1,
    kicker: 'Slide 01 of 08 · Board Proposal',
    title: 'The Strategic Mandates',
    headline: 'Scaling Nyota FM from Traditional Audio to Western Kenya\'s Multi-Channel Leader',
    leadParagraph: 'A comprehensive, empirically costed business plan scaling broadcast reach, digital engagement, and commercial sustainability from 2026 to 2028.',
    bullets: [
      'Diversify from spot-heavy reliance to an 8-stream commercial portfolio.',
      'Achieve 40% non-spot revenue mix by Q4 2027.',
      'Deploy visual radio live streaming across YouTube, Facebook, and TikTok.',
    ],
    keyMetric: { value: '2.4×', label: 'Target Revenue Multiplier' },
    speakerNotes: 'Remind the Board that traditional Kenyan radio ad spend shrank by 5% in 2025. Diversification into digital and mobile is not optional—it is essential for survival.',
  },
  {
    id: 2,
    kicker: 'Slide 02 of 08 · Market Realities',
    title: 'Empirical Market Baseline',
    headline: 'Navigating the 2026 Kenyan Advertising Contraction',
    leadParagraph: 'Every figure in this plan is verified against CA Kenya, KNBS Census, and ReelAnalytics audited reports.',
    bullets: [
      'Betting and gaming advertising collapsed 89% on radio (falling to KSh 51M).',
      'Financial services, FMCG, and county government are now the top broadcast ad spenders.',
      'Western Kenya retains high radio loyalty with 81% daily penetration.',
    ],
    keyMetric: { value: '81%', label: 'Western Listenership Rate' },
    speakerNotes: 'Emphasize that we have explicitly eliminated speculative gambling sponsor dependencies and pivoted to agriculture, banks, and county public notices.',
  },
  {
    id: 3,
    kicker: 'Slide 03 of 08 · Addressable Audience',
    title: 'Regional Footprint',
    headline: '6.63 Million Citizens Across 5 Contiguous Counties',
    leadParagraph: 'Audited KNBS demographics covering Bungoma, Kakamega, Busia, Trans Nzoia, and Vihiga.',
    bullets: [
      '3.45M adult listener demographic with high commercial agricultural cashflow.',
      '27.42M feature phone users in Kenya require zero-data USSD participation.',
      'Bungoma headquarters gives an irreplaceable local physical presence over remote Nairobi stations.',
    ],
    keyMetric: { value: '6.63M', label: 'KNBS Population Baseline' },
    speakerNotes: 'National radio stations broadcast from Nairobi and do not understand local market day rhythms like Chwele or Lubao. That is our moat.',
  },
  {
    id: 4,
    kicker: 'Slide 04 of 08 · Studio Build Capex',
    title: 'Phased Capital Deployment',
    headline: 'Phase 1 Capex: KSh 627,299 (Saving KSh 1.5M vs Speculative Estimates)',
    leadParagraph: 'Pragmatic, commercially viable hardware quotes sourced from verified Kenyan broadcast suppliers.',
    bullets: [
      '2× Robotic PTZ Cameras (KSh 228,000) for automated visual switching.',
      'Blackmagic ATEM Television Studio HD (KSh 154,999) hardware video switcher.',
      'Studio acoustic paneling (KSh 110,000) eliminating street reverberation in Bungoma.',
    ],
    keyMetric: { value: 'KSh 627K', label: 'Phase 1 Capex Commitment' },
    speakerNotes: 'We are not overspending on luxury studio furniture. Every shilling invested directly generates monetizable digital video and stream inventory.',
  },
  {
    id: 5,
    kicker: 'Slide 05 of 08 · Payback Waterfall',
    title: 'Capital Recovery',
    headline: 'Full Breakeven by Month 5 (Base Case) and +332% Year 1 ROI',
    leadParagraph: 'An 8-quarter financial recovery model stress-tested across downside and upside sensitivities.',
    bullets: [
      'Conservative scenario recovers initial capital by Month 7.',
      'Base case achieves full breakeven in Month 5 with KSh 1.8M retained surplus by Month 12.',
      'Accelerated scenario recovers capital in Month 4 through early GAA registration.',
    ],
    keyMetric: { value: 'Month 5', label: 'Base Case Breakeven' },
    speakerNotes: 'The rapid payback is enabled by activating immediate high-margin revenue streams: WhatsApp push footers and OB roadshows in month one.',
  },
  {
    id: 6,
    kicker: 'Slide 06 of 08 · Digital & Mobile Pipeline',
    title: 'First-Party Audience CRM',
    headline: 'Zero-Data USSD (*483*107#) and WhatsApp Business API',
    leadParagraph: 'Capturing un-monetized radio listeners into an ODPC-compliant verified consumer database.',
    bullets: [
      'Africa\'s Talking USSD shortcode bridges the 27M Kenyan feature phone user base.',
      'WhatsApp BSP gateway drives automated commodity price alerts with paid sponsor tags.',
      'Safaricom M-Pesa B2C integration sends instant listener airtime rewards.',
    ],
    keyMetric: { value: '50,000+', label: 'Year 1 Opt-In Contacts' },
    speakerNotes: 'Advertisers no longer want vague listenership claims; they want verified phone numbers and audience participation receipts.',
  },
  {
    id: 7,
    kicker: 'Slide 07 of 08 · Centerpiece Gap Audit',
    title: 'Operational Readiness',
    headline: 'All 20 Proposal Completeness Gaps & 40 Build Items Resolved',
    leadParagraph: 'Systematic resolution of baseline audits, competitor metrics, regulatory compliance, and personnel budgets.',
    bullets: [
      'CA Kenya 10-year broadcast license fee audited (KSh 120,000 annual).',
      'ODPC statutory registration completed (KSh 4,000 Tier 1 compliance).',
      'Blanket CMO music licensing tariffs formalized (MCSK, PRISK, KAMP).',
    ],
    keyMetric: { value: '100%', label: 'Gaps Systematically Resolved' },
    speakerNotes: 'Ownership can review the interactive gap audit checklist in Part 7. There are zero uncosted assumptions in this plan.',
  },
  {
    id: 8,
    kicker: 'Slide 08 of 08 · Actionable Endorsements',
    title: 'The Six Asks of Ownership',
    headline: 'Immediate Board Approvals Required to Execute',
    leadParagraph: 'Five decisive governance endorsements authorizing management to commence procurement and hiring.',
    bullets: [
      '1. Authorize Phase 1 Studio Capex (KSh 627,299 – 837,299).',
      '2. Approve WhatsApp BSP & USSD infrastructure procurement with Africa\'s Talking (KSh 156,000).',
      '3. Authorize GAA national advertising register prequalification fee (KSh 100,000).',
      '4. Endorse the 4 flagship pre-recorded show packages and talent recruitment.',
      '5. Adopt the 8-quarter EBITDA payback and governance cadence.',
    ],
    keyMetric: { value: '5 Actions', label: 'Board Endorsements Requested' },
    speakerNotes: 'Once approved today, procurement commences immediately in Week 1, with visual radio streaming launching before Q2.',
  },
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
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(SLIDES.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        setIsOpen(false);
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
      >
        <Presentation size={14} className="text-brass" />
        <span className="hidden sm:inline">Presentation Mode</span>
        <span className="sm:hidden">Deck</span>
      </button>

      {/* Fullscreen Presentation Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-ink text-paper animate-section-entrance select-none"
          role="dialog"
          aria-modal="true"
        >
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
                    currentSlideIndex === idx ? 'w-8 bg-brass' : 'w-2 bg-stone-700 hover:bg-stone-500'
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
      )}
    </>
  );
}
