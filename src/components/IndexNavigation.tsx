import { useEffect, useState } from "react";
import { sections, type SectionId } from "../content/profile";

const tabColors = ["bg-paper", "bg-paper-2", "bg-ink text-cream", "bg-marker", "bg-[#dfe7ec]", "bg-paper"];

function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("desk");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return active;
}

/**
 * Index tabs on the edge of the desk: down the right edge on wide screens,
 * along the bottom edge everywhere else.
 */
export default function IndexNavigation() {
  const active = useActiveSection();
  return (
    <nav aria-label="Sections">
      {/* Wide screens: tabs on the right edge */}
      <ul className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1.5 xl:flex">
        {sections.map((section, i) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`label-mono flex w-48 items-center gap-2 rounded-l-md tracking-[0.06em] border border-r-0 border-ink/15 py-2.5 pl-3 pr-4 shadow-[var(--shadow-paper)] transition-transform duration-200 ease-out hover:translate-x-0 focus-visible:translate-x-0 ${tabColors[i]} ${
                  isActive ? "translate-x-0" : "translate-x-6"
                }`}
              >
                <span aria-hidden="true" className="opacity-55">
                  {String(i).padStart(2, "0")}
                </span>
                <span className="truncate">{section.label}</span>
                {isActive && <span aria-hidden="true" className="ml-auto size-1.5 shrink-0 rounded-full bg-stamp" />}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Everything else: tabs rising from the bottom edge */}
      <ul className="fixed inset-x-0 bottom-0 z-40 flex items-end gap-0.5 overflow-x-auto border-t border-ink/15 bg-paper-2/95 px-1.5 pb-[env(safe-area-inset-bottom)] pt-1.5 [scrollbar-width:none] xl:hidden">
        {sections.map((section, i) => {
          const isActive = active === section.id;
          const label = "short" in section ? section.short : section.label;
          return (
            <li key={section.id} className="flex-auto">
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                aria-label={section.label}
                className={`label-mono flex min-h-11 items-center justify-center whitespace-nowrap rounded-t-md border border-b-0 border-ink/15 px-1.5 text-[0.6rem] tracking-[0.05em] sm:px-3 sm:text-[0.6875rem] transition-transform duration-200 ${tabColors[i]} ${
                  isActive ? "-translate-y-0.5 font-semibold" : "translate-y-1.5"
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
