// Editable copy for the dossier, pinboard and margins.

export const venture = {
  statement:
    "Second Algorithm is the venture I’m co-founding: a place for turning ambitious product ideas into useful systems, experiments, and shipped work.",
  body: [
    "It is a small, independent studio in Bengaluru. We design and build websites, brand identities and the automations that sit behind them, and we make all of it ourselves.",
    "The working rule is simple: start from the problem, not from a template. Treat code as a material with its own grain. Use AI where it does real work, not where it decorates a pitch.",
  ],
  exploring: [
    { label: "Digital experiences", note: "Websites and web apps with an editorial point of view." },
    { label: "Product & interface design", note: "Flows that make sense the first time." },
    { label: "Brand & creative direction", note: "Identities that hold up across a whole system." },
    { label: "AI & automation", note: "Booking, routing and back-office work that runs quietly." },
  ],
  /** Keep this list honest: confirmed work only, explorations labelled as such. */
  workingOn: [
    { label: "Client websites with booking built in", tag: "ongoing" },
    { label: "The studio’s own site and identity", tag: "ongoing" },
    { label: "An internal agent pipeline for briefs and scaffolding", tag: "exploration" },
  ],
} as const;

export const pinboard = {
  personalNote:
    "I like projects that begin as a question, become a prototype, break a little, and eventually turn into something useful.",
  notes: [
    { id: "venture", title: "Building Second Algorithm", body: "Most days start and end here." },
    { id: "memory", title: "AI systems & agent memory", body: "What should an agent remember, and when should it forget?" },
    { id: "ideas", title: "Exploring product ideas", body: "A notebook of half-ideas, waiting for the good one." },
    { id: "interface", title: "Studying interface design", body: "Why some screens feel obvious and others don’t." },
    { id: "public", title: "Learning in public", body: "Small projects, shipped before they feel ready." },
  ],
} as const;

export const margins = {
  statement:
    "I’m interested in the point where technical possibility meets human behavior: not just whether something works, but whether it makes sense to use.",
  notes: [
    { label: "Based in", value: "Bengaluru, India" },
    { label: "Studying", value: "Engineering at New Horizon College of Engineering" },
    { label: "Focus", value: "AI/ML, product development, interaction and visual systems" },
    { label: "Interested in", value: "AI systems, product design, and building useful things" },
  ],
  offTheClock: [
    "story-driven games",
    "keyboards & music",
    "the gym",
    "creative side projects",
    "late-night experiments",
  ],
} as const;
