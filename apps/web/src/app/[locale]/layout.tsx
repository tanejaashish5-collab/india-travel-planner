import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "India Travel Planner — Explore Every Village, Trail & Hidden Gem",
    template: "%s | India Travel Planner",
  },
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
      "400+ destinations with monthly scores, kids ratings, safety data, and AI itineraries.",
    type: "website",
    locale: "en_IN",
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
