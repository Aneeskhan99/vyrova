import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { BorderBeam } from "@/components/ui/border-beam";
import { Logo } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import { cta } from "@/content/site/home";

export function Cta() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[42rem] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-3xl"
      />
      <Container className="relative">
        <Reveal>
          <div className="relative mx-auto flex max-w-[54rem] flex-col items-center gap-7 rounded-tile border border-line bg-surface/80 px-8 py-16 text-center backdrop-blur-sm">
            <BorderBeam surfaceClassName="bg-surface" />
            <div className="relative flex flex-col items-center gap-7">
              <Logo />
              <h2 className="max-w-[20ch] whitespace-pre-line text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.03em]">
                {cta.title}
              </h2>
              <p className="max-w-[48ch] leading-relaxed text-muted">{cta.body}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={cta.primary.href}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan px-7 py-4 text-base font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {cta.primary.label}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
                <a
                  href={cta.secondary.href}
                  className="inline-flex items-center rounded-full border border-line bg-surface px-7 py-4 text-base font-semibold transition-colors hover:border-ink/25"
                >
                  {cta.secondary.label}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
