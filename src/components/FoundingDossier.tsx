import { m } from "framer-motion";
import { profile } from "../content/profile";
import { venture } from "../content/site";
import { ArrowNE, CropMarks, paperEase, Pin, Stamp } from "./Paper";

export default function FoundingDossier() {
  return (
    <section id="second-algorithm" aria-labelledby="sa-heading" className="relative px-3 py-20 sm:px-8 lg:px-12 lg:py-28 xl:pr-56">
      <div className="mx-auto max-w-[1240px]">
        <m.div
          className="relative pt-9"
          initial={{ opacity: 0, y: 40, rotate: 0.8 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: paperEase }}
        >
          {/* Sheets tucked inside the folder, peeking above its edge */}
          <div aria-hidden="true" className="absolute right-[6%] top-3 h-16 w-[46%] rotate-[1.2deg] bg-paper-2 shadow-[var(--shadow-paper)]" />
          <div aria-hidden="true" className="graph-paper absolute right-[12%] top-5 h-16 w-[38%] -rotate-[0.8deg] shadow-[var(--shadow-paper)]" />

          {/* Folder tab */}
          <p className="label-mono absolute left-0 top-0 z-10 flex h-10 items-center gap-3 rounded-t-lg bg-ink pl-5 pr-7 text-cream/80">
            Second Algorithm / Active
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#e07d6f]" />
          </p>

          <div className="on-ink relative overflow-hidden rounded-b-lg rounded-tr-lg bg-ink text-cream shadow-[0_2px_0_rgb(0_0_0/0.2),0_40px_60px_-30px_rgb(36_37_34/0.65)]">
            <div aria-hidden="true" className="grain absolute inset-0 opacity-60" />
            <CropMarks className="text-cream/25" />

            <div className="relative grid gap-12 px-5 pb-10 pt-12 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-14 lg:pb-14 lg:pt-16">
              {/* Founding note */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="label-mono text-cream/55">02 / The founding dossier</p>
                  <Stamp rotate={-6} tone="stampOnInk">
                    Co-founder
                  </Stamp>
                </div>

                <p aria-hidden="true" className="mt-10 text-[clamp(1.6rem,3vw,2.2rem)] font-bold lowercase leading-none tracking-[-0.045em] text-cream">
                  second algorithm
                </p>
                <h2 id="sa-heading" className="mt-6 font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.04] text-cream">
                  {venture.statement}
                </h2>

                <div className="mt-8 max-w-xl space-y-4 text-[1.05rem] leading-relaxed text-cream/75">
                  {venture.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <m.a
                    href={profile.ventureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-14 items-center gap-3 bg-cream px-7 text-lg font-semibold text-ink shadow-[0_4px_0_#b5ad9c] hover:bg-marker active:translate-y-[3px] active:shadow-[0_1px_0_#b5ad9c]"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    Visit Second Algorithm <ArrowNE />
                    <span className="sr-only">(opens secondalgorithm.space in a new tab)</span>
                  </m.a>
                  <span className="label-mono text-cream/50">secondalgorithm.space</span>
                </div>
              </div>

              {/* Inserts */}
              <div className="relative flex flex-col gap-10 lg:col-span-5 lg:pl-4">
                <m.div
                  className="relative bg-paper p-6 text-ink shadow-[0_18px_30px_-16px_rgb(0_0_0/0.6)]"
                  style={{ rotate: 1.2 }}
                  whileHover={{ rotate: 0.4, y: -3 }}
                  transition={{ duration: 0.25, ease: paperEase }}
                >
                  <Pin className="-top-1.5 left-1/2 -translate-x-1/2" />
                  <h3 className="label-mono text-stamp">What we’re exploring</h3>
                  <ol className="mt-4 divide-y divide-ink/12">
                    {venture.exploring.map((item, i) => (
                      <li key={item.label} className="grid grid-cols-[2rem_1fr] py-3">
                        <span className="font-mono text-xs text-note">{String(i + 1).padStart(2, "0")}</span>
                        <span>
                          <span className="block font-display text-[1.45rem] leading-tight">{item.label}</span>
                          <span className="mt-0.5 block text-sm text-ink/70">{item.note}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </m.div>

                <m.div
                  className="graph-paper relative p-6 text-ink shadow-[0_18px_30px_-16px_rgb(0_0_0/0.6)] lg:-ml-10"
                  style={{ rotate: -1.4 }}
                  whileHover={{ rotate: -0.6, y: -3 }}
                  transition={{ duration: 0.25, ease: paperEase }}
                >
                  <span aria-hidden="true" className="tape -top-3 right-8 rotate-[6deg]" />
                  <h3 className="label-mono text-blueink">Currently working on</h3>
                  <ul className="mt-4 space-y-3">
                    {venture.workingOn.map((item) => (
                      <li key={item.label} className="flex items-start justify-between gap-4">
                        <span className="leading-snug">{item.label}</span>
                        <span
                          className={`label-mono shrink-0 border px-1.5 py-0.5 text-[0.6rem] ${
                            item.tag === "exploration" ? "border-dashed border-blueink text-blueink" : "border-ink/60 text-ink"
                          }`}
                        >
                          {item.tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </m.div>

                <p className="hand text-xl leading-6 text-cream/70 lg:pl-2">
                  ↳ my part in it: co-founder, hands on the work.
                </p>
              </div>
            </div>

            <div className="relative flex flex-wrap justify-between gap-2 border-t border-cream/15 px-5 py-4 sm:px-10 lg:px-14">
              <span className="label-mono text-cream/45">File SA-00 · Bengaluru, India</span>
              <span className="label-mono text-cream/45">Keep this folder open</span>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
