# FrameWell

Marketing site for FrameWell. Next.js 15 (App Router), TypeScript strict,
Tailwind 4, Motion. Static export — the build output is a plain folder of
HTML/CSS/JS that any host will serve.

## First run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build     # writes ./out
npx serve out     # preview the static output locally
```

## Before you commit

```bash
npm run typecheck
npm run lint
```

## Version pinning

`package.json` uses caret ranges so the first install resolves current
versions. **Commit `package-lock.json`** — that file is what actually pins
every version, including transitive ones. Never delete it.

## Deploying

The build produces `./out`. That folder works on Vercel, Cloudflare Pages,
Netlify, or any nginx/Apache box. No server runtime is required. Host has
not been chosen yet, so do not introduce anything that needs one — see
CLAUDE.md rules H-01 to H-04.

## Where things are

- `app/` — routes. Pages compose sections and export metadata, nothing else.
- `components/ui/` — vendored primitives. Do not edit except to swap tokens.
- `components/motion/` — our animation wrappers. Use these, don't hand-roll.
- `components/sections/` — one file per page section.
- `content/site/` — all copy. No text lives in components.
- `lib/motion.ts` — every duration and easing in the site.

Full conventions are in CLAUDE.md.
