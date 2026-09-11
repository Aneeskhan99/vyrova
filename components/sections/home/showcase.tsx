import { Container } from "@/components/layout/container";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { Reveal } from "@/components/motion/reveal";
import { UiMock } from "@/components/sections/shared/ui-mock";
import { showcase } from "@/content/site/home";

export function Showcase() {
  return (
    <section id="showcase" className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-[48rem] flex-col items-center gap-4 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {showcase.eyebrow}
            </p>
            <h2 className="text-[clamp(1.875rem,3.8vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em]">
              {showcase.title}
            </h2>
            <p className="max-w-[54ch] leading-relaxed text-muted">{showcase.intro}</p>
          </div>
        </Reveal>

        <div className="mt-16">
          <ContainerScroll>
            <div className="mx-auto aspect-[16/10] w-full max-w-[62rem] rounded-tile border border-line bg-surface p-3 shadow-lift">
              <UiMock bars={12} highlight={9} className="border-0" />
            </div>
          </ContainerScroll>
        </div>

        <dl className="mx-auto mt-14 flex max-w-[52rem] flex-wrap justify-center gap-x-16 gap-y-6">
          {showcase.captions.map((caption) => (
            <div key={caption.title} className="flex flex-col gap-1">
              <dt className="font-semibold">{caption.title}</dt>
              <dd className="text-sm text-muted">{caption.note}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
