import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Reveal } from "@/components/motion/reveal";
import { UiMock } from "@/components/sections/shared/ui-mock";
import { featured } from "@/content/site/work";

export function Featured() {
  return (
    <section className="pb-24 lg:pb-32">
      <Container>
        <Reveal>
          <article className="relative grid overflow-hidden rounded-tile bg-gradient-to-br from-cyan/25 to-indigo-200/50 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="flex flex-col gap-6 p-8 lg:p-12">
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface/70 px-3 py-1.5 text-xs font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.03em]">
                {featured.name}
              </h2>
              <p className="max-w-[42ch] text-lg leading-relaxed">{featured.body}</p>

              <dl className="flex flex-wrap gap-x-10 gap-y-5">
                {featured.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <dd className="text-[1.75rem] font-bold tracking-tight">
                      <NumberTicker
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    </dd>
                    <dt className="text-[0.8125rem] text-muted">{stat.label}</dt>
                  </div>
                ))}
              </dl>

              <a
                href={featured.cta.href}
                className="inline-flex items-center gap-2 self-start whitespace-nowrap text-[0.9375rem] font-semibold text-accent"
              >
                {featured.cta.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>

            <div className="relative min-h-[20rem] p-8 lg:p-12">
              <div className="h-full w-full overflow-hidden rounded-card shadow-lift">
                <UiMock bars={11} highlight={8} />
              </div>
              <button
                type="button"
                aria-label={`Play the ${featured.name} film`}
                className="fw-tilt absolute right-10 top-10 grid size-16 place-items-center rounded-full bg-surface shadow-card lg:right-16 lg:top-16"
              >
                <Play aria-hidden="true" className="size-5 fill-ink translate-x-px" />
              </button>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
