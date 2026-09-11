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
};

export default nextConfig;
