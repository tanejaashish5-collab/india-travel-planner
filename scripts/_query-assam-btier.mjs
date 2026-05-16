import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const { data: dests } = await sb.from('destinations').select('id, name').eq('state_id', 'assam');

console.log(`Assam dests: ${dests.length}\n`);
const rows = [];
for (const d of dests) {
  const [gems, eats, stays] = await Promise.all([
    sb.from('hidden_gems').select('id', { count: 'exact', head: true }).eq('near_destination_id', d.id),
    sb.from('local_eateries').select('id', { count: 'exact', head: true }).eq('destination_id', d.id),
    sb.from('destination_stay_picks').select('destination_id', { count: 'exact', head: true }).eq('destination_id', d.id),
  ]);
  rows.push({ id: d.id, name: d.name, g: gems.count ?? 0, e: eats.count ?? 0, s: stays.count ?? 0 });
}

// Get used stay slots per dest so brief can specify available slots
for (const r of rows) {
  const { data: slotData } = await sb.from('destination_stay_picks').select('slot').eq('destination_id', r.id);
  r.usedSlots = (slotData || []).map(s => s.slot).sort();
  r.openSlots = ['experience','location','value','xfactor'].filter(s => !r.usedSlots.includes(s));
}

for (const r of rows.sort((a,b) => (a.g+a.e+a.s) - (b.g+b.e+b.s))) {
  const t = (r.g >= 3 && r.e >= 3 && r.s >= 3) ? 'A' : 'B';
  const slots = r.openSlots.length ? `open=[${r.openSlots.join(',')}]` : 'all-filled';
  console.log(`  ${t}  ${r.id.padEnd(22)} g=${String(r.g).padStart(2)} e=${String(r.e).padStart(2)} s=${String(r.s).padStart(2)}  ${slots}  — ${r.name}`);
}

// Also list existing eatery + gem names per dest to prevent duplicates
console.log('\n--- EXISTING NAMES (exclude from agent picks) ---');
for (const r of rows) {
  const { data: eatNames } = await sb.from('local_eateries').select('name').eq('destination_id', r.id);
  const { data: gemNames } = await sb.from('hidden_gems').select('name').eq('near_destination_id', r.id);
  const { data: stayNames } = await sb.from('destination_stay_picks').select('name, slot').eq('destination_id', r.id);
  if ((eatNames?.length || gemNames?.length || stayNames?.length) > 0) {
    console.log(`\n${r.id}:`);
    if (eatNames?.length) console.log(`  eats(${eatNames.length}): ${eatNames.map(x=>x.name).join(' | ')}`);
    if (gemNames?.length) console.log(`  gems(${gemNames.length}): ${gemNames.map(x=>x.name).join(' | ')}`);
    if (stayNames?.length) console.log(`  stays(${stayNames.length}): ${stayNames.map(x=>`[${x.slot}] ${x.name}`).join(' | ')}`);
  }
}
