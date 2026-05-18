#!/usr/bin/env node
/* eslint-disable no-console */
// Quick audit — what event names are firing in GA4 last 28 days, and
// (separately) what is being counted as a Key event.
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config: dotenvConfig } = await import("dotenv");
dotenvConfig({ path: path.join(ROOT, "apps", "web", ".env.local") });

const PROP = process.env.GA4_PROPERTY_ID;
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS.startsWith("/")) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(ROOT, process.env.GOOGLE_APPLICATION_CREDENTIALS);
}

const { BetaAnalyticsDataClient } = await import("@google-analytics/data");
const client = new BetaAnalyticsDataClient();

const daysAgo = (n) => { const d = new Date(); d.setUTCDate(d.getUTCDate() - n); return d.toISOString().slice(0, 10); };
const today = () => new Date().toISOString().slice(0, 10);

const wanted = [
  "email_signup",
  "save_destination",
  "share_click",
  "outbound_booking_click",
  "scroll_75_destination",
  "newsletter_view",
  "newsletter_attempt",
  "newsletter_error",
];

// 1) Top events by count + their isKeyEvent status
const [resp] = await client.runReport({
  property: `properties/${PROP}`,
  dimensions: [{ name: "eventName" }, { name: "isKeyEvent" }],
  metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
  dateRanges: [{ startDate: daysAgo(28), endDate: today() }],
  orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  limit: 100,
});

console.log("\nAll events fired in last 28d (with Key-event flag):\n");
console.log("  " + "Event".padEnd(35) + "Key?  " + "Count".padStart(10) + "  " + "Users".padStart(8));
console.log("  " + "─".repeat(70));
const flag = (v) => v === "true" ? " ✓  " : "    ";
let totalEvents = 0;
const seen = new Set();
for (const r of resp.rows ?? []) {
  const name = r.dimensionValues[0].value;
  const isKey = r.dimensionValues[1].value;
  const count = Number(r.metricValues[0].value);
  const users = Number(r.metricValues[1].value);
  totalEvents += count;
  seen.add(name);
  console.log("  " + name.padEnd(35) + flag(isKey) + String(count).padStart(10) + "  " + String(users).padStart(8));
}
console.log("  " + "─".repeat(70));
console.log("  TOTAL events: " + totalEvents.toLocaleString());

console.log("\n\nWanted key-event names: which fired, which didn't:\n");
for (const w of wanted) {
  const hit = seen.has(w);
  console.log("  " + (hit ? "✓ FIRING" : "✗ NOT FOUND") + "  " + w);
}
