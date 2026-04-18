import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { GapYearPageClient } from "@/components/gap-year-page-client";
import { localeAlternates } from "@/lib/seo-utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "The Gap Year Planner — 3 to 12 Months Across India | NakshIQ",
    description:
      "Plan a 3–12 month India trip month by month. Real monthly scoring, kid-safe filters, budget roll-up, shareable link. Not a brochure — a working plan.",
    ...localeAlternates(locale, "/gap-year"),
  };
}

export default async function GapYearPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <GapYearPageClient locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
