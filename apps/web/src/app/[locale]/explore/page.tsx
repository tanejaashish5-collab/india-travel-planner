import { useTranslations } from "next-intl";
import { Nav } from "@/components/nav";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const SCORE_COLORS: Record<number, string> = {
  5: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  4: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  3: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  2: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  1: "bg-red-500/20 text-red-400 border-red-500/30",
  0: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400",
  moderate: "text-yellow-400",
  hard: "text-orange-400",
  extreme: "text-red-400",
};

async function getDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return [];

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("destinations")
    .select(`
      id, name, tagline, difficulty, elevation_m, tags, best_months, translations,
      state:states(name),
      kids_friendly(suitable, rating),
      destination_months(month, score, note)
    `)
    .order("name");

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  return data ?? [];
}

export default async function ExplorePage() {
  const destinations = await getDestinations();
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <ExploreContent
          destinations={destinations}
          currentMonth={currentMonth}
        />
      </main>
    </div>
  );
}

function ExploreContent({
  destinations,
  currentMonth,
}: {
  destinations: any[];
  currentMonth: number;
}) {
  const tf = useTranslations("filters");
  const ts = useTranslations("score");
  const tm = useTranslations("months");
  const tn = useTranslations("nav");

  return (
    <>
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{tn("explore")}</h1>
        <p className="mt-1 text-muted-foreground">
          {destinations.length} destinations · Showing scores for{" "}
          {tm(String(currentMonth))}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
          <option>{tf("allStates")}</option>
        </select>
        <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
          <option>{tf("allMonths")}</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {tm(String(i + 1))}
            </option>
          ))}
        </select>
        <button className="rounded-lg border border-primary/50 bg-primary/10 px-3 py-2 text-sm text-primary">
          {tf("kidsOnly")} 👶
        </button>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((dest: any) => {
          const monthData = dest.destination_months?.find(
            (m: any) => m.month === currentMonth,
          );
          const score = monthData?.score ?? null;
          const kf = Array.isArray(dest.kids_friendly)
            ? dest.kids_friendly[0]
            : dest.kids_friendly;
          const stateName = Array.isArray(dest.state)
            ? dest.state[0]?.name
            : dest.state?.name;

          return (
            <a
              key={dest.id}
              href={`/destination/${dest.id}`}
              className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Score + Kids */}
              <div className="mb-3 flex items-center justify-between">
                {score !== null ? (
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${SCORE_COLORS[score] ?? SCORE_COLORS[0]}`}
                  >
                    {score}/5 — {ts(String(score))}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No score for {tm(String(currentMonth))}
                  </span>
                )}
                {kf && (
                  <span className="text-xs text-muted-foreground">
                    {kf.suitable
                      ? `👶 ${kf.rating}/5`
                      : "Adults only"}
                  </span>
                )}
              </div>

              {/* Name & tagline */}
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {dest.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {dest.tagline}
              </p>

              {/* Meta */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {stateName && <span>{stateName}</span>}
                <span>·</span>
                <span
                  className={
                    DIFFICULTY_COLORS[dest.difficulty] ?? ""
                  }
                >
                  {dest.difficulty}
                </span>
                {dest.elevation_m && (
                  <>
                    <span>·</span>
                    <span className="font-mono">
                      {dest.elevation_m.toLocaleString()}m
                    </span>
                  </>
                )}
              </div>

              {/* Best months */}
              {dest.best_months?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {dest.best_months.slice(0, 4).map((m: number) => (
                    <span
                      key={m}
                      className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {tm(String(m)).slice(0, 3)}
                    </span>
                  ))}
                </div>
              )}

              {/* Tags */}
              {dest.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {dest.tags.slice(0, 4).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </a>
          );
        })}
      </div>

      {destinations.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg">No destinations found</p>
          <p className="text-sm mt-1">
            Database may not be seeded yet. Check Supabase connection.
          </p>
        </div>
      )}
    </>
  );
}
