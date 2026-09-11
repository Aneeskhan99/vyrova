import {
  Clapperboard,
  Code2,
  Mic,
  PenTool,
  Scissors,
  Type,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { team } from "@/content/site/about";

/** Static map — Tailwind and the bundler both need to see these (T-02). */
const ICONS: Record<string, LucideIcon> = {
  clapper: Clapperboard,
  pen: PenTool,
  code: Code2,
  text: Type,
  mic: Mic,
  scissors: Scissors,
};

export function Team() {
  return (
    <section className="border-t border-line bg-ground py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="max-w-[46ch]">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {team.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em]">
              {team.title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{team.intro}</p>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.roles.map((member) => {
            const Icon = ICONS[member.icon];
            return (
              <div
                key={member.role}
                className="fw-tilt h-full rounded-card border border-line bg-surface p-6 shadow-card lg:p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  {Icon ? <Icon className="size-5" aria-hidden="true" /> : null}
                </span>
                <h3 className="mt-5 font-semibold tracking-[-0.015em]">
                  {member.role}
                </h3>
                <p className="mt-1 text-sm text-muted">{member.discipline}</p>
              </div>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
