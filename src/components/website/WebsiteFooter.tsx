import React, { useState } from 'react';
import { Radio, Mail, MapPin, ExternalLink, ShieldCheck, Send, MessageCircle } from 'lucide-react';
import { station } from '../../data/station';
import { sections } from '../../content/sections';
import { INQUIRY_ENDPOINT } from '../../config';
import { setLite } from '../../lib/lite';

const LEVERS = [
  'Outside Broadcast (OB) Market Activation',
  'Spot Advertising & Radio Jingle Campaign',
  'Flagship Show Title Sponsorship',
  'WhatsApp & USSD Direct Listener Campaign',
  'Civic & County Government Desk',
  'Strategic Long-Term Brand Partnership',
] as const;

export function WebsiteFooter({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [lite, setLiteState] = useState(() => typeof document !== 'undefined' && document.documentElement.dataset.lite === 'true');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [lever, setLever] = useState<string>(LEVERS[0]);
  const [message, setMessage] = useState('');

  const hasChannel = Boolean(INQUIRY_ENDPOINT || station.salesEmail || station.salesWhatsApp);
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const inquiryText = () =>
    [
      `Commercial inquiry — ${station.name}`,
      `Organisation: ${org}`,
      `Contact email: ${email}`,
      `Interested in: ${lever}`,
      message ? `Notes: ${message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

  const openInquiry = (preset?: string) => {
    if (preset) setLever(preset);
    setInquiryModalOpen(true);
  };

  // The inquiry is handed to the visitor's own email or WhatsApp app, addressed to the
  // sales desk, so a lead is never silently dropped by a form that posts nowhere.
  const handleInquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const via = (e.nativeEvent as SubmitEvent).submitter?.getAttribute('data-via');
    const text = inquiryText();
    if (via === 'endpoint' && INQUIRY_ENDPOINT) {
      // Only report success when the form service confirms receipt.
      setSendState('sending');
      fetch(INQUIRY_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ org, email, lever, message }) })
        .then((r) => setSendState(r.ok ? 'sent' : 'failed'))
        .catch(() => setSendState('failed'));
      return;
    }
    if (via === 'whatsapp' && station.salesWhatsApp) {
      window.open(`https://wa.me/${station.salesWhatsApp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    } else if (station.salesEmail) {
      window.location.href = `mailto:${station.salesEmail}?subject=${encodeURIComponent(`Advertising inquiry: ${org}`)}&body=${encodeURIComponent(text)}`;
    }
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
                  src="/brand/nyota-logo.svg"
                  alt="Nyota FM 107.3"
                  width={120}
                  height={24}
                  className="h-8 w-auto"
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
                A commercial and community station broadcasting from Bungoma across Bungoma, Kakamega, Busia, Vihiga, and Trans Nzoia in Swahili, Bukusu, and regional languages. Audience size is a declared data gap until a Western Kenya survey is commissioned.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-sage-dim">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-brass" /> Bungoma studio · Kakamega planned (Phase 2)
                </span>
                <span className="flex items-center gap-1.5">
                  <Radio size={13} className="text-moss" /> Frequency: 107.3 MHz
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-brass" /> CA-licensed FM broadcaster
                </span>
              </div>
            </div>

            {/* Column 3: Platform Sections */}
            <div>
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-paper mb-3">
                Platform Blueprint
              </h4>
              <ul className="space-y-2 text-xs font-mono">
                {sections.map((s) => ({ id: s.id, label: `${s.number}. ${s.shortTitle}` })).map((link) => (
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
                    onClick={() => openInquiry()}
                    className="text-brass hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Partner & Ad Rates</span>
                    <ExternalLink size={11} />
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => openInquiry(LEVERS[0])} className="text-sage hover:text-brass transition-colors text-left">
                    Outside Broadcast Booking
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => openInquiry(LEVERS[3])} className="text-sage hover:text-brass transition-colors text-left">
                    WhatsApp & USSD Campaigns
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => openInquiry(LEVERS[4])} className="text-sage hover:text-brass transition-colors text-left">
                    Civic & County Government Desk
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('asks')}
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
                Every figure carries an evidence tier. Tier 1 cites a published source (KNBS, CA Kenya, ReelAnalytics, and others); Tier 2 is modelled; Tier 0 is a declared gap that needs primary research.
              </p>
              <div className="space-y-1.5 text-[11px] font-mono">
                <div className="flex items-center gap-2 text-moss">
                  <span className="size-1.5 rounded-full bg-moss" />
                  <span>Tier 1 · Hard Data Citations</span>
                </div>
                <div className="flex items-center gap-2 text-brass">
                  <span className="size-1.5 rounded-full bg-brass" />
                  <span>Tier 2 · Modelled Econometrics</span>
                </div>
                <div className="flex items-center gap-2 text-brick-text">
                  <span className="size-1.5 rounded-full bg-brick" />
                  <span>Tier 0 · Primary Research Gaps</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="mt-4 text-xs font-mono text-sage-dim hover:text-paper underline block"
              >
                Planned Compliance Actions
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
                Licensed by the Communications Authority of Kenya (CA)
              </span>
              <span className="hidden md:inline text-hairline">|</span>
              <span className="text-brass/70">
                Board proposal v2.1 · Draft for discussion
              </span>
              <button
                type="button"
                aria-pressed={lite}
                onClick={() => {
                  setLite(!lite);
                  setLiteState(!lite);
                }}
                className="rounded border border-hairline px-2 py-1 text-sage hover:text-paper"
              >
                Lite mode: {lite ? 'on' : 'off'}
              </button>
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
                <span className="text-xs font-mono uppercase tracking-wider text-brass font-bold">
                  COMMERCIAL INQUIRY
                </span>
                <h3 className="font-display text-2xl text-paper font-semibold">
                  Partner with Nyota FM 107.3
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInquiryModalOpen(false)}
                className="text-sage hover:text-paper p-2"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {!hasChannel ? (
              <div className="py-6 text-center space-y-2" role="status">
                <h4 className="font-display text-xl text-paper font-semibold">Sales desk contact pending</h4>
                <p className="text-xs text-sage max-w-sm mx-auto">
                  The sales desk email and WhatsApp number have not been configured for this build, so this form is
                  switched off rather than collecting inquiries that nobody receives. Set VITE_SALES_EMAIL or
                  VITE_SALES_WHATSAPP to enable it.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3.5 font-body">
                <div>
                  <label htmlFor="inq-org" className="text-xs font-mono text-sage block mb-1">Brand or Organisation Name</label>
                  <input
                    id="inq-org"
                    type="text"
                    required
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="e.g. your company, SACCO, or county department"
                    className="w-full rounded bg-ink border border-hairline px-3.5 py-2 text-sm text-paper focus:border-brass focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="inq-email" className="text-xs font-mono text-sage block mb-1">Contact Email Address</label>
                  <input
                    id="inq-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.co.ke"
                    className="w-full rounded bg-ink border border-hairline px-3.5 py-2 text-sm text-paper focus:border-brass focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="inq-lever" className="text-xs font-mono text-sage block mb-1">Interested in</label>
                  <select id="inq-lever" value={lever} onChange={(e) => setLever(e.target.value)} className="w-full rounded bg-ink border border-hairline px-3.5 py-2 text-xs font-mono text-paper focus:border-brass focus:outline-none">
                    {LEVERS.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="inq-notes" className="text-xs font-mono text-sage block mb-1">Campaign Notes or Brief</label>
                  <textarea
                    id="inq-notes"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify target dates, counties of interest, or indicative budgets..."
                    className="w-full rounded bg-ink border border-hairline px-3.5 py-2 text-sm text-paper focus:border-brass focus:outline-none resize-none"
                  />
                </div>
                <p className="text-[11px] text-sage-dim">
                  Your inquiry opens in your own email or WhatsApp app, addressed to the sales desk, so you keep a copy.
                </p>
                {sendState !== 'idle' && (
                  <p role="status" className="text-xs text-paper">
                    {sendState === 'sending' && 'Sending…'}
                    {sendState === 'sent' && 'Received by the sales desk. Thank you.'}
                    {sendState === 'failed' && 'Not sent. Please use email or WhatsApp instead.'}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-2">
                  {INQUIRY_ENDPOINT && (
                    <button type="submit" data-via="endpoint" className="flex-1 rounded bg-brass py-3 font-mono text-xs uppercase tracking-wider text-ink font-bold hover:brightness-105 flex items-center justify-center gap-2">
                      <Send size={14} /> Send
                    </button>
                  )}
                  {station.salesEmail && (
                    <button
                      type="submit"
                      data-via="email"
                      className="flex-1 rounded bg-brass py-3 font-mono text-xs uppercase tracking-wider text-ink font-bold hover:brightness-105 transition-all flex items-center justify-center gap-2"
                    >
                      <Mail size={14} /> Send by email
                    </button>
                  )}
                  {station.salesWhatsApp && (
                    <button
                      type="submit"
                      data-via="whatsapp"
                      className="flex-1 rounded border border-moss/60 bg-moss/15 py-3 font-mono text-xs uppercase tracking-wider text-paper font-bold hover:bg-moss/25 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={14} /> Send on WhatsApp
                    </button>
                  )}
                </div>
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
                Planned Compliance Actions
              </h3>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="text-sage hover:text-paper p-2"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-sage space-y-3 font-body leading-relaxed">
              <p>
                These are actions the plan commits to, not completed registrations. Status is tracked in Part 7 (Gap Audit).
              </p>
              <p>
                <strong>Data protection (ODPC):</strong> register as a data controller/processor under the Data Protection Act 2019 before any
                WhatsApp, USSD, or SMS listener database is built; collect opt-in consent at sign-up; renew the certificate every 24 months.
              </p>
              <p>
                <strong>Broadcast code (CA):</strong> maintain Programming Code compliance, local-content obligations, and watershed rules.
              </p>
              <p>
                <strong>Music licensing (KECOBO):</strong> pay royalties under the Consolidated Music Tariffs 2026–2028 only to CMOs licensed for the
                year. MCSK was not licensed for 2025–26; KAMP&apos;s licence was suspended for 90 days from 1 July 2026; 2027 licences are pending.
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
