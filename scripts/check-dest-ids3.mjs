import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

for (const id of ['landour', 'lahaul-valley', 'keylong', 'mussoorie', 'pahalgam', 'pushkar', 'hampi', 'srinagar']) {
  const { data } = await supabase.from('destinations').select('id, name').eq('id', id).maybeSingle();
  console.log(`${id}:`, data || 'NOT FOUND');
}
