import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AskNakshIQPage } from "@/components/ask-nakshiq-page";
import { localeAlternates } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Ask NakshIQ — AI Travel Assistant for India",
  description: "Ask anything about traveling in India. Get instant answers powered by 340+ destinations, 710+ POIs, monthly scores, kids ratings, and safety data.",

    ...localeAlternates(locale, "/ask"),
  };
}export default async function AskPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen">
      <Nav />
      <main id="main-content" className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Ask NakshIQ</h1>
          <p className="mt-2 text-muted-foreground">
            AI travel assistant — ask anything about destinations, best times, safety, or planning
          </p>
        </div>
        <AskNakshIQPage locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
