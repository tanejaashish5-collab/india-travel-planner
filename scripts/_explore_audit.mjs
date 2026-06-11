#!/usr/bin/env node
/* eslint-disable no-console */
// Audit script to assess eateries + stays coverage across all destinations.
// Generates state-level coverage tables and north-India destination list.

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env from apps/web/.env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
config({ path: path.join(ROOT, 'apps/web/.env.local') });

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function audit() {
  console.log('🚀 Starting coverage audit...\n');

  // Fetch all destinations with their states
  const { data: destinations, error: destError } = await sb
    .from('destinations')
    .select('id, name, state_id, place_type, content_tier');

  if (destError) {
    console.error('Error fetching destinations:', destError);
    process.exit(1);
  }

  console.log(`Total destinations: ${destinations.length}`);

  // Group by state_id
  const byState = {};
  destinations.forEach(d => {
    if (!byState[d.state_id]) {
      byState[d.state_id] = [];
    }
    byState[d.state_id].push(d);
  });

  // Fetch all eateries (map destination_id -> count)
  const { data: eateries, error: eatError } = await sb
    .from('local_eateries')
    .select('destination_id');

  if (eatError) {
    console.error('Error fetching eateries:', eatError);
    process.exit(1);
  }

  const eateriesByDest = {};
  eateries.forEach(e => {
    eateriesByDest[e.destination_id] = (eateriesByDest[e.destination_id] || 0) + 1;
  });

  // Fetch all stays
  const { data: stays, error: stayError } = await sb
    .from('local_stays')
    .select('destination_id, is_pick');

  if (stayError) {
    console.error('Error fetching stays:', stayError);
    process.exit(1);
  }

  const staysByDest = {};
  const stayPicksByDest = {};
  stays.forEach(s => {
    staysByDest[s.destination_id] = (staysByDest[s.destination_id] || 0) + 1;
    if (s.is_pick) {
      stayPicksByDest[s.destination_id] = (stayPicksByDest[s.destination_id] || 0) + 1;
    }
  });

  // Fetch POIs for coverage calc
  const { data: pois, error: poiError } = await sb
    .from('local_pois')
    .select('destination_id');

  if (poiError) {
    console.error('Error fetching POIs:', poiError);
    process.exit(1);
  }

  const poisByDest = {};
  pois.forEach(p => {
    poisByDest[p.destination_id] = (poisByDest[p.destination_id] || 0) + 1;
  });

  // Build state coverage table
  console.log('\n=== STATE COVERAGE TABLE ===');
  console.log(
    'State ID'.padEnd(25) +
    'Total Dests'.padEnd(15) +
    'Eateries (%)'.padEnd(15) +
    'Stays (%)'.padEnd(15) +
    'Stay Picks (%)'.padEnd(15) +
    'POIs (%)'
  );
  console.log('-'.repeat(95));

  const stateRows = [];
  Object.entries(byState).forEach(([stateId, dests]) => {
    const total = dests.length;
    const withEateries = dests.filter(d => eateriesByDest[d.id]).length;
    const withStays = dests.filter(d => staysByDest[d.id]).length;
    const withStayPicks = dests.filter(d => stayPicksByDest[d.id]).length;
    const withPois = dests.filter(d => poisByDest[d.id]).length;

    const eateriesPct = ((withEateries / total) * 100).toFixed(1);
    const staysPct = ((withStays / total) * 100).toFixed(1);
    const stayPicksPct = ((withStayPicks / total) * 100).toFixed(1);
    const poisPct = ((withPois / total) * 100).toFixed(1);

    console.log(
      stateId.padEnd(25) +
      String(total).padEnd(15) +
      (eateriesPct + '%').padEnd(15) +
      (staysPct + '%').padEnd(15) +
      (stayPicksPct + '%').padEnd(15) +
      (poisPct + '%')
    );

    stateRows.push({
      stateId,
      total,
      withEateries,
      withStays,
      withStayPicks,
      withPois,
      eateriesCount: withEateries,
      staysCount: withStays,
    });
  });

  // Top 10 destinations by eatery count
  console.log('\n=== TOP 10 DESTINATIONS BY EATERY COUNT ===');
  const destEateryCounts = destinations
    .map(d => ({
      ...d,
      eateryCount: eateriesByDest[d.id] || 0,
    }))
    .sort((a, b) => b.eateryCount - a.eateryCount)
    .slice(0, 10);

  console.log('Destination'.padEnd(30) + 'State'.padEnd(20) + 'Eateries');
  console.log('-'.repeat(60));
  destEateryCounts.forEach(d => {
    console.log(
      d.name.padEnd(30) +
      (d.state_id || '').padEnd(20) +
      String(d.eateryCount)
    );
  });

  // Top 10 destinations by stay count
  console.log('\n=== TOP 10 DESTINATIONS BY STAY COUNT ===');
  const destStayCounts = destinations
    .map(d => ({
      ...d,
      stayCount: staysByDest[d.id] || 0,
    }))
    .sort((a, b) => b.stayCount - a.stayCount)
    .slice(0, 10);

  console.log('Destination'.padEnd(30) + 'State'.padEnd(20) + 'Stays');
  console.log('-'.repeat(60));
  destStayCounts.forEach(d => {
    console.log(
      d.name.padEnd(30) +
      (d.state_id || '').padEnd(20) +
      String(d.stayCount)
    );
  });

  // NORTH INDIA FILTER
  const northStates = new Set([
    'jammu-kashmir',
    'ladakh',
    'himachal-pradesh',
    'uttarakhand',
    'punjab',
    'haryana',
    'delhi',
    'chandigarh',
    'rajasthan',
    'uttar-pradesh',
  ]);

  const northDests = destinations.filter(d => northStates.has(d.state_id));
  northDests.sort((a, b) => {
    if (a.state_id !== b.state_id) return a.state_id.localeCompare(b.state_id);
    return a.name.localeCompare(b.name);
  });

  // Write north-dests-audit.txt
  let northOutput = '';
  northOutput += `NORTH INDIA DESTINATIONS AUDIT\n`;
  northOutput += `Generated: ${new Date().toISOString()}\n`;
  northOutput += `Total north destinations: ${northDests.length}\n\n`;
  northOutput +=
    'ID'.padEnd(30) +
    'Name'.padEnd(35) +
    'State'.padEnd(20) +
    'Type'.padEnd(15) +
    'Tier'.padEnd(12) +
    'Eateries'.padEnd(12) +
    'Stays\n';
  northOutput += '-'.repeat(154) + '\n';

  northDests.forEach(d => {
    northOutput +=
      (d.id || '').padEnd(30) +
      (d.name || '').padEnd(35) +
      (d.state_id || '').padEnd(20) +
      (d.place_type || '').padEnd(15) +
      (d.content_tier || '').padEnd(12) +
      String(eateriesByDest[d.id] || 0).padEnd(12) +
      String(staysByDest[d.id] || 0) +
      '\n';
  });

  fs.writeFileSync('/tmp/north-dests-audit.txt', northOutput);
  console.log(`\n✅ Wrote /tmp/north-dests-audit.txt (${northDests.length} north destinations)`);

  // Summary
  const northWithEateries = northDests.filter(d => eateriesByDest[d.id]).length;
  const northWithStays = northDests.filter(d => staysByDest[d.id]).length;
  console.log(
    `\n📊 North India: ${northDests.length} destinations | ${northWithEateries} with eateries (${((northWithEateries / northDests.length) * 100).toFixed(1)}%) | ${northWithStays} with stays (${((northWithStays / northDests.length) * 100).toFixed(1)}%)`
  );

  process.exit(0);
}

audit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
