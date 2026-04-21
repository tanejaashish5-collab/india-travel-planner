import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

const COMMIT = process.argv.includes('--commit');
const slug = 'kashmir-for-solo-female-what-matters';
const OLD = `Sukoon Houseboat and Hotel Heevan are the reliable anchors for first-time solo.`;
const NEW = `Sukoon Houseboat and Taj Dal View are the reliable anchors for first-time solo.`;

const { data: row, error } = await supabase.from('articles').select('id, content').eq('slug', slug).single();
if (error) { console.error(error); process.exit(1); }
if (!row.content.includes(OLD)) {
  console.error('OLD string not found in DB content. Already patched or drifted.');
  process.exit(1);
}
const next = row.content.replace(OLD, NEW);
console.log(`Found in slug=${slug}. Diff: Hotel Heevan → Taj Dal View (cross-destination fix).`);
if (!COMMIT) { console.log('DRY run. Pass --commit to apply.'); process.exit(0); }
const { error: upErr } = await supabase.from('articles').update({ content: next, updated_at: new Date().toISOString() }).eq('slug', slug);
if (upErr) { console.error(upErr); process.exit(1); }
console.log('✓ Patched. Running strict audit…');
import('child_process').then(({ execSync }) => execSync('node scripts/audit-blog-stays.mjs --strict', { stdio: 'inherit' }));
