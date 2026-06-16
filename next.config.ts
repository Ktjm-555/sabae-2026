import type { NextConfig } from "next";

function normalizeBasePath(basePath?: string) {
  if (!basePath) {
    return "";
  }

  const normalized = basePath.replace(/^\/?/, "/").replace(/\/$/, "");
  return normalized === "/" ? "" : normalized;
}

const appEnv = process.env.APP_ENV ?? process.env.NEXT_PUBLIC_APP_ENV;
const basePath = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH ?? (appEnv === "stg" ? "/sabae-event-lp" : ""),
);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    qualities: [75, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2880, 3840],
  },
};

export default nextConfig;
