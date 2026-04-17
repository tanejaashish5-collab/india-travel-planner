import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { VS_PAIRS, VS_THEME_LABELS, VS_DESTINATION_IDS } from "@/lib/vs-pairs";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Compare India Destinations: Side-by-Side Travel Comparisons",
    description: `${VS_PAIRS.length}+ honest destination comparisons — Manali vs Shimla, Spiti vs Ladakh, Ooty vs Kodaikanal. Weather, cost, difficulty & kid-friendliness side-by-side.`,
    ...localeAlternates(locale, "/vs"),
  };
}

async function getDestinationNames() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select("id, name, state:states(name)")
    .in("id", VS_DESTINATION_IDS);
  const map: Record<string, { name: string; state: string }> = {};
  (data ?? []).forEach((d: any) => {
    map[d.id] = {
      name: d.name,
      state: Array.isArray(d.state) ? d.state[0]?.name : d.state?.name,
    };
  });
  return map;
}

export default async function VsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const destMap = await getDestinationNames();

  // Group pairs by theme
  const byTheme: Record<string, typeof VS_PAIRS> = {};
  VS_PAIRS.forEach((p) => {
    if (!byTheme[p.theme]) byTheme[p.theme] = [];
    byTheme[p.theme].push(p);
  });

  // Preserve the order themes appear in VS_PAIRS
  const themes = Array.from(new Set(VS_PAIRS.map((p) => p.theme)));

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8 pb-24 md:pb-8">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold">Compare Destinations</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            {VS_PAIRS.length} side-by-side comparisons across India — weather scores by month,
            cost, difficulty, kid-friendliness, and infrastructure. Pick the one that fits your trip.
          </p>
        </div>

        {themes.map((theme) => (
          <section key={theme} className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">
              {VS_THEME_LABELS[theme] ?? theme}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {byTheme[theme].map((p) => {
                const d1 = destMap[p.id1];
                const d2 = destMap[p.id2];
                if (!d1 || !d2) return null;
                return (
                  <Link
                    key={`${p.id1}-${p.id2}`}
                    href={`/${locale}/vs/${p.id1}-vs-${p.id2}`}
                    className="group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all"
                  >
                    <span className="text-sm">
                      <span className="font-semibold">{d1.name}</span>
                      <span className="text-muted-foreground mx-2">vs</span>
                      <span className="font-semibold">{d2.name}</span>
                    </span>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">→</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
