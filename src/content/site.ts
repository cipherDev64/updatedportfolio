// Editable copy for the home page sections.

export const hero = {
  lead: "AI/ML engineer,",
  rest: "from model to",
  accent: "product.",
  tags: ["AI/ML", "Product design", "Front-end", "Co-founder, Second Algorithm"],
};

export const about = {
  statement: "I’m an AI/ML engineer and co-founder. I design products and build them myself —",
  muted: "from the model to the last pixel.",
  pillars: [
    { icon: "brain", title: "Think", body: "Models, agents and the systems around them." },
    { icon: "pen", title: "Design", body: "Interfaces and flows that make sense the first time." },
    { icon: "rocket", title: "Ship", body: "Live products, iterated on after launch.", accent: true },
  ],
} as const;

// Tools used day to day. Languages are deliberately not listed here.
export const toolbox = [
  "Claude",
  "Antigravity",
  "Wispr Flow",
  "Notion",
  "Figma",
  "Edits",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Supabase",
  "Firebase",
  "GitHub",
  "Vercel",
] as const;

export type Experience = { mark: string; org: string; role: string; period: string; now?: boolean; href?: string };

export const experience: Experience[] = [
  { mark: "SA", org: "Second Algorithm", role: "Co-founder", period: "2026 — Now", now: true, href: "https://secondalgorithm.space" },
  { mark: "FR", org: "FlyRank AI", role: "AI Intern", period: "2026" },
  { mark: "NH", org: "New Horizon College of Engineering", role: "Engineering student, AI/ML", period: "2023 — Now" },
];

export const contact = {
  availability: "Taking on projects with Second Algorithm",
  lead: "Let’s make",
  accent: "something useful.",
};
