import { useEffect, useState, type RefObject } from "react";
import { BrandIcon } from "../../components/Icons";
import { profile } from "../../content/profile";
import Widget from "./Widget";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
const user = profile.links.github.split("/").pop() ?? "";
const levels = ["bg-white/[0.06]", "bg-[#0e4429]", "bg-[#006d32]", "bg-[#26a641]", "bg-[#39d353]"];
const WEEKS = 18;

/** Live GitHub contributions, via the public github-contributions API. */
export default function GithubWidget({ bounds, className = "" }: { bounds?: RefObject<HTMLElement | null>; className?: string }) {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { total: Record<string, number>; contributions: Day[] }) => {
        setDays(data.contributions);
        setTotal(data.total.lastYear ?? Object.values(data.total)[0] ?? null);
      })
      .catch((e) => {
        if (e?.name !== "AbortError") setFailed(true);
      });
    return () => ctrl.abort();
  }, []);

  const recent = days ? days.slice(-WEEKS * 7) : Array.from({ length: WEEKS * 7 }, () => null);
  let streak = 0;
  if (days) {
    let i = days.length - 1;
    if (days[i]?.count === 0) i--; // today may not have started yet
    while (i >= 0 && days[i].count > 0) {
      streak++;
      i--;
    }
  }
  const today = days?.[days.length - 1]?.count ?? 0;

  return (
    <Widget label="GitHub contributions" bounds={bounds} delay={0.22} className={`p-4 ${className}`}>
      <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3" onPointerDown={(e) => e.stopPropagation()}>
        <span className="flex items-center gap-2 text-[13px] font-semibold">
          <BrandIcon name="GitHub" className="size-4" />@{user}
        </span>
        <span className="font-mono text-[11px] text-muted">{total !== null ? `${total} this year` : failed ? "github" : "…"}</span>
      </a>
      <div className="mt-3 grid grid-flow-col grid-rows-7 gap-[3px]" aria-hidden="true">
        {recent.map((d, i) => (
          <span key={i} className={`size-[9px] rounded-[2px] ${d ? levels[d.level] : "animate-pulse bg-white/[0.05]"}`} />
        ))}
      </div>
      <p className="mt-3 text-[12.5px] text-ink/85">
        {days ? (
          <>
            <span aria-hidden="true">🔥</span> {streak}-day streak <span className="text-muted">· {today} today</span>
          </>
        ) : failed ? (
          <span className="text-muted">See my work on GitHub →</span>
        ) : (
          <span className="text-muted">Loading contributions…</span>
        )}
      </p>
    </Widget>
  );
}
