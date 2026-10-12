#!/usr/bin/env node
/**
 * sos-recheck-unreachable.mjs — a second opinion, from this Mac, on emergency_sos
 * rows the cloud verifier could not load.
 *
 * WHY THIS EXISTS
 * /api/cron/sos-auto-reverify runs on Vercel. Some official sites refuse a
 * datacentre address while loading fine from a home connection, so their rows
 * read `source_unreachable` forever and, after three weeks, land in the Monday
 * "[NakshIQ · SOS]" email as if a safety number had changed. 2026-10-12: that
 * email listed 4 rows and 0 numbers had changed. Auroville's own emergency page
 * loaded here in 1.4s with both numbers on it; the other three were MP Tourism,
 * whose TLS certificate had expired two days earlier (a genuine fault on their
 * side, which this script deliberately does NOT paper over: TLS stays strict).
 *
 * Decides with the SAME verifyRow() the cloud route uses, so the two can never
 * disagree about what "confirmed" means. Writes in two cases only:
 *   - confirmed: every local number on the row was seen on its recorded page
 *     today. Same patch the cloud route writes.
 *   - number_changed: the page loads here and a number that used to be printed
 *     on it is gone. That is the real alarm, and without this write the email
 *     would keep saying "did not load".
 * Anything else (still unreachable from here, or other numbers on the row have
 * no recorded source) is left exactly as the cloud run wrote it.
 *
 * Usage:
 *   node --env-file=apps/web/.env.local scripts/sos-recheck-unreachable.mjs            # dry run
 *   node --env-file=apps/web/.env.local scripts/sos-recheck-unreachable.mjs --commit
 */
import { createClient } from "@supabase/supabase-js";
import { extractPageTokens, urlsForRow, verifyRow } from "../apps/web/src/lib/sos-verify.ts";

const COMMIT = process.argv.includes("--commit");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("FATAL: run with --env-file=apps/web/.env.local");
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

// Mirrors fetchPage() in apps/web/src/app/api/cron/sos-auto-reverify/route.ts.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
async function fetchPage(u) {
  try {
    const res = await fetch(u, {
      headers: { "user-agent": UA, accept: "text/html,*/*" },
      redirect: "follow",
      signal: AbortSignal.timeout(40_000),
    });
    if (!res.ok) return { ok: false, tokens: [], raw: "", status: res.status };
    const text = (await res.text()).replace(/<[^>]+>/g, " ");
    return { ok: true, tokens: extractPageTokens(text), raw: text.replace(/\D/g, ""), status: res.status };
  } catch {
    return { ok: false, tokens: [], raw: "", status: 0 };
  }
}

const { data: rows, error } = await supabase
  .from("emergency_sos")
  .select(
    "destination_id, verified, verified_date, source_url, source_map, auto_verify_fail_streak, auto_verified_at, " +
      "police, ambulance, fire, women_helpline, tourist_helpline, road_accident, " +
      "local_police_station, nearest_hospital, rescue_contact, mountain_rescue",
  )
  .eq("auto_verify_status", "source_unreachable");
if (error) { console.error(`FATAL: ${error.message}`); process.exit(1); }

const pages = new Map();
for (const u of new Set(rows.flatMap(urlsForRow))) pages.set(u, await fetchPage(u));

const now = new Date();
const today = now.toISOString().slice(0, 10);
const counts = { confirmed: 0, number_changed: 0, left: 0 };
for (const row of rows) {
  const verdict = verifyRow(row, pages, today);
  if (verdict.status !== "confirmed" && verdict.status !== "number_changed") {
    counts.left++;
    console.log(`left      ${row.destination_id}: ${verdict.note}`);
    continue;
  }
  counts[verdict.status]++;
  console.log(`${verdict.status === "confirmed" ? "confirmed" : "CHANGED  "} ${row.destination_id}: ${verdict.note}`);
  if (!COMMIT) continue;
  const confirmed = verdict.status === "confirmed";
  const patch = {
    source_map: verdict.nextSourceMap,
    auto_verify_status: verdict.status,
    auto_verify_note: `${verdict.note} (local re-check; the cloud checker could not load the source)`,
    auto_verify_fail_streak: confirmed ? 0 : (row.auto_verify_fail_streak ?? 0) + 1,
    auto_verified_at: now.toISOString(),
    last_verified_attempt_at: now.toISOString(),
    // Only a fully-confirmed row gets its clock reset, as in the cloud route.
    ...(confirmed ? { verified: true, verified_date: today, verified_by: "sos-local-recheck" } : {}),
  };
  const { error: upErr } = await supabase.from("emergency_sos").update(patch).eq("destination_id", row.destination_id);
  if (upErr) console.error(`warn: ${row.destination_id}: ${upErr.message}`);
}

console.log(
  `RESULT unreachable=${rows.length} confirmed=${counts.confirmed} changed=${counts.number_changed} left=${counts.left} ${COMMIT ? "written" : "dry-run (add --commit)"}`,
);
