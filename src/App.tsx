import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import portrait from "./imports/IMG_7359.jpg";
import { certifications, identity, projects, socials, type Project } from "./data";

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>
);

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer" data-cursor="OPEN">{children}</a>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label reveal">{children}</p>;
}

function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = -100, y = -100, rx = -100, ry = -100, frame = 0;
    const move = (event: PointerEvent) => { x = event.clientX; y = event.clientY; };
    const hover = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const text = target?.dataset.cursor || "";
      ring.current?.classList.toggle("is-active", Boolean(text));
      if (label.current) label.current.textContent = text ? `${text}${text === "OPEN" ? " ↗" : " →"}` : "";
    };
    const tick = () => {
      rx += (x - rx) * 0.14; ry += (y - ry) * 0.14;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", hover);
    tick();
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerover", hover); cancelAnimationFrame(frame); };
  }, []);

  return <>
    <div className="cursor-dot" ref={dot} />
    <div className="cursor-ring" ref={ring}><span ref={label} /></div>
  </>;
}

function MagneticLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (event: ReactMouseEvent) => {
    if (!ref.current || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.12}px, ${(event.clientY - rect.top - rect.height / 2) * 0.12}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return <a ref={ref} className="cta" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} data-cursor={external ? "OPEN" : "HOVER"} onMouseMove={move} onMouseLeave={reset}>{children}<Arrow diagonal={external} /></a>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [["WORK", "#work"], ["ABOUT", "#about"], ["EXPERIENCE", "#experience"], ["CERTIFICATIONS", "#certifications"], ["CONTACT", "#contact"]];
  return <header className="nav">
    <a className="nav-name" href="#top">ATULYA MANIKANDAN</a>
    <div className="status"><i /> BUILDING</div>
    <button className="menu-toggle" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? "CLOSE" : "MENU"}</button>
    <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary">
      {links.map(([name, href]) => <a href={href} key={name} onClick={() => setOpen(false)}>{name}</a>)}
    </nav>
  </header>;
}

function Hero() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const parallax = (event: ReactMouseEvent) => {
    if (!portraitRef.current || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    portraitRef.current.style.setProperty("--mx", `${x * 10}px`);
    portraitRef.current.style.setProperty("--my", `${y * 10}px`);
  };
  return <section className="hero section-shell" id="top">
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-copy">
      <p className="eyebrow reveal">AI/ML ENGINEER · PRODUCT BUILDER · CO-FOUNDER</p>
      <h1 className="hero-title reveal">I BUILD<br /><span>WHAT'S NEXT.</span></h1>
      <p className="hero-summary reveal">Engineering student building products at the intersection of artificial intelligence, design and execution. Co-founder of Draft & Deploy.</p>
      <div className="hero-meta reveal"><span>BASED IN BENGALURU, INDIA</span><span>AI/ML</span><span>PRODUCT</span><span>DESIGN</span><span>2026</span></div>
    </div>
    <div className="portrait-wrap reveal" ref={portraitRef} onMouseMove={parallax} onMouseLeave={() => { portraitRef.current?.style.removeProperty("--mx"); portraitRef.current?.style.removeProperty("--my"); }} data-cursor="EXPLORE">
      <div className="portrait-accent" />
      <img src={portrait} alt="Atulya Manikandan standing on a misty rocky landscape" />
      <p className="portrait-name">ATULYA MANIKANDAN</p>
      <p className="portrait-code">BENGALURU / INDIA<br />AI/ML × PRODUCT × DESIGN</p>
    </div>
    <div className="ticker" aria-label="Build, break, learn, ship">
      <div>BUILD → BREAK → LEARN → SHIP — AI / DESIGN / PRODUCT / EXECUTION — BUILD → BREAK → LEARN → SHIP —</div>
    </div>
  </section>;
}

