import { Hero } from "@/components/sections/process/hero";
import { Timeline } from "@/components/sections/process/timeline";
import { Week } from "@/components/sections/process/week";
import { Tools } from "@/components/sections/process/tools";
import { Guarantees } from "@/components/sections/process/guarantees";
import { Cta } from "@/components/sections/shared/cta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Process",
  description:
    "Six steps from brief to master file. Script and storyboard approval first, a real animated cut within 48 hours of sign off, two revision rounds included.",
  path: "/process",
});

/** Composition only — no copy, no logic (S-04). */
export default function ProcessPage() {
  return (
    <>
      <Hero />
      <Timeline />
      <Week />
      <Tools />
      <Guarantees />
      <Cta />
    </>
  );
}
