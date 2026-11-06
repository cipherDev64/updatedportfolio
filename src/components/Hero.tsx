import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { MapPin } from "lucide-react";
import avatar from "../assets/avatar.webp";
import { profile } from "../content/profile";
import { hero } from "../content/site";
import Dock from "./Dock";
import { BlurWords, ease } from "./Motion";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, delay, ease },
});

function Avatar() {
  const [hi, setHi] = useState(false);
  return (
    <m.div
      className="relative"
      initial={{ opacity: 0, scale: 0.86, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease }}
      onHoverStart={() => setHi(true)}
      onHoverEnd={() => setHi(false)}
    >
      <AnimatePresence>
        {hi && (
          <m.span
            className="absolute -right-6 -top-3 z-10 rounded-full rounded-bl-[4px] border border-line bg-card px-3 py-1.5 text-[13px] font-medium shadow-[0_8px_20px_-10px_rgb(26_25_23/0.35)]"
            initial={{ opacity: 0, scale: 0.6, rotate: -8, x: -8, y: 8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, x: -6, y: 6 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
          >
            Hi there! <span aria-hidden="true">👋</span>
          </m.span>
        )}
      </AnimatePresence>
      <m.div
        className="size-[132px] overflow-hidden rounded-full bg-surface shadow-[0_0_0_4px_var(--card),0_0_0_5px_var(--line),0_24px_50px_-18px_rgb(26_25_23/0.45)] sm:size-[171px]"
        whileHover={{ scale: 1.04, rotate: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img src={avatar} alt={`Portrait of ${profile.name}`} width={171} height={171} className="size-full object-cover" fetchPriority="high" />
      </m.div>
    </m.div>
  );
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="p-3 sm:p-5">
      <div className="relative flex min-h-[calc(100svh-24px)] flex-col items-center justify-center overflow-hidden rounded-[24px] border border-line px-4 pb-10 pt-28 sm:min-h-[calc(100svh-40px)] sm:rounded-[28px] sm:pb-14">
        {/* dotted field + warm glow */}
        <div aria-hidden="true" className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_30%,transparent_80%)]" />
        <div aria-hidden="true" className="absolute left-1/2 top-[30%] size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)]" />

        <div className="relative flex flex-col items-center text-center">
          <Avatar />

          <m.p
            {...rise(0.25)}
            className="glass mt-9 flex items-center gap-2.5 rounded-full border border-line py-1.5 pl-2 pr-3.5 text-[14px] shadow-[0_6px_18px_-12px_rgb(26_25_23/0.35)]"
          >
            <span aria-hidden="true" className="grid size-5 place-items-center rounded-full bg-accent/15">
              <span className="size-2 rounded-full bg-accent" />
            </span>
            <span className="font-medium tracking-[-0.01em]">{profile.name}</span>
            <span aria-hidden="true" className="h-3.5 w-px bg-line" />
            <span className="flex items-center gap-1.5 text-muted">
              <MapPin className="size-3.5" aria-hidden="true" />
              {profile.city}
            </span>
          </m.p>

          <h1 id="hero-heading" className="mt-7 font-serif text-[clamp(2.6rem,7vw,4rem)] leading-[1.06] tracking-[-0.035em]">
            <BlurWords text={hero.lead} delay={0.35} />
            <br />
            <BlurWords text={hero.rest} delay={0.35 + hero.lead.split(" ").length * 0.07} />{" "}
            <BlurWords text={hero.accent} delay={0.35 + (hero.lead + " " + hero.rest).split(" ").length * 0.07} className="text-accent" />
          </h1>

          <m.p {...rise(0.85)} className="mt-6 max-w-[34rem] text-[15px] leading-relaxed tracking-[-0.01em] text-muted">
            {hero.tags.join("  ·  ")}
          </m.p>

          <m.div {...rise(1)} className="mt-12 flex flex-col items-center gap-4">
            <p className="eyebrow">Selected work</p>
            <Dock />
          </m.div>
        </div>
      </div>
    </section>
  );
}
