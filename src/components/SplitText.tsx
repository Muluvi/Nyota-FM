export default function SplitText({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="split-word mr-[0.25em]">
          <span style={{ animationDelay: `${delayOffset + i * 100}ms` }}>
            {word}
          </span>
        </span>
      ))}
    </>
  );
}
