#!/usr/bin/env node
/**
 * sos-source-map-insert.mjs — the ONLY write path into emergency_sos.source_map.
 *
 *   node --env-file=apps/web/.env.local scripts/sos-source-map-insert.mjs <entries.json> [--dry]
 *
 * entries.json = { "entries": [ {number, url, field, quote?}, ... ],
 *                  "run": { candidates?, dropped?, note? } }
 *
 * WHY THIS EXISTS
 *
 * The backlog procedure's first non-negotiable is "never write a number you
 * have not seen on a live official page", and its second is "an agent's claim
 * is not evidence". Until now both lived only in a prompt, and a rule in a
 * prompt is a suggestion. This script makes them restrictions: it re-fetches
 * every URL itself and re-matches the digits before anything is written, so a
 * session that hallucinates a source cannot write one. It refuses the WHOLE
 * file if any single entry fails, so a run is all-or-nothing rather than
 * half-written.
 *
 * It matches using the cron's own functions, imported directly from
 * apps/web/src/lib/sos-verify.ts (Node strips the types). That is deliberate:
 * a re-implementation here would drift from the verifier that has to re-confirm
 * these same numbers every Monday, and a source that passes this script but
 * fails the cron is worse than no source at all.
 *
 * verified_date is deliberately NOT set — that stamp belongs to Monday's cron,
 * so it always means "a fetch confirmed this", never "an agent said so".
 */
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { extractPageTokens, numberMatchesPage, normalisePhone, rowPhones, PHONE_FIELDS } from "../apps/web/src/lib/sos-verify.ts";

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

/** Never acceptable, per the procedure. Directory farms and user-generated pages. */
const DENY = ["justdial", "practo", "sulekha", "medindia", "hospitalkhoj", "indiacustomercare",
  "wikipedia", "blogspot", "wordpress", "facebook", "tripadvisor", "quora", "youtube", "amazonaws"];

/** Official by construction. Anything else must be listed in the allow file. */
const OFFICIAL_SUFFIX = [".gov.in", ".nic.in", ".edu.in"];
/**
 * The allow file widens what an autonomous run may trust, so it must not be
 * readable from the working tree: the session that calls this script has Bash
 * and can simply edit the file, which is exactly what happened on the first run
 * (it added 3 hosts and then used them). An in-repo file is not a gate against
 * a process that can write in-repo files.
 *
 * So we read it from a git ref pinned by the CALLER before the session started
 * (SOS_ALLOW_REF, set by sos-backlog-weekly.sh to HEAD at launch). The session
 * cannot retroactively change what that commit contains, so widening the list
 * genuinely requires a human commit landing before the next run. With no ref
 * set we fall back to the working tree and say so, because a human running this
 * by hand is the case the gate is not protecting against.
 */
const ALLOW_FILE = "data/sos-source-hosts-allow.json";
const ALLOW_REF = process.env.SOS_ALLOW_REF || "";
let allowRaw = "{}", allowFrom = "";
if (ALLOW_REF) {
  try {
    allowRaw = execFileSync("git", ["show", `${ALLOW_REF}:${ALLOW_FILE}`], { encoding: "utf8" });
    allowFrom = `${ALLOW_REF.slice(0, 8)} (pinned before the run)`;
  } catch {
    console.error(`REFUSED: SOS_ALLOW_REF=${ALLOW_REF} is set but ${ALLOW_FILE} could not be read from it.`);
    process.exit(1);
  }
} else if (existsSync(ALLOW_FILE)) {
  allowRaw = readFileSync(ALLOW_FILE, "utf8");
  allowFrom = "working tree (UNPINNED — no SOS_ALLOW_REF)";
}
/** "www." is not identity: an allow entry for gujarattourism.com must cover
 *  www.gujarattourism.com, or a legitimate source is dropped over a prefix. */
const bare = (h) => h.toLowerCase().replace(/^www\./, "");
const extraAllow = new Set(Object.keys(JSON.parse(allowRaw)).filter((k) => !k.startsWith("_")).map(bare));
if (extraAllow.size) console.log(`allow-list: ${extraAllow.size} extra host(s) from ${allowFrom}`);

const [file, ...flags] = process.argv.slice(2);
const DRY = flags.includes("--dry");
if (!file) { console.error("usage: sos-source-map-insert.mjs <entries.json> [--dry]"); process.exit(2); }

const input = JSON.parse(readFileSync(file, "utf8"));
const entries = Array.isArray(input.entries) ? input.entries : [];
const run = input.run ?? {};
if (!entries.length) { console.log("no entries — nothing to write"); }

const today = new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10); // IST
const errors = [];
const fields = new Set(PHONE_FIELDS);

