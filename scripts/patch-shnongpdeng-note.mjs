import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});
const COMMIT = process.argv.includes('--commit');
const OLD = "organised operator (Pioneer, Shnongpdeng River Camp) only";
const NEW = "organised operator (Pioneer, Shnongpdeng Campsite) only";
const { data } = await s.from('destinations').select('solo_female_note').eq('id', 'shnongpdeng').maybeSingle();
if (!data?.solo_female_note?.includes(OLD)) { console.log('Find string absent — already patched.'); process.exit(0); }
console.log(`Found. Patch 'River Camp' → 'Campsite' (matches in-destination DB name).`);
if (!COMMIT) { console.log('DRY.'); process.exit(0); }
const { error } = await s.from('destinations').update({ solo_female_note: data.solo_female_note.replace(OLD, NEW) }).eq('id', 'shnongpdeng');
if (error) { console.error(error); process.exit(1); }
console.log('✓ Patched.');
