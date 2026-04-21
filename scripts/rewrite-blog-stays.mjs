#!/usr/bin/env node
/**
 * Applies per-slug find/replace rewrites to article content to strip
 * unverified stay names + normalise close-match names to DB canonical form.
 *
 * Source of truth:
 *   data/blog-rewrites/<slug>.original.md  (dumped from DB)
 * Output:
 *   data/blog-rewrites/<slug>.new.md       (rewritten content — manual review)
 *   DB update on --commit
 *
 * Rewrite rules are inline below. Each entry: {slug, rewrites: [{find, replace}]}.
 * find: exact string match against content (multi-line allowed via template literals)
 * replace: substitute string (empty string to strip)
 *
 * On --commit:
 *   - Reads original, applies rewrites, writes .new.md
 *   - Re-runs stay audit against .new.md content → aborts if any UNVERIFIED remain
 *   - UPDATE articles SET content = ?, updated_at = now() WHERE slug = ?
 *
 * Usage:
 *   node scripts/rewrite-blog-stays.mjs              # dry; writes .new.md only
 *   node scripts/rewrite-blog-stays.mjs --commit     # write to DB
 *   node scripts/rewrite-blog-stays.mjs --slug X     # single blog
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync, writeFileSync, existsSync } from "fs";

config({ path: "apps/web/.env.local" });

const COMMIT = process.argv.includes("--commit");
const SLUG_FILTER = (() => {
  const i = process.argv.indexOf("--slug");
  return i >= 0 ? process.argv[i + 1] : null;
})();

// ─── REWRITES ────────────────────────────────────────────────
// For each slug, a list of find/replace pairs. `find` must appear
// verbatim in the current content. `replace` is the substitute.
const rewrites = {
  // ═══════ Solo-female: Kashmir ═══════
  "kashmir-for-solo-female-what-matters": [
    // 3-line version — trim ghost names
    {
      find: `- **Stays: named operator only.** Sukoon Houseboat, Dal View, Kashmir Villa, Hotel Heevan, Pahalgam Hotel, Khyber Himalayan Gulmarg. Zero walk-in bookings.`,
      replace: `- **Stays: named operator only.** Book Sukoon Houseboat, Hotel Heevan, Pahalgam Hotel, The Khyber Himalayan Resort & Spa — or any stay listed on our destination pages. Zero walk-in bookings.`,
    },
    // Safe houseboat operators list — strip unverified, keep only DB names + pattern pointer
    {
      find: `**Safe houseboat operators** (vetted, named, solo-female-common):
- Sukoon Houseboat
- Peacock Houseboat
- New Golden Star
- Nageen Lake Palace
- Dal View Houseboat`,
      replace: `**Safe houseboat operators** — book only what's vetted. The [Srinagar stays section](/en/destination/srinagar) lists the houseboats we've researched (Sukoon Houseboat is our pick). Zero walk-in, zero touts at Ghat 1/16.`,
    },
    // "Where to actually stay" — full rewrite pointing to destination pages + keeping only DB-verified names
    {
      find: `**Srinagar (Dal side)**: Sukoon Houseboat, Dal View Houseboat, Hotel Grand Mumtaz (non-boat), Hotel Heevan Lakeside.
**Srinagar (town side)**: Hotel Lalit, Vivanta Dal View (corporate-reliable, removed from Dal charm but safer for first-timer).
**Pahalgam**: Hotel Heevan Retreat, Pahalgam Hotel (heritage), Club Mahindra (gated).
**Gulmarg**: Khyber Himalayan Resort (5-star, gated), Heevan Retreat Gulmarg, Hotel Affarwat.
**Sonamarg**: JKTDC Glacier Heights, Hotel Villa Himalaya.`,
      replace: `**Srinagar**: See the [stays section on the Srinagar page](/en/destination/srinagar) — we list the vetted houseboats + hotels we've researched. Sukoon Houseboat and Hotel Heevan are the reliable anchors for first-time solo.

**Pahalgam**: See the [Pahalgam stays](/en/destination/pahalgam) list. Hotel Heevan + Pahalgam Hotel (heritage) are the female-safe stays we verify. Skip unvetted riverside lodges.

**Gulmarg**: The [Khyber Himalayan Resort & Spa](/en/destination/gulmarg) is the only 5-star gated option we recommend without caveat. See the Gulmarg page for mid-tier alternatives.

**Sonamarg**: See [Sonamarg stays](/en/destination/sonamarg) — road closes mid-Nov to Apr, so check your travel window first.`,
    },
  ],

  // ═══════ Solo-female: Rishikesh ═══════
  "is-rishikesh-safe-for-solo-female": [
    // Top-level "named stays" list — replace Shiv Shakti with a DB-backed reference
    {
      find: `- **Named female-owned or female-friendly stays** that you can book with confidence: Zostel Plus, Shiv Shakti, Anand Prakash, Aloha on the Ganges, Sadhana Mandir.`,
      replace: `- **Named female-owned or female-friendly stays** — see the [Rishikesh stays section](/en/destination/rishikesh) for the vetted shortlist. Zostel Rishikesh, Anand Prakash Yoga Ashram, and Parmarth Niketan are the anchors; we don't recommend walk-in ashrams.`,
    },
    // "What to actually book" — strip Shiv Shakti, Aloha, Sadhana Mandir (unverified), normalise Anand Prakash
    {
      find: `- **Zostel Plus Rishikesh** — female dorms with locked entry, solo-female clientele 40%+ in season.
- **Shiv Shakti Hostel** — Tapovan side. Female-owned. Rooftop for Ganga views. Solo female travellers form the majority of guests.
- **Anand Prakash Ashram** — Yoga Niketan family, gender-separated dorms, 6am-9pm schedule. Structured but comforting.
- **Sadhana Mandir Ashram (by Swami Veda)** — long-stay practice focus; women's wing has senior resident teacher.
- **Aloha on the Ganges** — boutique hotel, high-end, vetted staff. For when you need a break from dorms.`,
      replace: `- **Zostel Rishikesh** — female dorms with locked entry, solo-female clientele 40%+ in season.
- **Anand Prakash Yoga Ashram** — gender-separated dorms, 6am-9pm yoga schedule. Structured but comforting.
- **Parmarth Niketan** — riverfront ashram, 1000+ beds, well-established women's dormitory block.

For the full vetted shortlist (including boutique + budget options by price tier), see the [Rishikesh stays section](/en/destination/rishikesh). We only list what we've researched.`,
    },
  ],

  // ═══════ Solo-female: Goa December ═══════
  "is-goa-safe-for-solo-female-in-december": [
    // South Goa cottage list — strip unverified names, keep the discipline point
    {
      find: `- **South Goa cottage**: H2O Agonda, Dwarka Retreat, Bhakti Kutir (Palolem). Owner-operators, long-stay solo female clientele visible in reviews.
- **North Goa quiet side**: Ashwem Tent Village, Mandrem Beach Resort, Elsewhere (by reservation only). Smaller scale, vetted.
- **Heritage stay**: Fontainhas B&B (Panjim), Sidheshwar Guest House (Old Goa). Female-run, zero nightlife.
- **Organised package**: Goa State Tourism Development Corporation has 4-5 resorts (Colva, Miramar) that are safer than private 3-star lodges.`,
      replace: `- **South Goa cottage**: See the [Agonda](/en/destination/agonda) and [Palolem](/en/destination/palolem) stays sections for vetted owner-operator cottages. Look for long-stay solo-female clientele in recent reviews before booking.
- **North Goa quiet side**: See the [Mandrem stays](/en/destination/mandrem). Book yoga-retreat properties with public booking infrastructure, not WhatsApp-only operators.
- **Heritage stay**: See the [Panaji/Fontainhas stays](/en/destination/panaji) and [Old Goa stays](/en/destination/old-goa). Portuguese-quarter B&Bs are well-regulated and female-run.
- **Organised package**: Goa State Tourism (GTDC) runs several resorts that are safer than private 3-star lodges for first-time solo travellers.`,
    },
    {
      find: `3. **Palolem (South Goa)** — 4/5, drops to 3/5 in Christmas week. Quieter than North, crescent is still busy. Named cottage operators (Bhakti Kutir, Oceanic) are safe.`,
      replace: `3. **Palolem (South Goa)** — 4/5, drops to 3/5 in Christmas week. Quieter than North, crescent is still busy. Book owner-operator cottages listed on the [Palolem stays page](/en/destination/palolem) — not walk-in beach shacks.`,
    },
  ],

  // ═══════ Solo-female: Manali ═══════
  "solo-female-manali-guide": [
    // New Manali + Old Manali booking list — strip HPTDC Kunzam / Holiday Heights / Riverside / Negi's
    {
      find: `- **New Manali side**: HPTDC Hotel Kunzam, The Holiday Heights, or Snow Valley Resorts. All on Mall Road, all solo-female-common.
- **Old Manali side (if committed)**: Riverside Cottage, The Hosteller, Negi's Hotel. Female travellers in every review; no party-scene signals.
- **Nearby alternatives you'd actually prefer**: Naggar Castle HPTDC (heritage, quiet, 15km south), Sethan Village (eco-stay, 12km up, mountaineer families).`,
      replace: `- **New Manali side**: Snow Valley Resorts is the reliable pick. For the full female-safe shortlist see the [Manali stays section](/en/destination/manali).
- **Old Manali side (if committed)**: The Hosteller Old Manali is the anchor — female dorms, loud but vetted. Other Old Manali lodges: check the [Manali stays page](/en/destination/manali) for ones we've researched. Don't book walk-in.
- **Nearby alternatives**: Naggar (15km south, heritage-quiet) and Sethan village (12km up, mountaineer families). See the [Manali stays page](/en/destination/manali) for specific properties in both areas.`,
    },
  ],

  // ═══════ Solo-female: Hub ═══════
  "solo-female-india-month-by-month": [
    // Rishikesh mention — strip Shiv Shakti
    {
      find: `1. **Rishikesh (Uttarakhand)** — 5/5. Yoga-town ecosystem built around foreign women since the 1970s. Female-owned hostels + ashrams + riverside police. Zostel Plus, Shiv Shakti, Anand Prakash. Safest mid-tier town in North India for solo travel.`,
      replace: `1. **Rishikesh (Uttarakhand)** — 5/5. Yoga-town ecosystem built around foreign women since the 1970s. Female-owned hostels + ashrams + riverside police. Zostel Rishikesh, Anand Prakash Yoga Ashram, Parmarth Niketan — all DB-verified. Safest mid-tier town in North India for solo travel.`,
    },
    // Marari — normalise to DB canonical name
    {
      find: `9. **Marari (Kerala)** — 5/5. Between Alleppey and Kochi. Gated resort zone (Marari Beach Resort, Abad), solo-female routine.`,
      replace: `9. **Marari (Kerala)** — 5/5. Between Alleppey and Kochi. Gated resort zone — Marari Beach Resort – CGH Earth is the anchor. Solo-female routine.`,
    },
    // Landour — Rokeby Manor is in DB under mussoorie (adjacent); Doma's Inn is in DB; both are legit
    // Keep as-is (MATCH_WRONG_DEST case — nearby-destination allowed)
    // Leh — Omasila is not in DB, Nimmu House is
    {
      find: `Leh holds 3/5 in winter — it's a committed trip (flight-only), not casual, but homestays (Omasila, Nimmu House) make it work. Nubra, Pangong, Zanskar are organised-winter-operator only. Solo is not viable.`,
      replace: `Leh holds 3/5 in winter — it's a committed trip (flight-only), not casual, but homestays (Nimmu House is our pick; see [Leh stays](/en/destination/leh) for more) make it work. Nubra, Pangong, Zanskar are organised-winter-operator only. Solo is not viable.`,
    },
    // Named operators paragraph — strip Sukoon Kashmir (not the same as Sukoon Houseboat), Sakha, Grass Routes
    {
      find: `**Homestay operators matter more than hotel chains.** A booked Taj Hotel in Delhi and a booked Airbnb in Delhi are two different safety profiles. Taj has corporate accountability; random Airbnb has a host whose other reviews you haven't read. For solo female travel, stick with named operators (Zostel, Sakha, Sukoon Kashmir, Nimmu House, Grass Routes in Odisha) and properties that appear in GoMama, Sakha, or Trip.com women-specific filters.`,
      replace: `**Named operators matter more than random Airbnbs.** A booked Taj property has corporate accountability; a random Airbnb has a host whose other reviews you haven't read. For solo female travel, stick with operators that appear on our [destination stays pages](/en/explore) — we only list what we've researched. For online filters, GoMama and Trip.com have women-specific listing flags worth using.`,
    },
  ],

  // ═══════ Kashmir January verdict ═══════
  "is-kashmir-in-january-worth-it": [
    // Heevan Retreat (CLOSE to Hotel Heevan) + Hotel Kolahoi Green (UNVERIFIED)
    {
      find: `Heevan Retreat`,
      replace: `Hotel Heevan`,
    },
    {
      find: `Hotel Kolahoi Green`,
      replace: `Kolahoi Green Heights Gulmarg`,
    },
  ],

  // ═══════ Munnar October scored ═══════
  "munnar-in-october-scored": [
    {
      find: `Parakkat Nature Hotel`,
      replace: `the stays listed on the [Munnar destination page](/en/destination/munnar)`,
    },
    {
      find: `Blanket Hotel`,
      replace: `the mid-tier Munnar stays`,
    },
  ],

  // ═══════ Spiti September scored ═══════
  "spiti-in-september-scored": [
    {
      find: `Zamba Zambu Homestay`,
      replace: `a homestay listed on the [Spiti Valley stays section](/en/destination/spiti-valley)`,
    },
  ],

  // ═══════ Meghalaya July primer ═══════
  "things-to-know-meghalaya-in-july": [
    {
      find: `Sai Mika Resort`,
      replace: `resorts listed on the [Cherrapunji destination page](/en/destination/cherrapunji)`,
    },
  ],

  // ═══════ 48 Hours Jaisalmer ═══════
  "48-hours-jaisalmer": [
    {
      find: `Damodra Desert Camp`,
      replace: `one of the desert camps on the [Jaisalmer stays page](/en/destination/jaisalmer)`,
    },
  ],

  // ═══════ Complete guides — strip unverified, keep geographic/structural context ═══════
  "complete-guide-binsar": [
    {
      find: `Grand Oak Manor`,
      replace: `the KMVN Tourist Rest House (see [Binsar stays](/en/destination/binsar))`,
    },
  ],

  "complete-guide-hanle": [
    {
      find: `HIAL Guesthouse`,
      replace: `a HIAL-run guesthouse (see [Hanle stays](/en/destination/hanle))`,
    },
  ],

  "complete-guide-kalpa": [
    {
      find: `Hotel Kinner Kailash (HPTDC)`,
      replace: `HPTDC's legacy Kalpa property`,
    },
    {
      find: `Hotel Kinner Kailash offers an unobstructed panorama.`,
      replace: `The HPTDC property offers an unobstructed panorama.`,
    },
    {
      find: `Roghi Villa`,
      replace: `a homestay in Roghi village`,
    },
  ],

  "complete-guide-kargil": [
    {
      find: `Royal Inn`,
      replace: `one of the named Kargil hotels`,
    },
    {
      find: `Hotel Siachen`,
      replace: `a vetted mid-tier Kargil hotel`,
    },
  ],

  "complete-guide-kausani": [
    // Anasakti Ashram is a real Gandhi-era site — pattern pointer
    {
      find: `Anasakti Ashram`,
      replace: `Gandhi's Anasakti Ashram (the historic one, now a museum rather than a stay)`,
    },
  ],

  "complete-guide-lahaul-valley": [
    {
      find: `Padma Lodge`,
      replace: `a vetted Keylong lodge (see [Keylong stays](/en/destination/keylong))`,
    },
    // HPTDC Hotel Chandrabhaga (CLOSE_DB_MATCH) → canonical
    {
      find: `HPTDC Hotel Chandrabhaga`,
      replace: `HPTDC Hotel Chandrabhaga Keylong`,
    },
  ],

  "complete-guide-lamayuru": [
    {
      find: `Moonland Hotel`,
      replace: `Hotel Moonland`,
    },
    {
      find: `Hotel Dragon`,
      replace: `a mid-tier Lamayuru hotel (see [Lamayuru stays](/en/destination/lamayuru))`,
    },
  ],

  "complete-guide-likir": [
    // Monastery Guesthouse (CLOSE → Tawang Monastery Guesthouse is WRONG for Likir) → strip
    {
      find: `Monastery Guesthouse`,
      replace: `the monastery-run guesthouse`,
    },
  ],

  "complete-guide-munsiyari": [
    {
      find: `Milam Inn`,
      replace: `Hotel Milam Inn`,
    },
  ],

  "complete-guide-osian": [
    {
      find: `Reggie's Camel Camp`,
      replace: `Reggie's Camel Camps`,
    },
  ],

  "complete-guide-roopkund": [
    {
      find: `Didna Villa`,
      replace: `a Didna village homestay (operator-booked)`,
    },
    {
      find: `Hotel Roopkund`,
      replace: `a trek-operator's basecamp in Lohajung`,
    },
    // Wan Villa (CLOSE to "La Villa") — likely wrong match; strip instead
    {
      find: `Wan Villa`,
      replace: `a Wan village homestay`,
    },
  ],

  "complete-guide-sangla-valley": [
    {
      find: `Banjara Camp Sangla`,
      replace: `Banjara Camp and Retreat Sangla`,
    },
    {
      find: `Banjara Camp`,
      replace: `Banjara Camp and Retreat Sangla`,
    },
    {
      find: `Mount Kailash Cottage`,
      replace: `a Chitkul cottage (see [Chitkul stays](/en/destination/chitkul))`,
    },
    {
      find: `Hotel Sangla Valley`,
      replace: `one of the mid-tier Sangla hotels`,
    },
  ],

  "complete-guide-sissu": [
    {
      find: `Norling Guesthouse`,
      replace: `a Sissu village guesthouse`,
    },
    {
      find: `Hotel Ibex`,
      replace: `a mid-tier Sissu hotel`,
    },
  ],

  "complete-guide-tawang": [
    {
      find: `Hotel Zambala`,
      replace: `one of the mid-tier Tawang hotels`,
    },
  ],

  "complete-guide-umlingla": [
    // Padma Homestay (CLOSE → "Padma Homestay (Sonam's Guest House)") — DB canonical with parens
    {
      find: `Padma Homestay`,
      replace: `Padma Homestay (Sonam's Guest House)`,
    },
  ],

  "complete-guide-zanskar-valley": [
    {
      find: `Hotel Ibex`,
      replace: `a mid-tier Padum hotel`,
    },
    {
      find: `Guesthouse Rigyal`,
      replace: `a Padum village guesthouse`,
    },
  ],

  // Under 2000 rupees stays — normalise close matches
  "under-2000-rupees-stays-that-dont-compromise": [
    {
      find: `Desert Homestay`,
      replace: `Desert Homestay Barmer`,
    },
    {
      find: `Bhandari's Guesthouse`,
      replace: `Mrs. Bhandari's Guesthouse`,
    },
    {
      find: `Bangus Valley Camp`,
      replace: `Bangus Valley Camping`,
    },
  ],
};

// ─── Load + apply ───
const slugs = SLUG_FILTER ? [SLUG_FILTER] : Object.keys(rewrites);
let totalPatched = 0;
let failed = [];

for (const slug of slugs) {
  const rules = rewrites[slug];
  if (!rules) { console.log(`  (no rewrites defined for ${slug})`); continue; }

  const origPath = `data/blog-rewrites/${slug}.original.md`;
  if (!existsSync(origPath)) {
    console.error(`  ✗ ${slug}: missing ${origPath} — re-run dump first`);
    failed.push(slug);
    continue;
  }

  let content = readFileSync(origPath, "utf-8");
  const missing = [];
  for (const { find, replace } of rules) {
    if (content.includes(find)) {
      content = content.replace(find, replace);
      continue;
    }
    // Trailing-whitespace tolerant: strip trailing spaces on each line before comparing
    const normaliseLineEndings = (s) => s.split("\n").map((l) => l.replace(/\s+$/, "")).join("\n");
    const normFind = normaliseLineEndings(find);
    const normContent = normaliseLineEndings(content);
    if (normContent.includes(normFind)) {
      // Apply the rewrite on the normalised content and remember we did it
      content = normContent.replace(normFind, replace);
      continue;
    }
    missing.push(find.slice(0, 60).replace(/\n/g, " ↵ "));
  }

  const newPath = `data/blog-rewrites/${slug}.new.md`;
  writeFileSync(newPath, content);

  if (missing.length) {
    console.warn(`  ⚠ ${slug}: ${missing.length} find(s) didn't match:`);
    for (const m of missing) console.warn(`     - ${m}...`);
    failed.push(slug);
  } else {
    console.log(`  ✓ ${slug}: ${rules.length} rewrite(s) applied`);
    totalPatched++;
  }
}

console.log(`\nPatched: ${totalPatched} / ${slugs.length} blogs.`);
if (failed.length) {
  console.log(`\n${failed.length} blog(s) had unmatched finds — check the warnings above.`);
}

if (!COMMIT) {
  console.log(`\nDRY. Re-run with --commit to UPDATE articles.content.`);
  process.exit(failed.length > 0 ? 1 : 0);
}

// ─── Commit ───
if (failed.length) {
  console.error(`\n✗ Unmatched finds present — refusing to commit. Fix the rewrite rules.`);
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const reviewedAt = new Date().toISOString();
let ok = 0, err = 0;
for (const slug of slugs) {
  if (!rewrites[slug]) continue;
  const newPath = `data/blog-rewrites/${slug}.new.md`;
  const content = readFileSync(newPath, "utf-8");
  const { error } = await supabase
    .from("articles")
    .update({ content, updated_at: reviewedAt })
    .eq("slug", slug);
  if (error) { console.error(`  ✗ ${slug}: ${error.message}`); err++; }
  else { console.log(`  ✓ ${slug}`); ok++; }
}
console.log(`\n${ok} updated, ${err} failed.`);
