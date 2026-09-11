import { Hero } from "@/components/sections/work/hero";
import { Featured } from "@/components/sections/work/featured";
import { Compare } from "@/components/sections/work/compare";
import { Results } from "@/components/sections/work/results";
import { Cta } from "@/components/sections/shared/cta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "SaaS animation, explainer video, WordPress and software projects from FrameWell. Filter by service, or drag the before and after slider.",
  path: "/work",
});

/** Composition only — no copy, no logic (S-04). */
export default function WorkPage() {
  return (
    <>
      <Hero />
      <Featured />
      <Compare />
      <Results />
      <Cta />
    </>
  );
}
