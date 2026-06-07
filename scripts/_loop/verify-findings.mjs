#!/usr/bin/env node
/**
 * verify-findings.mjs — Phase 1 of the guard-railed loop: the VERIFY LAYER.
 *
 * Guardrail 4 ("verify-before-fix"). When an M1–M7 audit raises an alert, this
 * independently re-checks each finding with a DIFFERENT method before it counts.
 * It's the layer that would have caught the 2026-06-04 incident where 5 of 5
 * audit findings turned out to be probe bugs (false positives).
 *
 * Verdicts:
 *   confirmed     -> real; queued in .loop/findings-inbox.json for Phase 2 fix
 *   dismissed     -> false positive; logged to .loop/dismissed-findings.md (no wake-up)
 *   inconclusive  -> can't re-check here (needs creds/browser); routed to human, never auto-anything
 *
 * Read-only against the DB + the live site. Writes ONLY to .loop/ scratch files.
 *
 * Run live :   node --env-file=apps/web/.env.local scripts/_loop/verify-findings.mjs
 * Self-test:   node scripts/_loop/verify-findings.mjs --self-test
 *
 * Method per job:
 *   audit-cache-headers   -> GET re-probe (vs the audit's HEAD), browser UA, 3 passes
 *                            (catches transient edge cold-start MISS = the #1 false alarm)
 *   audit-bot-crawl-rate  -> 3-week trend re-query (vs the audit's 2-week ratio)
 *                            (catches launch burst-decay = the documented /festivals false alarm)
 *   audit-supabase-advisors / audit-gsc-* -> inconclusive (need Mgmt-API / GSC-GA4 OAuth),
 *                            routed to human with a precise reason. Never false-confirm/dismiss.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { LOOP_DIR, loadConfig, assertCanProceed } from "./guard.mjs";

const SELF_TEST = process.argv.includes("--self-test");

// ---------------------------------------------------------------------------
// PURE classifiers (unit-testable; no I/O) — the actual false-positive logic
// ---------------------------------------------------------------------------

/**
 * @param finding {url, family, violation, cache_control, vc_pass1, vc_pass2}
 * @param ev      {reachable, http, cc, vc:string[]}  // independent GET re-probe
 */
export function classifyCacheHeader(finding, ev) {
  if (!ev || !ev.reachable) {
    return {
      verdict: "inconclusive",
      reason: "GET re-probe blocked/failed (likely Vercel firewall on non-browser clients). Escalate to a real-browser (Playwright) re-probe.",
    };
  }
  if (ev.http >= 500) {
    return { verdict: "confirmed", reason: `re-probe returned ${ev.http} (5xx is real, not a cache artifact).` };
  }
  const cc = (ev.cc || "").toLowerCase();
  const dynamic = /(private|no-store|no-cache)/.test(cc) && !cc.includes("public");
  const passes = (ev.vc || []).map((v) => (v || "").toUpperCase());
  const allMiss = passes.length > 0 && passes.every((v) => v === "MISS");
  // HIT and STALE both mean the edge HAS a cached copy (STALE = serving
  // stale-while-revalidate). Only persistent MISS = genuinely uncached.
  const nowCacheable = cc.includes("public") && passes.some((v) => v === "HIT" || v === "STALE");
  if (dynamic || allMiss) {
    return {
      verdict: "confirmed",
      reason: `independent GET re-probe still uncacheable (cache-control="${cc || "(empty)"}", x-vercel-cache=${passes.join("→") || "?"}).`,
    };
  }
  if (nowCacheable) {
    return {
      verdict: "dismissed",
      reason: `re-probe shows public + cached (HIT/STALE) across ${passes.length} passes (cache-control="${cc}", ${passes.join("→")}). Edge has a cached copy — original MISS was a transient cold-start.`,
    };
  }
  return { verdict: "inconclusive", reason: `ambiguous re-probe (cache-control="${cc}", x-vercel-cache=${passes.join("→")}).` };
}

/**
 * @param finding {bot, family, current_7d, prior_7d, pct_change}
 * @param w       {current, prior, priorPrior, minHits}  // independent 3-week re-query
 */
