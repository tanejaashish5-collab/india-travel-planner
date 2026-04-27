import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const try_slugs = ['badrinath','kedarnath','gangotri','yamunotri','hemkund','hemkund-sahib','valley-of-flowers','valley-of-the-flowers','roopkund','roopkund-trek'];
const { data } = await s.from('destinations').select('id, name').in('id', try_slugs);
console.log('Found:', data?.length ?? 0);
data?.forEach(d => console.log(`  ${d.id.padEnd(25)} ${d.name}`));

console.log('\nFuzzy match across UK:');
const { data: fuzzy } = await s.from('destinations').select('id, name').eq('state_id', 'uttarakhand').or('id.ilike.*hemkund*,id.ilike.*valley*,id.ilike.*roopkund*,id.ilike.*char*,id.ilike.*dham*,id.ilike.*kund*,id.ilike.*flower*');
fuzzy?.forEach(d => console.log(`  ${d.id.padEnd(25)} ${d.name}`));
