import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ease } from "../components/Motion";
import { projects } from "../content/projects";
import Dock from "./Dock";
import { FolderIcon } from "./MacWindow";
import { useSelection, type Filter } from "./state";
import AppsWidget from "./widgets/AppsWidget";
import ClockWidget from "./widgets/ClockWidget";
import GithubWidget from "./widgets/GithubWidget";
import MusicWidget from "./widgets/MusicWidget";
import PhotoWidget from "./widgets/PhotoWidget";
import { useMedia } from "./useMedia";

const words = ["AI agents.", "products.", "websites.", "brand systems."];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block align-baseline">
      <m.span layout transition={{ duration: 0.45, ease }} className="inline-block rounded-[10px] bg-accent/15 px-3 text-left ring-2 ring-accent/70">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={words[i]}
            aria-hidden="true"
            className="inline-block text-[#6fb6ff]"
            initial={{ opacity: 0, y: "40%", filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: "-40%", filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease }}
          >
            {words[i]}
          </m.span>
        </AnimatePresence>
      </m.span>
      <span className="sr-only">AI agents, products, websites and brand systems.</span>
    </span>
  );
}

const folders: { label: string; filter: Filter }[] = [
  { label: "Studio", filter: "Studio" },
  { label: "Products", filter: "Products" },
  { label: "Research", filter: "Research" },
  { label: "All work", filter: "All" },
];

function DesktopFolders() {
  const { showFolder } = useSelection();
  return (
    <nav aria-label="Work folders" className="flex flex-col items-center gap-2">
      {folders.map((f, i) => {
        const count = projects.filter((p) => f.filter === "All" || p.group === f.filter).length;
        return (
          <m.button
            key={f.label}
            type="button"
            onClick={() => showFolder(f.filter)}
            className="group flex w-[84px] flex-col items-center gap-1 rounded-[8px] p-1.5 hover:bg-white/10"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 + i * 0.06, ease }}
          >
            <FolderIcon className="h-11 w-14 transition-transform group-hover:-translate-y-0.5" />
            <span className="rounded-[4px] px-1 text-[12px] font-medium leading-tight text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.8)]">{f.label}</span>
            <span className="sr-only">, {count} projects</span>
          </m.button>
        );
      })}
    </nav>
  );
}

/** Dark macOS-style wallpaper: deep indigo night with violet and blue light. */
function Wallpaper() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-[#070914]">
      <div className="absolute -left-[15%] top-[25%] size-[70vmax] rounded-full bg-[radial-gradient(circle,#3b2a8f_0%,transparent_60%)] opacity-70" />
      <div className="absolute -right-[20%] -top-[30%] size-[75vmax] rounded-full bg-[radial-gradient(circle,#0b4fa8_0%,transparent_60%)] opacity-60" />
      <div className="absolute -bottom-[45%] left-[25%] size-[70vmax] rounded-full bg-[radial-gradient(circle,#a3376e_0%,transparent_60%)] opacity-40" />
      <div className="absolute inset-0 opacity-[0.22] mix-blend-overlay [background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E&quot;)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}

export default function Hero() {
  const desk = useRef<HTMLElement>(null);
  const wide = useMedia("(min-width: 1100px)");

  const headline = (
    <div className="relative z-10 text-center">
      <h1 className="text-[clamp(2.6rem,6.2vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-white">
        <m.span className="block" initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, ease }}>
          I’m Atulya.
        </m.span>
        <m.span className="block whitespace-nowrap" initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.12, ease }}>
          I build <RotatingWord />
        </m.span>
      </h1>
      <m.p
        className="mx-auto mt-6 max-w-[34rem] text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-white/75"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease }}
      >
        AI/ML engineer in Bengaluru and co-founder of Second Algorithm. I design and build models, products and websites, then wire up the
        systems that keep them running.
      </m.p>
    </div>
  );

  if (!wide) {
    return (
      <section aria-label="Intro" className="relative isolate overflow-hidden px-4 pb-14 pt-24">
        <Wallpaper />
        {headline}
        <div className="mx-auto mt-12 grid max-w-[640px] grid-cols-2 gap-3 sm:grid-cols-3">
          <PhotoWidget />
          <ClockWidget className="self-stretch" />
          <AppsWidget className="col-span-2 sm:col-span-1" />
          <GithubWidget className="col-span-2" />
          <MusicWidget className="col-span-2 sm:col-span-1" />
        </div>
      </section>
    );
  }

  return (
    <section ref={desk} aria-label="Intro" className="relative isolate h-svh min-h-[760px] overflow-hidden">
      <Wallpaper />
      <div className="absolute inset-0 grid place-items-center px-[22rem] pb-24">{headline}</div>

      <PhotoWidget bounds={desk} className="absolute left-[2.5%] top-[5%] w-[150px] -rotate-2" />
      <GithubWidget bounds={desk} className="absolute left-[calc(2.5%+165px)] top-[4%] w-[268px]" />
      <MusicWidget bounds={desk} className="absolute left-[2.5%] top-[34%] w-[290px]" />

      <AppsWidget bounds={desk} className="absolute right-[2.5%] top-[4%] w-[244px]" />
      <ClockWidget bounds={desk} className="absolute right-[calc(2.5%+258px)] top-[4%] w-[176px]" />
      <div className="absolute right-[2.5%] top-[38%]">
        <DesktopFolders />
      </div>

      <Dock />
    </section>
  );
}
