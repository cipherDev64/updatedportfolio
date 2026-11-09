import type { ReactNode, RefObject } from "react";
import { m } from "framer-motion";
import { ease } from "../../components/Motion";

/**
 * A desktop widget. On wide screens it can be picked up and moved around the
 * hero; it settles in with a short rise when the page loads.
 */
export default function Widget({
  children,
  className = "",
  bounds,
  delay = 0,
  label,
}: {
  children: ReactNode;
  className?: string;
  bounds?: RefObject<HTMLElement | null>;
  delay?: number;
  label: string;
}) {
  return (
    <m.section
      aria-label={label}
      drag={!!bounds}
      dragConstraints={bounds}
      dragElastic={0.08}
      dragMomentum={false}
      whileDrag={{ scale: 1.03, zIndex: 40, cursor: "grabbing" }}
      initial={{ opacity: 0, y: 24, scale: 0.94, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay, ease }}
      className={`glass rounded-[22px] border border-white/10 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.8)] ${bounds ? "cursor-grab" : ""} ${className}`}
    >
      {children}
    </m.section>
  );
}
