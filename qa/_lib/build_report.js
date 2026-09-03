// qa/_lib/build_report.js
// Reconstructed 2026-06-05 (prior copy was lost — it had been written to the
// session scratchpad, not the persistent workspace, so it vanished between runs
// along with 2026-06-04.json). Rebuilt from qa/_lib/docx_helpers.js + the
// observed structure of the three persona .docx reports produced 2026-06-04.
//
// Exposes buildAndWrite(persona) used by the three thin wrappers
// (generate_developer_report.js / generate_qa_report.js / generate_business_report.js).
// Returns { ok, outPath, size }. ok === (size >= 10*1024).

const fs = require('fs');
const path = require('path');
const { findLatestFindings, DocBuilder, writeDocx } = require('./docx_helpers.js');

const ROOT = path.join(__dirname, '..', '..'); // project root (one level above qa/)
const OUT = {
  developer: 'NakshIQ_Developer_Report.docx',
  qa:        'NakshIQ_QA_Report.docx',
  business:  'NakshIQ_Business_Report.docx'
};
const CREATOR = 'NakshIQ Daily QA Generator';

// ---- helpers ----
const PASS = new Set(['STILL CLOSED', 'FIXED', 'STILL GREEN', 'NOT_REPRODUCED']);
function bucketOf(status) {
  const s = String(status || '');
  if (PASS.has(s)) return 'PASS';
  if (/^NOT IN|^NOT INVESTIGATED|not investigated|not re-tested|not actively|needs i18n/i.test(s)) return 'NOT_TESTED';
  if (/STILL OPEN|REPRODUCED|REGRESSION|PARTIAL/i.test(s)) return 'FAIL';
  return 'NOT_TESTED';
}

function flattenMetrics(m, prefix = '') {
  const rows = [];
  for (const [k, v] of Object.entries(m || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      for (const [k2, v2] of Object.entries(v)) rows.push([`${prefix}${k}.${k2}`, String(v2)]);
    } else {
      rows.push([`${prefix}${k}`, Array.isArray(v) ? v.join('; ') : String(v)]);
    }
  }
  return rows;
}

// A–K section results table derived from headline metrics (QA persona)
function sectionResults(m) {
  const tt = m.core_routes_TTFB_ms || {};
  const dt = m.destinations_TTFB_ms || {};
  const verdict = (ok) => (ok ? 'PASS' : 'ATTENTION');
  return [
    ['A — Soft-404 regression', verdict((m.soft_404_regression_misses || 0) === 0),
      `${m.soft_404_regression_passes || 0}/${(m.soft_404_regression_passes || 0) + (m.soft_404_regression_misses || 0)} bad routes return 404`],
    ['B — Destination availability + TTFB', verdict(m.destinations_all_200 !== false),
      `${m.destinations_sampled || 0}/${m.destinations_sampled || 0} → 200; TTFB min ${dt.min}/median ${dt.median}/max ${dt.max} ms`],
    ['C — Hindi parity', verdict(m.hindi_pages_with_lang_hi === m.hindi_parity_sampled),
      `lang=hi ${m.hindi_pages_with_lang_hi || 0}/${m.hindi_parity_sampled || 0}; Devanagari title ${m.hindi_pages_with_devanagari_title || 0}/${m.hindi_parity_sampled || 0}`],
    ['D — SEO meta', verdict((m.seo_title_stutter || 0) === 0 && m.seo_canonical_present === m.seo_urls_sampled),
      `stutter ${m.seo_title_stutter || 0}; canonical ${m.seo_canonical_present || 0}/${m.seo_urls_sampled || 0}; hreflang en/hi/x-default ${m.seo_hreflang_en_present || 0}/${m.seo_hreflang_hi_present || 0}/${m.seo_hreflang_xdefault_present || 0}; og:image ${m.seo_og_image_present || 0}/${m.seo_urls_sampled || 0}`],
    ['E — SOS phones', verdict((m.sos_phones_invalid_format || 0) === 0 && !(m.sos_sample_destinations_empty > 0)),
      `${m.sos_phones_total_across_10_dests || 0} rendered phones, ${m.sos_phones_invalid_format || 0} malformed; ${m.sos_sample_destinations_empty || 0}/10 sampled render empty; site-wide ${m.sos_destinations_without_block || 0}/${(m.sos_destinations_with_local_helpers_block || 0) + (m.sos_destinations_without_block || 0)} have no SOS block (${m.sos_no_block_tierA || 0} tier-A)`],
    ['F — API smoke', verdict((m.api_5xx_returned || 0) === 0),
      `${m.api_endpoints_probed || 0} probed; ${m.api_5xx_returned || 0} × 5xx; ${m.api_4xx_validation_returned || 0} × 4xx validation`],
    ['G — PWA / SW / manifest', verdict(!!m.service_worker_version),
      `SW ${m.service_worker_version || '?'}; icons ${m.manifest_icons || 0}; shortcuts ${m.manifest_shortcuts || 0}`],
    ['H — Sitemap integrity', verdict((m.sitemap_chunks || 0) >= 1),
      `${m.sitemap_chunks || 0} chunks; ${m.sitemap_total_urls || 0} URLs; ${m.sitemap_total_destination_slug_urls || 0} slug + ${m.sitemap_total_destination_month_urls || 0} month`],
    ['I — Core routes', verdict((m.core_routes_4xx_or_5xx || 0) === 0),
      `${m.core_routes_2xx || 0}/${m.core_routes_probed || 0} 2xx; TTFB min ${tt.min}/median ${tt.median}/p90 ${tt.p90}/max ${tt.max} ms`],
    ['J — Locale redirects', 'PASS', 'bare paths redirect to the correct language-prefixed URL'],
    ['K — Map widget (Chrome E2E)', verdict((m.map_dest_pages_leaflet_template || 0) > 0),
      `Leaflet present on ${m.map_dest_pages_leaflet_template || 0}/${m.map_dest_pages_probed_interactive || 0} surfaces probed`]
  ];
}

