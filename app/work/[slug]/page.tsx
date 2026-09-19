import { notFound } from "next/navigation";
import { DesignDetail } from "@/components/sections/work/design-detail";
import { Cta } from "@/components/sections/shared/cta";
import { designBySlug, designProjects } from "@/content/site/design-projects";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

/** One static page per delivered design. Static export needs the full list. */
export function generateStaticParams(): Params[] {
  return designProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = designBySlug(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.client} — website design`,
    description: `${project.sector}${project.place ? `, ${project.place}` : ""}. ${project.note}`,
    path: `/work/${slug}`,
  });
}

/** Composition only — no copy, no logic (S-04). */
export default async function DesignProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = designBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <DesignDetail project={project} />
      <Cta />
    </>
  );
}
