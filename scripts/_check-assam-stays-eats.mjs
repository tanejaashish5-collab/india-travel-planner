import { createClient } from '@supabase/supabase-js';
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const assamDests = ['manas-national-park','charaideo','sivasagar','majuli','jorhat','haflong','kaziranga','guwahati'];

// Stays may live in destination_stays (not destination_stay_picks)
const { data: stays, error: e1 } = await sb.from('destination_stay_picks').select('destination_id, slot, name').in('destination_id', assamDests);
console.log('destination_stay_picks rows for Assam:', stays?.length, e1?.message ?? '');
console.log(stays);

// Alternate stays table?
const { data: alts, error: e2 } = await sb.from('local_stays').select('destination_id, name').in('destination_id', assamDests).limit(20);
console.log('\nlocal_stays for Assam:', alts?.length, e2?.message ?? '');
if (alts?.length) console.log(alts.slice(0, 5));

// Eats — Guwahati lists 9, charaideo lists 0
const { data: eats } = await sb.from('local_eateries').select('destination_id, name, category').in('destination_id', assamDests).order('destination_id');
console.log('\nlocal_eateries rows for Assam:', eats.length);
const byDest = {};
for (const r of eats) (byDest[r.destination_id] = byDest[r.destination_id] || []).push(r.name);
for (const [d, ns] of Object.entries(byDest)) console.log(`  ${d.padEnd(22)} ${ns.length}: ${ns.join(' | ')}`);

const { data: gems } = await sb.from('hidden_gems').select('near_destination_id, name').in('near_destination_id', assamDests);
console.log('\nhidden_gems rows for Assam:', gems.length);
for (const g of gems) console.log(`  ${g.near_destination_id}: ${g.name}`);
