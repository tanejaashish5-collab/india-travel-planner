#!/usr/bin/env node
/**
 * freshness-review.mjs — pick + apply halves of the weekly destination review
 * (driven by scripts/freshness-review-weekly.sh, procedure in
 * .claude/commands/freshness-review.md).
 *
 * WHY THIS EXISTS
 * Every "VERIFIED <month>" label on a destination page comes from
 * destinations.content_reviewed_at. Until 2026-09-21 nothing re-checked pages
 * after the Apr–Jun backfills, so the share reviewed in the last 90 days fell
 * 100% → 5% while the Monday freshness-drift cron reported 0 alerts. This job
 * re-checks the stalest ~41 destinations a week (533 / 13 weeks), so every page
 * is re-verified at least once a quarter.
 *
 * WRITES: content_reviewed_at through the stamp_destinations_reviewed RPC (076),
 * and proposed corrections into the destination_corrections approval queue (077).
 * A review never edits content. A well-formed correction with an official or
 * named-news source is queued 'pending' and emailed to the founder with a signed
 * Approve link (/api/admin/corrections/<id>), which applies it through
 * apply_destination_corrections(). Anything else is escalated in the run note.
 * Rows with an open item are held out of the picks for ESCALATION_HOLD_DAYS.
 * Why (2026-10-04): corrections were report-only, so the same 6 wrong facts were
 * found on 09-26 and 10-03 and stayed live, and their unstamped rows were
 * re-picked every week (409 of 533 pages sat at 90-180 days). Auto-apply was
 * rejected: on 10-03 the reviewer's replacement text was fully right in 1 of 5.
 *
 * Usage:
 *   node --env-file=apps/web/.env.local scripts/freshness-review.mjs pick --n 41 --out <batch.json> [--min-age-days 84]
 *   node --env-file=apps/web/.env.local scripts/freshness-review.mjs apply --batch <batch.json> --entries <entries.json>            # validate only
 *   node --env-file=apps/web/.env.local scripts/freshness-review.mjs apply --batch <batch.json> --entries <entries.json> --commit   # stamp
 *   node --env-file=apps/web/.env.local scripts/freshness-review.mjs recount [--commit]   # after settling open items by hand
 *
 * entries.json:
 *   { "reviews": [ { "id": "spiti-valley", "verdict": "confirmed" | "needs_correction",
 *                    "sources": ["https://…", "https://…"], "notes": "…",
 *                    "corrections": [ { "field", "current", "proposed", "source" } ] } ] }
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";

const [cmd, ...rest] = process.argv.slice(2);
const arg = (name) => {
  const i = rest.indexOf(`--${name}`);
  return i < 0 ? null : rest[i + 1];
};
const COMMIT = rest.includes("--commit");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("FATAL: run with --env-file=apps/web/.env.local");
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

// Facts on a destination page that can go stale between reviews.
const TIME_SENSITIVE = [
  "id", "name", "state_id", "content_reviewed_at",
  "permit_required", "permit_type", "permit_lead_days",
  "nearest_airport", "nearest_railhead",
  "atm_available", "cell_network", "medical_facility",
  "best_months", "avoid_months", "daily_cost", "local_logistics",
  // Closure notice in force, if any (migration 113): the reviewer has to see it
  // to renew it or take it down.
  "notice_text", "notice_source_url", "notice_expires_at",
].join(", ");

// A destination whose closure notice lapses within this many days is pulled to
// the front of the batch whatever its review date. The notice takes itself down
// on expiry, so this is the last look at whether the place has reopened.
const NOTICE_RECHECK_DAYS = 5;

// How long a destination with an open item stays out of the picks. A pending
// correction clears when approved or rejected; an escalation clears when a human
// fixes the row (which stamps content_reviewed_at) or after the hold, whichever
// is first, so nothing is excluded forever.
const ESCALATION_HOLD_DAYS = 21;

/** id → reason, for every destination with an open queue item or unresolved escalation. */
async function openItems() {
  const since = new Date(Date.now() - ESCALATION_HOLD_DAYS * 86400000).toISOString();
  const open = new Map();
  const { data: runs } = await supabase
    .from("ops_reports")
    .select("run_at, summary")
    .eq("job", "freshness-review")
    .gte("run_at", since)
    .order("run_at", { ascending: true });
  for (const r of runs ?? []) {
    const s = r.summary ?? {};
    // `escalated` since 2026-10-04; before that every correction was report-only.
    const items = s.escalated ?? (s.queued ? [] : s.corrections) ?? [];
    for (const e of items) open.set(e.id, { at: r.run_at, why: e.why ?? `needs correction: ${(e.fields ?? []).join(", ")}` });
  }
  if (open.size) {
    const { data: rows } = await supabase.from("destinations").select("id, content_reviewed_at").in("id", [...open.keys()]);
    for (const row of rows ?? []) {
      const e = open.get(row.id);
      if (row.content_reviewed_at && new Date(row.content_reviewed_at) > new Date(e.at)) open.delete(row.id);
    }
  }
  const { data: pending } = await supabase.from("destination_corrections").select("destination_id, created_at").eq("status", "pending");
  for (const p of pending ?? []) open.set(p.destination_id, { at: p.created_at, why: "correction awaiting approval" });
  return open;
}

