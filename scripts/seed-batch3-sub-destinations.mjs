#!/usr/bin/env node
/**
 * Batch 3 · Item 5 — upsert 6 new sub-destinations.
 *
 * Usage:
 *   node scripts/seed-batch3-sub-destinations.mjs           # dry
 *   node scripts/seed-batch3-sub-destinations.mjs --commit
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync } from 'fs';

config({ path: 'apps/web/.env.local' });

const COMMIT = process.argv.includes('--commit');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const rows = JSON.parse(readFileSync('supabase/seed/batch3-sub-destinations.json', 'utf-8'));

console.log(`${rows.length} sub-destinations (${COMMIT ? 'COMMIT' : 'DRY'})`);
let ok = 0, err = 0;
for (const r of rows) {
  const row = {
    id: r.id,
    parent_id: r.parent_id,
    name: r.name,
    coords: `POINT(${r.coords[1]} ${r.coords[0]})`,
    elevation_m: r.elevation_m ?? null,
    type: r.type ?? null,
    tagline: r.tagline ?? null,
    why_visit: r.why_visit ?? null,
    highlights: r.highlights ?? [],
    kids_ok: r.kids_ok ?? null,
    kids_note: r.kids_note ?? null,
    time_needed: r.time_needed ?? null,
    distance_from_parent_km: r.distance_from_parent_km ?? null,
    best_months: r.best_months ?? [],
    tags: r.tags ?? [],
    translations: {},
    subregion: r.subregion ?? null,
    place_type: r.place_type ?? 'sub',
    image_url: null,
  };
  if (!COMMIT) {
    console.log(`  would upsert ${row.id} → ${row.parent_id}`);
    ok++; continue;
  }
  const { error } = await supabase.from('sub_destinations').upsert(row, { onConflict: 'id' });
  if (error) { console.error(`  ✗ ${row.id}: ${error.message}`); err++; }
  else { console.log(`  ✓ ${row.id}`); ok++; }
}
console.log(`\n${ok} ok, ${err} failed${COMMIT ? '' : ' (dry)'}`);
