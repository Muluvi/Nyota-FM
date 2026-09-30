import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  BarChart3,
  Check,
  ChevronRight,
  Gauge,
  Image,
  Layers3,
  Map,
  Menu,
  MessageCircle,
  MousePointer2,
  Play,
  Radio,
  Smartphone,
  Sparkles,
  Table2,
  Users,
  Waves,
  Zap,
} from 'lucide-react';
import { Reveal } from '../ledger/Reveal';

type VisualCategory = 'all' | 'structure' | 'story' | 'data' | 'motion';

const visualSystems = [
  { id: 'structure', label: 'Structure', icon: Layers3, count: '12 patterns', title: 'Make the strategy scannable', description: 'Bento summaries, sticky chapters, split screens and progressive disclosure turn a dense board document into a guided decision journey.', tags: ['Bento grid', 'Sticky TOC', 'Accordions', 'Progress bar'] },
  { id: 'story', label: 'Story', icon: Image, count: '18 formats', title: 'Show Western Kenya, don’t stock it', description: 'Documentary portraits, local places, presenter cards, audio artwork and respectful cultural texture build recognition and trust.', tags: ['Portraits', 'Editorial collage', 'Audio cards', 'Picture art direction'] },
  { id: 'data', label: 'Data', icon: BarChart3, count: '9 relationships', title: 'Make the numbers earn attention', description: 'Use the right visual for the relationship: change over time, ranking, part-to-whole, flow, geography or deviation.', tags: ['KPI cards', 'Rankings', 'Slope chart', 'Heatmap'] },
  { id: 'motion', label: 'Motion', icon: Waves, count: '8 behaviours', title: 'Signal without distracting', description: 'Animate only what changes: live radio status, revenue ramps, audience funnels and the next recommended action.', tags: ['Live pulse', 'Reveal', 'Scrubber', 'Reduced motion'] },
] as const;

