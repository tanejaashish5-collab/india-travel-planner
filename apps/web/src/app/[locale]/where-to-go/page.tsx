import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { currentMonthIST, currentMonthLongIST } from "@itp/shared";

export const revalidate = 86400;

const SITE = "https://www.nakshiq.com";

const MONTHS: { num: number; slug: string; long: string; short: string }[] = [
  { num: 1,  slug: "january",   long: "January",   short: "Jan" },
  { num: 2,  slug: "february",  long: "February",  short: "Feb" },
  { num: 3,  slug: "march",     long: "March",     short: "Mar" },
  { num: 4,  slug: "april",     long: "April",     short: "Apr" },
  { num: 5,  slug: "may",       long: "May",       short: "May" },
  { num: 6,  slug: "june",      long: "June",      short: "Jun" },
  { num: 7,  slug: "july",      long: "July",      short: "Jul" },
  { num: 8,  slug: "august",    long: "August",    short: "Aug" },
  { num: 9,  slug: "september", long: "September", short: "Sep" },
  { num: 10, slug: "october",   long: "October",   short: "Oct" },
  { num: 11, slug: "november",  long: "November",  short: "Nov" },
  { num: 12, slug: "december",  long: "December",  short: "Dec" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Where to Go in India — by Month | NakshIQ";
  const description = "Pick a month and see India's 5/5 destinations for that window. Honest verdicts, weather windows, and skip-list flags. 460+ destinations scored.";
  const canonical = `${SITE}/${locale}/where-to-go`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE}/en/where-to-go`,
        hi: `${SITE}/hi/where-to-go`,
        "x-default": `${SITE}/en/where-to-go`,
      },
    },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

async function getMonthCounts(): Promise<Record<number, { go: number; skip: number }>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};
  const supabase = createClient(url, key);

  // destination_months has ~5,892 rows (491 dests × 12 months). Supabase
  // server-enforces a 1000-row cap on any .select() — even .range(0, 9999)
  // does NOT bypass it. So a naive .gte("score", 4) returns only the first
  // 1000 matches, which all sit in Jan–Mar (alphabetic dest_id order),
  // zeroing every month from April onward.
  //
  // Fix: 24 parallel head:true count queries — Postgres returns count(*)
  // per (month, bucket) as a single number with no row-cap exposure.
  // Note: select('*', ...) — select('id', ...) returns count=null due to
  // a PostgREST quirk we hit while debugging.
  const countFor = async (m: number, bucket: "go" | "skip") => {
    const q = supabase
      .from("destination_months")
      .select("*", { count: "exact", head: true })
      .eq("month", m);
    const r = bucket === "go" ? await q.gte("score", 4) : await q.lte("score", 1);
    return { month: m, bucket, count: r.count ?? 0 };
  };

  const queries: Array<Promise<{ month: number; bucket: "go" | "skip"; count: number }>> = [];
  for (let m = 1; m <= 12; m++) {
    queries.push(countFor(m, "go"));
    queries.push(countFor(m, "skip"));
  }
  const results = await Promise.all(queries);

  const out: Record<number, { go: number; skip: number }> = {};
  for (let m = 1; m <= 12; m++) out[m] = { go: 0, skip: 0 };
  for (const r of results) out[r.month][r.bucket] = r.count;
  return out;
}

export default async function WhereToGoIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const counts = await getMonthCounts();
  const currentMonth = currentMonthIST();
  const currentLong = currentMonthLongIST();

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Travel calendar</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Where to Go in India — by Month
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
            Pick a month. See the destinations that score 4+ out of 5 for that window — and the ones to skip.
            Verdicts come from weather, crowds, road conditions, and on-the-ground notes; not from sponsored picks.
          </p>
        </div>

        {/* Current month CTA */}
        <Link
          href={`/${locale}/where-to-go/${MONTHS[currentMonth - 1].slug}`}
          className="mb-8 flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/5 p-5 hover:border-primary/50 transition-colors"
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Travelling now?</div>
            <div className="mt-1 text-lg font-semibold text-foreground">
              See the {counts[currentMonth]?.go ?? 0} 5/5 destinations for {currentLong}
            </div>
          </div>
          <span className="text-primary text-xl" aria-hidden>→</span>
        </Link>

        {/* 12-month grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {MONTHS.map((m) => {
            const c = counts[m.num] ?? { go: 0, skip: 0 };
            const isCurrent = m.num === currentMonth;
            return (
              <Link
                key={m.slug}
                href={`/${locale}/where-to-go/${m.slug}`}
                className={`group rounded-2xl border p-4 sm:p-5 transition-all ${
                  isCurrent
                    ? "border-primary/50 bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <h2 className="text-lg font-semibold text-foreground">{m.long}</h2>
                  {isCurrent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Now</span>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-mono font-bold text-emerald-400">{c.go}</span>
                    <span className="text-xs text-muted-foreground">5/5 picks</span>
                  </div>
                  {c.skip > 0 && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-mono text-red-400">{c.skip}</span>
                      <span className="text-xs text-muted-foreground">to skip</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Methodology footnote */}
        <div className="mt-12 rounded-xl border border-border bg-muted/20 p-5 text-sm text-muted-foreground leading-relaxed">
          <p className="font-medium text-foreground mb-1">How scores work</p>
          <p>
            Each destination is scored 0–5 for every month based on weather (precipitation, temperature, daylight),
            road accessibility, festival/permit windows, and altitude considerations. 4–5 means &ldquo;go now&rdquo;.
            0–1 surfaces as a skip with a specific reason. Methodology and source data are at{" "}
            <Link href={`/${locale}/methodology`} className="text-primary underline-offset-2 hover:underline">
              /methodology
            </Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
