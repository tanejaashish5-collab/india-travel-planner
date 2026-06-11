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

// Prior Monday window
const { data: prior } = await sb
  .from('ai_citations')
  .select('query_id,engine,cited,ran_at,note')
  .gte('ran_at', new Date(Date.now() - 8*24*3600*1000).toISOString())
  .lt('ran_at', new Date(Date.now() - 6*24*3600*1000).toISOString());

// Pull all best-time-visit query_ids ever — for streak detection (last 4+ weeks zero)
const fourWeeksAgo = new Date(Date.now() - 30*24*3600*1000).toISOString();
const { data: history } = await sb
  .from('ai_citations')
  .select('query_id,engine,cited,ran_at,note')
  .gte('ran_at', fourWeeksAgo)
  .like('query_id', 'btv-%');

const priorSummary = { perplexity: { cited:0, total:0 }, aio: { cited:0, total:0 } };
const priorMap = {}; // `${qid}|${engine}` -> cited
for (const r of (prior||[])) {
  if (!priorSummary[r.engine]) continue;
  priorSummary[r.engine].total++;
  if (r.cited) priorSummary[r.engine].cited++;
  priorMap[`${r.query_id}|${r.engine}`] = r.cited;
}

// Streak: per (qid,engine), count consecutive weekly runs where cited=false going back
const byKey = {};
for (const r of (history||[])) {
  const k = `${r.query_id}|${r.engine}`;
  byKey[k] ||= [];
  byKey[k].push(r);
}
const stale = [];
for (const [k, rows] of Object.entries(byKey)) {
  rows.sort((a,b) => new Date(b.ran_at) - new Date(a.ran_at));
  const allFalse = rows.length >= 4 && rows.every(r => !r.cited);
  if (allFalse) stale.push({ key:k, runs: rows.length });
}

console.log(JSON.stringify({
  priorRunCount: (prior||[]).length,
  priorSummary,
  priorMap,
  staleZeroKeys: stale,
}, null, 2));
