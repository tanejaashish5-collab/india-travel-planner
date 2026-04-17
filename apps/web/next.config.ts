import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["@itp/shared"],
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@supabase/supabase-js",
      "react-leaflet",
    ],
  },
  images: {
    // Vercel's Image Optimization free tier is 1000 unique sources/mo. With
    // 480+ destinations × 91 collections × multiple sizes, we blew the quota
    // and every <Image> started returning 402. Bypass the optimizer — raw JPGs
    // are already pre-compressed (Tier-1 perf work) and served with 1yr
    // immutable cache. Loss: no auto AVIF/WebP per viewport. Fine for now.
    // To re-enable: upgrade to Vercel Pro ($20/mo, 5k transforms) or migrate
    // images to Cloudflare R2 + Image Resizing.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
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
