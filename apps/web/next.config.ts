import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Content-Security-Policy. ISR pages are cached HTML, so nonces are
// impossible — 'unsafe-inline' for script/style is the ceiling here (Next.js
// inline bootstrap + the site's inline-style-heavy cinematic components).
// Every third-party origin is enumerated; adding a new external script/image
// host REQUIRES extending this list or the resource silently breaks in prod.
// Origins: GA4 (gtag + beacons), 2 Cloudflare R2 buckets (images/videos),
// Esri arcgisonline (Leaflet basemap tiles; replaced Carto 2026-09-02 after
// CARTO revoked keyless raster access), Supabase (browser client reads).
// Leaflet CSS is bundled same-origin since 2026-09-02 — do NOT reintroduce a
// cross-origin <link>: the service worker re-issues intercepted subresources
// as fetch(), which this CSP governs under connect-src, silently killing any
// cross-origin stylesheet/script the SW touches (NEW-2026-09-01-001).
const SUPABASE_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").origin;
  } catch {
    return "https://dudzsdzfvikjjhurxrgc.supabase.co";
  }
})();

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev https://pub-bcda9bac2f63408880ee3f23aa3548e5.r2.dev https://server.arcgisonline.com https://openweathermap.org https://www.google-analytics.com https://www.googletagmanager.com",
  "media-src 'self' https://pub-bcda9bac2f63408880ee3f23aa3548e5.r2.dev https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev",
  "font-src 'self' data:",
  `connect-src 'self' ${SUPABASE_ORIGIN} https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com`,
  "worker-src 'self' blob:",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  transpilePackages: ["@itp/shared"],
  // Audit cron routes (audit-gsc-alerts, audit-gsc-ga4-correlation, etc.) use
  // path.join(process.cwd(), "..", "..", dir) to read gsc-audits/ at the repo
  // root. Turbopack's file-tracer can't statically scope that pattern, so it
  // bundles the entire repo into the function — pushing audit-gsc-alerts past
  // the 300 MB function limit on 2026-05-27 (data/ alone is 835 MB). These
  // exclusions keep only what the routes actually read (gsc-audits/,
  // ga4-audits/, ops-reports/) and drop the rest of the monorepo root.
  outputFileTracingExcludes: {
    "*": [
      "../../data/**",
      "../../scripts/**",
      "../../supabase/migrations/**",
      "../../.scrapes/**",
      "../../GSC non indexing/**",
      "../../Web Res reports/**",
      "../../nakshiq-autoposter/**",
      "../../docs/**",
      "../../*.pdf",
      "../../*.docx",
      "../../*.png",
      "../../*.jpg",
      "../../*.md",
      "../../*.csv",
    ],
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@supabase/supabase-js",
      "react-leaflet",
    ],
  },
  images: {
    // Custom loader routes /images/* through Cloudflare R2 (free egress) instead
    // of Vercel's Image Optimization service (whose free-tier quota we blew on
    // 2026-04-17). Raw JPGs are already pre-compressed from Tier-1 perf work;
    // CDN serves them with 1yr immutable cache. No per-viewport transform, but
    // also no quota to hit.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
      {
        // Build chunks are crawlable (robots.txt allows /_next/static/ so
        // Googlebot can render pages) but must never appear in the index —
        // GSC 2026-06-12 had 18 chunk URLs "Indexed, though blocked by
        // robots.txt". noindex only stops document indexing; it does not
        // block fetching them as page subresources.
        source: "/_next/static/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
