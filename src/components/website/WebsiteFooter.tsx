import React, { useState } from 'react';
import { Radio, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Heart, ArrowUp, Send, Check } from 'lucide-react';

export function WebsiteFooter({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [message, setMessage] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryModalOpen(false);
      setEmail('');
      setOrg('');
      setMessage('');
    }, 2500);
  };

  return (
    <>
      <footer className="mt-20 border-t border-hairline bg-ink-2 pt-16 pb-12 text-sage">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-hairline/70">
            {/* Column 1 & 2: Station Identity */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://res.cloudinary.com/da5j0zjok/image/upload/v1780508039/Untitled_design_20260603_203332_0000_e2md3o.png"
                  alt="Nyota FM 107.3"
                  className="h-8 w-auto brightness-0 invert"
                />
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-brass font-bold block">
                    107.3 FM · WESTERN KENYA
                  </span>
                  <span className="text-[11px] text-sage-dim">
                    Nyota Frequency Modulation Limited
                  </span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-sage/90 max-w-md font-body">
                Western Kenya&apos;s leading commercial and community voice. Broadcasting across Bungoma, Kakamega, Busia, Vihiga, and Trans Nzoia, reaching 1.8M+ weekly listeners across Swahili, Bukusu, and regional languages.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-sage-dim">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-brass" /> Bungoma & Kakamega Studios
                </span>
                <span className="flex items-center gap-1.5">
                  <Radio size={13} className="text-moss" /> Frequency: 107.3 MHz
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-brass" /> CA Kenya 10-Yr License
                </span>
              </div>
            </div>

            {/* Column 3: Platform Sections */}
            <div>
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-paper mb-3">
                Platform Blueprint
              </h4>
              <ul className="space-y-2 text-xs font-mono">
                {[
                  { id: 'overview', label: 'Strategic Overview' },
                  { id: 'part-1', label: '1. Ownership Objectives' },
                  { id: 'part-2', label: '2. Sourced Master Data' },
                  { id: 'part-3', label: '3. Payback & ROI Model' },
                  { id: 'part-4', label: '4. Revenue Matrix' },
                  { id: 'part-5', label: '5. 21 Action Plans' },
                  { id: 'part-6', label: '6. Phased Studio Build' },
                  { id: 'part-7', label: '7. Gap Audit Centerpiece' },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(link.id)}
                      className="text-sage hover:text-brass transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Commercial & Broadcast */}
            <div>
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-paper mb-3">
                Commercial & Media
              </h4>
              <ul className="space-y-2 text-xs font-mono">
                <li>
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(true)}
                    className="text-brass hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Partner & Ad Rates</span>
                    <ExternalLink size={11} />
                  </button>
                </li>
                <li>
                  <span className="text-sage-dim">Outside Broadcast Booking</span>
                </li>
                <li>
                  <span className="text-sage-dim">WhatsApp & USSD Campaigns</span>
                </li>
                <li>
                  <span className="text-sage-dim">Civic & County Government Desk</span>
                </li>
                <li>
                  <span className="text-sage-dim">Presenter Endorsements</span>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('part-asks')}
                    className="text-sage hover:text-paper transition-colors"
                  >
                    Governance & Resolutions
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 5: Evidence Standard */}
            <div>
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-paper mb-3">
                Governance & Standards
              </h4>
              <p className="text-xs text-sage leading-relaxed mb-3">
                Every metric is validated against 37 verified industry sources including KNBS, CA Kenya, GeoPoll, and ReelAnalytics.
              </p>
              <div className="space-y-1.5 text-[11px] font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  <span>Tier 1 · Hard Data Citations</span>
                </div>
                <div className="flex items-center gap-2 text-amber-300">
                  <span className="size-1.5 rounded-full bg-amber-400" />
                  <span>Tier 2 · Modelled Econometrics</span>
                </div>
                <div className="flex items-center gap-2 text-rose-300">
                  <span className="size-1.5 rounded-full bg-rose-400" />
                  <span>Tier 0 · Primary Research Gaps</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="mt-4 text-xs font-mono text-sage-dim hover:text-paper underline block"
              >
                Data Privacy & Regulatory Compliance
              </button>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Subtle Governance Tag */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-sage-dim">
            <div>
              © 2026 Nyota Frequency Modulation (FM) Limited · All rights reserved.
            </div>

            <div className="flex items-center gap-4 text-center sm:text-right">
              <span className="text-sage-dim">
                Licensed by Communications Authority of Kenya (CA) · ODPC Registered
              </span>
              <span className="hidden md:inline text-hairline">|</span>
              <span className="text-brass/70">
                Strategic Proposal v2.0
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Commercial Inquiry / Rate Card Modal */}
      {inquiryModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm animate-section-entrance"
          onClick={() => setInquiryModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-brass/50 bg-ink-2 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-brass font-bold">
                  COMMERCIAL INQUIRY
                </span>
                <h3 className="font-display text-2xl text-paper font-semibold">
                  Partner with Nyota FM 107.3
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInquiryModalOpen(false)}
                className="text-sage hover:text-paper"
              >
                ✕
              </button>
            </div>

            {inquirySubmitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-moss/20 text-moss">
                  <Check size={24} />
                </div>
                <h4 className="font-display text-xl text-paper font-semibold">Inquiry Dispatched</h4>
                <p className="text-xs text-sage max-w-sm mx-auto">
                  Thank you. Nyota FM&apos;s commercial sales desk will share our 2026 media kit, rate cards, and outside broadcast packages within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3.5 font-body">
                <div>
                  <label className="text-xs font-mono text-sage block mb-1">Brand or Organization Name</label>
                  <input
                    type="text"
                    required
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="e.g. Safaricom Western, County Government of Bungoma"
                    className="w-full rounded bg-ink border border-hairline px-3.5 py-2 text-sm text-paper focus:border-brass focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-sage block mb-1">Contact Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.co.ke"
                    className="w-full rounded bg-ink border border-hairline px-3.5 py-2 text-sm text-paper focus:border-brass focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-sage block mb-1">Target Commercial Levers</label>
                  <select className="w-full rounded bg-ink border border-hairline px-3.5 py-2 text-xs font-mono text-paper focus:border-brass focus:outline-none">
                    <option>Outside Broadcast (OB) Market Activation</option>
                    <option>Spot Advertising & Radio Jingle Campaign</option>
                    <option>Flagship Show Title Sponsorship</option>
                    <option>WhatsApp & USSD Direct Listener Campaign</option>
                    <option>Strategic Long-Term Brand Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono text-sage block mb-1">Campaign Notes or Brief</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify target dates, counties of interest, or indicative budgets..."
                    className="w-full rounded bg-ink border border-hairline px-3.5 py-2 text-sm text-paper focus:border-brass focus:outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded bg-brass py-3 font-mono text-xs uppercase tracking-wider text-ink font-bold hover:brightness-105 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={14} /> Send Commercial Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Privacy Policy & Data Protection Modal */}
      {privacyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm animate-section-entrance"
          onClick={() => setPrivacyModalOpen(false)}
        >
          <div
            className="w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-xl border border-hairline bg-ink-2 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h3 className="font-display text-xl text-paper font-semibold">
                Data Protection & Regulatory Compliance
              </h3>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="text-sage hover:text-paper"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-sage space-y-3 font-body leading-relaxed">
              <p>
                <strong>Office of the Data Protection Commissioner (ODPC):</strong> Nyota Frequency Modulation Limited complies fully with the Kenya Data Protection Act (DPA 2019). Listener registrations through USSD, WhatsApp, and SMS promotions adhere strictly to opt-in consent protocols.
              </p>
              <p>
                <strong>Communications Authority of Kenya (CA):</strong> Broadcast programming maintains CA Kenya Programming Code compliance, 40% local content quotas, and watershed provisions (05:00–22:00 EAT).
              </p>
              <p>
                <strong>Music & Copyright Licensing:</strong> Commercial broadcast and digital streaming operate under licenses cleared with the Music Copyright Society of Kenya (MCSK), PRISK, and KAMP.
              </p>
            </div>
            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="px-4 py-2 rounded bg-ink border border-hairline text-xs font-mono text-paper hover:border-brass"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
