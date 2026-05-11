import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

// Live-computed freshness: ISR-cached daily, but the numbers come from DB
// state, not hardcoded dates.
export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "How We Score — Methodology",
  description: "Our scoring methodology explained: how we rate destinations 1-5 each month, calculate kids suitability, assess safety, and evaluate infrastructure. Every number is explainable.",

    ...localeAlternates(locale, "/methodology"),
  };
}

async function getFreshnessStats() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("destinations")
    .select("content_reviewed_at");

  if (error || !data) return null;

  const total = data.length;
  const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;
  const reviewed = data.filter((d) => {
    const ts = (d as { content_reviewed_at: string | null }).content_reviewed_at;
    return ts && new Date(ts).getTime() >= ninetyDaysAgo;
  }).length;
  const pct = total > 0 ? Math.round((reviewed / total) * 100) : 0;

  const latest = data
    .map((d) => (d as { content_reviewed_at: string | null }).content_reviewed_at)
    .filter((ts): ts is string => !!ts)
    .sort()
    .pop();

  return { pct, latest };
}

async function getVerificationCounts() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const [destinations, eateries, stays] = await Promise.all([
    supabase.from("destinations").select("id", { count: "exact", head: true }),
    supabase.from("local_eateries").select("id", { count: "exact", head: true }),
    supabase.from("destination_stay_picks").select("destination_id", { count: "exact", head: true }),
  ]);

  return {
    destinations: destinations.count ?? null,
    eateries: eateries.count ?? null,
    stays: stays.count ?? null,
  };
}

