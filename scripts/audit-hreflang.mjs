#!/usr/bin/env node
/**
 * Sprint 19 / R4 §4 + R1 §3.2 — runtime hreflang + JSON-LD audit.
 *
 * Hits a handful of representative URLs and confirms:
 *   - <link rel="alternate" hreflang="en" ...> + hreflang="hi" both present
 *   - Organization JSON-LD with @id chain
 *   - WebSite + SearchAction JSON-LD (sitelinks search box)
 *   - Page-specific Article / TouristDestination / FAQPage / Event JSON-LD
 *
 * Usage:
 *   BASE=https://www.nakshiq.com node scripts/audit-hreflang.mjs
 *   BASE=http://localhost:3000 node scripts/audit-hreflang.mjs
 */
const BASE = process.env.BASE;
if (!BASE) {
  console.error("Set BASE env var. e.g. BASE=https://www.nakshiq.com node scripts/audit-hreflang.mjs");
  process.exit(2);
}

const URLS = [
  { path: "/en", expect: ["Organization", "WebSite", "SearchAction"] },
  { path: "/hi", expect: ["Organization", "WebSite", "SearchAction"] },
  { path: "/en/destination/manali", expect: ["TouristDestination", "FAQPage", "BreadcrumbList"] },
  { path: "/en/destination/manali/march", expect: ["Article", "FAQPage", "BreadcrumbList"] },
  { path: "/en/festivals/state/rajasthan/october", expect: ["ItemList", "Event"] },
  { path: "/en/about/team", expect: ["AboutPage", "Person"] },
  { path: "/en/press", expect: ["Dataset"] },
];

const checks = [];

for (const u of URLS) {
  const url = `${BASE}${u.path}`;
  let html = "";
  try {
    const res = await fetch(url, { headers: { "User-Agent": "NakshIQ-Audit/1" } });
    if (!res.ok) {
      checks.push({ url, status: "FAIL", reason: `HTTP ${res.status}` });
      continue;
    }
    html = await res.text();
  } catch (err) {
    checks.push({ url, status: "FAIL", reason: `fetch error: ${err.message}` });
    continue;
  }

  const result = { url, status: "OK", missing: [] };

  const hasEn = /<link[^>]+rel="alternate"[^>]+hreflang="en"/.test(html);
  const hasHi = /<link[^>]+rel="alternate"[^>]+hreflang="hi"/.test(html);
  if (!hasEn) result.missing.push("hreflang=en");
  if (!hasHi) result.missing.push("hreflang=hi");

  for (const expectedType of u.expect) {
    const re = new RegExp(`"@type"\\s*:\\s*"${expectedType}"`);
    if (!re.test(html)) result.missing.push(`@type=${expectedType}`);
  }

  if (result.missing.length > 0) result.status = "INCOMPLETE";
  checks.push(result);
}

let passed = 0;
let failed = 0;
for (const c of checks) {
  const tag = c.status === "OK" ? "✓" : c.status === "INCOMPLETE" ? "⚠" : "✗";
  console.log(`${tag} ${c.url}${c.missing && c.missing.length ? ` — missing: ${c.missing.join(", ")}` : ""}${c.reason ? ` — ${c.reason}` : ""}`);
  if (c.status === "OK") passed++;
  else failed++;
}

console.log(`\n${passed}/${checks.length} pages clean. ${failed} need attention.`);
process.exit(failed > 0 ? 1 : 0);