export function classifyBotCrawl(finding, w) {
  const minHits = w.minHits ?? 30;
  if (w.prior == null || w.current == null) return { verdict: "inconclusive", reason: "re-query returned no data." };
  if (w.prior < minHits) {
    return { verdict: "inconclusive", reason: `sample too small at verify time (prior 7d = ${w.prior} < ${minHits} hits).` };
  }
  const dropNow = w.prior > 0 ? ((w.current - w.prior) / w.prior) * 100 : null;
  if (dropNow === null) return { verdict: "inconclusive", reason: "prior window empty." };
  if (dropNow > -50) {
    return { verdict: "dismissed", reason: `drop no longer present at verify time (prior ${w.prior} → current ${w.current}, ${dropNow.toFixed(1)}%). Original was transient.` };
  }
  // dropNow <= -50: distinguish sustained decline from launch burst-decay
  const pp = w.priorPrior ?? 0;
  const spike = pp > 0 && w.prior > pp * 1.8;
  const recovering = pp > 0 && w.current >= pp * 0.7;
  if (spike || recovering) {
    return {
      verdict: "dismissed",
      reason: `launch/burst decay, not a regression: priorPrior→prior→current = ${pp}→${w.prior}→${w.current}. ` +
        (spike ? "Prior week was an abnormal spike. " : "") +
        (recovering ? "Current is back near the 2-week baseline. " : "") +
        "Same shape as the documented /festivals 8→77→15 false alarm.",
    };
  }
  return {
    verdict: "confirmed",
    reason: `sustained crawl decline: priorPrior→prior→current = ${pp}→${w.prior}→${w.current} (${dropNow.toFixed(1)}% WoW, not a spike-decay).`,
  };
}

// ---------------------------------------------------------------------------
// LIVE re-check methods (I/O) — only used outside self-test
// ---------------------------------------------------------------------------

const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

async function reprobeCacheHeader(url) {
  // GET (audit uses HEAD), browser UA (audit uses NakshIQ-CacheCanary), 3 passes
  // with a real warmup gap. Method-diverse on purpose.
  const passes = [];
  let http = 0;
  let cc = "";
  let reachable = false;
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { method: "GET", redirect: "manual", headers: { "user-agent": BROWSER_UA } });
      reachable = true;
      http = r.status;
      if (i === 0) cc = (r.headers.get("cache-control") || "").toLowerCase();
      passes.push((r.headers.get("x-vercel-cache") || "").toUpperCase());
      // a 403 from the edge firewall on a non-browser client looks like a block,
      // not a cache result — treat as unreachable for classification purposes.
      if (r.status === 403) reachable = false;
    } catch {
      passes.push("ERR");
    }
    if (i < 2) await new Promise((res) => setTimeout(res, 1500));
  }
  return { reachable, http, cc, vc: passes };
}

async function requeryBotCrawl(supabase, finding) {
  const day = 86400_000;
  const now = Date.now();
  const c7 = new Date(now - 7 * day).toISOString();
  const c14 = new Date(now - 14 * day).toISOString();
  const c21 = new Date(now - 21 * day).toISOString();
  const { data, error } = await supabase
    .from("bot_visits")
    .select("bot_name, path, hit_at")
    .eq("bot_name", finding.bot)
    .gte("hit_at", c21)
    .order("hit_at", { ascending: false })
    .limit(20000);
  if (error || !data) return { current: null, prior: null, priorPrior: null };
  // Re-bucket using a coarse, INDEPENDENT family match (substring on the family
  // token) rather than the audit's exact regex — so a regex probe bug doesn't
  // propagate into the verifier.
  const fam = finding.family.replace(/[()]/g, "").split(" ")[0];
  let current = 0,
    prior = 0,
    priorPrior = 0;
  for (const row of data) {
    const p = (row.path || "").toLowerCase();
    if (!p.includes(fam)) continue;
    if (row.hit_at >= c7) current++;
    else if (row.hit_at >= c14) prior++;
    else if (row.hit_at >= c21) priorPrior++;
  }
  return { current, prior, priorPrior, minHits: 30 };
}

// ---------------------------------------------------------------------------
// Per-job dispatch
// ---------------------------------------------------------------------------

function extractFindings(job, summary) {
  if (!summary) return [];
  switch (job) {
    case "audit-cache-headers":
      return (summary.violations || []).map((v) => ({ ...v, _label: v.url }));
    case "audit-bot-crawl-rate":
      return (summary.findings || []).map((f) => ({ ...f, _label: `${f.bot} /${f.family}` }));
    default:
      // defensive: surface whatever the row exposes so a human sees it
      return (summary.findings || summary.new_lints || summary.lints || summary.violations || []).map((f, i) => ({
        ...f,
        _label: f.url || f.title || f.name || `finding ${i + 1}`,
      }));
  }
}

