#!/usr/bin/env node
/**
 * Sprint 8 long-tail closure — extend the 25 sub-400-char trek descriptions
 * with a 2-3 sentence editorial close. Citation-first: composer reads existing
 * highlights, warnings, parent destination + region from the row, then asks
 * Claude Haiku for an additive paragraph that makes the description complete
 * without duplicating what the template already states.
 */
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import { config } from "dotenv";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are a travel editor at NakshIQ writing supplementary trek
descriptions in a confident-but-honest voice (think FT Weekend India, Monocle).
Sentence case. No influencer words ("amazing", "must-visit", "breathtaking",
"hidden gem", "ultimate"). No filler. Inline numerics OK ("8 km", "700 m",
"April-June"). Citation-first — only state facts already in the input.

You will be given an existing trek description (which uses a template) plus
the trek's structured data (highlights, warnings, parent destination, state,
difficulty, season). Your job is to add 2-3 sentences (roughly 80-150 chars)
that complete the description with editorial context — what makes the trek
distinct, what to pair it with, the seasonal hook, or who it's right for.

Do NOT duplicate the template's content. Do NOT repeat facts already stated.
Output ONLY the supplementary sentences (no preamble, no markdown).`;

const { data: treks } = await supabase
  .from("treks")
  .select("*, destinations(name, state:states(name))")
  .order("name");

const thin = (treks ?? []).filter(t => !t.description || t.description.length < 400);
console.log(`Thin treks to extend: ${thin.length}`);

let updated = 0;
const errors = [];

for (const t of thin) {
  const stateName = t.destinations?.state?.name ?? "?";
  const destName = t.destinations?.name ?? "?";

  const userMessage = `Add a 2-3 sentence editorial close (80-150 chars) to this trek description.

Trek: ${t.name}
Parent destination: ${destName}, ${stateName}
Difficulty: ${t.difficulty} · ${t.duration_days} day(s) · ${t.distance_km} km · ${t.max_altitude_m} m
Highlights: ${(t.highlights ?? []).join("; ")}
Warnings: ${(t.warnings ?? []).join("; ")}

Existing description:
"${t.description}"

Add 2-3 sentences that bring the description to ~500-550 chars total. Output ONLY the new sentences (will be appended).`;

  let extension;
  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: SYSTEM,
      messages: [{ role: "user", content: userMessage }],
    });
    extension = response.content[0]?.type === "text" ? response.content[0].text.trim() : "";
  } catch (err) {
    errors.push({ id: t.id, error: err.message });
    continue;
  }

  if (!extension) continue;

  // Strip any leading/trailing quotes Claude may have added
  const cleaned = extension.replace(/^["'`]+|["'`]+$/g, "").trim();
  const newDescription = `${t.description.trim()} ${cleaned}`;

  const { error } = await supabase
    .from("treks")
    .update({ description: newDescription })
    .eq("id", t.id);

  if (error) {
    errors.push({ id: t.id, error: error.message });
    continue;
  }

  console.log(`  ✓ ${t.id.padEnd(38)} ${String(t.description.length).padStart(3)} → ${newDescription.length} ch`);
  updated++;
}

console.log(`\nExtended: ${updated}/${thin.length}`);
if (errors.length) console.log(`Errors:`, errors);
