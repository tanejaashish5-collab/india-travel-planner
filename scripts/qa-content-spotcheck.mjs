#!/usr/bin/env node
// Phase 8 of the deep-QA pass. Read-only content spot-check.
//
// For 30 stratified destinations: fetch live page, scan rendered HTML for:
//   - At least 3 stay-section headings/cards
//   - At least 3 eatery-section headings/cards
//   - SOS phone numbers in valid Indian formats (10-digit mobile or 100/101/102/108/112)
//   - Soft-404 markers (NEXT_HTTP_ERROR_FALLBACK, "Lost in the mountains")
//
// Outputs: qa/findings/2026-05-04-deep/phase-08-content.json

import fs from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "https://www.nakshiq.com";

const SLUGS = [
  // Tier-1 marquee
  "varanasi", "jaipur", "leh", "manali", "shimla", "udaipur", "darjeeling",
  "panaji", "munnar", "binsar", "kaza", "spiti-valley",
  // Tier-2 hand-curated
  "tawang", "dharamshala", "rishikesh", "valley-of-flowers", "auli", "gangtok",
  "ziro-valley", "shillong", "khajuraho", "alleppey",
  // Tier-3 long-tail
  "ravangla", "phawngpui-peak", "majuli", "mawlynnong", "mechuka", "dzukou-valley",
  // Edge
  "agra", "delhi",
];

const SOFT_404_RE = /NEXT_HTTP_ERROR_FALLBACK|Lost in the mountains/i;

// Indian mobile: 10 digits starting 6/7/8/9, optionally +91 prefix.
// Or national emergency: 100, 101, 102, 108, 112.
const SOS_NUMBER_RE = /(\+?91[- ]?)?[6-9]\d{9}|\b10[012]\b|\b108\b|\b112\b/g;

// Stay/eatery section markers — look for the section heading patterns the
// destination-detail.tsx component renders.
function countSection(html, headingPattern, itemPattern) {
  const headingMatch = html.match(headingPattern);
  if (!headingMatch) return 0;
  // Take the first 8000 chars after the heading and count item matches there.
  const start = headingMatch.index + headingMatch[0].length;
  const slice = html.slice(start, start + 12_000);
  const items = slice.match(itemPattern) || [];
  return items.length;
}

const result = {
  phase: 8,
  name: "content-correctness-spotcheck",
  started_utc: new Date().toISOString(),
  sample_size: SLUGS.length,
  destinations: [],
  summary: {
    fully_passing: 0,
    soft_404s: [],
    fetch_errors: [],
    stays_below_3: [],
    eateries_below_3: [],
    sos_phones_invalid_format: [],
    sos_phones_count_total: 0,
  },
};

async function fetchPage(slug) {
  const url = `${BASE}/en/destination/${slug}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    return { ok: res.ok, status: res.status, text: await res.text(), url };
  } catch (e) {
    return { ok: false, status: 0, text: "", url, error: String(e) };
  }
}

(async () => {
  for (const slug of SLUGS) {
    process.stderr.write(`  ${slug.padEnd(24)} `);
    const page = await fetchPage(slug);
    if (!page.ok) {
      process.stderr.write(`HTTP ${page.status}\n`);
      result.summary.fetch_errors.push({ slug, http: page.status });
      result.destinations.push({ slug, ok: false, http: page.status });
      continue;
    }

    if (SOFT_404_RE.test(page.text) && page.text.length < 100_000) {
      process.stderr.write(`SOFT-404 (${page.text.length} bytes)\n`);
      result.summary.soft_404s.push({ slug, http: page.status, size: page.text.length });
      result.destinations.push({ slug, ok: false, soft_404: true, http: page.status });
      continue;
    }

    // Stays: section heading "The stay decisions worth flagging in <Dest>"
    // is rendered before the stay cards (each <h3 class="text-lg font-semibold leading-tight">).
    // Eateries: section heading "Food & Dining" precedes the cards.
    const staysCount = countSection(
      page.text,
      /The stay decisions worth flagging/i,
      /<h3 class="text-lg font-semibold leading-tight text-foreground">/g,
    );
    const eateriesCount = countSection(
      page.text,
      /Food &amp; Dining/i,
      /<h3[^>]*class="[^"]*font-semibold/g,
    );

    // SOS — extract all numbers, validate format.
    // We look only inside an Emergency-SOS section to avoid catching unrelated
    // numbers (lat/lng, coordinates, year stamps).
    const sosSection = (() => {
      const m = page.text.match(/Emergency SOS[\s\S]{0,8000}/);
      return m ? m[0] : "";
    })();
    const sosNumbers = sosSection.match(SOS_NUMBER_RE) || [];
    const validSosNumbers = sosNumbers.filter((n) => {
      const cleaned = n.replace(/\D/g, "");
      return /^91?[6-9]\d{9}$/.test(cleaned) || /^(100|101|102|108|112)$/.test(cleaned);
    });

    const row = {
      slug,
      ok: true,
      http: page.status,
      size_bytes: page.text.length,
      stays_section_card_signals: staysCount,
      eateries_section_card_signals: eateriesCount,
      sos_section_present: sosSection.length > 0,
      sos_numbers_total: sosNumbers.length,
      sos_numbers_valid: validSosNumbers.length,
      sos_numbers_invalid_samples: sosNumbers.filter((n) => !validSosNumbers.includes(n)).slice(0, 3),
    };

    let dropouts = 0;
    if (staysCount < 3) { result.summary.stays_below_3.push({ slug, count: staysCount }); dropouts++; }
    if (eateriesCount < 3) { result.summary.eateries_below_3.push({ slug, count: eateriesCount }); dropouts++; }
    if (sosNumbers.length > 0 && validSosNumbers.length !== sosNumbers.length) {
      result.summary.sos_phones_invalid_format.push({ slug, samples: row.sos_numbers_invalid_samples });
      dropouts++;
    }
    result.summary.sos_phones_count_total += sosNumbers.length;
    if (dropouts === 0) result.summary.fully_passing++;
    result.destinations.push(row);

    process.stderr.write(`stays=${staysCount} eats=${eateriesCount} sos=${sosNumbers.length}/${validSosNumbers.length}-valid\n`);
  }

  result.completed_utc = new Date().toISOString();
  const outDir = path.resolve("qa/findings/2026-05-04-deep");
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "phase-08-content.json"), JSON.stringify(result, null, 2));

  console.log("\n=== Phase 8 summary ===");
  console.log(`Sampled: ${result.destinations.length}`);
  console.log(`Fully passing (>=3 stays + >=3 eateries + valid SOS): ${result.summary.fully_passing}`);
  console.log(`Soft-404s: ${result.summary.soft_404s.length}  ${result.summary.soft_404s.map((d) => d.slug).join(", ")}`);
  console.log(`Fetch errors: ${result.summary.fetch_errors.length}`);
  console.log(`Stays < 3 signal: ${result.summary.stays_below_3.length}  ${result.summary.stays_below_3.slice(0, 5).map((d) => `${d.slug}=${d.count}`).join(", ")}`);
  console.log(`Eateries < 3 signal: ${result.summary.eateries_below_3.length}  ${result.summary.eateries_below_3.slice(0, 5).map((d) => `${d.slug}=${d.count}`).join(", ")}`);
  console.log(`SOS phones total: ${result.summary.sos_phones_count_total}, invalid-format dests: ${result.summary.sos_phones_invalid_format.length}`);
})();