if (cmd === "pick") {
  const n = Number(arg("n") ?? 41);
  const out = arg("out");
  if (!out) { console.error("pick needs --out"); process.exit(1); }
  const minAge = Number(arg("min-age-days") ?? 0);
  // Rows with an open item wait on the founder; re-picking them only re-finds
  // the same problem and starves the rest of the site (the 09-26 → 10-03 stall).
  const open = await openItems();
  let q = supabase
    .from("destinations")
    .select(TIME_SENSITIVE)
    .order("content_reviewed_at", { ascending: true, nullsFirst: true })
    .limit(n);
  if (open.size) q = q.not("id", "in", `(${[...open.keys()].join(",")})`);
  if (minAge > 0) q = q.or(`content_reviewed_at.is.null,content_reviewed_at.lt.${new Date(Date.now() - minAge * 86400000).toISOString()}`);
  const { data: stalest, error } = await q;
  if (error) { console.error(`FATAL: ${error.message}`); process.exit(1); }
  let nq = supabase
    .from("destinations")
    .select(TIME_SENSITIVE)
    .not("notice_text", "is", null)
    .lt("notice_expires_at", new Date(Date.now() + NOTICE_RECHECK_DAYS * 86400000).toISOString())
    .limit(n);
  if (open.size) nq = nq.not("id", "in", `(${[...open.keys()].join(",")})`);
  const { data: lapsing, error: nErr } = await nq;
  if (nErr) { console.error(`FATAL: ${nErr.message}`); process.exit(1); }
  const seen = new Set(lapsing.map((d) => d.id));
  const data = [...lapsing, ...stalest.filter((d) => !seen.has(d.id))].slice(0, n);
  writeFileSync(out, JSON.stringify({ picked_at: new Date().toISOString(), destinations: data }, null, 2));
  console.log(`picked ${data.length} → ${out} (oldest ${stalest[0]?.content_reviewed_at ?? "none"}; ${lapsing.length} with a closure notice lapsing within ${NOTICE_RECHECK_DAYS}d; ${open.size} held for open items${minAge ? `; only rows older than ${minAge}d` : ""})`);
  process.exit(0);
}

