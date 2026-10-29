import type { ReactNode } from "react";
import { m } from "framer-motion";
import { pinboard } from "../content/site";
import { paperEase, Pin, Reveal, SectionLabel, Tape } from "./Paper";

type NoteId = (typeof pinboard.notes)[number]["id"];

/** Paper stock, fixing and placement for each note. Deliberate, not random. */
const notes: Record<NoteId, { paper: string; rotate: number; cell: string; fix: ReactNode; sketch?: ReactNode }> = {
  venture: {
    paper: "bg-[#faf7f0] border-t-4 border-stamp",
    rotate: -1.6,
    cell: "lg:col-span-4",
    fix: <Pin className="-top-1.5 left-1/2 -translate-x-1/2" />,
  },
  memory: {
    paper: "graph-paper",
    rotate: 1.4,
    cell: "lg:col-span-4 lg:mt-10",
    fix: <Tape className="-top-3 left-1/2 w-20 -translate-x-1/2 rotate-[3deg]" />,
    sketch: (
      <svg aria-hidden="true" viewBox="0 0 220 70" className="mt-4 w-full text-blueink" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="24" cy="35" r="9" />
        <circle cx="96" cy="16" r="7" />
        <circle cx="100" cy="56" r="7" strokeDasharray="3 3" />
        <circle cx="180" cy="34" r="11" />
        <path d="M33 32 89 18M33 38l60 16M103 18l66 12M107 54l62-14" />
        <path d="M94 50l12 12m0-12-12 12" className="text-stamp" stroke="#b74436" />
        <text x="148" y="66" fill="currentColor" stroke="none" fontFamily="Caveat, cursive" fontSize="14">
          forget?
        </text>
      </svg>
    ),
  },
  ideas: {
    paper: "bg-marker",
    rotate: -2.8,
    cell: "lg:col-span-3 lg:col-start-10 lg:-mt-4",
    fix: <Tape className="-top-3 left-5 w-14 rotate-[-10deg]" />,
  },
  interface: {
    paper: "bg-[#faf7f0]",
    rotate: 2,
    cell: "lg:col-span-4 lg:col-start-2",
    fix: <Pin color="blueink" className="-top-1.5 left-8" />,
    sketch: (
      <svg aria-hidden="true" viewBox="0 0 200 64" className="mt-4 w-full text-ink/55" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="2" width="90" height="60" />
        <path d="M2 14h90M10 24h40M10 32h60M10 40h30" />
        <rect x="56" y="48" width="28" height="9" fill="#242522" stroke="none" />
        <rect x="108" y="2" width="90" height="60" />
        <path d="M108 14h90M118 30h70M118 38h70M118 46h70" />
        <text x="122" y="11" fill="currentColor" stroke="none" fontFamily="Caveat, cursive" fontSize="11">
          which is clearer?
        </text>
      </svg>
    ),
  },
  public: {
    paper: "ruled-paper pl-11",
    rotate: -1,
    cell: "lg:col-span-4 lg:mt-8",
    fix: <Pin color="marker" className="-top-1.5 right-8" />,
  },
};

export default function Pinboard() {
  return (
    <section id="now" aria-labelledby="now-heading" className="relative px-4 py-24 sm:px-8 lg:px-12 lg:py-32 xl:pr-56">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionLabel>03 / Currently on the desk</SectionLabel>
          </div>
          <h2 id="now-heading" className="font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] lg:col-span-8">
            What has my attention <span className="italic">right now.</span>
          </h2>
        </Reveal>

        <div className="dot-board relative mt-14 border border-ink/15 px-5 py-14 shadow-[inset_0_2px_10px_rgb(36_37_34/0.08)] sm:px-10 lg:px-14 lg:py-16">
          <span className="label-mono absolute left-5 top-4 text-note sm:left-10">Ongoing · not finished</span>
          <ul className="grid grid-cols-1 items-start gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
            {pinboard.notes.map((note) => {
              const style = notes[note.id];
              return (
                <m.li
                  key={note.id}
                  className={`relative p-5 shadow-[var(--shadow-paper)] ${style.paper} ${style.cell}`}
                  style={{ rotate: style.rotate }}
                  whileHover={{ rotate: style.rotate * 0.4, y: -3 }}
                  transition={{ duration: 0.25, ease: paperEase }}
                >
                  {style.fix}
                  <h3 className={note.id === "ideas" ? "hand text-[2.1rem] leading-[1.05]" : "font-display text-[1.65rem] leading-tight"}>
                    {note.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">{note.body}</p>
                  {style.sketch}
                </m.li>
              );
            })}

            {/* The personal note, given the most room */}
            <li className="relative sm:col-span-2 lg:col-span-7 lg:col-start-6 lg:-mt-6">
              <m.blockquote
                className="relative bg-[#fbf9f4] px-6 pb-7 pt-9 shadow-[var(--shadow-lift)] sm:px-10"
                style={{ rotate: 0.6 }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: paperEase }}
              >
                <Tape className="-top-3 left-10 rotate-[-3deg]" />
                <Tape className="-top-3 right-10 rotate-[4deg]" />
                <p className="hand text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12] text-ink">“{pinboard.personalNote}”</p>
                <footer className="label-mono mt-5 text-note">— A.M., a note to self</footer>
              </m.blockquote>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
