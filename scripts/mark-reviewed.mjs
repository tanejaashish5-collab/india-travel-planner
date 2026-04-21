#!/usr/bin/env node
/**
 * mark-reviewed.mjs — stamp content_reviewed_at = now() after a manual or
 * AI review cycle.
 *
 * Freshness decay discipline (from 2026-04-23 data-freshness mini-sprint):
 *   - Site UI shows "review pending" for rows where content_reviewed_at IS NULL.
 *   - After a human or pipeline verifies accuracy, stamp the row(s) here.
 *   - Recommended cadence: quarterly sweep over stale rows (>90 days).
 *
 * Usage:
 *   node scripts/mark-reviewed.mjs --dest kaza                         # dry
 *   node scripts/mark-reviewed.mjs --dest kaza --commit                # write
 *   node scripts/mark-reviewed.mjs --dest kaza,turtuk --commit
 *   node scripts/mark-reviewed.mjs --dest kaza --months 6,7,8 --commit  # months only
 *   node scripts/mark-reviewed.mjs --state himachal-pradesh --commit    # all dests in state
 *   node scripts/mark-reviewed.mjs --stale-only 180 --commit            # everything older than 180d
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
function flag(name, fallback = null) {
  const i = args.indexOf(`--${name}`);
  if (i < 0) return fallback;
  const next = args[i + 1];
  return !next || next.startsWith("--") ? true : next;
}

const COMMIT = args.includes("--commit");
const destArg = flag("dest");
const stateArg = flag("state");
const monthsArg = flag("months");
const staleOnly = flag("stale-only");
const months = monthsArg ? String(monthsArg).split(",").map(Number).filter(Boolean) : null;

if (!destArg && !stateArg && !staleOnly) {
  console.error("mark-reviewed.mjs — stamp content_reviewed_at = now()\n");
  console.error("Usage: --dest <ids> | --state <id> | --stale-only <days>");
  console.error("  Optional: --months 6,7,8");
  console.error("  Add --commit to write (default is dry).");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function resolveDestinationIds() {
  if (destArg) {
    return String(destArg).split(",").map((s) => s.trim()).filter(Boolean);
  }
  if (stateArg) {
    const { data, error } = await supabase
      .from("destinations")
      .select("id")
      .eq("state_id", stateArg);
    if (error) throw error;
    return (data ?? []).map((r) => r.id);
  }
  if (staleOnly) {
    const cutoff = new Date(Date.now() - Number(staleOnly) * 86400000).toISOString();
    const { data, error } = await supabase
      .from("destinations")
      .select("id")
      .or(`content_reviewed_at.is.null,content_reviewed_at.lt.${cutoff}`);
    if (error) throw error;
    return (data ?? []).map((r) => r.id);
  }
  return [];
}

const destIds = await resolveDestinationIds();
console.log(`Scope: ${destIds.length} destinations${months ? `, months ${months.join(",")}` : ""}.`);
console.log(`Mode: ${COMMIT ? "COMMIT" : "DRY"}\n`);

if (!COMMIT) {
  console.log(`Would stamp content_reviewed_at on:`);
  console.log(`  - destinations: ${destIds.slice(0, 20).join(", ")}${destIds.length > 20 ? ` (+${destIds.length - 20} more)` : ""}`);
  if (months) console.log(`  - destination_months: same ids × months ${months.join(",")}`);
  else console.log(`  - destination_months: same ids × all 12 months`);
  console.log(`\nRe-run with --commit to write.\n`);
  process.exit(0);
}

const reviewedAt = new Date().toISOString();

// 1. destinations
const { error: destErr, count: destCount } = await supabase
  .from("destinations")
  .update({ content_reviewed_at: reviewedAt }, { count: "exact" })
  .in("id", destIds);
if (destErr) { console.error(`✗ destinations update: ${destErr.message}`); process.exit(1); }
console.log(`✓ destinations: ${destCount ?? destIds.length} stamped`);

// 2. destination_months
let monthsQuery = supabase
  .from("destination_months")
  .update({ content_reviewed_at: reviewedAt }, { count: "exact" })
  .in("destination_id", destIds);
if (months) monthsQuery = monthsQuery.in("month", months);
const { error: monthsErr, count: monthsCount } = await monthsQuery;
if (monthsErr) { console.error(`✗ destination_months update: ${monthsErr.message}`); process.exit(1); }
console.log(`✓ destination_months: ${monthsCount ?? "?"} stamped`);

console.log(`\nDone. Stamped at ${reviewedAt}.`);