export default async function MethodologyPage() {
  const [freshness, counts] = await Promise.all([
    getFreshnessStats(),
    getVerificationCounts(),
  ]);
  const now = new Date();
  const monthYear = now.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-semibold mb-2">How We Score</h1>
        <p className="text-muted-foreground mb-8">
          Our methodology for monthly suitability scores, kids ratings, and infrastructure assessments.
        </p>

        <div className="space-y-10">
          {/* Monthly Scores */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Monthly Suitability (0-5)</h2>
            <p className="text-muted-foreground mb-4">
              Every destination is scored for every month of the year. The score reflects how suitable
              that specific month is for visiting that specific place.
            </p>
            <div className="space-y-2">
              {[
                { score: 5, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", label: "Peak — go now", desc: "This is what the place is famous for. Weather perfect, everything open, activities at their best." },
                { score: 4, color: "bg-blue-500/20 text-blue-400 border-blue-500/30", label: "Excellent", desc: "Minor tradeoffs — shoulder crowds, slight weather risk, but still a great time to visit." },
                { score: 3, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", label: "Doable", desc: "Open and worth it, but not the headline experience. Shoulder season." },
                { score: 2, color: "bg-orange-500/20 text-orange-400 border-orange-500/30", label: "Marginal", desc: "Significant downsides — rain, cold, partial closures, low payoff for the effort." },
                { score: 1, color: "bg-red-500/20 text-red-400 border-red-500/30", label: "Avoid unless specific reason", desc: "Most things shut, conditions poor, or genuinely risky." },
                { score: 0, color: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30", label: "Closed / inaccessible", desc: "Place is physically inaccessible — snow, floods, official closure." },
              ].map((s) => (
                <div key={s.score} className={`flex items-start gap-3 rounded-xl border p-3 ${s.color}`}>
                  <span className="font-mono font-bold text-lg shrink-0 w-6 text-center">{s.score}</span>
                  <div>
                    <div className="font-semibold text-sm">{s.label}</div>
                    <div className="text-xs opacity-80 mt-0.5">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3">What factors into the score?</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {["Weather (temperature, rain, snow, visibility)",
                "Road access (passes open/closed, landslide risk)",
                "Crowd levels (peak season, festivals, holidays)",
                "Activity availability (treks, rafting, skiing, temple openings)",
                "Safety conditions (monsoon flooding, extreme cold, AMS risk)",
                "Infrastructure status (seasonal closures, services)"].map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Kids Ratings */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Kids & Family Rating (1-5)</h2>
            <p className="text-muted-foreground mb-4">
              Not just "is it pretty for families?" — our kids rating is an infrastructure-aware
              assessment that cross-references the destination's appeal with its practical reality.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-3">What we check:</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                "🏥 Medical access — how far is the nearest hospital?",
                "🏧 ATM availability — can you get cash?",
                "📶 Phone signal — can you call for help?",
                "🏔️ Altitude — is AMS a risk for children?",
                "🛣️ Road safety — cliff edges, barriers, road quality",
                "🧳 Stroller accessibility — can you use a pram?",
                "🍽️ Food options — will picky eaters survive?",
                "🎯 Activities — is there anything for kids to DO?",
              ].map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="text-sm text-yellow-300/80">
                <strong className="text-yellow-400">Important:</strong> A destination with stunning views but no hospital
                within 4 hours, no ATM, and no phone signal will NEVER score 5/5 for kids — regardless of
                how beautiful it is. We believe honest safety assessment matters more than Instagram-worthy scenery.
              </p>
            </div>
          </section>

          {/* Infrastructure */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Infrastructure Assessment</h2>
            <p className="text-muted-foreground mb-4">
              Every destination has structured infrastructure data — not vague descriptions,
              but specific answers to the questions travelers actually need answered.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: "📶", label: "Network", desc: "Which carriers work? Jio/Airtel/BSNL/Vi — honestly, per area" },
                { icon: "🏧", label: "ATM", desc: "Available or not? If not, how far to nearest? Carry how much cash?" },
                { icon: "🏥", label: "Medical", desc: "Nearest hospital name + distance. PHC vs real hospital distinction." },
                { icon: "⛽", label: "Fuel", desc: "Nearest petrol pump. Next after that. EV charging. Jerry can recommendation." },
                { icon: "📋", label: "Permits", desc: "Required or not? Which type? How to get it? Government link." },
                { icon: "🌙", label: "Night weather", desc: "Summer low and winter low temperatures. What to carry." },
              ].map((f) => (
                <div key={f.label} className="rounded-xl border border-border p-3">
                  <div className="flex items-center gap-2">
                    <span>{f.icon}</span>
                    <span className="font-semibold text-sm">{f.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Data Freshness */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Data freshness</h2>
            <p className="text-muted-foreground">
              Weather, season, and permit-regime content is structurally cycle-based — June in Leh
              reads the same every year. Infrastructure, stays, and contacts are on a rolling
              90-day review cadence.
            </p>
            {freshness && (
              <p className="mt-3 text-muted-foreground tabular-nums">
                Current as of {monthYear}
                {freshness.pct > 0 && (
                  <> · <span className="font-semibold text-foreground">{freshness.pct}%</span> of destinations reviewed in the last 90 days</>
                )}
                {freshness.latest && (
                  <> · latest review {new Date(freshness.latest).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</>
                )}
                . <Link href="/methodology/freshness" className="text-foreground underline underline-offset-2">See the live dashboard →</Link>
              </p>
            )}
            <p className="mt-3 text-muted-foreground">
              Road conditions, infrastructure, and seasonal patterns can shift — always verify
              locally before traveling, especially for remote destinations. If you find
              inaccurate data, we want to know.
            </p>
            <p className="mt-3 text-muted-foreground">
              When a primary source doesn't surface a number, we leave it blank
              rather than guess. Read{" "}
              <Link href="/why-we-say-no-data" className="text-foreground underline underline-offset-2">
                why we say no data
              </Link>
              {" "}for what a dash on this site actually means.
            </p>
            <div className="mt-4 rounded-xl border border-border p-4 text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> This data is for planning purposes. Always verify conditions
              locally before traveling. Mountain roads, weather, and infrastructure can change rapidly.
              We are not responsible for decisions made based on this data.
            </div>
          </section>

          {/* How we keep data honest */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">How we keep data honest</h2>
            <p className="text-muted-foreground leading-relaxed">
              Scoring is one half of methodology. The other half is making
              sure the numbers we score are real in the first place. Roughly
              one in three numbers we research turns out to be wrong, dead,
              or moved. The work of catching that — and refusing to ship it
              — is the harder half of the job.
            </p>

            {counts && (
              <p className="mt-4 text-muted-foreground tabular-nums">
                Current corpus:{" "}
                {counts.destinations != null && (
                  <><span className="font-semibold text-foreground">{counts.destinations.toLocaleString("en-IN")}</span> destinations · </>
                )}
                {counts.eateries != null && (
                  <><span className="font-semibold text-foreground">{counts.eateries.toLocaleString("en-IN")}</span> verified eateries · </>
                )}
                {counts.stays != null && (
                  <><span className="font-semibold text-foreground">{counts.stays.toLocaleString("en-IN")}</span> verified stay picks</>
                )}
                .
              </p>
            )}

            <h3 className="text-lg font-semibold mt-6 mb-3">Guardrails built into the data layer</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Some forms of bad data are caught in the editor's head. Some
              are caught by the database itself. We've codified the patterns
              we keep encountering into schema-level checks, so a row that
              would fabricate an emergency contact can't be saved at all.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">—</span>
                <span>
                  <strong className="text-foreground">Placeholder phone numbers are blocked at write time.</strong>{" "}
                  Numbers containing <code className="text-xs">XXXXX</code>, runs of six or more zeros or nines, or strings like <code className="text-xs">TBD</code>/<code className="text-xs">TODO</code>/<code className="text-xs">PLACEHOLDER</code> are rejected by a database trigger. The dash you see is the only honest response when a source doesn't surface one.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">—</span>
                <span>
                  <strong className="text-foreground">Editorial prose has a minimum substance floor.</strong>{" "}
                  Destinations marked "go" must justify it in at least 150 characters of why-to-go prose — or the field stays null. Stub copy can't sneak past as a verdict.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">—</span>
                <span>
                  <strong className="text-foreground">Price tiers are an enum, not a free-text guess.</strong>{" "}
                  Eateries are tagged on a four-step rupee scale, not "₹150-350 per head" style fabricated precision. The scale is consistent across every destination.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">—</span>
                <span>
                  <strong className="text-foreground">Stays must declare their sourcing.</strong>{" "}
                  Every stay pick records whether it came from the verified eateries-and-stays index, an open web search, or a manual editor entry — so the audit trail survives review.
                </span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">What we've caught while auditing</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The single most useful audit habit is reading the proposed
              data with a sceptic's eye and asking "where did this actually
              come from?" Cross-destination contamination — where a
              listicle's "best stays in Pfutsero" was secretly a Kohima list
              — is the most common failure mode. We've caught it in every
              state we've audited.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">—</span>
                <span>
                  In Tripura, eight of the first nine web-search stay candidates turned out to be hallucinated or attached to a museum, not a hotel. We replaced them with the two that survived the audit and left the rest blank.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">—</span>
                <span>
                  In Meghalaya, multiple "Mawphlang" homestay candidates were actually in Cherrapunji — a 30-kilometre cross-destination contamination that travel listicles repeat without checking.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">—</span>
                <span>
                  In Nagaland, more than three quarters of the web-search stay candidates for the Dzukou and Mon districts couldn't be confirmed against any government accommodation list. Those slots are blank.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">—</span>
                <span>
                  In Assam, a candidate called "Bonhomie Farm Guwahati" turned out to be a real place — in Davao, the Philippines. It nearly made it into the corpus.
                </span>
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The pattern is the point. A travel listicle never tells you it
              was wrong. We publish what we caught, because the catching is
              the moat.
            </p>
          </section>

          <div className="text-center pt-4">
            <Link href="/explore" className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Start exploring with confidence →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
