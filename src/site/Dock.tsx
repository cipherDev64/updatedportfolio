import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, m, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import avatar from "../assets/avatar.webp";
import { ease } from "../components/Motion";
import { profile } from "../content/profile";
import { FolderIcon } from "./MacWindow";
import { apps } from "./widgets/AppsWidget";

type Item = { label: string; href: string; tile: ReactNode };

function CalendarTile() {
  const now = new Date();
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { ...o, timeZone: profile.timeZone }).format(now);
  return (
    <span className="flex size-full flex-col overflow-hidden rounded-[23%] bg-white text-black shadow-[0_6px_14px_-6px_rgb(0_0_0/0.7)]">
      <span className="bg-[#ff3b30] py-[3%] text-center text-[0.55em] font-bold uppercase leading-none text-white">{fmt({ weekday: "short" })}</span>
      <span className="grid flex-1 place-items-center text-[1.35em] font-semibold leading-none">{fmt({ day: "numeric" })}</span>
    </span>
  );
}

const pick = (label: string) => apps.find((a) => a.label === label)!;
const appTile = (label: string) => {
  const a = pick(label);
  return <span className={`grid size-full place-items-center rounded-[23%] shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_6px_14px_-6px_rgb(0_0_0/0.7)] ${a.tile}`}>{a.icon}</span>;
};

const items: Item[] = [
  { label: "About me", href: "#about", tile: <img src={avatar} alt="" className="size-full rounded-[23%] object-cover" /> },
  {
    label: "Work",
    href: "#work",
    tile: (
      <span className="grid size-full place-items-center rounded-[23%] bg-[linear-gradient(180deg,#e9eef5,#c9d3df)]">
        <FolderIcon className="h-[55%] w-[66%]" />
      </span>
    ),
  },
  { label: "Mail", href: "#contact", tile: appTile("Mail") },
  { label: "Book a call", href: profile.bookCallUrl, tile: <CalendarTile /> },
  { label: "Second Algorithm", href: profile.ventureUrl, tile: appTile("Second Algorithm") },
  { label: "GitHub", href: profile.links.github, tile: appTile("GitHub") },
  { label: "LinkedIn", href: profile.links.linkedin, tile: appTile("LinkedIn") },
  { label: "Instagram", href: profile.links.instagram, tile: appTile("Instagram") },
];

function DockItem({ item, mouseX }: { item: Item; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLLIElement>(null);
  const [tip, setTip] = useState(false);
  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r && x !== Infinity ? x - (r.left + r.width / 2) : 150;
  });
  const size = useSpring(useTransform(distance, [-150, 0, 150], [48, 70, 48]), { stiffness: 340, damping: 24, mass: 0.2 });
  const fontSize = useTransform(size, (s) => s * 0.36);
  const external = item.href.startsWith("http");

  return (
    <m.li ref={ref} className="relative flex items-end" style={{ width: size }} onHoverStart={() => setTip(true)} onHoverEnd={() => setTip(false)}>
      <AnimatePresence>
        {tip && (
          <m.span
            role="tooltip"
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[7px] border border-white/10 bg-raised/95 px-2.5 py-1 text-[12px] font-medium shadow-lg"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease }}
          >
            {item.label}
          </m.span>
        )}
      </AnimatePresence>
      <m.a
        href={item.href}
        aria-label={item.label}
        onFocus={() => setTip(true)}
        onBlur={() => setTip(false)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        style={{ width: size, height: size, fontSize }}
        className="block active:brightness-75"
      >
        {item.tile}
      </m.a>
    </m.li>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  return (
    <m.nav
      aria-label="Dock"
      className="absolute inset-x-0 bottom-4 z-30 flex justify-center"
      initial={{ y: 110 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease }}
    >
      <ul
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass flex h-[66px] items-end gap-2 rounded-[20px] border border-white/10 px-2.5 pb-[9px] shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)]"
      >
        {items.map((item) => (
          <DockItem key={item.label} item={item} mouseX={mouseX} />
        ))}
      </ul>
    </m.nav>
  );
}
