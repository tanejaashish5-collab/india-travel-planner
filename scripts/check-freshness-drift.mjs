import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

// Rows where updated_at > content_reviewed_at (content changed after last review)
const { data } = await s.from('destinations').select('id, name, updated_at, content_reviewed_at');
const drift = (data || []).filter(r => {
  if (!r.content_reviewed_at) return !!r.updated_at;
  return new Date(r.updated_at) > new Date(r.content_reviewed_at);
});
const neverReviewed = (data || []).filter(r => !r.content_reviewed_at);
console.log(`Total destinations: ${data?.length}`);
console.log(`updated_at > content_reviewed_at: ${drift.length} (out of sync — review stamp is stale)`);
console.log(`content_reviewed_at IS NULL: ${neverReviewed.length} (never reviewed)`);

const recentDrift = drift.filter(r => {
  const age = Date.now() - new Date(r.updated_at).getTime();
  return age < 24 * 60 * 60 * 1000;  // updated in last 24h
});
console.log(`\nDrifted in last 24h (today's rewrites): ${recentDrift.length}`);
for (const r of recentDrift.slice(0, 5)) {
  console.log(`  ${r.id.padEnd(25)} updated=${r.updated_at?.slice(0,19)} reviewed=${r.content_reviewed_at?.slice(0,19) || 'NULL'}`);
}
if (recentDrift.length > 5) console.log(`  ... +${recentDrift.length - 5} more`);
