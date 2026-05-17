import type { Metadata } from "next";
import PermitsTable from "@/components/permits-table";
import { localeAlternates } from "@/lib/seo-utils";
import { CinematicGuide } from "@/components/cinematic-guide";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "India Permits Guide — ILP, PAP, RAP state by state",
    description:
      "Ladakh, Sikkim, Arunachal Pradesh, Nagaland, Mizoram, Manipur. Inner Line Permit and Protected Area Permit — process, validity, official sources. For Indian citizens and foreign nationals.",
    ...localeAlternates(locale, "/guide/permits"),
  };
}

export default async function PermitsGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const sections = [
    {
      id: "permits-table",
      title: "Six permit regimes, state by state",
      body: <PermitsTable />,
    },
    {
      id: "verify-source",
      title: "Always verify with the official source",
      body: (
        <p
          style={{
            fontFamily: "var(--cinema-ui)",
            fontSize: 16,
            lineHeight: 1.75,
            color: "var(--bone-dim)",
            margin: 0,
          }}
        >
          Rules change. Fees change. Validity windows change. The table above
          links each permit row to the authoritative state portal — visit it
          before you travel. We do not cache the portal&apos;s current prices;
          the only reliable price is the one the portal shows you today.
        </p>
      ),
    },
  ];

  return (
    <CinematicGuide
      kicker={`GUIDES · PERMITS · REVIEWED ${new Date().toISOString().slice(0, 10)}`}
      title="Inner Line Permit + Protected Area Permit, state by state."
      dek="Six Indian regions still require a permit to enter — a holdover from pre-Independence frontier policy kept alive for strategic, environmental, and cultural reasons. Indian citizens and foreign nationals face different processes. This is the current state of all six, with official links."
      sections={sections}
      nextGuide={{
        href: `/${locale}/guide/book-indian-trains`,
        title: "How to book Indian trains as a foreigner — IRCTC, FTQ, Tatkal.",
      }}
    />
  );
}
