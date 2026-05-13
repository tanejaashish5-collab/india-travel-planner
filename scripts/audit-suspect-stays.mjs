import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

// The 14 dests with suspect stays (S26b 11 Ashtavinayak/caves/umbrella + 3 cross-state catches)
const dests = [
  // S26b Pune Ashtavinayak
  'morgaon', 'theur', 'ranjangaon', 'ozar', 'lenyadri',
  // S26b non-Pune Ashtavinayak + caves + umbrella
  'siddhatek', 'pali-raigad', 'mahad-raigad', 'kanheri-caves', 'karla-bhaja-caves', 'astavinayak-circuit',
  // Cross-state catches (S24/S25)
  'alibaug', 'khandala', 'amboli',
];

for (const d of dests) {
  const { data } = await supabase
    .from('destination_stay_picks')
    .select('slot, name, property_type, price_band, why_nakshiq, source, confidence, sources')
    .eq('destination_id', d)
    .order('slot');
  console.log(`\n===== ${d} (${data?.length || 0} stays) =====`);
  for (const r of data || []) {
    const sources = typeof r.sources === 'string' ? r.sources : JSON.stringify(r.sources || []);
    console.log(`  ${r.slot.padEnd(11)} | ${r.name}`);
    console.log(`    ${(r.property_type || '').slice(0, 60)} | ${r.price_band}`);
    console.log(`    why: ${(r.why_nakshiq || '').slice(0, 140)}`);
    console.log(`    sources: ${sources.slice(0, 150)}`);
  }
}
