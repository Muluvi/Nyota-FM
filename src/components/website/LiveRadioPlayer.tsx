import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Sparkles, X, Minimize2, Maximize2 } from 'lucide-react';

export function LiveRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [streamBitrate, setStreamBitrate] = useState<'32k' | '128k' | '256k'>('128k');
  const [eqPreset, setEqPreset] = useState<'voice' | 'music' | 'flat'>('voice');
  const [nowPlaying, setNowPlaying] = useState({
    show: 'The Morning Signal',
    hosts: 'Achieng & Otieno',
    time: '06:00 – 10:00 EAT',
    frequency: '107.3 FM',
    region: 'Western Kenya & Lake Basin',
  });

  // Audio Context and Synth for real interactive audio playback
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const ambientIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Schedule show changes based on local hour
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 10) {
      setNowPlaying({
        show: 'The Morning Signal',
        hosts: 'Achieng & Otieno',
        time: '06:00 – 10:00 EAT',
        frequency: '107.3 FM',
        region: 'Bungoma, Kakamega, Busia',
      });
    } else if (hour >= 10 && hour < 14) {
      setNowPlaying({
        show: 'Mulembe Midday & Soko Nyota',
        hosts: 'Miriam Wekesa',
        time: '10:00 – 14:00 EAT',
        frequency: '107.3 FM',
        region: 'Pan-Western Broadcast',
      });
    } else if (hour >= 14 && hour < 18) {
      setNowPlaying({
        show: 'Community Desk & Civic Radar',
        hosts: 'Nyota Newsroom Hub',
        time: '14:00 – 18:00 EAT',
        frequency: '107.3 FM',
        region: 'Western & Rift Basin',
      });
    } else {
      setNowPlaying({
        show: 'The Drive Home & Twang\'aa Beats',
        hosts: 'Juma & Sifa',
        time: '18:00 – 22:00 EAT',
        frequency: '107.3 FM',
        region: 'Kakamega Studio 1',
      });
    }
  }, []);

  const startRadioAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Filter for warm FM broadcast sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3200, ctx.currentTime);
      filter.connect(masterGain);
      filterNodeRef.current = filter;

      // Gentle carrier drone / warm chord simulation
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime); // A3

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.08, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      oscillatorRef.current = osc;

      // Harmonic warmth generator
      const chords = [220, 261.63, 329.63, 392.0]; // Am7 broadcast jingle harmony
      let chordIndex = 0;
      ambientIntervalRef.current = window.setInterval(() => {
        if (!oscillatorRef.current || !ctx || ctx.state !== 'running') return;
        chordIndex = (chordIndex + 1) % chords.length;
        oscillatorRef.current.frequency.exponentialRampToValueAtTime(
          chords[chordIndex],
          ctx.currentTime + 1.2
        );
      }, 3500);

      setIsPlaying(true);
    } catch (err) {
      console.warn('AudioContext playback error:', err);
      setIsPlaying(true); // fall back to visual mode
    }
  };

  const stopRadioAudio = () => {
    if (ambientIntervalRef.current) {
      clearInterval(ambientIntervalRef.current);
      ambientIntervalRef.current = null;
    }
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopRadioAudio();
    } else {
      startRadioAudio();
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const targetGain = isMuted ? 0 : volume * 0.15;
      gainNodeRef.current.gain.setValueAtTime(targetGain, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    return () => {
      stopRadioAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      {/* Floating Mini Player Widget (Bottom Right) */}
      <div className="fixed bottom-6 left-6 z-40 max-w-[calc(100vw-3rem)]">
        {!isExpanded ? (
          <div className="flex items-center gap-3 rounded-full bg-ink-2/95 border border-brass/40 px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-brass">
            <button
              type="button"
              onClick={togglePlay}
              className={`grid h-9 w-9 place-items-center rounded-full transition-transform active:scale-95 ${
                isPlaying ? 'bg-moss text-ink' : 'bg-brass text-ink hover:scale-105'
              }`}
              title={isPlaying ? 'Pause broadcast stream' : 'Listen live to 107.3 FM'}
              aria-label={isPlaying ? 'Pause live radio' : 'Play live radio'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-3 text-left group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-moss' : 'bg-brass'} opacity-75`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-moss' : 'bg-brass'}`} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-brass font-semibold">
                    107.3 FM LIVE
                  </span>
                </div>
                <div className="font-body text-xs font-medium text-paper group-hover:text-brass transition-colors truncate max-w-[140px] sm:max-w-[200px]">
                  {nowPlaying.show}
                </div>
              </div>

              {/* Animated Equalizer Bars */}
              <div className="flex items-end gap-0.5 h-4 w-7" aria-hidden="true">
                {[0.6, 1.0, 0.4, 0.8, 0.5].map((scale, i) => (
                  <span
                    key={i}
                    className="w-1 bg-brass/80 rounded-t-sm transition-all"
                    style={{
                      height: isPlaying ? `${Math.floor(25 + Math.random() * 75 * scale)}%` : '20%',
                      animation: isPlaying ? `pulse 0.${6 + i * 2}s ease-in-out infinite alternate` : 'none',
                    }}
                  />
                ))}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="text-sage-dim hover:text-paper p-1 transition-colors"
              title="Expand player"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        ) : (
          <div className="w-80 sm:w-96 rounded-xl border border-brass/50 bg-ink-2/95 p-5 shadow-2xl backdrop-blur-md animate-section-entrance">
            <div className="flex items-start justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded bg-brass/20 text-brass">
                  <Radio size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-moss animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brass font-bold">
                      BROADCAST STREAM · 107.3 MHZ
                    </span>
                  </div>
                  <h4 className="font-display text-base text-paper font-semibold">Nyota FM Western Kenya</h4>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-sage hover:text-paper p-1 transition-colors"
                title="Minimize player"
              >
                <Minimize2 size={15} />
              </button>
            </div>

            <div className="my-4 rounded-lg bg-ink p-3 border border-hairline">
              <div className="text-[10px] font-mono uppercase tracking-wider text-sage-dim">
                Now On Air ({nowPlaying.time})
              </div>
              <div className="mt-1 font-display text-lg text-paper font-medium leading-tight">
                {nowPlaying.show}
              </div>
              <div className="mt-0.5 text-xs text-brass font-mono">
                Hosted by {nowPlaying.hosts}
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-sage-dim font-mono border-t border-hairline/60 pt-2">
                <span>Coverage: {nowPlaying.region}</span>
                <div className="flex items-center gap-1">
                  {(['32k', '128k', '256k'] as const).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setStreamBitrate(b)}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono transition-colors ${
                        streamBitrate === b ? 'bg-moss text-ink font-bold' : 'text-sage hover:text-paper bg-ink-2'
                      }`}
                      title={b === '32k' ? 'Low Data (2G/3G)' : b === '128k' ? 'Standard HQ' : 'Lossless Studio'}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Audio Waveform & Multi-band Visualizer */}
            <div className="flex h-10 items-end gap-1 px-1.5 py-1 bg-ink/70 rounded mb-3 border border-hairline/60" aria-label="Audio waveform">
              {Array.from({ length: 28 }, (_, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-150 ${
                    i % 4 === 0 ? 'bg-brass' : i % 2 === 0 ? 'bg-emerald-400' : 'bg-brass/60'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(12, (Math.sin(i * 0.45) * 45 + 50))}%` : '15%',
                  }}
                />
              ))}
            </div>

            {/* EQ Preset Selector */}
            <div className="flex items-center justify-between text-[10px] font-mono text-sage-dim mb-3 px-1">
              <span>EQ Preset:</span>
              <div className="flex gap-1">
                {(['voice', 'music', 'flat'] as const).map((eq) => (
                  <button
                    key={eq}
                    type="button"
                    onClick={() => setEqPreset(eq)}
                    className={`px-2 py-0.5 rounded uppercase font-semibold transition-colors ${
                      eqPreset === eq ? 'bg-brass/20 text-brass border border-brass/40' : 'text-sage hover:text-paper'
                    }`}
                  >
                    {eq === 'voice' ? 'Warm Voice' : eq === 'music' ? 'Ngoma Bass' : 'Studio Flat'}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-95 shadow-md ${
                    isPlaying ? 'bg-moss text-ink' : 'bg-brass text-ink hover:scale-105'
                  }`}
                  aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <div>
                  <div className="text-xs font-mono font-medium text-paper">
                    {isPlaying ? 'Streaming Live' : 'Paused · Ready'}
                  </div>
                  <div className="text-[10px] font-mono text-sage-dim">
                    {isPlaying ? 'Audio Synthesizer Active' : 'Tap play to start'}
                  </div>
                </div>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-sage hover:text-paper transition-colors p-1"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 accent-brass cursor-pointer h-1.5 bg-hairline rounded"
                  aria-label="Volume slider"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
