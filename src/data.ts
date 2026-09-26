export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  role: string;
  link?: string;
  github?: string;
  state?: string;
  caseStudy: { label: string; copy: string }[];
};

export const projects: Project[] = [
  {
    id: "habitual",
    number: "01",
    title: "HABITUAL",
    category: "AI × PRODUCT × UI/UX",
    description:
      "A modern habit-tracking application combining visual progress, data visualization and an AI-powered habit assistant.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    year: "CURRENT",
    role: "Product design & development",
    state: "FLAGSHIP PRODUCT",
    caseStudy: [
      { label: "Problem", copy: "Habit tools can record activity without helping people understand consistency." },
      { label: "Idea", copy: "Bring tracking, visual feedback and an AI assistant into one focused product experience." },
      { label: "Process", copy: "Explore the information hierarchy, habit loops and responsive interaction patterns." },
      { label: "Build", copy: "Interactive tracking, consistency heatmaps, data visualization and a responsive interface." },
      { label: "Current state", copy: "An active product project focused on making personal progress easier to see and act on." },
    ],
  },
  {
    id: "sctm",
    number: "02",
    title: "SCTM",
    category: "AI RESEARCH × MEMORY SYSTEMS",
    description:
      "An experimental exploration of AI memory, long-term context, model behavior and the systems around them.",
    tech: ["AI Systems", "Research", "Python", "System Design"],
    year: "CURRENT",
    role: "Research & experimentation",
    state: "EXPERIMENTAL",
    caseStudy: [
      { label: "Problem", copy: "Long-running AI systems face practical questions around context and memory degradation." },
      { label: "Idea", copy: "Study memory as a system design problem rather than treating context as an unlimited resource." },
      { label: "Process", copy: "Frame questions, examine behavior and map the architecture around persistent context." },
      { label: "Build", copy: "A research-led technical exploration of memory structures and model behavior." },
      { label: "Current state", copy: "Ongoing experimentation. No research outcome is claimed." },
    ],
  },
  {
    id: "tetris",
    number: "03",
    title: "CANVAS TETRIS",
    category: "WEB × INTERACTION × ENGINEERING",
    description:
      "A playable Tetris implementation with fluid canvas rendering, responsive controls and complete game-state logic.",
    tech: ["Next.js", "React", "Canvas API", "Tailwind CSS"],
    year: "CURRENT",
    role: "Design & development",
    link: "https://canvastetris.vercel.app",
    github: "https://github.com/cipherDev64/canvas-tetris/tree/main",
    caseStudy: [
      { label: "Problem", copy: "Recreate a familiar game while keeping input, rendering and state reliably synchronized." },
      { label: "Idea", copy: "Use the Canvas API for a focused, responsive browser-based interpretation." },
      { label: "Process", copy: "Design the game loop, piece movement, collision behavior and compact interface." },
      { label: "Build", copy: "Ghost pieces, hard and soft drop, pause, score tracking and responsive play." },
      { label: "Current state", copy: "Playable online, with source available on GitHub." },
    ],
  },
  {
    id: "capsule",
    number: "04",
    title: "CODE CAPSULE",
    category: "CONTENT × PRODUCT × WEB",
    description:
      "A technology-focused content platform designed to make technical information easier to navigate and consume.",
    tech: ["Content Architecture", "Web", "Information Design"],
    year: "CURRENT",
    role: "Product & interface design",
    state: "CONCEPT",
    caseStudy: [
      { label: "Problem", copy: "Technical content often becomes dense before a reader finds a useful entry point." },
      { label: "Idea", copy: "Treat reading structure and information design as core product features." },
      { label: "Process", copy: "Explore editorial hierarchy, navigation and reusable story formats." },
      { label: "Build", copy: "A web concept centered on technology storytelling and content architecture." },
      { label: "Current state", copy: "Conceptual product work; no audience or performance claims are made." },
    ],
  },
  {
    id: "spark",
    number: "05",
    title: "SPARK",
    category: "COMMUNITY × PRODUCT × DESIGN",
    description:
      "A student community concept for connecting people around shared interests, collaboration and projects.",
    tech: ["Product Thinking", "UX", "Community Design"],
    year: "CURRENT",
    role: "Concept & UX",
    state: "CONCEPT",
    caseStudy: [
      { label: "Problem", copy: "Students with aligned interests do not always have a clear path to find collaborators." },
      { label: "Idea", copy: "Create an interest-led community product organized around people and active projects." },
      { label: "Process", copy: "Map discovery, connection and engagement flows." },
      { label: "Build", copy: "A product and UX concept for a more collaborative student community." },
      { label: "Current state", copy: "Conceptual exploration; no launch outcome is claimed." },
    ],
  },
];

export const identity = [
  { name: "AI", items: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "AI Systems"] },
  { name: "DESIGN", items: ["UI/UX", "Figma", "Product Design", "Interaction", "Visual Systems"] },
  { name: "BUILD", items: ["React", "Next.js", "Python", "Firebase", "Supabase", "APIs"] },
  { name: "GROW", items: ["Marketing", "Strategy", "Content", "Branding", "Digital Products"] },
];

export const certifications = [
  { category: "AI / ML", name: "Neural Networks for Computer Vision and Natural Language Processing", issuer: "NPTEL", note: "Elite + Gold" },
  { category: "DESIGN", name: "Complete Figma Megacourse: UI/UX Design Beginner to Expert", issuer: "Udemy" },
  { category: "PROGRAMMING", name: "Python (Basic)", issuer: "HackerRank" },
  { category: "PROBLEM SOLVING", name: "Problem Solving (Basic)", issuer: "HackerRank" },
];

export const socials = {
  linkedin: "https://www.linkedin.com/in/atulya-manikandan/",
  github: "https://github.com/cipherDev64",
  company: "https://draftanddeploy.vercel.app/",
};
