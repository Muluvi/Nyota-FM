import React, { useState } from 'react';
import { LedgerCard } from './LedgerCard';
import { LedgerRow } from './LedgerRow';
import { Radio, Music, Scale, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export function Part3Programming() {
  const [activeShow, setActiveShow] = useState<string>('show1');

  const dayparts = [
    { daypart: 'Breakfast', window: '05:00 – 09:00', prop: 'News, energy, community check-in' },
    { daypart: 'Mid-morning', window: '09:00 – 12:00', prop: 'Companionship, services, dedications' },
    { daypart: 'Midday', window: '12:00 – 15:00', prop: 'Music, markets, light talk' },
    { daypart: 'Drive', window: '15:00 – 19:00', prop: 'High energy, traffic, headlines' },
    { daypart: 'Evening', window: '19:00 – 22:00', prop: 'Reflection, culture, civic content' },
    { daypart: 'Late & overnight', window: '22:00 – 05:00', prop: 'Personality late show, then branded automation' },
  ];

  return (
    <div className="space-y-12">
      {/* Chapter 12 — Programming Philosophy */}
      <div id="chapter-12" className="space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part III • Chapter 12</div>
          <h3 className="font-display text-paper text-2xl">Programming Philosophy</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "Schedules are strategy made audible. What airs, when, and in which language decides who listens and who advertises."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <p>
            <strong className="text-paper">12.1 Daypart Strategy:</strong> Programming is organised around the rhythms of Western Kenyan life: an information-and-energy breakfast, a service-and-companionship mid-morning, a music-and-markets midday, a high-energy drive, a reflective evening, a personality-led late slot, and an automated-but-branded overnight. Each carries a defined audience, mood and commercial proposition.
          </p>

          <p>
            <strong className="text-paper">12.2 Live Versus Pre-Recorded Balance:</strong> Live programming preserves the immediacy and community intimacy that define local radio, while a disciplined spine of pre-recorded shows guarantees production quality, sponsor-ready packaging and a reliable supply of derivative content. Live builds relationship; pre-recorded builds asset value.
          </p>

          <h4 className="font-display text-paper text-base pt-2">12.3 Strategic Language Mix</h4>
          <div className="space-y-1">
            <LedgerRow label="Swahili (Cross-County Reach & National Advertiser Comfort)" value="55%" valueColor="brass" />
            <LedgerRow label="Luhya Cluster — Bukusu & Maragoli (Cultural Authenticity)" value="30%" valueColor="brass" />
            <LedgerRow label="English (Civic Explainer & Advertiser-Facing Moments)" value="15%" />
          </div>

          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">C:</strong> A differentiated, culturally precise schedule wins share against undifferentiated rivals.</p>
            <p><strong className="text-paper">E:</strong> Reliable, high-quality programming across the day grows weekly active listening hours.</p>
          </div>
        </div>
      </div>

      {/* Chapter 13 — The Pre-Recorded Show Slate */}
      <div id="chapter-13" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part III • Chapter 13</div>
          <h3 className="font-display text-paper text-2xl">The Pre-Recorded Show Slate</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "Four hours of premium original content each week becomes the station’s most sponsorable, most shareable and most defensible programming asset."
          </p>
        </div>

        <p className="font-body text-sage text-sm leading-relaxed">
          Firefly produces four pre-recorded shows — four hours of original content per week — engineered for sponsorship and systematic derivative output. Tap any show to review its complete format bible:
        </p>

        {/* 4 Shows Format Bibles */}
        <div className="space-y-3">
          {/* Show 1: Asubuhi ya Imani */}
          <LedgerCard className={`p-5 transition-all ${activeShow === 'show1' ? 'border-brass bg-ink' : 'border-hairline bg-ink-2'}`}>
            <button
              type="button"
              onClick={() => setActiveShow(activeShow === 'show1' ? '' : 'show1')}
              className="w-full text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-ink border border-hairline text-brass">
                  <Radio size={16} />
                </div>
                <div>
                  <span className="font-mono text-[11px] text-brass block">SHOW 1 • SUNDAY MORNING 60 MIN</span>
                  <h4 className="font-display text-paper text-lg">Asubuhi ya Imani (Morning of Faith)</h4>
                </div>
              </div>
              {activeShow === 'show1' ? <ChevronUp size={18} className="text-brass" /> : <ChevronDown size={18} className="text-sage" />}
            </button>

            {activeShow === 'show1' && (
              <div className="mt-4 pt-4 border-t border-hairline space-y-3 text-xs font-body text-sage leading-relaxed">
                <p><strong className="text-paper">Host:</strong> NABII</p>
                <p><strong className="text-paper">Pitch:</strong> A worship, testimony and gospel programme that opens the week with hope and community.</p>
                <p><strong className="text-paper">Segments:</strong> Opening worship set; Listener testimony segment; Scripture-and-reflection; Gospel new-music feature; Community notices & dedications.</p>
                <p><strong className="text-paper">Advertiser Fit:</strong> Banks, SACCOs, faith-aligned schools and family brands.</p>
                <p><strong className="text-paper">Sponsorship Tiers:</strong> Title sponsor (show naming + billboards), segment sponsor (testimony or dedications), and spot package.</p>
                <p><strong className="text-paper">Derivative-Content Map:</strong> YouTube full episode; TikTok testimony clip; Instagram Reel worship moment; podcast cut; WhatsApp Channel teaser.</p>
              </div>
            )}
          </LedgerCard>

          {/* Show 2: Hapa Tulipo Mix */}
          <LedgerCard className={`p-5 transition-all ${activeShow === 'show2' ? 'border-brass bg-ink' : 'border-hairline bg-ink-2'}`}>
            <button
              type="button"
              onClick={() => setActiveShow(activeShow === 'show2' ? '' : 'show2')}
              className="w-full text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-ink border border-hairline text-brass">
                  <Music size={16} />
                </div>
                <div>
                  <span className="font-mono text-[11px] text-brass block">SHOW 2 • FRIDAY NIGHT 60 MIN</span>
                  <h4 className="font-display text-paper text-lg">Hapa Tulipo Mix</h4>
                </div>
              </div>
              {activeShow === 'show2' ? <ChevronUp size={18} className="text-brass" /> : <ChevronDown size={18} className="text-sage" />}
            </button>

            {activeShow === 'show2' && (
              <div className="mt-4 pt-4 border-t border-hairline space-y-3 text-xs font-body text-sage leading-relaxed">
                <p><strong className="text-paper">Host:</strong> Rotating: DJ Moons, DJ Mainpatt, DJ Nosh 254, MGM Kenya, Rabai Mokua</p>
                <p><strong className="text-paper">Pitch:</strong> The region’s premier weekly DJ set, rotating marquee selectors across the genres Western Kenya actually dances to.</p>
                <p><strong className="text-paper">Segments:</strong> Cold-open signature drop; Amapiano / Afro House block; Gqom / Deep House block; Bongo / Genge block; Guest-selector finale.</p>
                <p><strong className="text-paper">Advertiser Fit:</strong> Beverage brands, telcos and lifestyle brands.</p>
                <p><strong className="text-paper">Sponsorship Tiers:</strong> Title sponsor (mix naming), drop sponsor (audio billboard per block), and event tie-in.</p>
                <p><strong className="text-paper">Derivative-Content Map:</strong> YouTube full set; TikTok dance-moment clips; Instagram Reel transitions; podcast audio mix; WhatsApp Channel drop alert.</p>
              </div>
            )}
          </LedgerCard>

          {/* Show 3: Sauti ya Nchi */}
          <LedgerCard className={`p-5 transition-all ${activeShow === 'show3' ? 'border-brass bg-ink' : 'border-hairline bg-ink-2'}`}>
            <button
              type="button"
              onClick={() => setActiveShow(activeShow === 'show3' ? '' : 'show3')}
              className="w-full text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-ink border border-hairline text-brass">
                  <Scale size={16} />
                </div>
                <div>
                  <span className="font-mono text-[11px] text-brass block">SHOW 3 • SUNDAY EVENING 60 MIN</span>
                  <h4 className="font-display text-paper text-lg">Sauti ya Nchi (Voice of the Land)</h4>
                </div>
              </div>
              {activeShow === 'show3' ? <ChevronUp size={18} className="text-brass" /> : <ChevronDown size={18} className="text-sage" />}
            </button>

            {activeShow === 'show3' && (
              <div className="mt-4 pt-4 border-t border-hairline space-y-3 text-xs font-body text-sage leading-relaxed">
                <p><strong className="text-paper">Host:</strong> Civic desk lead with rotating expert guests</p>
                <p><strong className="text-paper">Pitch:</strong> Long-form civic education and accountability — the editorial expression of the station’s civic-anchor positioning.</p>
                <p><strong className="text-paper">Segments:</strong> Issue explainer; County-budget or service deep-dive; Citizen voices segment; Expert panel; Action & accountability close.</p>
                <p><strong className="text-paper">Advertiser Fit:</strong> NGOs, county governments, development partners and public-interest funders.</p>
                <p><strong className="text-paper">Sponsorship Tiers:</strong> Series underwriting (non-editorial), segment sponsorship, and public-information packages.</p>
                <p><strong className="text-paper">Derivative-Content Map:</strong> YouTube full episode; TikTok explainer clip; Instagram carousel summary; podcast cut; WhatsApp Channel issue brief.</p>
              </div>
            )}
          </LedgerCard>

          {/* Show 4: Wanawake wa Twang’aa */}
          <LedgerCard className={`p-5 transition-all ${activeShow === 'show4' ? 'border-brass bg-ink' : 'border-hairline bg-ink-2'}`}>
            <button
              type="button"
              onClick={() => setActiveShow(activeShow === 'show4' ? '' : 'show4')}
              className="w-full text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-ink border border-hairline text-brass">
                  <Sparkles size={16} />
                </div>
                <div>
                  <span className="font-mono text-[11px] text-brass block">SHOW 4 • SATURDAY MID-MORNING 60 MIN</span>
                  <h4 className="font-display text-paper text-lg">Wanawake wa Twang’aa (Women Who Shine)</h4>
                </div>
              </div>
              {activeShow === 'show4' ? <ChevronUp size={18} className="text-brass" /> : <ChevronDown size={18} className="text-sage" />}
            </button>

            {activeShow === 'show4' && (
              <div className="mt-4 pt-4 border-t border-hairline space-y-3 text-xs font-body text-sage leading-relaxed">
                <p><strong className="text-paper">Host:</strong> Eva Nyangasi</p>
                <p><strong className="text-paper">Pitch:</strong> A lifestyle, health and business programme celebrating and serving the women of Western Kenya.</p>
                <p><strong className="text-paper">Segments:</strong> Headline conversation; Health & wellbeing; Business & hustle feature; Beauty & lifestyle; Listener Q&A.</p>
                <p><strong className="text-paper">Advertiser Fit:</strong> FMCG, health, beauty and financial-services brands.</p>
                <p><strong className="text-paper">Sponsorship Tiers:</strong> Title sponsor, segment sponsor (health or business), and product-integration package.</p>
                <p><strong className="text-paper">Derivative-Content Map:</strong> YouTube full episode; TikTok how-to clip; Instagram Reel feature; podcast cut; WhatsApp Channel tip of the week.</p>
              </div>
            )}
          </LedgerCard>
        </div>

        {/* Objectives Box */}
        <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
          <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
          <p><strong className="text-paper">A:</strong> Four sponsor-ready shows directly create the branded-show revenue stream (stream III).</p>
          <p><strong className="text-paper">B:</strong> Premium packaged content commands higher rates than spot inventory, lifting average yield.</p>
          <p><strong className="text-paper">D:</strong> Derivative clips and WhatsApp teasers drive opt-ins into the addressable community.</p>
          <p><strong className="text-paper">E:</strong> Appointment programming and host brands build repeat, loyal audiences.</p>
        </div>
      </div>

      {/* Chapter 14 — The Live Schedule Refresh */}
      <div id="chapter-14" className="space-y-6 pt-6 border-t border-hairline">
        <div className="border-b border-hairline pb-3">
          <div className="text-eyebrow text-brass">Part III • Chapter 14</div>
          <h3 className="font-display text-paper text-2xl">The Live Schedule Refresh</h3>
          <p className="font-display italic text-sage text-sm mt-1">
            "The live grid is the station’s daily relationship with its audience. Refreshing it is how Nyota FM stays present in every part of the day."
          </p>
        </div>

        <div className="space-y-4 font-body text-sage text-sm leading-relaxed">
          <h4 className="font-display text-paper text-base">14.1 Suggested Daypart Structure</h4>
          <LedgerCard className="p-4">
            <div className="text-eyebrow text-sage-dim mb-2">Table 14.1 — Suggested 24-Hour Daypart Structure for Live Schedule</div>
            <div className="divide-y divide-hairline">
              {dayparts.map((d, idx) => (
                <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="sm:w-1/3">
                    <span className="font-body font-semibold text-paper block">{d.daypart}</span>
                    <span className="font-mono text-brass text-[11px]">{d.window}</span>
                  </div>
                  <span className="font-body text-sage sm:w-2/3 sm:text-right">{d.prop}</span>
                </div>
              ))}
            </div>
          </LedgerCard>

          <h4 className="font-display text-paper text-base pt-2">14.2 Marquee Live Shows to Develop In-House</h4>
          <p>
            Alongside the pre-recorded slate, the station develops two flagship live anchors — a flagship breakfast programme and a flagship drive show — serving as the primary vehicles for presenter brand-building and community check-ins.
          </p>

          <h4 className="font-display text-paper text-base pt-2">14.3 Talent Development Pipeline</h4>
          <p>
            A structured pipeline — from listener and community correspondent, through weekend and overnight slots, to weekday prime — ensures the station continually renews its on-air talent and reduces over-reliance on any single personality.
          </p>

          <div className="p-3 bg-ink border border-hairline rounded text-xs space-y-1 mt-4">
            <span className="font-mono text-[10px] text-brass uppercase block tracking-wider font-semibold">Contribution to Ownership Objectives</span>
            <p><strong className="text-paper">E:</strong> A coherent live grid and rising talent grow weekly active listening hours and repeat callers.</p>
            <p><strong className="text-paper">C:</strong> Strong flagship live shows defend prime-time share against competitors.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
