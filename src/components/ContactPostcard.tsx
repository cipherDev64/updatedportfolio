import { m } from "framer-motion";
import { mailto, profile } from "../content/profile";
import { ArrowNE, paperEase, Reveal, SectionLabel } from "./Paper";

function AddressLine({ href, label, detail }: { href: string; label: string; detail: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-h-12 items-end justify-between gap-4 border-b border-ink/40 pb-2 hover:border-ink"
      >
        <span>
          <span className="block font-display text-[1.7rem] leading-none">{label}</span>
          <span className="mt-1 block font-mono text-xs text-note">{detail}</span>
        </span>
        <ArrowNE className="text-xl" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </li>
  );
}

function PostageStamp() {
  return (
    <div aria-hidden="true" className="relative w-20 shrink-0 rotate-[3deg] bg-[#faf7f0] p-1.5 shadow-[0_1px_3px_rgb(36_37_34/0.3)]">
      <div className="grid h-24 place-items-center border border-stamp/70 bg-[#f6e3dc]">
        <svg viewBox="0 0 40 40" className="w-9 text-stamp" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 30h28M10 30V16l10-8 10 8v14M17 30v-8h6v8" />
        </svg>
        <span className="font-mono text-[0.5rem] tracking-[0.1em] text-stamp">BLR · IN</span>
      </div>
    </div>
  );
}

export default function ContactPostcard() {
  const email = profile.links.email;
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative px-3 pb-16 pt-24 sm:px-8 lg:px-12 lg:pt-32 xl:pr-56">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <SectionLabel>05 / Postcard</SectionLabel>
        </Reveal>

        <m.article
          className="relative mx-auto mt-12 max-w-5xl"
          initial={{ opacity: 0, y: 40, rotate: -2.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: paperEase }}
          style={{ rotate: -0.6 }}
        >
          <div className="perforated grid bg-[#fbf9f4] pt-3 shadow-[var(--shadow-lift)] md:grid-cols-2">
            {/* Message side */}
            <div className="relative border-b border-dashed border-ink/30 px-6 pb-10 pt-10 sm:px-10 md:border-b-0 md:border-r md:pb-14">
              <h2 id="contact-heading" className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.98]">
                Have an odd problem worth making?
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
                I like conversations about ideas that aren’t finished yet: products, interfaces, AI systems, technical
                puzzles, and collaborations where the brief is still a question. Write to me.
              </p>
              <a
                href={mailto}
                className="group mt-8 inline-flex min-h-14 items-center gap-3 bg-ink px-7 text-lg font-semibold text-cream shadow-[0_4px_0_#000] hover:bg-blueink active:translate-y-[3px] active:shadow-[0_1px_0_#000]"
              >
                Send an email
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <p className="mt-3 font-mono text-sm text-note">
                <a href={mailto} className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                  {email}
                </a>
              </p>
              <p className="hand mt-10 text-3xl text-blueink">— Atulya</p>
            </div>

            {/* Address side */}
            <div className="relative px-6 pb-10 pt-6 sm:px-10 md:pt-10">
              <div className="flex items-start justify-between gap-4">
                <div aria-hidden="true" className="grid size-24 place-items-center rounded-full border-2 border-blueink/50 text-center font-mono text-[0.55rem] leading-tight tracking-[0.12em] text-blueink/80 -rotate-12">
                  BENGALURU
                  <br />
                  ———
                  <br />
                  BY HAND
                </div>
                <PostageStamp />
              </div>

              <p className="label-mono mt-8 text-note">Find me at</p>
              <ul className="mt-3 space-y-5">
                <AddressLine href={profile.links.linkedin} label="LinkedIn" detail="in/atulya-manikandan" />
                <AddressLine href={profile.links.github} label="GitHub" detail="cipherDev64 · code & public repos" />
              </ul>

              <p className="hand mt-8 rotate-[-2deg] text-2xl leading-7 text-ink/80">
                p.s. the less serious stuff lives on{" "}
                <a
                  href={profile.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stamp underline decoration-stamp/50 underline-offset-4 hover:decoration-stamp"
                >
                  Instagram, @justitsatul<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </div>
        </m.article>

        <footer className="mx-auto mt-20 flex max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6">
          <p className="label-mono text-note">© 2026 {profile.name} · {profile.location}</p>
          <p className="label-mono text-note">Set in Instrument Serif, Inter &amp; IBM Plex Mono</p>
          <a href="#desk" className="label-mono text-ink underline-offset-4 hover:underline">
            Back to the desk ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
