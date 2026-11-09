import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import avatar from "../assets/avatar.webp";
import { ToolIcon } from "../components/Icons";
import { ease } from "../components/Motion";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { about, experience } from "../content/site";
import MacWindow from "./MacWindow";
import SectionHead from "./SectionHead";

/** The phrase in each "how I work" line that gets the highlighter. */
const marked: Record<string, string> = { Think: "agents", Design: "make sense the first time", Ship: "iterated on after launch" };

function Marked({ text, phrase }: { text: string; phrase?: string }) {
  const i = phrase ? text.indexOf(phrase) : -1;
  if (i < 0 || !phrase) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="highlight text-ink">{phrase}</span>
      {text.slice(i + phrase.length)}
    </>
  );
}

const orbit = ["Claude", "React", "Figma", "Next.js", "Notion", "Supabase"];

const facts: [string, string][] = [
  ["Based in", "Bengaluru, India"],
  ["Studying", "Engineering, New Horizon College of Engineering"],
  ["Focus", "AI/ML, product and interface design"],
  ["Building now", "Second Algorithm, as co-founder"],
  ["Before that", `${experience[1].org}, ${experience[1].role}`],
  ["Off the clock", "Story games, keyboards & music, the gym"],
];

const toolGroups: { label: string; tools: { name: string; note: string }[] }[] = [
  {
    label: "Every day",
    tools: [
      { name: "Claude", note: "Thinking partner and pair programmer" },
      { name: "Antigravity", note: "Where the agentic coding happens" },
      { name: "Wispr Flow", note: "Talking instead of typing" },
      { name: "Notion", note: "Notes, plans and half-ideas" },
    ],
  },
  {
    label: "Design",
    tools: [
      { name: "Figma", note: "Interfaces and brand work" },
      { name: "Edits", note: "Short videos and reels" },
    ],
  },
  {
    label: "Build",
    tools: [
      { name: "React", note: "Most of the projects here" },
      { name: "Next.js", note: "Habitual and Spark" },
      { name: "Tailwind CSS", note: "Styling, including this site" },
      { name: "Supabase", note: "Auth and data for Spark" },
      { name: "Firebase", note: "Backends for side projects" },
    ],
  },
  {
    label: "Ship",
    tools: [
      { name: "GitHub", note: "Everything lives here" },
      { name: "Vercel", note: "Where it all deploys" },
    ],
  },
];

function Orbit() {
  return (
    <div className="relative mx-auto size-[230px] shrink-0">
      <div aria-hidden="true" className="absolute inset-[18px] rounded-full border border-dashed border-white/15" />
      <m.div aria-hidden="true" className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
        {orbit.map((t, i) => {
          const angle = (i / orbit.length) * Math.PI * 2;
          const x = 115 + Math.cos(angle) * 97 - 20;
          const y = 115 + Math.sin(angle) * 97 - 20;
          return (
            <m.span
              key={t}
              className="absolute grid size-10 place-items-center rounded-[11px] border border-white/10 bg-raised text-ink shadow-lg"
              style={{ left: x, top: y }}
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <ToolIcon name={t} className="size-[18px]" />
            </m.span>
          );
        })}
      </m.div>
      <img src={avatar} alt={`Portrait of ${profile.name}`} className="absolute inset-[56px] size-[118px] rounded-full object-cover ring-4 ring-window" />
    </div>
  );
}

function ToolTile({ name, note }: { name: string; note: string }) {
  const [show, setShow] = useState(false);
  return (
    <li className="relative">
      <m.span
        tabIndex={0}
        aria-label={`${name}: ${note}`}
        onHoverStart={() => setShow(true)}
        onHoverEnd={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        whileHover={{ y: -4, rotate: -3 }}
        transition={{ type: "spring", stiffness: 420, damping: 16 }}
        className="flex items-center gap-2 rounded-[9px] border border-line bg-raised px-2.5 py-1.5 text-[13px] font-medium"
      >
        <ToolIcon name={name} className="size-4" />
        {name}
      </m.span>
      <AnimatePresence>
        {show && (
          <m.span
            role="tooltip"
            className="pointer-events-none absolute -top-9 left-0 z-10 whitespace-nowrap rounded-[7px] bg-white px-2.5 py-1 text-[12px] font-medium text-black shadow-lg"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease }}
          >
            {note}
          </m.span>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <SectionHead eyebrow="About" title="The human behind the windows." id="about-heading" />
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_300px]">
          <m.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, ease }}>
            <MacWindow title="About Atulya">
              <div className="grid items-center gap-8 p-6 sm:p-8 md:grid-cols-[230px_1fr]">
                <Orbit />
                <div>
                  <h3 className="text-[32px] font-extrabold leading-none tracking-[-0.04em]">{profile.name}</h3>
                  <p className="mt-2 text-[14px] text-muted">
                    AI/ML engineer · {projects.length} projects in the folder · co-founder at Second Algorithm
                  </p>
                  <dl className="mt-5 space-y-1.5 text-[14px]">
                    {facts.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3">
                        <dt className="text-right text-muted">{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-[8px] border border-line bg-raised px-3.5 py-2 text-[13.5px] font-semibold hover:bg-white/10">
                      LinkedIn <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                    <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-[8px] border border-line bg-raised px-3.5 py-2 text-[13.5px] font-semibold hover:bg-white/10">
                      GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-line p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-bold">What I build with</h3>
                  <p className="text-[12.5px] text-muted">Hover a tool for what it’s for</p>
                </div>
                <div className="mt-5 space-y-4">
                  {toolGroups.map((g) => (
                    <div key={g.label} className="grid gap-2 sm:grid-cols-[6.5rem_1fr] sm:items-start">
                      <p className="pt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">{g.label}</p>
                      <ul className="flex flex-wrap gap-2">
                        {g.tools.map((t) => (
                          <ToolTile key={t.name} {...t} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </MacWindow>
          </m.div>

          <aside className="space-y-10 lg:pt-6">
            <m.div
              className="relative rotate-[2deg] bg-sticky p-5 text-[#2b2410] shadow-[0_20px_40px_-18px_rgb(0_0_0/0.9)]"
              initial={{ opacity: 0, y: 30, rotate: 6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease }}
              whileHover={{ rotate: 0, y: -4 }}
            >
              <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-3deg] bg-white/50" />
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#a15c00]">Currently</p>
              <p className="mt-2 text-[16px] font-medium leading-snug">
                Building Second Algorithm with a <span className="bg-[#ffe9a6] px-0.5">Lana Del Rey playlist</span> on loop.
              </p>
            </m.div>

            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">How I work</p>
              <ol className="mt-4 space-y-5">
                {about.pillars.map((p, i) => (
                  <m.li
                    key={p.title}
                    className="grid grid-cols-[1.75rem_1fr]"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  >
                    <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-[16px] font-bold">{p.title}</span>
                      <span className="mt-0.5 block text-[14px] leading-relaxed text-ink/75">
                        <Marked text={p.body} phrase={marked[p.title]} />
                      </span>
                    </span>
                  </m.li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
