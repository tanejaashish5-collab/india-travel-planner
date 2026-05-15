import { createClient } from '@supabase/supabase-js';
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const { data: hg } = await sb.from('hidden_gems').select('*').limit(2);
console.log('hidden_gems columns:', Object.keys(hg[0] ?? {}).sort().join(', '));
console.log('hidden_gems sample id format:', hg.map(h => h.id));

const { data: le } = await sb.from('local_eateries').select('*').limit(1);
console.log('\nlocal_eateries columns:', Object.keys(le[0] ?? {}).sort().join(', '));

const { data: dsp } = await sb.from('destination_stay_picks').select('*').limit(1);
console.log('\ndestination_stay_picks columns:', Object.keys(dsp[0] ?? {}).sort().join(', '));

const { data: cats } = await sb.from('local_eateries').select('category');
console.log('\neatery category distinct:', [...new Set(cats.map(c => c.category))].sort());

const { data: slots } = await sb.from('destination_stay_picks').select('slot');
console.log('stay slot distinct:', [...new Set(slots.map(s => s.slot))].sort());

const { data: signs } = await sb.from('hidden_gems').select('confidence_score');
console.log('hidden_gems confidence_score range:', Math.min(...signs.map(s => s.confidence_score).filter(x => x != null)), '-', Math.max(...signs.map(s => s.confidence_score).filter(x => x != null)));
