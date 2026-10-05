import React, { useMemo, useState, useEffect } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Globe2,
  Headphones,
  Image as ImageIcon,
  Layers3,
  MapPin,
  MessageCircle,
  Pause,
  Play,
  Share2,
  Sparkles,
  Table2,
  Users,
  Volume2,
  Waves,
  X,
  Zap,
} from 'lucide-react';
import { Reveal } from '../ledger/Reveal';

type StoryTab = 'reach' | 'revenue' | 'operations';

const kpis = [
  { label: 'Weekly reach', value: '1.8M', change: '+18.4%', note: 'vs. last quarter', icon: Users },
  { label: 'Digital share', value: '32%', change: '+8.2 pts', note: 'stream + podcast', icon: Globe2 },
  { label: 'Commercial yield', value: '4.6×', change: '+1.4×', note: 'campaign return', icon: BarChart3 },
];

const storyData: Record<StoryTab, { label: string; value: string; copy: string; bars: number[] }> = {
  reach: { label: 'Audience reach', value: '1.8M', copy: 'A wider signal, carried by radio, mobile and community presence.', bars: [34, 42, 39, 55, 61, 68, 79, 88] },
  revenue: { label: 'Commercial yield', value: '4.6×', copy: 'A portfolio that turns attention into accountable partner value.', bars: [28, 36, 48, 44, 60, 72, 69, 91] },
  operations: { label: 'Execution readiness', value: '82%', copy: 'Clear owners, visible milestones and fewer invisible handoffs.', bars: [48, 52, 58, 66, 62, 73, 78, 82] },
};

const programmes = [
  { time: '06:00', title: 'The Morning Signal', host: 'Achieng & Otieno', type: 'LIVE', color: 'bg-brass' },
  { time: '10:00', title: 'Mulembe Midday', host: 'Miriam Wekesa', type: 'NEXT', color: 'bg-moss' },
  { time: '14:00', title: 'The Community Desk', host: 'Nyota Newsroom', type: 'LATER', color: 'bg-brick' },
  { time: '18:00', title: 'Drive Home', host: 'Juma & Sifa', type: 'LATER', color: 'bg-sage-dim' },
];

function AnimatedBars({ values, muted = false }: { values: number[]; muted?: boolean }) {
  return (
    <div className="flex h-28 items-end gap-1.5" aria-label="Animated bar chart">
      {values.map((value, index) => (
        <div
          key={`${value}-${index}`}
          className={`min-w-0 flex-1 rounded-t-sm transition-all duration-700 ease-out ${
            muted ? 'bg-sage-dim/60' : 'bg-brass'
          }`}
          style={{ height: `${value}%`, transitionDelay: `${index * 45}ms` }}
        />
      ))}
    </div>
  );
}

