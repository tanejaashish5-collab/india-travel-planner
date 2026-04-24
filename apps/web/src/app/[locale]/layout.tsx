import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { CompareProvider } from "@/components/compare-tray";
import { ScrollToTop } from "@/components/scroll-to-top";
import { PageTransition } from "@/components/page-transition";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { MotionProvider } from "@/components/motion-provider";
import "../globals.css";

// Deferred client chunks — never block first paint or TTI
const StickyCTA = dynamic(() => import("@/components/sticky-cta").then((m) => ({ default: m.StickyCTA })));
const PersonalisationQuiz = dynamic(() => import("@/components/personalisation-quiz").then((m) => ({ default: m.PersonalisationQuiz })));
const AskNakshIQ = dynamic(() => import("@/components/ask-nakshiq").then((m) => ({ default: m.AskNakshIQ })));
const PWAInstallPrompt = dynamic(() => import("@/components/pwa-install-prompt").then((m) => ({ default: m.PWAInstallPrompt })));
const OfflineIndicator = dynamic(() => import("@/components/offline-indicator").then((m) => ({ default: m.OfflineIndicator })));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

// Locale-aware metadata — fixes BUG-109 (Hindi pages were shipping English
// <title>/og:title/og:locale). Uses generateMetadata instead of a static
// metadata export so we can read the [locale] param.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  const { getAppStats } = await import("@/lib/stats");
  const stats = await getAppStats();
  const d = stats.destinations;
  const p = stats.places.toLocaleString();

  const title = isHindi
    ? "NakshIQ — भारत के लिए यात्रा इंटेलिजेंस"
    : "NakshIQ — Travel Intelligence for India";
  const description = isHindi
    ? `${d}+ गंतव्य, ${p}+ स्थान — मासिक स्कोर, बच्चों की रेटिंग, सुरक्षा डेटा, और AI-संचालित यात्रा कार्यक्रम। भारत को समझदारी से देखने का साधन।`
    : `${d}+ destinations, ${p}+ places with monthly suitability scores, kids ratings, safety data, and AI-powered itineraries. The confidence engine for exploring India.`;
  const ogShortDesc = isHindi
    ? `${d}+ गंतव्य, ${p}+ स्थान — मासिक स्कोर, बच्चों की रेटिंग, सुरक्षा डेटा।`
    : `${d}+ destinations, ${p}+ places with monthly scores, kids ratings, safety data, and AI itineraries.`;

  return {
    metadataBase: new URL("https://www.nakshiq.com"),
    verification: {
      google: "RJwYea5dbs3YYGdeyGe1HtHl_lbmjn8IkZsP4x333bU",
    },
    title: {
      default: title,
      template: `%s | NakshIQ`,
    },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    description,
    keywords: [
      "India travel planner",
      "North India travel guide",
      "Ladakh trip planner",
      "Himachal Pradesh travel",
      "Kashmir travel guide",
      "India road trip",
      "kids friendly India travel",
      "offbeat India destinations",
      "India travel encyclopedia",
    ],
    openGraph: {
      title,
      description: ogShortDesc,
      type: "website",
      locale: isHindi ? "hi_IN" : "en_IN",
      siteName: "NakshIQ",
      url: `https://www.nakshiq.com/${locale}`,
      images: [
        {
          url: "https://www.nakshiq.com/og-image.jpg",
          width: 800,
          height: 450,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: ogShortDesc,
      images: ["https://www.nakshiq.com/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} dark h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#161614" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground text-base pb-16 md:pb-0">
        {/* Skip to content — accessibility (WCAG 2.4.1 Level A). Keep both
            href="#main-content" and class="skip-link" so auditors find it. */}
        <a
          href="#main-content"
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        {/* Organization + WebSite + SearchAction — @id-chained so AI/search
            engines resolve entity references across every page. Paired with
            per-page TouristDestination / Article / ContactPage schemas that
            reference these @id anchors via isPartOf / about / publisher. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://www.nakshiq.com#organization",
                name: "NakshIQ",
                url: "https://www.nakshiq.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.nakshiq.com/icon-512.png",
                  width: 512,
                  height: 512,
                },
                description:
                  "Travel intelligence for India. 488 destinations across 36 states, each scored month-by-month for go/wait/skip verdicts, kids-suitability, solo-female safety, and altitude risk. Citation-first editorial — no fabricated prices, phone numbers, or stays.",
                foundingDate: "2026",
                areaServed: { "@type": "Country", name: "India" },
                knowsAbout: [
                  "India travel",
                  "Himalayan travel",
                  "Ladakh travel",
                  "Kashmir travel",
                  "Spiti Valley",
                  "solo-female travel safety India",
                  "family travel India",
                  "high-altitude travel",
                  "Buddhist Circuit India",
                  "India heritage travel",
                ],
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    contactType: "editorial",
                    email: "editor@nakshiq.com",
                    availableLanguage: ["English", "Hindi"],
                    areaServed: "IN",
                  },
                  {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    email: "hello@nakshiq.com",
                    availableLanguage: ["English", "Hindi"],
                    areaServed: "IN",
                  },
                  {
                    "@type": "ContactPoint",
                    contactType: "press",
                    email: "press@nakshiq.com",
                    availableLanguage: ["English"],
                    areaServed: "IN",
                  },
                ],
                sameAs: [
                  "https://www.wikidata.org/wiki/Q139549464",
                ],
              },
              {
                "@type": "WebSite",
                "@id": "https://www.nakshiq.com#website",
                url: "https://www.nakshiq.com",
                name: "NakshIQ",
                description:
                  "Travel intelligence for India — 488 destinations, 5,856 monthly verdicts, citation-first editorial.",
                publisher: { "@id": "https://www.nakshiq.com#organization" },
                inLanguage: ["en-IN", "hi-IN"],
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://www.nakshiq.com/en/explore?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              },
            ],
          }) }}
        />
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <CompareProvider>
              <ScrollToTop />
              <PageTransition>{children}</PageTransition>
              <StickyCTA />
              <AskNakshIQ />
              <PersonalisationQuiz />
              <MobileTabBar />
              <PWAInstallPrompt />
              <OfflineIndicator />
            </CompareProvider>
          </MotionProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
        <Script id="sw-register" strategy="afterInteractive">
          {`if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(()=>{})}`}
        </Script>
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
