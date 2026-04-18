#!/usr/bin/env node
/**
 * Nightly refresher for destination_stay_picks.
 *
 * Picks N destinations with the stalest refreshed_at (or never-refreshed),
 * asks Claude Haiku to propose 4 stay picks per destination (experience,
 * value, location, xfactor), and upserts them. Low-confidence rows are
 * inserted with published=false for admin review.
 *
 * Usage:
 *   node scripts/refresh-stay-picks.mjs              # nightly cadence, 20 dests
 *   node scripts/refresh-stay-picks.mjs --limit 50   # backfill batch
 *   node scripts/refresh-stay-picks.mjs --ids id1,id2
 *   node scripts/refresh-stay-picks.mjs --top-50     # convenience for first-run
 *
 * Env (read from apps/web/.env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   ANTHROPIC_API_KEY
 */
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

// ===== env =====
const envContent = readFileSync("apps/web/.env.local", "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const ANTHROPIC_KEY = env.ANTHROPIC_API_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
if (!ANTHROPIC_KEY) {
  console.error("Missing ANTHROPIC_API_KEY");
  process.exit(1);
}

// ===== args =====
const args = process.argv.slice(2);
let limit = 20;
let explicitIds = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--limit") limit = parseInt(args[++i], 10);
  else if (args[i] === "--ids") explicitIds = (args[++i] || "").split(",").filter(Boolean);
  else if (args[i] === "--top-50") limit = 50;
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// ===== select candidates =====
let candidates = [];
if (explicitIds.length) {
  const { data } = await supabase
    .from("destinations")
    .select("id, name, state:states(name)")
    .in("id", explicitIds);
  candidates = data ?? [];
} else {
  // Destinations sorted by stalest refresh first, then by id alphabetically.
  const { data: allDests } = await supabase
    .from("destinations")
    .select("id, name, state:states(name)");
  const { data: existingPicks } = await supabase
    .from("destination_stay_picks")
    .select("destination_id, refreshed_at");
  const refreshMap = new Map();
  for (const p of existingPicks ?? []) {
    const t = new Date(p.refreshed_at).getTime();
    if (!refreshMap.has(p.destination_id) || refreshMap.get(p.destination_id) > t) {
      refreshMap.set(p.destination_id, t);
    }
  }
  candidates = (allDests ?? []).sort((a, b) => {
    const ta = refreshMap.has(a.id) ? refreshMap.get(a.id) : 0;
    const tb = refreshMap.has(b.id) ? refreshMap.get(b.id) : 0;
    return ta - tb;
  }).slice(0, limit);
}

console.log(`Refreshing stay picks for ${candidates.length} destinations...\n`);

// ===== prompt =====
function buildPrompt(dest, stateName) {
  return `You are NakshIQ's stay-picker. Propose 4 STAY OPTIONS for travellers coming to ${dest.name} (${stateName || "India"}), one per slot:

  1. EXPERIENCE pick — the iconic / signature / splurge-when-warranted choice. If this destination has a famous property (e.g., Taj Udaipur, Rambagh Palace, Oberoi Amarvilas), name it. If not, name the best property that defines the destination.
  2. VALUE pick — best experience-per-rupee. Homestays, heritage guesthouses, well-rated mid-tier.
  3. LOCATION pick — the stay whose location wins (walkable to main sights, near the railway, on the best beach).
  4. X-FACTOR pick — the specific, weird, memorable one. Treehouses, farmstays, houseboats, something travellers write home about.

VOICE RULES (mandatory):
- First-person plural ("We recommend")
- NEVER use: hidden gem, breathtaking, must-visit, bucket list, curated, elevated, paradise, pristine, magical, stunning
- Be specific. Named properties. Price honest.

For each slot return ALL of:
  name (the property name)
  propertyType (e.g. heritage_hotel, homestay, resort, houseboat, palace, boutique, treehouse)
  priceBand (e.g. "₹2–4k", "₹8–15k", "₹30k+"). Be honest.
  whyNakshiq (ONE specific sentence. No fluff.)
  confidence (0–1. Use <0.6 if you're guessing or the destination is too obscure to verify.)

If a slot genuinely has no real answer (destination is too remote for an X-factor stay), set confidence to 0 and leave the other fields as your best guess. We'll hide low-confidence slots.

Return ONLY valid JSON (no markdown, no code fences):
{
  "picks": [
    { "slot": "experience", "name": "...", "propertyType": "...", "priceBand": "...", "whyNakshiq": "...", "confidence": 0.9 },
    { "slot": "value", ... },
    { "slot": "location", ... },
    { "slot": "xfactor", ... }
  ]
}`;
}

// ===== call Claude =====
async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Anthropic ${res.status}: ${t.slice(0, 200)}`);
  }
  const j = await res.json();
  const text = j.content?.[0]?.text ?? "";
  try {
    return JSON.parse(text);
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(m[0]);
    throw new Error("Non-JSON response");
  }
}

// ===== process =====
const VALID_SLOTS = new Set(["experience", "value", "location", "xfactor"]);
let ok = 0;
let fail = 0;
let lowConf = 0;

for (const dest of candidates) {
  const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;
  process.stdout.write(`  ${dest.id.padEnd(30)} `);
  try {
    const result = await callClaude(buildPrompt(dest, stateName));
    const picks = Array.isArray(result?.picks) ? result.picks : [];
    if (picks.length === 0) {
      console.log("no picks returned");
      fail++;
      continue;
    }
    const rows = picks
      .filter((p) => VALID_SLOTS.has(p.slot) && typeof p.name === "string" && p.name.length > 0)
      .map((p) => ({
        destination_id: dest.id,
        slot: p.slot,
        name: String(p.name).slice(0, 200),
        property_type: p.propertyType ? String(p.propertyType).slice(0, 60) : null,
        price_band: p.priceBand ? String(p.priceBand).slice(0, 40) : null,
        why_nakshiq: String(p.whyNakshiq || "").slice(0, 400),
        source: "web_search",
        source_ref: null,
        confidence: Math.max(0, Math.min(1, Number(p.confidence) || 0.5)),
        published: (Number(p.confidence) || 0.5) >= 0.6,
        refreshed_at: new Date().toISOString(),
      }));
    if (rows.length === 0) {
      console.log("all picks invalid");
      fail++;
      continue;
    }
    const { error } = await supabase
      .from("destination_stay_picks")
      .upsert(rows, { onConflict: "destination_id,slot" });
    if (error) {
      console.log(`db error: ${error.message}`);
      fail++;
      continue;
    }
    const unpublished = rows.filter((r) => !r.published).length;
    console.log(`${rows.length} rows${unpublished ? ` (${unpublished} pending review)` : ""} ✓`);
    ok++;
    if (unpublished > 0) lowConf++;
    // gentle pacing
    await new Promise((r) => setTimeout(r, 250));
  } catch (err) {
    console.log(`failed: ${err.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} ok, ${fail} failed, ${lowConf} destinations had low-confidence slots pending admin review.`);
