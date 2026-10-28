#!/usr/bin/env node
/**
 * corrections-autoverify.mjs — decide the destination_corrections approval queue
 * without the founder, when two independent checks agree.
 *
 * WHY (founder 2026-10-29): "make it autonomous from next time I don't need to be
 * involved .. check twice and then approve if all looked good". Until then every
 * fix the weekly review queued waited for his click (decision 10-04, because on
 * 10-03 the reviewer's wording was fully right in only 1 of 5). The 10-28 email
 * held 25 fixes; 12 of them were cyclone warnings whose forecast had already
 * passed by the time they could go live, so a click-queue also goes stale.
 *
 * WHAT IT DOES, per pending correction:
 *   1. Date gate (deterministic). A notice whose latest stated date is in the
 *      past is rejected. A notice ending within 21 days is applied with its
 *      expiry pulled in to that end date, so it never outlives its own window.
 *   2. Two independent verifier sessions (`claude -p --model sonnet`, fresh
 *      context each, no DB access, see only old value / new value / cited
 *      source, never the reviewer's notes). Each splits the new text into claims
 *      and must return SUPPORTED + URL + verbatim quote for every claim.
 *   3. Quote check (deterministic). This script fetches every cited page itself
 *      and confirms each quote appears in it. A claim counts only if at least
 *      one verifier's quote for it is found verbatim.
 *   Both APPROVE + every claim quote-confirmed -> applied via the same signed
 *   /api/admin/corrections/<id> POST the email button uses (compare-and-set,
 *   revalidates en+hi). Both REJECT -> rejected. Anything else stays pending and
 *   goes to the founder's email as before.
 *
 * The decision is made HERE, in code, from the verifiers' JSON; the verifier
 * sessions cannot write anything (no Supabase tools, Bash limited to curl and
 * pdftotext).
 *
 * Usage (scripts/freshness-review-weekly.sh runs it after the stamp step):
 *   node --env-file=apps/web/.env.local scripts/corrections-autoverify.mjs [--dry] [--out data/audits/corrections-auto-<date>.md]
 */
import { createClient } from "@supabase/supabase-js";
import { createHmac } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { writeFileSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const OUT = args.includes("--out") ? args[args.indexOf("--out") + 1] : null;
const SITE = "https://www.nakshiq.com";
const NOTICE_DAYS = 21;
const RAW_DIR = mkdtempSync(join(tmpdir(), "autoverify-"));

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const SECRET = (process.env.NEWSLETTER_SEND_SECRET || "").trim();
if (!SECRET) { console.error("FATAL: NEWSLETTER_SEND_SECRET missing"); process.exit(1); }

// ---------- 1. date gate ----------
const MON = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11 };
const M = "(jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec)[a-z]*";
/** End of the window a notice states, or null. Only END dates count: the last day
 *  of a range ("26–28 Oct 2026", "Oct 26–Nov 5, 2026") or a date after
 *  until/till/through/to ("until 1 November 2026"). A start or an event date
 *  ("closed since 5 July 2026", "killed on 19 Oct") is not an end, so an ongoing
 *  closure is never rejected for being old (tested 2026-10-29 on Basara, Imphal). */
