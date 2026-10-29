import { m } from "framer-motion";
import portraitJpg from "../assets/portrait.jpg";
import portraitWebp from "../assets/portrait.webp";
import { archive } from "../content/archive";
import { lastUpdated, profile } from "../content/profile";
import { paperEase, Tape } from "./Paper";

const lift = {
  rest: { y: 0 },
  hover: { y: -6 },
  press: { y: -1, scale: 0.99 },
};

/** Shared tactile behaviour for the three desk objects. */
function DeskObject({
  href,
  rotate,
  hoverRotate,
  className,
  children,
}: {
  href: string;
  rotate: number;
  hoverRotate: number;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <m.a
      href={href}
      className={`group relative block ${className}`}
      style={{ rotate }}
      initial="rest"
      animate="rest"
      whileHover={{ ...lift.hover, rotate: hoverRotate }}
      whileFocus={{ ...lift.hover, rotate: hoverRotate }}
      whileTap={lift.press}
      transition={{ duration: 0.25, ease: paperEase }}
    >
      {children}
    </m.a>
  );
}

function BinderClip() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 40" className="absolute -top-5 left-1/2 z-10 w-14 -translate-x-1/2">
      <path d="M14 6c0-4 8-5 8 0v14M42 6c0-4 8-5 8 0v14" fill="none" stroke="#5c5d58" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M6 18h52l-4 18H10z" fill="#242522" />
      <path d="M10 22h44" stroke="#4a4b46" strokeWidth="1.4" />
    </svg>
  );
}

