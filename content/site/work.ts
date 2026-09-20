/**
 * All Work page copy (C-01).
 *
 * Every project below is placeholder content until real client work is
 * cleared for publication. The stats are illustrative and must be
 * replaced with measured figures or removed before launch (C-04).
 */

export const hero = {
  eyebrow: "Selected work",
  title: "Products we made impossible to scroll past.",
  intro:
    "Fifteen websites designed and delivered to clients, one built end to end, and the films we make to show how we work. Every design opens full length."
} as const;

/** Labels on the project cards' hover state. */
export const cardLabels = {
  openInternal: "Open project",
  openExternal: "Open live site",
  play: "Hover to play",
} as const;

/** The index of every project, and the preview that reads alongside it. */
export const index = {
  eyebrow: "The index",
  filterLabel: "Filter projects by service",
  hint: "Hover a line to see the work",
  play: "Watch the film",
  tapHint: "Tap once to preview, again to open",
  of: "of",
  empty: "Nothing filed under this service yet.",
} as const;

export const FILTERS = [
  "All",
  "Website UI/UX",
  "SaaS animation",
  "Explainer",
  "WordPress",
  "Software",
  "Editing",
] as const;

/** `?filter=<key>` in the URL preselects a tab. */
export const FILTER_QUERY = {
  design: "Website UI/UX",
  animation: "SaaS animation",
  explainer: "Explainer",
  wordpress: "WordPress",
  software: "Software",
  editing: "Editing",
} as const satisfies Record<string, (typeof FILTERS)[number]>;

export const featured = {
  name: "VYROVA Showreel",
  tags: ["SaaS animation", "Product film"],
  body: "Our own reel. Fifty three seconds of kinetic typography, live interface animation and 2.5D product motion, every frame drawn in code.",
  // Real numbers about the film itself, not invented client results.
  stats: [
    { value: 53, prefix: "", suffix: "s", decimals: 0, label: "run time" },
    { value: 10, prefix: "", suffix: "", decimals: 0, label: "scenes" },
    { value: 1080, prefix: "", suffix: "p", decimals: 0, label: "at 30 fps" },
  ],
  videoSrc: "/videos/vyrova-showreel.mp4",
  cta: { label: "See how we work", href: "/process" },
  eyebrow: "Our own reel",
  /** The ten scenes of the finished cut, in seconds. Click one to jump. */
  scenes: [
    { at: 0, label: "Hook", line: "Your software deserves more." },
    { at: 5.5, label: "Promise", line: "Complex software, clear visuals." },
    { at: 9, label: "Product animation", line: "A dashboard, moving." },
    { at: 14.5, label: "Systems", line: "Make complex systems simple." },
    { at: 20.5, label: "Complex to clear", line: "Nine windows become one." },
    { at: 27, label: "Business", line: "Built for the way business moves." },
    { at: 34, label: "Idea to experience", line: "From idea to experience." },
    { at: 40, label: "Services", line: "SaaS, AI, web, product, explainer." },
    { at: 46, label: "Payoff", line: "We make software amazing." },
    { at: 50, label: "End card", line: "Let's build something worth watching." },
  ],
  controls: {
    play: "Play",
    pause: "Pause",
    unmute: "Sound on",
    mute: "Sound off",
    scenesLabel: "Scenes",
    sceneHint: "Click a frame to jump",
  },
} as const;

export const projects = [
  {
    name: "Brands Concept",
    note: "WordPress · signage company, UAE",
    category: "WordPress",
    image: "/work/brandsconcept/01-hero.jpg",
    href: "https://brandsconcept.ae/",
  },
  {
    name: "VYROVA Showreel",
    note: "SaaS animation · our own reel",
    category: "SaaS animation",
    videoSrc: "/videos/vyrova-showreel.mp4",
  },
  {
    name: "Same Footage, Two Cuts",
    note: "Editing · our own film",
    category: "Editing",
    videoSrc: "/videos/same-footage-two-cuts.mp4",
  },
  {
    name: "Built On WordPress",
    note: "WordPress · sample explainer",
    category: "WordPress",
    videoSrc: "/videos/wordpress-built-on-wordpress.mp4",
  },
  {
    name: "How Uber Works",
    note: "Explainer · sample video",
    category: "Explainer",
    videoSrc: "/videos/saas-explanation-uber.mp4",
  },
  {
    name: "How Stripe Makes Money",
    note: "SaaS animation · sample explainer",
    category: "SaaS animation",
    videoSrc: "/videos/saas-animation-stripe.mp4",
  },
] as const;

/**
 * The first real client build on this site. Every number below is checked
 * against the live site, not estimated: six service pages, twelve projects
 * in its portfolio, and a hand-built theme at wp-content/themes/brandsconcept
 * with no page builder in the asset chain.
 */
export const caseStudy = {
  eyebrow: "Client work · WordPress",
  client: "Brands Concept",
  legal: "Brands Concept FZC",
  url: "https://brandsconcept.ae/",
  host: "brandsconcept.ae",
  sector: "Signage, printing and branding · Sharjah, UAE",
  /** Their brand red, sampled off the live site. The section borrows it. */
  accent: "#D40B01",
  title: "A signage company that had to look as sharp as the work it installs.",
  body:
    "Brands Concept designs, fabricates and installs physical branding across the UAE, from a 300 mm reception logo to a 40 metre hoarding. Their site had to carry photographs of real installations at full bleed, route six different services to their own pages, and get a visitor to a quote in one tap. Built on WordPress with a custom theme, no page builder.",
  facts: [
    { label: "Platform", value: "WordPress, custom theme" },
    { label: "Service pages", value: "Six, one per discipline" },
    { label: "Portfolio", value: "Twelve installed projects" },
    { label: "Quote path", value: "Form plus one-tap WhatsApp" },
  ],
  built: [
    "Custom theme written for the brand, not a marketplace template",
    "Photo-led layouts that hold up at full bleed on a phone",
    "Six service pages under one Services menu",
    "A twelve project portfolio, filterable by discipline",
    "Quote CTA in the header, the hero and the footer",
    "Arabic and English content sitting together in one layout",
  ],
  shots: [
    { src: "/work/brandsconcept/01-hero.jpg", label: "Home", note: "We build brands you can touch." },
    { src: "/work/brandsconcept/02-services.jpg", label: "Services", note: "Six disciplines, six pages." },
    { src: "/work/brandsconcept/03-work.jpg", label: "Work", note: "Twelve installed projects." },
    { src: "/work/brandsconcept/04-materials.jpg", label: "Materials", note: "What the work is made of." },
  ],
  cta: { label: "Open the live site", note: "Opens brandsconcept.ae in a new tab" },
} as const;

export const compare = {
  eyebrow: "Before / after",
  title: "Drag the handle. It moves through time, not space.",
  // No invented client story here. The claim is about the category, and the
  // clip proving it is our own work.
  intro:
    "Most product pages are a screenshot with a button underneath. This is five seconds of ours: nine tangled windows collapsing into the one screen that mattered.",
  src: "/videos/vyrova-showreel.mp4",
  // The Complex -> Clear beat of the showreel, in finished-cut seconds.
  start: 21.4,
  end: 27.2,
  beforeLabel: "Complex",
  afterLabel: "Clear",
  hint: "Drag, or let it run",
} as const;
