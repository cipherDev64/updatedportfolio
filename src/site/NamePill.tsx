import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import avatar from "../assets/avatar.webp";
import { ease } from "../components/Motion";
import { profile } from "../content/profile";

const links = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

/** Floating name tag that appears once the hero scrolls away. */
export default function NamePill() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <m.nav
          aria-label="Sections"
          className="glass fixed left-1/2 top-4 z-50 flex items-center gap-1 rounded-full border border-white/10 py-1 pl-1 pr-1.5 shadow-[0_14px_40px_-16px_rgb(0_0_0/0.9)]"
          initial={{ opacity: 0, y: -20, x: "-50%", scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
          exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.9 }}
          transition={{ duration: 0.35, ease }}
        >
          <a href="#" onClick={(e) => (e.preventDefault(), window.scrollTo({ top: 0, behavior: "smooth" }))} className="flex items-center gap-2 rounded-full py-0.5 pl-0.5 pr-3 hover:bg-white/10">
            <img src={avatar} alt="" className="size-7 rounded-full object-cover" />
            <span className="text-[14px] font-bold tracking-[-0.02em]">{profile.name}</span>
          </a>
          <span aria-hidden="true" className="h-4 w-px bg-white/15" />
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hidden rounded-full px-3 py-1.5 text-[13px] font-medium text-ink/75 hover:bg-white/10 hover:text-ink sm:block">
              {label}
            </a>
          ))}
        </m.nav>
      )}
    </AnimatePresence>
  );
}