async function verifyOne(job, finding, ctx) {
  if (job === "audit-cache-headers") {
    const ev = ctx.test ? ctx.test.ev : await reprobeCacheHeader(finding.url);
    return classifyCacheHeader(finding, ev);
  }
  if (job === "audit-bot-crawl-rate") {
    const w = ctx.test ? ctx.test.w : await requeryBotCrawl(ctx.supabase, finding);
    return classifyBotCrawl(finding, w);
  }
  // jobs we can't independently re-check from a standalone script:
  if (job === "audit-supabase-advisors") {
    return {
      verdict: "inconclusive",
      reason: "advisor re-check needs the Supabase Management API (SUPABASE_PAT). Routed to human / Phase-2 MCP get_advisors re-query.",
    };
  }
  if (job === "audit-gsc-alerts" || job === "audit-gsc-ga4-correlation") {
    return {
      verdict: "inconclusive",
      reason: "GSC/GA4 re-check needs OAuth (GSC_OAUTH_REFRESH_TOKEN / GA creds). For correlation alerts, apply the intersection-on-shared-URLs + 20-click-floor sanity check (fix d0c1ea93) before treating as real.",
    };
  }
  return { verdict: "inconclusive", reason: `no verifier registered for job "${job}".` };
}

// ---------------------------------------------------------------------------
// Output writers (write-scratch = noGate)
// ---------------------------------------------------------------------------

function writeInbox(confirmed, inconclusive) {
  const cfg = loadConfig();
  const p = join(LOOP_DIR, cfg.verify.findingsInboxFile.replace(/^\.loop\//, ""));
  writeFileSync(
    p,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), confirmed, inconclusive },
      null,
      2
    ) + "\n"
  );
  return p;
}

