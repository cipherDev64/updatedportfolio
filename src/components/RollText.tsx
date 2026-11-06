/**
 * Rolling-letter text. The parent must carry the `roll-trigger` class;
 * on hover each character slides up to reveal its copy, one after another.
 */
export default function RollText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`roll ${className}`} aria-label={text} role="text">
      {[...text].map((char, i) => (
        <span key={i} aria-hidden="true" style={{ "--i": i } as React.CSSProperties}>
          <span>{char}</span>
          <span>{char}</span>
        </span>
      ))}
    </span>
  );
}
