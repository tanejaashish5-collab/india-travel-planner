#!/usr/bin/env node
/**
 * sos-changed-apply.mjs — the only way the Monday triage can change an emergency_sos row.
 *
 * WHY THIS EXISTS (founder 2026-11-02: "i thought this was being monitored and fixed
 * autonomously")
 * sos-auto-reverify flags a number that vanished from its source on Monday, but the
 * job that judges those rows ran on Sunday, so a flagged safety number waited 6 days.
 * scripts/sos-changed-triage.sh now runs a session right after the Monday check. The
 * session only proposes; this script decides.
 *
 * Digits on an official page are not enough. On 2026-11-02 Silvassa's "DNH Police
 * Control Room: 0260-2220444" was printed on ddd.gov.in, under DAMAN & DIU. A digits
 * check would have called that number confirmed. So every proposal must pass:
 *   1. Scope: the row is number_changed and its note names this number.
 *   2. Host: official by construction or on the allow list pinned before the run.
 *   3. Page: this script fetches it, finds the digits, and finds the quote verbatim.
 *   4. Two independent sessions (no reasoning from the proposer, no write access) each
 *      say the page prints this number for the SAME named facility the row states, and
 *      each gives a quote this script finds on the page.
 * A row becomes `confirmed` only if the cron's own verifyRow() confirms it afterwards.
 * Everything else is left alone and stays in the Monday SOS email.
 *
 * Usage:
 *   node --env-file=apps/web/.env.local scripts/sos-changed-apply.mjs --count
 *   node --env-file=apps/web/.env.local scripts/sos-changed-apply.mjs --pull <rows.json>
 *   node --env-file=apps/web/.env.local scripts/sos-changed-apply.mjs <proposals.json> [--dry] [--note <file>] [--touched <file>]
 *   node --env-file=apps/web/.env.local scripts/sos-changed-apply.mjs --verify-only <items.json>
 *
 * proposals.json = { "proposals": [ { destination_id, digits, kind: "moved" | "replaced",
 *                    url, quote, new_number? } ] }
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { extractPageTokens, normalisePhone, numberMatchesPage, rowPhones, urlsForRow, verifyRow, PHONE_FIELDS } from "../apps/web/src/lib/sos-verify.ts";

const args = process.argv.slice(2);
const flag = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : null);
const DRY = args.includes("--dry");
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const COLS = "destination_id, verified, verified_date, source_url, source_map, auto_verify_status, auto_verify_note, auto_verify_fail_streak, auto_verified_at, " + PHONE_FIELDS.join(", ");
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const today = new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10); // IST

// ── host policy, as in sos-source-map-insert.mjs ──────────────────────────────
const DENY = ["justdial", "practo", "sulekha", "medindia", "hospitalkhoj", "indiacustomercare",
  "wikipedia", "blogspot", "wordpress", "facebook", "tripadvisor", "quora", "youtube", "amazonaws"];
const OFFICIAL_SUFFIX = [".gov.in", ".nic.in", ".edu.in"];
const ALLOW_FILE = "data/sos-source-hosts-allow.json";
const ALLOW_REF = process.env.SOS_ALLOW_REF || "";
const allowRaw = ALLOW_REF ? execFileSync("git", ["show", `${ALLOW_REF}:${ALLOW_FILE}`], { encoding: "utf8" })
  : existsSync(ALLOW_FILE) ? readFileSync(ALLOW_FILE, "utf8") : "{}";
const bare = (h) => h.toLowerCase().replace(/^www\./, "");
const extraAllow = new Set(Object.keys(JSON.parse(allowRaw)).filter((k) => !k.startsWith("_")).map(bare));
function hostProblem(url) {
  let host;
  try { host = bare(new URL(url).hostname); } catch { return `not a web address: ${url}`; }
  if (DENY.some((d) => host.includes(d))) return `${host} is never a source`;
  if (OFFICIAL_SUFFIX.some((x) => `.${host}`.endsWith(x)) || extraAllow.has(host)) return null;
  return `${host} is not official`;
}

// ── pages ─────────────────────────────────────────────────────────────────────
const pages = new Map();
async function getPage(url) {
  if (pages.has(url)) return pages.get(url);
  let res = { ok: false, raw: "", status: 0 };
  // Indian government hosts cold-start badly; one timeout is not evidence of absence.
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, { redirect: "follow", headers: { "User-Agent": UA, "Accept-Language": "en-IN,en;q=0.9" }, signal: AbortSignal.timeout(30_000 + attempt * 20_000) });
      res = { ok: r.ok, raw: await r.text(), status: r.status };
      if (r.ok) break;
    } catch { res = { ok: false, raw: "", status: 0 }; }
    if (attempt < 2) await new Promise((z) => setTimeout(z, 2000 * (attempt + 1)));
  }
  pages.set(url, res);
  return res;
}
const stripped = (raw) => raw.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ");
/** Letters and digits only: table cells come back from different fetchers with different punctuation. */
const alnum = (x) => String(x).toLowerCase().replace(/&nbsp;|&#160;|&amp;/g, " ").replace(/[^a-z0-9]/g, "");
function pageTokens(page) { const text = stripped(page.raw); return { tokens: extractPageTokens(text), raw: text.replace(/\D/g, "") }; }
const onPage = (digits, page) => { const { tokens, raw } = pageTokens(page); return numberMatchesPage(digits, tokens, raw); };
const quoteOnPage = (quote, page) => alnum(quote).length >= 12 && alnum(stripped(page.raw)).includes(alnum(quote));
/** The quote has to carry the number, or it proves nothing about that number. */
const quoteCarries = (quote, digits) => String(quote).replace(/\D/g, "").includes(digits.slice(-8));

// ── independent sessions ──────────────────────────────────────────────────────
function verifierPrompt(items) {
  return `You are an independent fact-checker for NakshIQ, an India travel site. Travellers in an emergency dial these numbers, so a number filed under the wrong facility can cost a life. Today is ${today}.

For EACH item open the page yourself (WebFetch, or curl with a browser User-Agent; government hosts are slow, retry before giving up). Decide whether the page prints NUMBER for the same facility or role that STORED names. Compare the place too: a control room for a different district or territory is NOT the same facility, even when the name looks alike.
- APPROVE only if the page prints NUMBER against that same named facility or role, for that same place.
- REJECT if the page prints NUMBER against a different facility or place, or prints a different number for that facility.
- HOLD if the page does not make it clear, or would not load.
If an item has REPLACES, the row currently shows that old number: also REJECT if the same page still lists the old number for this facility.
Never approve on plausibility. Do not write files or touch any database.

Reply with ONLY a JSON array, no prose, of: {"id": "<item id>", "verdict": "APPROVE|REJECT|HOLD", "reason": "<one sentence>", "label_on_page": "<what the page calls this number>", "quote": "<copied verbatim from the page, label and number together>"}.

Items:
${items.map((i) => `- id ${i.id} | ${i.destination_id} | field ${i.field}\n  STORED: ${JSON.stringify(i.stored)}\n  NUMBER: ${i.number}${i.replaces ? `\n  REPLACES: ${i.replaces}` : ""}\n  PAGE: ${i.url}`).join("\n")}`;
}
function runVerifier(items, label) {
  const r = spawnSync("claude", ["-p", verifierPrompt(items), "--model", "sonnet", "--output-format", "json",
    "--allowedTools", "WebFetch,Bash(curl:*)", "--max-turns", "60"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: 30 * 60 * 1000 });
  if (r.status !== 0) { console.error(`verifier ${label} exit ${r.status}: ${(r.stderr || "").slice(0, 300)}`); return []; }
  let text;
  try { text = JSON.parse(r.stdout).result; } catch { text = r.stdout; }
  const m = String(text).match(/\[\s*\{[\s\S]*\}\s*\]/);
  try { return m ? JSON.parse(m[0]) : []; } catch { console.error(`verifier ${label}: unparseable reply`); return []; }
}
async function doubleCheck(items) {
  if (!items.length) return new Map();
  console.log(`verifying ${items.length} proposal(s) with 2 independent sessions…`);
  const A = new Map(runVerifier(items, "A").map((x) => [String(x.id), x]));
  const B = new Map(runVerifier(items, "B").map((x) => [String(x.id), x]));
  const out = new Map();
  for (const it of items) {
    const a = A.get(it.id), b = B.get(it.id);
    const page = await getPage(it.url);
    const good = (v) => v?.verdict === "APPROVE" && page.ok && quoteOnPage(v.quote ?? "", page) && quoteCarries(v.quote ?? "", it.number);
    out.set(it.id, { ok: good(a) && good(b), a: a?.verdict ?? "NONE", b: b?.verdict ?? "NONE", reasonA: a?.reason, reasonB: b?.reason, labelA: a?.label_on_page });
  }
  return out;
}

// ── commands ──────────────────────────────────────────────────────────────────
async function flagged() {
  const { data, error } = await s.from("emergency_sos").select(COLS).eq("auto_verify_status", "number_changed");
  if (error) { console.error(`FATAL: ${error.message}`); process.exit(1); }
  return data ?? [];
}

if (args.includes("--count")) { console.log(`RESULT flagged=${(await flagged()).length}`); process.exit(0); }

if (flag("--pull")) {
  writeFileSync(flag("--pull"), JSON.stringify(await flagged(), null, 2));
  process.exit(0);
}

if (flag("--verify-only")) {
  const items = JSON.parse(readFileSync(flag("--verify-only"), "utf8"));
  for (const [id, v] of await doubleCheck(items)) console.log(id, v.ok ? "PASS" : "FAIL", `A ${v.a}: ${v.reasonA ?? "-"} | B ${v.b}: ${v.reasonB ?? "-"}`);
  process.exit(0);
}

const file = args.find((a) => !a.startsWith("--") && a !== flag("--note") && a !== flag("--touched"));
if (!file) { console.error("usage: see the header of this file"); process.exit(2); }
const { proposals = [] } = JSON.parse(readFileSync(file, "utf8"));
const rows = new Map((await flagged()).map((r) => [r.destination_id, r]));
const report = [];
const staged = [];
const reject = (p, why) => { report.push({ p, outcome: "left", why }); console.log(`left      ${p.destination_id} ${p.digits}: ${why}`); };

for (const [n, p] of proposals.entries()) {
  const row = rows.get(p.destination_id);
  if (!row) { reject(p, "row is not flagged number_changed"); continue; }
  const digits = normalisePhone(String(p.digits ?? ""));
  if (!row.auto_verify_note?.includes(digits)) { reject(p, "the flag does not name this number"); continue; }
  const field = rowPhones(row).find((x) => x.digits === digits)?.field;
  if (!field) { reject(p, "row does not carry this number"); continue; }
  if (p.kind !== "moved" && p.kind !== "replaced") { reject(p, `unknown kind ${p.kind}`); continue; }
  const host = hostProblem(p.url);
  if (host) { reject(p, host); continue; }
  const page = await getPage(p.url);
  if (!page.ok) { reject(p, `page did not load (${page.status})`); continue; }
  const number = p.kind === "moved" ? digits : normalisePhone(String(p.new_number ?? ""));
  if (number.length < 3) { reject(p, "no usable new number"); continue; }
  if (!onPage(number, page)) { reject(p, `${number} is not on the page`); continue; }
  if (!quoteOnPage(p.quote ?? "", page)) { reject(p, "quote is not on the page"); continue; }
  if (!quoteCarries(p.quote ?? "", number)) { reject(p, "quote does not contain the number"); continue; }
  let matcher = null;
  if (p.kind === "replaced") {
    if (number === digits) { reject(p, "new number equals the old one"); continue; }
    if (onPage(digits, page)) { reject(p, "the old number is still on that page"); continue; }
    // Only ever swap one printed number for another; the row's wording stays as it was.
    matcher = new RegExp(`(?:\\+?91[\\s-]*)?${digits.split("").join("[\\s\\-()]*")}`, "g");
    if ((String(row[field]).match(matcher) ?? []).length !== 1) { reject(p, "old number is not printed exactly once in its field"); continue; }
  }
  staged.push({ p, id: `item${n + 1}`, destination_id: p.destination_id, field, digits, number, url: p.url, matcher, stored: row[field], replaces: p.kind === "replaced" ? digits : null });
}

const checks = await doubleCheck(staged.map(({ id, destination_id, field, stored, number, replaces, url }) => ({ id, destination_id, field, stored, number, replaces, url })));
const touched = new Set();
for (const st of staged) {
  const c = checks.get(st.id);
  if (!c?.ok) { reject(st.p, `double check did not pass: A ${c?.a} (${c?.reasonA ?? "-"}); B ${c?.b} (${c?.reasonB ?? "-"})`); continue; }
  const row = rows.get(st.destination_id);
  const map = { ...(row.source_map ?? {}) };
  const patch = {};
  if (st.p.kind === "replaced") {
    delete map[st.digits];
    patch[st.field] = String(row[st.field]).replace(st.matcher, String(st.p.new_number).trim());
    row[st.field] = patch[st.field];
    touched.add(st.destination_id);
  }
  map[st.number] = { url: st.url, field: st.field, last_seen: today };
  patch.source_map = map;
  row.source_map = map;
  if (!DRY) {
    const { error } = await s.from("emergency_sos").update(patch).eq("destination_id", st.destination_id);
    if (error) { reject(st.p, `write failed: ${error.message}`); continue; }
  }
  report.push({ p: st.p, outcome: st.p.kind, before: st.stored, after: patch[st.field] ?? st.stored, url: st.url, label: c.labelA });
  console.log(`${st.p.kind.padEnd(9)} ${st.destination_id} ${st.digits} -> ${st.url}`);
}

// Same check, same patch as the cron: the row clears only if every local number on it was seen today.
let cleared = 0;
for (const id of new Set(staged.map((x) => x.destination_id))) {
  const row = rows.get(id);
  const fresh = new Map();
  for (const u of urlsForRow(row)) { const pg = await getPage(u); fresh.set(u, pg.ok ? { ok: true, status: pg.status, ...pageTokens(pg) } : { ok: false, tokens: [], raw: "", status: pg.status }); }
  const v = verifyRow(row, fresh, today);
  console.log(`recheck   ${id}: ${v.status} (${v.note})`);
  if (v.status !== "confirmed") continue;
  cleared++;
  if (DRY) continue;
  const now = new Date().toISOString();
  const { error } = await s.from("emergency_sos").update({ source_map: v.nextSourceMap, auto_verify_status: "confirmed", auto_verify_note: `${v.note} (Monday triage)`,
    auto_verify_fail_streak: 0, auto_verified_at: now, last_verified_attempt_at: now, verified: true, verified_date: today, verified_by: "sos-changed-triage" }).eq("destination_id", id);
  if (error) console.error(`warn: ${id}: ${error.message}`);
}

const left = report.filter((r) => r.outcome === "left").length;
const fixed = report.length - left;
const lines = [`# SOS Monday triage ${today}`, "", `${rows.size} row(s) flagged, ${fixed} number(s) settled, ${cleared} row(s) cleared, ${left} proposal(s) refused${DRY ? " (DRY RUN)" : ""}.`, "",
  "Rows that did not clear stay in the Monday SOS email.", ""];
for (const r of report) {
  lines.push(`- ${r.p.destination_id} ${r.p.digits}: ${r.outcome}${r.why ? `, ${r.why}` : ""}`);
  if (r.outcome !== "left") lines.push(`  - page: ${r.url}, printed as: ${r.label ?? "-"}`);
  if (r.outcome === "replaced") lines.push(`  - before: ${r.before}`, `  - after: ${r.after}`);
}
const noteFile = flag("--note");
if (noteFile) writeFileSync(noteFile, lines.join("\n") + "\n");
if (flag("--touched")) writeFileSync(flag("--touched"), [...touched].join(","));
if (!DRY) await s.from("ops_reports").insert({ job: "sos-changed-triage", ok: true, alerts_count: rows.size - cleared, summary: { flagged: rows.size, settled: fixed, cleared, refused: left, runner: "local-launchagent" } });
console.log(`RESULT flagged=${rows.size} settled=${fixed} cleared=${cleared} refused=${left}${DRY ? " dry-run" : ""}`);
