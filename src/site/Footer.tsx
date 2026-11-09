import { useRef } from "react";
import { m, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { profile } from "../content/profile";

/** A letter that lifts and tilts as the cursor passes over it. */
function Letter({ char, mouseX, mouseY }: { char: string; mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null);
  const near = useTransform([mouseX, mouseY], ([x, y]: number[]) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r || x === Infinity) return 0;
    const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
    return Math.max(0, 1 - d / 220);
  });
  const lift = useSpring(useTransform(near, (n) => -n * 36), { stiffness: 260, damping: 18 });
  const tilt = useSpring(useTransform(near, (n) => n * (char.charCodeAt(0) % 2 ? 9 : -9)), { stiffness: 260, damping: 18 });
  const glow = useTransform(near, (n) => `rgb(${Math.round(70 + n * 40)} ${Math.round(150 + n * 40)} 255 / ${0.35 + n * 0.65})`);
  return (
    <m.span ref={ref} className="inline-block whitespace-pre" style={{ y: lift, rotate: tilt, color: glow }}>
      {char}
    </m.span>
  );
}

export default function Footer() {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);
  return (
    <footer className="relative overflow-hidden px-4 pb-10 pt-10 sm:px-8">
      <div
        className="mx-auto max-w-[1240px] select-none py-10 text-center"
        onPointerMove={(e) => {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        }}
        onPointerLeave={() => {
          mouseX.set(Infinity);
          mouseY.set(Infinity);
        }}
      >
        <p aria-hidden="true" className="text-[clamp(4rem,17vw,15rem)] font-extrabold leading-[0.9] tracking-[-0.06em]">
          {[..."atulya"].map((c, i) => (
            <Letter key={i} char={c} mouseX={mouseX} mouseY={mouseY} />
          ))}
        </p>
        <p className="mt-4 text-[13px] text-muted">Move your cursor across the letters.</p>
      </div>
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[13px] text-muted sm:flex-row">
        <div className="flex flex-wrap items-center gap-4">
          <span>© 2026 {profile.name}</span>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
          <a href={profile.links.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">Instagram</a>
        </div>
        <p>Made by Atulya, using coffee and a lot of prompting.</p>
      </div>
    </footer>
  );
}
