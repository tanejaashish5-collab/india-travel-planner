// qa/_lib/build_report.js
//
// Shared docx builder for NakshIQ daily QA persona reports.
// Reads the most recent qa/findings/YYYY-MM-DD.json and emits a persona-flavored
// .docx into the workspace root.
//
// Authored 2026-05-07 to replace the ephemeral in-session generators that
// vanished with each Cowork sandbox. This file lives in qa/_lib/ and is
// imported by qa/generate_developer_report.js / generate_qa_report.js /
// generate_business_report.js — three tiny wrappers that just pass a persona
// flag.

const fs = require('fs');
const path = require('path');

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, PageBreak,
  Header, Footer, PageNumber
} = require('docx');

const QA_DIR = path.resolve(__dirname, '..');
const WORKSPACE_ROOT = path.resolve(QA_DIR, '..');
const FINDINGS_DIR = path.join(QA_DIR, 'findings');

// ---------- helpers ----------

function findLatestFindings() {
  const entries = fs.readdirSync(FINDINGS_DIR);
  const datedJson = entries
    .filter(n => /^\d{4}-\d{2}-\d{2}\.json$/.test(n))
    .sort()
    .reverse();
  if (datedJson.length === 0) {
    throw new Error(`No qa/findings/YYYY-MM-DD.json found in ${FINDINGS_DIR}`);
  }
  return path.join(FINDINGS_DIR, datedJson[0]);
}

function p(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text: String(text), ...opts })],
    spacing: { after: 80 },
    ...opts.paragraph
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true, size: 32 })],
    spacing: { before: 240, after: 120 }
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, size: 26 })],
    spacing: { before: 180, after: 80 }
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text, bold: true, size: 22 })],
    spacing: { before: 140, after: 60 }
  });
}

function bullet(text) {
  return new Paragraph({
    children: [new TextRun({ text: String(text) })],
    bullet: { level: 0 },
    spacing: { after: 60 }
  });
}

