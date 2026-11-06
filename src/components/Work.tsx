import { useRef, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, workYears, type Project } from "../content/projects";
import { Link } from "../lib/router";
import { ProjectGlyph } from "./Icons";
import { ease, SectionHead } from "./Motion";
import RollText from "./RollText";

export function ProjectCover({ project, className = "" }: { project: Project; className?: string }) {
  if (project.image) {
    return <img src={project.image} alt={`${project.title} website`} loading="lazy" className={`size-full object-cover object-top ${className}`} />;
  }
  return (
    <div className={`relative grid size-full place-items-center overflow-hidden text-white ${className}`} style={{ background: project.color }}>
      <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,#fff_1.2px,transparent_0)] [background-size:22px_22px]" />
      <svg aria-hidden="true" viewBox="0 0 400 240" className="absolute inset-x-[10%] top-1/2 w-[80%] -translate-y-1/2 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="70" cy="120" r="26" />
        <circle cx="210" cy="60" r="20" />
        <circle cx="210" cy="180" r="20" strokeDasharray="5 5" />
        <circle cx="330" cy="120" r="30" />
        <path d="M95 110l92-42M95 130l92 42M230 66l74 42M230 174l74-42" />
      </svg>
      <span className="absolute bottom-5 left-6 font-mono text-[11px] uppercase tracking-[0.12em] text-white/80">memory as evidence</span>
    </div>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.4 });

  const move = (event: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || event.pointerType !== "mouse") return;
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };
  const leave = () => {
    setHover(false);
    x.set(0);
    y.set(0);
  };

  return (
    <m.li
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="roll-trigger group block"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={leave}
        onPointerMove={move}
        onFocus={() => setHover(true)}
        onBlur={leave}
      >
        <div ref={ref} className="relative aspect-[510/378] overflow-hidden rounded-[18px] bg-surface" style={{ background: project.color }}>
          <div className="size-full transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]">
            <ProjectCover project={project} />
          </div>
          {/* Badge that follows the cursor and opens into "View case" */}
          <m.span
            aria-hidden="true"
            className="glass absolute left-1/2 top-1/2 flex h-11 items-center overflow-hidden rounded-full border border-white/25 text-white shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)]"
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", background: "rgb(26 25 23 / 0.38)" }}
            animate={{ width: hover ? 136 : 44 }}
            transition={{ duration: 0.45, ease }}
          >
            <span className="grid size-11 shrink-0 place-items-center">
              <ProjectGlyph icon={project.icon} className="size-[18px]" />
            </span>
            <m.span
              className="flex items-center gap-1 whitespace-nowrap pr-4 text-[14px] font-medium"
              animate={{ opacity: hover ? 1 : 0, x: hover ? 0 : -6 }}
              transition={{ duration: 0.3, delay: hover ? 0.12 : 0, ease }}
            >
              View case <ArrowUpRight className="size-3.5" />
            </m.span>
          </m.span>
        </div>
        <div className="mt-5 text-center">
          <h3 className="font-serif text-[24px] tracking-[-0.02em]">
            <RollText text={project.title} />
          </h3>
          <p className="mt-1.5 flex items-center justify-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">
            {project.category}
            <span
              aria-hidden="true"
              className="inline-block h-1 w-1 rounded-full bg-current transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:h-px group-hover:w-6"
            />
            {project.year}
          </p>
        </div>
      </Link>
    </m.li>
  );
}

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-[1240px] border-t border-line pt-24 sm:pt-28">
        <div id="work-heading">
          <SectionHead index="03" label="Selected work" title="Selected" muted="work" />
        </div>
        <p className="eyebrow mt-4 text-center">{workYears}</p>
        <ul className="mx-auto mt-14 grid max-w-[1040px] gap-x-5 gap-y-12 sm:grid-cols-2">
          {projects.map((project, i) => (
            <WorkCard key={project.slug} project={project} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