// ── shape + host policy, before any network call ──────────────────────────────
const staged = entries.map((e, i) => {
  const err = (m) => errors.push(`entry ${i} (${e.number ?? "?"}): ${m}`);
  const digits = normalisePhone(String(e.number ?? ""));
  if (!digits || digits.length < 3) err("number missing or not phone-shaped");
  if (!fields.has(e.field)) err(`field '${e.field}' is not one of ${[...fields].join("|")}`);
  let host = "";
  try {
    const u = new URL(e.url);
    if (u.protocol !== "https:" && u.protocol !== "http:") err("url not http(s)");
    host = u.hostname.toLowerCase();
  } catch { err("url unparseable"); }
  if (host) {
    if (DENY.some((d) => host.includes(d))) err(`host ${host} is a denied source type`);
    else if (!OFFICIAL_SUFFIX.some((s) => host.endsWith(s)) && !extraAllow.has(bare(host)))
      err(`host ${host} is not .gov.in/.nic.in/.edu.in and is not in ${ALLOW_FILE} — add it there with a reason if it is genuinely official`);
  }
  return { digits, url: e.url, field: e.field, host };
});
if (errors.length) { console.error("REFUSED before fetching — invalid entries:\n" + errors.join("\n")); process.exit(1); }

// ── re-fetch and re-match every entry ourselves ───────────────────────────────
const pages = new Map();
/**
 * Indian government hosts are slow and cold-start badly: indiancoastguard.gov.in
 * and nainital.nic.in both timed out on a 25s first attempt and answered 200 on
 * the retry. A single attempt would record "page did not load" and silently drop
 * a perfectly good source — a transient failure is not evidence of absence, and
 * dropping a real source is how a backlog stays stuck. Three attempts, growing
 * timeout, and only then do we call it unreachable.
 */
async function getPage(url) {
  if (pages.has(url)) return pages.get(url);
  let res = { ok: false, raw: "", status: 0 };
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, {
        headers: { "User-Agent": UA, "Accept-Language": "en-IN,en;q=0.9" },
        signal: AbortSignal.timeout(30_000 + attempt * 20_000),
      });
      const raw = await r.text();
      res = { ok: r.ok, raw, status: r.status };
      if (r.ok) break;
    } catch (e) { res = { ok: false, raw: "", status: 0, error: e.message }; }
    if (attempt < 2) await new Promise((z) => setTimeout(z, 2000 * (attempt + 1)));
  }
  pages.set(url, res);
  return res;
}

console.log(`re-verifying ${staged.length} entr${staged.length === 1 ? "y" : "ies"} against their live pages…`);
const confirmed = [];
for (const s of staged) {
  const page = await getPage(s.url);
  if (!page.ok) { errors.push(`${s.digits}: ${s.url} did not load (status ${page.status}${page.error ? ", " + page.error : ""})`); continue; }
  const tokens = extractPageTokens(page.raw);
  if (!numberMatchesPage(s.digits, tokens, page.raw)) {
    errors.push(`${s.digits}: page loaded (${page.status}) but the number is NOT on it — ${s.url}`);
    continue;
  }
  confirmed.push(s);
  console.log(`  ✓ ${s.digits}  ${s.host}`);
}
if (errors.length) {
  console.error(`\nREFUSED — ${errors.length} of ${staged.length} entries failed live re-verification:\n` + errors.join("\n"));
  console.error("\nNothing was written. Fix or drop the failing entries and re-run.");
  process.exit(1);
}
console.log(`all ${confirmed.length} confirmed on their live pages${DRY ? " (dry run — stopping here)" : ""}`);
if (DRY) process.exit(0);
if (!confirmed.length) process.exit(0);

// ── merge into source_map on every row carrying the number ────────────────────
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
let rows = [], from = 0;
for (;;) {
  const { data, error } = await s.from("emergency_sos").select("destination_id, source_map, " + PHONE_FIELDS.join(", ")).range(from, from + 999);
  if (error) { console.error("read failed:", error.message); process.exit(1); }
  rows = rows.concat(data);
  if (data.length < 1000) break;
  from += 1000;
}

let rowsTouched = 0, pairs = 0;
for (const row of rows) {
  const carried = rowPhones(row);                       // [{digits, field}] via the cron's own extractor
  const additions = {};
  for (const c of confirmed) {
    if (!carried.some((p) => p.digits === c.digits)) continue;
    const existing = row.source_map?.[c.digits];
    if (existing?.url === c.url) continue;              // already recorded, same page
    additions[c.digits] = { url: c.url, field: c.field, last_seen: today };
  }
  if (!Object.keys(additions).length) continue;
  const merged = { ...(row.source_map ?? {}), ...additions };
  const { error } = await s.from("emergency_sos").update({ source_map: merged }).eq("destination_id", row.destination_id);
  if (error) { console.error("write failed on", row.destination_id, error.message); process.exit(1); }
  rowsTouched++; pairs += Object.keys(additions).length;
}

const viaAllowList = confirmed.filter((c) => !OFFICIAL_SUFFIX.some((x) => c.host.endsWith(x))).map((c) => c.host);
const summary = { allow_list_hosts_used: [...new Set(viaAllowList)], allow_list_source: allowFrom || "none",
  candidates: run.candidates ?? staged.length, confirmed: confirmed.length,
  rows_touched: rowsTouched, number_row_pairs: pairs, dropped: run.dropped ?? 0, note: run.note ?? null, runner: "local-launchagent" };
await s.from("ops_reports").insert({ job: "sos-backlog", summary, alerts_count: 0, ok: true });
console.log(`\nSOURCED ${confirmed.length} numbers across ${rowsTouched} rows (${pairs} number-row pairs).`);
