import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import type { ArchiveEntry } from "../content/archive";
import { ArrowNE, paperEase } from "./Paper";

type Field = { label: string; value?: string | readonly string[] };

/** The focused project sheet. A modal dialog that unfolds from the desk and folds back on close. */
export default function ProjectSheet({ entry, onClose }: { entry: ArchiveEntry; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const fields: Field[] = [
    { label: "Context", value: entry.context },
    { label: "The problem", value: entry.problem },
    { label: "Second Algorithm’s part", value: entry.contribution },
    { label: "Approach", value: entry.approach },
    { label: "Tools & medium", value: entry.medium },
    { label: "Deliverables", value: entry.deliverables },
    { label: "Where it stands", value: entry.note },
  ];

  return (
    <m.div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-ink/45" onClick={onClose} />
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`sheet-${entry.id}-title`}
        className="relative max-h-[92svh] w-full max-w-3xl origin-top overflow-y-auto bg-[#faf7f0] shadow-[var(--shadow-lift)] sm:max-h-[88vh]"
        initial={{ opacity: 0, y: 40, scaleY: 0.92, rotate: -0.6 }}
        animate={{ opacity: 1, y: 0, scaleY: 1, rotate: 0 }}
        exit={{ opacity: 0, y: 24, scaleY: 0.9, rotate: 0.4 }}
        transition={{ duration: 0.32, ease: paperEase }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-ink/15 bg-[#faf7f0]/95 px-5 py-3 sm:px-8">
          <p className="label-mono text-note">
            File {entry.file} · {entry.discipline}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="label-mono -mr-2 min-h-11 shrink-0 px-3 hover:bg-paper-2 active:translate-y-px"
          >
            Fold back <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="graph-paper relative px-5 pb-8 pt-8 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h2 id={`sheet-${entry.id}-title`} className="font-display text-[clamp(2.4rem,6vw,3.6rem)] leading-[0.95]">
              {entry.title}
            </h2>
            <span className="label-mono mt-2 rotate-[-4deg] border-2 border-stamp px-2 py-1 font-semibold text-stamp">{entry.status}</span>
          </div>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/80">{entry.summary}</p>
          {entry.period && <p className="label-mono mt-4 text-blueink">{entry.period}</p>}
        </div>

        <dl className="divide-y divide-ink/10 px-5 sm:px-8">
          {fields.map(({ label, value }) =>
            value && value.length > 0 ? (
              <div key={label} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="label-mono pt-1 text-note">{label}</dt>
                <dd className="leading-relaxed">
                  {typeof value === "string" ? (
                    value
                  ) : (
                    <ul className="flex flex-wrap gap-2">
                      {value.map((item) => (
                        <li key={item} className="border border-ink/20 bg-paper px-2 py-1 text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
            ) : null,
          )}
        </dl>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 px-5 py-6 sm:px-8">
          <p className="label-mono text-note">Source: {entry.source}</p>
          {entry.link && (
            <a
              href={entry.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 bg-ink px-5 font-medium text-cream hover:bg-blueink"
            >
              {entry.link.label} <ArrowNE />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </m.div>
    </m.div>
  );
}
