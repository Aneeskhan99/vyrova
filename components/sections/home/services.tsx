import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { BorderBeam } from "@/components/ui/border-beam";
import { UiMock } from "@/components/sections/shared/ui-mock";
import { services } from "@/content/site/home";
import { cn } from "@/lib/utils";

export function Services() {
  const featured = services.items.find((item) => item.featured);
  const rest = services.items.filter((item) => !item.featured);

  return (
    <section id="services" className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {services.eyebrow}
              </p>
              <h2 className="max-w-[16ch] whitespace-pre-line text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.025em]">
                {services.title}
              </h2>
            </div>
            <p className="max-w-[42ch] leading-relaxed text-muted">{services.intro}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {featured ? (
            <Reveal className="lg:col-span-2">
              <article className="relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-tile border border-line bg-surface p-8">
                <BorderBeam />
                <div className="pointer-events-none absolute inset-x-8 -top-6 h-[300px] opacity-90">
                  <div className="h-full w-full [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
                    <UiMock className="shadow-card" />
                  </div>
                </div>
                <div className="relative flex flex-col gap-3">
                  <h3 className="text-[2rem] font-semibold tracking-tight">
                    {featured.title}
                  </h3>
                  <p className="max-w-[52ch] leading-relaxed text-muted">
                    {featured.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ) : null}

          <Stagger className="grid gap-5 lg:row-span-2" itemClassName="h-full">
            {rest.slice(0, 2).map((item) => (
              <ServiceTile key={item.title} title={item.title} body={item.body} />
            ))}
          </Stagger>

          <Stagger
            className="grid gap-5 sm:grid-cols-2 lg:col-span-2"
            itemClassName="h-full"
          >
            {rest.slice(2).map((item) => (
              <ServiceTile key={item.title} title={item.title} body={item.body} />
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function ServiceTile({
  title,
  body,
  className,
}: {
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full min-h-[200px] flex-col justify-end gap-2.5 rounded-tile border border-line bg-surface p-7",
        "transition-colors hover:border-accent/40",
        className,
      )}
    >
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-muted">{body}</p>
    </article>
  );
}