export function VisualPlaybook() {
  const [playing, setPlaying] = useState(false);
  const [storyTab, setStoryTab] = useState<StoryTab>('reach');
  const [activeProgramme, setActiveProgramme] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const story = useMemo(() => storyData[storyTab], [storyTab]);

  return (
    <section id="visual-system" className="relative overflow-hidden border-b border-hairline py-10 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(var(--color-hairline)_1px,transparent_1px),linear-gradient(90deg,var(--color-hairline)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="relative">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <div className="mb-4 flex items-center gap-2 text-eyebrow font-mono text-brass">
                <Sparkles size={13} /> NYOTA FM / THE SIGNAL IN MOTION
              </div>
              <h2 className="max-w-3xl font-display text-[clamp(2.35rem,11vw,4.5rem)] leading-[.94] text-paper sm:text-7xl">
                A living case for the station&apos;s next signal.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-sage sm:text-lg">
                The proposal now behaves like the product it recommends: live, layered, local, measurable and easy to navigate. Scroll the story, tune the signal and see the operating model move.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#part-1"
                  className="inline-flex items-center gap-2 rounded bg-paper px-4 py-3 text-xs font-mono uppercase tracking-wider text-ink transition-transform hover:-translate-y-1"
                >
                  Read the case <ArrowRight size={14} data-icon="inline-end" />
                </a>
                <button
                  type="button"
                  onClick={() => setShareOpen(true)}
                  className="inline-flex items-center gap-2 rounded border border-hairline px-4 py-3 text-xs font-mono uppercase tracking-wider text-sage transition-colors hover:border-brass hover:text-paper"
                >
                  <Share2 size={14} data-icon="inline-start" /> Share view
                </button>
              </div>
            </div>
            <div className="relative min-h-64 overflow-hidden rounded border border-brass/40 bg-ink-2 p-5 sm:min-h-80">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[.2em] text-sage-dim">
                <span>Signal map / Kakamega → everywhere</span>
                <span className="flex items-center gap-1 text-moss">
                  <span className="size-1.5 animate-ping rounded-full bg-moss" /> live
                </span>
              </div>
              <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-brass to-transparent" />
              <div className="absolute left-[16%] top-[49%] size-3 rounded-full bg-brass shadow-[0_0_28px_8px_rgba(184,146,90,.35)] animate-pulse" />
              {['Nairobi', 'Kisumu', 'Bungoma', 'Vihiga'].map((place, index) => (
                <div
                  key={place}
                  className="absolute flex items-center gap-2 text-[10px] font-mono text-sage animate-section-entrance"
                  style={{
                    left: `${27 + index * 18}%`,
                    top: `${33 + (index % 2) * 33}%`,
                    animationDelay: `${300 + index * 120}ms`,
                  }}
                >
                  <span className="size-1.5 rounded-full bg-sage-dim" />
                  {place}
                </div>
              ))}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="font-display text-4xl text-paper">107.3</div>
                  <div className="text-xs text-sage">A local frequency with national ambition.</div>
                </div>
                <Waves className="text-brass" size={32} />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            {kpis.map(({ label, value, change, note, icon: Icon }) => (
              <div
                key={label}
                className="group rounded border border-hairline bg-ink-2 p-5 transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-eyebrow font-mono text-sage-dim">{label}</span>
                  <Icon size={17} className="text-brass transition-transform group-hover:rotate-12" />
                </div>
                <div className="mt-4 flex items-end justify-between gap-2">
                  <span className="font-mono text-4xl tabular-nums text-paper">{value}</span>
                  <span className="flex items-center gap-1 text-xs font-mono text-moss">
                    <ArrowDownRight size={13} />
                    {change}
                  </span>
                </div>
                <div className="mt-2 text-xs text-sage">{note}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[180px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-3 text-eyebrow font-mono text-brass">In this signal</div>
            <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1" aria-label="Visual story navigation">
              {[
                ['live', 'Live layer'],
                ['story', 'Audience story'],
                ['system', 'Operating system'],
                ['proof', 'Proof in motion'],
              ].map(([id, label]) => (
                <a
                  key={id}
                  href={`#signal-${id}`}
                  className="whitespace-nowrap border-l border-hairline px-3 py-2 text-xs text-sage transition-colors hover:border-brass hover:text-paper"
                >
                  {label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setLowBandwidth(!lowBandwidth)}
              aria-pressed={lowBandwidth}
              className="mt-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-sage-dim hover:text-paper"
            >
              <span className={`size-2 rounded-full ${lowBandwidth ? 'bg-moss' : 'bg-hairline'}`} />{' '}
              {lowBandwidth ? 'Lite mode on' : 'Lite mode'}
            </button>
          </aside>

          <div className="min-w-0">
            <section id="signal-live" className="scroll-mt-24 border-b border-hairline pb-12">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="text-eyebrow font-mono text-brass">01 / Live layer</div>
                  <h3 className="mt-2 font-display text-3xl text-paper sm:text-4xl">The schedule becomes a surface.</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-moss">
                  <span className="size-2 animate-pulse rounded-full bg-moss" /> on air now
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
                <div className="rounded border border-hairline bg-ink-2 p-5 sm:p-6">
                  <div className="flex items-center justify-between border-b border-hairline pb-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={playing ? 'Pause live stream' : 'Play live stream'}
                        onClick={() => setPlaying(!playing)}
                        className="grid size-12 place-items-center rounded-full bg-brass text-ink transition-transform hover:scale-105"
                      >
                        {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                      </button>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-brass">Now playing</div>
                        <div className="font-display text-2xl text-paper">The Morning Signal</div>
                      </div>
                    </div>
                    <Headphones className="text-sage" size={20} />
                  </div>
                  <div className="flex h-28 items-end gap-1 py-5" aria-label="Live audio waveform">
                    {Array.from({ length: 34 }, (_, index) => (
                      <span
                        key={index}
                        className="wave-bar min-w-0 flex-1 rounded-full bg-brass/80"
                        style={{
                          height: `${20 + ((index * 17) % 72)}%`,
                          animationDelay: `${index * -70}ms`,
                          animationPlayState: playing ? 'running' : 'paused',
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-sage">
                    <span className="flex items-center gap-2">
                      <Volume2 size={14} /> {playing ? 'Streaming live' : 'Ready to stream'}
                    </span>
                    <span>00:42 / 02:10</span>
                  </div>
                </div>
                <div className="rounded border border-hairline bg-ink-2 p-5 sm:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-eyebrow font-mono text-brass">Today / schedule</div>
                    <CalendarDays size={16} className="text-sage" />
                  </div>
                  <div className="flex flex-col gap-1">
                    {programmes.map((programme, index) => (
                      <button
                        type="button"
                        key={programme.time}
                        onClick={() => setActiveProgramme(index)}
                        className={`flex items-center gap-3 rounded p-3 text-left transition-colors ${
                          activeProgramme === index ? 'bg-paper/10' : 'hover:bg-paper/5'
                        }`}
                      >
                        <span className="w-11 text-xs font-mono text-sage-dim">{programme.time}</span>
                        <span className={`size-1.5 rounded-full ${programme.color}`} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-paper">{programme.title}</span>
                          <span className="block truncate text-[11px] text-sage">{programme.host}</span>
                        </span>
                        <span className="text-[9px] font-mono text-sage-dim">{programme.type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="signal-story" className="scroll-mt-24 border-b border-hairline py-12">
              <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
                <div>
                  <div className="text-eyebrow font-mono text-brass">02 / Audience story</div>
                  <h3 className="mt-2 font-display text-3xl text-paper sm:text-4xl">One strategy. Three ways to feel it.</h3>
                  <p className="mt-4 text-sm leading-relaxed text-sage">
                    A scrollytelling block lets the reader move from audience reach to commercial value to operational readiness without losing the thread.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Audience story views">
                    {(Object.keys(storyData) as StoryTab[]).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={storyTab === tab}
                        onClick={() => setStoryTab(tab)}
                        className={`rounded border px-3 py-2 text-xs font-mono capitalize transition-colors ${
                          storyTab === tab ? 'border-brass bg-brass/10 text-brass' : 'border-hairline text-sage hover:text-paper'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                <div
                  key={storyTab}
                  className="rounded border border-brass/40 bg-ink-2 p-5 sm:p-7 transition-all duration-300 animate-section-entrance"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-sage">{story.label}</div>
                      <div className="mt-3 font-mono text-6xl text-paper">{story.value}</div>
                    </div>
                    <Activity className="text-brass" />
                  </div>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-sage">{story.copy}</p>
                  <div className="mt-7">
                    <AnimatedBars values={story.bars} muted={lowBandwidth} />
                    <div className="mt-2 flex justify-between text-[10px] font-mono text-sage-dim">
                      <span>Q1</span>
                      <span>Q2</span>
                      <span>Q3</span>
                      <span>Q4</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="signal-system" className="scroll-mt-24 border-b border-hairline py-12">
              <div className="mb-6">
                <div className="text-eyebrow font-mono text-brass">03 / Operating system</div>
                <h3 className="mt-2 font-display text-3xl text-paper sm:text-4xl">The build is a system, not a stack of pages.</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-hairline bg-ink-2 p-5 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-brass">THE FLYWHEEL</div>
                      <div className="mt-1 text-lg text-paper">Attention → participation → proof → better attention</div>
                    </div>
                    <Zap size={18} className="text-brass" />
                  </div>
                  <div className="mt-7 grid gap-2 sm:grid-cols-4">
                    {['Broadcast', 'Community', 'Commerce', 'Learning'].map((step, index) => (
                      <div key={step} className="relative rounded border border-hairline p-4">
                        <div className="font-mono text-2xl text-brass">0{index + 1}</div>
                        <div className="mt-2 text-sm text-paper">{step}</div>
                        <div className="mt-1 text-xs text-sage">
                          {['Earn attention', 'Make it local', 'Package value', 'Improve the signal'][index]}
                        </div>
                        {index < 3 && (
                          <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden bg-ink-2 text-brass sm:block" size={16} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded border border-hairline bg-ink-2 p-5">
                  <div className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brass">
                    <Layers3 size={15} /> Phased build
                  </div>
                  {['Foundation / 0–90 days', 'Acceleration / 3–6 months', 'Scale / 6–12 months'].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 border-t border-hairline py-3 text-sm">
                      <span className="font-mono text-sage-dim">0{index + 1}</span>
                      <span className="text-paper">{item}</span>
                      <Check className="ml-auto text-moss" size={15} />
                    </div>
                  ))}
                </div>
                <div className="rounded border border-hairline bg-ink-2 p-5">
                  <div className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brass">
                    <Table2 size={15} /> Governance
                  </div>
                  <div className="flex flex-col gap-3">
                    {['One accountable owner', 'Visible scorecard', 'Weekly signal review'].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-paper">
                        <span className="grid size-6 place-items-center rounded-full bg-moss/20 text-moss">
                          <Check size={13} />
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="signal-proof" className="scroll-mt-24 py-12">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <div className="text-eyebrow font-mono text-brass">04 / Proof in motion</div>
                  <h3 className="mt-2 font-display text-3xl text-paper sm:text-4xl">A proposal with receipts.</h3>
                </div>
                <div className="hidden text-right text-xs font-mono text-sage sm:block">Last updated / today, 09:42</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="group overflow-hidden rounded border border-hairline bg-ink-2 sm:col-span-2">
                  <div className="relative grid min-h-52 place-items-center overflow-hidden bg-gradient-to-br from-brick/40 via-ink-2 to-brass/20">
                    <ImageIcon className="absolute left-8 top-8 text-paper/20" size={100} />
                    <div className="relative text-center">
                      <div className="text-eyebrow font-mono text-brass">Documentary / local</div>
                      <div className="mt-2 font-display text-4xl text-paper">People are the proof.</div>
                      <div className="mt-2 text-sm text-sage">Recognisable faces. Real places. Attributable stories.</div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-brass transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                  <div className="flex items-center justify-between p-4 text-xs text-sage">
                    <span className="flex items-center gap-2">
                      <MapPin size={13} className="text-brass" /> Western Kenya
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock3 size={13} /> 03 min read
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="rounded border border-hairline bg-ink-2 p-5">
                    <div className="text-eyebrow font-mono text-brass">Partner signal</div>
                    <div className="mt-3 font-display text-3xl text-paper">4.6×</div>
                    <div className="mt-1 text-xs text-sage">campaign return, modelled</div>
                  </div>
                  <div className="flex-1 rounded border border-brass/50 bg-brass/10 p-5">
                    <MessageCircle className="text-brass" size={18} />
                    <p className="mt-4 font-display text-xl leading-tight text-paper">
                      The next action should always be one tap away.
                    </p>
                    <button
                      type="button"
                      className="mt-5 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brass hover:text-paper"
                    >
                      Open action map <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                {[
                  'What changes in the first 90 days?',
                  'How will ownership stay visible?',
                  'What should the board approve now?',
                ].map((question, index) => (
                  <div key={question} className="border-b border-hairline">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                      className="flex w-full items-center justify-between py-4 text-left text-sm text-paper"
                    >
                      <span>{question}</span>
                      <ChevronDown
                        size={16}
                        className={`text-brass transition-transform duration-200 ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="overflow-hidden animate-section-entrance">
                        <p className="pb-4 pr-8 text-sm leading-relaxed text-sage">
                          Make the decision visible: name the owner, name the measure and give the next action a clear date. The visual system keeps that accountability legible from the first screen to the final ask.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {shareOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-4 backdrop-blur-sm animate-section-entrance"
          role="dialog"
          aria-modal="true"
          aria-label="Share proposal"
        >
          <div className="w-full max-w-md rounded border border-brass/50 bg-ink-2 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-eyebrow font-mono text-brass">Share this view</div>
                <h3 className="mt-2 font-display text-2xl text-paper">Send the signal forward.</h3>
              </div>
              <button
                type="button"
                aria-label="Close share dialog"
                onClick={() => setShareOpen(false)}
                className="text-sage hover:text-paper transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-5 rounded border border-hairline bg-ink p-4 text-sm text-sage">
              Nyota FM / The Signal in Motion
              <br />
              <span className="text-paper">A living case for the station&apos;s next signal.</span>
            </div>
            <button
              type="button"
              onClick={() => setShareOpen(false)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-paper px-4 py-3 text-xs font-mono uppercase tracking-wider text-ink transition-opacity hover:opacity-90"
            >
              Copy share card <Share2 size={14} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