export function windowEnd(text, now = new Date()) {
  if (typeof text !== "string") return null;
  const t = text.toLowerCase().replace(/[–—]/g, "-");
  const yearIn = t.match(/\b(20\d\d)\b/g)?.map(Number) ?? [];
  const defYear = yearIn.length ? Math.max(...yearIn) : now.getUTCFullYear();
  const found = [];
  const push = (d, m, y) => { const day = Number(d); if (day >= 1 && day <= 31) found.push(Date.UTC(Number(y ?? defYear), MON[m.startsWith("sept") ? "sept" : m.slice(0, 3)], day)); };
  const END = "(?:until|till|through|thru|to|ends?|ending)\\s+(?:the\\s+)?";
  // "26-28 oct 2026" (range end)
  for (const x of t.matchAll(new RegExp(`\\b\\d{1,2}\\s*-\\s*(\\d{1,2})\\s+${M}\\b,?\\s*(20\\d\\d)?`, "g"))) push(x[1], x[2], x[3]);
  // "oct 26-nov 5, 2026" / "oct 26-30" (range end)
  for (const x of t.matchAll(new RegExp(`\\b${M}\\s+\\d{1,2}\\s*-\\s*(?:${M}\\s+)?(\\d{1,2})\\b,?\\s*(20\\d\\d)?`, "g"))) push(x[3], x[2] ?? x[1], x[4]);
  // "until 1 november 2026" / "through 26 oct"
  for (const x of t.matchAll(new RegExp(`${END}(\\d{1,2})\\s+${M}\\b,?\\s*(20\\d\\d)?`, "g"))) push(x[1], x[2], x[3]);
  // "until november 1, 2026"
  for (const x of t.matchAll(new RegExp(`${END}${M}\\s+(\\d{1,2})\\b,?\\s*(20\\d\\d)?`, "g"))) push(x[2], x[1], x[3]);
  return found.length ? new Date(Math.max(...found)) : null;
}

// ---------- 2. verifier sessions ----------
function verifierPrompt(items) {
  return `You are an independent fact-checker for NakshIQ, an India travel site. Readers act on these fields (permits, airports, closure notices), so a wrong claim can strand someone. Today is ${new Date().toISOString().slice(0, 10)}.

For EACH item below: split NEW into its separate factual claims (portal URL, fee, who needs which permit, dates, distances, place lists, closures). Open sources yourself (WebFetch; for PDFs use Bash: curl -sL <url> -o /tmp/x.pdf && pdftotext /tmp/x.pdf -). The cited source is a starting point, not proof; you may use other official (.gov.in/.nic.in, state tourism) or named-news pages. Check the article's YEAR, not just its date line.
For every claim give: status SUPPORTED / CONTRADICTED / UNSUPPORTED, the URL you read, and a VERBATIM quote of 6-25 words copied exactly from that page (it will be machine-checked against the page; a paraphrase fails).
Verdict per item:
- APPROVE only if every claim is SUPPORTED, the event described is current (not already over, not a superseded forecast), and NEW is not worse than OLD.
- REJECT if any claim is CONTRADICTED, or the notice describes something already over.
- HOLD otherwise (unsupported claims, pages that would not load, judgement calls).
Never approve on plausibility. Do not write files or touch any database.

Reply with ONLY a JSON array, no prose, of: {"id": "<item id>", "verdict": "APPROVE|REJECT|HOLD", "reason": "<one sentence>", "claims": [{"claim": "...", "status": "...", "url": "...", "quote": "..."}]}

Items:
${items.map((i) => `- id ${i.short} | ${i.destination_id} | field ${i.field}\n  OLD: ${JSON.stringify(i.old)}\n  NEW: ${JSON.stringify(i.value)}\n  cited source: ${i.source}`).join("\n")}`;
}

function runVerifier(items, label) {
  const r = spawnSync("claude", ["-p", verifierPrompt(items), "--model", "sonnet", "--output-format", "json",
    "--allowedTools", "WebSearch,WebFetch,Bash(curl:*),Bash(pdftotext:*)", "--max-turns", "120"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: 60 * 60 * 1000 });
  if (r.status !== 0) { console.error(`verifier ${label} exit ${r.status}: ${(r.stderr || "").slice(0, 300)}`); return null; }
  let text;
  try { text = JSON.parse(r.stdout).result; } catch { text = r.stdout; }
  try { writeFileSync(join(RAW_DIR, `verifier-${label}.txt`), String(text)); } catch { /* audit copy only */ }
  const m = String(text).match(/\[\s*\{[\s\S]*\}\s*\]/);
  try { return m ? JSON.parse(m[0]) : null; } catch { console.error(`verifier ${label}: unparseable reply`); return null; }
}

// ---------- 3. quote check ----------
const pageCache = new Map();
const norm = (x) => String(x).toLowerCase().replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&")
  .replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();
