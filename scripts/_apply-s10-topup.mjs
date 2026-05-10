#!/usr/bin/env node
// S10 — gems-only across 3 files.
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync, existsSync } from "fs";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const gemFiles = [
  "data/research/s10-hp-gems-2026-05-10.json",
  "data/research/s10-uk-east-gems-2026-05-10.json",
  "data/research/s10-uk-west-gems-2026-05-10.json",
];

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

const gems = gemFiles.flatMap((p) =>
  existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : []
).map(transformGem);
console.log(`gems: ${gems.length}`);
const { error } = await supabase.from("hidden_gems").upsert(gems, { onConflict: "id" });
if (error) { console.error(error); process.exit(1); }
console.log(`  upserted ${gems.length} hidden_gems\ndone.`);
