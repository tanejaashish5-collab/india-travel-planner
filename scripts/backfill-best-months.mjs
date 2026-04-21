#!/usr/bin/env node
/**
 * Backfill destinations.best_months for rows where it's NULL or empty.
 * Source: destination_months — pick all months with score >= 4 (sorted desc).
 * If none score 4+, fall back to score 3 (the "marginal but OK" tier).
 * Skip destinations whose destination_months also has no 3+ scores.
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

const COMMIT = process.argv.includes('--commit');

const { data: empty } = await supabase.from('destinations').select('id, name').or('best_months.is.null,best_months.eq.{}');
console.log(`Found ${empty?.length ?? 0} destinations with empty best_months.`);

let patched = 0, skipped = 0;
for (const d of empty ?? []) {
  const { data: scores } = await supabase.from('destination_months')
    .select('month, score')
    .eq('destination_id', d.id)
    .order('score', { ascending: false })
    .order('month', { ascending: true });

  if (!scores || scores.length === 0) {
    console.log(`  ${d.id}: no destination_months rows — skip`);
    skipped++;
    continue;
  }

  const top = scores.filter(s => s.score >= 4).map(s => s.month);
  const bestMonths = top.length > 0 ? top : scores.filter(s => s.score >= 3).map(s => s.month);
  const avoidMonths = scores.filter(s => s.score <= 1).map(s => s.month);

  if (bestMonths.length === 0) {
    console.log(`  ${d.id}: no 3+ scoring months — skip`);
    skipped++;
    continue;
  }

  console.log(`  ${d.id} (${d.name}): best=[${bestMonths.join(',')}] avoid=[${avoidMonths.join(',')}]`);
  if (!COMMIT) continue;
  const { error } = await supabase.from('destinations').update({
    best_months: bestMonths,
    avoid_months: avoidMonths.length > 0 ? avoidMonths : null,
    content_reviewed_at: new Date().toISOString(),
  }).eq('id', d.id);
  if (error) { console.error(`    ✗ ${error.message}`); continue; }
  patched++;
}
console.log(`\n${COMMIT ? `Patched ${patched}` : 'DRY run'} — ${skipped} skipped. Pass --commit to apply.`);