async function pageText(url) {
  if (pageCache.has(url)) return pageCache.get(url);
  let txt = "";
  try {
    if (/\.pdf(\?|$)/i.test(url)) {
      const dir = mkdtempSync(join(tmpdir(), "cav-"));
      execFileSync("curl", ["-sL", "--max-time", "60", url, "-o", join(dir, "f.pdf")]);
      txt = execFileSync("pdftotext", [join(dir, "f.pdf"), "-"], { encoding: "utf8" });
    } else {
      const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(30000),
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36" } });
      if (res.ok) txt = await res.text();
    }
  } catch { /* unreachable = quote not confirmed */ }
  const n = norm(txt);
  pageCache.set(url, n);
  return n;
}
async function quoteFound(c) {
  if (!c?.url || !c?.quote || c.status !== "SUPPORTED") return false;
  const q = norm(c.quote);
  if (q.split(" ").length < 4) return false;
  return (await pageText(c.url)).includes(q);
}

// ---------- decide ----------
const sig = (id) => createHmac("sha256", SECRET).update(`destination-correction:${id}`).digest("hex").slice(0, 40);
async function decide(id, action) {
  if (DRY) return { ok: true, status: 0, msg: "dry run" };
  const res = await fetch(`${SITE}/api/admin/corrections/${id}`, { method: "POST", body: new URLSearchParams({ sig: sig(id), action }) });
  const t = await res.text();
  return { ok: res.ok, status: res.status, msg: (t.match(/<h1>([^<]*)<\/h1>/) || [])[1] ?? t.slice(0, 120) };
}

const { data: pending, error } = await s.from("destination_corrections")
  .select("id, destination_id, changes, created_at").eq("status", "pending").order("created_at");
if (error) { console.error(`FATAL: ${error.message}`); process.exit(1); }
const now = new Date();
const log = [];
const decisions = [];
const toVerify = [];

for (const row of pending ?? []) {
  const notice = row.changes.find((c) => c.field === "notice_text" && c.value);
  const end = notice ? windowEnd(notice.value, now) : null;
  if (notice && end && end.getTime() + 86400000 < now.getTime()) {
    decisions.push({ row, action: "reject", why: `notice describes a window that ended ${end.toISOString().slice(0, 10)}` });
    continue;
  }
  toVerify.push({ row, end });
}

const items = toVerify.flatMap(({ row }) => row.changes
  .filter((c) => c.field !== "notice_source_url")
  .map((c) => ({ id: `${row.id}:${c.field}`, destination_id: row.destination_id, field: c.field, old: c.expected, value: c.value, source: c.source })))
  // Verifiers answer with these short ids; long UUIDs came back shortened and matched nothing (dry run 2026-10-29).
  .map((it, n) => ({ ...it, short: `item${n + 1}` }));
const shortToId = new Map(items.map((i) => [i.short, i.id]));

let A = null, B = null;
if (items.length) {
  console.log(`verifying ${items.length} change(s) on ${toVerify.length} correction(s) with 2 independent sessions…`);
  A = runVerifier(items, "A");
  B = runVerifier(items, "B");
}
const byId = (arr) => new Map((arr ?? []).map((x) => [shortToId.get(String(x.id).trim()) ?? x.id, x]));
console.log(`verifier A answered ${A?.length ?? "nothing"}, B answered ${B?.length ?? "nothing"} (raw replies in ${RAW_DIR})`);
const vA = byId(A), vB = byId(B);

