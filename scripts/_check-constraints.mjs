import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// Try to read pg_constraint via RPC (may need direct SQL)
const { data, error } = await sb.rpc('exec_sql_readonly', { sql: `
  SELECT conname, pg_get_constraintdef(oid) AS def
  FROM pg_constraint
  WHERE conrelid = 'destinations'::regclass AND contype='c'
  ORDER BY conname
` }).catch(e => ({ data: null, error: e }));
if (data) {
  console.log(JSON.stringify(data, null, 2));
} else {
  console.log('RPC unavailable, error:', error?.message);
  // Fallback: try directly
  // Just probe with a trial UPDATE
  for (const v of ['balanced','moderate','quiet','calm','medium','low']) {
    const { error: tErr } = await sb.from('destinations').update({ crowd_level: v }).eq('id', 'NONEXIST_PROBE');
    console.log(`crowd_level='${v}' result:`, tErr?.message || 'no error (would update if id matched)');
  }
}
