import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SiteTour } from "@/components/ui/site-tour";
import { caseStudy } from "@/content/site/work";

/**
 * The first real client build on the site.
 *
 * The section borrows the client's own red for its accent, scoped to this
 * block by a CSS variable, so the page briefly takes on the brand it is
 * showing and hands the colour back at the section edge. A studio that
 * sells design should be able to hold someone else's brand for a moment.
 */
export function CaseStudy() {
  return (
    <section
      className="fw-takeover relative overflow-hidden border-y border-line bg-surface py-14 lg:py-32"
      style={{ ["--tour-accent" as string]: caseStudy.accent }}
    >
      {/* The takeover: the client's red floods in from the corner as the
          section arrives (scroll-driven scale on one disc), then settles
          as a soft wash behind the content. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="fw-takeover-disc absolute -left-[10%] -top-[30%] size-[60vw] rounded-full" />
      </div>
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
          <Reveal className="lg:sticky lg:top-28">
            <div className="flex flex-col gap-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--tour-accent)]">
                {caseStudy.eyebrow}
              </p>

              <div className="flex flex-col gap-1">
                <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em]">
                  {caseStudy.client}
                </h2>
                <p className="text-sm text-muted">{caseStudy.sector}</p>
              </div>

              <p className="max-w-[46ch] text-lg leading-snug font-medium">{caseStudy.title}</p>
              <p className="max-w-[52ch] leading-relaxed text-muted">{caseStudy.body}</p>

              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 border-y border-line py-5 sm:grid-cols-2 sm:gap-y-5 sm:py-6">
                {caseStudy.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1">
                    <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted">
                      {fact.label}
                    </dt>
                    <dd className="text-[0.9375rem] font-semibold leading-snug">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <ul className="fw-thread relative flex flex-col gap-2.5 pl-5">
                <span aria-hidden="true" className="fw-thread-line absolute bottom-1 left-1.5 top-1 w-px origin-top bg-[var(--tour-accent)]" />
                {caseStudy.built.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-muted">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-[var(--tour-accent)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <SiteTour shots={caseStudy.shots} url={caseStudy.url} host={caseStudy.host} />
            <div className="mt-8 flex flex-col gap-2">
              <a
                href={caseStudy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--tour-accent)] px-6 py-3 text-[0.9375rem] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                {caseStudy.cta.label}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <p className="text-xs text-muted">{caseStudy.cta.note}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
