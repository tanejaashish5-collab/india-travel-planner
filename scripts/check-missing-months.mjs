import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

// Check Alchi, Almora specifically
for (const id of ['alchi', 'almora', 'alampur', 'alibaug']) {
  const { data } = await supabase.from('destinations').select('id, name, best_months, avoid_months').eq('id', id).maybeSingle();
  console.log(`${id}:`, data);
}

// Count how many destinations have empty best_months
const { count: empty } = await supabase.from('destinations').select('*', { count: 'exact', head: true }).or('best_months.is.null,best_months.eq.{}');
const { count: total } = await supabase.from('destinations').select('*', { count: 'exact', head: true });
console.log(`\n${empty} of ${total} destinations have NULL or empty best_months`);
