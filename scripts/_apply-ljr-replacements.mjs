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

// Read both agent outputs (or whichever exist)
const files = [
  "/tmp/replacements-ladakh-jk.json",
  "/tmp/replacements-rajasthan.json",
];

let allTaskA = [];
let allTaskB = [];
for (const f of files) {
  if (!existsSync(f)) {
    console.log(`(skip) ${f} not found`);
    continue;
  }
  const data = JSON.parse(readFileSync(f, "utf-8"));
  console.log(
    `${f}: task_a=${(data.task_a_results ?? []).length} task_b=${(data.task_b_results ?? []).length}`
  );
  allTaskA.push(...(data.task_a_results ?? []));
  allTaskB.push(...(data.task_b_results ?? []));
}

console.log(
  `\nCombined: ${allTaskA.length} task_a (replace/null) + ${allTaskB.length} task_b (enrich)\n`
);

// === Task A: delete current row in slot, then upsert replacement (or leave null) ===
const now = new Date().toISOString();
const inserts = [];
const nulls = [];
const taskADeletes = [];

for (const r of allTaskA) {
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

// 1. Delete the rows that are being replaced or nulled
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

// 2. Insert replacements
if (inserts.length) {
  console.log(`\nInserting ${inserts.length} replacements…`);
  const { data, error } = await s
    .from("destination_stay_picks")
    .insert(inserts)
    .select("destination_id, slot, name");
  if (error) {
    console.error("Insert failed:", error);
    process.exit(1);
  }
  console.log(`  ✓ ${data?.length ?? 0} inserted`);
  for (const r of data ?? [])
    console.log(`    + ${r.destination_id.padEnd(22)} ${r.slot.padEnd(11)} ${r.name}`);
}

// 3. Honest-scarcity nulls (no insert — just log them)
if (nulls.length) {
  console.log(`\nHonest-scarcity nulls (slot left empty): ${nulls.length}`);
  for (const n of nulls)
    console.log(`    · ${n.destination_id.padEnd(22)} ${n.slot.padEnd(11)} (left empty)`);
}

// === Task B: update sources + refreshed_at on existing KEEPs ===
if (allTaskB.length) {
  console.log(`\nTask B: enriching ${allTaskB.length} KEEPs…`);
  let bUpdated = 0;
  let bDubious = 0;
  for (const r of allTaskB) {
    if (r.dubious_after_research) {
      // Delete dubious-after-research rows entirely
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
    if (error) {
      console.error(`  ✗ ${r.destination_id}/${r.slot}: ${error.message}`);
    } else {
      bUpdated += count ?? 0;
    }
  }
  console.log(`  ✓ Enriched: ${bUpdated} | DELETE (dubious): ${bDubious}`);
}

// === Final per-state count ===
const states = ["ladakh", "jammu-kashmir", "rajasthan"];
console.log("\n=== Final state ===");
for (const state of states) {
  const { data: ds } = await s
    .from("destinations")
    .select("id")
    .eq("state_id", state);
  const ids = ds.map((d) => d.id);
  const { data: picks } = await s
    .from("destination_stay_picks")
    .select("destination_id, sources")
    .in("destination_id", ids);
  const sourced = picks.filter((p) => Array.isArray(p.sources) && p.sources.length >= 2).length;
  console.log(
    `  ${state.padEnd(20)} ${ds.length} dests · ${picks.length} picks · ${sourced} sourced (${
      picks.length ? Math.round((sourced / picks.length) * 100) : 0
    }%)`
  );
}
