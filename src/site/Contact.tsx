import { useState } from "react";
import { m } from "framer-motion";
import { Calendar, Check, Copy, Send } from "lucide-react";
import avatar from "../assets/avatar.webp";
import { ease } from "../components/Motion";
import { mailto, profile } from "../content/profile";
import MacWindow from "./MacWindow";
import SectionHead from "./SectionHead";

const subjects = ["A product idea", "A studio project", "An internship or role", "Just saying hi"];

/** A Mail-style composer. Sending hands the draft to the visitor's own mail app. */
export default function Contact() {
  const [subject, setSubject] = useState(subjects[0]);
  const [from, setFrom] = useState("");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.links.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = mailto;
    }
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [body.trim(), from.trim() && `\n— ${from.trim()}`].filter(Boolean).join("\n");
    window.location.href = `${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  };

  const row = "flex items-center gap-3 border-b border-line px-5 py-2.5 text-[14px]";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <SectionHead eyebrow="Contact" title="Got an idea worth building?" id="contact-heading" />
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_300px]">
          <m.form onSubmit={send} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease }}>
            <MacWindow title="New Message" right={<Send className="size-4 text-muted" aria-hidden="true" />}>
              <div className={row}>
                <span className="w-16 shrink-0 text-muted">To:</span>
                <span className="flex items-center gap-1.5 rounded-full bg-accent/15 py-0.5 pl-0.5 pr-2.5 text-[13px] font-semibold text-[#6fb6ff]">
                  <img src={avatar} alt="" className="size-5 rounded-full object-cover" /> {profile.name}
                </span>
                <span className="hidden truncate text-muted sm:inline">{profile.links.email}</span>
                <button type="button" onClick={copy} className="ml-auto flex items-center gap-1 rounded-[6px] px-2 py-1 text-[12.5px] text-muted hover:bg-white/10 hover:text-ink">
                  {copied ? <Check className="size-3.5 text-[#30d158]" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className={`${row} flex-wrap`}>
                <span className="w-16 shrink-0 text-muted" id="subject-label">
                  Subject:
                </span>
                <div role="radiogroup" aria-labelledby="subject-label" className="flex flex-wrap gap-1.5">
                  {subjects.map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={subject === s}
                      onClick={() => setSubject(s)}
                      className={`rounded-full px-3 py-1 text-[13px] font-medium transition-colors ${subject === s ? "bg-white text-black" : "border border-line text-ink/80 hover:bg-white/10"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <label className={row}>
                <span className="w-16 shrink-0 text-muted">From:</span>
                <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Your name" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted/60" />
              </label>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={6}
                  placeholder="Hey Atulya, I’ve been thinking about…"
                  className="block w-full resize-none bg-transparent px-5 py-4 text-[15px] leading-relaxed outline-none placeholder:text-muted/60"
                />
              </label>
              <div className="flex flex-wrap items-center gap-2 border-t border-line px-5 py-3">
                <button type="submit" className="flex items-center gap-1.5 rounded-[8px] bg-accent px-4 py-2 text-[14px] font-semibold text-white hover:brightness-110">
                  <Send className="size-3.5" aria-hidden="true" /> Send
                </button>
                <a href={profile.bookCallUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-[8px] border border-line bg-raised px-4 py-2 text-[14px] font-semibold hover:bg-white/10">
                  <Calendar className="size-3.5" aria-hidden="true" /> Or book a call
                </a>
                <span className="ml-auto text-[12px] text-muted">Opens in your mail app</span>
              </div>
            </MacWindow>
          </m.form>

          <m.aside
            className="relative -rotate-[2deg] bg-sticky p-5 text-[#2b2410] shadow-[0_20px_40px_-18px_rgb(0_0_0/0.9)] lg:mt-6"
            initial={{ opacity: 0, y: 30, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease }}
            whileHover={{ rotate: 0, y: -4 }}
          >
            <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[3deg] bg-white/50" />
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#a15c00]">P.S.</p>
            <p className="mt-2 text-[16px] font-medium leading-snug">
              Half an idea is enough. If it needs a whole team, <span className="bg-[#ffe9a6] px-0.5">Second Algorithm</span> can take it from sketch to launch.
            </p>
          </m.aside>
        </div>
      </div>
    </section>
  );
}
