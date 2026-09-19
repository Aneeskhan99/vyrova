import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { story, storyLabels } from "@/content/site/about";

/**
 * The four chapters as one stack of pages. The section is a tall runway
 * with a sticky stage that fills the viewport: a full-height rail on the
 * left (heading, chapter index, progress) and the page stack on the
 * right. As you scroll, the top page lifts and turns away (rotateX
 * around its top edge) to reveal the next, and the matching index row
 * lights up. Every slice is driven by the runway's view timeline.
 * Without support the pages simply stack as a list.
 */
export function Story() {
  const n = story.chapters.length;
  const total = String(n).padStart(2, "0");

  return (
    <section className="fw-book relative border-t border-line bg-surface">
      <div className="fw-book-runway relative" style={{ "--n": n } as CSSProperties}>
        <div className="fw-book-stage">
          <Container className="w-full py-10 lg:py-10">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-stretch lg:gap-16">
              <Reveal className="fw-book-rail relative flex flex-col lg:pr-12">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                    {story.eyebrow}
                  </p>
                  <h2 className="mt-3 whitespace-pre-line text-[clamp(1.375rem,2.8vw,2.375rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                    {story.title}
                  </h2>
                </div>

                <ol className="fw-book-index mt-10 hidden flex-1 flex-col justify-center gap-1 lg:flex">
                  {story.chapters.map((chapter, i) => (
                    <li
                      key={chapter.marker}
                      className="fw-book-idx relative flex items-baseline gap-3 py-2 pl-4"
                      style={{ "--i": i, "--n": n } as CSSProperties}
                    >
                      <span
                        aria-hidden="true"
                        className="fw-book-idx-bar absolute inset-y-1 left-0 w-0.5 origin-top rounded-full bg-accent"
                      />
                      <span className="text-[0.6875rem] font-semibold tabular-nums tracking-[0.14em] text-muted">
                        {chapter.marker}
                      </span>
                      <span className="text-[0.9375rem] leading-snug">{chapter.title}</span>
                    </li>
                  ))}
                </ol>

                <span
                  aria-hidden="true"
                  className="fw-book-spine absolute inset-y-0 right-0 hidden w-px overflow-hidden bg-line lg:block"
                >
                  <span className="fw-book-spine-fill absolute inset-0 origin-top bg-accent" />
                </span>

                <div className="mt-10 hidden lg:block">
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <span className="relative h-1 w-40 overflow-hidden rounded-full bg-line">
                      <span className="fw-book-bar absolute inset-y-0 left-0 w-full origin-left rounded-full bg-accent" />
                    </span>
                    <span className="tabular-nums">
                      <span className="font-semibold text-ink">{total}</span> {storyLabels.chapterOf} {total}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-muted">{storyLabels.scrollHint}</p>
                </div>
              </Reveal>

              <ol className="fw-book-pages relative">
                {story.chapters.map((chapter, i) => (
                  <li
                    key={chapter.marker}
                    className="fw-book-page"
                    style={{ "--i": i, "--n": n } as CSSProperties}
                  >
                    <article className="relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-ground p-5 pb-4 shadow-lift lg:min-h-[24rem] lg:p-12">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-accent">
                          {chapter.marker}
                        </span>
                        <span className="text-xs tabular-nums text-muted">
                          {chapter.marker} {storyLabels.chapterOf} {total}
                        </span>
                      </div>
                      <h3 className="mt-4 text-[1.125rem] font-semibold leading-tight tracking-[-0.02em] lg:mt-6 lg:text-[clamp(1.375rem,2.4vw,2rem)]">
                        {chapter.title}
                      </h3>
                      <p className="mt-3 max-w-[54ch] flex-1 text-[0.875rem] leading-relaxed text-muted lg:mt-4 lg:text-[1.0625rem]">
                        {chapter.body}
                      </p>
                      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4 text-[0.6875rem] uppercase tracking-[0.14em] text-muted lg:mt-8 lg:pt-5 lg:text-xs">
                        <span className="h-px w-8 bg-accent" />
                        {storyLabels.reading} {chapter.marker}
                      </div>
                      <span
                        aria-hidden="true"
                        className="fw-book-num pointer-events-none absolute -bottom-8 right-3 select-none text-[6rem] font-bold leading-none tracking-[-0.06em] lg:-bottom-10 lg:right-4 lg:text-[13rem]"
                      >
                        {chapter.marker}
                      </span>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
