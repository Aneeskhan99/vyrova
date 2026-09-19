import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AutoRail } from "@/components/motion/auto-rail";
import { Container } from "@/components/layout/container";
import { LazyVideo } from "@/components/motion/lazy-video";
import { Reveal } from "@/components/motion/reveal";
import { work } from "@/content/site/home";
import { cn } from "@/lib/utils";

/**
 * Selected work as a shelf that slides sideways while the page scrolls
 * down. The section is a tall runway; inside it a viewport-height stage
 * is sticky; the track of cards translates from its start to its end on
 * the runway's view timeline, so the shelf moves exactly as far as you
 * scroll and no further. A progress bar under the heading is the same
 * timeline drawn as a line.
 *
 * Where scroll-driven animations are unsupported, and on phones, the
 * runway collapses and the track is a plain horizontal scroller with
 * snap points — the honest fallback, still the same cards.
 */
const ITEMS = [...work.rowOne, ...work.rowTwo];

export function Work() {
  return (
    <section id="work" className="fw-hs relative">
      <div className="fw-hs-runway">
        <div className="fw-hs-stage">
          <Container className="pb-6 pt-24 lg:pb-8 lg:pt-10">
            <Reveal>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                    {work.eyebrow}
                  </p>
                  <h2 className="text-[clamp(1.625rem,2.9vw,2.5rem)] font-bold tracking-[-0.025em]">
                    {work.title}
                  </h2>
                  <p className="max-w-[44ch] leading-relaxed text-muted">{work.intro}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="fw-hs-count hidden text-sm tabular-nums text-muted lg:block">
                    {String(ITEMS.length).padStart(2, "0")}
                  </span>
                  <a
                    href={work.cta.href}
                    className="inline-flex items-center gap-2 whitespace-nowrap text-[0.9375rem] font-semibold text-accent"
                  >
                    {work.cta.label}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </div>
              </div>
              <div className="mt-6 hidden h-px w-full bg-line lg:block">
                <span aria-hidden="true" className="fw-hs-bar block h-px w-full origin-left bg-accent" />
              </div>
            </Reveal>
          </Container>

          <AutoRail>
            <div className="fw-hs-scroller">
            <ul className="fw-hs-track">
              {ITEMS.map((item, i) => {
                const image = "image" in item ? item.image : null;
                const href = "href" in item ? item.href : null;
                const internal = "internal" in item ? item.internal : false;
                const tint = "tint" in item ? item.tint : null;
                const number = String(i + 1).padStart(2, "0");
                return (
                  <li
                    key={item.name}
                    className="fw-hs-card"
                    style={tint ? ({ "--tint": tint } as CSSProperties) : undefined}
                  >
                    <a
                      href={href ?? "/work/"}
                      target={href && !internal ? "_blank" : undefined}
                      rel={href && !internal ? "noopener noreferrer" : undefined}
                      aria-label={`${item.name} — ${item.note}`}
                      className="group relative block h-full overflow-hidden rounded-tile border border-line bg-ink shadow-lift"
                    >
                      <span className="absolute inset-0">
                        {item.videoSrc ? (
                          <LazyVideo src={item.videoSrc} playOn="hover" />
                        ) : image ? (
                          <img
                            src={image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            width={800}
                            height={500}
                            className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          />
                        ) : null}
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent"
                      />
                      <span className="absolute left-5 top-5 flex items-center gap-2">
                        <span className="rounded-full bg-surface/90 px-2.5 py-1 text-[0.6875rem] font-semibold text-ink">
                          {item.category}
                        </span>
                      </span>
                      <span className="absolute right-5 top-5 text-xs font-medium tabular-nums text-surface/70">
                        {number} {work.counterOf} {String(ITEMS.length).padStart(2, "0")}
                      </span>
                      <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-surface">
                        <span className="flex min-w-0 flex-col gap-1">
                          <span className="truncate text-[clamp(1.25rem,2vw,1.75rem)] font-bold tracking-tight">
                            {item.name}
                          </span>
                          <span className="truncate text-sm text-surface/75">{item.note}</span>
                        </span>
                        <span
                          className={cn(
                            "grid size-11 shrink-0 place-items-center rounded-full bg-surface text-ink",
                            "transition-transform duration-300 group-hover:-translate-y-1",
                          )}
                        >
                          {href && !internal ? (
                            <ArrowUpRight aria-hidden="true" className="size-5" />
                          ) : (
                            <ArrowRight aria-hidden="true" className="size-5" />
                          )}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            </div>
          </AutoRail>
        </div>
      </div>
    </section>
  );
}
