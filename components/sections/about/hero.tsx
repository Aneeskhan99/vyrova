import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { DotPattern } from "@/components/ui/dot-pattern";
import { hero } from "@/content/site/about";

/**
 * Above the fold: CSS entrances only (M-04). The headline arrives word
 * by word through a mask; the intro is dim and brightens word by word
 * as you scroll (each word on the paragraph's view timeline, offset by
 * its index), so reading it and scrolling it are the same gesture.
 */
export function Hero() {
  const [line1, line2] = hero.title.split("\n");
  const introWords = hero.intro.split(" ");
  let w = 0;
  const words = (line: string, accent: boolean) =>
    line.split(" ").map((word, i, arr) => {
      const k = w++;
      return (
        <span key={`${word}-${k}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span
            className={accent ? "fw-word-in inline-block text-accent" : "fw-word-in inline-block"}
            style={{ "--i": k } as CSSProperties}
          >
            {word}
          </span>
          {i < arr.length - 1 ? "\u00A0" : null}
        </span>
      );
    });

  return (
    <section className="relative isolate overflow-hidden py-14 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="fw-aurora" style={{ opacity: 0.4 }}>
          <span className="fw-aurora-a" />
          <span className="fw-aurora-c" />
        </div>
      </div>
      <DotPattern className="[mask-image:radial-gradient(60%_50%_at_50%_40%,white,transparent)]" />

      <Container>
        <div className="relative flex flex-col gap-5 lg:items-center lg:gap-7 lg:text-center">
          <p className="fw-rise text-xs font-medium uppercase tracking-[0.16em] text-accent">
            {hero.eyebrow}
          </p>
          <h1 className="max-w-[20ch] text-[clamp(1.75rem,5vw,4rem)] font-bold leading-[1.08] tracking-[-0.035em]">
            <span className="block">{words(line1 ?? "", false)}</span>
            <span className="block">{words(line2 ?? "", true)}</span>
          </h1>
          <p className="fw-tr max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink lg:text-lg" style={{ "--n": introWords.length } as CSSProperties}>
            {introWords.map((word, i) => (
              <span key={`${word}-${i}`} className="fw-tr-word" style={{ "--i": i } as CSSProperties}>
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </Container>
    </section>
  );
}