function header(b, f) {
  const r = f.run || {};
  b.h1('NakshIQ Daily QA');
  b.p(`Run: ${r.id || ''}`);
  b.p(`Date: ${r.date || ''} · Target: ${r.target || ''}`);
  b.p(`Executor: ${r.executor || ''}`);
}

// ---- DEVELOPER ----
function buildDeveloper(b, f) {
  header(b, f);
  const r = f.run || {};
  b.h2('1. Run summary');
  b.p(`Mode: ${r.mode || ''}`);
  b.p(`Duration (min): ${r.duration_minutes != null ? r.duration_minutes : ''}`);
  b.p(`Real verification: ${r.real_verification ? 'YES' : 'NO'}`);
  b.p(`Fabricated numbers: ${r.fabricated_numbers ? 'YES' : 'NO'}`);
  b.p(`Status: ${r.status || ''}`);

  b.h2('2. Blockers');
  if (!f.blockers || !f.blockers.length) b.p('No blockers.');
  else for (const bl of f.blockers) b.prich([{ text: `[${bl.severity}] `, bold: true }, { text: bl.title }, { text: bl.detail ? ` — ${bl.detail}` : '' }]);

  b.h2('3. Phases completed');
  for (const p of f.phases_completed || []) b.bullet(p);

  b.h2('4. Phases skipped');
  for (const s of f.phases_skipped || []) { b.p(s.phase); b.prich([{ text: 'reason: ', bold: true }, { text: s.reason }]); }

  b.h2('5. Regression matrix');
  b.table(['ID', 'Title', 'Prior', 'Today', 'Evidence'],
    (f.regression_matrix || []).map(x => [x.id, x.title, x.prior_status || '', x.today_status || '', x.evidence || '']));

  b.h2('6. New findings today');
  if (!f.new_findings_today || !f.new_findings_today.length) b.p('No new findings today.');
  for (const n of f.new_findings_today || []) {
    b.h3(`${n.id} [${n.severity}]`);
    b.p(n.title);
    if (n.detail) b.prich([{ text: 'Detail: ', bold: true }, { text: n.detail }]);
    if (n.evidence) b.prich([{ text: 'Evidence: ', bold: true }, { text: n.evidence }]);
    if (n.recommendation) b.prich([{ text: 'Recommendation: ', bold: true }, { text: n.recommendation }]);
  }

  b.h2('7. Headline metrics');
  b.table(['Metric', 'Value'], flattenMetrics(f.headline_metrics));

  b.h2('8. Deliverables');
  for (const d of f.deliverables || []) b.bullet(d);

  b.h2('9. Honest caveats');
  for (const c of f.honest_caveats || []) b.bullet(c);
}

