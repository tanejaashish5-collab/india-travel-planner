#!/usr/bin/env node
/**
 * Track B — skip-month verdict prose, batch 3.
 *
 * Batch-2 wrote 71 verdicts (way over the 25 target). Coverage is now
 * 107/1006 = 10.6%. This batch adds 25 more high-traffic ones, bringing
 * coverage to ~132/1006 (13%). After this, diminishing returns — the
 * remaining ~870 are correct-but-uncontroversial high-altitude winter
 * skips and obscure low-traffic dest_months.
 *
 * Theme buckets in this batch:
 *   - Western Ghat hill stations in monsoon (continued)
 *   - Northeast in monsoon (Meghalaya, Assam, Sikkim)
 *   - Spiti / Lahaul winter closures
 *   - Coastal heat (Goa/Mumbai/Chennai April-June)
 *   - More wildlife park closure windows
 *   - Heritage circuits in extreme summer
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/seed-skip-months-batch-3.mjs
 *
 * Idempotent.
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });

const SKIP_MONTHS = [
  // ─── Northeast in monsoon ───
  { dest: "shillong", months: [6, 7, 8], verdict: "Skip — Cherrapunji-Shillong road closes for landslides 4–8 days/month Jun–Aug; Police Bazaar floods, Elephant Falls is unreachable in heavy rain. Better window: October–April, peak Oct–Nov for autumn clarity." },
  { dest: "cherrapunji", months: [6, 7, 8], verdict: "Skip — paradoxically the wettest months are the worst for visiting. Nohkalikai + Seven Sisters waterfalls are full but visibility is <50m most days, root bridges flood, NH206 closes intermittently. Better window: October–March for full waterfalls and clear views." },
  { dest: "tawang", months: [6, 7, 8], verdict: "Skip — Sela Pass road closes intermittently for monsoon landslides; Bumla Pass + Madhuri Lake day-trips not feasible. Better window: April–May (rhododendron) and September–October (clear views)." },
  { dest: "ziro", months: [6, 7, 8], verdict: "Skip — Apatani valley waterlogged, Talley Valley wildlife sanctuary trails impassable, paddy-cum-fish farming is dormant. Better window: September (Ziro Music Festival) and October–March." },
  { dest: "majuli", months: [6, 7, 8], verdict: "Skip — Brahmaputra at peak flood, ferry to Majuli island reduced to 1 service/day with 3hr+ delays, satras (Vaishnav monasteries) accessible but homestay roads cut off. Better window: November–March." },
  { dest: "gangtok", months: [6, 7, 8], verdict: "Skip — Gangtok-Tsomgo Lake-Nathula road closes for landslides; Rumtek + Pemayangtse monasteries fogged in. MG Marg is wet not romantic. Better window: October–November and March–May." },

  // ─── Spiti / Lahaul winter closures ───
  { dest: "kaza", months: [12, 1, 2, 3], verdict: "Skip — Kunzum La (Manali-Spiti road) closes mid-Oct to mid-May; Kinnaur route via Reckong Peo is the only access and treacherous Dec–Feb (BRO blocks slope-segments). Spiti drops to -25°C; homestays burn 8hr/day on heating just to keep water unfrozen. Better window: May–October." },
  { dest: "kibber", months: [12, 1, 2, 3], verdict: "Skip — village at 4,205m gets snowed-in for 4 months; the famous Kibber Wildlife Sanctuary (snow leopard) is technically accessible via specialised expeditions but homestays operate winter-only by special arrangement. Better window: May–October for general visitors; Feb–early Mar for snow-leopard expeditions only." },
  { dest: "tabo", months: [12, 1, 2], verdict: "Skip — Tabo Monastery (UNESCO 996 CE) remains open year-round but the Spiti road loop is closed; access via long Kinnaur route only. Most monks retreat indoors; the famous Buddhist murals are visible but the ambient experience is limited. Better window: April–October." },
  { dest: "lahaul-valley", months: [12, 1, 2, 3], verdict: "Skip — Atal Tunnel (since 2020) keeps Sissu and Keylong accessible from Manali year-round, but BRO closes the road during heavy snow days (3–5 closures per winter month). Most homestays shut Dec–Feb. Beyond Keylong is closed entirely. Better window: April–October." },

  // ─── Coastal heat April-June ───
  { dest: "goa-north", months: [5], verdict: "Skip — humidity 80%+ and 35–38°C; beach shacks empty, sea turbid pre-monsoon, mosquitoes peak. Better window: November–February (peak season) or July–September (monsoon-green for the discount-tolerant)." },
  { dest: "mumbai", months: [5], verdict: "Skip — 33–37°C with 75% humidity makes outdoor sightseeing (Gateway, Colaba, Marine Drive) heavy work; AC indoor (Phoenix Mills, museums, Bandra cafes) becomes the trip. Better window: November–February." },
  { dest: "chennai", months: [4, 5], verdict: "Skip — 38–42°C with humidity; Marina Beach shimmers, Mahabs day-trip is heat-stroke territory at midday, Pondicherry drive baking. Better window: November–February (post-monsoon) and December–January for Chennai Music Season." },
  { dest: "kovalam", months: [5], verdict: "Skip — pre-monsoon peak heat 32–35°C with 80% humidity, Lighthouse Beach gets choppy with first monsoon swells, ferry services to Poovar reduced. Better window: November–March." },
  { dest: "puri", months: [4, 5], verdict: "Skip — 38–42°C with humidity; Jagannath Temple darshan involves 60–90 min queue in shaded corridor but the city itself is brutal, Konark drive baking. Better window: October–February." },

  // ─── Wildlife park summer/closure windows ───
  { dest: "bandhavgarh", months: [7, 8, 9], verdict: "Skip — park closed July 1 to October 1 for monsoon (all zones). Resorts stay open with non-park experiences. Better window: October–June, peak March–May for highest tiger sightings." },
  { dest: "tadoba-andhari", months: [7, 8, 9], verdict: "Skip — park closed July 1 to October 1 for monsoon (Buffer + Core both shut). Better window: October–June, peak April–May." },
  { dest: "nagarhole", months: [7, 8], verdict: "Mixed — park stays open year-round but heavy monsoon floods Karapur range; jeep-safari sightings drop 40% Jul–Aug as wildlife retreats into deeper forest. Better window: October–February (peak) and March–April (visible wildlife concentration at waterholes)." },
  { dest: "satpura", months: [7, 8, 9], verdict: "Skip — park closed July 1 to October 1 (MP forest dept policy). Better window: October–June; Satpura's USP is walking/canoe safaris which are best November–February." },

  // ─── Heritage circuits in extreme summer ───
  { dest: "orchha", months: [4, 5, 6], verdict: "Skip — 40–45°C in Bundelkhand; Bundela palaces (Jahangir Mahal) radiate stone heat, Betwa river bath unsafe, no shaded promenade. Better window: October–March." },
  { dest: "gwalior", months: [4, 5, 6], verdict: "Skip — 41–46°C; Gwalior Fort (rock-cut, exposed) becomes heat-stroke risk, Sas-Bahu temples and Teli ka Mandir have zero shade. Better window: October–March." },
  { dest: "chittorgarh", months: [4, 5, 6], verdict: "Skip — fort is on a 700-acre exposed plateau, 41–46°C with no shade between Vijay Stambh, Kirti Stambh, Padmini's Palace; full-fort circuit is 4hr in direct sun. Better window: October–March." },
  { dest: "bhuj", months: [4, 5, 6], verdict: "Skip — Kutch desert hits 42–46°C; Rann is dry-cracked-earth not the famous white-salt sheen (that's Nov–Feb when CCS Rann Utsav runs). Better window: October–March, peak Nov–Feb during Rann Utsav." },
  { dest: "patan", months: [4, 5, 6], verdict: "Skip — 41–45°C in north Gujarat; Rani ki Vav stepwell (UNESCO) is partly underground but the approach + queue is sun-exposed. Better window: October–March." },
];

(async () => {
  console.log(`→ Writing ${SKIP_MONTHS.reduce((s, x) => s + x.months.length, 0)} skip-month verdicts across ${SKIP_MONTHS.length} destinations…`);
  let written = 0;
  let skipped = 0;
  for (const s of SKIP_MONTHS) {
    for (const m of s.months) {
      const { data: existing, error: feErr } = await supabase
        .from("destination_months")
        .select("destination_id, month, score, go_or_skip_verdict")
        .eq("destination_id", s.dest)
        .eq("month", m)
        .maybeSingle();

      if (feErr) {
        console.error(`  × fetch ${s.dest}/${m}:`, feErr.message);
        continue;
      }

      if (!existing) {
        const { error } = await supabase
          .from("destination_months")
          .insert({ destination_id: s.dest, month: m, score: 1, go_or_skip_verdict: s.verdict });
        if (error) {
          console.error(`  × insert ${s.dest}/${m}:`, error.message);
          skipped++;
        } else {
          written++;
          console.log(`  + ${s.dest.padEnd(20)}/${m.toString().padStart(2)} (new, score=1)`);
        }
      } else {
        const newScore = Math.min(existing.score ?? 5, 1);
        const { error } = await supabase
          .from("destination_months")
          .update({ score: newScore, go_or_skip_verdict: s.verdict })
          .eq("destination_id", s.dest)
          .eq("month", m);
        if (error) {
          console.error(`  × update ${s.dest}/${m}:`, error.message);
          skipped++;
        } else {
          written++;
          console.log(`  ✓ ${s.dest.padEnd(20)}/${m.toString().padStart(2)} (was ${existing.score}, now ${newScore})`);
        }
      }
    }
  }
  console.log(`\nDone. ${written} verdicts written, ${skipped} skipped.`);
})();
