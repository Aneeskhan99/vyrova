import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { Reveal } from "@/components/motion/reveal";
import { LOOP } from "@/lib/motion";
import {
  designCover,
  designProjects,
  wall,
} from "@/content/site/design-projects";
import { cn } from "@/lib/utils";

/**
 * The Wall, as a drafting table. Every delivered design lies on one tilted
 * plane in three rows that drift at their own speeds, the middle one the
 * other way. As the section scrolls into view the plane stands up towards
 * the reader (a scroll-driven keyframe on transform), and a hovered card
 * lifts off the table along its Z axis and comes into colour.
 *
 * All of it is CSS: perspective on the stage, preserve-3d down the tree,
 * the fw-marquee loop per row, transform and opacity only (M-01). The
 * loop needs one copy of a row wider than the plane, so each half of the
 * track holds the row twice.
 *
 * Only the first copy of each cover carries a view-transition-name: names
 * must be unique per document.
 */
const ROWS = 3;
const ROW_SPEED = [LOOP.marqueeSlow, LOOP.marqueeSlow * 1.25, LOOP.marqueeSlow * 0.9] as const;

export function Wall() {
  const per = Math.ceil(designProjects.length / ROWS);
  const rows = Array.from({ length: ROWS }, (_, r) =>
    designProjects.slice(r * per, (r + 1) * per),
  );

  return (
    <section className="overflow-hidden border-y border-line bg-band py-14 lg:py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {wall.eyebrow}
              </p>
              <h2 className="whitespace-nowrap text-[clamp(1.5rem,2.7vw,2.5rem)] font-bold tracking-[-0.025em] max-sm:whitespace-normal">
                {wall.title}
              </h2>
            </div>
          </div>
        </Reveal>
      </Container>

      <PauseOffscreen className="fw-stage mt-8 lg:mt-4">
        <div className="fw-plane">
          {rows.map((row, r) => (
            <div
              key={r}
              className={cn("fw-wall-row fw-pause-hover", r === 1 && "is-reverse")}
              style={
                {
                  "--dur": `${ROW_SPEED[r] ?? LOOP.marqueeSlow}s`,
                  "--phase": `${-r * 0.37}`,
                } as CSSProperties
              }
            >
              <div data-marquee-track className="flex w-max gap-5 pr-5">
                {[0, 1, 2, 3].map((copy) =>
                  row.map((p) => (
                    <a
                      key={`${p.slug}-${copy}`}
                      href={`/work/${p.slug}/`}
                      aria-label={`${p.client} — ${p.sector}`}
                      tabIndex={copy === 0 ? 0 : -1}
                      aria-hidden={copy !== 0}
                      className="fw-wall-card group relative block w-[13rem] shrink-0 rounded-card border border-line bg-surface shadow-card sm:w-[16rem] xl:w-[18rem]"
                      style={{ "--tint": p.palette[0] } as CSSProperties}
                    >
                      <span className="relative block aspect-[8/5] overflow-hidden rounded-t-card">
                        <img
                          src={designCover(p.slug)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          width={800}
                          height={500}
                          className="size-full object-cover object-top"
                          style={copy === 0 ? { viewTransitionName: `vy-${p.slug}` } : undefined}
                        />
                        <img
                          src={designCover(p.slug)}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          width={800}
                          height={500}
                          className="fw-wall-grey absolute inset-0 size-full object-cover object-top"
                        />
                        <span
                          aria-hidden="true"
                          className="fw-wall-open absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[0.6875rem] font-semibold text-surface"
                        >
                          {wall.open}
                          <ArrowUpRight className="size-3" />
                        </span>
                      </span>
                      <span className="flex items-center justify-between gap-3 px-4 py-3">
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate text-sm font-semibold">{p.client}</span>
                          <span className="truncate text-xs text-muted">{p.sector}</span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="size-2.5 shrink-0 rounded-full"
                          style={{ background: p.palette[0] }}
                        />
                      </span>
                    </a>
                  )),
                )}
              </div>
            </div>
          ))}
        </div>
      </PauseOffscreen>

      <Container>
        <Reveal className="-mt-4 lg:-mt-14">
          <a
            href={wall.cta.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-ink"
          >
            {wall.cta.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
