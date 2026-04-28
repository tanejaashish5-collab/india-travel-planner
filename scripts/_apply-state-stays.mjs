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

// Schema-translation helpers — handle the two agent output styles we've seen.
// Style A (Bihar/Jharkhand/WB): {result: {name, property_type, price_band("₹15–40k"), why_nakshiq, sources: [{url,title,source_type}]}}
// Style B (Sikkim onward):      {replacement: {name, tier, tagline, price_band("₹₹₹"), book_url, address, phone, sources: [url,...]}}
const tierToType = {
  luxury: "luxury_hotel",
  boutique: "boutique_hotel",
  comfort: "comfort_hotel",
  budget: "budget_hotel",
  homestay: "homestay",
  heritage: "heritage_hotel",
};
const symToBand = {
  "₹": "₹2–4k",
  "₹₹": "₹4–8k",
  "₹₹₹": "₹8–15k",
  "₹₹₹₹": "₹15–40k",
};
function urlToSourceObj(u) {
  if (typeof u !== "string") return u; // already an object
  try {
    const host = new URL(u).hostname.replace(/^www\./, "");
    let type = "directory";
    if (host.includes("tripadvisor")) type = "tripadvisor";
    else if (host.includes("booking")) type = "booking";
    else if (host.includes("makemytrip") || host.includes("goibibo")) type = "ota";
    else type = "official";
    return { url: u, title: host, source_type: type };
  } catch {
    return { url: u, title: u, source_type: "directory" };
  }
}
function normalizeSources(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(urlToSourceObj);
}
function buildInsert({ destination_id, slot, payload, conf }) {
  const sources = normalizeSources(payload.sources);
  // why_nakshiq: prefer explicit; else compose from tagline + address/phone
  let why = payload.why_nakshiq ?? payload.tagline ?? null;
  if (!payload.why_nakshiq) {
    const facts = [];
    if (payload.address) facts.push(`Address: ${payload.address}.`);
    if (payload.phone) facts.push(`Phone: ${payload.phone}.`);
    if (facts.length && why) why = `${why} ${facts.join(" ")}`;
  }
  return {
    destination_id,
    slot,
    name: payload.name,
    property_type: payload.property_type ?? tierToType[payload.tier] ?? "hotel",
    price_band: symToBand[payload.price_band] ?? payload.price_band ?? null,
    why_nakshiq: why,
    signature_experience: payload.signature_experience ?? null,
    sources,
    confidence: Math.max(0, Math.min(1, Number(payload.confidence ?? conf ?? (sources.length >= 2 ? 0.85 : 0.6)))),
    voice_flags: [],
    source: "manual",
    contact_only: false,
    contact_info: payload.book_url ? { book_url: payload.book_url } : null,
    published: sources.length >= 2,
    refreshed_at: now,
  };
}

// === Task A: delete current row in slot, insert replacement (or leave null) ===
const inserts = [];
const nulls = [];
const taskADeletes = [];
for (const r of taskA) {
  taskADeletes.push({ destination_id: r.destination_id, slot: r.slot });
  // Pick whichever payload key the agent used
  const payload = r.result ?? r.replacement ?? null;
  // Honest-scarcity (null_slot) → no payload AND verdict explicitly says null,
  // OR no payload at all
  if (!payload?.name) {
    nulls.push({ destination_id: r.destination_id, slot: r.slot });
    continue;
  }
  inserts.push(
    buildInsert({
      destination_id: r.destination_id,
      slot: r.slot,
      payload,
    })
  );
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
  console.log(`\nTask B: enriching ${taskB.length} KEEPs (UPDATE if row exists, else INSERT)…`);
  let bUpdated = 0;
  let bInserted = 0;
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
    // Build the full row from the enriched payload (handles both schemas)
    const row = buildInsert({
      destination_id: r.destination_id,
      slot: r.slot,
      payload: r,
    });
    // Try update first (preserves any other fields). If no row exists, insert.
    const { count: updCount, error: updErr } = await s
      .from("destination_stay_picks")
      .update(row, { count: "exact" })
      .eq("destination_id", r.destination_id)
      .eq("slot", r.slot);
    if (updErr) {
      console.error(`  ✗ UPDATE ${r.destination_id}/${r.slot}: ${updErr.message}`);
      continue;
    }
    if (updCount > 0) {
      bUpdated += updCount;
      continue;
    }
    // No existing row → insert
    const { error: insErr } = await s.from("destination_stay_picks").insert(row);
    if (insErr) console.error(`  ✗ INSERT ${r.destination_id}/${r.slot}: ${insErr.message}`);
    else bInserted++;
  }
  console.log(`  ✓ Updated: ${bUpdated} | Inserted: ${bInserted} | DELETE (dubious): ${bDubious}`);
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