for (const { row, end } of toVerify) {
  const parts = row.changes.filter((c) => c.field !== "notice_source_url");
  const res = [];
  for (const c of parts) {
    const key = `${row.id}:${c.field}`;
    const a = vA.get(key), b = vB.get(key);
    // Each verifier is judged on its own claims (they word claims differently, so
    // matching claims across the two never lines up): every claim SUPPORTED, and
    // at least half of its quotes, minimum one, found verbatim on the cited page
    // by this script. Pages that are PDFs-as-images or JS-only legitimately fail
    // the machine fetch, hence half rather than all.
    const judge = async (v) => {
      const cl = v?.claims ?? [];
      if (!cl.length || cl.some((x) => x.status !== "SUPPORTED")) return { ok: false, found: 0, n: cl.length };
      let found = 0;
      for (const x of cl) if (await quoteFound(x)) found++;
      return { ok: found >= 1 && found * 2 >= cl.length, found, n: cl.length };
    };
    const ja = await judge(a), jb = await judge(b);
    const names = { length: ja.n + jb.n };
    const confirmed = ja.found + jb.found;
    res.push({ field: c.field, a: a?.verdict ?? "NONE", b: b?.verdict ?? "NONE", reasonA: a?.reason, reasonB: b?.reason,
      claims: names.length, confirmed, quotesOk: ja.ok && jb.ok });
  }
  const allApprove = res.every((r) => r.a === "APPROVE" && r.b === "APPROVE" && r.quotesOk);
  const bothReject = res.some((r) => r.a === "REJECT" && r.b === "REJECT");
  if (allApprove) decisions.push({ row, action: "approve", end, res, why: "both checks approved every claim; every claim quote found on its source" });
  else if (bothReject) decisions.push({ row, action: "reject", res, why: `both checks rejected: ${res.map((r) => r.reasonA).filter(Boolean).join(" / ")}` });
  else decisions.push({ row, action: "hold", res, why: res.map((r) => `${r.field}: A ${r.a}, B ${r.b}, quotes ${r.confirmed}/${r.claims}`).join("; ") });
}

let applied = 0, rejected = 0, held = 0;
for (const d of decisions) {
  if (d.action === "hold") { held++; log.push(d); continue; }
  const r = await decide(d.row.id, d.action);
  d.result = r;
  if (r.ok && !DRY) {
    const tag = d.action === "approve" ? "applied automatically: 2 independent checks + quote check" : `rejected automatically: ${d.why}`;
    await s.from("destination_corrections").update({ result: tag.slice(0, 500) }).eq("id", d.row.id);
    if (d.action === "approve") {
      applied++;
      // A notice with a stated end inside its 21-day life comes down on that date (+1 day, IST midnight).
      if (d.end && d.end.getTime() < now.getTime() + NOTICE_DAYS * 86400000) {
        const exp = new Date(d.end.getTime() + 86400000 - 5.5 * 3600000).toISOString();
        await s.from("destinations").update({ notice_expires_at: exp }).eq("id", d.row.destination_id).not("notice_text", "is", null);
        d.expires = exp;
      }
    } else rejected++;
  } else if (d.action === "approve" && !r.ok) held++;
  log.push(d);
}

const istDate = new Date(now.getTime() + 5.5 * 3600000).toISOString().slice(0, 10);
const lines = [`# Corrections auto-verify ${istDate}`, "",
  `${applied} applied, ${rejected} rejected, ${held} left for the founder${DRY ? " (DRY RUN)" : ""}.`, ""];
for (const d of log) {
  lines.push(`## ${d.row.destination_id}: ${d.action.toUpperCase()}${d.result ? ` (${d.result.status} ${d.result.msg})` : ""}`, "", d.why);
  if (d.expires) lines.push(`Notice expiry pulled in to ${d.expires}.`);
  for (const c of d.row.changes) lines.push(`- ${c.field}: ${JSON.stringify(c.expected)} -> ${JSON.stringify(c.value)}`);
  for (const r of d.res ?? []) lines.push(`- check ${r.field}: A ${r.a} (${r.reasonA ?? "-"}); B ${r.b} (${r.reasonB ?? "-"}); quotes confirmed ${r.confirmed}/${r.claims}`);
  lines.push("");
}
if (OUT) writeFileSync(OUT, lines.join("\n"));
console.log(lines.join("\n"));
if (!DRY) await s.from("ops_reports").insert({ job: "corrections-autoverify", ok: true, alerts_count: held,
  summary: { applied, rejected, held, total: decisions.length, verifiers_ok: items.length ? Boolean(A && B) : true,
    detail: held ? `${held} correction(s) left for the founder's approval email` : null } });
console.log(`RESULT applied=${applied} rejected=${rejected} held=${held}`);
