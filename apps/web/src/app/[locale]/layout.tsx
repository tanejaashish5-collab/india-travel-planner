import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { StickyCTA } from "@/components/sticky-cta";
import { PersonalisationQuiz } from "@/components/personalisation-quiz";
import { CompareProvider } from "@/components/compare-tray";
import { ScrollToTop } from "@/components/scroll-to-top";
import { PageTransition } from "@/components/page-transition";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { AskNakshIQ } from "@/components/ask-nakshiq";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "NakshIQ — Travel Intelligence for India",
    template: "%s | NakshIQ",
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
  description:
    "438+ destinations, 930+ places with monthly suitability scores, kids ratings, safety data, and AI-powered itineraries. The confidence engine for exploring India.",
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
    title: "NakshIQ — Travel Intelligence for India",
    description:
      "438+ destinations, 930+ places with monthly scores, kids ratings, safety data, and AI itineraries.",
    type: "website",
    locale: "en_IN",
    siteName: "NakshIQ",
    url: "https://nakshiq.com",
    images: [{ url: "https://nakshiq.com/og-image.jpg", width: 800, height: 450, alt: "NakshIQ — Travel Intelligence for India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NakshIQ — Travel Intelligence for India",
    description: "438+ destinations, 930+ places with monthly scores, kids ratings, safety data, and AI itineraries.",
    images: ["https://nakshiq.com/og-image.jpg"],
  },
};

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
        {/* Skip to content — accessibility (BUG-014) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "NakshIQ",
            url: "https://nakshiq.com",
            logo: "https://nakshiq.com/icon-192.png",
            description: "Travel intelligence for India. 340+ destinations with monthly scores, kids ratings, safety data, and AI-powered itineraries.",
            sameAs: [],
          }) }}
        />
        <NextIntlClientProvider messages={messages}>
          <CompareProvider>
            <ScrollToTop />
            <PageTransition>{children}</PageTransition>
            <StickyCTA />
            <AskNakshIQ />
            <PersonalisationQuiz />
            <MobileTabBar />
          </CompareProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
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
