/**
 * snow-outlook.ts — read side of the snow outlook (migration 114).
 *
 * Written twice a day by scripts/snow-outlook.mjs (six global models at each
 * place's true elevation + IMD bulletins). Only the LATEST successful run is
 * shown, and nothing at all if that run is more than 36 hours old: an old
 * forecast presented as current is worse than none.
 */
import { createClient } from "@supabase/supabase-js";

import type { SnowOutlook, SnowOutlookView, SnowPoint, SnowTrackRecord } from "./snow-outlook-format";
export * from "./snow-outlook-format";

const STALE_HOURS = 36;
const SELECT =
  "id, run_date, run_at, point_id, point_kind, region_id, window_start, window_end, peak_date, confidence, models_agree, models_total, snow_cm_low, snow_cm_high, model_detail, imd, outcome, outcome_note, outcome_source_url";

function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/** IST calendar date (YYYY-MM-DD). */
export function istToday(): string {
  return new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10);
}

async function latestRun(s: NonNullable<ReturnType<typeof client>>) {
  const { data } = await s
    .from("ops_reports")
    .select("run_at, summary")
    .eq("job", "snow-outlook")
    .eq("ok", true)
    .order("run_at", { ascending: false })
    .limit(1);
  const r = data?.[0] as { run_at: string; summary: { run_date?: string; points?: number } } | undefined;
  if (!r?.summary?.run_date) return null;
  return { run_date: r.summary.run_date, run_at: r.run_at, points: r.summary.points ?? 0 };
}

/** Active outlooks from the latest run, optionally for one region or one point. */
export async function getSnowOutlooks(opts: { region?: string; point?: string } = {}): Promise<SnowOutlookView> {
  const s = client();
  if (!s) return { lastRun: null, stale: true, outlooks: [] };
  const lastRun = await latestRun(s);
  if (!lastRun) return { lastRun: null, stale: true, outlooks: [] };
  const stale = Date.now() - Date.parse(lastRun.run_at) > STALE_HOURS * 3600_000;
  if (stale) return { lastRun, stale, outlooks: [] };

  let q = s.from("snow_outlooks").select(SELECT).eq("run_date", lastRun.run_date).gte("window_end", istToday());
  if (opts.region) q = q.eq("region_id", opts.region);
  if (opts.point) q = q.eq("point_id", opts.point);
  const { data } = await q.order("confidence", { ascending: true }).order("window_start", { ascending: true }).limit(200);
  const rows = (data ?? []) as SnowOutlook[];
  if (!rows.length) return { lastRun, stale, outlooks: [] };

  const { data: pts } = await s
    .from("snow_watch_points")
    .select("id, name, name_hi, kind, region_id, elevation_m, road")
    .in("id", rows.map((r) => r.point_id));
  const byId = new Map(((pts ?? []) as SnowPoint[]).map((p) => [p.id, p]));
  // likely before possible, then IMD agreement, then earliest window.
  const rank = (r: SnowOutlook) => (r.confidence === "likely" ? 0 : 2) + (r.imd?.status === "agrees" ? 0 : 1);
  const outlooks = rows
    .map((r) => ({ ...r, point: byId.get(r.point_id) ?? null }))
    .sort((a, b) => rank(a) - rank(b) || a.window_start.localeCompare(b.window_start) || b.models_agree - a.models_agree);
  return { lastRun, stale, outlooks };
}

/**
 * Track record: one "event" per place per forecast window, scored by the latest
 * row that covered it. Unconfirmed is shown as its own number, never folded into
 * hits or called a miss.
 */
function nextDay(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

export async function getSnowTrackRecord(): Promise<SnowTrackRecord> {
  const s = client();
  if (!s) return { since: null, events: 0, confirmed: 0, unconfirmed: 0, pending: 0 };
  const { data } = await s
    .from("snow_outlooks")
    .select("run_date, point_id, window_start, window_end, outcome")
    .eq("confidence", "likely")
    .order("run_date", { ascending: true })
    .limit(5000);
  const rows = (data ?? []) as { run_date: string; point_id: string; window_start: string; window_end: string; outcome: SnowOutlook["outcome"] }[];
  // One snowfall = one event: a place's calls whose windows overlap or touch merge, so
  // a peak that drifts from the 17th to the 18th across runs is still counted once
  // (review 2026-10-16). The latest row's outcome stands for the event.
  const byPoint = new Map<string, typeof rows>();
  for (const r of rows) byPoint.set(r.point_id, [...(byPoint.get(r.point_id) ?? []), r]);
  const outcomes: SnowOutlook["outcome"][] = [];
  for (const list of byPoint.values()) {
    list.sort((a, b) => a.window_start.localeCompare(b.window_start) || a.run_date.localeCompare(b.run_date));
    let end = "", latest: (typeof rows)[number] | null = null;
    for (const r of list) {
      const touches = latest && r.window_start <= nextDay(end);
      if (!touches) { if (latest) outcomes.push(latest.outcome); latest = r; end = r.window_end; continue; }
      if (r.window_end > end) end = r.window_end;
      if (r.run_date >= latest!.run_date) latest = r;
    }
    if (latest) outcomes.push(latest.outcome);
  }
  let confirmed = 0, unconfirmed = 0, pending = 0;
  for (const o of outcomes) {
    if (o === "confirmed") confirmed++;
    else if (o === "unconfirmed") unconfirmed++;
    else pending++;
  }
  return { since: rows.reduce<string | null>((m, r) => (!m || r.run_date < m ? r.run_date : m), null), events: outcomes.length, confirmed, unconfirmed, pending };
}


/** Every place and pass the outlook watches (view snow_watch_points), for the /snow page. */
export async function getSnowWatchList(): Promise<SnowPoint[]> {
  const s = client();
  if (!s) return [];
  const { data } = await s
    .from("snow_watch_points")
    .select("id, name, name_hi, kind, region_id, elevation_m, road")
    .order("elevation_m", { ascending: false })
    .limit(500);
  return (data ?? []) as SnowPoint[];
}
