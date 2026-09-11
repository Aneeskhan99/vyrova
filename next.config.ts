import type { NextConfig } from "next";

/**
 * Static export only — see CLAUDE.md rule H-01..H-04.
 * This makes the build fail immediately if someone reaches for a
 * server-only feature, instead of discovering it at deploy time.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    // Rewrites `import { Play } from "lucide-react"` into a direct path
    // so a handful of icons cannot drag the whole set into the bundle.
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
