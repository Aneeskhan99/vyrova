/**
 * All Process page copy (C-01).
 * The day ranges and the guarantees are promises to clients — check
 * them with Asim before this page goes live.
 */

export const hero = {
  eyebrow: "Process",
  title: "Brief on Monday.\nFirst cut by Wednesday.",
  intro:
    "Six steps, no surprises. You approve the story before we animate a single frame, and you see a real cut within 48 hours of sign off.",
  primary: { label: "Start a project", href: "#contact" },
  secondary: { label: "See the packages", href: "/services#packages" },
  counter: { value: 48, suffix: "h", label: "to first cut" },
} as const;

export const steps = [
  {
    number: "01",
    day: "Day 1",
    title: "Brief call",
    body: "Thirty minutes. The product, the audience, and the one thing the video has to make people feel. We record it so nothing gets lost in translation.",
    gets: ["Kickoff form", "Access to the product", "Brand kit collected"],
  },
  {
    number: "02",
    day: "Day 1 to 2",
    title: "Script and voice",
    body: "A tight script and two voice options. You pick one, we lock it. Nothing moves until the words are right.",
    gets: ["Script v1", "Voice samples", "Music direction"],
  },
  {
    number: "03",
    day: "Day 2 to 3",
    title: "Storyboard",
    body: "Every shot, sketched. This is the last moment where changing the story is cheap, so this is the approval that matters most.",
    gets: ["12 to 20 frames", "Timing map", "Your sign off"],
  },
  {
    number: "04",
    day: "Day 3 to 5",
    title: "First cut",
    body: "Real UI, real motion, temporary sound. Within 48 hours of storyboard sign off, you are watching the thing rather than imagining it.",
    gets: ["Rough animation", "Temp voice and music", "Review link"],
  },
  {
    number: "05",
    day: "Day 5 to 9",
    title: "Polish",
    body: "Easing, depth, sound design and colour. Two revision rounds are included here, and most projects never need the second.",
    gets: ["Final animation", "Sound design", "Revision rounds 1 and 2"],
  },
  {
    number: "06",
    day: "Day 10",
    title: "Delivery",
    body: "Master file plus every cutdown, the source files, and a 30 day window for small fixes.",
    gets: ["Master and cutdowns", "Source files", "30 days of support"],
  },
] as const;

export const week = {
  eyebrow: "A typical project",
  title: "Ten working days, brief to master.",
  intro:
    "Longer projects stretch the polish phase, never the wait for the first cut.",
  phases: [
    { name: "Set up", tone: "setup" },
    { name: "Approve", tone: "approve" },
    { name: "Build", tone: "build" },
    { name: "Ship", tone: "ship" },
  ],
  days: [
    { day: "Mon", work: "Brief", phase: 0 },
    { day: "Tue", work: "Script", phase: 0 },
    { day: "Wed", work: "Board", phase: 1 },
    { day: "Thu", work: "First cut", phase: 1 },
    { day: "Fri", work: "Review", phase: 1 },
    { day: "Mon", work: "Polish", phase: 2 },
    { day: "Tue", work: "Polish", phase: 2 },
    { day: "Wed", work: "Sound", phase: 2 },
    { day: "Thu", work: "Revisions", phase: 2 },
    { day: "Fri", work: "Deliver", phase: 3 },
  ],
} as const;

export const tools = {
  eyebrow: "Tools",
  title: "Your stack, our stack, one pipeline.",
  intro:
    "Design in Figma, animate in After Effects and Rive, edit in Resolve, ship in Next.js or WordPress. Everything versioned, everything handed over at the end.",
  names: [
    "Figma",
    "After Effects",
    "Rive",
    "Lottie",
    "Resolve",
    "Premiere",
    "Next.js",
    "React",
    "Tailwind",
    "WordPress",
    "Python",
    "Postgres",
    "Vercel",
    "GitHub",
    "Notion",
    "Loom",
  ],
} as const;

export const guarantees = {
  title: "Three promises, in writing.",
  items: [
    {
      value: "48h",
      headline: "First cut, or the storyboard phase is free",
      body: "Counted in working days from your storyboard sign off.",
    },
    {
      value: "2",
      headline: "Revision rounds included",
      body: "At storyboard and at first cut. Extra rounds are priced up front, never sprung on you afterwards.",
    },
    {
      value: "100%",
      headline: "Ownership of every file",
      body: "Masters, source files, fonts and licences. No hostage files, ever.",
    },
  ],
} as const;
