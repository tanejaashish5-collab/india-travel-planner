import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARRIVAL, IATA_SLUGS } from "@/lib/arrival-data";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ["en", "hi"];
  return IATA_SLUGS.flatMap((iata) => locales.map((locale) => ({ locale, iata })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; iata: string }>;
}): Promise<Metadata> {
  const { locale, iata } = await params;
  const info = ARRIVAL[iata];
  if (!info) return {};
  return {
    title: `Arriving at ${info.iata} (${info.city}) — Prepaid Taxi, SIM, ATM, Scams | NakshIQ`,
    description: `Step-by-step arrival guide for ${info.name}, ${info.city}. Prepaid taxi counter, Uber zone, SIM activation, ATM guidance, and the one scam to watch for. Updated 2026.`,
    ...localeAlternates(locale, `/arrival/${iata}`),
  };
}

const SECTIONS: Array<{ key: keyof typeof ARRIVAL.del; label: string }> = [
  { key: "arrivalHall", label: "Arrival hall" },
  { key: "prepaidTaxi", label: "Prepaid taxi counter" },
  { key: "appCab", label: "Uber / Ola pickup" },
  { key: "publicTransport", label: "Metro / rail / bus" },
  { key: "simCounters", label: "SIM activation" },
  { key: "atmNotes", label: "ATM / forex" },
  { key: "scamWarning", label: "The scam to watch for" },
  { key: "afterMidnight", label: "After midnight" },
];

export default async function ArrivalPage({
  params,
}: {
  params: Promise<{ locale: string; iata: string }>;
}) {
  const { locale, iata } = await params;
  const info = ARRIVAL[iata];
  if (!info) notFound();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="mb-6 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Arrival playbook · {info.iata} · Reviewed {new Date().toISOString().slice(0, 10)}
          </div>
        </div>

        <header className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary/70">
            {info.iata} · {info.city}
          </p>
          <h1
            className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Arriving at {info.city}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {info.name}. Here is what happens in the 30 minutes between you clearing immigration and being in the city — counters, fares, the one scam to avoid, and what to do if you land at 2am.
          </p>
          <a
            href={info.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-mono text-[10px] tracking-[0.22em] uppercase text-[#E55642] hover:underline"
          >
            Official airport site →
          </a>
        </header>

        <div className="space-y-8">
          {SECTIONS.map((s) => {
            const isScam = s.key === "scamWarning";
            return (
              <section key={s.key}>
                <h2
                  className={`font-serif italic font-medium text-xl sm:text-2xl mb-2 ${isScam ? "text-[#E55642]" : "text-foreground"}`}
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {s.label}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{info[s.key]}</p>
              </section>
            );
          })}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-card/50 p-5 sm:p-6">
          <h2
            className="font-serif italic font-medium text-xl sm:text-2xl mb-3"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Other airports
          </h2>
          <div className="flex flex-wrap gap-2">
            {IATA_SLUGS.filter((s) => s !== iata).map((s) => (
              <Link
                key={s}
                href={`/${locale}/arrival/${s}`}
                className="rounded-full border border-border/60 bg-card/40 px-3 py-1 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:border-[#E55642]/40 hover:text-foreground transition-colors"
              >
                {ARRIVAL[s].iata} · {ARRIVAL[s].city}
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
            <Link href={`/${locale}/guide/permits`} className="block text-[#E55642] hover:underline">
              India permits — ILP, PAP, RAP state by state →
            </Link>
            <Link href={`/${locale}/guide/book-indian-trains`} className="block text-[#E55642] hover:underline">
              How to book Indian trains as a foreigner →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
