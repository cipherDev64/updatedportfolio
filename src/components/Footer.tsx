import { useLayoutEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { ArrowUp, ArrowUpRight, Globe, Mail } from "lucide-react";
import { mailto, profile } from "../content/profile";
import { contact } from "../content/site";
import { BrandIcon, LinkedInIcon } from "./Icons";
import { BlurWords, ease, Reveal } from "./Motion";
import RollText from "./RollText";

const month = new Intl.DateTimeFormat("en-GB", { month: "short", year: "2-digit" }).format(new Date()).replace(" ", " ’");

/** The full name, sized to fill the card's width and rising letter by letter. */
function GiantName() {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(160);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => {
      const probe = el.querySelector<HTMLElement>("[data-probe]");
      if (!probe) return;
      setSize((100 * el.clientWidth) / probe.offsetWidth);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);
  const name = profile.name;
  return (
    <div ref={box} aria-hidden="true" className="relative -mb-[0.17em] select-none" style={{ fontSize: size }}>
      <span data-probe className="invisible absolute whitespace-nowrap font-serif tracking-[-0.045em]" style={{ fontSize: 100 }}>
        {name}
      </span>
      <m.p
        className="whitespace-nowrap font-serif leading-[0.9] tracking-[-0.045em] text-ink/[0.09]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {[...name].map((char, i) => (
          <m.span
            key={i}
            className="inline-block whitespace-pre"
            variants={{ hidden: { y: "60%", opacity: 0 }, show: { y: "0%", opacity: 1 } }}
            transition={{ duration: 0.9, delay: i * 0.035, ease }}
          >
            {char}
          </m.span>
        ))}
      </m.p>
    </div>
  );
}

const socials = [
  { label: "LinkedIn", href: profile.links.linkedin, icon: <LinkedInIcon className="size-[15px]" /> },
  { label: "GitHub", href: profile.links.github, icon: <BrandIcon name="GitHub" className="size-[15px]" /> },
  { label: "Instagram", href: profile.links.instagram, icon: <BrandIcon name="Instagram" className="size-[15px]" /> },
  { label: "Second Algorithm", href: profile.ventureUrl, icon: <Globe className="size-[15px]" /> },
];

export default function Footer() {
  return (
    <footer id="contact" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[24px] border border-line bg-surface px-5 pt-16 sm:rounded-[28px] sm:px-10 sm:pt-20">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-[13px] font-medium">
              <span aria-hidden="true" className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
                <span className="size-1.5 rounded-full bg-accent" />
              </span>
              {contact.availability} — {month}
            </p>
          </Reveal>
          <h2 className="mt-7 font-serif text-[clamp(2.4rem,6.5vw,4rem)] leading-[1.05] tracking-[-0.035em]">
            <BlurWords text={contact.lead} inView /> <BlurWords text={contact.accent} inView delay={0.14} className="text-accent" />
          </h2>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap justify-center gap-2.5">
            <a
              href={mailto}
              className="roll-trigger flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-[15px] font-medium tracking-[-0.01em] text-on-ink transition-transform hover:-translate-y-0.5"
            >
              <Mail className="size-4" aria-hidden="true" />
              <RollText text={profile.links.email} />
            </a>
            <a
              href={profile.bookCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="roll-trigger flex items-center gap-2 rounded-full border border-line bg-card px-5 py-3 text-[15px] font-medium tracking-[-0.01em] transition-transform hover:-translate-y-0.5"
            >
              <RollText text="Book a call" />
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal delay={0.25}>
            <ul className="mt-8 flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <m.a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="grid size-10 place-items-center rounded-full border border-line bg-card text-ink"
                    whileHover={{ y: -3, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 16 }}
                  >
                    {s.icon}
                  </m.a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-muted sm:flex-row sm:justify-between">
          <p>© 2026 {profile.name}</p>
          <a href={profile.ventureUrl} target="_blank" rel="noopener noreferrer" className="roll-trigger flex items-center gap-1 hover:text-ink">
            <RollText text={`Co-founder, ${profile.venture}`} />
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
          <div className="flex items-center gap-3">
            <p>
              {profile.city} · {profile.utcLabel}
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="group grid size-8 place-items-center overflow-hidden rounded-full border border-line text-ink hover:bg-card"
            >
              <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <GiantName />
        </div>
      </div>
    </footer>
  );
}
