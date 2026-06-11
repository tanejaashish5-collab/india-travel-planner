import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = fs.readFileSync('apps/web/.env.local', 'utf-8');
const parse = (k) => {
  const m = env.match(new RegExp(`^${k}="?([^"\\n]+)`, 'm'));
  return m ? m[1].replace(/\\n$/, '').trim() : null;
};
const url = parse('NEXT_PUBLIC_SUPABASE_URL');
const key = parse('SUPABASE_SERVICE_ROLE_KEY');
const sb = createClient(url, key);
const { data, error } = await sb
  .from('ai_citations')
  .select('query_id,engine,cited,ran_at,note')
  .gte('ran_at', new Date(Date.now() - 8*24*3600*1000).toISOString())
  .lt('ran_at', new Date(Date.now() - 6*24*3600*1000).toISOString());
if (error) { console.error(JSON.stringify(error)); process.exit(1); }
console.log(JSON.stringify({ count: data.length, rows: data }, null, 2));
