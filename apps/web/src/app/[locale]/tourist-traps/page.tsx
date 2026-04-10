import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";

const SITE = "https://nakshiq.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const traps = await getTouristTraps();
  const count = traps.length;
  const title = `Tourist Traps Exposed — ${count}+ Overhyped Places in India | NakshIQ`;
  const description = `Honest alternatives to India's ${count} most overhyped tourist destinations. No sponsored recommendations — just data-driven suggestions for where to go instead.`;
  const canonicalUrl = `${SITE}/${locale}/tourist-traps`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE}/en/tourist-traps`,
        hi: `${SITE}/hi/tourist-traps`,
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

interface TouristTrap {
  trap_destination_id: string;
  trap_name: string;
  why_trap: string;
  alternative_destination_id: string;
  why_better: string;
  rank: number;
  trap_destination: { name: string } | null;
  alternative_destination: { name: string } | null;
}

async function getTouristTraps(): Promise<TouristTrap[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("tourist_trap_alternatives")
    .select(
      "trap_destination_id, trap_name, why_trap, alternative_destination_id, why_better, rank, trap_destination:destinations!trap_destination_id(name), alternative_destination:destinations!alternative_destination_id(name)"
    )
    .order("rank", { ascending: true });

  return (data as TouristTrap[] | null) ?? [];
}

export default async function TouristTrapsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const traps = await getTouristTraps();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tourist Traps Exposed — Overhyped Places in India",
    description:
      "Honest alternatives to India's most overhyped tourist destinations.",
    numberOfItems: traps.length,
    itemListElement: traps.map((trap, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: trap.trap_name,
      description: trap.why_trap,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
            {traps.length} traps exposed
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Tourist Traps Exposed
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            Honest alternatives to India&apos;s most overhyped destinations. No
            sponsored recommendations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {traps.map((trap) => {
            const trapDest = Array.isArray(trap.trap_destination)
              ? trap.trap_destination[0]
              : trap.trap_destination;
            const altDest = Array.isArray(trap.alternative_destination)
              ? trap.alternative_destination[0]
              : trap.alternative_destination;

            return (
              <article
                key={`${trap.trap_destination_id}-${trap.alternative_destination_id}`}
                className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                {/* Trap side */}
                <div className="mb-4">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-red-700 dark:bg-red-950/60 dark:text-red-400">
                      Skip
                    </span>
                    <h2 className="text-lg font-bold text-foreground">
                      {trap.trap_name}
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {trap.why_trap}
                  </p>
                  {trapDest && (
                    <Link
                      href={`/${locale}/destination/${trap.trap_destination_id}`}
                      className="mt-1.5 inline-block text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                    >
                      View {trapDest.name} &rarr;
                    </Link>
                  )}
                </div>

                {/* Arrow divider */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xl text-muted-foreground">&darr;</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* Alternative side */}
                <div>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      Go here instead
                    </span>
                    {altDest && (
                      <h3 className="text-lg font-bold text-foreground">
                        {altDest.name}
                      </h3>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {trap.why_better}
                  </p>
                  {altDest && (
                    <Link
                      href={`/${locale}/destination/${trap.alternative_destination_id}`}
                      className="mt-1.5 inline-block text-xs font-medium text-primary underline-offset-2 hover:underline"
                    >
                      Explore {altDest.name} &rarr;
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty state */}
        {traps.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No tourist trap data available yet. Check back soon.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
