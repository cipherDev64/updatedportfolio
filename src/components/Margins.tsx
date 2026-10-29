import { margins } from "../content/site";
import { PencilRule, Reveal, SectionLabel } from "./Paper";

/** About, set like a book page: a central statement with notes in the margins. */
export default function Margins() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative px-4 py-24 sm:px-8 lg:px-12 lg:py-32 xl:pr-56">
      <div className="mx-auto max-w-[1240px]">
        <SectionLabel>04 / Margins — about Atulya</SectionLabel>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left margin: the facts */}
          <aside aria-label="Facts" className="order-2 lg:order-1 lg:col-span-3 lg:border-r lg:border-ink/15 lg:pr-8">
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {margins.notes.map((note, i) => (
                <li key={note.label} className="grid grid-cols-[1.6rem_1fr]">
                  <span className="font-mono text-xs text-stamp">{i + 1}</span>
                  <span>
                    <span className="label-mono block text-note">{note.label}</span>
                    <span className="mt-1 block leading-snug">{note.value}</span>
                  </span>
                </li>
              ))}
            </ol>
          </aside>

          {/* The page */}
          <Reveal className="order-1 lg:order-2 lg:col-span-6">
            <h2 id="about-heading" className="font-display text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.06]">
              I’m interested in the point where technical possibility meets human behavior:{" "}
              <span className="italic text-blueink">not just whether something works, but whether it makes sense to use.</span>
            </h2>
            <PencilRule className="mt-10 text-ink" />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/80">
              Most of what I make starts as a small question about how people behave around software, and turns into a
              prototype to find out.
            </p>
          </Reveal>

          {/* Right margin: off the clock */}
          <aside aria-label="Off the clock" className="order-3 lg:col-span-3 lg:pl-2 lg:pt-2">
            <p className="label-mono text-note">Off the clock</p>
            <ul className="hand mt-3 space-y-0.5 text-[1.55rem] leading-8 text-blueink">
              {margins.offTheClock.map((item) => (
                <li key={item}>
                  <span aria-hidden="true" className="mr-2 text-stamp">
                    ~
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="label-mono mt-10 text-right text-note">p. 04</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