export default function DeskScene() {
  return (
    <section id="desk" aria-labelledby="desk-heading" className="relative overflow-hidden px-4 pb-20 pt-8 sm:px-8 sm:pt-12 lg:px-12 xl:pr-56">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-x-10 lg:grid-cols-12">
        {/* Identity strip */}
        <header className="flex flex-wrap items-start justify-between gap-4 lg:col-span-12">
          <div>
            <p
              className="inline-block -rotate-1 border-2 border-ink px-3 py-2 font-mono text-[0.95rem] font-semibold tracking-[0.28em] outline outline-1 -outline-offset-[6px] outline-ink sm:text-lg"
              aria-label={profile.name}
            >
              ATULYA MANIKANDAN
            </p>
            <p className="label-mono mt-3 text-note">AI/ML · Product · Co-founder</p>
          </div>
          <p className="label-mono hidden text-right text-note sm:block">
            {profile.location}
            <br />
            Sheet 00 / The desk
          </p>
        </header>

        {/* Headline + copy */}
        <div className="mt-12 lg:col-span-7 lg:mt-12">
          <h1 id="desk-heading" className="font-display text-[clamp(2.9rem,7.4vw,6.4rem)] leading-[0.94] tracking-[-0.015em]">
            Hi, I’m Atulya. I make intelligent things people can <em className="marker italic">actually</em> use.
          </h1>
          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-ink/80 sm:text-xl">
            I’m an AI/ML-focused product builder in Bengaluru, interested in the awkward middle between a good idea and a
            shipped thing.
          </p>
        </div>

        {/* Portrait + intro note */}
        <div className="relative mt-14 flex items-start gap-4 sm:gap-8 lg:col-span-5 lg:mt-10 lg:block lg:pl-10">
          <m.figure
            className="sheet relative w-[46%] shrink-0 bg-[#fbf9f4] p-2.5 pb-9 sm:w-60 lg:ml-auto lg:w-[17.5rem] lg:p-3 lg:pb-11"
            style={{ rotate: 2.5 }}
            initial={{ opacity: 0, y: 20, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 2.5 }}
            transition={{ duration: 0.6, delay: 0.1, ease: paperEase }}
          >
            <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
            <picture>
              <source srcSet={portraitWebp} type="image/webp" />
              <img
                src={portraitJpg}
                width={640}
                height={800}
                alt="Atulya Manikandan in a rain poncho, standing on wet rock in heavy fog"
                className="aspect-[4/5] w-full object-cover grayscale-[0.15] contrast-[1.04]"
                fetchPriority="high"
              />
            </picture>
            <figcaption className="hand absolute inset-x-3 bottom-1.5 text-center text-base text-ink/70 lg:bottom-2.5 lg:text-right lg:text-lg">
              fig. 01 — me, in the fog
            </figcaption>
          </m.figure>

          <m.aside
            aria-label="About this site"
            className="ruled-paper relative mt-6 flex-1 px-4 pb-3 pt-[0.95rem] pl-11 shadow-[var(--shadow-paper)] lg:absolute lg:-bottom-16 lg:left-0 lg:mt-0 lg:w-56"
            style={{ rotate: -2 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: paperEase }}
          >
            <p className="label-mono leading-[1.6rem] text-stamp">Note to visitor</p>
            <p className="text-[0.95rem] leading-[1.6rem]">
              This is a working archive of work, experiments and ideas. It changes as the work does.
            </p>
            <p className="hand text-lg leading-[1.6rem] text-blueink">last tidied {lastUpdated}</p>
          </m.aside>
        </div>

        {/* The three objects */}
        <ul className="mt-20 grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:col-span-12 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          <li className="sm:col-span-1 lg:col-span-5">
            <DeskObject href="#work" rotate={-1.5} hoverRotate={-0.5} className="graph-paper fold-corner px-6 pb-6 pt-8 shadow-[var(--shadow-paper)] hover:shadow-[var(--shadow-lift)] focus-visible:shadow-[var(--shadow-lift)]">
              <BinderClip />
              <span className="label-mono block text-blueink">01 / Open files</span>
              <span className="mt-3 block font-display text-[2.4rem] leading-none">Explore the work</span>
              <span className="mt-4 flex items-end justify-between gap-4 text-sm text-ink/75">
                <span>
                  {archive.length} files from Second Algorithm:
                  <br />
                  sites, identity, systems.
                </span>
                <span aria-hidden="true" className="text-2xl transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
              <span aria-hidden="true" className="hand absolute -bottom-7 right-8 rotate-[-4deg] text-lg text-blueink">
                start here ↑
              </span>
            </DeskObject>
          </li>

          <li className="sm:col-span-1 lg:col-span-4 lg:-mt-6">
            <DeskObject href="#second-algorithm" rotate={1.2} hoverRotate={0.2} className="on-ink pt-6">
              {/* folder tab */}
              <span aria-hidden="true" className="label-mono absolute left-0 top-0 z-10 h-7 rounded-t-md bg-ink px-4 pt-2 text-[0.625rem] text-cream/70">
                Second Algorithm
              </span>
              <span className="relative block rounded-b-md rounded-tr-md bg-ink px-6 pb-6 pt-7 text-cream shadow-[var(--shadow-paper)] transition-shadow group-hover:shadow-[var(--shadow-lift)]">
                {/* paper peeking out */}
                <span aria-hidden="true" className="absolute -top-2 right-5 h-4 w-1/2 rounded-t-sm bg-paper-2 transition-transform duration-300 group-hover:-translate-y-1.5" />
                <span aria-hidden="true" className="absolute -top-1 right-9 h-3 w-1/3 rounded-t-sm bg-paper transition-transform duration-300 group-hover:-translate-y-2.5" />
                <span className="label-mono block text-cream/60">02 / Founding dossier</span>
                <span className="mt-3 block font-display text-[2.4rem] leading-none">Enter Second Algorithm</span>
                <span className="mt-5 flex items-center justify-between">
                  <span className="label-mono border border-stamp px-2 py-1 text-[#e07d6f]">Active</span>
                  <span aria-hidden="true" className="text-2xl transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </span>
            </DeskObject>
          </li>

          <li className="sm:col-span-2 sm:mx-auto sm:w-72 lg:col-span-3 lg:mx-0 lg:mt-4 lg:w-auto">
            <DeskObject href="#now" rotate={-3} hoverRotate={-1} className="bg-marker p-5 shadow-[var(--shadow-paper)] hover:shadow-[var(--shadow-lift)] focus-visible:shadow-[var(--shadow-lift)]">
              <Tape className="-top-3 left-6 w-16 rotate-[-8deg]" />
              <span className="label-mono block text-ink/70">03 / Now</span>
              <span className="hand mt-2 block text-[2.1rem] leading-[1.05]">What’s on the desk →</span>
              <span className="mt-3 block text-sm text-ink/75">Current questions, experiments and half-ideas.</span>
            </DeskObject>
          </li>
        </ul>
      </div>

    </section>
  );
}
