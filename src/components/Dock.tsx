import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { mailto } from "../content/profile";
import { projects, type Project } from "../content/projects";
import { Link } from "../lib/router";
import { ProjectGlyph } from "./Icons";
import { ease } from "./Motion";

const RANGE = 150;

/** 52px icons that magnify on desktop; smaller, static icons on phones. */
function useDockSize() {
  const query = "(min-width: 640px) and (pointer: fine)";
  const [fine, setFine] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setFine(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const small = window.innerWidth < 640;
  return fine ? { BASE: 52, PEAK: 70 } : { BASE: small ? 34 : 52, PEAK: small ? 34 : 52 };
}

function useMagnify(mouseX: MotionValue<number>, ref: React.RefObject<HTMLElement | null>) {
  const { BASE, PEAK } = useDockSize();
  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || x === Infinity) return RANGE;
    return x - (rect.left + rect.width / 2);
  });
  const size = useTransform(distance, [-RANGE, 0, RANGE], [BASE, PEAK, BASE]);
  return useSpring(size, { stiffness: 320, damping: 24, mass: 0.2 });
}

function Preview({ project }: { project: Project }) {
  return (
    <m.div
      className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-20 hidden w-[236px] -translate-x-1/2 text-ink sm:block"
      initial={{ opacity: 0, y: 10, scale: 0.94, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 6, scale: 0.96, filter: "blur(4px)" }}
      transition={{ duration: 0.28, ease }}
    >
      <div className="rounded-[16px] border border-line bg-card p-1.5 shadow-[0_18px_40px_-16px_rgb(26_25_23/0.35)]">
        <div className="aspect-[212/124] overflow-hidden rounded-[11px]" style={{ background: project.color }}>
          {project.image ? (
            <img src={project.image} alt="" className="size-full object-cover object-top" />
          ) : (
            <div className="grid size-full place-items-center text-white/90">
              <ProjectGlyph icon={project.icon} className="size-10" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2.5 px-1.5 pb-1 pt-2.5 text-left">
          <span className="grid size-[27px] shrink-0 place-items-center rounded-[28%] text-white" style={{ background: project.color }}>
            <ProjectGlyph icon={project.icon} className="size-3.5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13.5px] font-medium tracking-[-0.01em]">{project.title}</span>
            <span className="block font-mono text-[10.5px] uppercase tracking-[0.04em] text-muted">
              {project.category} · {project.year}
            </span>
          </span>
          <ArrowUpRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
        </div>
      </div>
    </m.div>
  );
}

function DockItem({
  mouseX,
  active,
  onHover,
  children,
  label,
  href,
  internal,
  color,
  className = "",
}: {
  className?: string;
  mouseX: MotionValue<number>;
  active: boolean;
  onHover: (on: boolean) => void;
  children: React.ReactNode;
  label: string;
  href: string;
  internal: boolean;
  color?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const size = useMagnify(mouseX, ref);
  const tile = "relative grid place-items-center rounded-[28%]";
  const colored = `${tile} text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_6px_14px_-6px_rgb(26_25_23/0.45)]`;
  const neutral = `${tile} border border-line bg-surface text-ink`;
  const style = { width: size, height: size, background: color };
  const events = { onMouseEnter: () => onHover(true), onMouseLeave: () => onHover(false), onFocus: () => onHover(true), onBlur: () => onHover(false) };

  return (
    <m.li className={`relative flex items-end ${className}`} style={{ width: size }}>
      {internal ? (
        <Link href={href} aria-label={label} className="block" {...events}>
          <m.span ref={ref} className={colored} style={style}>
            {children}
          </m.span>
        </Link>
      ) : (
        <a href={href} aria-label={label} className="block" {...events}>
          <m.span ref={ref} className={neutral} style={{ width: size, height: size }}>
            {children}
          </m.span>
        </a>
      )}
      {active && (
        <m.span
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -bottom-[7px] left-1/2 -ml-0.5 size-1 rounded-full bg-ink/50"
        />
      )}
    </m.li>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredProject = projects.find((p) => p.slug === hovered);

  return (
    <nav aria-label="Selected work" className="relative">
      <m.ul
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass mx-auto flex h-[52px] max-w-full items-end gap-1.5 overflow-visible rounded-[18px] border border-line px-2 pb-[8px] sm:h-[70px] sm:gap-2 sm:rounded-[22px] sm:px-2.5 sm:pb-[9px] shadow-[0_14px_40px_-18px_rgb(26_25_23/0.35)]"
      >
        {projects.map((project) => (
          <DockItem
            key={project.slug}
            mouseX={mouseX}
            active={hovered === project.slug}
            onHover={(on) => setHovered(on ? project.slug : null)}
            label={`${project.title}, ${project.category} ${project.year}`}
            href={`/work/${project.slug}`}
            internal
            color={project.color}
          >
            <ProjectGlyph icon={project.icon} />
            <AnimatePresence>{hovered === project.slug && hoveredProject && <Preview project={hoveredProject} />}</AnimatePresence>
          </DockItem>
        ))}
        <li aria-hidden="true" className="mx-1 mb-2.5 hidden h-8 w-px self-end bg-line sm:block" />
        <DockItem mouseX={mouseX} active={false} onHover={() => {}} label="Email me" href={mailto} internal={false} className="max-sm:hidden">
          <Mail className="size-[40%]" aria-hidden="true" />
        </DockItem>
      </m.ul>
    </nav>
  );
}
