/**
 * road-updates.ts — data layer for the dated road-conditions feed.
 *
 * Two tables, two jobs:
 *   road_reports  = CURRENT state of ~28 corridors (one row each, edited in place)
 *   road_updates  = dated, sourced EVENTS (append-only; the citable history)
 *
 * The feed exists because a snapshot that says "updated 1 June" is not
 * something a journalist links to; a dated log per region is. Written by the
 * daily cloud routine (ops/road-updates/SKILL.md), read here.
 */
import { createClient } from "@supabase/supabase-js";

export type RoadUpdate = {
  id: string;
  update_date: string; // YYYY-MM-DD
  region_id: string;
  segment: string;
  status: "open" | "slow" | "risky" | "restricted" | "blocked" | "closed";
  headline: string;
  body: string | null;
  source_url: string;
  source_label: string;
  source_published_at: string | null;
  verified_at: string;
};

export type RoadReport = {
  id: string;
  segment: string;
  status: string;
  report: string | null;
  reported_at: string | null;
  last_reviewed_at: string | null;
  source_url: string | null;
  source_label: string | null;
  destination_id: string | null;
  destinations: { name: string; state_id: string | null } | { name: string; state_id: string | null }[] | null;
};

/** Regions the feed covers, in display order. Ids are `states.id`. */
export const ROAD_REGIONS: { id: string; en: string; hi: string; blurb: string }[] = [
  { id: "himachal-pradesh", en: "Himachal Pradesh", hi: "हिमाचल प्रदेश", blurb: "NH5 Kinnaur, Manali–Kaza, Rohtang, Atal Tunnel, Sangla" },
  { id: "ladakh", en: "Ladakh", hi: "लद्दाख", blurb: "Manali–Leh, Srinagar–Leh, Khardung La, Chang La, Tso Moriri" },
  { id: "jammu-kashmir", en: "Jammu & Kashmir", hi: "जम्मू-कश्मीर", blurb: "NH44 Jammu–Srinagar, Zoji La, Gulmarg, Pahalgam, Mughal Road" },
  { id: "uttarakhand", en: "Uttarakhand", hi: "उत्तराखंड", blurb: "Char Dham roads, Rishikesh–Joshimath, Gaurikund, Kumaon" },
  { id: "sikkim", en: "Sikkim", hi: "सिक्किम", blurb: "NH10 Siliguri–Gangtok, Nathu La, Lachung, Lachen" },
  { id: "arunachal-pradesh", en: "Arunachal Pradesh", hi: "अरुणाचल प्रदेश", blurb: "Sela Pass, Tawang, Bomdila, Ziro" },
  { id: "meghalaya", en: "Meghalaya", hi: "मेघालय", blurb: "Shillong–Cherrapunji, Dawki, Guwahati approach" },
  { id: "rajasthan", en: "Rajasthan", hi: "राजस्थान", blurb: "NH48 Delhi–Jaipur, NH15 to Jaisalmer, desert circuits" },
];

export const STATUS_LABEL: Record<RoadUpdate["status"], { en: string; hi: string }> = {
  open: { en: "Open", hi: "खुला" },
  slow: { en: "Slow", hi: "धीमा" },
  risky: { en: "Risky", hi: "जोखिम" },
  restricted: { en: "Restricted", hi: "प्रतिबंधित" },
  blocked: { en: "Blocked", hi: "बंद (अस्थायी)" },
  closed: { en: "Closed", hi: "बंद" },
};

function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getRoadUpdates(opts: { region?: string; days?: number; limit?: number } = {}): Promise<RoadUpdate[]> {
  const s = client();
  if (!s) return [];
  const since = new Date();
  since.setDate(since.getDate() - (opts.days ?? 30));
  let q = s
    .from("road_updates")
    .select("id, update_date, region_id, segment, status, headline, body, source_url, source_label, source_published_at, verified_at")
    .gte("update_date", since.toISOString().slice(0, 10))
    .order("update_date", { ascending: false })
    .order("verified_at", { ascending: false })
    .limit(opts.limit ?? 200);
  if (opts.region) q = q.eq("region_id", opts.region);
  const { data } = await q;
  return (data ?? []) as RoadUpdate[];
}

export async function getRoadReports(region?: string): Promise<RoadReport[]> {
  const s = client();
  if (!s) return [];
  const { data } = await s
    .from("road_reports")
    .select("id, segment, status, report, reported_at, last_reviewed_at, source_url, source_label, destination_id, destinations(name, state_id)")
    .order("segment");
  const rows = (data ?? []) as unknown as RoadReport[];
  if (!region) return rows;
  return rows.filter((r) => {
    const d = Array.isArray(r.destinations) ? r.destinations[0] : r.destinations;
    return d?.state_id === region;
  });
}

/** Summary counts for the "cite this" block and the region cards. */
export function summarise(updates: RoadUpdate[]) {
  const byRegion: Record<string, { total: number; closures: number; latest: string | null }> = {};
  let closures = 0;
  for (const u of updates) {
    const r = (byRegion[u.region_id] ??= { total: 0, closures: 0, latest: null });
    r.total += 1;
    if (u.status === "closed" || u.status === "blocked") { r.closures += 1; closures += 1; }
    if (!r.latest || u.update_date > r.latest) r.latest = u.update_date;
  }
  return { total: updates.length, closures, latest: updates[0]?.update_date ?? null, byRegion };
}

/** ISO date (YYYY-MM-DD) n days ago, IST-agnostic; kept out of components for the react-hooks/purity rule. */
export function daysAgoISO(n: number): string {
  return new Date(Date.now() - n * 86400_000).toISOString().slice(0, 10);
}

export function fmtDate(d: string, locale: string) {
  return new Date(d + "T00:00:00+05:30").toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
  });
}