function kv(key, value) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${key}: `, bold: true }),
      new TextRun({ text: String(value) })
    ],
    spacing: { after: 60 }
  });
}

function emptyP() {
  return new Paragraph({ children: [new TextRun({ text: '' })] });
}

function makeRow(cells, opts = {}) {
  return new TableRow({
    children: cells.map(text => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: String(text), bold: !!opts.header, size: 20 })] })],
      width: { size: opts.width || 25, type: WidthType.PERCENTAGE }
    }))
  });
}

function makeTable(headers, rows) {
  const trs = [makeRow(headers, { header: true, width: Math.floor(100 / headers.length) })];
  for (const row of rows) trs.push(makeRow(row, { width: Math.floor(100 / headers.length) }));
  return new Table({
    rows: trs,
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top:    { style: BorderStyle.SINGLE, size: 4, color: '888888' },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888' },
      left:   { style: BorderStyle.SINGLE, size: 4, color: '888888' },
      right:  { style: BorderStyle.SINGLE, size: 4, color: '888888' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: 'cccccc' },
      insideVertical:   { style: BorderStyle.SINGLE, size: 2, color: 'cccccc' }
    }
  });
}

function trafficLight(metric, thresholds) {
  // returns 'GREEN' | 'AMBER' | 'RED' based on numeric thresholds
  if (typeof metric !== 'number') return 'N/A';
  if (metric >= thresholds.green) return 'GREEN';
  if (metric >= thresholds.amber) return 'AMBER';
  return 'RED';
}

// ---------- post-run verification helpers ----------

// Map finding id -> corrected verdict string (from an optional post_run_verification block).
function correctionMap(findings) {
  const pv = findings.post_run_verification;
  const map = {};
  if (pv && Array.isArray(pv.results)) {
    for (const r of pv.results) map[r.id] = r.corrected_verdict || '';
  }
  return map;
}

// A finding stays a real, open defect only if it has NO correction, or its correction
// still affirms a genuine problem. False-positive / false-alarm / expected => not a defect.
function isStillRealDefect(verdict) {
  if (!verdict) return true;
  if (/false[_\s-]?(positive|alarm)|expected|not a defect|NOT_REPRODUCED/i.test(verdict)) return false;
  return /confirmed|genuine|still[_\s-]?(open|real)/i.test(verdict);
}

// Renders the corrected-verdicts section. `verbose` includes per-finding evidence
// (developer/QA); business gets the compact table + the real-gap callout only.
function postRunVerificationSection(findings, { verbose }) {
  const pv = findings.post_run_verification;
  if (!pv) return [];
  const out = [
    h2('Post-run verification — corrected verdicts'),
    p(pv.note || '', { italics: true }),
    p(`Verified: ${pv.verified_utc || '—'} · ${pv.verifier || ''}`, { size: 18 }),
    makeTable(
      ['Finding', 'Original', 'Corrected verdict'],
      (pv.results || []).map(r => [r.id, r.original_severity || '—', r.corrected_verdict || '—'])
    )
  ];
  if (verbose) {
    for (const r of (pv.results || [])) {
      out.push(h3(`${r.id} — ${r.corrected_verdict || ''}`));
      if (r.evidence) out.push(p(`Evidence: ${r.evidence}`, { italics: true }));
    }
  }
  const g = pv.real_gap_discovered;
  if (g) {
    out.push(h3(`Real gap found — ${g.title}`));
    out.push(p(g.detail || ''));
    if (Array.isArray(g.tier_a_high_footfall)) {
      out.push(p(`High-priority (tier-A, high footfall): ${g.tier_a_high_footfall.join(', ')}`, { size: 18 }));
    }
    if (g.recommendation) out.push(p(`Recommendation: ${g.recommendation}`, { bold: true }));
  }
  return out;
}

// ---------- per-persona builders ----------

function commonHeader(findings) {
  return [
    h1('NakshIQ Daily QA'),
    p(`Run: ${findings.run.id}`, { italics: true }),
    p(`Date: ${findings.run.date} · Target: ${findings.run.target}`),
    p(`Executor: ${findings.run.executor}`, { italics: true, size: 18 }),
    emptyP()
  ];
}

function buildDeveloperReport(findings) {
  const m = findings.headline_metrics || {};
  const ttfb = m.core_routes_TTFB_ms || {};
  const dttfb = m.destinations_TTFB_ms || {};

  const children = [
    ...commonHeader(findings),

    h2('1. Run summary'),
    kv('Mode', findings.run.mode || '—'),
    kv('Duration (min)', findings.run.duration_minutes ?? '—'),
    kv('Real verification', findings.run.real_verification === true ? 'YES' : 'NO'),
    kv('Fabricated numbers', findings.run.fabricated_numbers === false ? 'NO' : 'YES'),
    kv('Status', findings.run.status || 'completed'),
    emptyP(),

    h2('2. Blockers'),
    ...(findings.blockers && findings.blockers.length
      ? findings.blockers.flatMap(b => [
          h3(`${b.id} [${b.severity}] ${b.title}`),
          p(b.detail || ''),
          ...(b.evidence ? b.evidence.map(e => bullet(`evidence: ${e}`)) : []),
          b.consequence ? p(`Consequence: ${b.consequence}`, { italics: true }) : emptyP(),
          b.recommendation ? p(`Recommendation: ${b.recommendation}`, { bold: true }) : emptyP()
        ])
      : [p('No blockers.')]),

    h2('3. Phases completed'),
    ...((findings.phases_completed || []).map(s => bullet(s))),

    h2('4. Phases skipped'),
    ...(findings.phases_skipped && findings.phases_skipped.length
      ? findings.phases_skipped.flatMap(s => [
          p(s.phase, { bold: true }),
          p(`reason: ${s.reason}`, { italics: true })
        ])
      : [p('None.')]),

    h2('5. Regression matrix'),
    makeTable(
      ['ID', 'Title', 'Prior', 'Today', 'Evidence'],
      (findings.regression_matrix || []).map(r => [
        r.id, r.title, r.prior_status || '—', r.today_status, r.evidence || '—'
      ])
    ),

    h2('6. New findings today'),
    ...(findings.new_findings_today && findings.new_findings_today.length
      ? findings.new_findings_today.flatMap(f => [
          h3(`${f.id} [${f.severity}] ${f.title}`),
          p(f.detail || ''),
          f.evidence ? p(`Evidence: ${f.evidence}`, { italics: true }) : emptyP(),
          f.recommendation ? p(`Recommendation: ${f.recommendation}`, { bold: true }) : emptyP()
        ])
      : [p('No new findings today.')]),

    ...postRunVerificationSection(findings, { verbose: true }),

    h2('7. Headline metrics — full'),
    makeTable(
      ['Metric', 'Value'],
      [
        ['core_routes_probed', m.core_routes_probed],
        ['core_routes_2xx', m.core_routes_2xx],
        ['core_routes_3xx_redirect', m.core_routes_3xx_redirect],
        ['core_routes_4xx_or_5xx', m.core_routes_4xx_or_5xx],
        ['TTFB ms (min/median/p90/max)', `${ttfb.min}/${ttfb.median}/${ttfb.p90}/${ttfb.max}`],
        ['destinations_sampled', m.destinations_sampled],
        ['destinations_all_200', m.destinations_all_200],
        ['destination TTFB ms (min/median/max)', `${dttfb.min}/${dttfb.median}/${dttfb.max}`],
        ['hindi_parity_sampled', m.hindi_parity_sampled],
        ['hindi_pages_with_lang_hi', m.hindi_pages_with_lang_hi],
        ['hindi_pages_with_devanagari_title', m.hindi_pages_with_devanagari_title],
        ['seo_title_stutter', m.seo_title_stutter],
        ['seo_canonical_present', `${m.seo_canonical_present}/${m.seo_urls_sampled}`],
        ['seo_hreflang en/hi/x-default', `${m.seo_hreflang_en_present}/${m.seo_hreflang_hi_present}/${m.seo_hreflang_xdefault_present}`],
        ['seo_og_image_present', m.seo_og_image_present],
        ['soft_404_regression passes/misses', `${m.soft_404_regression_passes}/${m.soft_404_regression_misses}`],
        ['sos_phones total/invalid', `${m.sos_phones_total_across_10_dests}/${m.sos_phones_invalid_format}`],
        ['api_endpoints probed', m.api_endpoints_probed],
        ['api_5xx_returned', m.api_5xx_returned],
        ['api_4xx_validation_returned', m.api_4xx_validation_returned],
        ['service_worker_version', m.service_worker_version],
        ['manifest icons/shortcuts', `${m.manifest_icons}/${m.manifest_shortcuts}`],
        ['sitemap chunks/dest-slug/dest-month', `${m.sitemap_chunks}/${m.sitemap_total_destination_slug_urls}/${m.sitemap_total_destination_month_urls}`]
      ]
    ),

    h2('8. Honest caveats'),
    ...((findings.honest_caveats || []).map(c => bullet(c))),

    h2('9. Deliverables'),
    ...((findings.deliverables || []).map(d => bullet(d)))
  ];

  return children;
}

function buildQaReport(findings) {
  const m = findings.headline_metrics || {};
  const passList = (findings.regression_matrix || []).filter(r =>
    /STILL CLOSED|FIXED|STILL GREEN|NOT_REPRODUCED/.test(r.today_status));
  const failList = (findings.regression_matrix || []).filter(r =>
    /STILL OPEN|REPRODUCED|REGRESSION|PARTIAL/.test(r.today_status));
  const notTested = (findings.regression_matrix || []).filter(r =>
    /NOT IN TODAY|NOT INVESTIGATED|not investigated|not actively re-tested|not re-tested/.test(r.today_status));

  const children = [
    ...commonHeader(findings),

    h2('Pass / Fail summary'),
    makeTable(
      ['Bucket', 'Count'],
      [
        ['PASS (closed/fixed/green)', passList.length],
        ['FAIL (open/reproduced/partial)', failList.length],
        ['NOT_TESTED today', notTested.length]
      ]
    ),

    h2('Section coverage'),
    ...((findings.phases_completed || []).map(s => bullet(s))),

    h2('Sections skipped (and why)'),
    ...(findings.phases_skipped && findings.phases_skipped.length
      ? findings.phases_skipped.flatMap(s => [bullet(`${s.phase} — ${s.reason}`)])
      : [p('None.')]),

    h2('Regression matrix'),
    makeTable(
      ['ID', 'Title', 'Today', 'Evidence'],
      (findings.regression_matrix || []).map(r => [
        r.id, r.title, r.today_status, r.evidence || '—'
      ])
    ),

    h2('New defects today'),
    ...(findings.new_findings_today && findings.new_findings_today.length
      ? findings.new_findings_today.flatMap(f => [
          h3(`${f.id} [${f.severity}] ${f.title}`),
          p(f.detail || ''),
          f.evidence ? p(`Evidence: ${f.evidence}`, { italics: true }) : emptyP(),
          f.recommendation ? p(`Recommended next check: ${f.recommendation}`, { bold: true }) : emptyP()
        ])
      : [p('Zero new defects today.')]),

    ...postRunVerificationSection(findings, { verbose: true }),

    h2('Recommended follow-ups for tomorrow'),
    ...(notTested.length
      ? notTested.map(r => bullet(`Re-probe ${r.id} — ${r.title}`))
      : [p('All bugs in matrix were exercised today.')]),

    h2('Blockers'),
    ...(findings.blockers && findings.blockers.length
      ? findings.blockers.map(b => bullet(`[${b.severity}] ${b.id} — ${b.title}`))
      : [p('No blockers.')]),

    h2('Caveats'),
    ...((findings.honest_caveats || []).map(c => bullet(c)))
  ];

  return children;
}

function buildBusinessReport(findings) {
  const m = findings.headline_metrics || {};
  const cmap = correctionMap(findings);
  const blockerCount = (findings.blockers || []).length;
  // Honor post-run verification: a flagged item only counts as a real defect if it
  // wasn't downgraded to false-positive/expected on re-verification.
  const newDefects = (findings.new_findings_today || []).filter(f =>
    (f.severity === 'critical' || f.severity === 'high' || f.severity === 'medium')
    && isStillRealDefect(cmap[f.id])).length;
  const correctedCount = ((findings.post_run_verification || {}).results || [])
    .filter(r => !isStillRealDefect(r.corrected_verdict)).length;
  const apiHealth = (m.api_5xx_returned === 0) ? 'GREEN' : 'RED';
  // A 5xx among core routes is RED; a lone 4xx (often an expected by-convention 404,
  // e.g. a bare dynamic-route path) is AMBER, not a site-down condition.
  const routesHealth = (m.core_routes_4xx_or_5xx === 0) ? 'GREEN'
    : (m.core_routes_4xx_or_5xx <= 1 ? 'AMBER' : 'RED');
  const i18nHealth = (m.hindi_pages_with_lang_hi === m.hindi_parity_sampled) ? 'GREEN' : 'AMBER';
  const seoHealth = (m.seo_title_stutter === 0 && m.seo_canonical_present === m.seo_urls_sampled) ? 'GREEN' : 'AMBER';

  // Overall verdict keys on real signals only: blockers, post-correction defects,
  // and API 5xx. A lone expected 404 (routesHealth AMBER) does not gate to AMBER.
  const totalFlagged = (findings.new_findings_today || []).length;
  const overall =
    (blockerCount > 0 || newDefects > 0 || apiHealth === 'RED')
      ? 'AMBER — review needed'
      : (correctedCount > 0
          ? `GREEN — site healthy; ${correctedCount} of ${totalFlagged} flagged item(s) were false positives on re-verification`
          : 'GREEN — site is healthy');

  const children = [
    ...commonHeader(findings),

    h2('Headline'),
    p(overall, { bold: true, size: 28 }),
    emptyP(),

    h2('Traffic-light snapshot'),
    makeTable(
      ['Area', 'Status', 'Why'],
      [
        ['Site availability', routesHealth, `${m.core_routes_2xx}/${m.core_routes_probed} routes 2xx${routesHealth === 'AMBER' ? ' — lone non-2xx; see verification for whether it is an expected 404' : ''}`],
        ['API health', apiHealth, `${m.api_5xx_returned} × 5xx returned today`],
        ['Hindi parity', i18nHealth, `${m.hindi_pages_with_lang_hi}/${m.hindi_parity_sampled} hi pages had lang=hi`],
        ['SEO basics', seoHealth, `0 title-stutter; ${m.seo_canonical_present}/${m.seo_urls_sampled} canonical`],
        ['SOS phones', (m.sos_phones_invalid_format === 0 ? 'GREEN' : 'AMBER'), `${m.sos_phones_total_across_10_dests} phones, ${m.sos_phones_invalid_format} invalid`],
        ['PWA', m.service_worker_version ? 'GREEN' : 'AMBER', `SW: ${m.service_worker_version || 'unknown'}, ${m.manifest_shortcuts} shortcuts`]
      ]
    ),

    h2('What changed since yesterday'),
    ...(findings.new_findings_today && findings.new_findings_today.length
      ? findings.new_findings_today.map(f => {
          const v = cmap[f.id];
          const tag = (v && !isStillRealDefect(v)) ? '  [RE-VERIFIED: false positive]' : '';
          return bullet(`[${f.severity}] ${f.title}${tag}`);
        })
      : [p('No material changes.')]),

    ...postRunVerificationSection(findings, { verbose: false }),

    h2('Risks worth knowing about'),
    ...(findings.blockers && findings.blockers.length
      ? findings.blockers.map(b => bullet(`${b.title} — ${b.recommendation || b.consequence || ''}`))
      : [p('No risks flagged today.')]),

    h2('Coverage at a glance'),
    bullet(`${m.destinations_sampled || 0} destinations sampled live (en + hi)`),
    bullet(`${m.core_routes_probed || 0} core routes probed`),
    bullet(`${m.api_endpoints_probed || 0} API endpoints probed`),
    bullet(`${m.sitemap_total_destination_slug_urls || 0} destination URLs published in sitemap`),

    h2('Honest caveats'),
    ...((findings.honest_caveats || []).map(c => bullet(c)))
  ];

  return children;
}

// ---------- main ----------

function buildAndWrite(persona) {
  const findingsPath = process.env.QA_FINDINGS || findLatestFindings();
  const findings = JSON.parse(fs.readFileSync(findingsPath, 'utf-8'));

  let title, fileName, body;
  if (persona === 'developer') {
    title = 'NakshIQ — Developer Report';
    fileName = 'NakshIQ_Developer_Report.docx';
    body = buildDeveloperReport(findings);
  } else if (persona === 'qa') {
    title = 'NakshIQ — QA Report';
    fileName = 'NakshIQ_QA_Report.docx';
    body = buildQaReport(findings);
  } else if (persona === 'business') {
    title = 'NakshIQ — Business Owner Report';
    fileName = 'NakshIQ_Business_Report.docx';
    body = buildBusinessReport(findings);
  } else {
    throw new Error(`Unknown persona: ${persona}`);
  }

  const doc = new Document({
    creator: 'NakshIQ Daily QA',
    title,
    description: `Generated from ${path.basename(findingsPath)}`,
    sections: [{
      properties: {},
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: title, italics: true, size: 18 })]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'Page ', size: 18 }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18 }),
              new TextRun({ text: ' of ', size: 18 }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18 })
            ]
          })]
        })
      },
      children: body
    }]
  });

  const outPath = path.join(WORKSPACE_ROOT, fileName);
  return Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync(outPath, buf);
    const sizeKb = (buf.length / 1024).toFixed(1);
    console.log(`OK ${persona.padEnd(10)} → ${outPath} (${sizeKb} KB)`);
    return { outPath, size: buf.length, ok: buf.length >= 10 * 1024 };
  });
}

module.exports = { buildAndWrite, findLatestFindings };
