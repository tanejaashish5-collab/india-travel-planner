import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

// Rows where updated_at > content_reviewed_at (content changed after last review).
// 21-day grace window mirrors the cron: a verified-data backfill bumps
// updated_at but only counts as editorial review-debt once it has gone
// unreviewed for >21 days (see api/cron/freshness-drift/route.ts).
const GRACE_MS = 21 * 24 * 60 * 60 * 1000;
const graceCutoff = Date.now() - GRACE_MS;
const oldEnough = (ts) => !!ts && new Date(ts).getTime() < graceCutoff;
const { data } = await s.from('destinations').select('id, name, updated_at, content_reviewed_at');
const drift = (data || []).filter(r =>
  r.content_reviewed_at && r.updated_at &&
  new Date(r.updated_at) > new Date(r.content_reviewed_at) && oldEnough(r.updated_at));
const neverReviewed = (data || []).filter(r => !r.content_reviewed_at && oldEnough(r.updated_at));
console.log(`Total destinations: ${data?.length}`);
console.log(`updated_at > content_reviewed_at (>21d unreviewed): ${drift.length} (real review debt)`);
console.log(`content_reviewed_at IS NULL (>21d old): ${neverReviewed.length} (never reviewed)`);

const recentDrift = drift.filter(r => {
  const age = Date.now() - new Date(r.updated_at).getTime();
  return age < 24 * 60 * 60 * 1000;  // updated in last 24h
});
console.log(`\nDrifted in last 24h (today's rewrites): ${recentDrift.length}`);
for (const r of recentDrift.slice(0, 5)) {
  console.log(`  ${r.id.padEnd(25)} updated=${r.updated_at?.slice(0,19)} reviewed=${r.content_reviewed_at?.slice(0,19) || 'NULL'}`);
}
if (recentDrift.length > 5) console.log(`  ... +${recentDrift.length - 5} more`);
