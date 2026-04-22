#!/usr/bin/env node
/**
 * Batch 4 — upsert 56 new sub-destinations across 12 Tier-1 hubs.
 * Targets hubs with low (0-4) existing sub-destination coverage.
 *
 * Usage:
 *   node scripts/seed-batch4-sub-destinations.mjs           # dry
 *   node scripts/seed-batch4-sub-destinations.mjs --commit
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

const rows = JSON.parse(readFileSync('supabase/seed/batch4-sub-destinations.json', 'utf-8'));

console.log(`${rows.length} sub-destinations (${COMMIT ? 'COMMIT' : 'DRY'})`);

// Pre-flight: check for id collisions with existing rows
const ids = rows.map(r => r.id);
const { data: existing } = await supabase.from('sub_destinations').select('id').in('id', ids);
const existingIds = new Set((existing || []).map(r => r.id));
if (existingIds.size > 0) {
  console.log(`\n⚠️  ${existingIds.size} id(s) already exist (will be UPDATEd by upsert):`);
  for (const id of existingIds) console.log(`    ${id}`);
  console.log('');
}

// Pre-flight: verify all parent_ids exist in destinations table
const parentIds = [...new Set(rows.map(r => r.parent_id))];
const { data: parents } = await supabase.from('destinations').select('id').in('id', parentIds);
const validParents = new Set((parents || []).map(r => r.id));
const missingParents = parentIds.filter(p => !validParents.has(p));
if (missingParents.length > 0) {
  console.error(`✗ Missing parent destinations: ${missingParents.join(', ')}`);
  console.error('Aborting — insert would fail on FK constraint.');
  process.exit(1);
}

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
    const action = existingIds.has(r.id) ? 'update' : 'insert';
    console.log(`  would ${action} ${row.id} → ${row.parent_id}`);
    ok++; continue;
  }
  const { error } = await supabase.from('sub_destinations').upsert(row, { onConflict: 'id' });
  if (error) { console.error(`  ✗ ${row.id}: ${error.message}`); err++; }
  else { console.log(`  ✓ ${row.id}`); ok++; }
}
console.log(`\n${ok} ok, ${err} failed${COMMIT ? '' : ' (dry)'}`);
