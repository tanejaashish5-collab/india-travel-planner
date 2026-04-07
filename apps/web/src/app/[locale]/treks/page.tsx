import { Nav } from "@/components/nav";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { createClient } from "@supabase/supabase-js";

async function getTrekDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, tags, state:states(name)")
    .contains("tags", ["trek"])
    .order("name");
  return data ?? [];
}

export default async function TreksPage() {
  const trekDests = await getTrekDestinations();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <TreksContent trekDests={trekDests} />
      </main>
    </div>
  );
}

function TreksContent({ trekDests }: { trekDests: any[] }) {
  const locale = useLocale();
  const tn = useTranslations("nav");

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{tn("treks")}</h1>
        <p className="mt-1 text-muted-foreground">
          Trekking destinations across North India — from easy day hikes to
          extreme multi-day expeditions
        </p>
      </div>

      {/* Trek destinations */}
      <div className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">
          Destinations with Treks ({trekDests.length})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trekDests.map((d: any) => {
            const stateName = Array.isArray(d.state)
              ? d.state[0]?.name
              : d.state?.name;
            return (
              <Link
                key={d.id}
                href={`/${locale}/destination/${d.id}`}
                className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50"
              >
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {d.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {d.tagline}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  {stateName && <span>{stateName}</span>}
                  <span>·</span>
                  <span className="capitalize">{d.difficulty}</span>
                  {d.elevation_m && (
                    <>
                      <span>·</span>
                      <span className="font-mono">{d.elevation_m}m</span>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Coming soon notice */}
      <div className="rounded-xl border border-dashed border-border p-8 text-center">
        <h3 className="text-lg font-semibold">Full Trek Database Coming Soon</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          We're building a comprehensive trek database with difficulty ratings,
          altitude profiles, duration, permits, and gear checklists for every
          trek in North India.
        </p>
      </div>
    </>
  );
}
