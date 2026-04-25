#!/usr/bin/env node
/**
 * log-citation-baseline-2026-04-24.mjs - one-time script to log the
 * 34 citation checks done during Sprint 7b follow-up session on 2026-04-24.
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: 'apps/web/.env.local' });

const BTV_PROMPTS = [
  'btv-spiti-june', 'btv-ladakh-july', 'btv-kerala-monsoon',
  'btv-rajasthan-summer', 'btv-goa-december', 'btv-kashmir-april',
  'btv-sikkim-october', 'btv-tawang-when', 'btv-hampi-weather',
  'btv-andaman-season', 'btv-rann-kutch', 'btv-varanasi-winter',
  'btv-hampi-may', 'btv-pondicherry', 'btv-coorg-august',
  'btv-mahabalipuram', 'btv-hornbill-festival',
];

const ENGINES_MEASURED = ['perplexity', 'aio'];
const BASELINE_NOTE = 'baseline 2026-04-24';

function supa() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}

async function main() {
  const sb = supa();
  const { data: existing, error: checkErr } = await sb
    .from('ai_citations')
    .select('query_id, engine')
    .eq('note', BASELINE_NOTE);
  if (checkErr) {
    console.error('check failed: ' + checkErr.message);
    process.exit(1);
  }
  const existingKeys = new Set(
    (existing ?? []).map((r) => r.query_id + ':' + r.engine)
  );

  const rows = [];
  for (const query_id of BTV_PROMPTS) {
    for (const engine of ENGINES_MEASURED) {
      const key = query_id + ':' + engine;
      if (existingKeys.has(key)) continue;
      rows.push({ query_id, engine, cited: false, note: BASELINE_NOTE });
    }
  }

  if (rows.length === 0) {
    console.log('Baseline already logged (' + existingKeys.size + ' rows). Nothing to do.');
    process.exit(0);
  }

  console.log('Inserting ' + rows.length + ' baseline rows...');
  const { error: insertErr } = await sb.from('ai_citations').insert(rows);
  if (insertErr) {
    console.error('insert failed: ' + insertErr.message);
    process.exit(1);
  }
  console.log('baseline logged: ' + rows.length + ' rows');
}

main();
