#!/usr/bin/env node
/**
 * Monthly price panel: the same Cleartrip hotels, priced ~5 weeks ahead, every month (founder go 2026-10-10).
 *
 *   node scripts/price-panel.mjs build        # (re)build data/cost-research/price-panel/panel.json from research files
 *   node scripts/price-panel.mjs run          # price every panel hotel for the next Wed night >= 35 days out
 *   node scripts/price-panel.mjs run --limit 5
 *
 * Why: Cleartrip prices 3-10 months ahead are one flat rack rate (78 of 123 hotels identical on every far night,
 * 2026-10-10), so a season curve cannot be measured in one sitting. A price ~5 weeks out is a live price. Taking it
 * every month for the same hotels builds a measured curve per place within a year; the tariff-based season model
 * (migration 103) is the stand-in until then. Free: own headless Chromium, no paid API, ~1 request/1.5 s.
 *
 * Output: data/cost-research/price-panel/<YYYY-MM>.json  {night, priced_at, results:[{dest, hotel, url, list, sale, status}]}
 * The headless browser must open https://www.cleartrip.com/hotels first (session cookies), else detail pages 403.
 * Prices are read only from this script's own request to each URL; nothing is estimated (null = not priced).
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "data/cost-research/price-panel";
const PANEL = path.join(DIR, "panel.json");
const [cmd = "run", ...rest] = process.argv.slice(2);
const limit = rest.includes("--limit") ? Number(rest[rest.indexOf("--limit") + 1]) : Infinity;

function build() {
  const panel = {};
  const add = (dest, hotel, url) => {
    const u = String(url ?? "").split("?")[0];
    if (!/^https:\/\/www\.cleartrip\.com\/hotels\/details\//.test(u)) return;
    const list = (panel[dest] ??= []);
    if (list.length < 3 && !list.some((h) => h.url === u)) list.push({ hotel: hotel ?? null, url: u });
  };
  // Season-curve probes first (named hotels with a recorded November price), then regional 3-star sources.
  const q = "data/cost-research/queue-2026-10-10";
  for (const f of fs.readdirSync(q).filter((f) => /^Q\d+\.json$/.test(f)).sort())
    for (const [d, v] of Object.entries(JSON.parse(fs.readFileSync(path.join(q, f), "utf8")).destinations ?? {}))
      for (const h of v.season_probe?.mid ?? []) if (h.prices?.["18-19 Nov 2026"]) add(d, h.hotel, h.url);
  for (const r of ["north", "west", "east", "south", "central-islands", "queue-load"]) {
    const dir = path.join("data/cost-research", r);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((f) => /^B\d+\.json$/.test(f)))
      for (const [d, v] of Object.entries(JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")).destinations ?? {}))
        for (const u of v.stay?.mid_sources ?? []) add(d, null, u);
  }
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(PANEL, JSON.stringify(panel, null, 1));
  console.log(`panel: ${Object.keys(panel).length} places, ${Object.values(panel).flat().length} hotels -> ${PANEL}`);
}

function nextNight(from = new Date()) {
  const d = new Date(from.getTime() + 35 * 86400e3);
  while (d.getUTCDay() !== 3) d.setUTCDate(d.getUTCDate() + 1); // Wednesday check-in, Thursday out
  const e = new Date(d.getTime() + 86400e3);
  const f = (x) => `${String(x.getUTCDate()).padStart(2, "0")}${String(x.getUTCMonth() + 1).padStart(2, "0")}${x.getUTCFullYear()}`;
  return { iso: d.toISOString().slice(0, 10), c: `${f(d)}|${f(e)}` };
}

async function run() {
  const panel = JSON.parse(fs.readFileSync(PANEL, "utf8"));
  const { chromium } = await import("playwright");
  const night = nextNight();
  const browser = await chromium.launch({ headless: true, args: ["--disable-blink-features=AutomationControlled"] });
  const ctx = await browser.newContext({ locale: "en-IN", viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("https://www.cleartrip.com/hotels", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  const results = [];
  let n = 0;
  for (const [dest, hotels] of Object.entries(panel)) {
    for (const h of hotels) {
      if (n++ >= limit) break;
      const url = `${h.url}?c=${night.c}&r=2,0`;
      let row = { dest, hotel: h.hotel, url: h.url, list: null, sale: null, status: null };
      try {
        const r = await ctx.request.get(url, { timeout: 30000 });
        const t = await r.text();
        row.status = r.status();
        // The response must be for the requested night: Cleartrip echoes the check-in date ("18 Nov'26").
        const dd = new Date(night.iso + "T00:00:00Z");
        const label = `${dd.getUTCDate()} ${dd.toLocaleString("en-GB", { month: "short", timeZone: "UTC" })}`;
        if (r.ok() && t.includes(label) && !/No rooms available/i.test(t.slice(0, 200000))) {
          // Header: list price, then sale price, then taxes (verified 2026-10-10 against 5 agent-recorded prices).
          const p = [...t.matchAll(/₹\s?([\d,]{3,7})/g)].slice(0, 3).map((m) => Number(m[1].replace(/,/g, "")));
          if (p.length >= 2) { row.list = p[0]; row.sale = p[1] <= p[0] ? p[1] : p[0]; }
        } else if (r.ok()) row.status = /No rooms available/i.test(t) ? "no rooms" : "date not echoed";
      } catch (e) { row.status = String(e).slice(0, 80); }
      results.push(row);
      await page.waitForTimeout(1500);
    }
  }
  await browser.close();
  const file = path.join(DIR, `${night.iso.slice(0, 7)}.json`);
  fs.writeFileSync(file, JSON.stringify({ night: night.iso, priced_at: new Date().toISOString(), results }, null, 1));
  const priced = results.filter((r) => r.sale).length;
  console.log(`${file}: ${priced}/${results.length} priced for the night of ${night.iso}`);
  // Total failure must be loud (an all-null run would otherwise look like a quiet month).
  if (results.length && priced / results.length < 0.2) { console.error("FAIL: under 20% priced (blocked or page format changed)"); process.exit(2); }
}

if (cmd === "build") build();
else await run();
