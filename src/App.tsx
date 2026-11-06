import { useEffect } from "react";
import { AnimatePresence, domAnimation, LazyMotion, m, MotionConfig } from "framer-motion";
import About from "./components/About";
import CaseStudy from "./components/CaseStudy";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { ease } from "./components/Motion";
import Nav from "./components/Nav";
import Work from "./components/Work";
import { profile } from "./content/profile";
import { projects } from "./content/projects";
import { Link, usePath } from "./lib/router";

const homeTitle = `${profile.name} — AI/ML Engineer & Co-founder, Second Algorithm`;

function Home() {
  useEffect(() => {
    document.title = homeTitle;
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Experience />
    </>
  );
}

function NotFound() {
  return (
    <div className="grid min-h-[70svh] place-items-center px-4 pt-28 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-5xl tracking-[-0.03em]">Nothing on this page.</h1>
        <Link href="/" className="mt-8 inline-block rounded-full bg-ink px-5 py-2.5 text-[15px] font-medium text-on-ink">
          Back home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  const path = usePath();
  const slug = path.match(/^\/work\/([^/]+)\/?$/)?.[1];
  const project = slug ? projects.find((p) => p.slug === slug) : undefined;
  const isHome = path === "/" || path === "";

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Nav />
        <AnimatePresence mode="wait" initial={false}>
          <m.main
            key={path}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease }}
          >
            {isHome ? <Home /> : project ? <CaseStudy key={project.slug} project={project} /> : <NotFound />}
          </m.main>
        </AnimatePresence>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
