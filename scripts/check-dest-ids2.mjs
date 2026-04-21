import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

for (const q of ['Landour', 'Lahaul', 'Keylong', 'Mussoorie', 'Pahalgam', 'Pushkar', 'Hampi']) {
  const { data } = await supabase.from('destinations').select('id, name, state').ilike('name', `%${q}%`);
  console.log(`\n"${q}":`, data);
}
