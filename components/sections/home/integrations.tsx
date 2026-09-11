"use client";

import { useRef, type RefObject } from "react";
import { Container } from "@/components/layout/container";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Reveal } from "@/components/motion/reveal";
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
          <div className="mx-auto flex max-w-[46rem] flex-col items-center gap-4 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {integrations.eyebrow}
            </p>
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold tracking-[-0.025em]">
              {integrations.title}
            </h2>
            <p className="max-w-[52ch] leading-relaxed text-muted">
              {integrations.intro}
            </p>
          </div>
        </Reveal>

        <div
          ref={container}
          className="relative mx-auto mt-16 grid max-w-[62rem] grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-16"
        >
          <div className="flex flex-col gap-4">
            {inputNodes.current.map(({ node, ref }) => (
              <Node
                key={node.label}
                nodeRef={ref}
                label={node.label}
                note={node.note}
              />
            ))}
          </div>

          <div
            ref={hub}
            className="mx-auto flex size-28 items-center justify-center rounded-[2rem] border border-accent/40 bg-surface shadow-lift"
          >
            <span aria-hidden="true" className="size-12 rounded-2xl bg-cyan" />
          </div>

          <div className="flex flex-col gap-4">
            {outputNodes.current.map(({ node, ref }) => (
              <Node
                key={node.label}
                nodeRef={ref}
                label={node.label}
                note={node.note}
              />
            ))}
          </div>

          {/* Beams draw above the grid but never take pointer events. */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
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
      </Container>
    </section>
  );
}

function Node({
  nodeRef,
  label,
  note,
}: {
  nodeRef: NodeRef;
  label: string;
  note: string;
}) {
  return (
    <div
      ref={nodeRef}
      className="z-10 flex flex-col gap-0.5 rounded-2xl border border-line bg-surface px-5 py-3.5 shadow-card"
    >
      <span className="text-[0.9375rem] font-semibold">{label}</span>
      <span className="text-xs text-muted">{note}</span>
    </div>
  );
}