function About() {
  return <section className="section-shell about" id="about">
    <SectionLabel>01 / ABOUT</SectionLabel>
    <div className="about-layout">
      <h2 className="display-heading reveal">I'M INTERESTED IN THE SPACE WHERE <em>TECHNOLOGY</em> BECOMES A PRODUCT.</h2>
      <div className="about-copy reveal">
        <p>Atulya is an AI/ML-focused engineering student at New Horizon College of Engineering who builds software products, experiments with artificial intelligence and works across product design and development.</p>
        <p>He is also the Co-Founder of Draft & Deploy, where technology, design, automation and digital strategy come together.</p>
      </div>
    </div>
    <div className="identity-matrix">
      {identity.map((item, index) => <article className="identity-row reveal" tabIndex={0} key={item.name}>
        <span>0{index + 1}</span><h3>{item.name}</h3><div>{item.items.map(x => <span key={x}>{x}</span>)}</div><b>+</b>
      </article>)}
    </div>
  </section>;
}

function Company() {
  return <section className="company section-shell">
    <SectionLabel>02 / COMPANY</SectionLabel>
    <div className="company-top">
      <div><p className="company-kicker reveal">CO-FOUNDER / 2026—PRESENT</p><h2 className="company-title reveal">DRAFT <i>&</i><br />DEPLOY</h2></div>
      <div className="company-copy reveal">
        <p>A multidisciplinary digital agency focused on digital strategy, automation, AI solutions and on-demand technology expertise.</p>
        <MagneticLink href={socials.company} external>VISIT DRAFT & DEPLOY</MagneticLink>
      </div>
    </div>
    <div className="company-services reveal">{["DIGITAL STRATEGY", "AI & AUTOMATION", "PRODUCT DEVELOPMENT", "CREATIVE TECHNOLOGY", "GROWTH"].map((x, i) => <span key={x}>0{i + 1} / {x}</span>)}</div>
  </section>;
}

function ProjectGraphic({ project }: { project: Project }) {
  return <div className={`project-graphic graphic-${project.id}`}>
    {project.id === "habitual" && <><div className="habit-ring">82<i>%</i></div><div className="habit-bars">{Array.from({ length: 28 }).map((_, i) => <i key={i} className={i % 5 === 0 || i > 20 ? "on" : ""} />)}</div><span>CONSISTENCY / 04 WEEKS</span></>}
    {project.id === "evidence-memory" && <div className="nodes">{Array.from({ length: 8 }).map((_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}<b>EVIDENCE<br />CONTEXT<br />MEMORY</b></div>}
    {project.id === "tetris" && <div className="tetris-stack">{Array.from({ length: 22 }).map((_, i) => <i key={i} className={i > 13 || [3, 8, 11].includes(i) ? "filled" : ""} />)}<b>004280</b></div>}
    {project.id === "capsule" && <div className="capsule-type"><small>ISSUE / 04</small><b>CODE<br />CAPSULE</b><span>Readable technology,<br />one idea at a time.</span></div>}
    {project.id === "spark" && <div className="spark-mark"><b>✳</b><span>FIND YOUR PEOPLE.<br />MAKE SOMETHING.</span></div>}
  </div>;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return <article className={`project-card project-${project.id} reveal`} data-cursor="VIEW" onClick={() => onOpen(project)} onKeyDown={(e) => { if (e.key === "Enter") onOpen(project); }} tabIndex={0}>
    <div className="project-head"><span>{project.number}</span><span>{project.category}</span><Arrow diagonal /></div>
    <ProjectGraphic project={project} />
    <div className="project-info">
      <div><h3>{project.title}</h3><p>{project.description}</p></div>
      <dl><div><dt>ROLE</dt><dd>{project.role}</dd></div><div><dt>YEAR</dt><dd>{project.year}</dd></div><div><dt>TECH</dt><dd>{project.tech.join(" · ")}</dd></div></dl>
    </div>
  </article>;
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.classList.add("modal-open"); window.addEventListener("keydown", close);
    return () => { document.body.classList.remove("modal-open"); window.removeEventListener("keydown", close); };
  }, [onClose]);
  return <div className="case-overlay" role="dialog" aria-modal="true" aria-label={`${project.title} case study`}>
    <div className="case-nav"><span>{project.number} / CASE STUDY</span><button onClick={onClose} autoFocus>CLOSE ×</button></div>
    <div className="case-hero"><p>{project.category}</p><h2>{project.title}</h2><p>{project.description}</p></div>
    <div className="case-grid">{project.caseStudy.map((item, i) => <article key={item.label}><span>0{i + 1}</span><h3>{item.label}</h3><p>{item.copy}</p></article>)}</div>
    <div className="case-links">
      {project.link && <ExternalLink href={project.link}>OPEN LIVE PROJECT <Arrow diagonal /></ExternalLink>}
      {project.github && <ExternalLink href={project.github}>VIEW SOURCE <Arrow diagonal /></ExternalLink>}
      {!project.link && <span>LINK NOT PUBLIC / EASY TO ADD IN src/data.ts</span>}
    </div>
  </div>;
}

