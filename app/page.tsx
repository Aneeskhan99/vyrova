import { Hero } from "@/components/sections/home/hero";
import { Logos } from "@/components/sections/home/logos";
import { Services } from "@/components/sections/home/services";
import { Integrations } from "@/components/sections/home/integrations";
import { Showcase } from "@/components/sections/home/showcase";
import { Work } from "@/components/sections/home/work";
import { Process } from "@/components/sections/home/process";
import { Testimonials } from "@/components/sections/home/testimonials";
import { Faq } from "@/components/sections/home/faq";
import { Cta } from "@/components/sections/shared/cta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FrameWell — SaaS animation, video and software",
  description:
    "We animate SaaS products so they sell themselves, and build the websites and software around them. First cut in 48 hours.",
  path: "/",
});

/** Composition only — no copy, no logic (S-04). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Logos />
      <Services />
      <Integrations />
      <Showcase />
      <Work />
      <Process />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
