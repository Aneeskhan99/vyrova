import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/ui/marquee";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { Reveal } from "@/components/motion/reveal";
import { LOOP } from "@/lib/motion";
import { logos } from "@/content/site/home";
import { clientLogo, designProjects } from "@/content/site/design-projects";

/**
 * Client logos, moving the way the Wall's cards move: one marquee row,
 * greyscale at rest, the brand's own colour on hover. Each logo is the real
 * mark from the delivered design, so the row is honest by construction —
 * the list is the design portfolio, nothing hand-picked.
 */
export function Logos() {
  return (
    <section id="clients" className="border-t border-line py-14 lg:py-16">
      <Container>
        <Reveal>
          <div className="flex max-w-[44rem] flex-col gap-2 lg:mx-auto lg:items-center lg:text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {logos.eyebrow}
            </p>
            <h2 className="text-[clamp(1.375rem,2.2vw,1.875rem)] font-bold tracking-[-0.02em]">
              {logos.title}
            </h2>
            <p className="text-sm text-muted">{logos.note}</p>
          </div>
        </Reveal>
      </Container>
      <PauseOffscreen className="mt-10">
        <Marquee duration={LOOP.marquee} repeat={2} itemGap="1rem" pauseOnHover>
          {designProjects.map((p) => (
            <a
              key={p.slug}
              href={`/work/${p.slug}/`}
              aria-label={`${p.client} — open the design`}
              className="fw-client group flex h-14 w-32 items-center justify-center rounded-card border border-line bg-surface px-4 shadow-card transition-colors hover:border-accent/40 sm:h-24 sm:w-52 sm:px-7"
            >
              <img
                src={clientLogo(p.slug)}
                alt={p.client}
                loading="lazy"
                decoding="async"
                className="fw-client-logo max-h-6 w-auto max-w-full object-contain sm:max-h-11"
              />
            </a>
          ))}
        </Marquee>
      </PauseOffscreen>
    </section>
  );
}
