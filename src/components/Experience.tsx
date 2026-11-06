import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "../content/profile";
import { experience } from "../content/site";
import { ease, SectionHead } from "./Motion";
import RollText from "./RollText";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-[1240px] border-t border-line pt-24 sm:pt-28">
        <div id="experience-heading">
          <SectionHead index="04" label="Experience" title="Still early." muted="Already shipping." />
        </div>

        <ul className="mx-auto mt-14 max-w-[698px] space-y-1.5 rounded-[26px] border border-line bg-surface p-1.5">
          {experience.map((item, i) => {
            const body = (
              <>
                <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-ink font-serif text-[17px] tracking-[-0.02em] text-on-ink">
                  {item.mark}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-[20px] leading-tight tracking-[-0.02em] sm:text-[22px]">{item.org}</span>
                    {item.now && (
                      <span className="flex items-center gap-1 rounded-full bg-accent/12 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-accent">
                        <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
                        Now
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-[15px] text-muted">
                    {item.role}
                    <span className="sm:hidden"> · {item.period}</span>
                  </span>
                </span>
                <span className="shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-muted max-sm:hidden">
                  {item.period}
                </span>
              </>
            );
            const rowClass = "flex items-center gap-4 rounded-[20px] bg-bg p-4 sm:p-5";
            return (
              <m.li
                key={item.org}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                whileHover={{ scale: 1.012 }}
              >
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                    {body}
                  </a>
                ) : (
                  <div className={rowClass}>{body}</div>
                )}
              </m.li>
            );
          })}
        </ul>

        <div className="mt-8 flex justify-center">
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="roll-trigger flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-[15px] font-medium tracking-[-0.01em] shadow-[0_6px_18px_-12px_rgb(26_25_23/0.4)] transition-transform hover:-translate-y-0.5"
          >
            <RollText text="Full résumé on LinkedIn" />
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
