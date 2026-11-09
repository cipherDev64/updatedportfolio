import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Boxes, Building2, ChevronLeft, ChevronRight, FlaskConical, LayoutGrid, X } from "lucide-react";
import { BrandIcon } from "../components/Icons";
import { ease } from "../components/Motion";
import { projects, type Project } from "../content/projects";
import MacWindow, { FolderIcon } from "./MacWindow";
import { ProjectCover } from "./ProjectCover";
import SectionHead from "./SectionHead";
import { useSelection, type Filter } from "./state";

const sidebar: { label: string; filter: Filter; icon: typeof LayoutGrid }[] = [
  { label: "All work", filter: "All", icon: LayoutGrid },
  { label: "Studio", filter: "Studio", icon: Building2 },
  { label: "Products", filter: "Products", icon: Boxes },
  { label: "Research", filter: "Research", icon: FlaskConical },
];

export function status(p: Project) {
  if (p.kind === "Research") return { label: "In progress", dot: "bg-[#bf5af2]" };
  if (p.kind === "Concept") return { label: "Concept", dot: "bg-[#ff9f0a]" };
  return { label: "Live", dot: "bg-[#30d158]" };
}

/** Full case study, opened from the Finder preview. */
function CaseModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    close.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [onClose]);

  return (
    <m.div className="fixed inset-0 z-[100] grid place-items-center p-3 sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div aria-hidden="true" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <m.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative w-full max-w-[860px]"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.35, ease }}
      >
        <MacWindow
          title={`${project.title} — Preview`}
          right={
            <button ref={close} type="button" onClick={onClose} aria-label="Close" className="grid size-7 place-items-center rounded-full text-muted hover:bg-white/10 hover:text-ink">
              <X className="size-4" />
            </button>
          }
        >
          <div className="max-h-[78vh] overflow-y-auto overscroll-contain p-5 sm:p-8">
            <div className="aspect-[16/9] overflow-hidden rounded-[10px] border border-line" style={{ background: project.color }}>
              <ProjectCover project={project} />
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              {project.kind} · {project.year}
            </p>
            <h3 className="mt-1 text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold leading-tight tracking-[-0.04em]">{project.title}</h3>
            <p className="mt-2 text-[17px] leading-relaxed text-ink/85">{project.summary}</p>
            <div className="mt-8 space-y-7">
              {project.sections.map((s) => (
                <section key={s.heading}>
                  <h4 className="text-[21px] font-bold tracking-[-0.025em]">{s.heading}</h4>
                  <div className="mt-2 space-y-3 text-[16px] leading-[1.7] text-ink/80">
                    {s.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.link && (
                <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-[9px] bg-accent px-4 py-2 text-[14px] font-semibold text-white hover:brightness-110">
                  {project.link.label} <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-[9px] border border-line bg-raised px-4 py-2 text-[14px] font-semibold hover:bg-white/10">
                  <BrandIcon name="GitHub" className="size-4" /> Source
                </a>
              )}
            </div>
          </div>
        </MacWindow>
      </m.div>
    </m.div>
  );
}

function Preview({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const st = status(project);
  const facts = project.details;
  return (
    <m.div key={project.slug} className="flex h-full flex-col p-4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease }}>
      <div className="aspect-[16/10] overflow-hidden rounded-[8px] border border-line" style={{ background: project.color }}>
        <ProjectCover project={project} />
      </div>
      <h3 className="mt-4 text-[22px] font-extrabold leading-tight tracking-[-0.035em]">{project.title}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-[12.5px] text-muted">
        <span aria-hidden="true" className={`size-2 rounded-full ${st.dot}`} /> {st.label}
      </p>
      <p className="mt-2.5 line-clamp-4 text-[13.5px] leading-relaxed text-ink/80">{project.summary}</p>
      <dl className="mt-3 divide-y divide-line rounded-[8px] border border-line text-[12.5px]">
        {facts.map((d) => (
          <div key={d.label} className="flex justify-between gap-3 px-3 py-2">
            <dt className="text-muted">{d.label}</dt>
            <dd className="truncate text-right font-medium">{d.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-auto flex gap-2 pt-4">
        <button type="button" onClick={onOpen} className="flex-1 rounded-[8px] bg-accent py-2 text-[13.5px] font-semibold text-white hover:brightness-110">
          Open
        </button>
        {project.link && (
          <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-[8px] border border-line bg-raised px-3 py-2 text-[13.5px] font-semibold hover:bg-white/10">
            Live <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </m.div>
  );
}

export default function Work() {
  const { filter, setFilter, slug, select } = useSelection();
  const [open, setOpen] = useState<Project | null>(null);
  const closeCase = useCallback(() => setOpen(null), []);
  const shown = projects.filter((p) => filter === "All" || p.group === filter);
  const selected = projects.find((p) => p.slug === slug) ?? shown[0];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const i = shown.findIndex((p) => p.slug === selected.slug);
    const next = shown[Math.min(Math.max(i + (e.key === "ArrowDown" ? 1 : -1), 0), shown.length - 1)];
    select(next.slug);
    document.getElementById(`row-${next.slug}`)?.focus();
  };

  return (
    <section id="work" aria-labelledby="work-heading" className="relative px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <SectionHead eyebrow="Selected work" title="Stuff I’ve shipped." id="work-heading" />
        <m.div className="mt-8" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease }}>
          <MacWindow
            title={
              <span className="flex items-center justify-center gap-2">
                <FolderIcon className="h-3.5 w-4" /> Work
              </span>
            }
            right={<span className="font-mono text-[11px] text-muted">{shown.length} items</span>}
          >
            <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[190px_1fr_310px]">
              {/* Sidebar */}
              <nav aria-label="Folders" className="min-w-0 border-b border-line bg-sidebar/60 p-3 md:border-b-0 md:border-r">
                <p className="hidden px-2 pb-1.5 text-[11px] font-semibold text-muted md:block">Favourites</p>
                <ul className="flex gap-1 overflow-x-auto md:flex-col">
                  {sidebar.map((s) => {
                    const count = projects.filter((p) => s.filter === "All" || p.group === s.filter).length;
                    const active = filter === s.filter;
                    return (
                      <li key={s.label}>
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            setFilter(s.filter);
                            const first = projects.find((p) => s.filter === "All" || p.group === s.filter);
                            if (first) select(first.slug);
                          }}
                          className={`flex w-full items-center gap-2 whitespace-nowrap rounded-[7px] px-2 py-1.5 text-[13.5px] ${active ? "bg-white/10 font-semibold" : "text-ink/80 hover:bg-white/5"}`}
                        >
                          <s.icon className="size-4 text-accent" aria-hidden="true" />
                          {s.label}
                          <span className="ml-auto pl-3 font-mono text-[11px] text-muted">{count}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* List */}
              <div className="min-w-0 border-line lg:border-r">
                <div className="flex items-center gap-2 border-b border-line px-4 py-2 text-muted" aria-hidden="true">
                  <ChevronLeft className="size-4" />
                  <ChevronRight className="size-4 opacity-40" />
                </div>
                <div role="listbox" aria-label="Projects" tabIndex={-1} onKeyDown={onKey} className="p-2">
                  <div className="grid grid-cols-[1fr_auto] gap-3 px-3 pb-2 text-[11.5px] font-semibold text-muted sm:grid-cols-[1fr_120px_90px]" aria-hidden="true">
                    <span>Name</span>
                    <span className="hidden sm:block">Kind</span>
                    <span>Built</span>
                  </div>
                  {shown.map((p) => {
                    const active = p.slug === selected.slug;
                    const st = status(p);
                    return (
                      <div
                        key={p.slug}
                        id={`row-${p.slug}`}
                        role="option"
                        aria-selected={active}
                        tabIndex={active ? 0 : -1}
                        onClick={() => select(p.slug)}
                        onDoubleClick={() => setOpen(p)}
                        onKeyDown={(e) => e.key === "Enter" && setOpen(p)}
                        className={`grid cursor-default grid-cols-[1fr_auto] items-center gap-3 rounded-[7px] px-3 py-2 text-[14px] sm:grid-cols-[1fr_120px_90px] ${
                          active ? "bg-accent text-white" : "hover:bg-white/5"
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-2.5 font-semibold">
                          <FolderIcon className="h-4 w-5 shrink-0" />
                          <span className="truncate">{p.title}</span>
                        </span>
                        <span className={`hidden items-center gap-1.5 text-[13px] sm:flex ${active ? "text-white/90" : "text-ink/75"}`}>
                          <span aria-hidden="true" className={`size-1.5 rounded-full ${st.dot}`} />
                          {p.kind}
                        </span>
                        <span className={`text-[13px] tabular-nums ${active ? "text-white/90" : "text-muted"}`}>{p.year}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Preview */}
              <div className="hidden lg:block">
                <AnimatePresence mode="wait">
                  <Preview key={selected.slug} project={selected} onOpen={() => setOpen(selected)} />
                </AnimatePresence>
              </div>
            </div>
            {/* On smaller screens the preview sits under the list */}
            <div className="border-t border-line lg:hidden">
              <Preview project={selected} onOpen={() => setOpen(selected)} />
            </div>
            <div className="flex items-center justify-between border-t border-line bg-sidebar/50 px-4 py-2 text-[12px] text-muted">
              <span className="flex items-center gap-1.5">
                <FolderIcon className="h-3 w-3.5" /> atulya <span aria-hidden="true">›</span> work <span aria-hidden="true">›</span>
                <span className="font-semibold text-ink">{selected.title}</span>
              </span>
              <span className="hidden sm:inline">Double-click to open</span>
            </div>
          </MacWindow>
        </m.div>
      </div>
      <AnimatePresence>{open && <CaseModal project={open} onClose={closeCase} />}</AnimatePresence>
    </section>
  );
}
