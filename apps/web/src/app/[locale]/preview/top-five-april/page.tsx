import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TopFiveHero, type TopFiveRow } from "@/components/top-five-hero";
import { createClient } from "@supabase/supabase-js";

/**
 * Preview route — /en/preview/top-five-april
 *
 * Standalone page that renders ONLY the proposed Top 5 hero module with real
 * April data, wrapped in the site's existing Nav + Footer. Zero edits to any
 * other file; delete this folder and apps/web/src/components/top-five-hero.tsx
 * to fully remove the preview.
 *
 * Deliberately noindex — not in sitemap, not linked from anywhere public.
 */

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Preview · Top 5 in April (not for production)",
    robots: { index: false, follow: false },
  };
}

async function getAprilTopFive(): Promise<TopFiveRow[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);

  // First pass: top 5 destination_ids for April by score.
  const { data: monthRows } = await supabase
    .from("destination_months")
    .select("destination_id, score")
    .eq("month", 4)
    .order("score", { ascending: false })
    .order("destination_id", { ascending: true })
    .limit(5);

  if (!monthRows || monthRows.length === 0) return [];

  const ids = monthRows.map((r) => r.destination_id);

  // Second pass: hydrate each destination + ALL its monthly scores (for the
  // 12-bar sparkline). Separate query keeps the types simple and avoids
  // Supabase's nested-select array/object ambiguity.
  const [destRes, allMonthsRes] = await Promise.all([
    supabase
      .from("destinations")
      .select("id, name, tagline, elevation_m, state:states(name)")
      .in("id", ids),
    supabase
      .from("destination_months")
      .select("destination_id, month, score")
      .in("destination_id", ids),
  ]);

  const destinations = (destRes.data ?? []) as any[];
  const allMonths = (allMonthsRes.data ?? []) as Array<{
    destination_id: string;
    month: number;
    score: number;
  }>;

  // Build sparkline arrays keyed by destination_id.
  const monthsById = new Map<string, number[]>();
  for (const id of ids) monthsById.set(id, new Array(12).fill(0));
  for (const r of allMonths) {
    const arr = monthsById.get(r.destination_id);
    if (arr && r.month >= 1 && r.month <= 12) {
      arr[r.month - 1] = r.score ?? 0;
    }
  }

  // Merge + preserve the original ranked order.
  const byId = new Map(destinations.map((d) => [d.id, d]));
  const rows: TopFiveRow[] = monthRows
    .map((mr) => {
      const d = byId.get(mr.destination_id);
      if (!d) return null;
      const stateInfo = d.state;
      const stateName = Array.isArray(stateInfo)
        ? stateInfo[0]?.name ?? null
        : stateInfo?.name ?? null;
      return {
        id: d.id,
        name: d.name,
        tagline: d.tagline ?? null,
        state: stateName,
        elevation_m: d.elevation_m ?? null,
        score: mr.score ?? 0,
        monthlyScores: monthsById.get(d.id) ?? new Array(12).fill(0),
      } satisfies TopFiveRow;
    })
    .filter((r): r is TopFiveRow => r !== null);

  return rows;
}

export default async function TopFiveAprilPreviewPage() {
  const topFive = await getAprilTopFive();

  // ItemList JSON-LD — the same schema we'd emit on the real page if this
  // module gets promoted. Keeps the preview a faithful dress-rehearsal for
  // Google's Rich Results test.
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    name: "Top 5 destinations in India in April",
    description:
      "The five destinations scoring highest on the NakshIQ Score for April — ranked by weather, roads, crowds, and safety data.",
    numberOfItems: topFive.length,
    itemListElement: topFive.map((row, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.nakshiq.com/en/destination/${row.id}`,
      name: row.name,
      image: `https://www.nakshiq.com/images/destinations/${row.id}.jpg`,
    })),
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Nav />

      {/* Preview banner — hairline, Geist Mono, vermillion accent. */}
      <div className="border-b border-[#E55642]/40 bg-[#E55642]/[0.06]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#E55642]">
          <span>◉ Preview · /preview/top-five-april</span>
          <span className="hidden sm:inline text-[#E55642]/70">
            Not linked from production · noindex · safe to delete
          </span>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {topFive.length === 0 ? (
          <div className="py-20 text-center text-white/60">
            <p>No April data available. Check that Supabase env vars are set.</p>
          </div>
        ) : (
          <TopFiveHero
            topFive={topFive}
            monthNum={4}
            monthName="April"
            monthSlug="april"
            asOfDate="April 2026"
          />
        )}

        {/* Footnote — what this stand-alone is simulating. */}
        <div className="mt-16 border-t border-white/10 pt-6 font-sans text-[13px] leading-relaxed text-white/55 max-w-[680px]">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
            On the real page
          </p>
          <p>
            Above this footnote would sit the proposed Top 5 hero. Below it
            (on the live <code className="font-mono text-[12px] text-white/70">/where-to-go/april</code>{" "}
            route) the existing <em>Go Now</em>, <em>Good Time</em>, <em>Fair</em>,
            and <em>Where NOT to Go</em> sections render unchanged. Only the five
            destinations shown in the hero are removed from the <em>Go Now</em> grid
            below — everything else on the month landing page stays identical.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
