import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;
export const dynamicParams = true;

const MONTH_MAP: Record<string, { num: number; name: string }> = {
  january: { num: 1, name: "January" }, february: { num: 2, name: "February" },
  march: { num: 3, name: "March" }, april: { num: 4, name: "April" },
  may: { num: 5, name: "May" }, june: { num: 6, name: "June" },
  july: { num: 7, name: "July" }, august: { num: 8, name: "August" },
  september: { num: 9, name: "September" }, october: { num: 10, name: "October" },
  november: { num: 11, name: "November" }, december: { num: 12, name: "December" },
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; monthSlug: string}> }): Promise<Metadata> {
  const { locale, monthSlug } = await params;
  const m = MONTH_MAP[monthSlug];
  if (!m) return {
  };
  return {
    title: `Festivals in India in ${m.name} — Complete Calendar | NakshIQ`,
    description: `Every festival happening across India in ${m.name} with dates, locations, and what to expect. Time your trip around India's celebrations.`,
  };
}

export default async function FestivalsByMonthPage({ params }: { params: Promise<{ locale: string; monthSlug: string }> }) {
  const { locale, monthSlug } = await params;
  const m = MONTH_MAP[monthSlug];
  if (!m) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: festivals } = await supabase
    .from("festivals")
    .select("*, destinations(name, state:states(name))")
    .eq("month", m.num)
    .order("name");

  const MONTH_SLUGS = Object.keys(MONTH_MAP);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Festival Calendar</p>
          <h1 className="text-3xl font-bold">Festivals in {m.name}</h1>
          <p className="mt-2 text-muted-foreground">
            {(festivals ?? []).length} festivals happening across India in {m.name}
          </p>
        </div>

        {/* Month picker */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {MONTH_SLUGS.map((ms) => (
            <Link
              key={ms}
              href={`/${locale}/festivals/month/${ms}`}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                ms === monthSlug
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {MONTH_MAP[ms].name.slice(0, 3)}
            </Link>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(festivals ?? []).map((f: any) => (
            <div key={f.id} className="rounded-2xl border border-border/50 bg-card p-5 hover:border-primary/30 transition-colors">
              <h3 className="font-semibold text-foreground">{f.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{f.destinations?.name}</span>
                {f.destinations?.state?.name && (
                  <span className="text-[10px] rounded-full bg-muted px-2 py-0.5 text-muted-foreground">{f.destinations.state.name}</span>
                )}
              </div>
              {f.description && <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{f.description}</p>}
              {f.dates && <p className="text-xs font-medium text-primary mt-2">{f.dates}</p>}
            </div>
          ))}
        </div>

        {(festivals ?? []).length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p>No festivals listed for {m.name} yet.</p>
            <Link href={`/${locale}/festivals`} className="text-primary hover:underline mt-2 inline-block">View all festivals →</Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
