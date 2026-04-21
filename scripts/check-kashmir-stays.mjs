import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

const dests = ['srinagar', 'pahalgam', 'gulmarg', 'sonamarg'];
for (const id of dests) {
  const { data: ls } = await supabase.from('local_stays').select('name').eq('destination_id', id);
  const { data: sp } = await supabase.from('destination_stay_picks').select('name').eq('destination_id', id);
  console.log(`\n=== ${id} ===`);
  console.log('local_stays:', (ls||[]).map(r=>r.name));
  console.log('destination_stay_picks:', (sp||[]).map(r=>r.name));
}