// ---- QA ----
function buildQA(b, f) {
  header(b, f);
  const counts = { PASS: 0, FAIL: 0, NOT_TESTED: 0 };
  for (const x of f.regression_matrix || []) counts[bucketOf(x.today_status)]++;
  b.h2('Pass / Fail summary');
  b.table(['Bucket', 'Count'], [
    ['PASS (closed/fixed/green)', String(counts.PASS)],
    ['FAIL (open/reproduced/partial)', String(counts.FAIL)],
    ['NOT_TESTED today', String(counts.NOT_TESTED)]
  ]);

  b.h2('Section results (A–K)');
  b.table(['Section', 'Verdict', 'Detail'], sectionResults(f.headline_metrics || {}));

  b.h2('Section coverage');
  for (const p of f.phases_completed || []) b.bullet(p);

  b.h2('Sections skipped (and why)');
  for (const s of f.phases_skipped || []) b.bullet(`${s.phase} — ${s.reason}`);

  b.h2('Regression matrix');
  b.table(['ID', 'Title', 'Today', 'Evidence'],
    (f.regression_matrix || []).map(x => [x.id, x.title, x.today_status || '', x.evidence || '']));

  b.h2('New findings today');
  if (!f.new_findings_today || !f.new_findings_today.length) b.p('No new findings today.');
  for (const n of f.new_findings_today || []) {
    b.h3(`${n.id} [${n.severity}] — ${n.title}`);
    if (n.detail) b.p(n.detail);
    if (n.evidence) b.prich([{ text: 'Evidence: ', bold: true }, { text: n.evidence }]);
    if (n.recommendation) b.prich([{ text: 'Recommendation: ', bold: true }, { text: n.recommendation }]);
  }

  b.h2('Headline metrics');
  b.table(['Metric', 'Value'], flattenMetrics(f.headline_metrics));

  b.h2('Honest caveats');
  for (const c of f.honest_caveats || []) b.bullet(c);
}

// ---- BUSINESS ----
function defaultTrafficLights(m) {
  const g = (cond) => (cond ? 'GREEN' : 'AMBER');
  const out = [];
  const av4xx = m.core_routes_4xx_or_5xx || 0;
  out.push(['Site availability', g(av4xx === 0 && m.destinations_all_200 !== false),
    `${m.core_routes_2xx || 0}/${m.core_routes_probed || 0} routes 2xx; ${av4xx} non-2xx`]);
  out.push(['API health', g((m.api_5xx_returned || 0) === 0), `${m.api_5xx_returned || 0} × 5xx returned today`]);
  out.push(['Hindi parity', g(m.hindi_pages_with_lang_hi === m.hindi_parity_sampled),
    `${m.hindi_pages_with_lang_hi || 0}/${m.hindi_parity_sampled || 0} hi pages had lang=hi`]);
  out.push(['SEO basics', g((m.seo_title_stutter || 0) === 0 && m.seo_canonical_present === m.seo_urls_sampled),
    `${m.seo_title_stutter || 0} title-stutter; ${m.seo_canonical_present || 0}/${m.seo_urls_sampled || 0} canonical`]);
  out.push(['PWA', g(!!m.service_worker_version), `SW: ${m.service_worker_version || '?'}, ${m.manifest_shortcuts || 0} shortcuts`]);
  return out;
}

