import { Marquee } from "@/components/ui/marquee";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { LOOP } from "@/lib/motion";
import { logos } from "@/content/site/home";

export function Logos() {
  return (
    <section className="border-y border-line py-10">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.16em] text-muted">
        {logos.title}
      </p>
      <PauseOffscreen>
        <Marquee duration={LOOP.marquee} repeat={4} itemGap="3.5rem">
          {logos.names.map((name) => (
            <span
              key={name}
              className="text-[1.375rem] font-semibold text-muted/80"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </PauseOffscreen>
    </section>
  );
}
