import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ARRIVAL, IATA_SLUGS } from "@/lib/arrival-data";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Arrival Playbooks — India's 9 Major Airports | NakshIQ",
    description: "Step-by-step airport arrival guides for India: prepaid taxi counters, Uber zones, SIM activation, scams to avoid. Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Kochi, Goa, Ahmedabad.",
    ...localeAlternates(locale, "/arrival"),
  };
}

export default async function ArrivalIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <header className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.08em] text-primary/70">
            India guide
          </p>
          <h1
            className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Arrival playbooks — India's {IATA_SLUGS.length} major airports
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            What to do in the 30 minutes between immigration and the city. Prepaid taxi fares, Uber pickup zones, SIM counter details, ATM guidance, and the one local scam each airport is known for.
          </p>
        </header>

        <div className="space-y-4">
          {IATA_SLUGS.map((s) => {
            const info = ARRIVAL[s];
            return (
              <Link
                key={s}
                href={`/${locale}/arrival/${s}`}
                className="block rounded-xl border border-border bg-card/50 hover:border-[#E55642]/40 transition-colors p-5 sm:p-6"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2
                    className="font-serif italic font-medium text-xl sm:text-2xl"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    {info.city}
                  </h2>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                    {info.iata} · {info.state}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{info.name}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-card/50 p-5 sm:p-6">
          <h2
            className="font-serif italic font-medium text-xl sm:text-2xl mb-3"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            After you've landed
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`/${locale}/guide/permits`} className="text-[#E55642] hover:underline">
                India permits — ILP, PAP, RAP state by state →
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/guide/book-indian-trains`} className="text-[#E55642] hover:underline">
                How to book Indian trains as a foreigner →
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/methodology`} className="text-[#E55642] hover:underline">
                How NakshIQ scores destinations →
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