// recount — run after settling open items by hand (row fixed, or the claim
// rejected, and content_reviewed_at stamped either way). The watchdog reads
// alerts_count off the newest run row, which is only rewritten by the next
// review, so without this it kept emailing "DEGRADED" for up to four days about
// pages that were already settled (2026-10-12). alerts_count is defined as the
// LIVE number of open research items, so the newest row is corrected in place;
// run_at is left alone so a reviewer that stops running still reads as stale.
if (cmd === "recount") {
  const open = await openItems();
  const research = [...open].filter(([, e]) => e.why !== "correction awaiting approval");
  const detail = research.length
    ? `${research.length} page(s) may state something no longer true and need research by hand: ${research.map(([id, e]) => `${id} (${e.why})`).join("; ")}`
    : null;
  const { data: last, error } = await supabase
    .from("ops_reports")
    .select("id, run_at, alerts_count, summary")
    .eq("job", "freshness-review")
    .order("run_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !last) { console.error(`FATAL: no freshness-review run to recount${error ? `: ${error.message}` : ""}`); process.exit(1); }
  console.log(`run ${last.run_at}: alerts_count ${last.alerts_count} → ${research.length}${detail ? `\n${detail}` : " (nothing open)"}`);
  if (COMMIT && last.alerts_count !== research.length) {
    const summary = {
      ...(last.summary ?? {}),
      detail,
      // What the run itself counted, kept so the row still shows its own history.
      alerts_at_run: last.summary?.alerts_at_run ?? last.alerts_count,
      recounted_at: new Date().toISOString(),
    };
    const { error: upErr } = await supabase.from("ops_reports").update({ alerts_count: research.length, summary }).eq("id", last.id);
    if (upErr) { console.error(`FATAL: recount write failed: ${upErr.message}`); process.exit(1); }
  }
  console.log(`RESULT open=${research.length} ${COMMIT ? "written" : "dry-run (add --commit)"}`);
  process.exit(0);
}

if (cmd !== "apply") {
  console.error("usage: freshness-review.mjs pick|apply|recount …");
  process.exit(1);
}

const batch = JSON.parse(readFileSync(arg("batch"), "utf8"));
const allowed = new Set(batch.destinations.map((d) => d.id));
const { reviews = [] } = JSON.parse(readFileSync(arg("entries"), "utf8"));

// At least one source per confirmed destination must be official or a named
// news outlet. Born from the first test run (2026-09-21): Chopta was confirmed
// on wikipedia + rome2rio alone, which passed the 2-host rule while proving
// nothing current. Extend this list by human commit only — the wrapper runs
// the copy of this file pinned at the pre-session commit.
const NEWS_HOSTS = new Set([
  "thehindu.com", "indianexpress.com", "timesofindia.indiatimes.com", "hindustantimes.com",
  "ndtv.com", "indiatoday.in", "tribuneindia.com", "deccanherald.com", "newindianexpress.com",
  "livemint.com", "business-standard.com", "theprint.in", "scroll.in", "thewire.in",
  "etvbharat.com", "garhwalpost.in", "amarujala.com", "jagran.com", "bhaskar.com",
  "aninews.in", "ptinews.com", "telegraphindia.com", "deccanchronicle.com", "thehansindia.com",
  "news18.com", "moneycontrol.com", "economictimes.indiatimes.com", "sentinelassam.com",
  "eastmojo.com", "nagalandpost.com", "arunachaltimes.in", "kashmirobserver.net",
  "greaterkashmir.com", "dailyexcelsior.com", "onmanorama.com", "mathrubhumi.com",
  // West + South regional dailies (added 2026-10-07: the 10-07 batch was Karnataka,
  // Maharashtra, Goa and the South, and stamped 6 of 41 because none of these counted).
  "freepressjournal.in", "mid-day.com", "lokmat.com", "loksatta.com", "pudhari.news",
  "starofmysore.com", "udayavani.com", "navhindtimes.in", "heraldgoa.in",
  "thenewsminute.com", "dtnext.in",
]);
// Government bodies that publish outside .gov.in (added 2026-10-04: the 10-03
// run cited aai.aero for an airport fact and it did not count). The two state
// tourism departments were added 2026-10-07; both sites name "Department of
// Tourism, Government of <state>" in their footer.
const OFFICIAL_HOSTS = new Set(["aai.aero", "konkanrailway.com", "irctc.co.in", "bro.gov.in",
  "karnatakatourism.org", "keralatourism.org"]);
function isAuthoritative(host) {
  if (/(^|\.)(gov|nic)\.in$/.test(host) || host.endsWith(".gov")) return true;
  for (const o of OFFICIAL_HOSTS) if (host === o || host.endsWith(`.${o}`)) return true;
  for (const n of NEWS_HOSTS) if (host === n || host.endsWith(`.${n}`)) return true;
  return false;
}

async function reachable(u) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(u, {
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36" },
      });
      if (res.status < 400) return true;
    } catch { /* retry — .gov.in hosts are slow */ }
  }
  return false;
}

