# Tool logos for the hero orbit

The site renders whatever `.svg` sits at each filename below, so changing a
logo is a straight file swap — no code edit.

## Getting the real, full-colour logos

Run **`Get FrameWell Logos.bat`** on the Desktop. It downloads all six in
one go: full colour from Devicon where available, and Simple Icons with the
brand's own hex applied as a fallback. Nothing is installed, and it can be
re-run any time.

It has to run on Windows rather than from Claude, because neither the cloud
sandbox nor the Linux bridge is allowed out to a CDN.

Until it runs, the files here are **placeholders** — generic glyphs, not
brand marks — so the page is never broken.

| File                | Tool                |
| ------------------- | ------------------- |
| `figma.svg`         | Figma               |
| `after-effects.svg` | Adobe After Effects |
| `premiere.svg`      | Adobe Premiere Pro  |
| `wordpress.svg`     | WordPress           |
| `nextjs.svg`        | Next.js             |
| `react.svg`         | React               |

`rive.svg` and `resolve.svg` are left over from an earlier set and are not
used. Rive and DaVinci Resolve have no reliable full-colour SVG on either
source; to feature them, download from rive.app and Blackmagic's press kit
by hand and add them back in `content/site/home.ts`.

To swap a single logo by hand instead: download the official SVG, save it
over the file of the same name here, refresh.

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
