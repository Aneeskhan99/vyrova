/**
 * The website UI/UX portfolio: fifteen sites designed in Figma and delivered
 * to clients, exported as full-length page designs.
 *
 * Every field here is read off the delivered design itself — the headline is
 * the hero headline as designed, the note describes what is visibly on the
 * page, the palette is sampled from the cover. Nothing is a claim about
 * results. Add `live` when a client's site is public and cleared to link.
 *
 * Images live in public/work/design/<slug>-{cover,full}.webp:
 *   cover  800 x 500, the top of the page, for cards and the Wall
 *   full   1200 wide, the whole page, for the scrolling browser frame
 */

export type DesignProject = {
  slug: string;
  client: string;
  sector: string;
  place?: string;
  headline: string;
  note: string;
  /** Three colours sampled from the design, darkest-to-lightest not required. */
  palette: readonly [string, string, string];
  /** Height of the full-length export at 1200px wide. Drives the scroll frame. */
  fullHeight: number;
  live?: string;
};

export const DESIGN_KIND = "Website UI/UX" as const;
export const DESIGN_TOOL = "Figma" as const;

export const designProjects: readonly DesignProject[] = [
  {
    slug: "arrys",
    client: "Arry's",
    sector: "Roofing contractor",
    place: "Santa Rosa, CA",
    headline: "Top Rated Metal Roofing Contractors Santa Rosa CA",
    note: "Lead-generation site: phone number in the header, a quote form in the hero, services and testimonials below.",
    palette: ["#cf342e", "#192c43", "#fec629"],
    fullHeight: 8394,
  },
  {
    slug: "asian-wok",
    client: "Asian Wok",
    sector: "Restaurant chain",
    place: "Pakistan",
    headline: "Reserve Your Table Today",
    note: "Dark, photo-led restaurant site with a reservation call to action, menu, gallery and an order button in the header.",
    palette: ["#c9352a", "#48382b", "#f2efe9"],
    fullHeight: 4636,
  },
  {
    slug: "canadian-association",
    client: "Canadian Association",
    sector: "Community organisation",
    headline: "Together We Build Stronger Communities",
    note: "Non-profit site with programmes, a donate action and a four-figure impact strip directly under the hero.",
    palette: ["#fa1f1f", "#13344a", "#515150"],
    fullHeight: 10720,
  },
  {
    slug: "drip-pro",
    client: "Drip Pro",
    sector: "Home services",
    headline: "Reliable Solutions For Your Home & Business",
    note: "Services company with a contact form sitting inside the hero, so a visitor can book without scrolling.",
    palette: ["#1d4fa8", "#165b67", "#e5e2dc"],
    fullHeight: 4399,
  },
  {
    slug: "gte",
    client: "GTE",
    sector: "Electronics e-commerce",
    headline: "Ezviz Smart Floodlight CCTV camera",
    note: "Storefront with category navigation, a featured product with price, and a new arrivals grid of security and lighting products.",
    palette: ["#0d4b24", "#eac049", "#aeafb0"],
    fullHeight: 3159,
  },
  {
    slug: "ignite",
    client: "Ignite",
    sector: "Startup portal",
    place: "Pakistan",
    headline: "Igniting Innovation",
    note: "Portal for startups, investors and incubators with a startup directory, investor directory, events and analytics in the navigation.",
    palette: ["#162648", "#e8a53a", "#f7e7cf"],
    fullHeight: 7410,
  },
  {
    slug: "japanos",
    client: "JAPANOS",
    sector: "Restaurant",
    place: "Dubai",
    headline: "Dubai's Go-To For Japanese Goodness",
    note: "Restaurant site with a full-bleed interior photograph, a bento section, a reservation button and online ordering.",
    palette: ["#fc821a", "#141a25", "#665851"],
    fullHeight: 3945,
  },
  {
    slug: "live-band-tipping",
    client: "LiveBand Tipping",
    sector: "App landing page",
    headline: "Stream your band playing & get tips!",
    note: "Product landing page for a mobile app: phone mockups in the hero, store badges, pricing and a growth statement below.",
    palette: ["#f1244c", "#141927", "#c69fa9"],
    fullHeight: 5454,
  },
  {
    slug: "lux-a-porter",
    client: "Lux a Porter",
    sector: "Footwear e-commerce",
    headline: "Lace-Up Casual Italian Shoes For Men",
    note: "Men's footwear store with a product-led hero, a brand logo strip and featured categories.",
    palette: ["#cbb494", "#0e0e0e", "#f5f5f5"],
    fullHeight: 3454,
  },
  {
    slug: "maxline",
    client: "Maxline",
    sector: "Beauty e-commerce",
    headline: "Perfecting Nail Veil",
    note: "Beauty storefront with a two-image product hero, a shop-now action and a new arrivals row of nail products.",
    palette: ["#542316", "#c6abc2", "#e4dbdc"],
    fullHeight: 4469,
  },
  {
    slug: "novikov",
    client: "Novikov",
    sector: "Restaurant & lounge",
    place: "Miami",
    headline: "Experience Elegance",
    note: "Dark, editorial restaurant site: a serif wordmark over a full-bleed photograph, with the brand's gold sitting on near-black.",
    palette: ["#251a17", "#b08d57", "#eae9e8"],
    fullHeight: 4373,
  },
  {
    slug: "patco",
    client: "Patco",
    sector: "Software & IT services",
    place: "Pakistan · Azerbaijan",
    headline: "Empowering Innovation Together.",
    note: "Services company site with a two-country positioning, solutions navigation and a secondary headline section.",
    palette: ["#561a09", "#906d37", "#162314"],
    fullHeight: 6353,
  },
  {
    slug: "real-estate",
    client: "Real Invest",
    sector: "Real estate investment",
    headline: "Doin the Due With the Diligence",
    note: "Investment company site with a property image cluster, a three-figure proof strip and a partner logo row.",
    palette: ["#391da4", "#2e99a9", "#d8e3ec"],
    fullHeight: 4439,
  },
  {
    slug: "turkish-dunyasi",
    client: "Turkish Dunyasi",
    sector: "Trade organisation",
    headline: "Bridging the Turkish World Trade, Innovation & Shared Prosperity",
    note: "Membership organisation site with members, commissions, brands and a consultation action, over a portrait hero.",
    palette: ["#d6b48c", "#1b2524", "#f7f5f2"],
    fullHeight: 4673,
  },
  {
    slug: "yellow-lockers",
    client: "Yellow Lockers",
    sector: "Luggage storage",
    place: "Corfu",
    headline: "Leave your luggage. Live the island.",
    note: "Booking site for self-service luggage lockers: a bright yellow hero, a book-now action and a benefits row under it.",
    palette: ["#fee58d", "#41bc9f", "#474746"],
    fullHeight: 5804,
  },
] as const;

export const designHero = {
  eyebrow: "Website UI/UX",
  title: "Fifteen sites, designed in Figma, shipped to clients.",
  intro:
    "Every page below is the design as delivered, full length. Scroll a project and the site scrolls inside its frame.",
} as const;

export const designDetail = {
  backLabel: "All work",
  kindLabel: "Designed in",
  sectorLabel: "Sector",
  placeLabel: "Where",
  paletteLabel: "Palette",
  frameHint: "Scroll to move through the page",
  openLive: "Open the live site",
  nextLabel: "Next project",
} as const;

export const wall = {
  eyebrow: "Design work",
  title: "Fifteen websites. Every one of them real.",
  open: "Open design",
  cta: { label: "See all design work", href: "/work?filter=design" },
} as const;

export function designBySlug(slug: string): DesignProject | undefined {
  return designProjects.find((p) => p.slug === slug);
}

export function designCover(slug: string): string {
  return `/work/design/${slug}-cover.webp`;
}

export function designFull(slug: string): string {
  return `/work/design/${slug}-full.webp`;
}

/** The client's own logo, cut from the delivered design. Transparent PNG. */
export function clientLogo(slug: string): string {
  return `/logos/clients/${slug}.png`;
}
