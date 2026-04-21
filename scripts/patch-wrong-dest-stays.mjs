#!/usr/bin/env node
/**
 * Fix the 8 MATCH_WRONG_DEST audit hits.
 *
 * Two classes of fix:
 *   1. Legit adjacent-destination → add to destinations[] or DB stays table
 *   2. Name collision (different real property in DB) → strip from prose
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { execSync } from 'child_process';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

const COMMIT = process.argv.includes('--commit');

// ── Data fixes ─────────────────────────────────────────
const STAY_INSERTS = [
  // Rokeby Manor: real-world address is Tehri Road, LANDOUR — not Mussoorie town.
  // Already listed under Mussoorie; add under Landour too (same ridge, Landour is canonical).
  { destination_id: 'landour', name: 'Rokeby Manor',
    type: 'heritage-boutique',
    location: 'Tehri Road, Landour',
    price_range: '₹8,000-15,000/night',
    why_special: 'Heritage 1840s stone manor on Tehri Road, Landour. Best-known upscale stay on the ridge.',
    best_for: 'couples, writers, weekend retreat',
    verified: true,
    tags: ['heritage', 'boutique', 'upscale'] },
];

// ── Metadata fixes: add missing destination_ids to blog destinations[] ──────
const META_FIXES = [
  { slug: 'complete-guide-lahaul-valley', add: ['keylong'] },
  { slug: 'is-kashmir-in-january-worth-it', add: ['pahalgam'] },
];

// ── Prose fixes: strip unverified names from sentences ───────
const PROSE_FIXES = [
  { slug: 'hampi-in-february-scored',
    find: 'Mid-range on Hippie Island (Mowgli, Goan Corner, Padma Guest House) runs ₹2,000–3,500/night.',
    replace: 'Mid-range on Hippie Island runs ₹2,000–3,500/night (Goan Corner Guesthouse is our pick — see the [Hampi stays section](/en/destination/hampi) for vetted options).' },
  { slug: 'things-to-know-hampi-in-december',
    find: 'Mid-range (₹3,000–6,000) is on the north bank: Padma Guest House, Goan Corner, Mowgli.',
    replace: 'Mid-range (₹3,000–6,000) is on the north bank — see the [Hampi stays section](/en/destination/hampi) for the vetted shortlist (Goan Corner Guesthouse is our pick).' },
  { slug: 'pushkar-in-october-scored',
    find: '**Budget (₹500–1,000/night):** Moustache Hostel, Zostel Pushkar.',
    replace: '**Budget (₹500–1,000/night):** Zostel Pushkar. For more vetted options see the [Pushkar stays section](/en/destination/pushkar).' },
];

console.log(COMMIT ? 'COMMIT mode' : 'DRY run (pass --commit)');

// ─── DB stay row inserts ──────────────────────────────────────
for (const row of STAY_INSERTS) {
  const { data: existing } = await supabase.from('local_stays').select('id').eq('destination_id', row.destination_id).eq('name', row.name).maybeSingle();
  if (existing) { console.log(`  ${row.destination_id} / ${row.name}: already exists, skip`); continue; }
  console.log(`  + local_stays: ${row.destination_id} / ${row.name}`);
  if (!COMMIT) continue;
  const { error } = await supabase.from('local_stays').insert(row);
  if (error) { console.error(`    ✗ ${error.message}`); process.exit(1); }
}

// ─── Blog destinations[] metadata fixes ───────────────────────
for (const fix of META_FIXES) {
  const { data: art, error } = await supabase.from('articles').select('destinations').eq('slug', fix.slug).single();
  if (error) { console.error(`  ${fix.slug}: ${error.message}`); process.exit(1); }
  const current = art.destinations || [];
  const missing = fix.add.filter((d) => !current.includes(d));
  if (!missing.length) { console.log(`  ${fix.slug}: destinations already include ${fix.add.join(', ')}, skip`); continue; }
  const next = [...current, ...missing];
  console.log(`  ${fix.slug}: destinations += [${missing.join(', ')}] → ${next.length} total`);
  if (!COMMIT) continue;
  const { error: upErr } = await supabase.from('articles').update({ destinations: next, updated_at: new Date().toISOString() }).eq('slug', fix.slug);
  if (upErr) { console.error(`    ✗ ${upErr.message}`); process.exit(1); }
}

// ─── Blog prose strips ────────────────────────────────────────
for (const fix of PROSE_FIXES) {
  const { data: art, error } = await supabase.from('articles').select('content').eq('slug', fix.slug).single();
  if (error) { console.error(`  ${fix.slug}: ${error.message}`); process.exit(1); }
  if (!art.content.includes(fix.find)) {
    console.error(`  ${fix.slug}: find string not located — already patched or drifted`);
    process.exit(1);
  }
  const next = art.content.replace(fix.find, fix.replace);
  console.log(`  ${fix.slug}: prose strip applied`);
  if (!COMMIT) continue;
  const { error: upErr } = await supabase.from('articles').update({ content: next, updated_at: new Date().toISOString() }).eq('slug', fix.slug);
  if (upErr) { console.error(`    ✗ ${upErr.message}`); process.exit(1); }
}

if (COMMIT) {
  console.log('\nRunning audit to verify…');
  try { execSync('node scripts/audit-blog-stays.mjs', { stdio: 'inherit' }); }
  catch { console.error('Audit had errors'); process.exit(1); }
}
