import { Hero } from "@/components/sections/services/hero";
import { Rail } from "@/components/sections/services/rail";
import { Detail } from "@/components/sections/services/detail";
import { Deliverables } from "@/components/sections/services/deliverables";
import { Packages } from "@/components/sections/services/packages";
import { Comparison } from "@/components/sections/services/comparison";
import { Cta } from "@/components/sections/shared/cta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "SaaS animation, explainer video, WordPress, software development and video editing — five services sharing one motion system.",
  path: "/services",
});

/** Composition only — no copy, no logic (S-04). */
export default function ServicesPage() {
  return (
    <>
      <Hero />
      <Rail />
      <Detail />
      <Deliverables />
      <Packages />
      <Comparison />
      <Cta />
    </>
  );
}