function Work() {
  const [selected, setSelected] = useState<Project | null>(null);
  return <section className="work section-shell" id="work">
    <SectionLabel>03 / SELECTED WORK</SectionLabel>
    <div className="section-title-row reveal"><h2>THINGS I'VE<br /><em>BUILT.</em></h2><p>PRODUCTS / EXPERIMENTS / RESEARCH<br />SELECTED 2025—2026</p></div>
    <div className="projects-grid">{projects.map(project => <ProjectCard key={project.id} project={project} onOpen={setSelected} />)}</div>
    {selected && <CaseStudy project={selected} onClose={() => setSelected(null)} />}
  </section>;
}

function Network() {
  return <div className="network" data-cursor="EXPLORE" aria-hidden="true">
    <svg viewBox="0 0 600 360">{[[80,80,210,130],[210,130,340,70],[210,130,350,220],[350,220,500,140],[80,280,210,130],[80,280,350,220],[340,70,500,140],[350,220,520,300]].map((l,i)=><line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />)}{[[80,80],[210,130],[340,70],[350,220],[500,140],[80,280],[520,300]].map((c,i)=><circle key={i} cx={c[0]} cy={c[1]} r={i === 3 ? 8 : 4} />)}</svg>
    <span className="signal">SIGNAL / ACTIVE</span>
  </div>;
}

function AIAndDesign() {
  return <>
    <section className="ai-section section-shell">
      <SectionLabel>04 / AI + ML</SectionLabel>
      <div className="split-feature">
        <div><h2 className="display-heading reveal">I DON'T JUST <em>USE AI.</em><br />I LIKE BUILDING WITH IT.</h2><p className="feature-copy reveal">Academic learning and project work across machine learning, deep learning, computer vision, natural language processing, AI applications and automation.</p></div>
        <Network />
      </div>
      <div className="capability-line reveal">{["MACHINE LEARNING", "DEEP LEARNING", "COMPUTER VISION", "NLP", "AI APPLICATIONS", "AUTOMATION"].map(x => <span key={x}>{x}</span>)}</div>
    </section>
    <section className="design-section section-shell">
      <SectionLabel>05 / DESIGN</SectionLabel>
      <div className="split-feature">
        <div><h2 className="display-heading reveal">I CARE ABOUT HOW <em>SOFTWARE FEELS.</em></h2><p className="feature-copy reveal">UI/UX design, Figma, interaction design, product interfaces, design systems and prototyping — used as part of building, not decoration after the fact.</p><p className="credential-note reveal">SUPPORTING STUDY / Complete Figma Megacourse: UI/UX Design Beginner to Expert — Udemy</p></div>
        <div className="ui-lab reveal" data-cursor="DRAG"><div className="ui-toolbar"><i /><i /><i /><span>INTERFACE / 01</span></div><div className="ui-content"><div className="ui-side" /><div className="ui-main"><span /><span /><span /><button tabIndex={-1}>SHIP IDEA →</button></div></div><p>PROTOTYPE / SYSTEM / INTERACTION</p></div>
      </div>
    </section>
  </>;
}

