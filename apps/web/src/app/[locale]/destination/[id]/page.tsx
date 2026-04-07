import { useTranslations } from "next-intl";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { MonthlyChart } from "@/components/monthly-chart";
import { ConfidenceCardComponent } from "@/components/confidence-card";
import { KidsBadge } from "@/components/kids-badge";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400 bg-emerald-500/10",
  moderate: "text-yellow-400 bg-yellow-500/10",
  hard: "text-orange-400 bg-orange-500/10",
  extreme: "text-red-400 bg-red-500/10",
};

async function getDestination(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("destinations")
    .select(`
      *,
      state:states(name),
      kids_friendly(*),
      confidence_cards(*),
      destination_months(*),
      sub_destinations(*),
      local_legends(*),
      viral_eats(*)
    `)
    .eq("id", id)
    .single();

  if (error || !data) return null;

  // Also fetch hidden gems
  const { data: gems } = await supabase
    .from("hidden_gems")
    .select("*")
    .eq("near_destination_id", id);

  return { ...data, hidden_gems: gems ?? [] };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const dest = await getDestination(id);

  if (!dest) {
    notFound();
  }

  const kf = Array.isArray(dest.kids_friendly)
    ? dest.kids_friendly[0]
    : dest.kids_friendly;
  const cc = Array.isArray(dest.confidence_cards)
    ? dest.confidence_cards[0]
    : dest.confidence_cards;
  const stateName = Array.isArray(dest.state)
    ? dest.state[0]?.name
    : dest.state?.name;
  const months = (dest.destination_months ?? []).sort(
    (a: any, b: any) => a.month - b.month,
  );
  const subs = dest.sub_destinations ?? [];
  const gems = dest.hidden_gems ?? [];
  const legends = dest.local_legends ?? [];
  const eats = dest.viral_eats ?? [];

  const currentMonth = new Date().getMonth() + 1;
  const currentScore =
    months.find((m: any) => m.month === currentMonth)?.score ?? null;

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-muted-foreground">
          <Link href={`/${locale}/explore`} className="hover:text-foreground">
            Explore
          </Link>
          {" → "}
          <span>{stateName}</span>
          {" → "}
          <span className="text-foreground">{dest.name}</span>
        </div>

        {/* Hero */}
        <DestinationHero
          dest={dest}
          stateName={stateName}
          currentScore={currentScore}
          currentMonth={currentMonth}
        />

        {/* Quick stats */}
        <QuickStats dest={dest} kidsData={kf} />

        {/* Why Special */}
        <Section title="Why Special">
          <p className="text-muted-foreground leading-relaxed">
            {dest.why_special}
          </p>
        </Section>

        {/* Monthly Chart */}
        {months.length > 0 && (
          <Section title="Monthly Suitability">
            <MonthlyChart
              scores={months.map((m: any) => ({
                m: m.month,
                score: m.score,
                note: m.note,
                why_go: m.why_go,
                why_not: m.why_not,
              }))}
            />
          </Section>
        )}

        {/* Kids */}
        {kf && (
          <Section title="Kids & Families">
            <KidsBadge {...kf} />
          </Section>
        )}

        {/* Confidence Card */}
        {cc && (
          <Section title="Safety & Logistics">
            <ConfidenceCardComponent {...cc} />
          </Section>
        )}

        {/* Sub-destinations */}
        {subs.length > 0 && (
          <Section title={`Places Within ${dest.name}`}>
            <div className="grid gap-3 sm:grid-cols-2">
              {subs.map((sub: any) => (
                <div
                  key={sub.id}
                  className="rounded-lg border border-border p-4"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold">{sub.name}</h4>
                    {sub.elevation_m && (
                      <span className="text-xs font-mono text-muted-foreground">
                        {sub.elevation_m}m
                      </span>
                    )}
                  </div>
                  {sub.tagline && (
                    <p className="mt-1 text-xs text-primary">{sub.tagline}</p>
                  )}
                  {sub.why_visit && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
                      {sub.why_visit}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    {sub.distance_from_parent_km != null && (
                      <span>{sub.distance_from_parent_km}km away</span>
                    )}
                    {sub.time_needed && (
                      <>
                        <span>·</span>
                        <span>{sub.time_needed}</span>
                      </>
                    )}
                    <span>·</span>
                    <span>
                      {sub.kids_ok ? "👶 Kid-ok" : "Adults"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Hidden Gems / Discover Nearby */}
        {gems.length > 0 && (
          <Section title="Discover Nearby (Hidden Gems)">
            <div className="space-y-3">
              {gems.map((gem: any) => (
                <div
                  key={gem.id}
                  className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-primary">{gem.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {gem.distance_km}km · {gem.drive_time}
                    </span>
                  </div>
                  {gem.why_unknown && (
                    <p className="mt-1 text-xs text-yellow-400">
                      Why unknown: {gem.why_unknown}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-muted-foreground">
                    {gem.why_go}
                  </p>
                  {gem.social_proof && (
                    <p className="mt-1 text-xs text-muted-foreground italic">
                      {gem.social_proof}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Local Legends */}
        {legends.length > 0 && (
          <Section title="Local Legends">
            <div className="space-y-3">
              {legends.map((legend: any) => (
                <div key={legend.id} className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {legend.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{legend.name}</div>
                    {legend.known_as && (
                      <div className="text-xs text-primary">
                        {legend.known_as}
                      </div>
                    )}
                    {legend.story && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {legend.story}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Viral Eats */}
        {eats.length > 0 && (
          <Section title="Viral Eats">
            <div className="space-y-3">
              {eats.map((eat: any) => (
                <div
                  key={eat.id}
                  className="rounded-lg border border-border p-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{eat.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {eat.price_range}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-primary">
                    {eat.famous_for}
                  </p>
                  {eat.honest_review && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {eat.honest_review}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Tags */}
        {dest.tags?.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {dest.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Access */}
        <Section title="How to Reach">
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <span className="font-medium text-foreground">Airport:</span>{" "}
              {dest.nearest_airport}
            </p>
            <p>
              <span className="font-medium text-foreground">Rail:</span>{" "}
              {dest.nearest_railhead}
            </p>
            {dest.cell_network && (
              <p>
                <span className="font-medium text-foreground">Network:</span>{" "}
                {dest.cell_network}
              </p>
            )}
            {dest.permit_required && (
              <p className="text-orange-400">
                <span className="font-medium">Permit:</span>{" "}
                {dest.permit_required}
              </p>
            )}
          </div>
        </Section>
      </main>
    </div>
  );
}

// --- Sub-components ---

function DestinationHero({
  dest,
  stateName,
  currentScore,
  currentMonth,
}: {
  dest: any;
  stateName: string;
  currentScore: number | null;
  currentMonth: number;
}) {
  const SCORE_COLORS: Record<number, string> = {
    5: "bg-emerald-500/20 text-emerald-300",
    4: "bg-blue-500/20 text-blue-300",
    3: "bg-yellow-500/20 text-yellow-300",
    2: "bg-orange-500/20 text-orange-300",
    1: "bg-red-500/20 text-red-300",
    0: "bg-zinc-500/20 text-zinc-400",
  };

  const MONTH_NAMES = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">{dest.name}</h1>
          <p className="mt-1 text-muted-foreground">
            {stateName} · {dest.region}
            {dest.elevation_m && (
              <span className="font-mono"> · {dest.elevation_m}m</span>
            )}
          </p>
        </div>
        {currentScore !== null && (
          <div
            className={`rounded-xl px-4 py-2 text-center ${SCORE_COLORS[currentScore] ?? SCORE_COLORS[0]}`}
          >
            <div className="text-2xl font-bold">{currentScore}/5</div>
            <div className="text-xs">{MONTH_NAMES[currentMonth]}</div>
          </div>
        )}
      </div>
      <p className="mt-4 text-lg leading-relaxed">{dest.tagline}</p>
    </div>
  );
}

function QuickStats({ dest, kidsData }: { dest: any; kidsData: any }) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard
        label="Difficulty"
        value={dest.difficulty}
        className={DIFFICULTY_COLORS[dest.difficulty] ?? ""}
      />
      <StatCard
        label="Duration"
        value={`${dest.ideal_duration_min}-${dest.ideal_duration_max} days`}
      />
      <StatCard label="Budget" value={dest.budget_tier ?? "mixed"} />
      <StatCard
        label="Kids"
        value={
          kidsData
            ? kidsData.suitable
              ? `${kidsData.rating}/5`
              : "Not suitable"
            : "N/A"
        }
        className={
          kidsData?.suitable
            ? "text-emerald-400"
            : kidsData
              ? "text-red-400"
              : ""
        }
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-1 font-medium capitalize ${className}`}>{value}</div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
}
