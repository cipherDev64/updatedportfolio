import {
  siClaude,
  siFigma,
  siFirebase,
  siGithub,
  siInstagram,
  siNextdotjs,
  siNotion,
  siReact,
  siSupabase,
  siTailwindcss,
  siVercel,
} from "simple-icons";
import type { ProjectIcon } from "../content/projects";

const brands = {
  Claude: siClaude,
  Notion: siNotion,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  Figma: siFigma,
  Firebase: siFirebase,
  Supabase: siSupabase,
  GitHub: siGithub,
  Vercel: siVercel,
  Instagram: siInstagram,
} as const;

export type BrandName = keyof typeof brands;

export function BrandIcon({ name, className = "size-4" }: { name: BrandName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={brands[name].path} />
    </svg>
  );
}

/**
 * Toolbox icon: the official mark where simple-icons has one, otherwise a
 * simple drawn glyph (Wispr Flow, Antigravity and Instagram's Edits app).
 */
export function ToolIcon({ name, className = "size-[18px]" }: { name: string; className?: string }) {
  if (name in brands) return <BrandIcon name={name as BrandName} className={className} />;
  const stroke = { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "Wispr Flow":
      return (
        <svg {...stroke}>
          <path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2" />
        </svg>
      );
    case "Antigravity":
      return (
        <svg {...stroke}>
          <path d="M4 20 12 4l8 16" />
          <path d="M8.5 13.5c2-1.6 5-1.6 7 0" />
        </svg>
      );
    case "Edits":
      return (
        <svg {...stroke}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <path d="M9 4v16M15 4v16M3.5 9.5H9M3.5 14.5H9M15 9.5h5.5M15 14.5h5.5" />
        </svg>
      );
    default:
      return null;
  }
}

export function LinkedInIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75v5.7h-4v-5.05c0-1.2-.02-2.75-1.77-2.75-1.78 0-2.05 1.3-2.05 2.66v5.14h-4v-11Z" />
    </svg>
  );
}

/** Small white marks for each project, drawn for this site. */
export function ProjectGlyph({ icon, className = "size-[46%]" }: { icon: ProjectIcon; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (icon) {
    case "algorithm":
      return (
        <svg {...common}>
          <path d="M8 7.5c0-1.7 1.6-3 4-3s4 1.2 4 3c0 3.5-8 4.5-8 8.5h8" />
          <circle cx="18.5" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M5 20V8.5a7 7 0 0 1 14 0V20" />
          <path d="M9.5 20v-6h5v6M3.5 20h17" />
        </svg>
      );
    case "lamp":
      return (
        <svg {...common}>
          <path d="M12 3v3M6.5 13a5.5 5.5 0 0 1 11 0Z" />
          <path d="M10 16.5a2 2 0 0 0 4 0" />
        </svg>
      );
    case "habit":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="4.5" height="4.5" rx="1" fill="currentColor" stroke="none" />
          <rect x="9.75" y="4" width="4.5" height="4.5" rx="1" fill="currentColor" stroke="none" />
          <rect x="15.5" y="4" width="4.5" height="4.5" rx="1" />
          <rect x="4" y="9.75" width="4.5" height="4.5" rx="1" fill="currentColor" stroke="none" />
          <rect x="9.75" y="9.75" width="4.5" height="4.5" rx="1" />
          <rect x="15.5" y="9.75" width="4.5" height="4.5" rx="1" fill="currentColor" stroke="none" />
          <path d="M4 18.5h16" />
        </svg>
      );
    case "blocks":
      return (
        <svg {...common}>
          <path d="M4 13h5.33v-5.33h5.34V13H20v5.33H4Z" />
          <path d="M9.33 13v5.33M14.67 13v5.33" />
        </svg>
      );
    case "capsule":
      return (
        <svg {...common}>
          <rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)" />
          <path d="M9.6 8.6l4.8 6.8" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4M6 6l2.8 2.8M15.2 15.2 18 18M18 6l-2.8 2.8M8.8 15.2 6 18" />
        </svg>
      );
    case "memory":
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="2.2" />
          <circle cx="17.5" cy="6.5" r="2.2" />
          <circle cx="17.5" cy="17.5" r="2.2" strokeDasharray="2 2" />
          <path d="M8.1 11 15.4 7.5M8.1 13l7.3 3.5" />
        </svg>
      );
  }
}
