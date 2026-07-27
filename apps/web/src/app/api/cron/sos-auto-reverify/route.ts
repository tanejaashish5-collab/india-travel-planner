import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  type PageCache,
  type PageResult,
  type SosRow,
  extractPageTokens,
  needsHuman,
  stalenessReasons,
  urlsForRow,
  verifyRow,
} from "@/lib/sos-verify";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * Weekly SOS auto-re-verification. Runs 90 minutes BEFORE sos-verify-reminder.
 *
 * For every row past its re-check window: fetch each number's own recorded
 * source page, confirm the digits are still printed there, and stamp the row.
 * Anything that confirms clears itself. Anything that doesn't is left alone and
 * classified, so the reminder email can carry only the rows that actually need
 * a person.
 *
 * This is deliberately dumb — literal digit matching against a live official
 * page, no model in the loop. A number is only ever re-affirmed because it was
 * SEEN, never because something judged it plausible.
 */

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const FETCH_TIMEOUT_MS = 25_000;
const FETCH_CONCURRENCY = 6;
/** Bound the run so one week's backlog can't blow maxDuration. */
const MAX_URLS_PER_RUN = 80;

async function fetchPage(url: string): Promise<PageResult> {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "text/html,*/*" },
      redirect: "follow",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      cache: "no-store",
    });
    if (!res.ok) return { ok: false, tokens: [], raw: "", status: res.status };
    const html = await res.text();
    // Strip tags first so a number split across markup
    // (<span>0832</span>-2225383) is still one token.
    const text = html.replace(/<[^>]+>/g, " ");
    return {
      ok: true,
      tokens: extractPageTokens(text),
      raw: text.replace(/\D/g, ""),
      status: res.status,
    };
  } catch {
    return { ok: false, tokens: [], raw: "", status: 0 };
  }
}

async function fetchAll(urls: string[]): Promise<PageCache> {
  const cache: PageCache = new Map();
  const queue = [...urls];
  const workers = Array.from({ length: Math.min(FETCH_CONCURRENCY, queue.length) }, async () => {
    for (;;) {
      const url = queue.shift();
      if (!url) return;
      cache.set(url, await fetchPage(url));
    }
  });
  await Promise.all(workers);
  return cache;
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  const supabase = createClient(url, serviceKey);

  const dry = req.nextUrl.searchParams.get("dry") === "1";

  const { data, error } = await supabase
    .from("emergency_sos")
    .select(
      "destination_id, verified, verified_date, source_url, source_map, auto_verify_fail_streak, " +
        "police, ambulance, fire, women_helpline, tourist_helpline, road_accident, " +
        "local_police_station, nearest_hospital, rescue_contact, mountain_rescue",
    );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Cast through unknown: the generated Supabase types predate migration 072
  // (source_map / auto_verify_*) and don't know these columns yet.
  const rows = (data ?? []) as unknown as SosRow[];
  const now = new Date();
  const today = now.toISOString().slice(0, 10);

  const due = rows.filter((r) => stalenessReasons(r, now).length > 0);

  // Dedupe URLs across rows — 42 rows collapse to ~24 fetches because whole
  // districts share one disaster-management page.
  const wanted: string[] = [];
  const seen = new Set<string>();
  for (const row of due) {
    for (const u of urlsForRow(row)) {
      if (seen.has(u)) continue;
      seen.add(u);
      if (wanted.length < MAX_URLS_PER_RUN) wanted.push(u);
    }
  }
  const pages = await fetchAll(wanted);

  const counts = { confirmed: 0, needs_source: 0, number_changed: 0, source_unreachable: 0, skipped: 0 };
  const escalate: { destination_id: string; status: string; note: string }[] = [];
  const changedRows: { destination_id: string; note: string }[] = [];

  for (const row of due) {
    // Row whose URLs got cut by the per-run cap: leave completely untouched.
    if (urlsForRow(row).some((u) => !pages.has(u))) {
      counts.skipped++;
      continue;
    }
    const verdict = verifyRow(row, pages, today);
    counts[verdict.status]++;

    const prevStreak = row.auto_verify_fail_streak ?? 0;
    const confirmed = verdict.status === "confirmed";
    const failStreak = confirmed ? 0 : prevStreak + 1;

    const patch: Record<string, unknown> = {
      source_map: verdict.nextSourceMap,
      auto_verify_status: verdict.status,
      auto_verify_note: verdict.note,
      auto_verify_fail_streak: failStreak,
      auto_verified_at: now.toISOString(),
      last_verified_attempt_at: now.toISOString(),
    };
    // Only a fully-confirmed row gets its clock reset.
    if (confirmed) {
      patch.verified = true;
      patch.verified_date = today;
      patch.verified_by = "sos-auto-reverify";
    }

    if (!dry) {
      const { error: upErr } = await supabase
        .from("emergency_sos")
        .update(patch)
        .eq("destination_id", row.destination_id);
      if (upErr) console.error(`[sos-auto-reverify] ${row.destination_id}: ${upErr.message}`);
    }

    if (verdict.status === "number_changed") changedRows.push({ destination_id: row.destination_id, note: verdict.note });
    if (needsHuman(verdict, failStreak)) {
      escalate.push({ destination_id: row.destination_id, status: verdict.status, note: verdict.note });
    }
  }

  const summary = {
    total_rows: rows.length,
    due: due.length,
    urls_fetched: pages.size,
    urls_failed: [...pages.values()].filter((p) => !p.ok).length,
    ...counts,
    escalated: escalate.length,
    dry,
  };

  if (!dry) {
    await supabase.from("ops_reports").insert({
      job: "sos-auto-reverify",
      summary,
      alerts_count: escalate.length,
    });
  }

  return NextResponse.json({ ok: true, summary, escalate, changed: changedRows });
}
