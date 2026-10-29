// Open Files: the Second Algorithm work archive.
//
// Every entry below is drawn from the studio’s own published material on
// secondalgorithm.space (Selected Work, Studio Philosophy, Services). Metrics
// and testimonials published there are deliberately left out: add them back
// only once they can be verified. Fields that are omitted are not rendered.

export type ArtifactKind = "website" | "identity" | "brief" | "mobile" | "schedule" | "system";

export type ArchiveEntry = {
  id: string;
  file: string;
  title: string;
  kind: ArtifactKind;
  /** One line, shown on the artifact itself. */
  summary: string;
  discipline: string;
  period?: string;
  status: string;
  context?: string;
  problem?: string;
  contribution?: string;
  approach?: string;
  medium?: string[];
  deliverables?: string[];
  note?: string;
  link?: { href: string; label: string };
  source: string;
};

const studioSite = "secondalgorithm.space";

export const archive: ArchiveEntry[] = [
  {
    id: "studio-site",
    file: "SA-01",
    title: "secondalgorithm.space",
    kind: "website",
    summary: "The studio’s own front door, built as an argument against templates.",
    discipline: "Website design · Web engineering",
    status: "Live",
    context:
      "Second Algorithm describes itself as an independent studio designing and building websites, brand identities and the automations behind them, all made in-house.",
    problem:
      "A studio that argues against generic, template-built websites needs a site that demonstrates the point instead of claiming it.",
    contribution:
      "Art direction, copy, interface design and front-end engineering for the studio’s public site.",
    approach:
      "Editorial, asymmetric layout with a fluid type scale, a serif and sans pairing with mono annotations, and small interaction details rather than page-builder effects.",
    medium: ["TypeScript", "Custom CSS", "Newsreader", "Instrument Sans", "Space Mono"],
    deliverables: ["Studio website", "Services and process pages", "Booking route via cal.com"],
    link: { href: "https://secondalgorithm.space", label: "Open secondalgorithm.space" },
    source: studioSite,
  },
  {
    id: "studio-identity",
    file: "SA-02",
    title: "The Anti-Template charter",
    kind: "identity",
    summary: "A lowercase wordmark, three typefaces and a written charter.",
    discipline: "Branding · Creative direction",
    status: "In use",
    context:
      "The studio’s identity is set out as a short charter, published on the site as ‘The Anti-Template Manifesto’.",
    approach:
      "Three working principles shape the identity: intentional asymmetry and fluid type; code treated as a physical material; and automation that does real work behind the interface.",
    medium: ["Wordmark", "Type system", "Editorial voice"],
    deliverables: ["Lowercase ‘second algorithm’ wordmark", "Type pairing", "Studio charter and pillars"],
    note: "The identity is still evolving alongside the studio’s work.",
    source: studioSite,
  },
  {
    id: "urban-premium-coworks",
    file: "SA-03",
    title: "Urban Premium Coworks",
    kind: "brief",
    summary: "Workspace booking portal and an automated member flow.",
    discipline: "Digital experience · Booking system",
    period: "2025 – 2026",
    status: "Listed as live",
    context:
      "A coworking operator wanted a digital presence that matched the feel of its physical spaces.",
    contribution:
      "An end-to-end site combining space previews, self-serve desk and meeting-room booking, and automated pass delivery for members.",
    deliverables: ["Website", "Desk and room booking flow", "Automated pass delivery"],
    source: `${studioSite} · Selected Work`,
  },
  {
    id: "nailashes",
    file: "SA-04",
    title: "Nailashes",
    kind: "mobile",
    summary: "A beauty brand’s flagship site and multi-outlet appointment booking.",
    discipline: "Digital identity · Appointment booking",
    period: "2025",
    status: "Listed as live",
    context: "A nail, lash and beauty studio with more than one outlet.",
    contribution:
      "A redesigned digital identity and a bespoke appointment booking flow, designed mobile-first.",
    deliverables: ["Digital identity refresh", "Flagship website", "Appointment booking flow"],
    source: `${studioSite} · Selected Work`,
  },
  {
    id: "nsalon",
    file: "SA-05",
    title: "NSalon",
    kind: "schedule",
    summary: "A grooming web app with real-time chair allocation.",
    discipline: "Web app · Scheduling",
    period: "2024 – 2025",
    status: "Listed as live",
    context: "A hair and grooming business that needed a contemporary site and a simple way to manage bookings.",
    approach:
      "A high-contrast, brutalist-modern visual direction paired with a lightweight client scheduling dashboard.",
    deliverables: ["Website", "Scheduling dashboard", "Chair allocation view"],
    source: `${studioSite} · Selected Work`,
  },
  {
    id: "studio-lab",
    file: "SA-06",
    title: "Autonomous Intelligence Lab",
    kind: "system",
    summary: "An internal pipeline for the studio’s own operations.",
    discipline: "AI systems · Automation",
    period: "2026",
    status: "Active R&D",
    context:
      "An internal research project rather than client work: the studio is building tooling to run parts of its own process.",
    problem:
      "Early project stages — reading a brief, estimating scope, setting up design tokens and scaffolding code — repeat on every engagement.",
    approach:
      "A multi-agent pipeline that parses incoming briefs, drafts a scope estimate, generates brand tokens and scaffolds starter code.",
    medium: ["Agents", "Python", "Design tokens"],
    note: "Exploratory and in progress. No outcome is claimed here.",
    source: `${studioSite} · Selected Work`,
  },
];
