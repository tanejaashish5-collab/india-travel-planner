import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

const { data } = await supabase.from('local_eateries').select('category').limit(5000);
const counts = {};
for (const r of data || []) counts[r.category] = (counts[r.category] || 0) + 1;
console.log('Distinct categories in DB (count desc):');
for (const [k, v] of Object.entries(counts).sort((a,b)=>b[1]-a[1])) console.log(`  ${(k||'NULL').padEnd(20)} ${v}`);
