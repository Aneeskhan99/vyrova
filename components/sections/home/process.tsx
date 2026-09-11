import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { process } from "@/content/site/home";

export function Process() {
  return (
    <section id="process" className="border-y border-line bg-band py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {process.eyebrow}
            </p>
            <h2 className="max-w-[20ch] text-[clamp(1.875rem,3.8vw,3rem)] font-bold tracking-[-0.025em]">
              {process.title}
            </h2>
          </div>
        </Reveal>

        <Stagger
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          itemClassName="h-full"
        >
          {process.steps.map((step) => (
            <article
              key={step.number}
              className="flex h-full flex-col gap-4 rounded-tile border border-line bg-surface p-7"
            >
              <p className="text-[0.8125rem] font-medium tracking-[0.1em] text-accent">
                {step.number}
              </p>
              <span aria-hidden="true" className="h-0.5 w-10 bg-cyan" />
              <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
            </article>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
