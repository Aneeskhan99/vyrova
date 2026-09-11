/**
 * All Services page copy (C-01).
 * Prices and turnaround figures are commitments — check them with Asim
 * before this page goes live.
 */

export const hero = {
  eyebrow: "Services",
  before: "One studio for",
  rotatingWords: ["motion", "websites", "software", "video"],
  after: "and everything around it.",
  intro:
    "Five services that share one motion system, so your video, your website and your product all feel like the same company.",
} as const;

export const items = [
  {
    number: "01",
    icon: "animation",
    name: "SaaS animation",
    headline: "Your product UI, rebuilt and animated",
    body: "Feature launches, onboarding flows, dashboards and release notes turned into 15 to 60 second clips that explain themselves. Pixel-accurate UI, real easing, sound design.",
    bullets: [
      "Feature launch clips",
      "Onboarding flows",
      "Dashboard walkthroughs",
      "App store and website loops",
    ],
    visual: "ui",
  },
  {
    number: "02",
    icon: "explainer",
    name: "Explainer videos",
    headline: "A 60 to 90 second story that sells",
    body: "Script, voiceover, storyboard and animation in one flow. For homepages, sales decks and ads.",
    bullets: [
      "Script and voice direction",
      "Storyboard sign off",
      "2D and UI hybrid animation",
      "Cutdowns for ads",
    ],
    visual: "story",
  },
  {
    number: "03",
    icon: "wordpress",
    name: "WordPress development",
    headline: "Marketing sites that load fast and move",
    body: "Custom builds, no bloated themes. Motion baked in with the same system as your videos.",
    bullets: [
      "Custom theme, no page builder",
      "Page speed above 90",
      "Motion components",
      "CMS training for your team",
    ],
    visual: "web",
  },
  {
    number: "04",
    icon: "software",
    name: "Software development",
    headline: "Web apps and internal tools, built to spec",
    body: "Next.js and Python teams for dashboards, portals, integrations and the tools your ops team keeps asking for.",
    bullets: [
      "Web apps",
      "Internal tools",
      "Integrations and APIs",
      "Maintenance retainers",
    ],
    visual: "code",
  },
  {
    number: "05",
    icon: "editing",
    name: "Video editing",
    headline: "Polish for the content you already shoot",
    body: "Cutdowns, captions, motion graphics and colour for social, YouTube and sales.",
    bullets: [
      "Social cutdowns",
      "Captions and graphics",
      "Colour and sound",
      "Monthly retainers",
    ],
    visual: "edit",
  },
] as const;

export const deliverables = {
  eyebrow: "Flagship · SaaS animation",
  title: "What lands in your inbox.",
  intro:
    "Every SaaS animation project ships as a kit, not a single file. The list appears one item at a time as you reach it.",
  formats: [
    "16:9 web",
    "9:16 social",
    "1:1 feed",
    "Lottie / Rive",
    "ProRes master",
    "Transparent WebM",
  ],
  items: [
    { title: "Master film", note: "60 to 90s, sound designed" },
    { title: "Feature clips ×6", note: "15 to 30s each, loopable" },
    { title: "Website hero loop", note: "Muted, under 3 MB" },
    { title: "Social cutdowns", note: "9:16 and 1:1 with captions" },
    { title: "Source files", note: "After Effects and Figma" },
    { title: "Usage rights", note: "Full ownership, forever" },
  ],
} as const;

export const packages = {
  eyebrow: "How to work with us",
  title: "Three ways in.",
  intro:
    "Fixed scope for one thing, a launch bundle, or a monthly retainer for teams that ship every week.",
  plans: [
    {
      name: "Single",
      summary: "One deliverable, fixed scope",
      cta: "Get a quote",
      featured: false,
      bullets: [
        "One video or one site",
        "Storyboard sign off",
        "Two revision rounds",
        "Delivery in 2 to 3 weeks",
      ],
    },
    {
      name: "Launch",
      summary: "Video, site and clips, one team",
      cta: "Most popular",
      featured: true,
      bullets: [
        "Product film plus 6 clips",
        "Landing page or full site",
        "Social cutdowns",
        "Priority slot, 4 weeks",
      ],
    },
    {
      name: "Retainer",
      summary: "Ongoing motion and development",
      cta: "Book a call",
      featured: false,
      bullets: [
        "Monthly clip and edit allowance",
        "Same day fixes",
        "Roadmap planning",
        "Cancel any month",
      ],
    },
  ],
} as const;

export const comparison = {
  title: "Versus the other options.",
  columns: ["Freelancers", "In house", "Us"],
  rows: [
    { label: "Video, web and software in one place", values: ["✕", "Maybe", "✓"] },
    { label: "First cut in 48 hours", values: ["Rarely", "✕", "✓"] },
    { label: "Pixel accurate UI recreation", values: ["Varies", "✓", "✓"] },
    { label: "Full ownership of source files", values: ["Sometimes", "✓", "✓"] },
    { label: "Fixed price, no surprises", values: ["✕", "✕", "✓"] },
  ],
} as const;
