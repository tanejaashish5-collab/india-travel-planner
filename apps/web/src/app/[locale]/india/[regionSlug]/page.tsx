import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { REGION_GROUPS, STATE_MAP } from "@/lib/seo-maps";
import { videoSrc } from "@/lib/video-url";

export const revalidate = 86400;
export const dynamicParams = true;

const REGION_DESCRIPTIONS: Record<string, string> = {
  north: "From Himalayan passes to Thar desert dunes. Ten states spanning Jammu & Kashmir, Ladakh, Himachal, Uttarakhand, Punjab, Haryana, Delhi, Rajasthan, Uttar Pradesh and Chandigarh — India's highest mountains, its grandest palaces, and the Gangetic heartland.",
  south: "Beaches, backwaters, temple towns, hill stations. Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, Telangana and Puducherry — the Dravidian south, where the monsoon arrives first and the coffee is brewed strongest.",
  east: "West Bengal, Bihar, Jharkhand, Odisha. The Gangetic plains meet the Bay of Bengal — Kolkata's colonial trams, Bodh Gaya's bodhi tree, Konark's sun temple, Sundarbans tigers.",
  west: "Gujarat, Maharashtra, Goa, Daman & Diu. Gandhi's birthplace, Mumbai's skyline, the Konkan coast, the white salt desert of Kutch.",
  central: "Madhya Pradesh and Chhattisgarh. India's tiger country — Bandhavgarh, Kanha, Pench — plus Khajuraho's erotic temples and Bastar's tribal heartland.",
  northeast: "Seven Sister states plus Sikkim. Monastery country, Hornbill festivals, world's wettest place, cleanest village. India that feels like somewhere else.",
  islands: "Andaman & Nicobar and Lakshadweep. Coral atolls, virgin beaches, tribal reserves. The India most Indians haven't been to.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ regionSlug: string; locale: string }>;
}): Promise<Metadata> {
  const { regionSlug, locale } = await params;
  const region = REGION_GROUPS[regionSlug];
  if (!region) return {};
  return {
    title: `${region.name} — Destinations, Scores & Travel Guide`,
    description: `Explore every destination in ${region.name}. ${region.states.length} states, monthly scores, honest skip list, real travel intelligence.`,
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}/india/${regionSlug}`,
      languages: {
        en: `https://www.nakshiq.com/en/india/${regionSlug}`,
        hi: `https://www.nakshiq.com/hi/india/${regionSlug}`,
      },
    },
  };
}

async function getRegionData(regionSlug: string) {
  const region = REGION_GROUPS[regionSlug];
  if (!region) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  const [statesResult, destResult] = await Promise.all([
    supabase.from("states").select("id, name, capital, display_order").in("id", region.states as readonly string[]).order("display_order"),
    supabase
      .from("destinations")
      .select("id, state_id, destination_months(month, score)")
      .in("state_id", region.states as readonly string[]),
  ]);

  const currentMonth = new Date().getMonth() + 1;
  const countMap: Record<string, number> = {};
  const firstDestMap: Record<string, string> = {};
  const scoreSum: Record<string, { total: number; count: number }> = {};

  (destResult.data ?? []).forEach((d: any) => {
    countMap[d.state_id] = (countMap[d.state_id] || 0) + 1;
    if (!firstDestMap[d.state_id]) firstDestMap[d.state_id] = d.id;
    const monthData = d.destination_months?.find((m: any) => m.month === currentMonth);
    if (monthData?.score) {
      if (!scoreSum[d.state_id]) scoreSum[d.state_id] = { total: 0, count: 0 };
      scoreSum[d.state_id].total += monthData.score;
      scoreSum[d.state_id].count++;
    }
  });

  const states = (statesResult.data ?? []).map((s: any) => ({
    ...s,
    destCount: countMap[s.id] ?? 0,
    heroDestId: firstDestMap[s.id] ?? s.id,
    avgScore: scoreSum[s.id] ? Math.round((scoreSum[s.id].total / scoreSum[s.id].count) * 10) / 10 : null,
  }));

  const totalDests = states.reduce((sum: number, s: any) => sum + s.destCount, 0);
  const heroDestId = states.find((s: any) => s.heroDestId)?.heroDestId ?? "manali";

  return { region, states, totalDests, heroDestId };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ regionSlug: string; locale: string }>;
}) {
  const { regionSlug, locale } = await params;
  const region = REGION_GROUPS[regionSlug];
  if (!region) notFound();

  const data = await getRegionData(regionSlug);
  if (!data) notFound();

  const { states, totalDests, heroDestId } = data;
  const description = REGION_DESCRIPTIONS[regionSlug] ?? "";

  return (
    <div className="min-h-screen">
      <Nav />
      <main id="main-content">
        {/* Hero */}
        <div
          className="relative h-64 sm:h-80 lg:h-96 overflow-hidden"
          style={{ background: `linear-gradient(135deg, oklch(0.22 0.03 260), oklch(0.16 0.02 280))` }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={`/images/destinations/${heroDestId}.jpg`}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc(heroDestId)} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
            <div className="mx-auto max-w-7xl">
              <div className="text-sm text-muted-foreground/70 mb-2">
                <Link href={`/${locale}/states`} className="hover:text-foreground transition-colors">India</Link>
                {" → "}
                <span className="text-foreground">{region.name}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">{region.name}</h1>
              <div className="mt-4 flex flex-wrap gap-4 sm:gap-6">
                <div>
                  <div className="text-2xl font-mono font-bold">{states.length}</div>
                  <div className="text-xs uppercase tracking-[0.08em] text-muted-foreground/70">States</div>
                </div>
                <div>
                  <div className="text-2xl font-mono font-bold">{totalDests}</div>
                  <div className="text-xs uppercase tracking-[0.08em] text-muted-foreground/70">Destinations</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Description */}
          {description && (
            <div className="mb-10 max-w-3xl">
              <p className="text-[15px] text-muted-foreground leading-relaxed">{description}</p>
            </div>
          )}

          {/* State grid */}
          <h2 className="text-xl font-semibold mb-6">States in {region.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {states.map((state: any) => (
              <Link
                key={state.id}
                href={`/${locale}/state/${state.id}`}
                className="group rounded-xl overflow-hidden border border-border/50 bg-card hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(/images/destinations/${state.heroDestId}.jpg)` }}
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{state.name}</h3>
                    {state.avgScore && (
                      <span className="text-xs font-mono text-muted-foreground">{state.avgScore}/5</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {state.capital && <span>{state.capital}</span>}
                    {state.capital && <span>·</span>}
                    <span>{state.destCount} destinations</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="border-t border-border/50 pt-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Want the full map of India?</p>
              <Link href={`/${locale}/states`} className="text-sm font-semibold text-primary hover:underline">
                Browse all {Object.keys(STATE_MAP).length} states →
              </Link>
            </div>
            <div className="flex gap-3">
              {Object.entries(REGION_GROUPS)
                .filter(([k]) => k !== regionSlug)
                .slice(0, 3)
                .map(([k, r]) => (
                  <Link
                    key={k}
                    href={`/${locale}/india/${k}`}
                    prefetch={false}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                  >
                    {r.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
