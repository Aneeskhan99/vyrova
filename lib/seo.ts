import type { Metadata } from "next";

export const SITE = {
  name: "FrameWell",
  url: "https://framewell.com",
  tagline: "SaaS animation, video and software, from one studio.",
  email: "hello@framewell.com",
} as const;

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE.url}${input.path}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}

/** Organization JSON-LD, rendered once in the root layout (E-02). */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  description: SITE.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
};
