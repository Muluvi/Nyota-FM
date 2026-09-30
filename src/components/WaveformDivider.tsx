export default function WaveformDivider() {
  const bars = Array.from({ length: 15 }).map((_, i) => (
    <div 
      key={i} 
      className="w-1.5 bg-signal-amber/30 wave-bar rounded-full"
      style={{ 
        height: `${Math.max(20, Math.random() * 60)}px`,
        animationDelay: `${Math.random() * 1.5}s`
      }}
    />
  ));

  return (
    <div className="flex items-center justify-center gap-1.5 h-20 overflow-hidden my-8" aria-hidden="true">
      {bars}
    </div>
  );
}
