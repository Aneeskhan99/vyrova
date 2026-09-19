import { Hero } from "@/components/sections/work/hero";
import { Featured } from "@/components/sections/work/featured";
import { CaseStudy } from "@/components/sections/work/case-study";
import { Compare } from "@/components/sections/work/compare";
import { Cta } from "@/components/sections/shared/cta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Fifteen website designs, SaaS animation, explainer video, video editing and WordPress from VYROVA. Filter by service, or drag the before and after slider.",
  path: "/work",
});

/** Composition only — no copy, no logic (S-04). */
export default function WorkPage() {
  return (
    <>
      <Hero />
      <Featured />
      <CaseStudy />
      <Compare />
      <Cta />
    </>
  );
}
