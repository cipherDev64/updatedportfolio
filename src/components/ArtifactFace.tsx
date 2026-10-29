import type { ArtifactKind } from "../content/archive";

/**
 * The printed face of each archive file. Decorative: every face is a sketch
 * of the subject, not a screenshot, and is hidden from assistive technology.
 */
export default function ArtifactFace({ kind }: { kind: ArtifactKind }) {
  switch (kind) {
    case "website":
      return (
        <div aria-hidden="true" className="relative border border-ink/20 bg-[#fbf9f4]">
          <div className="flex items-center gap-1.5 border-b border-ink/15 px-3 py-2">
            <span className="size-2 rounded-full border border-ink/40" />
            <span className="size-2 rounded-full border border-ink/40" />
            <span className="ml-2 font-mono text-[0.625rem] text-note">secondalgorithm.space</span>
          </div>
          <div className="grid grid-cols-5 gap-4 px-5 pb-6 pt-6">
            <div className="col-span-3">
              <p className="font-mono text-[0.5rem] tracking-[0.18em] text-note">CREATIVE TECHNOLOGY STUDIO · BENGALURU</p>
              <p className="relative mt-3 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[0.95]">
                Ideas deserve better than ordinary.
                {/* pen annotation, sized to the headline */}
                <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute -inset-x-3 -inset-y-2.5 h-[calc(100%+1.25rem)] w-[calc(100%+1.5rem)] text-stamp" fill="none">
                  <path d="M6 32C8 10 70 3 122 5c44 2 72 12 72 26 0 18-82 26-128 24C28 53 4 46 6 32z" stroke="currentColor" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
                </svg>
              </p>
              <div className="mt-4 space-y-1.5">
                <span className="block h-1.5 w-11/12 bg-ink/12" />
                <span className="block h-1.5 w-9/12 bg-ink/12" />
              </div>
              <div className="mt-4 flex gap-2">
                <span className="h-4 w-16 rounded-full bg-ink" />
                <span className="h-4 w-20 rounded-full border border-ink/40" />
              </div>
            </div>
            <div className="col-span-2 border border-ink/15 bg-paper-2/60 p-2 font-mono text-[0.5rem] leading-4 text-ink/60">
              studio_engine.ts
              <span className="mt-1 block h-1 w-3/4 bg-ink/15" />
              <span className="mt-1 block h-1 w-1/2 bg-ink/15" />
              <span className="mt-1 block h-1 w-2/3 bg-ink/15" />
            </div>
          </div>
          <span className="hand absolute -right-1 top-9 rotate-[6deg] text-base text-stamp">fluid type, no template</span>
        </div>
      );

    case "identity":
      return (
        <div aria-hidden="true" className="relative bg-[#fbf9f4] p-5">
          <p className="text-[clamp(1.6rem,2.6vw,2rem)] font-bold lowercase leading-none tracking-[-0.04em]">second algorithm</p>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-ink/15 pt-3">
            {[
              ["Aa", "font-display", "Newsreader"],
              ["Aa", "font-sans font-semibold", "Instrument Sans"],
              ["Aa", "font-mono", "Space Mono"],
            ].map(([glyph, font, name]) => (
              <div key={name}>
                <span className={`block text-3xl ${font}`}>{glyph}</span>
                <span className="mt-1 block font-mono text-[0.5rem] uppercase tracking-[0.1em] text-note">{name}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            {[
              ["#0D0F14", "bg-[#0D0F14]"],
              ["#FAF8F5", "bg-[#FAF8F5]"],
            ].map(([hex, bg]) => (
              <div key={hex} className="flex items-center gap-1.5">
                <span className={`size-6 border border-ink/25 ${bg}`} />
                <span className="font-mono text-[0.5rem] text-note">{hex}</span>
              </div>
            ))}
          </div>
          <span className="hand absolute bottom-3 right-4 rotate-[-5deg] text-base text-blueink">lowercase, always</span>
        </div>
      );

    case "brief":
      return (
        <div aria-hidden="true" className="relative bg-[#fbf9f4] p-5">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent" />
          <p className="font-mono text-[0.55rem] tracking-[0.18em] text-note">PROJECT BRIEF · WORKSPACE</p>
          <ul className="mt-3 space-y-2 font-mono text-[0.625rem] text-ink/70">
            {["Space previews", "Desk & room booking", "Automated member pass"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="grid size-3 place-items-center border border-ink/50 text-[0.5rem] leading-none">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-6 gap-1">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className={`h-3 border border-ink/25 ${[2, 3, 8].includes(i) ? "bg-graph/70" : ""}`} />
            ))}
          </div>
        </div>
      );

    case "mobile":
      return (
        <div aria-hidden="true" className="relative flex justify-center bg-[#fbf9f4] px-5 py-4">
          <div className="w-28 rounded-[1.1rem] border-2 border-ink/70 p-2">
            <span className="mx-auto block h-1 w-8 rounded-full bg-ink/40" />
            <p className="mt-2 font-display text-sm leading-tight">Book a visit</p>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {["14:00", "15:30", "17:00", "18:30"].map((t, i) => (
                <span key={t} className={`border border-ink/30 py-0.5 text-center font-mono text-[0.45rem] ${i === 1 ? "bg-ink text-cream" : ""}`}>
                  {t}
                </span>
              ))}
            </div>
            <span className="mt-2 block h-3 rounded-sm bg-ink/85" />
          </div>
          <span className="hand absolute right-4 top-6 rotate-[5deg] text-base text-stamp">mobile first</span>
        </div>
      );

    case "schedule":
      return (
        <div aria-hidden="true" className="bg-ink p-4 text-cream">
          <p className="font-mono text-[0.55rem] tracking-[0.18em] text-cream/60">CHAIRS · TODAY</p>
          <div className="mt-3 grid grid-cols-[auto_repeat(6,1fr)] gap-1 font-mono text-[0.5rem]">
            {["01", "02", "03"].map((chair, row) => (
              <div key={chair} className="contents">
                <span className="pr-1 text-cream/60">{chair}</span>
                {Array.from({ length: 6 }, (_, col) => {
                  const filled = (row + col) % 3 !== 0;
                  return <span key={col} className={`h-4 ${filled ? "bg-cream/85" : "border border-cream/30"}`} />;
                })}
              </div>
            ))}
          </div>
          <p className="mt-3 font-display text-xl leading-none">High contrast, low weight.</p>
        </div>
      );

    case "system":
      return (
        <div aria-hidden="true" className="graph-paper p-5">
          <svg viewBox="0 0 520 120" className="w-full text-blueink" fill="none" stroke="currentColor">
            {[
              [10, "brief"],
              [135, "scope"],
              [260, "tokens"],
              [385, "scaffold"],
            ].map(([x, label]) => (
              <g key={label as string}>
                <rect x={x as number} y="34" width="104" height="44" fill="#faf7f0" strokeWidth="1.4" />
                <text x={(x as number) + 52} y="61" textAnchor="middle" stroke="none" fill="currentColor" fontFamily="IBM Plex Mono, monospace" fontSize="13">
                  {label as string}
                </text>
              </g>
            ))}
            {[114, 239, 364].map((x) => (
              <path key={x} d={`M${x + 2} 56h17m-5-5 5 5-5 5`} strokeWidth="1.4" />
            ))}
            <path d="M437 80v22H62V82" strokeDasharray="4 4" strokeWidth="1.2" />
            <text x="250" y="115" textAnchor="middle" stroke="none" fill="currentColor" fontFamily="Caveat, cursive" fontSize="17">
              still on the workbench
            </text>
            <text x="10" y="20" stroke="none" fill="#77756c" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="2">
              FIG. A — INTERNAL PIPELINE (DRAFT)
            </text>
          </svg>
        </div>
      );
  }
}
