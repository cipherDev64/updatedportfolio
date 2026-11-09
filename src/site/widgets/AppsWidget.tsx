import type { ReactNode, RefObject } from "react";
import { Mail } from "lucide-react";
import { BrandIcon, LinkedInIcon, ProjectGlyph, ToolIcon } from "../../components/Icons";
import { mailto, profile } from "../../content/profile";
import Widget from "./Widget";

type App = { label: string; tile: string; icon: ReactNode; href?: string };

export const apps: App[] = [
  { label: "Claude", tile: "bg-[#d97757] text-white", icon: <ToolIcon name="Claude" className="size-[52%]" /> },
  { label: "Notion", tile: "bg-white text-black", icon: <ToolIcon name="Notion" className="size-[52%]" /> },
  { label: "GitHub", tile: "bg-[#0d1117] text-white ring-1 ring-white/15", icon: <BrandIcon name="GitHub" className="size-[52%]" />, href: profile.links.github },
  { label: "LinkedIn", tile: "bg-[#0a66c2] text-white", icon: <LinkedInIcon className="size-[50%]" />, href: profile.links.linkedin },
  { label: "Figma", tile: "bg-[#1e1e1e] text-white ring-1 ring-white/15", icon: <ToolIcon name="Figma" className="size-[50%]" /> },
  { label: "Instagram", tile: "bg-[linear-gradient(45deg,#f9a03f,#e1306c_50%,#833ab4)] text-white", icon: <BrandIcon name="Instagram" className="size-[52%]" />, href: profile.links.instagram },
  { label: "Second Algorithm", tile: "bg-[#1f2726] text-white ring-1 ring-white/15", icon: <ProjectGlyph icon="algorithm" className="size-[52%]" />, href: profile.ventureUrl },
  { label: "Mail", tile: "bg-[linear-gradient(180deg,#3fa2ff,#0a6bd9)] text-white", icon: <Mail className="size-[50%]" aria-hidden="true" />, href: mailto },
];

export function AppTile({ app, className = "size-12" }: { app: App; className?: string }) {
  const body = <span className={`grid place-items-center rounded-[23%] shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_6px_14px_-6px_rgb(0_0_0/0.7)] ${app.tile} ${className}`}>{app.icon}</span>;
  if (!app.href) return <span title={`${app.label} · daily tool`} aria-label={`${app.label}, a daily tool`} role="img">{body}</span>;
  const external = app.href.startsWith("http");
  return (
    <a href={app.href} title={app.label} aria-label={app.label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} onPointerDown={(e) => e.stopPropagation()} className="block transition-transform hover:-translate-y-0.5 active:scale-95">
      {body}
    </a>
  );
}

export default function AppsWidget({ bounds, className = "" }: { bounds?: RefObject<HTMLElement | null>; className?: string }) {
  return (
    <Widget label="Apps and links" bounds={bounds} delay={0.2} className={`p-3.5 ${className}`}>
      <ul className="grid grid-cols-4 justify-items-center gap-3">
        {apps.map((app) => (
          <li key={app.label}>
            <AppTile app={app} />
          </li>
        ))}
      </ul>
    </Widget>
  );
}
