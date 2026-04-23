import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sos" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    ...localeAlternates(locale, "/sos"),
  };
}

// Official India emergency numbers. Sources:
// - 112: Ministry of Home Affairs (ERSS)
// - 100/101/102: long-standing national services
// - 108: state emergency response (operated via EMRI in most states)
// - 1091/1098: Ministry of Women & Child Development
// - 1073: Ministry of Road Transport & Highways
// - 1363: Ministry of Tourism (24x7, multi-lingual)
// - 139: Indian Railways
// - 1077: NDMA district control rooms
// If any number is ever reported unreachable, audit against the source.
const HELPLINES: { num: string; labelKey: string; priority?: boolean }[] = [
  { num: "100", labelKey: "police100" },
  { num: "101", labelKey: "fire101" },
  { num: "102", labelKey: "ambulance102" },
  { num: "108", labelKey: "emergency108" },
  { num: "1091", labelKey: "women1091" },
  { num: "1098", labelKey: "child1098" },
  { num: "1073", labelKey: "road1073" },
  { num: "1363", labelKey: "tourist1363" },
  { num: "139", labelKey: "rail139" },
  { num: "1077", labelKey: "disaster1077" },
];

export default async function SosLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sos" });

  return (
    <div className="min-h-screen">
      <Nav />
      <main id="main-content" className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        {/* 112 hero */}
        <div className="rounded-2xl border-2 border-red-500/70 bg-gradient-to-br from-red-950/40 to-red-900/20 p-6 sm:p-8">
          <div className="text-xs uppercase tracking-wider text-red-400 mb-2">{t("emergencyNumbers")}</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            {t("landingHeading")}
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed max-w-2xl">{t("landingIntro")}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 rounded-full bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 text-lg transition-colors"
            >
              112 · {t("callNow")}
            </a>
            <span className="text-xs text-muted-foreground">{t("worksAllNetworks")}</span>
          </div>
        </div>

        {/* National helplines */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-4">{t("nationalHelplines")}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {HELPLINES.map(({ num, labelKey }) => (
              <a
                key={num}
                href={`tel:${num}`}
                className="flex items-center justify-between rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-card/80 transition-colors px-4 py-3"
              >
                <span className="text-sm text-foreground">{t(labelKey)}</span>
                <span className="font-mono font-bold text-lg text-primary">{num}</span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">{t("sourceDisclaimer")}</p>
        </section>

        {/* Destination-level pointer */}
        <section className="mt-12 rounded-2xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-lg font-semibold">{t("perDestinationTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">{t("perDestinationBody")}</p>
          <Link
            href={`/${locale}/explore`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            {t("goToExplore")} →
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
