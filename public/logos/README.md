# Tool logos (hero orbit + Process "Your stack" marquee)

The site renders whatever `.svg` sits at each filename below, so changing a
logo is a straight file swap — no code edit.

## Current set (all real brand marks)

| File                | Tool                | Colour source                          |
| ------------------- | -------------------- | --------------------------------------- |
| `figma.svg`         | Figma                 | Devicon, full colour                   |
| `after-effects.svg` | Adobe After Effects   | Devicon, full colour                   |
| `premiere.svg`      | Adobe Premiere Pro    | Devicon, full colour                   |
| `wordpress.svg`     | WordPress             | Devicon, full colour                   |
| `nextjs.svg`        | Next.js               | Devicon, full colour                   |
| `react.svg`         | React                 | Devicon, full colour                   |
| `loom.svg`          | Loom                  | Simple Icons, brand hex #625DF5        |
| `resolve.svg`       | DaVinci Resolve       | Simple Icons, brand hex #233A51        |
| `rive.svg`          | Rive                  | Simple Icons, brand hex #1D1D1D        |
| `lottie.svg`        | Lottie (LottieFiles)  | Simple Icons, brand hex #00DDB3        |
| `tailwind.svg`      | Tailwind CSS          | Simple Icons, brand hex #06B6D4        |
| `python.svg`        | Python                | Devicon, full colour                   |
| `postgres.svg`      | PostgreSQL            | Devicon, full colour                   |
| `vercel.svg`        | Vercel                | Simple Icons, brand hex #000000        |
| `github.svg`        | GitHub                | Simple Icons, brand hex #181717        |
| `notion.svg`        | Notion                | Simple Icons, brand hex #000000        |

All 16 were fetched from `raw.githubusercontent.com` (devicon and
simple-icons repos, both allowlisted) directly from a Claude session — that
host turned out to be reachable even though most CDNs (npm, jsdelivr,
unpkg, Google Fonts) are not. `Get FrameWell Logos.bat` on the Desktop still
works as a manual fallback if a file ever needs re-fetching from Windows
instead.

To swap a single logo by hand: download the official SVG, save it over the
file of the same name here, refresh.

## Two things to get right before launch

**Size and padding.** Downloaded logos come in wildly different viewBoxes,
some with built-in padding and some without. If one looks too big or too
small in its tile, don't edit the component — set `scale` for that entry in
`content/site/home.ts` (hero orbit), which is what it is there for. The
Process page marquee pills don't have a scale knob yet; resize the SVG
itself if one ever looks off there.

**Permission.** Showing tool logos to say "this is our stack" is normal and
widely done, but it is not automatically allowed. WordPress, Next.js,
React, GitHub, Python, PostgreSQL and Tailwind CSS have permissive marks.
**Adobe's guidelines restrict using their product icons in material that
promotes your own services** — Blackmagic (DaVinci Resolve), Figma, Notion
and Vercel each have their own conditions too. Check each brand's
guidelines before this page goes live, and drop any tool whose terms you
would rather not argue about. The layout works fine with four.
