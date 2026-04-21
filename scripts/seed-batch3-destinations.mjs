#!/usr/bin/env node
/**
 * Batch 3 · Item 1 — seed 8 Tier-1 destinations.
 *
 * Inserts rows into: destinations, confidence_cards, kids_friendly, destination_months.
 * After a successful run, invoke `scripts/enrich-destination-months-verdict.mjs --only-missing`
 * to populate verdict + skip_reason on the 96 new month rows.
 *
 * Freshness invariant (added 2026-04-23):
 *   Research-backed seeders MUST stamp content_reviewed_at at insert time.
 *   A write IS a review for our workflow. See migration 011 for the one-time
 *   bootstrap that brought existing rows into the invariant.
 *
 * Usage:
 *   node scripts/seed-batch3-destinations.mjs           # dry run
 *   node scripts/seed-batch3-destinations.mjs --commit  # actually upsert
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

config({ path: 'apps/web/.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const DRY_RUN = !process.argv.includes('--commit');
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const SEED_PATH = resolve('supabase/seed/batch3-tier1-destinations.json');
const destinations = JSON.parse(readFileSync(SEED_PATH, 'utf-8'));

console.log(`Batch 3 · Item 1 — ${destinations.length} destinations (${DRY_RUN ? 'DRY RUN' : 'COMMIT'})`);
console.log('');

let okCount = 0;
let errCount = 0;
const reviewedAt = new Date().toISOString();

for (const d of destinations) {
  console.log(`▶ ${d.id} (${d.name}, ${d.state_id})`);

  // 1. destinations row
  const destRow = {
    id: d.id,
    name: d.name,
    state_id: d.state_id,
    coords: `POINT(${d.coords[1]} ${d.coords[0]})`,
    elevation_m: d.elevation_m,
    difficulty: d.difficulty,
    budget_tier: d.budget_tier,
    tagline: d.tagline,
    why_special: d.why_special,
    tags: d.tags,
    best_months: d.best_months,
    avoid_months: d.avoid_months,
    ideal_duration_min: d.ideal_duration_min,
    ideal_duration_max: d.ideal_duration_max,
    daily_cost: d.daily_cost,
    family_stress: d.family_stress,
    translations: {},
    content_reviewed_at: reviewedAt,
  };

  if (DRY_RUN) {
    console.log(`   would upsert destinations row (coords=${destRow.coords})`);
  } else {
    const { error } = await supabase.from('destinations').upsert(destRow);
    if (error) { console.error(`   ✗ destinations: ${error.message}`); errCount++; continue; }
  }

  // 2. confidence_cards
  const cc = {
    destination_id: d.id,
    ...d.confidence_cards,
  };
  if (DRY_RUN) {
    console.log(`   would upsert confidence_cards (safety_rating=${cc.safety_rating})`);
  } else {
    const { error } = await supabase.from('confidence_cards').upsert(cc, { onConflict: 'destination_id' });
    if (error) { console.error(`   ✗ confidence_cards: ${error.message}`); errCount++; continue; }
  }

  // 3. kids_friendly — DB uses min_recommended_age and not_suitable_reason, not notes/recommended_age_min
  const kf = {
    destination_id: d.id,
    suitable: d.kids_friendly.suitable,
    rating: d.kids_friendly.rating,
    min_recommended_age: d.kids_friendly.recommended_age_min ?? d.kids_friendly.min_recommended_age ?? null,
    [d.kids_friendly.suitable ? 'kid_highlights' : 'not_suitable_reason']: d.kids_friendly.suitable
      ? [d.kids_friendly.notes]
      : d.kids_friendly.notes,
  };
  if (DRY_RUN) {
    console.log(`   would upsert kids_friendly (rating=${kf.rating})`);
  } else {
    const { error } = await supabase.from('kids_friendly').upsert(kf, { onConflict: 'destination_id' });
    if (error) { console.error(`   ✗ kids_friendly: ${error.message}`); errCount++; continue; }
  }

  // 4. destination_months (12 rows)
  const monthRows = d.monthly_suitability.map((m) => ({
    destination_id: d.id,
    month: m.m,
    score: m.score,
    note: m.note,
    content_reviewed_at: reviewedAt,
  }));
  if (DRY_RUN) {
    console.log(`   would upsert ${monthRows.length} destination_months`);
  } else {
    const { error } = await supabase.from('destination_months').upsert(monthRows, { onConflict: 'destination_id,month' });
    if (error) { console.error(`   ✗ destination_months: ${error.message}`); errCount++; continue; }
  }

  okCount++;
  console.log(`   ✓ ${d.id} done`);
}

console.log('');
console.log(`Summary: ${okCount} ok, ${errCount} failed${DRY_RUN ? ' (dry run)' : ''}`);
if (!DRY_RUN && okCount > 0) {
  console.log('');
  console.log('Next step: enrich 96 new month rows with verdict + skip_reason:');
  console.log('  node scripts/enrich-destination-months-verdict.mjs --only-missing');
}
