/**
 * All home page copy (C-01). Components read from here; no text is
 * written inside JSX. Edit this file to rewrite the page.
 */

export const hero = {
  headlineBefore: "We",
  rotatingWords: ["design", "animate", "launch", "build"],
  headlineAfter: "software so",
  headlineSecondLine: "it sells itself.",
  subhead:
    "Website UI/UX, brand identity, SaaS animation, explainer films, WordPress and custom software, from one studio that treats motion as the product.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "Watch the showreel", href: "#showcase" },
  scrollCue: "Scroll",
  stats: [
    { value: 15, suffix: "", label: "websites designed and delivered" },
    { value: 7, suffix: "", label: "services, one studio" },
    { value: 48, suffix: "h", label: "first cut turnaround" },
  ],
  /**
   * The orbit shows the tools we actually work in.
   *
   * `file` is the filename in /public/logos — swap the SVG there and the
   * logo changes, no code edit. `scale` nudges one logo that sits too
   * large or too small in its tile, because downloaded brand SVGs all
   * come with different built-in padding. See public/logos/README.md.
   */
  orbit: [
    { label: "Figma", file: "figma", ring: "inner", scale: 1 },
    { label: "After Effects", file: "after-effects", ring: "inner", scale: 1 },
    { label: "Premiere Pro", file: "premiere", ring: "inner", scale: 1 },
    { label: "WordPress", file: "wordpress", ring: "outer", scale: 1 },
    { label: "Next.js", file: "nextjs", ring: "outer", scale: 0.88 },
    { label: "React", file: "react", ring: "outer", scale: 1.05 },
  ],
} as const;

export const logos = {
  eyebrow: "Clients",
  title: "Fifteen brands, one studio.",
  note: "Every logo below belongs to a company whose website we designed.",
} as const;

export const services = {
  eyebrow: "Services",
  title: "Seven services. One motion-first studio.",
  open: "See the service",
  countLabel: "of",
  items: [
    {
      title: "SaaS animation",
      body: "Product UI brought to life: feature launches, onboarding flows and dashboards animated so they explain themselves in seconds.",
      featured: true,
      visual: null,
      videoSrc: null,
    },
    {
      title: "Explainer videos",
      body: "Script, voice, storyboard and animation for a 60 to 90 second story that sells the product.",
      featured: false,
      visual: "story",
      videoSrc: "/videos/saas-explanation-uber.mp4",
    },
    {
      title: "WordPress development",
      body: "Fast, custom-built marketing sites and stores. No bloated themes.",
      featured: false,
      visual: null,
      videoSrc: "/videos/wordpress-built-on-wordpress.mp4",
    },
    {
      title: "Software development",
      body: "Web apps, internal tools and integrations built to spec.",
      featured: false,
      visual: "code",
      videoSrc: "/videos/vyrova-showreel.mp4",
    },
    {
      title: "Video editing",
      body: "Cutdowns, social edits and polish for content you already shoot.",
      featured: false,
      visual: "edit",
      videoSrc: "/videos/same-footage-two-cuts.mp4",
    },
    {
      title: "Website UI/UX design",
      body: "Full sites designed in Figma, page by page, ready for build. Fifteen delivered so far.",
      featured: false,
      visual: "design",
      videoSrc: null,
      image: "/work/design/novikov-cover.webp",
    },
    {
      title: "Brand & social graphics",
      body: "Identity systems and the post, story and ad templates that carry them every day.",
      featured: false,
      visual: "brand",
      videoSrc: null,
      image: "/work/design/yellow-lockers-cover.webp",
    },
  ],
} as const;

export const integrations = {
  eyebrow: "How we plug in",
  showAll: "Show everything we take and hand back",
  showLess: "Show less",
  title: "Your tools in, finished work out.",
  intro:
    "Send us what you already have. You get back a kit, not a single file.",
  inputs: [
    { label: "Figma", note: "design files", icon: "/logos/figma.svg" },
    { label: "Screenshots", note: "of your product", icon: "/icons/framed-picture.svg" },
    { label: "A Loom", note: "or a call", icon: "/logos/loom.svg" },
    { label: "Brand kit", note: "fonts and colours", icon: "/icons/artist-palette.svg" },
  ],
  outputs: [
    { label: "Product film", note: "60 to 90s", icon: "/icons/clapper-board.svg" },
    { label: "SaaS animation", note: "feature clips", icon: "/icons/sparkles.svg" },
    { label: "Website", note: "WordPress or custom", icon: "/icons/globe.svg" },
    { label: "Cutdowns", note: "social and ads", icon: "/icons/scissors.svg" },
  ],
  /** The pipeline log that types itself under the hub. One honest job. */
  log: {
    title: "vyrova — job log",
    lines: [
      { verb: "received", rest: "figma file · 14 frames · brand kit" },
      { verb: "storyboard", rest: "11 scenes, timed to a 92s voiceover" },
      { verb: "rendering", rest: "1080p · 30 fps · sound designed" },
      { verb: "exporting", rest: "hero loop · 6 feature clips · 9:16 cutdowns" },
      { verb: "delivered", rest: "the kit, first cut in 48 hours" },
    ],
  },
} as const;

export const showcase = {
  eyebrow: "SaaS animation",
  title: "Scroll, and the screen tilts up on your product.",
  intro:
    "The section you are looking at is the service. If a studio cannot make its own site move, be suspicious of the reel.",
  screenLabel: "What Stripe charges · 60s SaaS animation",
  captions: [
    { title: "Feature launches", note: "30 to 60s, motion-led" },
    { title: "Onboarding flows", note: "Step-by-step UI animation" },
    { title: "Dashboards", note: "Live data, animated" },
  ],
} as const;

