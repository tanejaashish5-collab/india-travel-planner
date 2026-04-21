import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import PermitsTable from "@/components/permits-table";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "India Permits Guide — ILP, PAP, RAP state by state | NakshIQ",
    description:
      "Ladakh, Sikkim, Arunachal Pradesh, Nagaland, Mizoram, Manipur. Inner Line Permit and Protected Area Permit — process, validity, official sources. For Indian citizens and foreign nationals.",
    ...localeAlternates(locale, "/guide/permits"),
  };
}

export default async function PermitsGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <div className="mb-6 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Method · 6 permit regimes · Indian + foreigner · Reviewed {new Date().toISOString().slice(0, 10)}
          </div>
        </div>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary/70">
            India permits
          </p>
          <h1 className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Inner Line Permit, Protected Area Permit — the process, state by state
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Six Indian regions still require a permit to enter — a holdover from pre-Independence frontier policy kept alive for strategic, environmental, and cultural reasons. Indian citizens and foreign nationals face different processes. This is the current state of all six, with official links.
          </p>
          <p className="mt-3 text-sm text-muted-foreground/80 max-w-2xl">
            Rules change. Fees change. Validity windows change. Always verify with the official source linked on each row before you travel — we point you at the portal; we do not cache the portal&apos;s current prices.
          </p>
        </header>

        <PermitsTable />

        <div className="mt-12 rounded-xl border border-border bg-card/50 p-5 sm:p-6">
          <h2 className="font-serif italic font-medium text-xl sm:text-2xl mb-3" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Related
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`/${locale}/permits`} className="text-[#E55642] hover:underline">
                Browse permits by destination (ILP, park entries, trek registrations) →
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/guide/book-indian-trains`} className="text-[#E55642] hover:underline">
                How to book Indian trains as a foreigner (FTQ, RAC, Tatkal) →
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
