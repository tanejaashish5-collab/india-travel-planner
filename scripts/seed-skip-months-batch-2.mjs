#!/usr/bin/env node
/**
 * Track B — skip-month verdict prose, batch 2.
 *
 * Sessions 5–7 wrote 36 verdicts (J&K winter, Ladakh/Spiti closures,
 * Goa+Rajasthan summer, Manali monsoon). 970 score-≤1 rows still lack
 * editorial prose; this batch adds 25 high-traffic ones the rest of
 * the country actually searches for.
 *
 * Theme buckets in this batch:
 *   - Hill stations in monsoon (landslide risk, no views)
 *   - North/desert plains in May (peak heat)
 *   - High-altitude treks in winter (closures, no access)
 *   - Backwaters in monsoon (flooding, ferry limits)
 *   - Wildlife parks in summer (zone closures, heat)
 *
 * After this run: 61 of ~1006 skip-rows have prose. Continue selectively
 * for the remaining ~100 highest-traffic dests, then accept null verdict
 * for low-traffic correct skips.
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/seed-skip-months-batch-2.mjs
 *
 * Idempotent — updates the (destination_id, month) row.
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
  // ─── Hill stations in monsoon ───
  { dest: "mussoorie", months: [7, 8], verdict: "Skip — Mussoorie-Dehradun road closes intermittently for landslides Jul–Aug; Kempty Falls and Camel's Back are inaccessible during heavy rain. Hotel cancellations spike. Better window: October–March, or May for the rhododendrons (heat aside)." },
  { dest: "nainital", months: [7, 8], verdict: "Skip — Mall Road waterlogged daily, lake quality drops to D-grade with monsoon runoff, boating suspended during squalls. Naukuchiatal access road landslide-prone. Better window: October–March." },
  { dest: "darjeeling", months: [6, 7, 8], verdict: "Skip — visibility under 50m most days; Tiger Hill sunrise pointless, Kanchenjunga hidden Jun–Aug. Toy train suspends services intermittently for rail-track landslides. Leech-heavy on tea-garden walks. Better window: October–November and March–May." },
  { dest: "shimla", months: [7, 8], verdict: "Skip — NH5 (Chandigarh-Shimla) closes for landslides 4–6 times each monsoon month; Mall Road foggy with no views. Last 5 years saw 14+ closure days each Jul–Aug. Better window: October–February (snow bonus Dec–Feb) or April–June." },
  { dest: "ooty", months: [7, 8], verdict: "Skip — heavy mist drops visibility to <100m most days; Doddabetta + Pykara are whiteout. Roads from Mettupalayam landslide-prone. Better window: September–November and March–May." },
  { dest: "kodaikanal", months: [7, 8], verdict: "Skip — Kodai Lake fogged in, Coaker's Walk views non-existent, suicide-point closes for safety in heavy rain. Better window: October–March." },
  { dest: "mahabaleshwar", months: [7, 8], verdict: "Skip — fog covers all viewpoints (Arthur's Seat, Echo Point) Jul–Aug; only the strawberry season starts mid-Aug but slippery laterite roads make exploration risky. Better window: October–February." },

  // ─── North/desert plains in May ───
  { dest: "agra", months: [5], verdict: "Skip — daytime 41–46°C, Taj Mahal stone slabs hit 50°C surface temp, queues sit in direct sun. Pre-dawn slot is the only bearable option. Better window: October–March, especially November–February." },
  { dest: "delhi", months: [5, 6], verdict: "Skip — daily highs 43–46°C with AQI 200+; outdoor monuments (Red Fort, Humayun's Tomb, Qutub Minar) become heat-stroke risks past 10am. Better window: October–March." },
  { dest: "jaipur", months: [5, 6], verdict: "Skip — 43–47°C daytime; Hawa Mahal facade roasts in direct sun, Amber Fort stone radiates heat. Most heritage hotels run pool-only schedules midday. Better window: October–early March." },
  { dest: "varanasi", months: [5, 6], verdict: "Skip — 42–45°C with humidity; ghat walks unbearable past 9am, evening Ganga aarti still magical but the hours in between are punishing. Better window: October–March." },
  { dest: "khajuraho", months: [4, 5], verdict: "Skip — 40–44°C with no shade at the temple complex; sandstone radiates heat, photography light is harsh. Better window: October–March." },
  { dest: "hampi", months: [4, 5], verdict: "Skip — 38–42°C; the boulder landscape offers near-zero shade and sites are spread across 26 sq km. Walking the Vittala/Hazara Rama circuit is a heat-stroke risk past 10am. Better window: November–February." },
  { dest: "mandu", months: [4, 5], verdict: "Skip — 40–44°C exposes you on hilltop palace ruins (Jahaz Mahal, Hindola Mahal); no shaded walkways. Better window: October–February, peak in monsoon for the lakeside green but with road caveats." },

  // ─── High-altitude treks + char dham in winter ───
  { dest: "kedarnath", months: [11, 12, 1, 2, 3, 4], verdict: "Skip — yatra closes officially after Diwali (early Nov) and reopens May 6 (Akshay Tritiya). Helicopter and trek both shut. Off-season visits attempt the trek illegally. Better window: May–October, with monsoon caveats Jul–Aug." },
  { dest: "badrinath", months: [11, 12, 1, 2, 3, 4], verdict: "Skip — Char Dham yatra portal closes early Nov, reopens late April; the temple itself is shut. Joshimath remains accessible year-round. Better window: May–October." },
  { dest: "rohtang-pass", months: [11, 12, 1, 2, 3, 4], verdict: "Skip — pass closed for snow Nov–May; Atal Tunnel diverts Lahaul-bound traffic but Rohtang itself remains permitted-only and weather-dependent until late May. Better window: June–October." },
  { dest: "tawang", months: [12, 1, 2, 3], verdict: "Skip — Sela Pass (4,170m, only road in) closes intermittently for snow; AP tourism advises against attempts Dec–Mar. The town stays accessible but Bumla Pass + Madhuri Lake day-trips are off the table. Better window: April–October." },

  // ─── Beaches/Islands in monsoon ───
  { dest: "havelock-island", months: [5, 6, 7, 8, 9], verdict: "Skip — Andaman monsoon (May–Sep) makes Radhanagar Beach choppy and unsafe for swimming; ferry services from Port Blair to Havelock cancelled 30%+ of days, especially Jun–Aug. Scuba operators reduce fleet 60%. Better window: November–April." },
  { dest: "north-bay-island", months: [5, 6, 7, 8, 9], verdict: "Skip — small-boat access from Port Blair restricted in monsoon swells; sea-walk and snorkeling operators close. Better window: November–April." },
  { dest: "agonda", months: [5, 6, 7, 8, 9], verdict: "Skip — Goa monsoon shuts most beach shacks; sea is rough, lifeguards withdrawn. Turtle-nesting closure also means Agonda's USP is off-limits. Better window: November–February." },

  // ─── Backwaters monsoon ───
  { dest: "kumarakom", months: [6, 7, 8], verdict: "Mixed — Kerala monsoon brings the lush rinse you came for, but houseboat fleets reduce 40% and continuous rain limits open-deck time. Vembanad Lake water levels make boat-only access tricky. Better window: October–March, or stay 3+ days to ride out heavy spells." },

  // ─── Wildlife parks summer/closures ───
  { dest: "ranthambore", months: [7, 8, 9], verdict: "Skip — park closed July 1 to October 1 for monsoon (Zone 1–5 fully shut). Some resorts stay open with non-park experiences but the safari is the reason to visit. Better window: October–June." },
  { dest: "kaziranga", months: [5, 6, 7, 8, 9, 10], verdict: "Skip — park closed mid-May to early November (Brahmaputra floods central + western ranges every monsoon). Limited eastern range may open Oct depending on water levels. Better window: November–April." },
  { dest: "periyar", months: [4, 5], verdict: "Skip — pre-monsoon heat 35–38°C, lake level drops + boat rides become 'sighting fishing nets' rather than wildlife; sambar and elephant retreat into deeper forest. Better window: October–February (peak), or August–September for green monsoon if you can handle leeches." },
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
