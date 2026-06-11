import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { config } from 'dotenv';
import path from 'node:path';
config({ path: path.resolve(process.cwd(), 'apps/web/.env.local') });
const client = new BetaAnalyticsDataClient({ keyFilename: process.env.GA4_SERVICE_ACCOUNT_PATH });
const PROPERTY_ID = process.env.GA4_PROPERTY_ID || '534427362';
const EVENTS = ['outbound_booking_click','outbound_experience_click'];
const FILTER = { filter: { fieldName:'eventName', inListFilter:{ values: EVENTS } } };
const RANGE = [{ startDate:'2026-05-24', endDate:'today' }]; // real-human window only

async function report(title, dims, extraMetrics=[]) {
  const [r] = await client.runReport({
    property:`properties/${PROPERTY_ID}`, dateRanges:RANGE,
    dimensions:dims.map(name=>({name})),
    metrics:[{name:'eventCount'},...extraMetrics.map(name=>({name}))],
    dimensionFilter:FILTER,
    orderBys:[{ metric:{ metricName:'eventCount' }, desc:true }],
    limit: 50,
  });
  console.log('\n=== '+title+' ===');
  if(!(r.rows||[]).length){ console.log('  (none)'); return; }
  for(const row of r.rows){
    console.log('  '+row.dimensionValues.map(d=>d.value).join('  |  ')+'   →  '+row.metricValues.map(m=>m.value).join(' / '));
  }
}

console.log('Window: 2026-05-24 → today | events:', EVENTS.join(', '));
await report('By geography (country | region | city)', ['country','region','city']);
await report('By page where clicked (eventName | pagePath)', ['eventName','pagePath']);
await report('By date + city', ['date','city']);