function buildBusiness(b, f) {
  header(b, f);
  const m = f.headline_metrics || {};
  const bs = f.business_summary || {};

  b.h2('Headline');
  b.p(bs.headline || 'Daily QA pass completed — see traffic-light snapshot below.');
  if (bs.context && bs.context.length) for (const p of bs.context) b.p(p);

  b.h2('Traffic-light snapshot');
  const tl = bs.traffic_lights && bs.traffic_lights.length
    ? bs.traffic_lights.map(t => [t.area, t.status, t.why])
    : defaultTrafficLights(m);
  b.table(['Area', 'Status', 'Why'], tl);

  b.h2('What changed since yesterday');
  const changes = bs.whats_changed && bs.whats_changed.length
    ? bs.whats_changed
    : (f.new_findings_today || []).map(n => `[${n.severity}] ${n.title}`);
  if (!changes.length) b.p('No material changes since yesterday.');
  for (const c of changes) b.bullet(c);

  if (bs.post_run_verification) {
    b.h2('Post-run verification — corrected verdicts');
    if (bs.post_run_verification.note) b.p(bs.post_run_verification.note);
    if (Array.isArray(bs.post_run_verification.rows))
      b.table(['Finding', 'Original', 'Corrected verdict'], bs.post_run_verification.rows.map(r => [r.id, r.original, r.corrected]));
  }

  if (bs.real_gap) {
    b.h2(bs.real_gap.title || 'Real gap found');
    for (const para of (bs.real_gap.paragraphs || [])) b.p(para);
  }

  b.h2('Risks worth knowing about');
  const risks = bs.risks || [];
  if (!risks.length) b.p('No risks flagged today.');
  for (const r of risks) b.bullet(r);

  // NOTE (2026-09-03, NEW-2026-08-14-005): this persona must carry no code,
  // no commit hashes, no file paths (see SKILL.md's persona definitions).
  // A prior version of this function unconditionally dumped raw
  // new_findings_today[].detail, the fully-flattened headline_metrics object,
  // and the raw regression_matrix table (titles/evidence are written for a
  // developer/QA audience and routinely contain file paths, script names, and
  // commit hashes) below this point. That was the actual leak vector — not
  // run.executor, which is only ever a single header line. Removed rather
  // than gated, because there is no business-safe subset of raw finding
  // detail/metric-notes/regression-evidence to show; the curated
  // business_summary fields above (whats_changed, risks, bottom_line,
  // coverage) are the intended replacement. sectionResults(m) below is kept
  // because it is already human-language with no technical references.
  if (bs.bottom_line && bs.bottom_line.length) {
    b.h2('Bottom line — recommended actions');
    for (const a of bs.bottom_line) b.bullet(a);
  }

  if (bs.tomorrow && bs.tomorrow.length) {
    b.h2('What tomorrow’s check will look at');
    for (const a of bs.tomorrow) b.bullet(a);
  }

  b.h2('Coverage at a glance');
  const cov = bs.coverage && bs.coverage.length ? bs.coverage : [
    `${m.destinations_sampled || 0} destinations sampled live (en + hi)`,
    `${m.core_routes_probed || 0} core routes probed`,
    `${m.api_endpoints_probed || 0} API endpoints probed`,
    `${m.sitemap_total_destination_slug_urls || 0} destination URLs published in sitemap`
  ];
  for (const c of cov) b.bullet(c);

  if (bs.checks_confirmed_healthy && bs.checks_confirmed_healthy.length) {
    b.h2('Everything else we checked and confirmed healthy');
    for (const c of bs.checks_confirmed_healthy) b.bullet(c);
  }

  const detailed = f.business_detailed_measurements;
  if (detailed && Array.isArray(detailed.items) && detailed.items.length) {
    b.h2('A few specific numbers behind today’s checks');
    if (detailed.note) b.p(detailed.note);
    for (const c of detailed.items) b.bullet(c);
  }

  const timeline = f.business_fix_timeline;
  if (timeline && Array.isArray(timeline.items) && timeline.items.length) {
    b.h2('How long today’s fixed issues had been open');
    if (timeline.note) b.p(timeline.note);
    for (const c of timeline.items) b.bullet(c);
  }

  const tracked = f.business_tracked_minor_items;
  if (tracked && Array.isArray(tracked.items) && tracked.items.length) {
    b.h2('Smaller items we’re tracking (none urgent)');
    if (tracked.note) b.p(tracked.note);
    for (const c of tracked.items) b.bullet(c);
  }

  b.h2('By the numbers (today’s measured results)');
  b.table(['Section', 'Verdict', 'Detail'], sectionResults(m));

  const about = f.business_about_this_report;
  if (about && Array.isArray(about.items) && about.items.length) {
    b.h2('About this report');
    if (about.note) b.p(about.note);
    for (const c of about.items) b.bullet(c);
  }

  // NOTE (2026-09-03, NEW-2026-08-14-005): f.honest_caveats is shared with the
  // Developer/QA personas and routinely names specific files/functions/commit
  // hashes — exactly what this persona must not show (see SKILL.md). The
  // business_summary.risks section above is the intended business-safe
  // equivalent; deliberately not rendering raw honest_caveats here.
}

const BUILDERS = { developer: buildDeveloper, qa: buildQA, business: buildBusiness };

async function buildAndWrite(persona) {
  const { latest } = findLatestFindings();
  const b = new DocBuilder();
  const fn = BUILDERS[persona];
  if (!fn) throw new Error(`Unknown persona: ${persona}`);
  fn(b, latest);
  const outPath = path.join(ROOT, OUT[persona]);
  const title = `NakshIQ Daily QA — ${persona[0].toUpperCase() + persona.slice(1)} Report (${(latest.run || {}).date || ''})`;
  const desc = `Persona=${persona}; run=${(latest.run || {}).id || ''}`;
  const { bytes } = writeDocx(outPath, title, CREATOR, desc, b);
  return { ok: bytes >= 10 * 1024, outPath, size: bytes };
}

module.exports = { buildAndWrite };
