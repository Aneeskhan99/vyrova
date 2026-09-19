/**
 * All Services page copy (C-01).
 * Prices and turnaround figures are commitments — check them with Asim
 * before this page goes live.
 */

export const hero = {
  eyebrow: "Services",
  before: "One studio for",
  rotatingWords: ["design", "motion", "websites", "software", "video"],
  after: "and everything around it.",
  intro:
    "Seven services that share one design system, so your site, your video, your brand and your product all feel like the same company."
} as const;

/** The editor shown for software development: it types itself. */
export const codeSample = {
  file: "quote.ts",
  status: "Build passed · deployed",
  lines: [
    "export async function quote(brief: Brief) {",
    "  const scope = await plan(brief);",
    "  const price = estimate(scope);",
    "  const eta = firstCutIn(48, \"hours\");",
    "  return deliver({ scope, price, eta });",
    "}",
  ],
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
    videoSrc: "/videos/vyrova-showreel.mp4",
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
    videoSrc: "/videos/saas-animation-stripe.mp4",
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
    videoSrc: "/videos/wordpress-built-on-wordpress.mp4",
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
    videoSrc: null,
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
    videoSrc: "/videos/same-footage-two-cuts.mp4",
  },
  {
    number: "06",
    icon: "design",
    name: "Website UI/UX design",
    headline: "Every page designed before a line is built",
    body: "Full websites designed in Figma, page by page, at real content length. Fifteen delivered to clients across hospitality, e-commerce, services and community organisations.",
    bullets: [
      "Full-length page designs in Figma",
      "Desktop and mobile layouts",
      "Component library for the build",
      "Handover to WordPress or custom code",
    ],
    visual: "design",
    videoSrc: null,
    image: "/work/design/novikov-cover.webp",
  },
  {
    number: "07",
    icon: "brand",
    name: "Brand & social graphics",
    headline: "An identity, and the templates that keep it alive",
    body: "Logo and identity systems, then the post, story and ad templates your team uses every day so the brand looks the same on the tenth week as the first.",
    bullets: [
      "Logo and visual identity",
      "Brand guidelines",
      "Social post and story templates",
      "Campaign and ad creative",
    ],
    visual: "brand",
    videoSrc: null,
    image: "/work/design/yellow-lockers-cover.webp",
  },
] as const;

export const deliverables = {
  eyebrow: "Flagship · SaaS animation",
  title: "What lands in your inbox.",
  intro:
    "Every SaaS animation project ships as a kit, not a single file. Scroll, and the kit unpacks in front of you.",
  inboxTitle: "Delivery",
  inboxNote: "6 files · one link",
  delivered: "Delivered",
  kinds: ["MP4", "MP4 ×6", "WEBM", "MP4 · SRT", "AEP · FIG", "PDF"],
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
  badge: "Most teams start here",
  spotlightHint: "Move your cursor across the cards",
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
  intro: "Five things that decide whether a launch is calm or chaotic.",
  scoreLabel: "out of 5",
  columns: ["Freelancers", "In house", "Us"],
  rows: [
    { label: "Video, web and software in one place", values: ["✕", "Maybe", "✓"] },
    { label: "First cut in 48 hours", values: ["Rarely", "✕", "✓"] },
    { label: "Pixel accurate UI recreation", values: ["Varies", "✓", "✓"] },
    { label: "Full ownership of source files", values: ["Sometimes", "✓", "✓"] },
    { label: "Fixed price, no surprises", values: ["✕", "✕", "✓"] },
  ],
} as const;
