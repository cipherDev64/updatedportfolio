import secondAlgorithm from "../assets/work/second-algorithm.webp";
import urbanPremium from "../assets/work/urban-premium.webp";
import windecor from "../assets/work/windecor.webp";
import habitual from "../assets/work/habitual.webp";
import canvasTetris from "../assets/work/canvas-tetris.webp";
import codeCapsule from "../assets/work/code-capsule.webp";
import spark from "../assets/work/spark.webp";

// Selected work. Copy is drawn from each project's live site and earlier
// portfolio notes; no metrics or outcomes are claimed that weren't measured.

export type ProjectIcon = "algorithm" | "building" | "lamp" | "habit" | "blocks" | "capsule" | "spark" | "memory";

export type Project = {
  slug: string;
  title: string;
  category: "Design" | "Development" | "Product" | "Research";
  year: string;
  icon: ProjectIcon;
  /** Tile colour for the dock icon and project mark. */
  color: string;
  /** Screenshot of the live site; projects without one render a drawn cover. */
  image?: string;
  summary: string;
  details: { label: string; value: string }[];
  sections: { heading: string; body: string[] }[];
  link?: { href: string; label: string };
  github?: string;
};

export const projects: Project[] = [
  {
    slug: "second-algorithm",
    title: "Second Algorithm",
    category: "Design",
    year: "2026",
    icon: "algorithm",
    color: "#2f3b3a",
    image: secondAlgorithm,
    summary: "The studio I co-founded, and the website that has to prove what the studio says.",
    details: [
      { label: "Studio", value: "Second Algorithm" },
      { label: "Role", value: "Co-founder, design & build" },
      { label: "Year", value: "2026" },
    ],
    sections: [
      {
        heading: "Design you notice, systems you don’t",
        body: [
          "Second Algorithm is an independent creative technology studio in Bengaluru. We design and build websites, brand systems and the automations behind them, then hand the client the keys.",
          "The idea is that the surface and the system are one piece of work: the people choosing the typeface also wire up the leads, the inbox and the job someone does by hand every Friday.",
        ],
      },
      {
        heading: "The site as the pitch",
        body: [
          "A studio that argues against templates can’t ship a template. The site leans on editorial type, a clear four-step process and plain promises: honest timelines, and code the client owns.",
        ],
      },
    ],
    link: { href: "https://secondalgorithm.space", label: "Visit secondalgorithm.space" },
  },
  {
    slug: "urban-premium-coworks",
    title: "Urban Premium Coworks",
    category: "Development",
    year: "2026",
    icon: "building",
    color: "#8a5a44",
    image: urbanPremium,
    summary: "A workspace platform for a coworking space in Bengaluru, built at Second Algorithm.",
    details: [
      { label: "Client", value: "Urban Premium Coworks" },
      { label: "Role", value: "Design & development" },
      { label: "Year", value: "2026" },
    ],
    sections: [
      {
        heading: "A workspace designed for deep work",
        body: [
          "Urban Premium is curated coworking for individuals and teams who value design, community and focus: open desks, dedicated desks, private cabins and meeting suites, with monthly flexibility.",
          "The site had to feel as considered as the space itself, and make the practical things easy: compare workspaces, see the amenities and gallery, and book a tour.",
        ],
      },
    ],
    link: { href: "https://urbanpremiumcoworks.vercel.app", label: "Visit the site" },
  },
  {
    slug: "windecor-interiors",
    title: "Windecor Interiors",
    category: "Design",
    year: "2026",
    icon: "lamp",
    color: "#3a3d48",
    image: windecor,
    summary: "A film-led website for an interior design studio working on homes, cafés and boutiques.",
    details: [
      { label: "Client", value: "Windecor Interiors" },
      { label: "Role", value: "Web design & build" },
      { label: "Year", value: "2026" },
    ],
    sections: [
      {
        heading: "Spaces shaped by light and material",
        body: [
          "Windecor’s work is best understood on site, so the website is built around footage: selected projects filmed room by room, a studio reel, and a materials section for the details you touch.",
          "Services, process and an enquiry flow sit around the film, kept quiet so the interiors lead.",
        ],
      },
    ],
    link: { href: "https://windecor-interiors-website.vercel.app", label: "Visit the site" },
  },
  {
    slug: "habitual",
    title: "Habitual",
    category: "Product",
    year: "2025",
    icon: "habit",
    color: "#6d7350",
    image: habitual,
    summary: "A habit tracker that combines visual progress, data visualisation and an AI habit assistant.",
    details: [
      { label: "Type", value: "Personal product" },
      { label: "Role", value: "Product design & development" },
      { label: "Stack", value: "Next.js, React, TypeScript, Tailwind" },
    ],
    sections: [
      {
        heading: "Seeing consistency, not just recording it",
        body: [
          "Most habit tools record activity without helping people understand their consistency. Habitual brings tracking, visual feedback and an AI assistant into one focused product.",
        ],
      },
      {
        heading: "What’s in it",
        body: [
          "Interactive tracking, streaks, a contribution-style consistency heatmap and a responsive interface. It’s an active project, focused on making personal progress easier to see and act on.",
        ],
      },
    ],
    link: { href: "https://habitual-forge.vercel.app", label: "Open Habitual" },
    github: "https://github.com/cipherDev64/habitual",
  },
  {
    slug: "canvas-tetris",
    title: "Canvas Tetris",
    category: "Development",
    year: "2025",
    icon: "blocks",
    color: "#5f5e8f",
    image: canvasTetris,
    summary: "A playable Tetris with canvas rendering, responsive controls and complete game-state logic.",
    details: [
      { label: "Type", value: "Engineering study" },
      { label: "Role", value: "Design & development" },
      { label: "Stack", value: "React, Canvas API, Tailwind" },
    ],
    sections: [
      {
        heading: "Keeping input, rendering and state in sync",
        body: [
          "The challenge in a familiar game is the timing. The game loop, piece movement and collision behaviour were designed first, then the compact interface around them.",
          "Ghost pieces, hard and soft drop, pause and score tracking all work, and it’s playable in the browser.",
        ],
      },
    ],
    link: { href: "https://canvastetris.vercel.app", label: "Play it" },
    github: "https://github.com/cipherDev64/canvas-tetris",
  },
  {
    slug: "code-capsule",
    title: "Code Capsule",
    category: "Design",
    year: "2025",
    icon: "capsule",
    color: "#2c2c2a",
    image: codeCapsule,
    summary: "A technology blog concept designed so technical writing is easier to navigate and read.",
    details: [
      { label: "Type", value: "Concept" },
      { label: "Role", value: "Product & interface design" },
      { label: "Built with", value: "Framer" },
    ],
    sections: [
      {
        heading: "An easier way in",
        body: [
          "Technical content often gets dense before a reader finds a useful entry point. Code Capsule treats reading structure and information design as core features: editorial hierarchy, clear navigation and reusable story formats.",
        ],
      },
    ],
    link: { href: "https://codecapsule.framer.website", label: "Visit Code Capsule" },
  },
  {
    slug: "spark",
    title: "Spark",
    category: "Product",
    year: "2025",
    icon: "spark",
    color: "#6e4f63",
    image: spark,
    summary: "A place for students to showcase projects, find teammates and turn ideas into shipped work.",
    details: [
      { label: "Type", value: "Concept" },
      { label: "Role", value: "Concept & UX" },
      { label: "Stack", value: "Next.js, Supabase" },
    ],
    sections: [
      {
        heading: "Find your people, make something",
        body: [
          "Students with aligned interests don’t always have a clear way to find collaborators. Spark is organised around people and active projects: portfolios as proof, posting roles to find teammates, and events and hackathons.",
        ],
      },
    ],
    link: { href: "https://spark-community.vercel.app", label: "Visit Spark" },
  },
  {
    slug: "evidence-calibrated-memory",
    title: "Evidence-Calibrated Memory",
    category: "Research",
    year: "2026",
    icon: "memory",
    color: "#b3583a",
    summary: "An early research framework for making long-horizon AI agent memory more reliable.",
    details: [
      { label: "Type", value: "Research proposal" },
      { label: "Role", value: "Research & system design" },
      { label: "Status", value: "In progress" },
    ],
    sections: [
      {
        heading: "Memory as a revisable belief",
        body: [
          "Confidence, usage and recency alone can’t show whether an agent’s memory is supported, current or relevant. This framework treats each memory as a belief with evidence, provenance, validity, context and links to whatever contradicts it.",
        ],
      },
      {
        heading: "How it will be tested",
        body: [
          "Write, retrieval and forgetting policies are defined, then compared against confidence-based memory under a fixed budget, with a controlled stress test of false, stale, contradictory and out-of-scope memories.",
          "This is an early-stage proposal. Experiments and evaluation are still to come, and no outcome is claimed yet.",
        ],
      },
    ],
  },
];

export const workYears = "2025 — 2026";
