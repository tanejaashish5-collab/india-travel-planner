import { createClient } from "@supabase/supabase-js";
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const { data, error } = await s
  .from("destinations")
  .select("id, name, state_id, content_tier, daily_cost, crowd_calendar, food_scene, persona_blocks");
if (error) { console.error(error); process.exit(1); }

function isThinDailyCost(dc) {
  if (!dc || typeof dc !== "object") return true;
  const tiers = ["budget", "midrange", "luxury"];
  return !tiers.some((t) => dc[t] && typeof dc[t] === "object" && (dc[t].stay != null || dc[t].food != null));
}
function isThinCrowd(cc) {
  if (!cc || typeof cc !== "object") return true;
  return !Array.isArray(cc.peak_months) && !Array.isArray(cc.quiet_months);
}
function isThinFood(fs) {
  if (!fs || typeof fs !== "object") return true;
  // Rich-shape signal: vegetarian_ease/family_dining/cuisine. Anything else = thin.
  return !fs.vegetarian_ease && !fs.family_dining && !fs.cuisine;
}
function isThinPersona(pb) {
  if (!pb || typeof pb !== "object") return true;
  // If any archetype text is <40 chars → thin
  const keys = ["family", "biker", "photographer", "nomad", "solo_female", "elderly"];
  return keys.some((k) => pb[k] && typeof pb[k] === "string" && pb[k].trim().length < 40);
}

const flagged = [];
for (const d of data) {
  const t = {
    cost: isThinDailyCost(d.daily_cost),
    crowd: isThinCrowd(d.crowd_calendar),
    food: isThinFood(d.food_scene),
    persona: isThinPersona(d.persona_blocks),
  };
  const score = Object.values(t).filter(Boolean).length;
  if (score >= 2) flagged.push({ id: d.id, name: d.name, state: d.state_id, tier: d.content_tier, ...t, score });
}

console.log(`Total destinations: ${data.length}`);
console.log(`Flagged (≥2 thin sections): ${flagged.length}`);
console.log("\nBy state:");
const byState = new Map();
for (const f of flagged) {
  byState.set(f.state, (byState.get(f.state) ?? 0) + 1);
}
for (const [state, n] of [...byState.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  console.log(`  ${state.padEnd(25)} ${n}`);
}

console.log("\nWorst offenders (score=4, all four sections thin):");
flagged
  .filter((f) => f.score === 4)
  .slice(0, 30)
  .forEach((f) => console.log(`  - ${f.id.padEnd(28)} ${f.state}`));

console.log("\nKotagiri snapshot:");
const kg = data.find((d) => d.id === "kotagiri");
if (kg) {
  console.log("  daily_cost:", JSON.stringify(kg.daily_cost));
  console.log("  crowd_calendar:", JSON.stringify(kg.crowd_calendar));
  console.log("  food_scene:", JSON.stringify(kg.food_scene));
  console.log("  persona_blocks:", JSON.stringify(kg.persona_blocks));
}
