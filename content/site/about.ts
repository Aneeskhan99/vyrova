/**
 * All About page copy (C-01).
 *
 * ⚠ NEEDS ASIM'S SIGN OFF BEFORE LAUNCH (C-04).
 * The founding story below says FrameWell grew out of an in-house team
 * built for the group's own computer and ITAD businesses. That is the
 * angle I was told about but never got confirmed — correct it or cut it.
 * Every number in `numbers` is illustrative. Replace with real counts or
 * delete the section; do not ship invented figures.
 */

export const hero = {
  eyebrow: "About",
  title: "We built this studio\nfor our own products first.",
  intro:
    "FrameWell started as the in-house team for a group of computer and ITAD businesses. Websites, software and product videos, all made for our own companies, where a bad result costs us rather than a client. We opened it up because the work kept getting asked for.",
} as const;

export const story = {
  eyebrow: "How we got here",
  title: "Four things that shaped the studio.",
  chapters: [
    {
      marker: "01",
      title: "We were the client",
      body: "Every site and every video we made first had our own name on it. That is a different kind of pressure to agency work: nobody signs off on a weak launch film when it is their own product launching. The standard we set then is the one we still work to.",
    },
    {
      marker: "02",
      title: "One team, not five freelancers",
      body: "Script, design, animation, sound and code sit together. A storyboard change does not mean re-briefing a stranger, and a product video and the page it lands on are built by people who talk to each other daily.",
    },
    {
      marker: "03",
      title: "Motion stopped being decoration",
      body: "The moment a demo video started outperforming every other thing on the page, animation went from a nice extra to the centre of what we do. Most of our work now starts with the question of what has to move and why.",
    },
    {
      marker: "04",
      title: "We opened the doors",
      body: "Other founders kept asking who made our videos. Rather than keep answering that in DMs, we made it a service. Same team, same standard, now pointed at your product.",
    },
  ],
} as const;

export const numbers = {
  title: "Where we are today.",
  stats: [
    { value: 48, suffix: "", label: "projects shipped" },
    { value: 9, suffix: "", label: "people on the team" },
    { value: 5, suffix: "", label: "services under one roof" },
    { value: 10, suffix: " days", label: "typical brief to master" },
  ],
} as const;

export const principles = {
  eyebrow: "How we work",
  title: "Four rules we do not bend.",
  items: [
    {
      number: "01",
      title: "Story before motion",
      body: "Nothing gets animated until the script and the storyboard are approved. Beautiful animation of a confusing idea is still a confusing video, and it costs ten times more to fix at the end.",
    },
    {
      number: "02",
      title: "Show the real product",
      body: "We animate your actual interface, not a generic dashboard with your logo on it. If the UI is not ready, we design what it will be and hand you those files too.",
    },
    {
      number: "03",
      title: "You own everything",
      body: "Masters, source files, project files, fonts and licences, handed over at the end of every project. No file is held to keep you coming back.",
    },
    {
      number: "04",
      title: "Prices before work",
      body: "Scope, rounds and cost agreed in writing before anything starts. Extra rounds are priced up front, never invoiced as a surprise.",
    },
  ],
} as const;

export const team = {
  eyebrow: "The team",
  title: "Nine people, five disciplines.",
  intro:
    "Small enough that the person who animated your video is the person who answers your email about it.",
  roles: [
    { role: "Motion direction", discipline: "Animation", icon: "clapper" },
    { role: "UI and brand design", discipline: "Design", icon: "pen" },
    { role: "Front end and product", discipline: "Engineering", icon: "code" },
    { role: "Script and narrative", discipline: "Writing", icon: "text" },
    { role: "Sound and voice", discipline: "Audio", icon: "mic" },
    { role: "Edit and finishing", discipline: "Video", icon: "scissors" },
  ],
} as const;

export const studio = {
  eyebrow: "Where we are",
  title: "Dubai, which turns out to be the useful part.",
  body:
    "Our working day overlaps the European morning and the US East Coast afternoon, so feedback left overnight is usually answered before you open your laptop. Everything runs async by default: review links, written notes, recorded walkthroughs. Calls only when a call is genuinely faster.",
  clocks: [
    { city: "Dubai", zone: "Asia/Dubai", home: true },
    { city: "London", zone: "Europe/London", home: false },
    { city: "New York", zone: "America/New_York", home: false },
  ],
  facts: [
    { label: "Based in", value: "Dubai, UAE" },
    { label: "Working hours", value: "09:00 to 18:00 GST" },
    { label: "Reply window", value: "Within one working day" },
  ],
} as const;
