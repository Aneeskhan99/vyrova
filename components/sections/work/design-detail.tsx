import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { DesignFrame } from "@/components/sections/work/design-frame";
import {
  DESIGN_KIND,
  DESIGN_TOOL,
  designCover,
  designDetail,
  designProjects,
  type DesignProject,
} from "@/content/site/design-projects";

/**
 * One delivered website design. Facts on the left, the scrolling frame on
 * the right; the frame is what the page is for, so it gets the width.
 */
export function DesignDetail({ project }: { project: DesignProject }) {
  const i = designProjects.findIndex((p) => p.slug === project.slug);
  const next = designProjects[(i + 1) % designProjects.length] ?? project;

  return (
    <>
      <section className="pt-10 lg:pt-14">
        <Container>
          <Link
            href="/work/"
            className="fw-rise inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {designDetail.backLabel}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              <p className="fw-rise text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {DESIGN_KIND} · {project.sector}
              </p>
              <h1 className="fw-rise fw-d1 text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                {project.client}
              </h1>
              <p className="fw-rise fw-d2 max-w-[44ch] text-lg leading-relaxed text-ink-soft">
                {project.headline}
              </p>
              <p className="fw-rise fw-d3 max-w-[52ch] leading-relaxed text-muted">
                {project.note}
              </p>

              <dl className="fw-rise fw-d4 mt-2 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                    {designDetail.kindLabel}
                  </dt>
                  <dd className="mt-1 font-semibold">{DESIGN_TOOL}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                    {designDetail.sectorLabel}
                  </dt>
                  <dd className="mt-1 font-semibold">{project.sector}</dd>
                </div>
                {project.place ? (
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                      {designDetail.placeLabel}
                    </dt>
                    <dd className="mt-1 font-semibold">{project.place}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                    {designDetail.paletteLabel}
                  </dt>
                  <dd className="mt-1.5 flex gap-1.5">
                    {project.palette.map((c) => (
                      <span
                        key={c}
                        title={c}
                        className="size-6 rounded-md border border-line"
                        style={{ background: c }}
                      />
                    ))}
                  </dd>
                </div>
              </dl>

              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fw-rise fw-d5 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-surface transition-transform hover:-translate-y-0.5"
                >
                  {designDetail.openLive}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              ) : null}
            </div>

            <div className="fw-rise fw-d2">
              <DesignFrame project={project} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <a
              href={`/work/${next.slug}/`}
              className="group flex items-center justify-between gap-6 rounded-tile border border-line bg-surface p-6 shadow-card transition-colors hover:border-accent/40 sm:p-8"
            >
              <div className="flex min-w-0 flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                  {designDetail.nextLabel}
                </span>
                <span className="truncate text-2xl font-bold tracking-tight">{next.client}</span>
                <span className="truncate text-sm text-muted">{next.sector}</span>
              </div>
              <span className="hidden w-48 shrink-0 overflow-hidden rounded-card border border-line sm:block">
                <img
                  src={designCover(next.slug)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={500}
                  className="block aspect-[8/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-5 shrink-0 text-accent transition-transform group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
