import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

const dests = ['astavinayak-circuit','morgaon','theur','ranjangaon','ozar','lenyadri','siddhatek','pali-raigad','mahad-raigad','kanheri-caves','karla-bhaja-caves'];
for (const d of dests) {
  const { data } = await supabase.from('destination_stay_picks').select('slot, name').eq('destination_id', d).order('slot');
  if (!data?.length) { console.log(`${d.padEnd(18)} (no existing stays)`); continue; }
  console.log(`${d.padEnd(18)} existing slots: [${data.map(r=>r.slot).join(', ')}]`);
  for (const r of data) console.log(`    ${r.slot.padEnd(12)} = ${r.name}`);
}
