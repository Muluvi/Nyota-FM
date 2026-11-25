import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Minimize2, Maximize2, Loader2, AlertTriangle } from 'lucide-react';
import { station } from '../../data/station';
import { currentDaypart, formatHour, type Daypart } from '../../data/programmes';

type Status = 'idle' | 'loading' | 'playing' | 'error' | 'unconfigured';

export function LiveRadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<Status>(station.streamUrl ? 'idle' : 'unconfigured');
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<Daypart>(() => currentDaypart());

  const isPlaying = status === 'playing';

  // Refresh "now on air" every minute using Africa/Nairobi time, not device time.
  useEffect(() => {
    const id = window.setInterval(() => setNowPlaying(currentDaypart()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  // Lock-screen / notification controls.
  useEffect(() => {
    if (!('mediaSession' in navigator) || !isPlaying) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: nowPlaying.show,
      artist: `${station.name} · live`,
      album: 'Western Kenya',
    });
  }, [isPlaying, nowPlaying]);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio || !station.streamUrl) {
      setStatus('unconfigured');
      return;
    }
    setStatus('loading');
    try {
      // Re-point at the live edge each time so a paused stream does not resume stale audio.
      audio.src = station.streamUrl;
      await audio.play();
      setStatus('playing');
    } catch {
      setStatus('error');
    }
  };

  const stop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    }
    setStatus(station.streamUrl ? 'idle' : 'unconfigured');
  };

  const togglePlay = () => (isPlaying || status === 'loading' ? stop() : void play());

  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.setActionHandler('play', () => void play());
    navigator.mediaSession.setActionHandler('pause', stop);
    return () => {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusLine: Record<Status, string> = {
    idle: 'Tap play to listen',
    loading: 'Connecting to stream…',
    playing: 'Streaming live',
    error: 'Stream offline right now — try again later',
    unconfigured: 'Stream link pending',
  };

  const PlayIcon = status === 'loading' ? Loader2 : isPlaying ? Pause : Play;

  const EqBars = ({ count, className }: { count: number; className: string }) => (
    <div className={className} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`flex-1 rounded-t-sm bg-brass/80 ${isPlaying ? 'motion-safe:animate-pulse' : ''}`}
          style={{
            height: isPlaying ? `${35 + ((i * 37) % 60)}%` : '18%',
            animationDelay: `${(i % 5) * 120}ms`,
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      <audio
        ref={audioRef}
        preload="none"
        onCanPlay={() => setStatus((s) => (s === 'loading' ? 'playing' : s))}
        onPlaying={() => setStatus('playing')}
        onWaiting={() => setStatus((s) => (s === 'playing' ? 'loading' : s))}
        onError={() => setStatus((s) => (s === 'idle' || s === 'unconfigured' ? s : 'error'))}
      />

      <div className="fixed bottom-20 md:bottom-6 left-3 md:left-6 z-40 max-w-[calc(100vw-1.5rem)] md:max-w-md">
        {!isExpanded ? (
          <div className="flex items-center gap-2.5 sm:gap-3 rounded-full bg-ink-2/95 border border-brass/40 px-3 sm:px-4 py-2 sm:py-2.5 shadow-2xl backdrop-blur-md transition-colors duration-300 hover:border-brass">
            <button
              type="button"
              onClick={togglePlay}
              className={`grid h-9 w-9 place-items-center rounded-full transition-transform active:scale-95 shrink-0 ${
                isPlaying ? 'bg-moss text-ink' : 'bg-brass text-ink hover:scale-105'
              }`}
              aria-label={isPlaying ? 'Pause live radio' : `Listen live to ${station.frequency}`}
            >
              <PlayIcon size={15} className={status === 'loading' ? 'motion-safe:animate-spin' : isPlaying ? '' : 'ml-0.5'} />
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 sm:gap-3 text-left group min-w-0"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`relative inline-flex rounded-full h-2 w-2 shrink-0 ${isPlaying ? 'bg-moss' : 'bg-sage-dim'}`} />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-brass font-semibold truncate">
                    {isPlaying ? '107.3 FM · Live' : '107.3 FM'}
                  </span>
                </div>
                <div className="font-body text-xs font-medium text-paper group-hover:text-brass transition-colors truncate max-w-[120px] sm:max-w-[200px]">
                  {nowPlaying.show}
                </div>
              </div>
              <EqBars count={5} className="flex items-end gap-0.5 h-3.5 w-6 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="text-sage-dim hover:text-paper p-1 transition-colors min-h-[44px] min-w-[32px] flex items-center justify-center"
              aria-label="Expand live radio player"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        ) : (
          <div
            className="w-[calc(100vw-1.5rem)] sm:w-96 rounded-xl border border-brass/50 bg-ink-2/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md animate-section-entrance max-h-[80vh] overflow-y-auto"
            role="region"
            aria-label="Live radio player"
          >
            <div className="flex items-start justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded bg-brass/20 text-brass">
                  <Radio size={16} />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-brass font-bold">
                    Live stream · 107.3 MHz
                  </span>
                  <h4 className="font-display text-base text-paper font-semibold">{station.name}</h4>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-sage hover:text-paper p-2 transition-colors"
                aria-label="Minimise player"
              >
                <Minimize2 size={15} />
              </button>
            </div>

            <div className="my-4 rounded-lg bg-ink p-3 border border-hairline">
              <div className="text-[11px] font-mono uppercase tracking-wider text-sage-dim">
                Scheduled now ({formatHour(nowPlaying.start)} – {formatHour(nowPlaying.end)} EAT)
              </div>
              <div className="mt-1 font-display text-lg text-paper font-medium leading-tight">{nowPlaying.show}</div>
              <div className="mt-0.5 text-xs text-brass font-mono">{nowPlaying.host}</div>
              <p className="mt-2 border-t border-hairline/60 pt-2 text-[11px] text-sage-dim font-mono">
                Programme names follow the proposed v2 schedule.
              </p>
            </div>

            <EqBars count={24} className="flex h-10 items-end gap-1 px-1.5 py-1 bg-ink/70 rounded mb-3 border border-hairline/60" />

            {(status === 'error' || status === 'unconfigured') && (
              <div className="mb-3 flex items-start gap-2 rounded border border-brick/40 bg-brick/10 p-2.5 text-[11px] text-paper/90" role="status">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-brick" />
                <span>
                  {status === 'error'
                    ? 'We could not reach the station stream. Tune in on 107.3 FM across Western Kenya.'
                    : 'Stream link pending: the station has not yet supplied its stream address. Tune in on 107.3 FM.'}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  disabled={status === 'unconfigured'}
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-95 shadow-md disabled:opacity-40 disabled:cursor-not-allowed ${
                    isPlaying ? 'bg-moss text-ink' : 'bg-brass text-ink hover:scale-105'
                  }`}
                  aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
                >
                  <PlayIcon size={18} className={status === 'loading' ? 'motion-safe:animate-spin' : isPlaying ? '' : 'ml-0.5'} />
                </button>
                <div className="text-xs font-mono font-medium text-paper" aria-live="polite">
                  {statusLine[status]}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-sage hover:text-paper transition-colors p-2"
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
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
