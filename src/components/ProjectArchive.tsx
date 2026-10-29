import { useCallback, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { archive, type ArchiveEntry } from "../content/archive";
import ArtifactFace from "./ArtifactFace";
import { paperEase, Reveal, SectionLabel, Tape } from "./Paper";
import ProjectSheet from "./ProjectSheet";

/** Where each file sits on the table at desktop widths, and how it is tilted. */
const placement: Record<string, { cell: string; rotate: number; tape?: boolean }> = {
  "studio-site": { cell: "lg:col-span-7", rotate: -0.8, tape: true },
  "studio-identity": { cell: "lg:col-span-5 lg:mt-12", rotate: 1.4 },
  "urban-premium-coworks": { cell: "lg:col-span-4", rotate: 1 },
  nailashes: { cell: "lg:col-span-4 lg:mt-10", rotate: -1.2 },
  nsalon: { cell: "lg:col-span-4", rotate: 0.8 },
  "studio-lab": { cell: "lg:col-span-8 lg:col-start-3", rotate: -0.5, tape: true },
};

function ArchiveFile({ entry, onOpen }: { entry: ArchiveEntry; onOpen: (entry: ArchiveEntry, el: HTMLButtonElement) => void }) {
  const { cell, rotate, tape } = placement[entry.id] ?? { cell: "lg:col-span-4", rotate: 0 };
  return (
    <li className={cell}>
      <m.button
        type="button"
        aria-haspopup="dialog"
        onClick={(e) => onOpen(entry, e.currentTarget)}
        className="group relative block w-full bg-[#faf7f0] p-3 text-left shadow-[var(--shadow-paper)] hover:shadow-[var(--shadow-lift)] focus-visible:shadow-[var(--shadow-lift)] sm:p-4"
        style={{ rotate }}
        whileHover={{ y: -6, rotate: rotate * 0.4 }}
        whileFocus={{ y: -6, rotate: rotate * 0.4 }}
        whileTap={{ y: -2, scale: 0.995 }}
        transition={{ duration: 0.25, ease: paperEase }}
      >
        {tape && <Tape className="-top-3 left-8 rotate-[-4deg]" />}
        <ArtifactFace kind={entry.kind} />
        <span className="mt-4 flex items-baseline justify-between gap-3 border-t border-dashed border-ink/25 pt-3">
          <span className="label-mono text-note">
            {entry.file} · {entry.discipline}
          </span>
          <span className="label-mono shrink-0 text-stamp">{entry.status}</span>
        </span>
        <span className="mt-2 block font-display text-[1.9rem] leading-tight">{entry.title}</span>
        <span className="mt-1 block text-[0.95rem] leading-relaxed text-ink/75">{entry.summary}</span>
        <span className="label-mono mt-4 inline-flex items-center gap-2 border-b border-ink pb-0.5 text-ink">
          Open file
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </m.button>
    </li>
  );
}

export default function ProjectArchive() {
  const [open, setOpen] = useState<ArchiveEntry | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((entry: ArchiveEntry, el: HTMLButtonElement) => {
    opener.current = el;
    setOpen(entry);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
    // Return focus to the file that opened the sheet.
    requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }));
  }, []);

  return (
    <section id="work" aria-labelledby="work-heading" className="relative px-4 py-24 sm:px-8 lg:px-12 lg:py-32 xl:pr-56">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-3 lg:pt-4">
            <SectionLabel>01 / Open files</SectionLabel>
            <p className="hand mt-4 hidden max-w-[12rem] text-xl leading-6 text-blueink lg:block">
              six files, all from the studio’s own record.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-9" delay={0.05}>
            <h2 id="work-heading" className="font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.01em]">
              Work in progress. <span className="italic text-blueink">Ideas with somewhere to go.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
              A working archive of the systems, experiences, experiments, and creative decisions taking shape at Second
              Algorithm.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
          {archive.map((entry) => (
            <ArchiveFile key={entry.id} entry={entry} onOpen={handleOpen} />
          ))}
        </ul>

        <p className="label-mono mt-14 max-w-xl text-note">
          Sketches above are drawings of each project, not screenshots. Client work is listed as published on
          secondalgorithm.space.
        </p>
      </div>

      <AnimatePresence>{open && <ProjectSheet key={open.id} entry={open} onClose={handleClose} />}</AnimatePresence>
    </section>
  );
}
