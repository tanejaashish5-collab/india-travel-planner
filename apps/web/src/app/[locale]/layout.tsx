import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { StickyCTA } from "@/components/sticky-cta";
import { PersonalisationQuiz } from "@/components/personalisation-quiz";
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

export const metadata: Metadata = {
  title: {
    default: "India Travel Planner — Explore Every Village, Trail & Hidden Gem",
    template: "%s | India Travel Planner",
  },
  manifest: "/manifest.json",
  description:
    "400+ destinations with monthly suitability scores, kids ratings, safety data, and AI-powered itineraries. The confidence engine for exploring India.",
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
    title: "India Travel Planner — Explore Every Village, Trail & Hidden Gem",
    description:
      "370+ destinations with monthly scores, kids ratings, safety data, and AI itineraries.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 800, height: 450, alt: "India Travel Planner" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
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
        <NextIntlClientProvider messages={messages}>
          {children}
          <StickyCTA />
          <PersonalisationQuiz />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
