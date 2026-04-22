import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

const { count } = await supabase.from('sub_destinations').select('*', { count: 'exact', head: true });
console.log(`Total sub_destinations: ${count}`);

// What hubs have the most sub-destinations already?
const { data: all } = await supabase.from('sub_destinations').select('parent_id');
const byParent = {};
for (const s of all || []) byParent[s.parent_id] = (byParent[s.parent_id] || 0) + 1;
const sorted = Object.entries(byParent).sort((a,b) => b[1] - a[1]);
console.log('\nTop-15 parents:');
for (const [p, c] of sorted.slice(0, 15)) console.log(`  ${c}  ${p}`);

// Check if candidates have sub-dests
const candidates = ['shimla','leh','manali','jaipur','udaipur','munnar','darjeeling','rishikesh','amritsar','mysore','varanasi','pondicherry'];
console.log('\nCandidate Tier-1 hubs current sub-dest count:');
for (const c of candidates) {
  console.log(`  ${c.padEnd(14)} ${byParent[c] || 0}`);
}

// Existing row for schema reference
const { data: sample } = await supabase.from('sub_destinations').select('*').limit(2);
console.log('\nSample rows:');
console.log(JSON.stringify(sample, null, 2));
