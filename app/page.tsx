import { Hero } from "@/components/sections/home/hero";
import { Logos } from "@/components/sections/home/logos";
import { Wall } from "@/components/sections/home/wall";
import { Services } from "@/components/sections/home/services";
import { Integrations } from "@/components/sections/home/integrations";
import { Showcase } from "@/components/sections/home/showcase";
import { Work } from "@/components/sections/home/work";
import { Process } from "@/components/sections/home/process";
import { Faq } from "@/components/sections/home/faq";
import { Cta } from "@/components/sections/shared/cta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "VYROVA — Visuals that move. Technology that works.",
  description:
    "Fifteen delivered website designs, SaaS animation, explainer films, WordPress and software from one studio. First cut in 48 hours.",
  path: "/",
});

/** Composition only — no copy, no logic (S-04). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Logos />
      <Wall />
      <Services />
      <Integrations />
      <Showcase />
      <Work />
      <Process />
      <Faq />
      <Cta />
    </>
  );
}
