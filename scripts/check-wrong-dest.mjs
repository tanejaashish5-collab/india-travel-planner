import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

const names = ['Hotel Dekyid', 'Hotel Tashi Delek', 'Rokeby Manor', 'Padma Guest House', 'Hotel Heevan', 'Moustache Hostel'];
for (const n of names) {
  const { data: ls } = await supabase.from('local_stays').select('destination_id, name').ilike('name', `%${n}%`);
  const { data: sp } = await supabase.from('destination_stay_picks').select('destination_id, name').ilike('name', `%${n}%`);
  console.log(`\n"${n}":`);
  console.log('  local_stays:', ls);
  console.log('  destination_stay_picks:', sp);
}