// Fields a correction may change (the same list apply_destination_corrections
// accepts) and what a valid value looks like. permit_type is the DB enum;
// permit_required is the sentence the site shows ("Indian nationals: none.
// Foreigners: …"), never a boolean. The 10-03 run proposed permit_required=true
// and a free-text permit_type; both would have broken the trip-board permits.
const QUEUE_FIELDS = {
  permit_type: (v) => ["none", "ilp", "rap", "pap", "ilp_rap"].includes(v),
  permit_required: (v) => typeof v === "string" && v.trim().length >= 8 && v.length <= 400 && !/\n/.test(v),
  permit_lead_days: (v) => Number.isInteger(v) && v >= 0 && v <= 60,
  nearest_airport: (v) => typeof v === "string" && v.trim().length >= 3 && v.length <= 200 && !/\n/.test(v),
  nearest_railhead: (v) => typeof v === "string" && v.trim().length >= 3 && v.length <= 200 && !/\n/.test(v),
  // Closure notice (migration 113), published word for word at the top of the
  // page for 21 days. null takes a notice down. Same limits as the DB constraint.
  notice_text: (v) => v === null || (typeof v === "string" && v.trim().length >= 20 && v.trim().length <= 320 && !/\n/.test(v)),
};
const firstUrl = (s) => (typeof s === "string" ? s.match(/https?:\/\/[^\s,)]+/)?.[0] ?? null : null);
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

/** null when the correction can go to the approval queue, else why a human must research it. */
async function queueGate(r, row) {
  if (!row) return "destination not in batch";
  const cs = r.corrections ?? [];
  if (!cs.length) return "no field-level correction given";
  if (new Set(cs.map((c) => c.field)).size !== cs.length) return "same field corrected twice";
  for (const c of cs) {
    if (!(c.field in QUEUE_FIELDS)) return `${c.field} needs a manual edit`;
    if (!QUEUE_FIELDS[c.field](c.proposed)) return `${c.field}: proposed value has the wrong shape (${JSON.stringify(c.proposed).slice(0, 60)})`;
    if (same(c.proposed, row[c.field]) && c.field !== "notice_text") return `${c.field}: proposed value equals the current one`;
    if (!same(c.current, row[c.field])) return `${c.field}: reviewer's "current" does not match the page`;
    const u = firstUrl(c.source);
    if (!u) return `${c.field}: source has no URL`;
    const host = new URL(u).hostname.replace(/^www\./, "");
    if (!isAuthoritative(host)) return `${c.field}: source ${host} is not official or named news`;
    if (!(await reachable(u))) return `${c.field}: source ${u} would not open`;
  }
  return null;
}

const rowsById = new Map(batch.destinations.map((d) => [d.id, d]));
const stamp = [];
const corrections = [];
const toQueue = []; // { destination_id, changes, notes }
const escalated = []; // { id, fields, why }
const dropped = [];

