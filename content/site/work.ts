/**
 * All Work page copy (C-01).
 *
 * Every project below is placeholder content until real client work is
 * cleared for publication. The stats are illustrative and must be
 * replaced with measured figures or removed before launch (C-04).
 */

export const hero = {
  eyebrow: "Selected work",
  title: "Products we made\nimpossible to scroll past.",
  intro:
    "Forty eight projects across SaaS animation, explainer video, WordPress, custom software and editing. Filter by service, or just scroll.",
} as const;

export const FILTERS = [
  "All",
  "SaaS animation",
  "Explainer",
  "WordPress",
  "Software",
  "Editing",
] as const;

export const featured = {
  name: "Ledgerly",
  tags: ["SaaS animation", "Product film"],
  body: "A 75 second launch film plus six feature clips for a finance dashboard, delivered in 12 days.",
  stats: [
    { value: 38, prefix: "+", suffix: "%", decimals: 0, label: "trial signups" },
    { value: 2.4, prefix: "", suffix: "M", decimals: 1, label: "video views" },
    { value: 12, prefix: "", suffix: "", decimals: 0, label: "days to deliver" },
  ],
  cta: { label: "View case study", href: "/work" },
} as const;

export const projects = [
  { name: "Nimbus", note: "Product film · 75s", category: "Explainer" },
  { name: "Orbitals", note: "Marketing site + explainer", category: "WordPress" },
  { name: "Quanta", note: "Onboarding flow animation", category: "SaaS animation" },
  { name: "Hexa", note: "Dashboard walkthrough", category: "Explainer" },
  { name: "Northwind", note: "Internal tool + edits", category: "Software" },
  { name: "Pulse", note: "30 social cutdowns", category: "Editing" },
  { name: "Atlas", note: "Explainer · 60s", category: "Explainer" },
  { name: "Ledgerly", note: "Six feature clips", category: "SaaS animation" },
  { name: "Cartogram", note: "Map product launch film", category: "SaaS animation" },
  { name: "Bellhop", note: "Booking site rebuild", category: "WordPress" },
  { name: "Sightline", note: "Analytics portal", category: "Software" },
  { name: "Rally", note: "Conference sizzle reel", category: "Editing" },
] as const;

export const compare = {
  eyebrow: "Before / after",
  title: "Drag the handle. Same product, our motion.",
  intro:
    "Left is the screenshot a founder sent us. Right is what went on the homepage two weeks later.",
  beforeLabel: "Before",
  afterLabel: "After",
} as const;

export const results = {
  title: "What changed for them.",
  items: [
    { value: "+38%", label: "trial signups" },
    { value: "2.4M", label: "views" },
    { value: "12 days", label: "delivery" },
    { value: "+61%", label: "demo requests" },
    { value: "9.4/10", label: "client score" },
    { value: "48h", label: "first cut" },
    { value: "+27%", label: "conversion" },
    { value: "0", label: "missed deadlines" },
  ],
} as const;
