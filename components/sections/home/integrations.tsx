"use client";

import { useRef, useState, type CSSProperties, type RefObject } from "react";
import { Container } from "@/components/layout/container";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { Reveal } from "@/components/motion/reveal";
import { Mark } from "@/components/brand/mark";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { integrations } from "@/content/site/home";

type NodeRef = RefObject<HTMLDivElement | null>;

/**
 * Client component because the beams measure real element positions.
 * The nodes are plain markup, so the section still reads correctly with
 * JavaScript disabled — only the moving light is missing.
 */
export function Integrations() {
  const container = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);

  // A phone shows the first three cards and keeps the rest behind a
  // toggle, so the section is a glance rather than a long scroll. Every
  // card is in the markup either way, and from md up they all show.
  const [open, setOpen] = useState(false);
  const PREVIEW = 3;

  // Built once, so each ref object keeps a stable identity across
  // renders. Passing a fresh `{ current }` object per render would make
  // AnimatedBeam re-measure on every render. Pairing the ref with its
  // data also keeps the types exact — no index lookups that could be
  // undefined.
  const inputNodes = useRef(
    integrations.inputs.map((node) => ({
      node,
      ref: { current: null } as NodeRef,
    })),
  );
  const outputNodes = useRef(
    integrations.outputs.map((node) => ({
      node,
      ref: { current: null } as NodeRef,
    })),
  );

  return (
    <section className="border-y border-line bg-band py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex max-w-[46rem] flex-col gap-4 lg:mx-auto lg:items-center lg:text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {integrations.eyebrow}
            </p>
            <h2 className="text-[clamp(1.625rem,2.9vw,2.5rem)] font-bold tracking-[-0.025em]">
              {integrations.title}
            </h2>
            <p className="max-w-[52ch] leading-relaxed text-muted">
              {integrations.intro}
            </p>
          </div>
        </Reveal>

        <div
          ref={container}
          className="relative mx-auto mt-16 grid max-w-[72rem] grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-16"
        >
          <div className="flex flex-col gap-4">
            {inputNodes.current.map(({ node, ref }, i) => (
              <Node
                key={node.label}
                nodeRef={ref}
                label={node.label}
                note={node.note}
                icon={node.icon}
                delay={i * 0.7}
                hidden={!open && i >= PREVIEW}
              />
            ))}
          </div>

          <div ref={hub} className="relative mx-auto hidden size-36 items-center justify-center md:flex">
            {/* Ripples: three rings leaving the hub in turn, transform + opacity. */}
            <span aria-hidden="true" className="fw-ring absolute inset-0 rounded-full border border-accent/40" />
            <span aria-hidden="true" className="fw-ring absolute inset-0 rounded-full border border-accent/40" style={{ "--d": "1.4s" } as CSSProperties} />
            <span aria-hidden="true" className="fw-ring absolute inset-0 rounded-full border border-accent/40" style={{ "--d": "2.8s" } as CSSProperties} />
            <span aria-hidden="true" className="absolute inset-6 rounded-full bg-cyan/20 blur-2xl" />
            <Mark id="hub" className="fw-mark-float relative size-28 drop-shadow-2xl" />
          </div>

          <div className="flex flex-col gap-4">
            {outputNodes.current.map(({ node, ref }, i) => (
              <Node
                key={node.label}
                nodeRef={ref}
                label={node.label}
                note={node.note}
                icon={node.icon}
                delay={i * 0.7 + 0.35}
                hidden={!open}
              />
            ))}
          </div>

          {/* Beams draw above the grid but never take pointer events. */}
          <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
            {inputNodes.current.map(({ node, ref }, i) => (
              <AnimatedBeam
                key={`in-${node.label}`}
                containerRef={container}
                fromRef={ref}
                toRef={hub}
                curvature={(i - 1.5) * 26}
                delay={i * 0.45}
              />
            ))}
            {outputNodes.current.map(({ node, ref }, i) => (
              <AnimatedBeam
                key={`out-${node.label}`}
                containerRef={container}
                fromRef={hub}
                toRef={ref}
                curvature={(i - 1.5) * 26}
                delay={i * 0.45 + 0.9}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mx-auto mt-6 flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-ink md:hidden"
        >
          {open ? integrations.showLess : integrations.showAll}
          <ChevronDown
            aria-hidden="true"
            className={cn("size-4 transition-transform", open && "rotate-180")}
          />
        </button>

        {/* The job log. Lines arrive one after another and the loop starts
            again; only opacity and transform move. */}
        <Reveal className="mt-14 hidden md:block">
          <PauseOffscreen className="mx-auto max-w-[40rem]">
            <div className="fw-log overflow-hidden rounded-card border border-ink/10 bg-ink text-surface shadow-lift">
              <div className="flex items-center gap-2 border-b border-surface/10 px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-surface/25" />
                <span className="size-2.5 rounded-full bg-surface/25" />
                <span className="size-2.5 rounded-full bg-surface/25" />
                <span className="ml-3 text-xs text-surface/60">{integrations.log.title}</span>
              </div>
              <ol className="flex flex-col gap-2 px-5 py-4 font-mono text-[0.8125rem] leading-relaxed">
                {integrations.log.lines.map((line, i) => (
                  <li
                    key={line.verb}
                    className="fw-log-line flex gap-3"
                    data-line={i}
                  >
                    <span className="text-cyan">›</span>
                    <span className="w-24 shrink-0 text-accent-soft">{line.verb}</span>
                    <span className="text-surface/80">{line.rest}</span>
                  </li>
                ))}
                <li aria-hidden="true" className="flex gap-3">
                  <span className="text-cyan">›</span>
                  <span className="fw-log-cursor inline-block h-4 w-2 translate-y-0.5 bg-cyan" />
                </li>
              </ol>
            </div>
          </PauseOffscreen>
        </Reveal>
      </Container>
    </section>
  );
}

function Node({
  nodeRef,
  label,
  note,
  icon,
  delay,
  hidden = false,
}: {
  nodeRef: NodeRef;
  label: string;
  note: string;
  icon: string;
  delay: number;
  /** Folded away on a phone until the reader asks for the rest. */
  hidden?: boolean;
}) {
  return (
    <div
      ref={nodeRef}
      className={cn(
        "fw-node group z-10 flex cursor-default items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5 shadow-card transition-colors duration-300 ease-out hover:border-accent/40 hover:shadow-lift",
        hidden && "hidden md:flex",
      )}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-band transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent-soft">
        <img src={icon} alt="" aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:scale-110" />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-[0.9375rem] font-semibold">{label}</span>
        <span className="text-xs text-muted">{note}</span>
      </div>
    </div>
  );
}
