"use client";

import { useState, type CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { cn } from "@/lib/utils";
import { team } from "@/content/site/about";

/**
 * Six disciplines as badges. The cards sit on a staggered grid (the
 * middle column drops), each icon lives in a tile that floats on its own
 * phase and spins a quarter turn on hover, and the discipline runs as a
 * colour band along the card's foot. Cards pop in one after another.
 */
export function Team() {
  // A phone shows three cards and folds the rest behind a toggle; from
  // sm up the whole grid is there as before.
  const [open, setOpen] = useState(false);
  const PREVIEW = 3;

  return (
    <section className="border-t border-line bg-ground py-14 lg:py-28">
      <Container>
        <Reveal>
          <div className="max-w-[70ch]">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {team.eyebrow}
            </p>
            <h2 className="mt-3 whitespace-nowrap text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] max-sm:whitespace-normal">
              {team.title}
            </h2>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">{team.intro}</p>
          </div>
        </Reveal>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.roles.map((member, i) => (
            <li
              key={member.role}
              className={cn(
                "fw-drift lg:[&:nth-child(3n+2)]:translate-y-6",
                !open && i >= PREVIEW && "hidden sm:block",
              )}
              style={{ "--i": i } as CSSProperties}
            >
              <TiltCard className="fw-badge h-full rounded-card" max={6}>
                <div className="relative h-full overflow-hidden rounded-card border border-line bg-surface p-6 shadow-card lg:p-7">
                  <span
                    className="fw-badge-icon fw-float flex size-14 items-center justify-center rounded-2xl bg-accent-soft"
                    style={{ animationDelay: `${(i % 3) * 0.7}s` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/icons/${member.icon}.svg`} alt="" width={28} height={28} className="size-7 object-contain" />
                  </span>
                  <h3 className="mt-6 font-semibold tracking-[-0.015em]">{member.role}</h3>
                  <p className="mt-1 text-sm text-muted">{member.discipline}</p>
                  <span aria-hidden="true" className="fw-badge-band absolute inset-x-0 bottom-0 h-1 origin-left bg-gradient-to-r from-cyan via-accent to-violet" />
                </div>
              </TiltCard>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-ink sm:hidden"
        >
          {open ? team.showLess : team.showAll}
          <ChevronDown
            aria-hidden="true"
            className={cn("size-4 transition-transform", open && "rotate-180")}
          />
        </button>
      </Container>
    </section>
  );
}
