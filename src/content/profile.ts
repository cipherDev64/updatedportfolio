// Central, verified profile data. Every component reads links from here —
// never hard-code a URL elsewhere.
export const profile = {
  name: "Atulya Manikandan",
  location: "Bengaluru, India",
  venture: "Second Algorithm",
  ventureUrl: "https://secondalgorithm.space",
  links: {
    linkedin: "https://www.linkedin.com/in/atulya-manikandan/",
    github: "https://github.com/cipherDev64",
    email: "atulyamanikandan@gmail.com",
    instagram: "https://instagram.com/justitsatul",
  },
} as const;

export const mailto = `mailto:${profile.links.email}`;

/** Shown on the desk's introduction note. Update when the archive changes. */
export const lastUpdated = "October 2026";

export const sections = [
  { id: "desk", label: "Desk" },
  { id: "work", label: "Work" },
  { id: "second-algorithm", label: "Second Algorithm", short: "2nd Algo" },
  { id: "now", label: "Now" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
