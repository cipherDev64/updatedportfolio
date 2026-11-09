import { useEffect, useState, type RefObject } from "react";
import { profile } from "../../content/profile";
import Widget from "./Widget";

const IST_OFFSET_MIN = 330;

function relative() {
  const visitorOffset = -new Date().getTimezoneOffset();
  const diff = (IST_OFFSET_MIN - visitorOffset) / 60;
  if (diff === 0) return "Same time zone as you";
  const hrs = Math.abs(diff);
  const label = Number.isInteger(hrs) ? `${hrs}` : hrs.toFixed(1);
  return `${label} hr${hrs === 1 ? "" : "s"} ${diff > 0 ? "ahead of" : "behind"} you`;
}

export default function ClockWidget({ bounds, className = "" }: { bounds?: RefObject<HTMLElement | null>; className?: string }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: profile.timeZone }).format(now);
  return (
    <Widget label="Local time" bounds={bounds} delay={0.3} className={`p-4 ${className}`}>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">Bengaluru</p>
      <p className="mt-1 text-[34px] font-bold leading-none tracking-[-0.04em] tabular-nums">{time.replace(" ", "")}</p>
      <p className="mt-2 text-[12.5px] text-muted">{relative()}</p>
      <p className="mt-3 flex items-center gap-1.5 text-[12.5px] text-ink/85">
        <span aria-hidden="true">🎧</span> Building, Lana on
      </p>
    </Widget>
  );
}
