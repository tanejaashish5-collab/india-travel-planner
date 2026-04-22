import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

for (const t of ['destinations', 'articles']) {
  const { data } = await s.from(t).select('*').limit(1);
  const cols = Object.keys(data[0]);
  const hasReviewed = cols.includes('content_reviewed_at');
  const hasUpdated = cols.includes('updated_at');
  console.log(`${t}: content_reviewed_at=${hasReviewed}  updated_at=${hasUpdated}`);
}
