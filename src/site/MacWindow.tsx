import type { ReactNode } from "react";

/** macOS window chrome: traffic lights and a centred title. Decorative lights. */
export default function MacWindow({ title, right, children, className = "" }: { title: ReactNode; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`window-shadow overflow-hidden rounded-[14px] bg-window ${className}`}>
      <div className="relative flex h-11 items-center border-b border-line bg-sidebar/80 px-4">
        <span aria-hidden="true" className="flex gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>
        <div className="pointer-events-none absolute inset-x-24 truncate text-center text-[13px] font-semibold text-ink/85">{title}</div>
        {right && <div className="ml-auto">{right}</div>}
      </div>
      {children}
    </div>
  );
}

/** macOS-style folder icon. */
export function FolderIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 26" className={className} aria-hidden="true">
      <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h7.2a2.5 2.5 0 0 1 1.9.9L15.5 5H27.5A2.5 2.5 0 0 1 30 7.5v1H2Z" fill="#3b8de0" />
      <rect x="2" y="7" width="28" height="17" rx="2.5" fill="#5aa9f2" />
      <rect x="2" y="7" width="28" height="2" rx="1" fill="#7dbdf6" />
    </svg>
  );
}