function appendDismissed(rows) {
  if (rows.length === 0) return null;
  const p = join(LOOP_DIR, "dismissed-findings.md");
  let body = existsSync(p) ? readFileSync(p, "utf8") : "# Dismissed findings\n\n| Date (UTC) | Job | Finding | Why dismissed (independent check) |\n|---|---|---|---|\n";
  body = body.replace(/\|\s*_\(none yet\)_\s*\|.*\n?/g, "");
  const date = new Date().toISOString().slice(0, 16).replace("T", " ");
  for (const r of rows) {
    const finding = String(r.label).replace(/\|/g, "/");
    const why = String(r.reason).replace(/\|/g, "/").replace(/\n/g, " ");
    body += `| ${date} | ${r.job} | ${finding} | ${why} |\n`;
  }
  writeFileSync(p, body);
  return p;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  assertCanProceed(); // respect STOP / PAUSE
  const cfg = loadConfig();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.");
    console.error("Run: node --env-file=apps/web/.env.local scripts/_loop/verify-findings.mjs");
    process.exit(1);
  }
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const confirmed = [];
  const dismissed = [];
  const inconclusive = [];

  for (const job of cfg.verify.monitoredJobs) {
    const { data, error } = await supabase
      .from("ops_reports")
      .select("job, run_at, summary, alerts_count, ok")
      .eq("job", job)
      .gt("alerts_count", 0)
      .order("run_at", { ascending: false })
      .limit(1);
    if (error) {
      console.error(`  [${job}] ops_reports read failed: ${error.message}`);
      continue;
    }
    const row = data?.[0];
    if (!row) {
      console.log(`  [${job}] no alertable rows — clean.`);
      continue;
    }
    const findings = extractFindings(job, row.summary);
    if (findings.length === 0) {
      console.log(`  [${job}] row has alerts_count=${row.alerts_count} but no parseable findings — routing to human.`);
      inconclusive.push({ job, label: `alerts_count=${row.alerts_count}`, reason: "alert present but findings not parseable", run_at: row.run_at });
      continue;
    }
    console.log(`  [${job}] verifying ${findings.length} finding(s) from ${row.run_at} ...`);
    for (const f of findings) {
      const v = await verifyOne(job, f, { supabase, test: null });
      const rec = { job, label: f._label, reason: v.reason, finding: f, run_at: row.run_at };
      if (v.verdict === "confirmed") {
        confirmed.push(rec);
        console.log(`    ✔ CONFIRMED  ${f._label} — ${v.reason}`);
      } else if (v.verdict === "dismissed") {
        dismissed.push(rec);
        console.log(`    ✗ dismissed  ${f._label} — ${v.reason}`);
      } else {
        inconclusive.push(rec);
        console.log(`    ? inconclusive ${f._label} — ${v.reason}`);
      }
    }
  }

  const inboxPath = writeInbox(confirmed, inconclusive);
  const dismPath = appendDismissed(dismissed);

  console.log(`\nVERIFY SUMMARY — ${confirmed.length} confirmed · ${dismissed.length} dismissed · ${inconclusive.length} inconclusive`);
  console.log(`  fix queue   : ${inboxPath}`);
  if (dismPath) console.log(`  dismissed   : ${dismPath}`);
  if (confirmed.length === 0 && inconclusive.length === 0) console.log(`  → nothing real to act on. (Audits were clean or all alerts were false positives.)`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Self-test — pure classifiers against fixtures (one true, one false, per job)
// ---------------------------------------------------------------------------

function selfTest() {
  let pass = 0,
    fail = 0;
  const ok = (name, cond) => {
    cond ? (pass++, console.log(`  ✓ ${name}`)) : (fail++, console.error(`  ✗ ${name}`));
  };
  console.log("verify-findings.mjs self-test (pure classifiers)\n");

  // --- cache-headers ---
  // FALSE POSITIVE: transient cold-start MISS that's now cacheable
  ok(
    "cache: transient cold-start -> dismissed",
    classifyCacheHeader(
      { url: "/x", violation: "persistent_miss" },
      { reachable: true, http: 200, cc: "public, max-age=0, must-revalidate", vc: ["MISS", "HIT", "HIT"] }
    ).verdict === "dismissed"
  );
  // TRUE POSITIVE: still dynamic header across the re-probe
  ok(
    "cache: real dynamic header -> confirmed",
    classifyCacheHeader(
      { url: "/x", violation: "dynamic_header" },
      { reachable: true, http: 200, cc: "private, no-store", vc: ["MISS", "MISS", "MISS"] }
    ).verdict === "confirmed"
  );
  // FALSE POSITIVE: STALE = edge has a cached copy (stale-while-revalidate)
  ok(
    "cache: STALE (healthy ISR) -> dismissed",
    classifyCacheHeader(
      { url: "/x", violation: "persistent_miss" },
      { reachable: true, http: 200, cc: "public, max-age=0, must-revalidate", vc: ["STALE", "STALE", "STALE"] }
    ).verdict === "dismissed"
  );
  // TRUE POSITIVE: 5xx
  ok("cache: 5xx -> confirmed", classifyCacheHeader({ url: "/x" }, { reachable: true, http: 503, cc: "", vc: ["MISS"] }).verdict === "confirmed");
  // FIREWALL: can't tell -> inconclusive (never false-confirm)
  ok("cache: firewall block -> inconclusive", classifyCacheHeader({ url: "/x" }, { reachable: false }).verdict === "inconclusive");

  // --- bot-crawl-rate ---
  // FALSE POSITIVE: launch burst-decay (the documented /festivals 8->77->15 pattern, generalized)
  ok(
    "bot: launch burst-decay -> dismissed",
    classifyBotCrawl({ bot: "Googlebot", family: "festivals" }, { current: 60, prior: 200, priorPrior: 55 }).verdict === "dismissed"
  );
  // TRUE POSITIVE: sustained collapse (baseline steady, then current craters)
  ok(
    "bot: sustained collapse -> confirmed",
    classifyBotCrawl({ bot: "Googlebot", family: "destination/month" }, { current: 30, prior: 200, priorPrior: 210 }).verdict === "confirmed"
  );
  // FALSE POSITIVE: drop already gone at verify time
  ok(
    "bot: drop recovered -> dismissed",
    classifyBotCrawl({ bot: "Googlebot", family: "state" }, { current: 190, prior: 200, priorPrior: 200 }).verdict === "dismissed"
  );
  // small sample -> inconclusive
  ok(
    "bot: tiny sample -> inconclusive",
    classifyBotCrawl({ bot: "Bingbot", family: "vs/pair" }, { current: 2, prior: 10, priorPrior: 9 }).verdict === "inconclusive"
  );

  console.log(`\n${fail === 0 ? "ALL GREEN" : "FAILURES"} — ${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
}

if (SELF_TEST) selfTest();
else main().catch((e) => {
  if (e.code === "LOOP_HALTED" || e.code === "LOOP_PAUSED") {
    console.log(e.message);
    process.exit(0);
  }
  console.error(e);
  process.exit(1);
});
