#!/usr/bin/env node
/**
 * Normalise blog titles to consistent templates per post-type.
 * Per user decision (option 2): preserve the 4+ templates but apply each
 * consistently within its series. Editorial one-offs and titles with
 * stronger hooks stay untouched.
 *
 * Targets:
 * 1. "Best Time to Visit X" — all get ": Month-by-Month Intelligence"
 * 2. "Complete Guide to X" — drop "The" prefix; add prefix to bare-name titles
 * 3. Solo-female briefs — two non-hub posts moved to "Is X safe for solo female travellers? [hook]"
 *
 * Usage:
 *   node scripts/normalize-blog-titles.mjs          # dry
 *   node scripts/normalize-blog-titles.mjs --commit
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: "apps/web/.env.local" });

const COMMIT = process.argv.includes("--commit");

// slug → { from, to }
const patches = {
  // ═══════ Best Time to Visit — add Month-by-Month suffix ═══════
  "best-time-to-visit-kashmir": { to: "Best Time to Visit Kashmir: Month-by-Month Intelligence" },
  "best-time-to-visit-ladakh": { to: "Best Time to Visit Ladakh: Month-by-Month Intelligence" },
  "best-time-to-visit-manali": { to: "Best Time to Visit Manali: Month-by-Month Intelligence" },
  "best-time-to-visit-meghalaya": { to: "Best Time to Visit Meghalaya: Month-by-Month Intelligence" },
  "best-time-to-visit-rajasthan": { to: "Best Time to Visit Rajasthan: Month-by-Month Intelligence" },
  "best-time-to-visit-rishikesh": { to: "Best Time to Visit Rishikesh: Month-by-Month Intelligence" },
  "best-time-to-visit-spiti-valley": { to: "Best Time to Visit Spiti Valley: Month-by-Month Intelligence" },
  "best-time-to-visit-uttarakhand": { to: "Best Time to Visit Uttarakhand: Month-by-Month Intelligence" },
  "best-time-to-visit-varanasi": { to: "Best Time to Visit Varanasi: Month-by-Month Intelligence" },

  // ═══════ Complete Guide to — drop "The" prefix ═══════
  "complete-guide-bangus-valley": { to: "Complete Guide to Bangus Valley" },
  "complete-guide-gurez-valley": { to: "Complete Guide to Gurez Valley" },
  "complete-guide-hanle": { to: "Complete Guide to Hanle" },
  "complete-guide-kedarnath": { to: "Complete Guide to Kedarnath" },
  "complete-guide-kishtwar": { to: "Complete Guide to Kishtwar" },
  "complete-guide-lolab-valley": { to: "Complete Guide to Lolab Valley" },
  "complete-guide-pangong-tso": { to: "Complete Guide to Pangong Tso" },
  "complete-guide-roopkund": { to: "Complete Guide to Roopkund" },
  "complete-guide-spiti-valley": { to: "Complete Guide to Spiti Valley" },
  "complete-guide-tawang": { to: "Complete Guide to Tawang" },
  "complete-guide-tso-moriri": { to: "Complete Guide to Tso Moriri" },
  "complete-guide-umlingla": { to: "Complete Guide to Umlingla" },
  "complete-guide-zanskar-valley": { to: "Complete Guide to Zanskar Valley" },

  // ═══════ Complete Guide to — add prefix to bare-name titles ═══════
  "complete-guide-barmer": { to: "Complete Guide to Barmer" },
  "complete-guide-bundi": { to: "Complete Guide to Bundi" },
  "complete-guide-champawat": { to: "Complete Guide to Champawat" },
  "complete-guide-chaukori": { to: "Complete Guide to Chaukori" },
  "complete-guide-doodhpathri": { to: "Complete Guide to Doodhpathri" },
  "complete-guide-dungarpur": { to: "Complete Guide to Dungarpur" },
  "complete-guide-landour": { to: "Complete Guide to Landour" },
  "complete-guide-orchha": { to: "Complete Guide to Orchha" },
  "complete-guide-osian": { to: "Complete Guide to Osian" },
  "complete-guide-palampur": { to: "Complete Guide to Palampur" },
  "complete-guide-sarahan": { to: "Complete Guide to Sarahan" },
  "complete-guide-shekhawati": { to: "Complete Guide to Shekhawati" },
  "complete-guide-yusmarg": { to: "Complete Guide to Yusmarg" },

  // ═══════ Solo-female briefs — move to "Is X safe for solo female?" template ═══════
  "solo-female-manali-guide": { to: "Is Manali safe for solo female travellers? Which Manali, and when" },
  "kashmir-for-solo-female-what-matters": { to: "Is Kashmir safe for solo female travellers? What actually matters" },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Fetch current titles to show diff
const slugs = Object.keys(patches);
const { data: current, error } = await supabase
  .from("articles")
  .select("slug, title, seo_title")
  .in("slug", slugs);

if (error) { console.error(error.message); process.exit(1); }
const currentBySlug = new Map(current.map((r) => [r.slug, r]));

console.log(`Normalising ${slugs.length} titles (${COMMIT ? "COMMIT" : "DRY"})\n`);

let changed = 0;
let unchanged = 0;
const toUpdate = [];
for (const slug of slugs) {
  const row = currentBySlug.get(slug);
  if (!row) { console.log(`  ? ${slug} — not found`); continue; }
  const newTitle = patches[slug].to;
  if (row.title === newTitle) {
    unchanged++;
    continue;
  }
  console.log(`  ${slug}`);
  console.log(`    − ${row.title}`);
  console.log(`    + ${newTitle}`);
  toUpdate.push({ slug, old: row.title, newTitle, seoTitle: row.seo_title });
  changed++;
}

console.log(`\n${changed} titles to change, ${unchanged} already match, ${slugs.length - changed - unchanged} missing.`);

if (!COMMIT) {
  console.log(`\nDRY. Re-run with --commit to write.`);
  process.exit(0);
}

let ok = 0, err = 0;
for (const u of toUpdate) {
  // Update seo_title only if it was identical to the old title (auto-sync default).
  // If seo_title was customised separately, leave it.
  const update = { title: u.newTitle, updated_at: new Date().toISOString() };
  if (u.seoTitle === u.old) update.seo_title = u.newTitle;

  const { error } = await supabase.from("articles").update(update).eq("slug", u.slug);
  if (error) { console.error(`  ✗ ${u.slug}: ${error.message}`); err++; }
  else { console.log(`  ✓ ${u.slug}`); ok++; }
}

console.log(`\n${ok} updated, ${err} failed.`);
