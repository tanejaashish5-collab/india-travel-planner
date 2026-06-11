import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { config } from 'dotenv';
import path from 'node:path';

config({ path: path.resolve(process.cwd(), 'apps/web/.env.local') });

const client = new BetaAnalyticsDataClient({
  keyFilename: process.env.GA4_SERVICE_ACCOUNT_PATH,
});
const PROPERTY_ID = process.env.GA4_PROPERTY_ID || '534427362';

const EVENTS = ['outbound_booking_click', 'outbound_experience_click'];
const START = '2026-01-01'; // wide window — effectively "since launch within GA4 retention"

function rows(r) { return r.rows || []; }

// 1) Totals + by-day for the two affiliate events
const [byDay] = await client.runReport({
  property: `properties/${PROPERTY_ID}`,
  dateRanges: [{ startDate: START, endDate: 'today' }],
  dimensions: [{ name: 'eventName' }, { name: 'date' }],
  metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
  dimensionFilter: {
    filter: { fieldName: 'eventName', inListFilter: { values: EVENTS } },
  },
  orderBys: [{ dimension: { dimensionName: 'date' } }],
});

const totals = {};
let grand = 0;
for (const row of rows(byDay)) {
  const ev = row.dimensionValues[0].value;
  const cnt = Number(row.metricValues[0].value);
  totals[ev] = (totals[ev] || 0) + cnt;
  grand += cnt;
}

console.log('=== AFFILIATE / OUTBOUND CLICK CHECK (since ' + START + ') ===\n');
console.log('TOTAL outbound clicks:', grand);
for (const ev of EVENTS) console.log('  ' + ev + ':', totals[ev] || 0);

console.log('\n--- By day ---');
if (rows(byDay).length === 0) {
  console.log('  (no events recorded)');
} else {
  for (const row of rows(byDay)) {
    console.log('  ' + row.dimensionValues[1].value + '  ' + row.dimensionValues[0].value.padEnd(28) + '  count=' + row.metricValues[0].value + '  users=' + row.metricValues[1].value);
  }
}

// 2) Breakdown by partner (custom event param) — may be empty if not registered as custom dimension
try {
  const [byPartner] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: START, endDate: 'today' }],
    dimensions: [{ name: 'eventName' }, { name: 'customEvent:partner' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: { fieldName: 'eventName', inListFilter: { values: EVENTS } },
    },
  });
  console.log('\n--- By partner (custom dim) ---');
  if (rows(byPartner).length === 0) {
    console.log('  (partner custom dimension not registered or no data)');
  } else {
    for (const row of rows(byPartner)) {
      console.log('  ' + row.dimensionValues[1].value.padEnd(20) + '  ' + row.dimensionValues[0].value.padEnd(28) + '  ' + row.metricValues[0].value);
    }
  }
} catch (e) {
  console.log('\n--- By partner ---\n  (custom dimension query failed: ' + e.message.split('\n')[0] + ')');
}
