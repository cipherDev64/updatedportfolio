import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import ContactPostcard from "./components/ContactPostcard";
import DeskScene from "./components/DeskScene";
import FoundingDossier from "./components/FoundingDossier";
import IndexNavigation from "./components/IndexNavigation";
import Margins from "./components/Margins";
import Pinboard from "./components/Pinboard";
import ProjectArchive from "./components/ProjectArchive";
import { PencilRule } from "./components/Paper";

export default function App() {
  return (
    // "user" honours prefers-reduced-motion: transforms are dropped, opacity remains.
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="sr-only-focusable label-mono fixed left-3 top-3 z-[60] bg-ink px-4 py-3 text-cream"
      >
        Skip to the work
      </a>
      <IndexNavigation />
      <main className="overflow-x-clip">
        <DeskScene />
        <PencilRule className="mx-auto max-w-[1240px] px-4 text-ink/60 xl:-translate-x-16" />
        <ProjectArchive />
        <FoundingDossier />
        <Pinboard />
        <Margins />
        <ContactPostcard />
      </main>
    </MotionConfig>
    </LazyMotion>
  );
}
