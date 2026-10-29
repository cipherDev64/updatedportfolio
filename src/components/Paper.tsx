import type { CSSProperties, ReactNode } from "react";
import { m } from "framer-motion";

/** Easing shared by every paper movement: quick to start, soft to land. */
export const paperEase = [0.22, 0.8, 0.3, 1] as const;

export function Tape({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return <span aria-hidden="true" className={`tape ${className}`} style={style} />;
}

export function Pin({ color = "stamp", className = "" }: { color?: "stamp" | "blueink" | "marker"; className?: string }) {
  const fill = { stamp: "bg-stamp", blueink: "bg-blueink", marker: "bg-marker" }[color];
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 block size-3.5 rounded-full ${fill} shadow-[inset_-2px_-2px_0_rgb(0_0_0/0.22),0_3px_4px_-1px_rgb(36_37_34/0.45)] ${className}`}
    />
  );
}

/** Small mono label, e.g. "01 / OPEN FILES". */
export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`label-mono flex items-center gap-3 text-note ${className}`}>
      <span aria-hidden="true" className="inline-block h-px w-6 bg-current" />
      {children}
    </p>
  );
}

/** A hand-drawn pencil line. */
export function PencilRule({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 8" preserveAspectRatio="none" className={`block h-2 w-full ${className}`}>
      <path
        d="M1 5.2C48 3.6 96 4.8 142 4.1s91-1.9 136-.6c40 1.1 80 .3 121-.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity=".55"
      />
    </svg>
  );
}

/** Printer's crop marks in each corner of a positioned parent. */
export function CropMarks({ className = "text-ink/35" }: { className?: string }) {
  const corner = "absolute size-3 border-current";
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-2 ${className}`}>
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}

/**
 * A rubber stamp. Lands with a small press when it scrolls into view;
 * with reduced motion it simply appears.
 */
export function Stamp({
  children,
  className = "",
  rotate = -8,
  tone = "stamp",
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
  tone?: "stamp" | "stampOnInk" | "blueink";
}) {
  const color = { stamp: "text-stamp", stampOnInk: "text-[#e07d6f]", blueink: "text-blueink" }[tone];
  return (
    <m.span
      className={`label-mono inline-flex items-center gap-2 border-2 border-current px-3 py-2 font-semibold tracking-[0.16em] outline outline-1 -outline-offset-[6px] outline-current ${color} ${className}`}
      style={{ rotate }}
      initial={{ opacity: 0, scale: 1.25 }}
      whileInView={{ opacity: 0.88, scale: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.28, ease: paperEase }}
    >
      {children}
    </m.span>
  );
}

/** Short editorial entrance for headings and blocks. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: paperEase }}
    >
      {children}
    </m.div>
  );
}

export function ArrowNE({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${className}`}>
      ↗
    </span>
  );
}
