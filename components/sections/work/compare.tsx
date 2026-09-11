import { Container } from "@/components/layout/container";
import { CompareSlider } from "@/components/ui/compare-slider";
import { Reveal } from "@/components/motion/reveal";
import { UiMock } from "@/components/sections/shared/ui-mock";
import { compare } from "@/content/site/work";

export function Compare() {
  return (
    <section className="border-y border-line bg-band py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-[44rem] flex-col items-center gap-4 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {compare.eyebrow}
            </p>
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold tracking-[-0.025em]">
              {compare.title}
            </h2>
            <p className="max-w-[52ch] leading-relaxed text-muted">{compare.intro}</p>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <CompareSlider
            className="aspect-[16/9] w-full"
            beforeLabel={compare.beforeLabel}
            afterLabel={compare.afterLabel}
            before={
              <div className="grid h-full w-full place-items-center bg-[#e9eaec] p-10">
                <div className="w-full max-w-[46rem] grayscale">
                  <UiMock bars={9} highlight={-1} />
                </div>
              </div>
            }
            after={
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-cyan/30 to-indigo-200/60 p-10">
                <div className="w-full max-w-[46rem]">
                  <UiMock bars={9} highlight={6} className="shadow-lift" />
                </div>
              </div>
            }
          />
        </Reveal>
      </Container>
    </section>
  );
}