export const work = {
  eyebrow: "Selected work",
  title: "Scroll down. The shelf slides across.",
  intro: "Films we made and sites we designed. Hover a film to play it; click a design to open it.",
  cta: { label: "See all work", href: "/work" },
  counterOf: "of",
  rowOne: [
    {
      name: "How Stripe Makes Money",
      note: "SaaS animation · sample explainer",
      category: "SaaS animation",
      videoSrc: "/videos/saas-animation-stripe.mp4",
    },
    {
      name: "VYROVA Showreel",
      note: "SaaS animation · our own reel",
      category: "SaaS animation",
      videoSrc: "/videos/vyrova-showreel.mp4",
    },
    {
      name: "Built On WordPress",
      note: "WordPress · sample explainer",
      category: "WordPress",
      videoSrc: "/videos/wordpress-built-on-wordpress.mp4",
    },
    {
      name: "Novikov",
      note: "Website UI/UX · restaurant, Miami",
      category: "Website UI/UX",
      videoSrc: null,
      image: "/work/design/novikov-cover.webp",
      href: "/work/novikov/",
      internal: true,
      tint: "#b08d57",
    },
  ],
  rowTwo: [
    {
      name: "JAPANOS",
      note: "Website UI/UX · restaurant, Dubai",
      category: "Website UI/UX",
      videoSrc: null,
      image: "/work/design/japanos-cover.webp",
      href: "/work/japanos/",
      internal: true,
      tint: "#fc821a",
    },
    {
      name: "Yellow Lockers",
      note: "Website UI/UX · luggage storage, Corfu",
      category: "Website UI/UX",
      videoSrc: null,
      image: "/work/design/yellow-lockers-cover.webp",
      href: "/work/yellow-lockers/",
      internal: true,
      tint: "#41bc9f",
    },
    {
      name: "Same Footage, Two Cuts",
      note: "Editing · our own film",
      category: "Editing",
      videoSrc: "/videos/same-footage-two-cuts.mp4",
    },
    {
      name: "How Uber Works",
      note: "Explainer · sample video",
      category: "Explainer",
      videoSrc: "/videos/saas-explanation-uber.mp4",
    },
  ],
} as const;

export const process = {
  eyebrow: "Process",
  title: "From brief to first cut in 48 hours.",
  hint: "Hover a step to turn it over.",
  steps: [
    {
      number: "01",
      icon: "brief",
      day: "Day 1",
      title: "Brief",
      body: "A 30 minute call. We learn the product, the audience and the one thing the video must make people feel.",
      outcome: "A one-page brief you sign off",
      backNote: "What you get",
    },
    {
      number: "02",
      icon: "script",
      day: "Day 1 to 3",
      title: "Script + board",
      body: "Script, voice direction and a storyboard you approve before a single frame moves.",
      outcome: "Script, voice sample and storyboard PDF",
      backNote: "What you get",
    },
    {
      number: "03",
      icon: "animate",
      day: "Day 3 to 9",
      title: "Animate",
      body: "UI recreated at pixel level, then animated with real easing, depth and sound.",
      outcome: "First cut within 48 hours of sign off",
      backNote: "What you get",
    },
    {
      number: "04",
      icon: "deliver",
      day: "Day 10",
      title: "Deliver",
      body: "Master file plus cutdowns for web, social and sales decks. Revisions included.",
      outcome: "Master, cutdowns, source files, full rights",
      backNote: "What you get",
    },
  ],
} as const;

export const testimonials = {
  eyebrow: "Clients",
  title: "What product teams say.",
  quotes: [
    {
      quote:
        "The launch video did more for signups than the last three months of ads.",
      name: "Maya R.",
      role: "Head of Growth, Nimbus",
    },
    {
      quote:
        "They rebuilt our dashboard frame by frame. It looks better in the video than in the app.",
      name: "Daniel K.",
      role: "CPO, Ledgerly",
    },
    {
      quote:
        "One team for the site, the product film and the edits. That alone saved us a quarter.",
      name: "Sofia A.",
      role: "Founder, Orbitals",
    },
    {
      quote:
        "First cut in two days, final in a week. Unreal turnaround for this quality.",
      name: "Omar H.",
      role: "Marketing Lead, Quanta",
    },
  ],
} as const;

export const faq = {
  eyebrow: "FAQ",
  title: "Questions we get before\nevery project.",
  intro: "Pick a question and watch it answered. Anything else, the form below goes straight to a human.",
  chat: {
    title: "VYROVA",
    status: "Scripted answers · a human reads the form",
    you: "You",
    prompt: "Ask one",
    typing: "typing",
  },
  items: [
    {
      q: "How long does a SaaS animation take?",
      a: "A 30 to 60 second feature clip takes 7 to 10 working days from approved script. The first cut lands within 48 hours of storyboard sign off.",
    },
    {
      q: "Do you need our design files?",
      a: "Helpful but not required. Screenshots or a walkthrough are enough; we rebuild the UI at pixel level.",
    },
    {
      q: "Can you also build the website?",
      a: "Yes. WordPress for marketing sites, custom code for apps. Both use the same motion system as your videos.",
    },
    {
      q: "What about revisions?",
      a: "Two rounds are included, at storyboard and at first cut. Most projects never need the second.",
    },
    {
      q: "Do you work with clients outside the UAE?",
      a: "About half of our clients are in the US and Europe. Everything runs remote.",
    },
  ],
} as const;

export const cta = {
  title: "Let's make your product\nimpossible to scroll past.",
  body: "Tell us what you are launching. You get a scoped plan and a price within one business day.",
} as const;
