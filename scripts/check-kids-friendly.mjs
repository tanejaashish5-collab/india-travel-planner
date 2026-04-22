import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

const { count: total } = await supabase.from('kids_friendly').select('*', { count: 'exact', head: true });
const { count: suitable } = await supabase.from('kids_friendly').select('*', { count: 'exact', head: true }).eq('suitable', true);
console.log(`kids_friendly rows: ${total}, suitable=true: ${suitable}`);

const { data: top } = await supabase.from('kids_friendly')
  .select('destination_id, suitable, rating, destinations:destination_id(name)')
  .eq('suitable', true)
  .order('rating', { ascending: false })
  .limit(35);
console.log('\nTop 35 by rating:');
for (const r of top || []) console.log(`  ${r.rating}/5  ${r.destination_id.padEnd(25)} ${r.destinations?.name || ''}`);
