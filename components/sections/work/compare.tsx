import { Container } from "@/components/layout/container";
import { ScrubReel } from "@/components/ui/scrub-reel";
import { Reveal } from "@/components/motion/reveal";
import { compare } from "@/content/site/work";

export function Compare() {
  return (
    <section className="fw-dark relative overflow-hidden bg-ink py-24 text-surface lg:py-32">
      <div aria-hidden="true" className="fw-dark-glow pointer-events-none absolute inset-0" />
      {/* Two ghost words drift apart as you scroll: the before to the left,
          the after to the right, with the reel between them. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden select-none lg:block">
        <span className="fw-ghost fw-ghost-left absolute left-[-2%] top-[46%] text-[12vw] font-bold uppercase leading-none tracking-[-0.05em]">
          {compare.beforeLabel}
        </span>
        <span className="fw-ghost fw-ghost-right absolute right-[-2%] top-[46%] text-[12vw] font-bold uppercase leading-none tracking-[-0.05em]">
          {compare.afterLabel}
        </span>
      </div>
      <Container className="relative">
        <Reveal>
          <div className="flex max-w-[44rem] flex-col gap-4 lg:mx-auto lg:items-center lg:text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-cyan">
              {compare.eyebrow}
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.025em]">
              {compare.title}
            </h2>
            <p className="max-w-[54ch] leading-relaxed text-surface/70">{compare.intro}</p>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <ScrubReel
            src={compare.src}
            start={compare.start}
            end={compare.end}
            startLabel={compare.beforeLabel}
            endLabel={compare.afterLabel}
            hint={compare.hint}
          />
        </Reveal>
      </Container>
    </section>
  );
}
