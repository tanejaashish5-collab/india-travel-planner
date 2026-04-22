import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

for (const t of ['viral_eats', 'local_legends']) {
  const { data } = await s.from(t).select('*').limit(1);
  const { count } = await s.from(t).select('*', { count: 'exact', head: true });
  console.log(`\n=== ${t} (${count} rows) ===`);
  if (data && data[0]) console.log('cols:', Object.keys(data[0]).join(', '));
}

// also sample a few viral_eats names
const { data: ve } = await s.from('viral_eats').select('destination_id, name').limit(8);
console.log('\nSample viral_eats names:');
for (const r of ve || []) console.log(`  ${r.destination_id.padEnd(20)} ${r.name}`);
