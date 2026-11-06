// Central, verified profile data. Every component reads links from here.
export const profile = {
  name: "Atulya Manikandan",
  firstName: "Atulya",
  initial: "A",
  city: "Bengaluru, IN",
  cityCode: "BLR",
  timeZone: "Asia/Kolkata",
  utcLabel: "GMT+5:30",
  venture: "Second Algorithm",
  ventureUrl: "https://secondalgorithm.space",
  bookCallUrl: "https://cal.com/secondalgorithm",
  links: {
    linkedin: "https://www.linkedin.com/in/atulya-manikandan/",
    github: "https://github.com/cipherDev64",
    email: "atulyamanikandan@gmail.com",
    instagram: "https://instagram.com/justitsatul",
  },
} as const;

export const mailto = `mailto:${profile.links.email}`;
