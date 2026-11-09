import { createContext, useContext, useState, type ReactNode } from "react";
import { projects, type Project } from "../content/projects";

export type Filter = "All" | Project["group"];

type Selection = { filter: Filter; slug: string; setFilter: (f: Filter) => void; select: (slug: string) => void; showFolder: (f: Filter) => void };

const Ctx = createContext<Selection | null>(null);

/** Shared between the hero's desktop folders and the Finder window below. */
export function SelectionProvider({ children }: { children: ReactNode }) {
  const fromUrl = window.location.pathname.match(/^\/work\/([^/]+)/)?.[1];
  const [filter, setFilter] = useState<Filter>("All");
  const [slug, setSlug] = useState(projects.some((p) => p.slug === fromUrl) ? (fromUrl as string) : projects[0].slug);

  const select = (next: string) => {
    setSlug(next);
    window.history.replaceState({}, "", `/work/${next}`);
  };
  const showFolder = (f: Filter) => {
    setFilter(f);
    const first = projects.find((p) => f === "All" || p.group === f);
    if (first) select(first.slug);
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };
  return <Ctx.Provider value={{ filter, slug, setFilter, select, showFolder }}>{children}</Ctx.Provider>;
}

export function useSelection() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSelection must be used inside SelectionProvider");
  return ctx;
}
