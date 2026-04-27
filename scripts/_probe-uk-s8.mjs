import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const try_slugs = ['landour','lansdowne','pithoragarh','munsiyari','champawat','chaukori','devprayag','rudraprayag','guptkashi','gopeshwar','uttarkashi','har-ki-doon','har-ki-dun','chakrata','corbett','corbett-national-park','jim-corbett','jim-corbett-national-park'];
const { data } = await s.from('destinations').select('id, name').in('id', try_slugs);
console.log('Found:', data?.length ?? 0);
data?.sort((a,b) => a.id.localeCompare(b.id)).forEach(d => console.log(`  ${d.id.padEnd(28)} ${d.name}`));

console.log('\nAll UK dests not yet covered (no eateries seeded):');
const { data: allUK } = await s.from('destinations').select('id, name').eq('state_id', 'uttarakhand').order('id');
const covered = ['rishikesh','mussoorie','nainital','haridwar','almora','ranikhet','kausani','mukteshwar','bhimtal','binsar','auli','joshimath','chopta','tungnath','dhanaulti','kanatal','tehri','badrinath','kedarnath','gangotri','yamunotri','hemkund-sahib','valley-of-flowers','roopkund'];
const remaining = allUK?.filter(d => !covered.includes(d.id));
console.log(`Remaining: ${remaining?.length ?? 0}`);
remaining?.forEach(d => console.log(`  ${d.id.padEnd(28)} ${d.name}`));
