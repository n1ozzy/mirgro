import type { NextConfig } from "next";

/*
 * DEPLOY_TARGET=pages builds a fully static export for GitHub Pages,
 * which serves the site under /<repo>/ and has no image optimizer.
 * Regular `pnpm dev` / `pnpm build` are unaffected.
 */
const isGitHubPages = process.env.DEPLOY_TARGET === "pages";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      basePath: "/mirgro",
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
