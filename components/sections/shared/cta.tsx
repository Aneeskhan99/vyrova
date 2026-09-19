import { Container } from "@/components/layout/container";
import { BorderBeam } from "@/components/ui/border-beam";
import { Logo } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCta } from "@/components/contact/project-cta";
import { cta } from "@/content/site/home";

export function Cta() {
  return (
    <section id="contact" className="relative overflow-hidden py-16 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[42rem] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-3xl"
      />
      <Container className="relative">
        <Reveal>
          <div className="relative mx-auto flex max-w-[54rem] flex-col items-center gap-5 rounded-tile border border-line bg-surface/80 px-5 py-10 text-center backdrop-blur-sm sm:gap-7 sm:px-8 sm:py-16">
            <BorderBeam surfaceClassName="bg-surface" />
            <div className="relative flex flex-col items-center gap-5 sm:gap-7">
              <Logo />
              <h2 className="max-w-[20ch] whitespace-pre-line text-[clamp(1.5rem,4.2vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em]">
                {cta.title}
              </h2>
              <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted sm:text-base">{cta.body}</p>
              <ProjectCta />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
