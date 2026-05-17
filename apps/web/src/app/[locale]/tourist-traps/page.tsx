import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TouristTrapsEditorial, type TrapEntry } from "@/components/tourist-traps-editorial";
import { createClient } from "@supabase/supabase-js";
import { currentMonthLongIST } from "@itp/shared";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 3600;

const SITE = "https://www.nakshiq.com";

interface RawRow {
  trap_destination_id: string;
  alternative_destination_id: string;
  why_better: string | null;
  comparison: string | null;
  rank: number;
  brochure_line: string | null;
  editorial_verdict: string | null;
  editorial_format: "standard" | "pullquote" | "ledger";
  pullquote: string | null;
  ledger: Array<{ brochure: string; real: string }> | null;
  tags: string[] | null;
  trap_dest:
    | { name: string; state: { name: string } | { name: string }[] | null }
    | { name: string; state: { name: string } | { name: string }[] | null }[]
    | null;
  alt_dest: { name: string } | { name: string }[] | null;
}

function pickFirst<T>(v: T | T[] | null): T | null {
  if (!v) return null;
  return Array.isArray(v) ? (v[0] ?? null) : v;
}

async function getTrapEntries(): Promise<TrapEntry[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("tourist_trap_alternatives")
    .select(
      `trap_destination_id, alternative_destination_id, why_better, comparison, rank,
       brochure_line, editorial_verdict, editorial_format, pullquote, ledger, tags,
       trap_dest:destinations!trap_destination_id(name, state:states(name)),
       alt_dest:destinations!alternative_destination_id(name)`,
    )
    .eq("rank", 1)
    .order("trap_destination_id");

  if (error || !data) {
    if (error) console.error("Tourist traps query error:", error);
    return [];
  }

  // Editorial-grade rows only — those with brochure_line + editorial_verdict.
  // Plain rows fall back to /skip-list/[slug] detail pages and are folded
  // into future enrichment batches.
  const rows = data as unknown as RawRow[];
  const enriched = rows.filter((r) => r.brochure_line && r.editorial_verdict);

  // Dedupe by trap_destination_id — some traps have multiple rank-1 alts
  // (rank ties). Keep the first per trap so each entry shows once.
  const seen = new Set<string>();
  const distinct = enriched.filter((r) => {
    if (seen.has(r.trap_destination_id)) return false;
    seen.add(r.trap_destination_id);
    return true;
  });

  // Stable order: alphabetical by trap_destination_id so entry numbering is
  // deterministic across builds.
  distinct.sort((a, b) => a.trap_destination_id.localeCompare(b.trap_destination_id));
  const ordered = distinct;

  return ordered.map((r, i): TrapEntry => {
    const trap = pickFirst(r.trap_dest);
    const alt = pickFirst(r.alt_dest);
    const stateRow = trap ? pickFirst(trap.state) : null;
    return {
      n: String(i + 1).padStart(2, "0"),
      slug: r.trap_destination_id,
      skip: trap?.name ?? r.trap_destination_id,
      region: stateRow?.name ?? "India",
      brochureLine: r.brochure_line,
      verdict: r.editorial_verdict ?? r.comparison ?? null,
      pullquote: r.pullquote,
      format: r.editorial_format ?? "standard",
      ledger: Array.isArray(r.ledger) ? r.ledger : [],
      tags: Array.isArray(r.tags) ? r.tags : [],
      instead: {
        slug: r.alternative_destination_id,
        name: alt?.name ?? r.alternative_destination_id,
        why: r.why_better ?? "",
      },
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const entries = await getTrapEntries();
  const count = entries.length;
  const title = `Tourist Traps — ${count}+ Overhyped Places in India | NakshIQ`;
  const description = `An honest editorial: the places India's tourism boards still photograph for the brochure, and the alternatives within forty kilometres that nobody bothered to tell you about.`;
  const canonicalUrl = `${SITE}/${locale}/tourist-traps`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE}/en/tourist-traps`,
        hi: `${SITE}/hi/tourist-traps`,
        "x-default": `${SITE}/en/tourist-traps`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: "NakshIQ",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TouristTrapsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const entries = await getTrapEntries();

  // Issue label: "Issue 02 / May 2026" — month from IST helper to dodge
  // the UTC month-rollover bug (per apps/web/AGENTS.md).
  const monthName = currentMonthLongIST();
  const year = new Date().getUTCFullYear();
  const issueLabel = `Issue ${String(new Date().getUTCMonth() + 1).padStart(2, "0")} / ${monthName} ${year}`;
  const editedDateLabel = `${monthName} ${year}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tourist Traps — Overhyped Places in India",
    description: "Honest editorial alternatives to India's most overhyped tourist destinations.",
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.skip,
      description: entry.verdict ?? entry.instead.why,
      url: `${SITE}/${locale}/skip-list/${entry.slug}`,
    })),
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {entries.length > 0 ? (
        <TouristTrapsEditorial
          entries={entries}
          locale={locale}
          issueLabel={issueLabel}
          editedDateLabel={editedDateLabel}
        />
      ) : (
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "140px 24px 64px",
            textAlign: "center",
            fontFamily: "var(--cinema-display)",
            fontStyle: "italic",
            fontSize: 22,
            color: "var(--bone-dim)",
          }}
        >
          The next issue is being written. Check back soon.
        </div>
      )}
      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
