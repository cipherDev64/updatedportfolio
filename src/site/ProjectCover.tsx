import type { Project } from "../content/projects";

export function ProjectCover({ project, className = "" }: { project: Project; className?: string }) {
  if (project.image) {
    return <img src={project.image} alt={`${project.title} website`} loading="lazy" className={`size-full object-cover object-top ${className}`} />;
  }
  return (
    <div className={`relative grid size-full place-items-center overflow-hidden text-white ${className}`} style={{ background: project.color }}>
      <div aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,#fff_1.2px,transparent_0)] [background-size:18px_18px]" />
      <svg aria-hidden="true" viewBox="0 0 400 240" className="absolute inset-x-[10%] top-1/2 w-[80%] -translate-y-1/2 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="70" cy="120" r="26" />
        <circle cx="210" cy="60" r="20" />
        <circle cx="210" cy="180" r="20" strokeDasharray="5 5" />
        <circle cx="330" cy="120" r="30" />
        <path d="M95 110l92-42M95 130l92 42M230 66l74 42M230 174l74-42" />
      </svg>
    </div>
  );
}
