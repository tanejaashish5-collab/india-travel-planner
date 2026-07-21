import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = fs.readFileSync('apps/web/.env.local', 'utf-8');
const parse = (k) => {
  const m = env.match(new RegExp(`^${k}="?([^"\\n]+)`, 'm'));
  return m ? m[1].replace(/\\n$/, '').trim() : null;
};
const sb = createClient(parse('NEXT_PUBLIC_SUPABASE_URL'), parse('SUPABASE_SERVICE_ROLE_KEY'));
const { data, error } = await sb.from('ai_citations').select('query_id,engine,cited,note,ran_at').like('query_id','btv-%').order('ran_at',{ascending:true});
if (error) { console.error(error); process.exit(1); }
const byNote = {};
for (const r of data) {
  byNote[r.note] ||= { total: 0, cited: 0, minDate: r.ran_at };
  byNote[r.note].total++;
  if (r.cited) byNote[r.note].cited++;
}
console.log('total rows', data.length);
console.log(JSON.stringify(byNote, null, 2));
const anyCited = data.filter(r => r.cited);
console.log('rows ever cited=true:', anyCited.length, JSON.stringify(anyCited));
