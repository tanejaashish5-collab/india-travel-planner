#!/usr/bin/env node
/**
 * propose-fixes.mjs — Phase 2 of the guard-railed loop: DIAGNOSE + DRAFT (propose-only).
 *
 * Reads the CONFIRMED findings from .loop/findings-inbox.json (produced by Phase 1's
 * verify-findings.mjs), attaches a root-cause diagnosis + remediation runbook + located
 * evidence per finding, risk-classifies each, and renders them as numbered, human-
 * readable proposals into .loop/pending-actions.md + an iMessage-ready .loop/outbox.txt.
 *
 * It PROPOSES ONLY. It never edits app code, commits, or deploys — that's the human
 * approval gate (guardrail 2). The actual patch-drafting + the iMessage send + applying
 * approved fixes are the Claude-orchestrated steps documented in .loop/PHASE2.md.
 *
 * Run live :   node scripts/_loop/propose-fixes.mjs
 * Self-test:   node scripts/_loop/propose-fixes.mjs --self-test
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { ROOT, LOOP_DIR, loadConfig, classifyAction, assertCanProceed } from "./guard.mjs";

const SELF_TEST = process.argv.includes("--self-test");

// ---------------------------------------------------------------------------
// Evidence locator — bounded recursive search of apps/web/src/app for the
// route file(s) that back a URL family. Deterministic; best-effort.
// ---------------------------------------------------------------------------

function familySegments(family) {
  return family
    .replace(/[()]/g, "")
    .split("/")
    .map((s) => s.split(" ")[0].trim().toLowerCase())
    .filter(Boolean);
}

function locateRouteFiles(family, limit = 3) {
  const appDir = join(ROOT, "apps", "web", "src", "app");
  if (!existsSync(appDir)) return [];
  const segs = familySegments(family);
  const hits = [];
  const walk = (dir, depth) => {
    if (depth > 8 || hits.length >= limit) return;
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const e of entries) {
      if (hits.length >= limit) return;
      const p = join(dir, e);
      let st;
      try {
        st = statSync(p);
      } catch {
        continue;
      }
      if (st.isDirectory()) {
        if (e === "node_modules" || e === ".next") continue;
        walk(p, depth + 1);
      } else if (/^(page|route)\.(tsx?|jsx?)$/.test(e)) {
        const rel = p.slice(ROOT.length + 1).toLowerCase();
        if (segs.every((s) => rel.includes(s))) hits.push(p.slice(ROOT.length + 1));
      }
    }
  };
  walk(appDir, 0);
  return hits;
}

// ---------------------------------------------------------------------------
// Runbook registry — per job type: diagnosis + remediation + risk
// ---------------------------------------------------------------------------

const RUNBOOKS = {
  "audit-cache-headers": (f, locate) => {
    const family = f.finding?.family || "(unknown)";
    const cc = f.finding?.cache_control || "(empty)";
    const candidates = locate ? locateRouteFiles(family) : [];
    return {
      diagnosis:
        `Route family "${family}" served uncacheable headers (cache-control="${cc}"). ` +
        `Most likely a dynamic-segment page missing generateStaticParams, or a page/layout reading ` +
        `cookies()/headers()/force-dynamic that forces per-request rendering. Same signature as the ` +
        `2026-05-05 ISR regression.`,
      remediation: {
        summary: `Restore static/ISR rendering for the "${family}" route.`,
        steps: [
          `Open the route handler${candidates.length ? ` (candidate: ${candidates[0]})` : ""}.`,
          `grep for cookies() / headers() / export const dynamic = "force-dynamic" / no-store.`,
          `Add generateStaticParams (or remove the dynamic read); keep revalidate per the cost-cut ISR windows.`,
          `Re-run the cache canary to confirm public + HIT before merge.`,
        ],
      },
      evidence: {
        description: candidates.length
          ? `Candidate route file(s) located:`
          : `No route file auto-located for "${family}" — Claude must grep apps/web/src/app.`,
        candidates,
      },
      riskClass: "git-commit", // code edit -> commit -> deploy
      autoFixable: false, // edits to apps/web/src never auto-merge (Phase 3 hard rule)
    };
  },

  "audit-bot-crawl-rate": (f) => {
    const family = f.finding?.family || "(unknown)";
    const detail = f.finding?.detail || "";
    return {
      diagnosis:
        `Sustained >50% WoW crawl-rate decline on /${family} (verifier already ruled out launch burst-decay). ` +
        `Likely an ISR/render regression deprioritizing the family, or a robots/sitemap change. ${detail}`,
      remediation: {
        summary: `Investigate crawl health on /${family} (no code change without a confirmed cause).`,
        steps: [
          `Check the cache canary + /admin/bot-traffic for the "${family}" family.`,
          `Confirm the family is present in the sitemap chunks and not noindex'd.`,
          `Cross-check GSC indexing for the family; only patch if a render/robots cause is confirmed.`,
        ],
      },
      evidence: {
        description: `Dashboards: /admin/bot-traffic · cache canary (M1) · sitemap.`,
        candidates: [],
      },
      riskClass: "investigation",
      autoFixable: false,
    };
  },
};

function genericRunbook(f) {
  return {
    diagnosis: f.reason || f.finding?.detail || `Confirmed finding on ${f.job}.`,
    remediation: {
      summary: `Manual investigation required for ${f.job}.`,
      steps: [`Review the finding in .loop/findings-inbox.json`, `Diagnose root cause`, `Draft a fix for approval`],
    },
    evidence: { description: "—", candidates: [] },
    riskClass: "investigation",
    autoFixable: false,
  };
}

// ---------------------------------------------------------------------------
// Build proposals (mostly pure; evidence locate is injectable for tests)
// ---------------------------------------------------------------------------

export function buildProposals(confirmed, { locate = true, cfg = loadConfig() } = {}) {
  return (confirmed || []).map((f, i) => {
    const rb = (RUNBOOKS[f.job] || genericRunbook)(f, locate);
    const klass = classifyAction(rb.riskClass, cfg);
    const approval = klass === "noGate" ? "auto (safe)" : klass === "hardBlocked" ? "BLOCKED" : "requires your approval";
    return {
      n: i + 1,
      job: f.job,
      label: f.label,
      diagnosis: rb.diagnosis,
      remediation: rb.remediation,
      evidence: rb.evidence,
      riskClass: rb.riskClass,
      approval,
      autoFixable: rb.autoFixable,
      finding: f.finding,
    };
  });
}

// ---------------------------------------------------------------------------
// Renderers
// ---------------------------------------------------------------------------

function badge(approval) {
  return approval === "requires your approval" ? "🟡 needs OK" : approval === "BLOCKED" ? "⛔ blocked" : "🟢 safe";
}

export function renderPendingActions(proposals) {
  const lines = [];
  lines.push(`# Pending actions — awaiting your approval`);
  lines.push("");
  lines.push(`> The loop wants to do the following. Nothing here runs until you say **go**.`);
  lines.push(`> Reply on iMessage: \`go\` (all) · \`go 1 3\` (those numbers) · \`skip\` (none).`);
  lines.push("");
  if (proposals.length === 0) {
    lines.push(`_(empty — nothing pending)_`);
    return lines.join("\n") + "\n";
  }
  for (const p of proposals) {
    lines.push(`## ${p.n}. [${p.job}] ${p.label} — ${badge(p.approval)}`);
    lines.push("");
    lines.push(`**Diagnosis:** ${p.diagnosis}`);
    lines.push("");
    lines.push(`**Proposed fix:** ${p.remediation.summary}`);
    for (const s of p.remediation.steps) lines.push(`- ${s}`);
    lines.push("");
    lines.push(`**Evidence:** ${p.evidence.description}`);
    for (const c of p.evidence.candidates || []) lines.push(`  - \`${c}\``);
    lines.push("");
    lines.push(`**Risk:** ${p.riskClass} · ${p.approval}`);
    lines.push(`**Approve just this one:** reply \`go ${p.n}\``);
    lines.push("");
    lines.push(`---`);
    lines.push("");
  }
  return lines.join("\n");
}

export function renderOutbox(proposals) {
  if (proposals.length === 0) return `NakshIQ loop: nothing needs your OK right now. ✅`;
  const lines = [`NakshIQ loop — ${proposals.length} fix(es) need your OK:`];
  for (const p of proposals) lines.push(`${p.n}. [${p.job.replace("audit-", "")}] ${p.label} — ${p.remediation.summary}`);
  lines.push(`Reply: "go" (all) · "go 1" (one) · "skip" (none). Details: .loop/pending-actions.md`);
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  assertCanProceed();
  const cfg = loadConfig();
  const inboxPath = join(LOOP_DIR, cfg.verify.findingsInboxFile.replace(/^\.loop\//, ""));
  if (!existsSync(inboxPath)) {
    console.log(`No inbox at ${inboxPath}. Run verify-findings.mjs first.`);
    process.exit(0);
  }
  const inbox = JSON.parse(readFileSync(inboxPath, "utf8"));
  const confirmed = inbox.confirmed || [];
  const inconclusive = inbox.inconclusive || [];

  const proposals = buildProposals(confirmed, { cfg });

  writeFileSync(join(LOOP_DIR, "proposals.json"), JSON.stringify({ generatedAt: new Date().toISOString(), proposals }, null, 2) + "\n");
  writeFileSync(join(LOOP_DIR, "pending-actions.md"), renderPendingActions(proposals));
  writeFileSync(join(LOOP_DIR, "outbox.txt"), renderOutbox(proposals) + "\n");

  console.log(`Phase 2 propose — ${proposals.length} proposal(s) from ${confirmed.length} confirmed finding(s).`);
  if (inconclusive.length) console.log(`  (${inconclusive.length} inconclusive finding(s) left for human investigation — not proposed.)`);
  console.log(`  pending-actions: ${join(LOOP_DIR, "pending-actions.md")}`);
  console.log(`  iMessage outbox: ${join(LOOP_DIR, "outbox.txt")}`);
  if (proposals.length) {
    console.log(`\n--- iMessage preview ---\n${renderOutbox(proposals)}`);
    console.log(`\nNEXT (Claude-orchestrated, see .loop/PHASE2.md): draft the concrete patch for each code-fixable proposal, send the outbox via iMessage, then STOP for approval.`);
  }
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Self-test — pure: fixtures -> proposals -> render assertions
// ---------------------------------------------------------------------------

function selfTest() {
  let pass = 0,
    fail = 0;
  const ok = (n, c) => (c ? (pass++, console.log(`  ✓ ${n}`)) : (fail++, console.error(`  ✗ ${n}`)));
  console.log("propose-fixes.mjs self-test\n");

  const confirmed = [
    {
      job: "audit-cache-headers",
      label: "https://www.nakshiq.com/en/explore/state/himachal-pradesh",
      reason: "still uncacheable",
      finding: { family: "explore/state", cache_control: "private, no-store", violation: "dynamic_header" },
    },
    {
      job: "audit-bot-crawl-rate",
      label: "Googlebot /destination/month",
      reason: "sustained collapse",
      finding: { bot: "Googlebot", family: "destination/month", detail: "210→200→30" },
    },
    { job: "audit-unknown-future", label: "mystery", reason: "something", finding: {} },
  ];

  const proposals = buildProposals(confirmed, { locate: false });
  ok("builds one proposal per confirmed finding", proposals.length === 3);
  ok("cache proposal has ISR diagnosis", /generateStaticParams|ISR/.test(proposals[0].diagnosis));
  ok("cache proposal requires approval (code edit)", proposals[0].approval === "requires your approval");
  ok("cache proposal is not auto-fixable", proposals[0].autoFixable === false);
  ok("bot proposal is investigation-class", proposals[1].riskClass === "investigation");
  ok("unknown job falls back to generic runbook", /Manual investigation/.test(proposals[2].remediation.summary));

  const md = renderPendingActions(proposals);
  ok("pending-actions renders numbered items", /## 1\. \[audit-cache-headers\]/.test(md));
  ok("pending-actions has per-item approve hint", /reply `go 1`/.test(md));
  ok("pending-actions has the global go/skip header", /go` \(all\)/.test(md));

  const out = renderOutbox(proposals);
  ok("outbox lists all proposals", /3 fix\(es\) need your OK/.test(out));
  ok("outbox has reply instructions", /Reply: "go"/.test(out));
  ok("empty outbox is friendly", /nothing needs your OK/.test(renderOutbox([])));

  console.log(`\n${fail === 0 ? "ALL GREEN" : "FAILURES"} — ${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
}

if (SELF_TEST) selfTest();
else {
  try {
    main();
  } catch (e) {
    if (e.code === "LOOP_HALTED" || e.code === "LOOP_PAUSED") {
      console.log(e.message);
      process.exit(0);
    }
    console.error(e);
    process.exit(1);
  }
}
