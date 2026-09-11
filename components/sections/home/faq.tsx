import { Container } from "@/components/layout/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { faq } from "@/content/site/home";

export function Faq() {
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
            <Accordion type="single" collapsible defaultValue="item-0">
              {faq.items.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
