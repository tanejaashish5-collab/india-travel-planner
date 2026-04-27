import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const slugs = ['auli','joshimath','chopta','tungnath','dhanaulti','kanatal','tehri','tehri-lake','new-tehri','tehri-garhwal','tungnath-chopta'];
const { data } = await s.from('destinations').select('id, name, state_id').in('id', slugs);
console.log('Found:', data?.length ?? 0);
data?.forEach(d => console.log(`  ${d.id.padEnd(20)} ${d.name}`));

console.log('\nAll UK dests with "tehri" or "chopta" in id:');
const { data: fuzzy } = await s.from('destinations').select('id, name').eq('state_id', 'uttarakhand').or('id.ilike.*tehri*,id.ilike.*chopta*,id.ilike.*tungnath*,id.ilike.*auli*');
fuzzy?.forEach(d => console.log(`  ${d.id.padEnd(25)} ${d.name}`));
