# Tool logos for the hero orbit

Every `.svg` in this folder is a **placeholder** I drew — a generic glyph,
not a brand mark. The site renders whatever file sits at each filename, so
replacing a logo is a straight file swap. Nothing in the code changes.

## How to swap one in

1. Download the official SVG for the tool.
2. Save it over the file of the same name in this folder.
3. Refresh. That's it.

| File                | Tool             | Where to get the official SVG |
| ------------------- | ---------------- | ----------------------------- |
| `figma.svg`         | Figma            | Figma's brand/press page, or simpleicons.org |
| `after-effects.svg` | Adobe After Effects | Adobe brand portal — see the note below |
| `rive.svg`          | Rive             | rive.app brand assets, or simpleicons.org |
| `wordpress.svg`     | WordPress        | wordpress.org/about/logos — freely licensed |
| `nextjs.svg`        | Next.js          | nextjs.org, or the Vercel design resources page |
| `resolve.svg`       | DaVinci Resolve  | Blackmagic Design's brand/press kit |

**simpleicons.org** is the fastest route for most of these: search the
tool, download the SVG, done. The paths there are CC0, and each icon page
links out to that brand's own usage guidelines.

## Two things to get right before launch

**Size and padding.** Downloaded logos come in wildly different viewBoxes,
some with built-in padding and some without. If one looks too big or too
small in its tile, don't edit the component — set `scale` for that entry in
`content/site/home.ts`, which is what it is there for.

**Permission.** Showing tool logos to say "this is our stack" is normal and
widely done, but it is not automatically allowed. WordPress, Next.js and
React have permissive marks. **Adobe's guidelines restrict using their
product icons in material that promotes your own services** — Blackmagic
and Figma have their own conditions too. Check each brand's guidelines
before this page goes live, and drop any tool whose terms you would rather
not argue about. The layout works fine with four.