for (const r of reviews) {
  if (!allowed.has(r.id)) { dropped.push({ id: r.id, why: "not in this week's batch" }); continue; }
  if (r.verdict === "needs_correction") {
    corrections.push(r);
    const why = await queueGate(r, rowsById.get(r.id));
    if (why) { escalated.push({ id: r.id, fields: (r.corrections ?? []).map((c) => c.field), why }); continue; }
    const row = rowsById.get(r.id);
    const changes = r.corrections.map((c) => ({ field: c.field, expected: row[c.field] ?? null, value: c.proposed, source: c.source }));
    // A notice goes up with the link it rests on, so the page can show its source.
    const notice = r.corrections.find((c) => c.field === "notice_text" && c.proposed !== null);
    if (notice) changes.push({ field: "notice_source_url", expected: row.notice_source_url ?? null, value: firstUrl(notice.source), source: notice.source });
    toQueue.push({ destination_id: r.id, changes, notes: r.notes ?? null });
    continue;
  }
  if (r.verdict !== "confirmed") { dropped.push({ id: r.id, why: `unknown verdict ${r.verdict}` }); continue; }

  const sources = [...new Set((r.sources ?? []).filter((s) => /^https?:\/\//.test(s)))];
  const hosts = new Set(sources.map((s) => new URL(s).hostname.replace(/^www\./, "")));
  hosts.delete("nakshiq.com");
  if (hosts.size < 2) { dropped.push({ id: r.id, why: "needs 2+ independent source hosts (nakshiq.com does not count)" }); continue; }
  if (![...hosts].some(isAuthoritative)) {
    dropped.push({ id: r.id, why: "needs 1+ official (.gov.in/.nic.in) or named news source — wikipedia/aggregators/travel blogs alone don't count" });
    continue;
  }

  let ok = false;
  for (const s of sources) if (await reachable(s)) { ok = true; break; }
  if (!ok) { dropped.push({ id: r.id, why: "no source URL could be opened" }); continue; }
  stamp.push(r.id);
}

let stamped = 0;
if (COMMIT && stamp.length) {
  const { data, error } = await supabase.rpc("stamp_destinations_reviewed", { p_ids: stamp });
  if (error) { console.error(`FATAL: stamp failed: ${error.message}`); process.exit(1); }
  stamped = data ?? 0;
}

let queued = [];
if (COMMIT && toQueue.length) {
  const { data, error } = await supabase.from("destination_corrections").insert(toQueue).select("id, destination_id");
  if (error) {
    console.error(`warn: queue insert failed: ${error.message}`);
    for (const q of toQueue) escalated.push({ id: q.destination_id, fields: q.changes.map((c) => c.field), why: `could not queue: ${error.message}` });
  } else queued = data;
}

if (COMMIT) {
  // Run log for the watchdog + /methodology/freshness. {total, fail} feeds the
  // watchdog's silent-failure detector: a week where half the batch went
  // unreviewed alerts even though the run itself "succeeded".
  // alerts_count = proposed corrections (live facts that are now wrong).
  // alerts_count = items that need research by a human (not queued ones, which
  // already sit in his inbox with an Approve button), counted across the hold
  // window. A per-run count would reset to 0 because escalated rows are held out
  // of the next pick, and the watchdog's streak would never reach him.
  const total = batch.destinations.length;
  const open = await openItems();
  for (const e of escalated) open.set(e.id, { at: new Date().toISOString(), why: e.why });
  const research = [...open].filter(([, e]) => e.why !== "correction awaiting approval");
  const detail = research.length
    ? `${research.length} page(s) may state something no longer true and need research by hand: ${research.map(([id, e]) => `${id} (${e.why})`).join("; ")}`
    : null;
  const { error } = await supabase.from("ops_reports").insert({
    job: "freshness-review",
    summary: {
      total,
      ok: stamped,
      fail: Math.max(0, total - stamped - corrections.length),
      corrections: corrections.map((c) => ({ id: c.id, fields: (c.corrections ?? []).map((x) => x.field) })),
      queued: queued.map((q) => ({ id: q.destination_id, correction_id: q.id })),
      escalated,
      detail,
      dropped,
    },
    alerts_count: research.length,
    ok: true,
  });
  if (error) console.error(`warn: ops_reports insert failed: ${error.message}`);
}

for (const d of dropped) console.log(`dropped ${d.id}: ${d.why}`);
for (const q of toQueue) console.log(`${COMMIT ? "queued" : "would queue"} ${q.destination_id}: ${q.changes.map((c) => `${c.field} ${JSON.stringify(c.expected)} → ${JSON.stringify(c.value)}`).join("; ")}`);
for (const e of escalated) console.log(`escalated ${e.id}: ${e.why}`);
console.log(`${COMMIT ? "stamped" : "would stamp"} ${COMMIT ? stamped : stamp.length}: ${stamp.join(", ")}`);
console.log(`RESULT stamped=${COMMIT ? stamped : 0} valid=${stamp.length} corrections=${corrections.length} queued=${COMMIT ? queued.length : 0} queueable=${toQueue.length} escalated=${escalated.length} dropped=${dropped.length} unreviewed=${batch.destinations.length - reviews.filter((r) => allowed.has(r.id)).length}`);
