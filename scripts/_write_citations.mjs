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

const note = 'weekly 2026-06-01';
const perplexityCheckedIds = [
  'btv-spiti-june','btv-ladakh-july','btv-kerala-monsoon','btv-rajasthan-summer',
  'btv-goa-december','btv-kashmir-april','btv-sikkim-october','btv-tawang-when',
  'btv-hampi-weather','btv-andaman-season'
];
const aioCheckedIds = [
  'btv-spiti-june','btv-ladakh-july','btv-kerala-monsoon','btv-rajasthan-summer',
  'btv-goa-december','btv-kashmir-april','btv-sikkim-october','btv-tawang-when',
  'btv-hampi-weather','btv-andaman-season','btv-rann-kutch','btv-varanasi-winter',
  'btv-pondicherry','btv-coorg-august','btv-mahabalipuram','btv-hornbill-festival'
];
// all cited=false this run
const rows = [];
for (const id of perplexityCheckedIds) rows.push({ query_id:id, engine:'perplexity', cited:false, note });
for (const id of aioCheckedIds) rows.push({ query_id:id, engine:'aio', cited:false, note });

console.log('inserting', rows.length, 'rows');
const { data, error } = await sb.from('ai_citations').insert(rows).select('id');
if (error) { console.error('ERR', JSON.stringify(error)); process.exit(1); }
console.log('OK inserted', (data||[]).length, 'rows');
