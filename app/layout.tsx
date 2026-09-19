import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SITE, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "VYROVA designs and animates the things a product needs to be seen: website UI/UX, brand identity, SaaS animation, explainer films, WordPress, software and video editing. Dubai and Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Without JavaScript the reveal transitions never run, so make
            their content visible rather than leaving the page blank. */}
        <noscript>
          <style>{`.fw-reveal{opacity:1;transform:none}`}</style>
        </noscript>
        {/* The mark is on every page above the fold: fetch it first. */}
        <link rel="preload" as="image" href="/brand/vyrova-mark.webp" type="image/webp" />
      </head>
      {/*
        Browser extensions such as Grammarly and ColorZilla add attributes
        to <body> before React hydrates, which React reports as a mismatch.
        Nothing in our markup differs between server and client, so the
        warning is suppressed at this one element only.
      */}
      <body className="font-sans antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-surface"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