const chartModes = {
  change: { label: 'Change over time', icon: Activity, values: [32, 38, 45, 54, 67, 79], labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2'], note: 'Use a line or area when the board needs to see momentum.' },
  mix: { label: 'Revenue mix', icon: BarChart3, values: [58, 21, 12, 9], labels: ['Spot', 'Shows', 'Digital', 'Events'], note: 'Use a stacked bar when the question is “what is the portfolio made of?”' },
  funnel: { label: 'Listener funnel', icon: Users, values: [100, 68, 44, 27], labels: ['Reach', 'Engage', 'Opt in', 'Return'], note: 'Use a funnel only when each stage is a real conversion step.' },
} as const;

export function VisualPlaybook() {
  const [category, setCategory] = useState<VisualCategory>('all');
  const [chartMode, setChartMode] = useState<keyof typeof chartModes>('change');
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [selected, setSelected] = useState('structure');

  const visibleSystems = useMemo(
    () => category === 'all' ? visualSystems : visualSystems.filter((system) => system.id === category),
    [category],
  );
  const activeSystem = visualSystems.find((system) => system.id === selected) ?? visualSystems[0];
  const chart = chartModes[chartMode];
  const ChartIcon = chart.icon;
  const shouldReduceMotion = useReducedMotion();
  const motionTransition = shouldReduceMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 280, damping: 22 };

  return (
    <section id="visual-system" className="py-14 border-b border-hairline">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
          <div>
            <div className="text-eyebrow text-brass font-mono mb-2 flex items-center gap-2"><Sparkles size={13} /> THE VISUAL OPERATING SYSTEM</div>
            <h2 className="font-display text-paper text-3xl sm:text-4xl leading-tight">A proposal that behaves like the future station.</h2>
            <p className="text-sage max-w-2xl mt-3 text-sm sm:text-base">This is the visual layer recommended by the attached handbook: every visual earns its place by clarifying a decision, a relationship, a place, a person or a feeling.</p>
          </div>
          <div className="border border-brass/40 bg-brass/10 rounded p-3 min-w-[190px]">
            <div className="text-[10px] text-brass font-mono uppercase tracking-widest">Design principle</div>
            <div className="font-display text-paper mt-1">Signal over spectacle.</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Visual categories">
            {(['all', 'structure', 'story', 'data', 'motion'] as const).map((item) => (
              <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={`px-3 py-2 rounded border text-[11px] font-mono uppercase tracking-wider transition-colors ${category === item ? 'bg-paper text-ink border-paper' : 'border-hairline text-sage hover:text-paper hover:border-brass/60'}`}>
                {item === 'all' ? 'All systems' : item}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setLowBandwidth(!lowBandwidth)} aria-pressed={lowBandwidth} className={`flex items-center gap-2 px-3 py-2 rounded border text-xs font-mono transition-colors ${lowBandwidth ? 'border-moss bg-moss/20 text-emerald-300' : 'border-hairline text-sage hover:border-brass/60'}`}>
            <Smartphone size={14} /> {lowBandwidth ? 'Low-bandwidth mode on' : 'Preview low-bandwidth mode'}
          </button>
        </div>

        <div className={`grid gap-4 ${lowBandwidth ? 'opacity-90' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {visibleSystems.map((system) => {
              const Icon = system.icon;
              const isSelected = selected === system.id;
              return (
                <motion.button key={system.id} type="button" onClick={() => setSelected(system.id)} whileHover={shouldReduceMotion ? undefined : { y: -4 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }} transition={motionTransition} className={`text-left p-4 rounded border transition-colors ${isSelected ? 'border-brass bg-brass/10' : 'border-hairline bg-ink-2 hover:border-sage-dim'}`}>
                  <div className="flex items-center justify-between mb-4"><Icon size={18} className={isSelected ? 'text-brass' : 'text-sage'} /><span className="text-[10px] font-mono text-sage-dim">{system.count}</span></div>
                  <div className="font-display text-lg text-paper mb-1">{system.label}</div>
                  <div className="text-xs text-sage leading-relaxed">{system.title}</div>
                  </motion.button>
                );
            })}
          </div>

          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-4">
            <div className="bg-ink-2 border border-hairline rounded p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 mb-5"><div><div className="text-[10px] text-brass font-mono uppercase tracking-widest mb-1">Selected system</div><h3 className="font-display text-2xl text-paper">{activeSystem.title}</h3></div><Zap size={18} className="text-brass shrink-0" /></div>
              <p className="text-sm text-sage leading-relaxed mb-5">{activeSystem.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">{activeSystem.tags.map((tag) => <span key={tag} className="px-2.5 py-1 rounded-full border border-hairline text-[11px] text-paper/80 font-mono">{tag}</span>)}</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono"><div className="border border-hairline rounded p-3"><div className="text-sage-dim mb-1">Always include</div><div className="text-paper flex gap-2"><Check size={14} className="text-moss" /> clear label</div></div><div className="border border-hairline rounded p-3"><div className="text-sage-dim mb-1">Never rely on</div><div className="text-paper flex gap-2"><Menu size={14} className="text-brass" /> colour alone</div></div></div>
            </div>

            <div className="bg-ink-2 border border-hairline rounded p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5"><div><div className="text-[10px] text-brass font-mono uppercase tracking-widest mb-1">Interactive chart chooser</div><h3 className="font-display text-2xl text-paper">Match visual to question</h3></div><ChartIcon size={18} className="text-brass" /></div>
              <div className="flex gap-2 mb-5">{(Object.keys(chartModes) as Array<keyof typeof chartModes>).map((mode) => <button key={mode} type="button" onClick={() => setChartMode(mode)} className={`flex-1 py-2 px-2 rounded border text-[10px] font-mono ${chartMode === mode ? 'bg-brass/15 border-brass text-brass' : 'border-hairline text-sage hover:border-sage-dim'}`}>{chartModes[mode].label}</button>)}</div>
              <div className="h-36 flex items-end gap-2 border-b border-hairline pb-2" aria-label={`${chart.label} preview`}>
                {chart.values.map((value, index) => <div key={chart.labels[index]} className="flex-1 h-full flex flex-col justify-end gap-2"><motion.div initial={shouldReduceMotion ? false : { height: 0 }} animate={{ height: `${value}%` }} transition={{ ...motionTransition, delay: index * 0.04 }} className="bg-brass/80 hover:bg-brass rounded-t" title={`${chart.labels[index]}: ${value}%`} /><span className="text-[10px] font-mono text-sage-dim text-center">{chart.labels[index]}</span></div>)}
              </div>
              <p className="text-xs text-sage mt-4 flex items-start gap-2"><MousePointer2 size={14} className="text-brass mt-0.5 shrink-0" /> {chart.note}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[{ icon: Radio, label: 'Live layer', value: 'Now playing + status' }, { icon: Gauge, label: 'Decision layer', value: 'KPIs with context' }, { icon: Map, label: 'Place layer', value: 'Local impact map' }, { icon: MessageCircle, label: 'Action layer', value: 'WhatsApp / USSD CTA' }].map(({ icon: Icon, label, value }, index) => <motion.div key={label} initial={shouldReduceMotion || lowBandwidth ? false : { opacity: 0, y: 12 }} whileInView={shouldReduceMotion || lowBandwidth ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ ...motionTransition, delay: index * 0.08 }} whileHover={shouldReduceMotion || lowBandwidth ? undefined : { y: -3 }} className="bg-ink-2 border border-hairline rounded p-3"><div className="flex items-start justify-between"><Icon size={16} className="text-brass mb-3" />{index === 0 && <span className="relative flex size-2"><span className="absolute inline-flex size-2 animate-ping rounded-full bg-moss opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-emerald-400" /></span>}</div><div className="text-[10px] font-mono uppercase tracking-wider text-sage-dim">{label}</div><div className="text-sm text-paper mt-1">{value}</div></motion.div>)}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4 text-xs text-sage"><div className="flex items-center gap-2"><Play size={13} className="text-brass" /> Static fallback first; motion second; meaning always available without interaction.</div><div className="flex items-center gap-1 text-brass font-mono">Explore the chapters <ChevronRight size={14} /></div></div>

      </Reveal>
    </section>
  );
}
