export default function NavDots({ sections, activeSection }: { sections: string[], activeSection: string }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {sections.map((sectionId) => (
        <a
          key={sectionId}
          href={`#${sectionId}`}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            activeSection === sectionId 
              ? 'bg-signal-amber scale-150 shadow-[0_0_8px_rgba(245,166,35,0.6)]' 
              : 'bg-static-grey/40 hover:bg-maize-cream'
          }`}
          aria-label={`Scroll to ${sectionId}`}
        />
      ))}
    </div>
  );
}
