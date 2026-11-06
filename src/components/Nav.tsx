import { useEffect, useState } from "react";
import { AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { MessageCircle, Moon, Sun } from "lucide-react";
import { mailto, profile } from "../content/profile";
import { Link } from "../lib/router";
import { ease } from "./Motion";
import RollText from "./RollText";

function useClock() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: profile.timeZone }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 10_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

type Theme = "light" | "dark";

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme as Theme) ?? "light");
  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    setTheme(next);
  };
  return { theme, toggle };
}

const Divider = () => <span aria-hidden="true" className="h-5 w-px bg-line" />;

export default function Nav() {
  const time = useClock();
  const { theme, toggle } = useTheme();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });

  return (
    <m.header
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6"
      initial={{ opacity: 0, y: -16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease, delay: 0.1 }}
    >
      <nav
        aria-label="Primary"
        className="glass flex h-[52px] items-center gap-2 rounded-full border border-line p-1.5 pr-2 shadow-[0_8px_30px_-12px_rgb(26_25_23/0.25)] sm:gap-3 sm:pr-3"
      >
        <Link href="/" aria-label={`${profile.name}, home`} className="relative grid size-10 shrink-0 place-items-center">
          <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="20" cy="20" r="18.5" fill="none" stroke="var(--line)" strokeWidth="1.5" />
            <m.circle cx="20" cy="20" r="18.5" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: progress }} />
          </svg>
          <span className="grid size-[30px] place-items-center rounded-full bg-ink font-serif text-[14px] font-medium text-on-ink">
            {profile.initial}.
          </span>
        </Link>
        <Divider />
        {[
          ["Work", "/#work"],
          ["About", "/#about"],
        ].map(([label, href]) => (
          <Link key={label} href={href} className="roll-trigger rounded-full px-2.5 py-2 text-[14px] font-medium tracking-[-0.01em] hover:bg-ink/5 sm:px-3">
            <RollText text={label} />
          </Link>
        ))}
        <span className="hidden items-center gap-3 sm:flex">
          <Divider />
          <span className="flex items-center gap-2 font-mono text-[12px] font-medium tracking-[0.06em] text-muted">
            <span aria-hidden="true" className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
              <span className="size-1.5 rounded-full bg-accent" />
            </span>
            <span>
              <span className="sr-only">Local time in Bengaluru: </span>
              {profile.cityCode} {time}
            </span>
          </span>
        </span>
        <Divider />
        <button
          type="button"
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="grid size-9 place-items-center overflow-hidden rounded-full hover:bg-ink/5"
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={theme}
              initial={{ y: 14, rotate: -90, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: -14, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
            >
              {theme === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </m.span>
          </AnimatePresence>
        </button>
        <a href={mailto} className="roll-trigger flex items-center gap-2 rounded-full px-2 py-2 text-[14px] font-medium hover:bg-ink/5 sm:px-2.5">
          <MessageCircle className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline-flex">
            <RollText text="Say hi" />
          </span>
          <span className="sr-only sm:hidden">Say hi by email</span>
        </a>
      </nav>
    </m.header>
  );
}
