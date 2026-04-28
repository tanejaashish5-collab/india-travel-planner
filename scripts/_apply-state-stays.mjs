// Generic per-state stays-replacement applier.
// Usage: node scripts/_apply-state-stays.mjs <state-slug>
// Reads /tmp/replacements-<state-slug>.json with {task_a_results, task_b_results}.
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const stateSlug = process.argv[2];
if (!stateSlug) {
  console.error("Usage: node scripts/_apply-state-stays.mjs <state-slug>");
  process.exit(1);
}

const file = `/tmp/replacements-${stateSlug}.json`;
if (!existsSync(file)) {
  console.error(`File not found: ${file}`);
  process.exit(1);
}
const data = JSON.parse(readFileSync(file, "utf-8"));
const taskA = data.task_a_results ?? [];
const taskB = data.task_b_results ?? [];
console.log(`${file}: task_a=${taskA.length} task_b=${taskB.length}\n`);

const now = new Date().toISOString();

// === Task A: delete current row in slot, insert replacement (or leave null) ===
const inserts = [];
const nulls = [];
const taskADeletes = [];
for (const r of taskA) {
  taskADeletes.push({ destination_id: r.destination_id, slot: r.slot });
  if (!r.result) {
    nulls.push({ destination_id: r.destination_id, slot: r.slot });
    continue;
  }
  const conf = Math.max(0, Math.min(1, Number(r.result.confidence) || 0.75));
  const sources = Array.isArray(r.result.sources) ? r.result.sources : [];
  inserts.push({
    destination_id: r.destination_id,
    slot: r.slot,
    name: r.result.name,
    property_type: r.result.property_type,
    price_band: r.result.price_band,
    why_nakshiq: r.result.why_nakshiq,
    signature_experience: r.result.signature_experience ?? null,
    sources,
    confidence: conf,
    voice_flags: [],
    source: "manual",
    contact_only: false,
    contact_info: null,
    published: sources.length >= 2 && conf >= 0.6,
    refreshed_at: now,
  });
}

console.log(`Deleting ${taskADeletes.length} current rows in target slots…`);
let deleted = 0;
for (const d of taskADeletes) {
  const { error, count } = await s
    .from("destination_stay_picks")
    .delete({ count: "exact" })
    .eq("destination_id", d.destination_id)
    .eq("slot", d.slot);
  if (error) console.error(`  ✗ ${d.destination_id}/${d.slot}: ${error.message}`);
  else deleted += count ?? 0;
}
console.log(`  ✓ ${deleted} deleted`);

if (inserts.length) {
  console.log(`\nInserting ${inserts.length} replacements…`);
  const { data: ins, error } = await s
    .from("destination_stay_picks")
    .insert(inserts)
    .select("destination_id, slot, name");
  if (error) {
    console.error("Insert failed:", error);
    process.exit(1);
  }
  console.log(`  ✓ ${ins?.length ?? 0} inserted`);
  for (const r of ins ?? [])
    console.log(`    + ${r.destination_id.padEnd(22)} ${r.slot.padEnd(11)} ${r.name}`);
}

if (nulls.length) {
  console.log(`\nHonest-scarcity nulls (slot left empty): ${nulls.length}`);
  for (const n of nulls)
    console.log(`    · ${n.destination_id.padEnd(22)} ${n.slot.padEnd(11)} (left empty)`);
}

// === Task B ===
if (taskB.length) {
  console.log(`\nTask B: enriching ${taskB.length} KEEPs…`);
  let bUpdated = 0;
  let bDubious = 0;
  for (const r of taskB) {
    if (r.dubious_after_research) {
      const { error, count } = await s
        .from("destination_stay_picks")
        .delete({ count: "exact" })
        .eq("destination_id", r.destination_id)
        .eq("slot", r.slot);
      if (error) console.error(`  ✗ DELETE dubious ${r.destination_id}/${r.slot}: ${error.message}`);
      else {
        bDubious += count ?? 0;
        console.log(`    DELETE (dubious): ${r.destination_id}/${r.slot}`);
      }
      continue;
    }
    const sources = Array.isArray(r.sources) ? r.sources : [];
    const { error, count } = await s
      .from("destination_stay_picks")
      .update(
        {
          sources,
          voice_flags: [],
          source: "manual",
          refreshed_at: now,
          published: sources.length >= 2,
        },
        { count: "exact" }
      )
      .eq("destination_id", r.destination_id)
      .eq("slot", r.slot);
    if (error) console.error(`  ✗ ${r.destination_id}/${r.slot}: ${error.message}`);
    else bUpdated += count ?? 0;
  }
  console.log(`  ✓ Enriched: ${bUpdated} | DELETE (dubious): ${bDubious}`);
}

// === Final state ===
const { data: ds } = await s.from("destinations").select("id").eq("state_id", stateSlug);
const ids = ds.map((d) => d.id);
const { data: picks } = await s
  .from("destination_stay_picks")
  .select("destination_id, sources")
  .in("destination_id", ids);
const sourced = picks.filter((p) => Array.isArray(p.sources) && p.sources.length >= 2).length;
console.log(
  `\n=== Final ${stateSlug}: ${ds.length} dests · ${picks.length} picks · ${sourced} sourced (${
    picks.length ? Math.round((sourced / picks.length) * 100) : 0
  }%) ===`
);
