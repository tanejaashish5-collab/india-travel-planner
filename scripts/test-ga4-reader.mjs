import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { config } from 'dotenv';
import path from 'node:path';

// Load env from apps/web/.env.local (where we put GA4_SERVICE_ACCOUNT_PATH)
config({ path: path.resolve(process.cwd(), 'apps/web/.env.local') });

const client = new BetaAnalyticsDataClient({
  keyFilename: process.env.GA4_SERVICE_ACCOUNT_PATH,
});

// Data API uses the GA4 property ID (534427362), NOT the stream ID (313909663).
const PROPERTY_ID = '534427362';

const [response] = await client.runReport({
  property: `properties/${PROPERTY_ID}`,
  dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
  metrics: [{ name: 'activeUsers' }, { name: 'engagedSessions' }],
});

console.log(JSON.stringify(response.rows, null, 2));
