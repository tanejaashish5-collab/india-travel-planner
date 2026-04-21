import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const tables = [
  'destinations',
  'confidence_cards',
  'kids_friendly',
  'destination_months',
  'local_legends',
  'viral_eats',
  'hidden_gems',
  'festivals',
  'local_stays',
  'points_of_interest',
  'sub_destinations',
  'traveler_notes',
  'permits',
  'camping_spots',
];

for (const t of tables) {
  const { count } = await sb.from(t).select('*', { count: 'exact', head: true });
  console.log(`${t.padEnd(28)} ${count ?? '—'}`);
}

// How many UNIQUE destinations have rows in each scoped table
console.log('\n--- Coverage per destination (488 total) ---');
const scoped = [
  ['confidence_cards', 'destination_id'],
  ['kids_friendly', 'destination_id'],
  ['local_legends', 'destination_id'],
  ['viral_eats', 'destination_id'],
  ['hidden_gems', 'near_destination_id'],
  ['festivals', 'destination_id'],
  ['local_stays', 'destination_id'],
  ['points_of_interest', 'destination_id'],
  ['sub_destinations', 'parent_id'],
];
for (const [t, col] of scoped) {
  const { data } = await sb.from(t).select(col);
  const unique = new Set((data ?? []).map(r => r[col]).filter(Boolean));
  console.log(`${t.padEnd(28)} ${unique.size} / 488 destinations`);
}

// Destinations missing each table
const { data: allDests } = await sb.from('destinations').select('id, name');
const totalDests = allDests.length;
console.log(`\n--- ${totalDests} destinations total ---`);

const missing = {};
for (const [t, col] of scoped) {
  const { data } = await sb.from(t).select(col);
  const withData = new Set((data ?? []).map(r => r[col]).filter(Boolean));
  const missingDests = allDests.filter(d => !withData.has(d.id));
  missing[t] = missingDests.length;
}
console.log('\n--- Destinations MISSING each table ---');
for (const [t, count] of Object.entries(missing)) {
  console.log(`${t.padEnd(28)} ${count} missing`);
}
