import type { ReactNode } from "react";
import { m } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Scroll-in reveal: fades and un-blurs while rising slightly. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </m.div>
  );
}

/** Word-by-word blur-in, used for headlines. */
export function BlurWords({
  text,
  className = "",
  delay = 0,
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  inView?: boolean;
}) {
  const words = text.split(" ");
  const animate = { opacity: 1, y: 0, filter: "blur(0px)" };
  return (
    <span className={className}>
      {words.map((word, i) => (
        <m.span
          key={i}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
          {...(inView ? { whileInView: animate, viewport: { once: true, amount: 0.6 } } : { animate })}
          transition={{ duration: 0.7, delay: delay + i * 0.07, ease }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </m.span>
      ))}
    </span>
  );
}

export function SectionHead({ index, label, title, muted }: { index: string; label: string; title: string; muted?: string }) {
  return (
    <div className="text-center">
      <Reveal>
        <p className="eyebrow">
          ({index}) — {label}
        </p>
      </Reveal>
      <h2 className="mt-5 font-serif text-[clamp(2.1rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.03em]">
        <BlurWords text={title} inView />
        {muted && (
          <>
            {" "}
            <BlurWords text={muted} inView delay={title.split(" ").length * 0.07} className="text-muted" />
          </>
        )}
      </h2>
    </div>
  );
}
