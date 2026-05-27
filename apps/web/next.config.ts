import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

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
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
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
