"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { faq } from "@/content/site/home";

/**
 * Every answer starts closed, and hovering a question opens it. The
 * short delay stops the panel flickering when the cursor merely crosses
 * the list on its way somewhere else.
 *
 * Hover is an addition, not a replacement: clicking still toggles, the
 * keyboard still works through Radix, and on touch — where hover does
 * not exist — tapping behaves exactly as an accordion normally would.
 */
export function Faq() {
  const [value, setValue] = useState("");
  const timer = useRef<number | null>(null);

  function openAfterPause(id: string) {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setValue(id), 110);
  }

  function cancelPending() {
    if (timer.current) window.clearTimeout(timer.current);
  }

  return (
    <section className="border-y border-line bg-band py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {faq.eyebrow}
              </p>
              <h2 className="whitespace-pre-line text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.025em]">
                {faq.title}
              </h2>
              <p className="max-w-[36ch] leading-relaxed text-muted">{faq.intro}</p>
            </div>
          </Reveal>

          <Reveal>
            <Accordion
              type="single"
              collapsible
              value={value}
              onValueChange={setValue}
              onMouseLeave={cancelPending}
            >
              {faq.items.map((item, i) => {
                const id = `item-${i}`;
                return (
                  <AccordionItem
                    key={item.q}
                    value={id}
                    onMouseEnter={() => openAfterPause(id)}
                  >
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
