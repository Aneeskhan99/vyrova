import { Hero } from "@/components/sections/about/hero";
import { Story } from "@/components/sections/about/story";
import { Numbers } from "@/components/sections/about/numbers";
import { Principles } from "@/components/sections/about/principles";
import { Team } from "@/components/sections/about/team";
import { Studio } from "@/components/sections/about/studio";
import { Cta } from "@/components/sections/shared/cta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "VYROVA is a Dubai studio for SaaS animation, explainer video, WordPress, software and editing — built first as an in-house team, now open to other products.",
  path: "/about",
});

/** Composition only — no copy, no logic (S-04). */
export default function AboutPage() {
  return (
    <>
      <Hero />
      <Story />
      <Numbers />
      <Principles />
      <Team />
      <Studio />
      <Cta />
    </>
  );
}
