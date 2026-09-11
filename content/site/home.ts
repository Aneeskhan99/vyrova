/**
 * All home page copy (C-01). Components read from here; no text is
 * written inside JSX. Edit this file to rewrite the page.
 */

export const hero = {
  headlineBefore: "We",
  rotatingWords: ["animate", "launch", "explain", "build"],
  headlineAfter: "software",
  headlineSecondLine: "so it sells itself.",
  subhead:
    "SaaS animation, explainer videos, WordPress and custom software, from one studio that treats motion as the product.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "Watch the showreel", href: "#showcase" },
  stats: [
    { value: 120, suffix: "+", label: "products animated" },
    { value: 5, suffix: "", label: "services, one studio" },
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
    { label: "Rive", file: "rive", ring: "inner", scale: 1 },
    { label: "WordPress", file: "wordpress", ring: "outer", scale: 1 },
    { label: "Next.js", file: "nextjs", ring: "outer", scale: 1 },
    { label: "DaVinci Resolve", file: "resolve", ring: "outer", scale: 1 },
  ],
} as const;

export const logos = {
  title: "Trusted by product teams at",
  names: ["Nimbus", "Ledgerly", "Orbitals", "Quanta", "Hexa", "Northwind", "Pulse"],
} as const;

export const services = {
  eyebrow: "Services",
  title: "Five services.\nOne motion-first studio.",
  intro:
    "Everything a software company needs to look as sharp as it ships, without juggling five vendors.",
  items: [
    {
      title: "SaaS animation",
      body: "Product UI brought to life: feature launches, onboarding flows and dashboards animated so they explain themselves in seconds.",
      featured: true,
    },
    {
      title: "Explainer videos",
      body: "Script, voice, storyboard and animation for a 60 to 90 second story that sells the product.",
      featured: false,
    },
    {
      title: "WordPress development",
      body: "Fast, custom-built marketing sites and stores. No bloated themes.",
      featured: false,
    },
    {
      title: "Software development",
      body: "Web apps, internal tools and integrations built to spec.",
      featured: false,
    },
    {
      title: "Video editing",
      body: "Cutdowns, social edits and polish for content you already shoot.",
      featured: false,
    },
  ],
} as const;

export const integrations = {
  eyebrow: "How we plug in",
  title: "Your tools in, finished work out.",
  intro:
    "Send us what you already have. You get back a kit, not a single file.",
  inputs: [
    { label: "Figma", note: "design files" },
    { label: "Screenshots", note: "of your product" },
    { label: "A Loom", note: "or a call" },
    { label: "Brand kit", note: "fonts and colours" },
  ],
  outputs: [
    { label: "Product film", note: "60 to 90s" },
    { label: "SaaS animation", note: "feature clips" },
    { label: "Website", note: "WordPress or custom" },
    { label: "Cutdowns", note: "social and ads" },
  ],
} as const;

export const showcase = {
  eyebrow: "SaaS animation",
  title: "Scroll, and the screen tilts up on your product.",
  intro:
    "The section you are looking at is the service. If a studio cannot make its own site move, be suspicious of the reel.",
  captions: [
    { title: "Feature launches", note: "30 to 60s, motion-led" },
    { title: "Onboarding flows", note: "Step-by-step UI animation" },
    { title: "Dashboards", note: "Live data, animated" },
  ],
} as const;

export const work = {
  eyebrow: "Selected work",
  title: "Rows drift as you scroll.",
  intro: "Eight of the last forty eight. Hover any card to play it.",
  cta: { label: "See all work", href: "/work" },
  rowOne: [
    { name: "Ledgerly", note: "SaaS animation · feature launch", category: "SaaS animation" },
    { name: "Nimbus", note: "Product film · 75s", category: "Explainer" },
    { name: "Orbitals", note: "WordPress site + explainer", category: "WordPress" },
    { name: "Quanta", note: "Onboarding flow animation", category: "SaaS animation" },
  ],
  rowTwo: [
    { name: "Hexa", note: "Dashboard walkthrough", category: "Explainer" },
    { name: "Northwind", note: "Custom web app + edits", category: "Software" },
    { name: "Pulse", note: "30 social cutdowns", category: "Editing" },
    { name: "Atlas", note: "Explainer video · 60s", category: "Explainer" },
  ],
} as const;

export const process = {
  eyebrow: "Process",
  title: "From brief to first cut in 48 hours.",
  steps: [
    {
      number: "01",
      icon: "brief",
      day: "Day 1",
      title: "Brief",
      body: "A 30 minute call. We learn the product, the audience and the one thing the video must make people feel.",
    },
    {
      number: "02",
      icon: "script",
      day: "Day 1 to 3",
      title: "Script + board",
      body: "Script, voice direction and a storyboard you approve before a single frame moves.",
    },
    {
      number: "03",
      icon: "animate",
      day: "Day 3 to 9",
      title: "Animate",
      body: "UI recreated at pixel level, then animated with real easing, depth and sound.",
    },
    {
      number: "04",
      icon: "deliver",
      day: "Day 10",
      title: "Deliver",
      body: "Master file plus cutdowns for web, social and sales decks. Revisions included.",
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
  title: "Questions we get\nbefore every project.",
  intro: "Anything else, the form below goes straight to a human.",
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
  primary: { label: "Start a project", href: "mailto:hello@framewell.com" },
  secondary: { label: "hello@framewell.com", href: "mailto:hello@framewell.com" },
} as const;
