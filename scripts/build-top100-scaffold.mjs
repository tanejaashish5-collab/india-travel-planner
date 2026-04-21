#!/usr/bin/env node
/**
 * Rank top-100 destinations by avg(destination_months.score) DESC, then by
 * count of score=5 months. Fetch each one's current tagline + why_special
 * and classify KEEP vs REWRITE for the voice-uniformity sprint.
 *
 * Output:
 *   data/voice-rewrites/top100-voice.json
 *
 * Classification:
 *   REWRITE if: contains banned word | tagline<30 chars | why_special<120 chars
 *   KEEP otherwise
 *
 * Usage:
 *   node scripts/build-top100-scaffold.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { mkdirSync, writeFileSync } from "fs";

config({ path: "apps/web/.env.local" });

const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "must visit",
  "bucket list", "breathtaking", "magical", "incredible", "authentic",
  "curated", "elevated", "immersive", "paradise", "pristine",
  "charming", "nestled",
];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// 1. rank destinations by avg score + five-month count
const { data: months } = await supabase
  .from("destination_months")
  .select("destination_id, score");

const byDest = new Map();
for (const m of months ?? []) {
  if (!byDest.has(m.destination_id)) byDest.set(m.destination_id, { total: 0, n: 0, five: 0 });
  const s = byDest.get(m.destination_id);
  s.total += m.score ?? 0;
  s.n += 1;
  if ((m.score ?? 0) === 5) s.five += 1;
}

const ranking = [...byDest.entries()]
  .map(([id, s]) => ({ id, avg: s.n ? s.total / s.n : 0, five: s.five }))
  .sort((a, b) => b.avg - a.avg || b.five - a.five || a.id.localeCompare(b.id))
  .slice(0, 100);

// 2. fetch tagline + why_special for the top-100
const ids = ranking.map((r) => r.id);
const { data: dests } = await supabase
  .from("destinations")
  .select("id, name, tagline, why_special, state:states(name)")
  .in("id", ids);

const byId = new Map((dests ?? []).map((d) => [d.id, d]));

// 3. classify
const entries = [];
for (const r of ranking) {
  const d = byId.get(r.id);
  if (!d) continue;
  const tagline = d.tagline ?? "";
  const why = d.why_special ?? "";
  const combined = `${tagline} ${why}`.toLowerCase();
  const bannedHits = BANNED.filter((w) => combined.includes(w));
  const taglineThin = tagline.length < 30;
  const whyThin = why.length < 120;
  const needsRewrite = bannedHits.length > 0 || taglineThin || whyThin;
  const reasons = [];
  if (bannedHits.length) reasons.push(`banned: ${bannedHits.join(", ")}`);
  if (taglineThin) reasons.push(`tagline thin (${tagline.length} chars)`);
  if (whyThin) reasons.push(`why_special thin (${why.length} chars)`);

  const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;

  entries.push({
    id: d.id,
    name: d.name,
    state: stateName,
    avg_score: Number(r.avg.toFixed(2)),
    five_months: r.five,
    status: needsRewrite ? "REWRITE" : "KEEP",
    reason: needsRewrite ? reasons.join("; ") : "hero voice already",
    old_tagline: tagline,
    old_why_special: why,
    new_tagline: needsRewrite ? "" : null,
    new_why_special: needsRewrite ? "" : null,
  });
}

const rewriteCount = entries.filter((e) => e.status === "REWRITE").length;
const keepCount = entries.filter((e) => e.status === "KEEP").length;

mkdirSync("data/voice-rewrites", { recursive: true });
writeFileSync("data/voice-rewrites/top100-voice.json", JSON.stringify(entries, null, 2));

console.log(`Top-100 scaffold written: data/voice-rewrites/top100-voice.json`);
console.log(`  REWRITE: ${rewriteCount}`);
console.log(`  KEEP:    ${keepCount}`);
console.log(`\nNext: Claude fills new_tagline + new_why_special for REWRITE entries.`);
