import React, { useState } from 'react';
import { Phone, MessageSquare, Send, CheckCheck, RefreshCw, Volume2, Sparkles, Smartphone, Check, ArrowRight } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

export function TwangaaMobileSimulator() {
  const [activeMode, setActiveMode] = useState<'ussd' | 'whatsapp'>('ussd');
  
  // USSD State
  const [ussdStep, setUssdStep] = useState<number>(0);
  const [ussdInput, setUssdInput] = useState<string>('');
  const [ussdHistory, setUssdHistory] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<'swahili' | 'bukusu'>('swahili');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // WhatsApp State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Mulembe! Karibu Nyota FM 107.3 Twang\'aa Official WhatsApp Channel. Jibu na namba:\n1. 🗳️ Kura ya Kumekucha Leo\n2. 🎵 Omba Wimbo wa Luhya/Gospel\n3. 🌾 Bei ya Mazao Sokoni (Chwele/Kakamega)\n4. 📻 Sikiliza Matangazo Mubashara',
      time: '07:15',
    },
  ]);
  const [waInput, setWaInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Play standard DTMF touch tone using Web Audio API
  const playDTMFTone = (freq1: number, freq2: number) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.setValueAtTime(freq1, ctx.currentTime);
      osc2.frequency.setValueAtTime(freq2, ctx.currentTime);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  };

  const handleKeypadPress = (digit: string) => {
    // DTMF frequencies for phone keypads
    const dtmfMap: Record<string, [number, number]> = {
      '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
      '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
      '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
      '*': [941, 1209], '0': [941, 1336], '#': [941, 1477],
    };
    if (dtmfMap[digit]) {
      playDTMFTone(dtmfMap[digit][0], dtmfMap[digit][1]);
    }
    setUssdInput((prev) => prev + digit);
  };

  const submitUSSD = () => {
    const input = ussdInput.trim();
    if (ussdStep === 0) {
      if (input === '*483*107#' || input === '*483#' || input === '107') {
        setUssdStep(1);
        setUssdInput('');
      } else {
        setUssdStep(1);
        setUssdInput('');
      }
    } else if (ussdStep === 1) {
      if (input === '1') setUssdStep(2); // Poll
      else if (input === '2') setUssdStep(3); // Song request
      else if (input === '3') setUssdStep(4); // Farm prices
      else if (input === '4') setUssdStep(5); // Twang'aa Draw
      else setUssdStep(2);
      setUssdInput('');
    } else {
      // Completed action, show thank you & reward
      setUssdStep(6);
      setUssdInput('');
    }
  };

  const resetUSSD = () => {
    setUssdStep(0);
    setUssdInput('*483*107#');
  };

  // WhatsApp reply engine
  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waInput.trim()) return;

    const userText = waInput.trim();
    const newChat = [...chatMessages, { sender: 'user' as const, text: userText, time: '07:18' }];
    setChatMessages(newChat);
    setWaInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      if (userText === '1' || userText.toLowerCase().includes('kura') || userText.toLowerCase().includes('poll')) {
        botResponse = '✅ Kura yako imepokelewa kwenye Kumekucha Morning Poll! 68% ya wasikilizaji wa Bungoma wanakubaliana nawe. Endelea kusikiliza 107.3 FM matokeo rasmi yakitangazwa saa 08:30.';
      } else if (userText === '2' || userText.toLowerCase().includes('wimbo') || userText.toLowerCase().includes('song')) {
        botResponse = '🎵 Asante kwa ombi la wimbo! Tumemtumia Mtangazaji Miriam Wekesa wimbo wako kwenye Soko Nyota (10:00–14:00). Nyota FM: Sauti Yetu, Fahari Yetu!';
      } else if (userText === '3' || userText.toLowerCase().includes('bei') || userText.toLowerCase().includes('mazao') || userText.toLowerCase().includes('chwele')) {
        botResponse = '🌾 BEI ZA MAZAO LEO (CHWELE MARKET - BUNGOMA):\n• Mahindi (90kg): KSh 3,400\n• Maharagwe (Rosecoco 90kg): KSh 7,800\n• Vitunguu (Kg): KSh 110\n• Nyanya (Crater): KSh 2,200\nImedhaminiwa na One Acre Fund & Nyota FM Agribusiness Desk.';
      } else {
        botResponse = '🌟 Asante kwa kuwasiliana na Nyota FM 107.3! Ujumbe wako umerekodiwa kwenye database ya wasikilizaji wa Western Kenya. Umepokea alama 5 za uaminifu (Twang\'aa Loyalty Points).';
      }

      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse, time: '07:19' }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="rounded-xl border border-brass/50 bg-ink-2 p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brass/10 border border-brass/30 px-2.5 py-0.5 text-[10px] font-mono text-brass font-bold uppercase tracking-wider">
              <Sparkles size={12} />
              Interactive Prototype · Strategy 5.7
            </span>
            <TierBadge tier={1} citation="CA Kenya Q1 2025/26 (27.42M Feature Phones) & Africa's Talking API" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Mobile Listener Journey & USSD / WhatsApp Simulator
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Test the exact zero-data USSD shortcode (<code className="text-brass font-mono">*483*107#</code>) and automated WhatsApp Business API pipeline that captures Western Kenya's 27.42M feature phone listeners into a first-party monetizable audience CRM.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex rounded-lg border border-hairline bg-ink p-1">
          <button
            type="button"
            onClick={() => setActiveMode('ussd')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
              activeMode === 'ussd' ? 'bg-brass text-ink font-bold shadow' : 'text-sage hover:text-paper'
            }`}
          >
            <Phone size={14} />
            <span>USSD Shortcode (*483#)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('whatsapp')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
              activeMode === 'whatsapp' ? 'bg-[#25D366] text-ink font-bold shadow' : 'text-sage hover:text-paper'
            }`}
          >
            <MessageSquare size={14} />
            <span>WhatsApp BSP Channel</span>
          </button>
        </div>
      </div>

      {/* Simulator Content Area */}
      {activeMode === 'ussd' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Feature Phone Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[320px] rounded-[32px] border-4 border-stone-700 bg-stone-900 p-4 shadow-2xl relative">
              {/* Phone Speaker */}
              <div className="mx-auto h-1.5 w-16 rounded-full bg-stone-700 mb-3" />

              {/* LCD Monochrome / Color Screen */}
              <div className="rounded-xl border-2 border-stone-800 bg-[#7B9B7E] p-3 text-[#142314] font-mono shadow-inner min-h-[220px] flex flex-col justify-between">
                {/* Screen Header */}
                <div className="flex items-center justify-between border-b border-[#5e7760] pb-1 text-[10px] font-bold">
                  <span>SAFARICOM 3G</span>
                  <span>107.3 FM</span>
                </div>

                {/* USSD Dialog Box */}
                <div className="my-auto py-2 text-xs leading-snug">
                  {ussdStep === 0 && (
                    <div className="space-y-2">
                      <div className="font-bold text-center">Piga namba ya huduma:</div>
                      <div className="rounded bg-[#6d8a70] p-2 text-center text-sm font-bold tracking-widest text-black">
                        {ussdInput || '*483*107#'}
                      </div>
                      <p className="text-[10px] text-center opacity-80">
                        Bofya "PIGA" au tumia vitufe vya simu
                      </p>
                    </div>
                  )}

                  {ussdStep === 1 && (
                    <div className="space-y-1">
                      <div className="font-bold text-[11px] uppercase">NYOTA FM 107.3 TWANG'AA:</div>
                      <div className="text-[10px] space-y-0.5">
                        <p>1. Piga Kura ya Kumekucha</p>
                        <p>2. Omba Wimbo wa Luhya/Gospel</p>
                        <p>3. Bei ya Mazao (Chwele Market)</p>
                        <p>4. Jiunge na Twang'aa Cash Club</p>
                      </div>
                      <div className="mt-2 text-[10px] font-bold">Jibu [1-4]: {ussdInput}</div>
                    </div>
                  )}

                  {ussdStep === 2 && (
                    <div className="space-y-1">
                      <div className="font-bold text-[11px]">KURA YA LEO:</div>
                      <p className="text-[10px]">Je, serikali ya kaunti ifungue soko la usiku Bungoma mjini?</p>
                      <p className="text-[10px]">1. Ndio (Inaleta biashara)</p>
                      <p className="text-[10px]">2. La (Usalama bado mdogo)</p>
                      <div className="mt-2 text-[10px] font-bold">Jibu: {ussdInput}</div>
                    </div>
                  )}

                  {ussdStep === 3 && (
                    <div className="space-y-1">
                      <div className="font-bold text-[11px]">OMBA WIMBO:</div>
                      <p className="text-[10px]">Chagua aina ya muziki unaotaka kupata on-air:</p>
                      <p className="text-[10px]">1. Luhya Folk Classics (Sukuma Bin Ongaro)</p>
                      <p className="text-[10px]">2. Western Gospel Praise</p>
                      <p className="text-[10px]">3. Bongo / Afrobeats Mix</p>
                      <div className="mt-2 text-[10px] font-bold">Jibu: {ussdInput}</div>
                    </div>
                  )}

                  {ussdStep === 4 && (
                    <div className="space-y-1">
                      <div className="font-bold text-[11px]">CHWELE SOKO PRICES:</div>
                      <p className="text-[10px]">1. Gunia ya Mahindi: KSh 3,400</p>
                      <p className="text-[10px]">2. Maharagwe (Rosecoco): KSh 7,800</p>
                      <p className="text-[10px]">3. Kuku wa Kienyeji: KSh 850</p>
                      <div className="mt-2 text-[10px] font-bold">1. Tuma SMS ya Bei | 0. Nyuma: {ussdInput}</div>
                    </div>
                  )}

                  {ussdStep === 5 && (
                    <div className="space-y-1">
                      <div className="font-bold text-[11px]">TWANG'AA CASH CLUB:</div>
                      <p className="text-[10px]">Umesajiliwa nambari {Math.floor(1000 + Math.random() * 9000)}.</p>
                      <p className="text-[10px]">Sikiliza Hapa Tulipo saa 17:00 kwa droo ya KSh 5,000 ya leo!</p>
                      <div className="mt-2 text-[10px] font-bold">0. Toka: {ussdInput}</div>
                    </div>
                  )}

                  {ussdStep === 6 && (
                    <div className="space-y-2 text-center">
                      <div className="font-bold text-xs">ASANTE!</div>
                      <p className="text-[10px]">
                        Ujumbe wako umepokewa na watangazaji wa Nyota FM 107.3. Umepokea nafasi ya bure kwenye droo ya leo.
                      </p>
                      <p className="text-[9px] opacity-75">Tumeokoa data yako: USSD ni bila gharama ya mtandao.</p>
                    </div>
                  )}
                </div>

                {/* Screen Footer Buttons */}
                <div className="flex justify-between border-t border-[#5e7760] pt-1 text-[9px] font-bold">
                  <button type="button" onClick={submitUSSD} className="hover:underline">
                    {ussdStep === 0 ? 'PIGA' : ussdStep === 6 ? 'MALIZA' : 'TUMA'}
                  </button>
                  <button type="button" onClick={resetUSSD} className="hover:underline">
                    FUTA
                  </button>
                </div>
              </div>

              {/* Physical Keypad Buttons */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => handleKeypadPress(k)}
                    className="flex h-10 items-center justify-center rounded-lg bg-stone-800 text-stone-200 font-mono text-sm font-bold shadow active:bg-stone-700 active:scale-95 transition-all"
                  >
                    {k}
                  </button>
                ))}
              </div>

              {/* Action Buttons: Dial / Cancel */}
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={submitUSSD}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-moss hover:bg-moss/90 text-ink py-2 text-xs font-mono font-bold shadow"
                >
                  <Phone size={13} />
                  <span>{ussdStep === 0 ? 'Piga (*483#)' : 'Tuma Jibu'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetUSSD}
                  className="px-3 rounded-lg bg-brick/80 hover:bg-brick text-paper py-2 text-xs font-mono font-bold"
                  title="Weka upya simu"
                >
                  <RefreshCw size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Technical Architecture & Commercial Derivation */}
          <div className="lg:col-span-6 space-y-4 text-xs font-mono">
            <div className="rounded-lg border border-hairline bg-ink p-4 space-y-3">
              <span className="text-[10px] text-brass uppercase tracking-wider font-bold block">
                WHY ZERO-DATA USSD WINS WESTERN KENYA
              </span>
              <p className="text-sage text-xs font-sans leading-relaxed">
                Smartphone mobile internet penetration in rural Bungoma and Kakamega hovers below 48%. Yet 94% of adult residents own a feature phone with Safaricom or Airtel connectivity.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="rounded border border-hairline bg-ink-2 p-2.5">
                  <span className="text-[10px] text-sage-dim block">Setup Capex</span>
                  <span className="text-sm font-bold text-paper">KSh 145,000</span>
                  <span className="text-[10px] text-moss block mt-0.5">Africa's Talking Shortcode</span>
                </div>
                <div className="rounded border border-hairline bg-ink-2 p-2.5">
                  <span className="text-[10px] text-sage-dim block">Monthly Access</span>
                  <span className="text-sm font-bold text-brass">KSh 70,000 / mo</span>
                  <span className="text-[10px] text-sage-dim block mt-0.5">Telco link fees</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-hairline bg-ink p-4 space-y-2.5">
              <span className="text-[10px] text-brass uppercase tracking-wider font-bold block">
                COMMERCIAL SPONSORSHIP INTEGRATION
              </span>
              <ul className="space-y-1.5 text-xs font-sans text-sage">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-moss shrink-0 mt-0.5" />
                  <span><strong>Agri-inputs:</strong> One Acre Fund or Kenya Seed can sponsor commodity price queries (e.g., "Press 3 for Chwele fertilizer and seed prices").</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-moss shrink-0 mt-0.5" />
                  <span><strong>Telco Airtime Rewards:</strong> Safaricom M-Pesa B2C sends instant 10 KSh airtime incentives to listeners who complete morning polls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-moss shrink-0 mt-0.5" />
                  <span><strong>First-Party Voter / Citizen Database:</strong> Builds an ODPC-registered opt-in voter and consumer panel of 150,000+ verifiable county residents.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* WhatsApp Smartphone Simulator */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Smartphone Screen Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[340px] rounded-[36px] border-4 border-stone-800 bg-[#0b141a] p-3 shadow-2xl relative flex flex-col h-[520px]">
              {/* Notch */}
              <div className="mx-auto h-4 w-28 rounded-full bg-stone-900 mb-2 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-stone-700" />
              </div>

              {/* WhatsApp Header */}
              <div className="flex items-center gap-2.5 bg-[#202c33] p-2.5 rounded-t-xl text-paper">
                <div className="h-9 w-9 rounded-full bg-brass/20 border border-brass/40 flex items-center justify-center text-xs font-bold text-brass">
                  NF
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-paper">Nyota FM 107.3</span>
                    <span className="rounded-full bg-[#25D366] text-[#0b141a] p-0.5">
                      <Check size={9} strokeWidth={4} />
                    </span>
                  </div>
                  <span className="text-[10px] text-[#25D366] block">Official Business Account</span>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-[#0b141a] text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col max-w-[85%] rounded-lg p-2.5 ${
                      msg.sender === 'user'
                        ? 'ml-auto bg-[#005c4b] text-paper rounded-tr-none'
                        : 'mr-auto bg-[#202c33] text-paper rounded-tl-none border border-hairline/40'
                    }`}
                  >
                    <p className="whitespace-pre-line text-xs font-sans leading-relaxed">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-sage-dim">
                      <span>{msg.time}</span>
                      {msg.sender === 'user' && <CheckCheck size={12} className="text-[#53bdeb]" />}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="mr-auto bg-[#202c33] text-sage text-[11px] px-3 py-1.5 rounded-lg border border-hairline/40 animate-pulse">
                    Nyota FM inajibu...
                  </div>
                )}
              </div>

              {/* Quick Prompt Pills */}
              <div className="flex gap-1.5 overflow-x-auto py-1 px-1 text-[10px] font-mono no-scrollbar">
                {['1', '2', '3', 'Soko Chwele'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setWaInput(opt);
                    }}
                    className="shrink-0 rounded-full border border-hairline bg-[#202c33] px-2.5 py-1 text-sage hover:text-paper hover:border-brass"
                  >
                    Jibu: {opt}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendWA} className="mt-1 flex items-center gap-1.5 pt-1 border-t border-hairline/40">
                <input
                  type="text"
                  value={waInput}
                  onChange={(e) => setWaInput(e.target.value)}
                  placeholder="Andika ujumbe au namba..."
                  className="flex-1 rounded-full bg-[#202c33] border border-hairline px-3.5 py-2 text-xs text-paper focus:outline-none focus:border-[#25D366]"
                />
                <button
                  type="submit"
                  className="h-8 w-8 rounded-full bg-[#25D366] text-[#0b141a] flex items-center justify-center hover:bg-[#20bd5a] transition-colors"
                  aria-label="Tuma ujumbe"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>

          {/* Business Model Explanation */}
          <div className="lg:col-span-6 space-y-4 text-xs font-mono">
            <div className="rounded-lg border border-hairline bg-ink p-4 space-y-2.5">
              <span className="text-[10px] text-brass uppercase tracking-wider font-bold block">
                METRICS & SCALE (STRATEGY 5.7 / PART 2)
              </span>
              <p className="text-sage text-xs font-sans leading-relaxed">
                Unlike unverified social media vanity counts, a WhatsApp Business API pipeline directly collects active phone numbers from Western Kenya listeners, building an owned high-retention media asset.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div className="rounded border border-hairline bg-ink-2 p-2.5">
                  <span className="text-[10px] text-sage-dim block">BSP Setup Cost</span>
                  <span className="text-sm font-bold text-paper">$85 (KSh 11,000)</span>
                  <span className="text-[10px] text-moss block mt-0.5">Africa's Talking Gateway</span>
                </div>
                <div className="rounded border border-hairline bg-ink-2 p-2.5">
                  <span className="text-[10px] text-sage-dim block">Monthly Service</span>
                  <span className="text-sm font-bold text-brass">$50 / mo (~KSh 6,500)</span>
                  <span className="text-[10px] text-sage-dim block mt-0.5">Plus Meta per-convo fees</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-hairline bg-ink p-4 space-y-2">
              <span className="text-[10px] text-brass uppercase tracking-wider font-bold block">
                REVENUE MONETIZATION CHANNELS
              </span>
              <ul className="space-y-1.5 text-xs font-sans text-sage">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-moss shrink-0 mt-0.5" />
                  <span><strong>Sponsored Message Footers:</strong> Every automated commodity price alert includes an advertiser tag (e.g. "Panda na Mbegu za Kenya Seed").</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-moss shrink-0 mt-0.5" />
                  <span><strong>ODPC Compliant Segmentation:</strong> Audiences segmented by county (Bungoma vs Kakamega) and occupation (Farmers, Youth, Boda-boda).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
