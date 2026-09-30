import React, { useState, useEffect } from 'react';
import Reveal from './Reveal';

export default function DashboardMockup() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const TABS = ['Overview', 'Content', 'BTL', 'Revenue', 'CRM'];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <Reveal>
      <div className="max-w-[320px] mx-auto bg-[#1A1A1A] rounded-[2rem] border-8 border-[#2A2A2A] shadow-2xl overflow-hidden h-[500px] flex flex-col relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#2A2A2A] rounded-b-xl z-20"></div>

        {/* Header */}
        <div className="bg-[#0F9D58] pt-10 pb-4 px-4 text-white z-10 shadow">
          <div className="flex items-center gap-2 mb-3">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
            <h6 className="font-medium text-sm">Nyota FM Weekly Report</h6>
          </div>
          
          <div className="flex overflow-x-auto hide-scrollbar gap-1 pb-1">
            {TABS.map((tab, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-1 rounded text-xs whitespace-nowrap transition-colors ${activeTab === idx ? 'bg-white text-[#0F9D58] font-bold' : 'text-white/80 hover:bg-white/20'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white overflow-hidden p-4">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-20 w-full rounded bg-gray-200 animate-shimmer"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-16 rounded bg-gray-200 animate-shimmer" style={{ animationDelay: '0.1s'}}></div>
                <div className="h-16 rounded bg-gray-200 animate-shimmer" style={{ animationDelay: '0.2s'}}></div>
              </div>
              <div className="h-8 w-3/4 rounded bg-gray-200 animate-shimmer" style={{ animationDelay: '0.3s'}}></div>
              <div className="h-32 w-full rounded bg-gray-200 animate-shimmer" style={{ animationDelay: '0.4s'}}></div>
            </div>
          ) : (
            <div className="h-full flex flex-col animation-fade-in text-gray-800">
              {activeTab === 0 && (
                <>
                  <div className="flex justify-between items-end border-b pb-2 mb-4">
                    <span className="text-xs text-gray-500 uppercase">Total Revenue (Wk)</span>
                    <span className="text-lg font-bold text-gray-900">KES 32,500</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-50 p-2 rounded border">
                      <span className="block text-[10px] text-gray-500 uppercase">Reach</span>
                      <span className="font-bold text-sm">24,500</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded border">
                      <span className="block text-[10px] text-gray-500 uppercase">New CRM</span>
                      <span className="font-bold text-sm">+142</span>
                    </div>
                  </div>
                  <div className="bg-green-50 text-green-800 p-3 rounded text-xs border border-green-200">
                    <strong>Working:</strong> Webuye market activation drove 60% of new signups. FB Live morning show hit record 800 live viewers.
                  </div>
                </>
              )}
              {activeTab !== 0 && (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic">
                  [ {TABS[activeTab]} Data ]
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <p className="text-center font-mono text-[10px] text-static-grey mt-4 uppercase tracking-widest">
        Actual weekly owner report format
      </p>
    </Reveal>
  );
}
