#!/usr/bin/env node
/**
 * check-supabase-egress.mjs
 *
 * Weekly egress watchdog for the IT Lab Solutions / NakshIQ Supabase org.
 * Added 2026-05-23 after the free-tier 5.5 GB cap blowout (memory:
 * session_2026_05_23_supabase_egress_freeze_and_isr_recovery.md).
 *
 * Why this exists:
 *   The Supabase dashboard is the canonical source of truth, but it's easy to
 *   forget to check it. This script writes a JSON snapshot to data/
 *   supabase-egress/{YYYY-MM-DD}.json so a quick `ls data/supabase-egress/`
 *   + tail of the latest file tells you where you are in the billing cycle.
 *
 * Setup:
 *   1. Create a Personal Access Token at
 *      https://supabase.com/dashboard/account/tokens
 *      (scope: read access is enough; this script never writes).
 *   2. Add to .env or shell: SUPABASE_ACCESS_TOKEN=sbp_xxx...
 *   3. Run: node scripts/check-supabase-egress.mjs
 *
 * Output:
 *   - data/supabase-egress/{date}.json — full payload + computed deltas
 *   - stdout: RED / YELLOW / GREEN status, top egress drivers if available
 *
 * Exit codes:
 *   0 — GREEN (under 4 GB/mo on free, or under 70% of plan cap)
 *   1 — YELLOW (over 70% of cap; investigate this week)
 *   2 — RED (over 90% of cap; action required NOW)
 *
 * Pair with a cron entry (optional, requires user crontab access):
 *   0 9 * * 1 cd /path/to/repo && node scripts/check-supabase-egress.mjs >> ~/supabase-egress.log 2>&1
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const OUT_DIR = join(REPO_ROOT, "data", "supabase-egress");

const PROJECT_REF = "dudzsdzfvikjjhurxrgc"; // NakshIQ project
const ORG_SLUG = "tpqjiacygajkhajppbbc";    // IT Lab Solutions
const FREE_TIER_EGRESS_GB = 5.5;
const FREE_TIER_DB_MB = 500;

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
if (!TOKEN) {
  console.error("✗ SUPABASE_ACCESS_TOKEN not set.");
  console.error("  Create one at https://supabase.com/dashboard/account/tokens");
  console.error("  Then: export SUPABASE_ACCESS_TOKEN=sbp_...");
  process.exit(2);
}

const API = "https://api.supabase.com/v1";

async function fetchJSON(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: "application/json" },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`${path} -> ${res.status} ${res.statusText}\n${body.slice(0, 200)}`);
  }
  return res.json();
}

async function main() {
  // The Supabase Management API has shifted a few times — try the v1 usage
  // endpoint first, then fall back to the older variant. If both fail, dump
  // the dashboard URL so the user has a one-click fallback.
  let usage = null;
  let endpointUsed = null;
  const candidates = [
    `/projects/${PROJECT_REF}/usage`,
    `/organizations/${ORG_SLUG}/billing/usage`,
    `/organizations/${ORG_SLUG}/usage`,
  ];
  for (const path of candidates) {
    try {
      usage = await fetchJSON(path);
      endpointUsed = path;
      break;
    } catch (e) {
      // try next
    }
  }

  if (!usage) {
    console.error("✗ All usage endpoints returned errors.");
    console.error(`  Manual check: https://supabase.com/dashboard/project/${PROJECT_REF}/settings/billing/usage`);
    console.error("  If you see this repeatedly, the Management API surface moved — update `candidates` above.");
    process.exit(2);
  }

  // Best-effort field probing — the shape varies by endpoint and changes
  // without notice. We extract whatever looks like egress/db_size, and dump
  // the full payload so the JSON snapshot stays useful even if the parser
  // misses a metric.
  const egressBytes = pluck(usage, ["egress", "egress_bytes", "database_egress", "db_egress_bytes"]);
  const dbBytes = pluck(usage, ["db_size", "database_size", "db_size_bytes"]);

  const snapshot = {
    timestamp: new Date().toISOString(),
    endpoint: endpointUsed,
    project_ref: PROJECT_REF,
    org_slug: ORG_SLUG,
    parsed: {
      egress_bytes: egressBytes,
      egress_gb: egressBytes != null ? +(egressBytes / 1e9).toFixed(3) : null,
      db_bytes: dbBytes,
      db_mb: dbBytes != null ? +(dbBytes / 1e6).toFixed(1) : null,
    },
    raw: usage,
  };

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const outPath = join(OUT_DIR, `${today}.json`);
  writeFileSync(outPath, JSON.stringify(snapshot, null, 2));

  // Delta vs previous snapshot
  const previousDelta = computePreviousDelta(snapshot);

  console.log(`✓ Saved: ${outPath.replace(REPO_ROOT + "/", "")}`);
  console.log(`  Endpoint: ${endpointUsed}`);
  if (snapshot.parsed.egress_gb != null) {
    console.log(`  Egress this cycle: ${snapshot.parsed.egress_gb} GB`);
  } else {
    console.log(`  Egress: (couldn't parse — see raw JSON)`);
  }
  if (snapshot.parsed.db_mb != null) {
    console.log(`  DB size: ${snapshot.parsed.db_mb} MB / ${FREE_TIER_DB_MB} MB free-tier cap`);
  }
  if (previousDelta) {
    console.log(`  Delta since last snapshot (${previousDelta.priorDate}): +${previousDelta.egressDeltaGb} GB egress`);
  }

  // Status decision (egress only — DB size is rarely the binding constraint here)
  const gb = snapshot.parsed.egress_gb;
  let exitCode = 0;
  if (gb != null) {
    if (gb >= 0.9 * FREE_TIER_EGRESS_GB) {
      console.log(`\n🔴 RED — at ${(100 * gb / FREE_TIER_EGRESS_GB).toFixed(0)}% of free-tier cap. Action NOW: stay on Pro, or stop heavy scripts.`);
      exitCode = 2;
    } else if (gb >= 0.7 * FREE_TIER_EGRESS_GB) {
      console.log(`\n🟡 YELLOW — at ${(100 * gb / FREE_TIER_EGRESS_GB).toFixed(0)}% of free-tier cap. Investigate top drivers this week.`);
      exitCode = 1;
    } else {
      console.log(`\n🟢 GREEN — at ${(100 * gb / FREE_TIER_EGRESS_GB).toFixed(0)}% of free-tier cap. Free-tier downgrade is safe at this trajectory.`);
    }
  } else {
    console.log(`\n⚠️  Couldn't parse egress from response — check the raw JSON snapshot.`);
    exitCode = 1;
  }
  process.exit(exitCode);
}

function pluck(obj, keys) {
  // Recursive shallow search — Supabase's usage payload nests values in shifting paths.
  if (obj == null || typeof obj !== "object") return null;
  for (const k of keys) {
    if (obj[k] != null && typeof obj[k] !== "object") return Number(obj[k]);
  }
  for (const v of Object.values(obj)) {
    if (typeof v === "object") {
      const hit = pluck(v, keys);
      if (hit != null) return hit;
    }
  }
  return null;
}

function computePreviousDelta(current) {
  if (current.parsed.egress_gb == null) return null;
  try {
    const files = readdirSync(OUT_DIR).filter((f) => f.endsWith(".json")).sort();
    const today = new Date().toISOString().slice(0, 10);
    const prior = files.filter((f) => !f.startsWith(today)).pop();
    if (!prior) return null;
    const priorData = JSON.parse(readFileSync(join(OUT_DIR, prior), "utf8"));
    if (priorData?.parsed?.egress_gb == null) return null;
    return {
      priorDate: prior.replace(".json", ""),
      egressDeltaGb: +(current.parsed.egress_gb - priorData.parsed.egress_gb).toFixed(3),
    };
  } catch {
    return null;
  }
}

main().catch((e) => {
  console.error("✗ Unexpected error:", e?.message ?? e);
  process.exit(2);
});
