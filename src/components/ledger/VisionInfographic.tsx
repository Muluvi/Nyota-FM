import React from 'react';
import { 
  Radio, 
  Tv, 
  Sparkles, 
  MessageSquare, 
  Globe, 
  Calendar, 
  ShoppingBag, 
  Share2 
} from 'lucide-react';
import { LedgerCard } from './LedgerCard';

export function VisionInfographic() {
  const revenueStreams = [
    { icon: Radio, name: 'Spot Ads', desc: 'Airtime & jingles' },
    { icon: Tv, name: 'Outside Broadcasts', desc: 'On-site OB trucks' },
    { icon: Sparkles, name: 'Branded Shows', desc: 'Sponsored segments' },
    { icon: MessageSquare, name: 'WhatsApp / USSD', desc: 'Interactive CRM' },
    { icon: Globe, name: 'Digital & Social', desc: 'Meta, TikTok & YT' },
    { icon: Calendar, name: 'On-Ground Events', desc: 'Market activations' },
    { icon: ShoppingBag, name: 'Merchandise', desc: 'Apparel & stickers' },
    { icon: Share2, name: 'Syndication', desc: 'Regional licensing' },
  ];

  return (
    <LedgerCard className="my-8 p-6 md:p-8 border-[#C8A951]/40 bg-[#0F3D2E]/40 text-[#F8F4E9] relative overflow-hidden">
      {/* Subtle African Geometric Motif - Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex items-center overflow-hidden opacity-60">
        <div className="w-full h-full bg-[radial-gradient(#C8A951_1px,transparent_1px)] [background-size:8px_8px]" />
      </div>

      {/* Infographic Header */}
      <div className="text-center mb-8 pb-6 border-b border-[#C8A951]/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C8A951]/30 bg-[#C8A951]/10 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A951] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#C8A951]">
            Twang'aa Transformation
          </span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-[#F8F4E9] tracking-tight">
          Nyota FM 2028 Vision
        </h3>
      </div>

      {/* Main 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
        
        {/* Left Panel: 8 Revenue Streams */}
        <div className="lg:col-span-4 bg-[#161B19]/80 border border-[#2E3632] rounded p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2E3632]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#C8A951]">Strategy</span>
              <span className="font-display text-sm font-medium text-[#F8F4E9]">8 Revenue Streams</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {revenueStreams.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded bg-[#1B211E]/60 border border-[#2E3632]/50 hover:border-[#C8A951]/40 transition-colors">
                    <div className="p-1.5 rounded bg-[#0F3D2E] text-[#C8A951] shrink-0 mt-0.5">
                      <IconComponent size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-body text-xs font-medium text-[#F8F4E9] truncate">{item.name}</p>
                      <p className="font-mono text-[10px] text-[#8FA096] truncate">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Big Metric: 2.4x Revenue Growth */}
        <div className="lg:col-span-4 bg-[#0F3D2E]/90 border border-[#C8A951]/50 rounded p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-[#C8A951]/10 to-transparent pointer-events-none" />
          
          <span className="font-mono text-xs uppercase tracking-widest text-[#C8A951] mb-2">Primary Objective</span>
          
          <div className="font-mono text-5xl md:text-6xl font-bold text-[#F8F4E9] tracking-tight mb-2 drop-shadow-sm">
            2.4×
          </div>
          
          <div className="font-display text-lg text-[#C8A951] font-medium uppercase tracking-wider mb-6">
            Revenue Growth
          </div>

          <div className="w-12 h-px bg-[#C8A951]/40 mb-6" />

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#161B19]/90 border border-[#C8A951]/40 text-[#F8F4E9]">
            <span className="text-xs font-mono font-medium text-[#C8A951]">#1</span>
            <span className="text-xs font-body text-[#F8F4E9]">Vernacular Station in Western Kenya</span>
          </div>
        </div>

        {/* Right Panel: 40% Non-Spot Revenue Pie Chart */}
        <div className="lg:col-span-4 bg-[#161B19]/80 border border-[#2E3632] rounded p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2E3632]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#C8A951]">Target Mix</span>
              <span className="font-display text-sm font-medium text-[#F8F4E9]">Q4 2027 Model</span>
            </div>

            {/* SVG Pie/Donut Visual */}
            <div className="flex flex-col items-center justify-center my-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle (Spot Airtime 60%) */}
                  <path
                    className="text-[#2E3632]"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Non-Spot Revenue Circle Segment (40%) */}
                  <path
                    className="text-[#C8A951]"
                    strokeDasharray="40, 100"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="font-mono text-2xl font-bold text-[#F8F4E9]">40%</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#C8A951]">Non-Spot</span>
                </div>
              </div>
            </div>

            <p className="font-body text-xs text-[#8FA096] text-center mt-3">
              Diversifying beyond traditional spot ads into BTL events, digital subscriptions & direct listener CRM.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Strip: Addressable Contacts & TAM */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#C8A951]/20">
        <div className="flex items-center justify-between p-3.5 rounded bg-[#161B19]/90 border border-[#2E3632]">
          <div className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#8FA096]">Direct Listener CRM</span>
            <span className="font-body text-sm text-[#F8F4E9] font-medium">Directly Addressable Contacts</span>
          </div>
          <span className="font-mono text-xl font-semibold text-[#C8A951]">250,000</span>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded bg-[#161B19]/90 border border-[#2E3632]">
          <div className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#8FA096]">Market Opportunity</span>
            <span className="font-body text-sm text-[#F8F4E9] font-medium">5-County TAM</span>
          </div>
          <span className="font-mono text-xl font-semibold text-[#F8F4E9]">7.2M</span>
        </div>
      </div>

      {/* African Motif Bottom Accent */}
      <div className="mt-6 flex justify-center items-center gap-1.5 text-[#C8A951]/40">
        <span className="text-[10px] font-mono">◆</span>
        <div className="w-16 h-px bg-[#C8A951]/30" />
        <span className="text-[10px] font-mono">NYOTA FM 2028</span>
        <div className="w-16 h-px bg-[#C8A951]/30" />
        <span className="text-[10px] font-mono">◆</span>
      </div>
    </LedgerCard>
  );
}
