import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Get all Maharashtra dests + their gem/eat/stay counts
const { data: mhAll, error } = await supabase
  .from('destinations')
  .select('id, name, content_tier, region, subregion, place_type')
  .eq('state_id', 'maharashtra')
  .order('id');
if (error) { console.error(error); process.exit(1); }

console.log(`Maharashtra total: ${mhAll.length}`);
const rows = [];
for (const d of mhAll) {
  const [g, e, s] = await Promise.all([
    supabase.from('hidden_gems').select('id', { count: 'exact', head: true }).eq('near_destination_id', d.id),
    supabase.from('local_eateries').select('id', { count: 'exact', head: true }).eq('destination_id', d.id),
    supabase.from('destination_stay_picks').select('destination_id', { count: 'exact', head: true }).eq('destination_id', d.id),
  ]);
  rows.push({ id: d.id, name: d.name, tier: d.content_tier, region: d.region, subregion: d.subregion, place_type: d.place_type, g: g.count, e: e.count, s: s.count });
}

// Session-A: gems>=3 AND eats>=5 AND stays>=3
const sessionA = rows.filter(r => r.g >= 3 && r.e >= 5 && r.s >= 3);
const sessionB = rows.filter(r => !(r.g >= 3 && r.e >= 5 && r.s >= 3));
console.log(`\nSession-tier: A=${sessionA.length} B=${sessionB.length}`);

console.log(`\nAll 46 MH dests (sorted by region/subregion):`);
console.log('id'.padEnd(25), 'region'.padEnd(12), 'subregion'.padEnd(20), 'type'.padEnd(15), 'g e s');
for (const r of rows.sort((a, b) => (a.region || '').localeCompare(b.region || '') || (a.subregion || '').localeCompare(b.subregion || '') || a.id.localeCompare(b.id))) {
  const flip = (r.g >= 3 && r.e >= 5 && r.s >= 3) ? '✓A' : 'B';
  console.log(`${r.id.padEnd(25)} ${(r.region || '').padEnd(12)} ${(r.subregion || '').padEnd(20)} ${(r.place_type || '').padEnd(15)} ${r.g} ${r.e} ${r.s}  ${flip}`);
}
