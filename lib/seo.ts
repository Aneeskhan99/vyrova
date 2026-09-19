import type { Metadata } from "next";

export const SITE = {
  name: "VYROVA",
  url: "https://vyrova.com",
  tagline: "Visuals that move. Technology that works.",
  email: "info@vyrova.co.uk",
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
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: ["/og.png"],
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
  logo: `${SITE.url}/brand/vyrova-mark.png`,
  description: SITE.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
};
