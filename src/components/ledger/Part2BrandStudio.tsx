import React from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import KitMarquee from '../KitMarquee';
import SoftwareFlipPills from '../SoftwareFlipPills';

export function Part2BrandStudio() {
  const brandPersonality = [
    { attr: 'Proud', shows: 'Celebrates Luhya language, music and achievement without apology.' },
    { attr: 'Warm', shows: 'Speaks to listeners as neighbours, not an audience.' },
    { attr: 'Sharp', shows: 'Production values and editorial rigour that feel national, not provincial.' },
    { attr: 'Civic', shows: 'Treats accountability and public information as core, not occasional.' },
    { attr: 'Modern', shows: 'Lives natively on TikTok, WhatsApp and YouTube.' },
    { attr: 'Generous', shows: 'Gives the community tools — prices, weather, services — not just content.' },
  ];

  const colorPalette = [
    { role: 'Primary', name: 'Nyota Gold', hex: '#C8A951', usage: 'Headers, accent rules, calls to action, premium cues' },
    { role: 'Primary', name: 'Deep Nyota', hex: '#0F3D2E', usage: 'Backgrounds, authority, civic content' },
    { role: 'Primary', name: 'Secondary Green Text', hex: '#2D5F47', usage: 'Sub-headings, captions, supporting copy' },
    { role: 'Primary', name: 'Cream White', hex: '#F8F4E9', usage: 'Page and panel backgrounds, reversed text' },
    { role: 'Functional', name: 'Alert', hex: '#B23A2E', usage: 'Errors, breaking-news flags, urgent civic alerts' },
    { role: 'Functional', name: 'Success', hex: '#2E7D52', usage: 'Confirmations, positive metrics, loyalty rewards' },
    { role: 'Functional', name: 'Info', hex: '#3A6EA5', usage: 'Neutral notices, links, informational tags' },
  ];

  const brandPatternVariants = [
    { variant: 'Background fill', app: 'Studio walls, document covers, web hero sections' },
    { variant: 'Social tile', app: 'Repeating motif behind quote cards and announcements' },
    { variant: 'OB backdrop', app: 'Large-format step-and-repeat for outside broadcasts' },
    { variant: 'Merchandise print', app: 'All-over print for apparel and tote bags' },
    { variant: 'App splash', app: 'Animated reveal on application launch' },
    { variant: 'Video lower-third', app: 'Subtle texture behind on-screen captions' },
  ];

  const merchandiseSkus = [
    { num: '1', sku: 'T-shirts', num2: '7', sku2: 'Water bottles' },
    { num: '2', sku: 'Lanyards', num2: '8', sku2: 'Umbrellas' },
    { num: '3', sku: 'Mugs', num2: '9', sku2: 'Notebooks' },
    { num: '4', sku: 'Caps', num2: '10', sku2: 'Pens' },
    { num: '5', sku: 'Hoodies', num2: '11', sku2: 'Stickers' },
    { num: '6', sku: 'Tote bags', num2: '12', sku2: 'Vinyl decals' },
  ];

  return (
    <div className="space-y-12">
      {/* Chapter 4 — Brand Strategy Foundation */}
      <div id="chapter-4" className="space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part II • Chapter 4</div>
          <h3 className="font-display text-paper text-2xl">Brand Strategy Foundation</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "A brand is a promise made consistently. Before pixels and jingles, Nyota FM must agree what it stands for and how it speaks."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <h4 className="font-display text-paper text-base">4.1 Purpose, Vision, Mission, Values</h4>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="text-paper">Purpose:</strong> To make Western Kenya feel seen, heard and proud — in its own languages, on every screen it touches.</li>
            <li><strong className="text-paper">Vision:</strong> By 2028, Nyota FM is the cultural and civic anchor of Western Kenya: the first voice the region turns to for music, meaning and accountability.</li>
            <li><strong className="text-paper">Mission:</strong> To broadcast and publish content that celebrates Luhya identity, informs civic life and connects a directly-addressable community across radio, video and mobile.</li>
            <li><strong className="text-paper">Values:</strong> Rootedness, Excellence, Integrity, Warmth, Courage, and Service. Each is a behavioural commitment, not a poster word — for example, Integrity governs the station’s civic and data journalism, and Courage licenses accountability content that lesser stations avoid.</li>
          </ul>

          <h4 className="font-display text-paper text-base pt-2">4.2 Brand Personality — Six-Attribute Model</h4>
          <LedgerCard className="p-4">
            <div className="text-eyebrow text-sage-dim mb-2">Table 4.1 — The Six-Attribute Brand Personality Model</div>
            <div className="divide-y divide-hairline">
              {brandPersonality.map((item, idx) => (
                <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                  <span className="font-mono text-brass font-semibold sm:w-1/4">{item.attr}</span>
                  <span className="font-body text-paper sm:w-3/4">{item.shows}</span>
                </div>
              ))}
            </div>
          </LedgerCard>

          <h4 className="font-display text-paper text-base pt-2">4.3 Brand Voice Principles</h4>
          <p>
            Nyota FM is Swahili-first, with natural Bukusu and Maragoli inflection, intergenerational warmth, and civic confidence. The voice should feel equally at home congratulating a wedding, explaining a county budget, and dropping an Amapiano set — always recognisably the same station. English is used sparingly and purposefully, chiefly in advertiser-facing and civic-explainer contexts.
          </p>

          <h4 className="font-display text-paper text-base pt-2">4.4 Brand Promise Architecture</h4>
          <p>
            The promise architecture nests three layers: the functional promise (the best local music, information and services in Western Kenya), the emotional promise (a station that makes you proud of where you are from), and the social promise (a station that holds power to account on your behalf). <strong className="text-paper">Hapa Tulipo, Twang’aa</strong> sits at the apex, expressing all three at once.
          </p>

          {/* Objectives Box */}
          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">E:</strong> A codified personality and voice make every interaction consistent, the precondition for loyalty.</p>
            <p><strong className="text-paper">C:</strong> A defensible promise differentiates Nyota FM from undifferentiated vernacular rivals.</p>
          </div>
        </div>
      </div>

      {/* Chapter 5 — Visual Identity System */}
      <div id="chapter-5" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part II • Chapter 5</div>
          <h3 className="font-display text-paper text-2xl">Visual Identity System</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "Consistency is what turns recognition into reputation. A coherent visual system lets Nyota FM look like the leader before it is one."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <h4 className="font-display text-paper text-base">5.1 Logo System</h4>
          <p>The visual identity extends the inherited NYOTA 107.3 FM lockup into a complete, disciplined family:</p>
          <ul className="space-y-1.5 list-disc list-inside text-xs">
            <li><strong className="text-paper">Primary lockup:</strong> full NYOTA 107.3 FM mark for hero placements, studio backdrops and headers.</li>
            <li><strong className="text-paper">Secondary & stacked:</strong> vertical lockup for narrow formats such as roll-ups and app splash screens.</li>
            <li><strong className="text-paper">Monochrome & reverse:</strong> single-colour and knock-out versions for low-fidelity print and dark backgrounds.</li>
            <li><strong className="text-paper">App icon & social avatar:</strong> a simplified star-and-frequency device legible at 48 pixels.</li>
            <li><strong className="text-paper">Watermark:</strong> low-opacity mark for video lower-thirds and document protection.</li>
          </ul>

          <h4 className="font-display text-paper text-base pt-2">5.2 Colour Palette, Extended</h4>
          <LedgerCard className="p-4">
            <div className="text-eyebrow text-sage-dim mb-2">Table 5.1 — Extended Nyota Colour Palette (Four Primary + Three Functional)</div>
            <div className="divide-y divide-hairline">
              {colorPalette.map((c, idx) => (
                <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2 sm:w-1/3">
                    <span className="w-3.5 h-3.5 rounded border border-white/20 shrink-0" style={{ backgroundColor: c.hex }} />
                    <span className="font-body font-medium text-paper">{c.name}</span>
                    <span className="font-mono text-sage-dim text-[11px]">{c.hex}</span>
                  </div>
                  <span className="font-body text-sage text-[11px] sm:w-2/3">{c.usage}</span>
                </div>
              ))}
            </div>
          </LedgerCard>

          <h4 className="font-display text-paper text-base pt-2">5.3 Typography System</h4>
          <p>
            A six-level hierarchy governs all type: a high-contrast modern display face for hero titles (Space Grotesk); a headline weight for chapter and segment heads; a sub-head weight; the humanist “Nyota Sans” (Inter) for body; a caption style for metadata; and a tabular numeric style for rate cards, schedules and data.
          </p>

          <h4 className="font-display text-paper text-base pt-2">5.4 Photography Style Guide & Iconography</h4>
          <p>
            Photography is editorial-documentary in spirit: golden-hour Western Kenya landscapes, presenter portraits shot in real environmental context, and candid community moments. Stock photography is strictly prohibited. Iconography uses consistent line weight and rounded terminals, scaling from app tab bars to outside-broadcast signage.
          </p>

          <h4 className="font-display text-paper text-base pt-2">5.6 Motion Identity & 5.7 Brand Pattern Applications</h4>
          <LedgerCard className="p-4">
            <div className="text-eyebrow text-sage-dim mb-2">Table 5.2 — Six Sanctioned Applications of the Nyota Brand Pattern</div>
            <div className="divide-y divide-hairline">
              {brandPatternVariants.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-brass font-medium">{item.variant}</span>
                  <span className="font-body text-paper text-right">{item.app}</span>
                </div>
              ))}
            </div>
          </LedgerCard>

          {/* Objectives Box */}
          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">C:</strong> A leader-grade visual system lets Nyota FM out-signal larger rivals and claim share of perception.</p>
            <p><strong className="text-paper">A:</strong> Branded video and social templates create sellable, repeatable inventory across streams.</p>
          </div>
        </div>
      </div>

      {/* Chapter 6 — Sonic Identity */}
      <div id="chapter-6" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part II • Chapter 6</div>
          <h3 className="font-display text-paper text-2xl">Sonic Identity</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "Radio is heard before it is seen. A distinctive sonic signature is the single most efficient driver of unprompted recall."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <p>
            <strong className="text-paper">6.1 Sonic Logo Brief:</strong> A two-second audio mark — a short, melodic resolution evoking a rising star, instantly attachable to any sting, bumper or sponsor billboard. Hummable, culturally warm, reproducible by a single voice.
          </p>
          <p>
            <strong className="text-paper">6.2 Station ID Architecture:</strong> Five fixed categories: top-of-hour identification, news stings, advert bumpers, daypart sweepers, and sponsor billboards.
          </p>
          <p>
            <strong className="text-paper">6.3 Jingle Pack & 6.4 Presenter Stings:</strong> Daypart package in Swahili, Bukusu and English treatments, paired with personalized presenter signature stings traveling into podcast and social clips.
          </p>

          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">E:</strong> A consistent sonic signature is the most efficient route to recall, repeat listening and loyalty.</p>
            <p><strong className="text-paper">C:</strong> Distinctive audio branding differentiates Nyota FM in a crowded dial.</p>
          </div>
        </div>
      </div>

      {/* Chapter 7 — Brand Application System */}
      <div id="chapter-7" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part II • Chapter 7</div>
          <h3 className="font-display text-paper text-2xl">Brand Application System</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "A brand earns trust at the edges — on a mug, a truck, an invoice. Application discipline is where strategy becomes everyday reality."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <p>
            <strong className="text-paper">7.1 Studio Livery & 7.2 OB Kit:</strong> Deep Nyota walls with subtle pattern, Gold accent lighting, camera-framed lockup backdrops, branded vehicle liveries, gazebos, and mic flags.
          </p>

          {/* Mobile Field & Video Kit Marquee */}
          <div className="py-2">
            <div className="text-eyebrow text-sage-dim mb-1">Mobile Field & Video Kit</div>
            <KitMarquee />
          </div>

          {/* Table 7.1 */}
          <LedgerCard className="p-4">
            <div className="text-eyebrow text-sage-dim mb-2">Table 7.1 — Twelve-SKU Foundational Merchandise Catalogue (Revenue Stream VII)</div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {merchandiseSkus.map((m, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-2 bg-ink rounded border border-hairline flex items-center justify-between">
                    <span className="text-sage-dim">#{m.num}</span>
                    <span className="text-paper font-body">{m.sku}</span>
                  </div>
                  <div className="p-2 bg-ink rounded border border-hairline flex items-center justify-between">
                    <span className="text-sage-dim">#{m.num2}</span>
                    <span className="text-paper font-body">{m.sku2}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </LedgerCard>

          <p>
            <strong className="text-paper">7.4 Stationery & 7.5 Digital Templates:</strong> Unified document templates (letterheads, invoices, rate cards) plus digital templates for Instagram Reels safe-zones, TikTok covers, YouTube thumbnails, Facebook and LinkedIn headers.
          </p>
          <p>
            <strong className="text-paper">7.6 Brand Book:</strong> Consolidated into a canonical PDF deliverable of Phase 1.
          </p>

          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">A:</strong> Merchandise (stream vii) and branded templates open new revenue and reduce production cost.</p>
            <p><strong className="text-paper">C:</strong> Coherent application across every touchpoint compounds the perception of market leadership.</p>
            <p><strong className="text-paper">E:</strong> Owned merchandise and consistent touchpoints deepen the felt sense of belonging to the station.</p>
          </div>
        </div>
      </div>

      {/* Chapter 8 — From Audio-Only to Audio-Visual */}
      <div id="chapter-8" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part II • Chapter 8</div>
          <h3 className="font-display text-paper text-2xl">From Audio-Only to Audio-Visual: The Visual Radio Thesis</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "Every minute Nyota FM broadcasts is, today, sold once. Visual radio lets the same minute be sold many times, on many screens."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <p>
            <strong className="text-paper">8.1 Industry Context:</strong> The shift to visual radio is validated globally (BBC Radio 1's Live Lounge, Brazil's 89 FM) and locally in Kenya by Radio 47 and Radio Generation.
          </p>
          <p>
            <strong className="text-paper">8.2 Strategic Logic:</strong> Multiplicative model: 1 filmed broadcast hour yields a YouTube livestream, long-form replay, multiple short vertical clips, podcast audio, social quote cards and WhatsApp teasers. It is a commercial-model upgrade.
          </p>

          {/* Interactive Software Flip Pills */}
          <div className="py-2">
            <div className="text-eyebrow text-brass mb-3">Multi-Platform Production Software Suite (Tap to Flip)</div>
            <SoftwareFlipPills />
          </div>

          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">A:</strong> Converts each broadcast hour into eight or more sellable digital assets across new streams.</p>
            <p><strong className="text-paper">B:</strong> Multiplies monetisable inventory without proportionally increasing on-air hours.</p>
          </div>
        </div>
      </div>

      {/* Chapter 9, 10, 11 — Studio Rationale, People, Compliance */}
      <div id="chapter-9" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part II • Chapters 9, 10 & 11</div>
          <h3 className="font-display text-paper text-2xl">Studio Rationale, People Capability & Legal Compliance</h3>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <div>
            <h4 className="font-display text-paper text-base mb-1">Chapter 9 — Capital Should Follow Proof</h4>
            <p>
              The studio build is staged across three phases over eighteen months (indicative envelope KSh 12.7M–KSh 21.3M) so that early phases prove value on air before heavier capital is committed. Full consolidated equipment schedule in Chapter 25.
            </p>
          </div>

          <div>
            <h4 className="font-display text-paper text-base mb-1">Chapter 10 — People & Capability: Handover Model</h4>
            <p>
              Equipment does not make content; people do. Existing presenters and producers evolve into on-camera and multi-platform talent. Five new roles are introduced incrementally. Firefly conducts a 12-week induction programme with explicit internal handover so Nyota FM owns its competence.
            </p>
          </div>

          <div>
            <h4 className="font-display text-paper text-base mb-1">Chapter 11 — Legal, IP & Compliance Protocols</h4>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li><strong className="text-paper">11.1 Music Sync Rights:</strong> Cleared-music protocol for clips to avoid automated platform strikes.</li>
              <li><strong className="text-paper">11.2 Guest Release Agreements:</strong> Standard Swahili/English on-camera release form.</li>
              <li><strong className="text-paper">11.3 Accessibility:</strong> Progressive captioning of civic and news explainers.</li>
              <li><strong className="text-paper">11.4 CA Kenya Licensing:</strong> Continuous compliance owner for streaming and USSD shortcode.</li>
              <li><strong className="text-paper">11.5 Kenya DPA 2019:</strong> Lawful consent and data protection protocols for the 250,000-contact database.</li>
            </ul>
          </div>

          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">D:</strong> Lawful, consented data capture is the foundation on which the 250,000-contact community is built.</p>
            <p><strong className="text-paper">E:</strong> A skilled, confident team and data respect produce the consistent quality that retains listeners.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
