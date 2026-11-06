import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Brain, PenTool, Rocket } from "lucide-react";
import { about, toolbox } from "../content/site";
import { ToolIcon } from "./Icons";
import { BlurWords, ease, Reveal } from "./Motion";

const pillarIcons = { brain: Brain, pen: PenTool, rocket: Rocket } as const;

function Tool({ name }: { name: (typeof toolbox)[number] }) {
  const [show, setShow] = useState(false);
  return (
    <li className="relative">
      <m.span
        tabIndex={0}
        aria-label={name}
        onHoverStart={() => setShow(true)}
        onHoverEnd={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        whileHover={{ y: -4, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="grid size-10 place-items-center rounded-[11px] border border-line bg-surface text-ink sm:size-11"
      >
        <ToolIcon name={name} />
      </m.span>
      <AnimatePresence>
        {show && (
          <m.span
            role="tooltip"
            className="pointer-events-none absolute -top-9 left-1/2 z-10 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 font-mono text-[10.5px] tracking-[0.04em] text-on-ink"
            initial={{ opacity: 0, y: 4, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 4, x: "-50%", scale: 0.9 }}
            transition={{ duration: 0.18, ease }}
          >
            {name}
          </m.span>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[1040px]">
        <Reveal>
          <p className="eyebrow text-center">(02) — About</p>
        </Reveal>
        <h2 id="about-heading" className="mx-auto mt-6 max-w-[42rem] text-center font-serif text-[clamp(1.9rem,4.2vw,2.75rem)] leading-[1.14] tracking-[-0.03em]">
          <BlurWords text={about.statement} inView />{" "}
          <BlurWords text={about.muted} inView delay={about.statement.split(" ").length * 0.05} className="text-muted" />
        </h2>

        <Reveal delay={0.1} className="mt-16">
          <ul className="grid gap-1.5 rounded-[26px] border border-line bg-surface p-1.5 sm:grid-cols-3">
            {about.pillars.map((pillar, i) => {
              const Icon = pillarIcons[pillar.icon];
              return (
                <m.li
                  key={pillar.title}
                  className="flex flex-col items-center rounded-[20px] bg-bg px-6 pb-9 pt-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
                  whileHover={{ y: -4 }}
                >
                  <span
                    className={`grid size-9 place-items-center rounded-full ${"accent" in pillar && pillar.accent ? "bg-accent text-white" : "bg-ink text-on-ink"}`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-[26px] tracking-[-0.02em]">{pillar.title}</h3>
                  <p className="mt-2 max-w-[15rem] text-[16px] leading-relaxed text-muted">{pillar.body}</p>
                </m.li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-20 border-t border-line pt-12">
          <Reveal>
            <p className="eyebrow text-center">Daily toolbox</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mx-auto mt-7 flex max-w-[44rem] flex-wrap justify-center gap-2.5">
              {toolbox.map((tool) => (
                <Tool key={tool} name={tool} />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
