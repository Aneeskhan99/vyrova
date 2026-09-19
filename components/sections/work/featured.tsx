import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Reveal } from "@/components/motion/reveal";
import { posterFor } from "@/lib/media";
import { Cinema } from "@/components/sections/work/cinema";
import { featured } from "@/content/site/work";

/**
 * The showreel, screened properly: a dark band, the film large, a
 * transport, and the ten scenes laid out as a filmstrip you can jump
 * through. The numbers are facts about the film, counting up as they
 * enter.
 */
export function Featured() {
  const runtime = featured.stats.find((s) => s.suffix === "s")?.value ?? 53;
  return (
    <section className="fw-dark relative overflow-hidden bg-ink py-14 text-surface lg:py-32">
      <div aria-hidden="true" className="fw-dark-glow pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="flex flex-col gap-4 lg:gap-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-cyan">
                {featured.eyebrow}
              </p>
              <h2 className="text-[clamp(1.5rem,3.6vw,3rem)] font-bold tracking-[-0.03em]">
                {featured.name}
              </h2>
              <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-surface/70 lg:text-lg">{featured.body}</p>
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-surface/15 bg-surface/5 px-3 py-1.5 text-xs font-medium text-cyan"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <dl className="flex flex-wrap gap-x-8 gap-y-4 lg:gap-x-10 lg:gap-y-5 lg:justify-end">
              {featured.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <dd className="text-[1.375rem] font-bold tracking-tight tabular-nums lg:text-[2rem]">
                    <NumberTicker
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </dd>
                  <dt className="text-[0.75rem] text-surface/55 lg:text-[0.8125rem]">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal className="mt-8 lg:mt-12">
          <Cinema
            src={featured.videoSrc}
            poster={posterFor(featured.videoSrc)}
            scenes={featured.scenes}
            duration={runtime}
            labels={featured.controls}
          />
        </Reveal>

        <Reveal className="mt-10">
          <a
            href={featured.cta.href}
            className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-cyan transition-colors hover:text-surface"
          >
            {featured.cta.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
