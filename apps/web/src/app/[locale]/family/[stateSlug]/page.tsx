import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 86400;

const STATE_MAP: Record<string, string> = {
  "himachal-pradesh": "Himachal Pradesh", "uttarakhand": "Uttarakhand",
  "jammu-kashmir": "Jammu & Kashmir", "ladakh": "Ladakh",
  "rajasthan": "Rajasthan", "punjab": "Punjab",
  "uttar-pradesh": "Uttar Pradesh", "sikkim": "Sikkim",
  "west-bengal": "West Bengal", "madhya-pradesh": "Madhya Pradesh",
  "arunachal-pradesh": "Arunachal Pradesh", "assam": "Assam",
  "meghalaya": "Meghalaya", "nagaland": "Nagaland",
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({ params }: { params: Promise<{ stateSlug: string }> }): Promise<Metadata> {
  const { stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {};
  return {
    title: `Family-Friendly Destinations in ${stateName} — Kids Ratings | NakshIQ`,
    description: `Every family-friendly destination in ${stateName} with kids ratings, age suitability, medical access, altitude warnings, and honest assessments. Written by parents.`,
  };
}

export default async function FamilyByStatePage({ params }: { params: Promise<{ locale: string; stateSlug: string }> }) {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: destinations } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, state:states(name), kids_friendly(suitable, rating, min_age, reasons)")
    .eq("state_id", stateSlug)
    .order("name");

  // Filter to family-suitable and sort by kids rating
  const familyDests = (destinations ?? [])
    .filter((d: any) => d.kids_friendly?.some((k: any) => k.suitable))
    .sort((a: any, b: any) => {
      const aRating = a.kids_friendly?.[0]?.rating ?? 0;
      const bRating = b.kids_friendly?.[0]?.rating ?? 0;
      return bRating - aRating;
    });

  const RATING_COLORS: Record<number, string> = {
    5: "text-green-400 bg-green-400/10",
    4: "text-green-400 bg-green-400/10",
    3: "text-yellow-400 bg-yellow-400/10",
    2: "text-orange-400 bg-orange-400/10",
    1: "text-red-400 bg-red-400/10",
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Family Travel</p>
          <h1 className="text-3xl font-bold">Family Destinations in {stateName}</h1>
          <p className="mt-2 text-muted-foreground">
            {familyDests.length} kid-friendly destinations — rated for age suitability, medical access, and safety
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {familyDests.map((d: any) => {
            const kids = d.kids_friendly?.[0];
            const rating = kids?.rating ?? 0;
            return (
              <Link
                key={d.id}
                href={`/${locale}/with-kids/${d.id}`}
                className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 transition-colors"
              >
                <div className="relative h-36 bg-muted/30">
                  <Image
                    src={`/images/destinations/${d.id}.jpg`}
                    alt={d.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${RATING_COLORS[rating] ?? "text-muted-foreground bg-muted"}`}>
                      Kids {rating}/5
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{d.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.tagline}</p>
                  {kids?.min_age && (
                    <p className="text-[10px] text-muted-foreground mt-2">Suitable for ages {kids.min_age}+</p>
                  )}
                  {kids?.reasons?.[0] && (
                    <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{kids.reasons[0]}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {familyDests.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p>No family-rated destinations in {stateName} yet.</p>
            <Link href={`/${locale}/explore/state/${stateSlug}`} className="text-primary hover:underline mt-2 inline-block">View all {stateName} destinations →</Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
