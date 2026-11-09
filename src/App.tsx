import { useEffect } from "react";
import { domMax, LazyMotion, MotionConfig } from "framer-motion";
import About from "./site/About";
import Contact from "./site/Contact";
import Footer from "./site/Footer";
import Hero from "./site/Hero";
import NamePill from "./site/NamePill";
import { SelectionProvider } from "./site/state";
import Work from "./site/Work";

export default function App() {
  // A /work/<slug> link lands on the Finder with that project selected.
  useEffect(() => {
    if (window.location.pathname.startsWith("/work/")) requestAnimationFrame(() => document.getElementById("work")?.scrollIntoView());
  }, []);

  return (
    // domMax: draggable widgets need the full motion feature set.
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <SelectionProvider>
          <NamePill />
          <Hero />
          <main className="dot-field relative isolate">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -left-40 top-[20%] size-[600px] rounded-full bg-[#3b2a8f]/25 blur-[120px]" />
              <div className="absolute -right-40 top-[55%] size-[600px] rounded-full bg-[#0b4fa8]/25 blur-[120px]" />
            </div>
            <Work />
            <About />
            <Contact />
          </main>
          <Footer />
        </SelectionProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
