import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { LazyVideo } from "@/components/motion/lazy-video";
import { TiltCard } from "@/components/motion/tilt-card";
import { UiMock } from "@/components/sections/shared/ui-mock";
import { cardLabels } from "@/content/site/work";
import { cn } from "@/lib/utils";

/** Placeholder cover tints until real project stills exist. */
const TINTS = [
  "from-cyan/30 to-accent/20",
  "from-indigo-200/60 to-indigo-300/40",
  "from-emerald-200/60 to-emerald-300/40",
  "from-amber-200/60 to-amber-300/40",
  "from-violet-200/60 to-violet-300/40",
] as const;

export type Project = {
  name: string;
  note: string;
  category: string;
  videoSrc?: string | null;
  /** A real screenshot, for work that is a site rather than a film. */
  image?: string | null;
  /** Live URL, or an internal route when `internal` is set. */
  href?: string | null;
  /** Route inside this site: same tab, and the cover morphs into the page. */
  internal?: boolean;
  /** The project's own colour, washed over the card on hover. */
  tint?: string | null;
  /** view-transition-name for the cover, shared with the project page. */
  vt?: string | null;
  /** Let the cover grow to fill the card (for a card spanning rows). */
  fill?: boolean;
};

/**
 * A project card that is all cover. The picture fills the card; the
 * words sit on a scrim at the foot. The card leans towards the cursor
 * (TiltCard), a glare crosses it, the cover eases larger, the project's
 * own colour glows under the edge, and the "open" label slides in.
 */
export function ProjectCard({
  name,
  note,
  category,
  videoSrc,
  image,
  href,
  internal = false,
  tint,
  vt,
  fill = false,
  index,
  showCategory = false,
  className,
}: Project & {
  index: number;
  showCategory?: boolean;
  className?: string;
}) {
  const fallbackTint = TINTS[index % TINTS.length];
  const external = Boolean(href) && !internal;
  const open = videoSrc ? cardLabels.play : external ? cardLabels.openExternal : cardLabels.openInternal;

  const card = (
    <TiltCard
      className={cn(
        "fw-project h-full overflow-hidden rounded-tile border border-line bg-ink shadow-card",
        className,
      )}
    >
      <article
        className={cn("relative flex h-full flex-col", fill ? "min-h-[24rem]" : "aspect-[4/3]")}
        style={tint ? ({ "--tint": tint } as CSSProperties) : undefined}
      >
        {/* cover */}
        <div className={cn("fw-project-cover absolute inset-0 bg-gradient-to-br", videoSrc || image ? "" : fallbackTint)}>
          {videoSrc ? (
            <LazyVideo src={videoSrc} playOn="hover" />
          ) : image ? (
            <img
              src={image}
              alt={`${name} — homepage`}
              loading="lazy"
              decoding="async"
              width={800}
              height={500}
              className="size-full object-cover object-top"
              style={vt ? { viewTransitionName: vt } : undefined}
            />
          ) : (
            <div className="flex size-full items-center justify-center p-7">
              <UiMock className="shadow-card" bars={8} highlight={index % 8} />
            </div>
          )}
        </div>

        {/* scrim and tint glow */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
        {tint ? <span aria-hidden="true" className="fw-project-edge pointer-events-none absolute inset-0 rounded-[inherit]" /> : null}

        {showCategory ? (
          <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-2.5 py-1 text-[0.6875rem] font-semibold text-ink backdrop-blur">
            {category}
          </span>
        ) : null}

        {/* foot */}
        <div className="relative mt-auto flex items-end justify-between gap-4 p-5 text-surface">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="fw-project-open flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-cyan">
              {videoSrc ? <Play className="size-3 fill-current" /> : null}
              {open}
            </span>
            <h3 className="truncate text-lg font-bold tracking-tight">{name}</h3>
            <p className="truncate text-[0.8125rem] text-surface/70">{note}</p>
          </div>
          <span className="fw-project-arrow grid size-10 shrink-0 place-items-center rounded-full bg-surface text-ink">
            {external ? (
              <ArrowUpRight aria-hidden="true" className="size-4" />
            ) : (
              <ArrowRight aria-hidden="true" className="size-4" />
            )}
          </span>
        </div>
      </article>
    </TiltCard>
  );

  if (!href) return card;

  if (internal) {
    return (
      <a href={href} aria-label={`${name} — open the project`} className="block h-full rounded-tile">
        {card}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — open the live site in a new tab`}
      className="block h-full rounded-tile"
    >
      {card}
    </a>
  );
}