function ExperienceCredentials() {
  return <section className="section-shell archive" id="experience">
    <SectionLabel>EXPERIENCE / TIMELINE</SectionLabel>
    <div className="timeline">
      <article className="reveal"><time>2026—PRESENT</time><div><h3>DRAFT & DEPLOY</h3><p>CO-FOUNDER</p></div><div><span>Digital strategy</span><span>AI & automation</span><span>Product development</span><span>Creative technology</span></div><ExternalLink href={socials.company}>VISIT COMPANY <Arrow diagonal /></ExternalLink></article>
      <article className="reveal"><time>2026</time><div><h3>FLYRANK AI</h3><p>AI INTERN</p></div><div><span className="badge">AI / INTERNSHIP</span></div><span>—</span></article>
      <article className="reveal"><time>2023—PRESENT</time><div><h3>NEW HORIZON COLLEGE<br />OF ENGINEERING</h3><p>AI/ML-FOCUSED ENGINEERING EDUCATION</p></div><div><span>BENGALURU, INDIA</span></div><span>—</span></article>
    </div>
    <div id="certifications" className="credentials">
      <SectionLabel>06 / CREDENTIALS</SectionLabel>
      <h2 className="archive-title reveal">CERTIFICATION<br /><em>ARCHIVE</em></h2>
      <div>{certifications.map((cert, i) => <article className="certificate reveal" key={cert.name} tabIndex={0}><span>0{i + 1}</span><p>{cert.category}</p><h3>{cert.name}</h3><div><b>{cert.issuer}</b>{cert.note && <small>{cert.note}</small>}</div></article>)}</div>
    </div>
  </section>;
}

function PhilosophyNow() {
  const now = [["BUILDING", "DRAFT & DEPLOY"], ["EXPERIMENTING", "AI EXPERIMENTS"], ["EXPLORING", "PRODUCT IDEAS"], ["EXPERIMENTING", "UI/UX STUDIES"], ["BUILDING", "PERSONAL PROJECTS"]];
  return <>
    <section className="philosophy section-shell"><p className="reveal">BUILD IN SILENCE.<br /><em>SHIP WITH INTENT.</em></p><h2 className="reveal">I'M INTERESTED IN BUILDING THINGS THAT ARE USEFUL, BEAUTIFUL AND ACTUALLY SHIP.</h2></section>
    <section className="section-shell now">
      <SectionLabel>07 / NOW</SectionLabel><h2 className="archive-title reveal">CURRENTLY<br /><em>BUILDING</em></h2>
      <div className="now-grid">{now.map(([status, name], i) => <article className="reveal" key={name}><span>0{i + 1}</span><i /><p>{status}</p><h3>{name}</h3></article>)}</div>
      <div className="toolbox reveal"><span>TOOLBOX /</span><p><b>LANGUAGES</b> Python, JavaScript, TypeScript</p><p><b>FRAMEWORKS</b> React, Next.js, Tailwind</p><p><b>AI</b> ML, Deep Learning, Computer Vision, NLP</p><p><b>TOOLS</b> Figma, Firebase, Supabase, GitHub, Vercel</p></div>
    </section>
    <section className="off-clock section-shell"><SectionLabel>08 / OFF THE CLOCK</SectionLabel><p className="reveal">GAMING <i>/</i> KEYBOARD & MUSIC <i>/</i> GYM <i>/</i> CREATIVE PROJECTS <i>/</i> LATE-NIGHT EXPERIMENTS</p></section>
  </>;
}

function Contact() {
  return <footer className="contact section-shell" id="contact">
    <SectionLabel>09 / CONTACT</SectionLabel>
    <p className="contact-kicker reveal">HAVE A PRODUCT IDEA, COLLABORATION, EXPERIMENT<br />OR PROBLEM WORTH SOLVING?</p>
    <h2 className="reveal">LET'S BUILD<br /><em>SOMETHING.</em></h2>
    <div className="contact-links reveal"><ExternalLink className="cta" href={socials.linkedin}>GET IN TOUCH <Arrow diagonal /></ExternalLink><ExternalLink href={socials.linkedin}>LINKEDIN <Arrow diagonal /></ExternalLink><ExternalLink href={socials.github}>GITHUB <Arrow diagonal /></ExternalLink></div>
    <div className="footer-line"><p>ATULYA MANIKANDAN<br /><span>AI/ML × PRODUCT × DESIGN × FOUNDER</span></p><div><ExternalLink href={socials.linkedin}>LINKEDIN</ExternalLink><ExternalLink href={socials.github}>GITHUB</ExternalLink><ExternalLink href={socials.company}>DRAFT & DEPLOY</ExternalLink></div><p>© 2026 ATULYA MANIKANDAN<br /><a href="#top">BACK TO TOP ↑</a></p></div>
  </footer>;
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <><CustomCursor /><Navbar /><main><Hero /><About /><Company /><Work /><AIAndDesign /><ExperienceCredentials /><PhilosophyNow /></main><Contact /></>;
}
