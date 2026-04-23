import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 3600;

const SITE = "https://www.nakshiq.com";

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
  alternative_destination_id: string;
  why_better: string;
  comparison: string;
  rank: number;
  distance_km: number | null;
  drive_time: string | null;
  crowd_difference: string | null;
  vibe_difference: string | null;
  trap_dest: { name: string }[] | { name: string } | null;
  alt_dest: { name: string }[] | { name: string } | null;
}

async function getTouristTraps(): Promise<TouristTrap[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("tourist_trap_alternatives")
    .select(
      `trap_destination_id, alternative_destination_id, why_better, comparison, rank, distance_km, drive_time, crowd_difference, vibe_difference,
       trap_dest:destinations!trap_destination_id(name),
       alt_dest:destinations!alternative_destination_id(name)`
    )
    .order("rank", { ascending: true });

  if (error) {
    console.error("Tourist traps query error:", error);
    return [];
  }

  return (data as TouristTrap[] | null) ?? [];
}

function getName(dest: { name: string }[] | { name: string } | null): string | null {
  if (!dest) return null;
  if (Array.isArray(dest)) return dest[0]?.name ?? null;
  return dest.name;
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
    description: "Honest alternatives to India's most overhyped tourist destinations.",
    numberOfItems: traps.length,
    itemListElement: traps.map((trap, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: getName(trap.trap_dest) || trap.trap_destination_id,
      description: trap.comparison,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      {/* Visual page hero */}
      <section className="relative h-48 sm:h-64 overflow-hidden">
        <Image src="/images/destinations/shimla.jpg" alt="Tourist Traps Exposed" fill sizes="100vw" priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Honest Travel</p>
          <h1 className="text-3xl font-semibold sm:text-4xl text-white drop-shadow-lg">Tourist Traps Exposed</h1>
          <p className="mt-2 text-white/80 max-w-xl">Honest alternatives to India&apos;s most overhyped destinations. No sponsored recommendations — just data-driven suggestions.</p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {traps.map((trap) => {
            const trapName = getName(trap.trap_dest);
            const altName = getName(trap.alt_dest);

            return (
              <article
                key={`${trap.trap_destination_id}-${trap.alternative_destination_id}`}
                className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                {/* Trap side */}
                <div className="mb-4">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="rounded bg-red-950/60 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-red-400">
                      Skip
                    </span>
                    <h2 className="text-lg font-semibold text-foreground">
                      {trapName || trap.trap_destination_id}
                    </h2>
                  </div>
                  {trap.comparison && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {trap.comparison}
                    </p>
                  )}
                  <div className="mt-1.5 flex gap-3">
                    {trapName && (
                      <Link
                        href={`/${locale}/destination/${trap.trap_destination_id}`}
                        className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                      >
                        View {trapName} &rarr;
                      </Link>
                    )}
                    <Link
                      href={`/${locale}/skip-list/${trap.trap_destination_id}`}
                      className="text-xs font-medium text-primary underline-offset-2 hover:underline"
                    >
                      Full analysis &rarr;
                    </Link>
                  </div>
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
                    <span className="rounded bg-emerald-950/60 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Go here instead
                    </span>
                    {altName && (
                      <h3 className="text-lg font-bold text-foreground">
                        {altName}
                      </h3>
                    )}
                  </div>
                  {trap.why_better && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {trap.why_better}
                    </p>
                  )}

                  {/* Extra details */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {trap.distance_km && (
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        {trap.distance_km} km away
                      </span>
                    )}
                    {trap.drive_time && (
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        {trap.drive_time}
                      </span>
                    )}
                    {trap.crowd_difference && (
                      <span className="rounded-full bg-emerald-950/30 px-2.5 py-1 text-xs text-emerald-400">
                        {trap.crowd_difference}
                      </span>
                    )}
                  </div>

                  {altName && (
                    <Link
                      href={`/${locale}/destination/${trap.alternative_destination_id}`}
                      className="mt-2 inline-block text-xs font-medium text-primary underline-offset-2 hover:underline"
                    >
                      Explore {altName} &rarr;
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
