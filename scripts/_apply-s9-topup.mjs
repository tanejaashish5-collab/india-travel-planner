#!/usr/bin/env node
// S9 — gems-only.
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync, existsSync } from "fs";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

function transformGem(g) {
  const isDbShape = g.why_go !== undefined && g.description === undefined;
  if (isDbShape) {
    return {
      id: g.id, name: g.name, near_destination_id: g.near_destination_id,
      why_go: g.why_go, why_unknown: g.why_unknown || null,
      tags: Array.isArray(g.tags) && g.tags.length ? g.tags : null,
      difficulty: g.difficulty || "easy",
      confidence_score: typeof g.confidence_score === "number" ? g.confidence_score : 4,
      distance_km: typeof g.distance_km === "number" ? g.distance_km : null,
      drive_time: g.drive_time || null,
    };
  }
  const tags = []; if (g.category) tags.push(g.category);
  const parts = []; if (g.description) parts.push(g.description);
  const practical = [];
  if (g.best_time) practical.push(`Best: ${g.best_time}.`);
  if (g.how_to_reach) practical.push(`Reach: ${g.how_to_reach}.`);
  if (g.tips) practical.push(`Tip: ${g.tips}.`);
  if (practical.length) parts.push(practical.join(" "));
  return {
    id: g.id, name: g.name, near_destination_id: g.near_destination_id,
    why_go: parts.join("\n\n"), why_unknown: g.why_hidden || null,
    tags: tags.length ? tags : null, difficulty: "easy", confidence_score: 4,
  };
}

const gems = JSON.parse(readFileSync("data/research/s9-gems-2026-05-09.json", "utf8")).map(transformGem);
console.log(`gems: ${gems.length}`);
const { error } = await supabase.from("hidden_gems").upsert(gems, { onConflict: "id" });
if (error) { console.error(error); process.exit(1); }
console.log(`  upserted ${gems.length} hidden_gems\ndone.`);
