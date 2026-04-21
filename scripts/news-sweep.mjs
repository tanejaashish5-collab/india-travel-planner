#!/usr/bin/env node
/**
 * news-sweep.mjs — report stale destinations + optional news probe.
 *
 * What it does by default: fetches destinations where content_reviewed_at is
 * NULL or older than --stale-days (default 90), prints a tiered report that
 * the operator can use to drive a review sprint.
 *
 * With --probe-news, it additionally runs a web-search probe per destination
 * looking for "road closure", "flood", "landslide", "accident" hits from the
 * current or previous month. The probe is gated by flag because it calls out
 * to Brave/Google and costs quota. Runs sequentially with a 1s delay.
 *
 * With --commit-flags, rows get system-authored entries in user_suggestions
 * (status='triaged', message=news summary). Admin then triages in Supabase.
 *
 * Usage:
 *   node scripts/news-sweep.mjs                                  # bare stale report
 *   node scripts/news-sweep.mjs --stale-days 60                  # tighter threshold
 *   node scripts/news-sweep.mjs --limit 20 --probe-news          # probe news for top 20 stale
 *   node scripts/news-sweep.mjs --probe-news --commit-flags      # write admin suggestions
 *
 * Cadence: monthly. Sample output feeds the quarterly mark-reviewed sweep.
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

const STALE_DAYS = Number(flag("stale-days") ?? 90);
const LIMIT = flag("limit") ? Number(flag("limit")) : null;
const PROBE = args.includes("--probe-news");
const COMMIT = args.includes("--commit-flags");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const cutoff = new Date(Date.now() - STALE_DAYS * 86400000).toISOString();

// Fetch stale destinations
const { data: stale, error } = await supabase
  .from("destinations")
  .select("id, name, content_reviewed_at, state:states(name)")
  .or(`content_reviewed_at.is.null,content_reviewed_at.lt.${cutoff}`)
  .order("content_reviewed_at", { ascending: true, nullsFirst: true });

if (error) {
  console.error(`✗ fetch failed: ${error.message}`);
  process.exit(1);
}

const rows = LIMIT ? stale.slice(0, LIMIT) : stale;

// Tier the report
const neverReviewed = rows.filter((r) => !r.content_reviewed_at);
const reviewedStale = rows.filter((r) => r.content_reviewed_at);

console.log(`news-sweep · stale threshold ${STALE_DAYS} days · ${rows.length} of ${stale.length} destinations${LIMIT ? ` (limited to ${LIMIT})` : ""}\n`);

console.log(`Never reviewed: ${neverReviewed.length}`);
if (neverReviewed.length && neverReviewed.length <= 30) {
  for (const r of neverReviewed) {
    const state = Array.isArray(r.state) ? r.state[0]?.name : r.state?.name;
    console.log(`  • ${r.id.padEnd(30)} ${(state ?? "").padEnd(24)} (null)`);
  }
} else if (neverReviewed.length > 30) {
  console.log(`  (${neverReviewed.length} — first 30 below)`);
  for (const r of neverReviewed.slice(0, 30)) {
    const state = Array.isArray(r.state) ? r.state[0]?.name : r.state?.name;
    console.log(`  • ${r.id.padEnd(30)} ${(state ?? "").padEnd(24)} (null)`);
  }
}

console.log(`\nReviewed-but-stale: ${reviewedStale.length}`);
for (const r of reviewedStale.slice(0, 20)) {
  const state = Array.isArray(r.state) ? r.state[0]?.name : r.state?.name;
  const age = Math.floor((Date.now() - new Date(r.content_reviewed_at).getTime()) / 86400000);
  console.log(`  • ${r.id.padEnd(30)} ${(state ?? "").padEnd(24)} ${age}d old`);
}
if (reviewedStale.length > 20) console.log(`  (+${reviewedStale.length - 20} more)`);

// Optional news probe
if (!PROBE) {
  console.log(`\nTo run news probe: re-run with --probe-news --limit N (rate-limited sequential).`);
  process.exit(0);
}

console.log(`\nProbing news for ${rows.length} destinations (1s delay each)…`);
const FLAG_KEYWORDS = ["road closure", "flood", "landslide", "accident", "closed", "evacuation", "strike", "lockdown"];
const flagged = [];
for (const r of rows) {
  const query = `"${r.name}" 2026 road closure OR landslide OR flood`;
  // Use DuckDuckGo HTML endpoint (no key). We only check if the page contains flag keywords.
  try {
    const res = await fetch(`https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: { "User-Agent": "NakshIQ-news-sweep/1 (ops@nakshiq.com)" },
    });
    const text = (await res.text()).toLowerCase();
    const hits = FLAG_KEYWORDS.filter((k) => text.includes(k));
    if (hits.length >= 2) {
      flagged.push({ id: r.id, name: r.name, hits });
      process.stdout.write(`  ⚠ ${r.id} — ${hits.join(", ")}\n`);
    } else {
      process.stdout.write(`  · ${r.id}\n`);
    }
  } catch (e) {
    process.stdout.write(`  ? ${r.id} — probe failed (${e.message})\n`);
  }
  await new Promise((r) => setTimeout(r, 1000));
}

console.log(`\n${flagged.length} destinations flagged for review.`);

if (!COMMIT) {
  console.log(`\nTo write admin suggestions: re-run with --commit-flags.`);
  process.exit(0);
}

// Write system suggestions into user_suggestions
const suggestions = flagged.map((f) => ({
  target_table: "destinations",
  target_id: f.id,
  message: `[news-sweep] Possible news hit: ${f.hits.join(", ")}. Verify and mark-reviewed if content is still accurate.`,
  status: "triaged",
  admin_notes: "auto-generated by news-sweep.mjs",
}));

if (suggestions.length === 0) {
  console.log(`No flags to commit.`);
  process.exit(0);
}

const { error: insErr } = await supabase.from("user_suggestions").insert(suggestions);
if (insErr) {
  console.error(`✗ insert failed: ${insErr.message}`);
  process.exit(1);
}
console.log(`✓ Wrote ${suggestions.length} admin suggestions.`);
