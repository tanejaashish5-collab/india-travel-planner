import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { StickyCTA } from "@/components/sticky-cta";
import { PersonalisationQuiz } from "@/components/personalisation-quiz";
import { CompareProvider } from "@/components/compare-tray";
import { ScrollToTop } from "@/components/scroll-to-top";
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
    "143 destinations, 408+ places with monthly suitability scores, kids ratings, safety data, and AI-powered itineraries. The confidence engine for exploring India.",
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
      "143 destinations, 408+ places with monthly scores, kids ratings, safety data, and AI itineraries.",
    type: "website",
    locale: "en_IN",
    siteName: "NakshIQ",
    url: "https://nakshiq.com",
    images: [{ url: "https://nakshiq.com/og-image.jpg", width: 800, height: 450, alt: "NakshIQ — Travel Intelligence for India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NakshIQ — Travel Intelligence for India",
    description: "143 destinations, 408+ places with monthly scores, kids ratings, safety data, and AI itineraries.",
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
      <body className="min-h-full flex flex-col bg-background text-foreground text-base">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "NakshIQ",
            url: "https://nakshiq.com",
            logo: "https://nakshiq.com/icon-192.png",
            description: "Travel intelligence for India. 143 destinations with monthly scores, kids ratings, safety data, and AI-powered itineraries.",
            sameAs: [],
          }) }}
        />
        <NextIntlClientProvider messages={messages}>
          <CompareProvider>
            <ScrollToTop />
            {children}
            <StickyCTA />
            <PersonalisationQuiz />
          </CompareProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
