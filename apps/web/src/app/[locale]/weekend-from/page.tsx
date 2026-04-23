import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { METRO_ANCHORS, METRO_SLUGS } from "@/lib/metro-anchors";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Weekend Trips from Indian Metros — Destinations Within 500 km, Scored | NakshIQ",
    description:
      "Weekend escapes from Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad. Every destination scored for the current month — no hill station that's closed, no beach under monsoon water.",
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}/weekend-from`,
      languages: {
        en: "https://www.nakshiq.com/en/weekend-from",
        hi: "https://www.nakshiq.com/hi/weekend-from",
      },
    },
  };
}

export default async function WeekendFromIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <header className="mb-10 max-w-3xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.08em] text-primary/70">
            Weekend escape
          </p>
          <h1
            className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Weekend from anywhere
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Pick your city. Every destination within 500 km is scored for the current month — no hill station that has already closed for winter, no beach that&apos;s under monsoon water. Six metros covered.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METRO_SLUGS.map((slug) => {
            const metro = METRO_ANCHORS[slug];
            return (
              <Link
                key={slug}
                href={`/${locale}/weekend-from-${slug}`}
                className="group block rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <p className="mb-2 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                  {metro.state}
                </p>
                <h2
                  className="font-serif italic font-medium text-2xl sm:text-3xl leading-tight text-foreground group-hover:text-primary transition-colors"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Weekend from {metro.name}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  500 km radius · 3 drive bands · current-month scores
                </p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary/80 group-hover:text-primary">
                  <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </p>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
