import { useEffect } from "react";
import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "../content/profile";
import { projects, type Project } from "../content/projects";
import { Link } from "../lib/router";
import { BrandIcon, ProjectGlyph } from "./Icons";
import { BlurWords, ease, Reveal } from "./Motion";
import RollText from "./RollText";
import { ProjectCover } from "./Work";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, delay, ease },
});

export default function CaseStudy({ project }: { project: Project }) {
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  useEffect(() => {
    document.title = `${project.title} — ${profile.name}`;
  }, [project]);

  return (
    <article className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-[1040px]">
        <m.div {...rise(0.05)}>
          <Link
            href="/#work"
            className="roll-trigger inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-[13px] font-medium shadow-[0_4px_12px_-8px_rgb(26_25_23/0.4)]"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            <RollText text="All work" />
          </Link>
        </m.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <m.span
              {...rise(0.12)}
              className="grid size-[52px] place-items-center rounded-[28%] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_10px_20px_-10px_rgb(26_25_23/0.5)]"
              style={{ background: project.color }}
            >
              <ProjectGlyph icon={project.icon} />
            </m.span>
            <m.p {...rise(0.18)} className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              {project.category} / {project.year}
            </m.p>
            <h1 className="mt-3 font-serif text-[clamp(2.6rem,6vw,4rem)] leading-[1.02] tracking-[-0.04em]">
              <BlurWords text={project.title} delay={0.2} />
            </h1>
          </div>
          <m.p {...rise(0.35)} className="max-w-[26rem] text-[18px] leading-relaxed tracking-[-0.01em] md:pb-2">
            {project.summary}
          </m.p>
        </div>

        <m.div
          className="mt-12 aspect-[1040/620] overflow-hidden rounded-[18px] border border-line"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease }}
        >
          <ProjectCover project={project} />
        </m.div>

        <div className="mt-20 grid gap-12 md:grid-cols-[17rem_1fr] md:gap-16">
          <Reveal>
            <p className="eyebrow">(Project details)</p>
            <dl className="mt-4 border-t border-line">
              {project.details.map((d) => (
                <div key={d.label} className="grid grid-cols-[6rem_1fr] gap-3 border-b border-line py-3.5 text-[14px]">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{d.label}</dt>
                  <dd className="font-medium">{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-col items-start gap-2">
              {project.link && (
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="roll-trigger flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[14px] font-medium text-on-ink transition-transform hover:-translate-y-0.5"
                >
                  <RollText text={project.link.label} />
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="roll-trigger flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2.5 text-[14px] font-medium transition-transform hover:-translate-y-0.5"
                >
                  <BrandIcon name="GitHub" className="size-4" />
                  <RollText text="View source" />
                </a>
              )}
            </div>
          </Reveal>

          <div className="space-y-10">
            {project.sections.map((section, i) => (
              <Reveal key={section.heading} delay={0.05}>
                <h2 className={`font-serif tracking-[-0.02em] ${i === 0 ? "text-[32px] leading-tight" : "text-[24px]"}`}>{section.heading}</h2>
                <div className="mt-3 space-y-4 text-[17px] leading-[1.6] text-ink/85">
                  {section.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-24">
          <Link href={`/work/${next.slug}`} className="roll-trigger group flex items-center gap-6 border-t border-line pt-10">
            <span className="min-w-0 flex-1">
              <span className="eyebrow block">Next project</span>
              <span className="mt-3 block font-serif text-[clamp(2.2rem,5vw,3.5rem)] leading-none tracking-[-0.04em]">
                <RollText text={next.title} />
              </span>
            </span>
            <span className="hidden aspect-[3/2] w-[200px] overflow-hidden rounded-[14px] border border-line sm:block">
              <span className="block size-full transition-transform duration-700 group-hover:scale-105">
                <ProjectCover project={next} />
              </span>
            </span>
            <ArrowRight className="size-8 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
