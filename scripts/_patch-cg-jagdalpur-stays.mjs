import { readFileSync, writeFileSync } from "node:fs";

const STAYS_FILE = "/Users/ashishtaneja/Desktop/India Travel Planner/data/research/stays/chhattisgarh-new-stays-2026-05-19.json";
const PICKS_FILE = "/Users/ashishtaneja/Desktop/India Travel Planner/data/research/stays-audit/chhattisgarh-replacements-2026-05-19.json";

const stays = JSON.parse(readFileSync(STAYS_FILE, "utf-8"));
const picksData = JSON.parse(readFileSync(PICKS_FILE, "utf-8"));

const jagdalpurPicks = picksData.task_a_results.filter((t) => t.destination_id === "jagdalpur" && t.replacement);

const tierToType = {
  luxury: "resort",
  boutique: "boutique",
  comfort: "business-hotel",
  budget: "guesthouse",
};

const slotToTags = {
  experience: ["flagship", "anchor"],
  value: ["mid-tier", "value"],
  location: ["central", "near-anchor"],
  xfactor: ["unique", "experiential"],
};

const slotToBestFor = {
  experience: ["couples", "heritage", "wildlife"],
  value: ["business", "families", "budget"],
  location: ["weekend", "families", "couples"],
  xfactor: ["heritage", "culture-seekers", "solo"],
};

const newJagdalpurStays = [];
for (const p of jagdalpurPicks) {
  const rep = p.replacement;
  // Skip if name matches an existing entry in stays file (none in this case)
  if (stays.some((s) => s.destination_id === "jagdalpur" && s.name === rep.name)) continue;
  newJagdalpurStays.push({
    destination_id: "jagdalpur",
    name: rep.name,
    type: rep.name.toLowerCase().includes("homestay") ? "homestay" : (tierToType[rep.tier] ?? "business-hotel"),
    location: rep.address ?? "Jagdalpur, Bastar District",
    why_special: rep.tagline,
    price_range: rep.price_band,
    contact: { phone: null, website: rep.book_url ?? null, email: null },
    best_for: slotToBestFor[p.slot] ?? ["couples"],
    verified: true,
    tags: ["bastar", ...slotToTags[p.slot]],
  });
}

const merged = [...stays, ...newJagdalpurStays];
writeFileSync(STAYS_FILE, JSON.stringify(merged, null, 2));

console.log(`Patched. Added ${newJagdalpurStays.length} jagdalpur stays. Total: ${merged.length} stays.`);
console.log(`Per dest:`);
const byDest = {};
for (const s of merged) byDest[s.destination_id] = (byDest[s.destination_id] ?? 0) + 1;
for (const d of Object.keys(byDest).sort()) console.log(`  ${d}: ${byDest[d]}`);
