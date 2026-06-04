// scripts/_apply-sos-backfill-2026-06-04.mjs
//
// Assembles emergency_sos rows for the 45 rowless destinations from the
// adversarially-verified workflow output, then emits idempotent INSERT SQL for
// review. National numbers are constants (no fabrication risk); district
// control-room + hospital are written ONLY where the independent verifier
// confirmed them against the cited official source. Unconfirmed => honest
// scarcity (left null).
//
// Usage:
//   node scripts/_apply-sos-backfill-2026-06-04.mjs            # writes review JSON + .sql
//   (then apply the .sql via the Supabase MCP execute_sql, INSERT ... ON CONFLICT DO NOTHING)
//
// Input : data/sos/sos-backfill-2026-06-04-results.json  (the workflow's returned `clean` array)
// Output: data/sos/sos-backfill-2026-06-04-rows.json     (assembled rows, human review)
//         data/sos/sos-backfill-2026-06-04.sql           (idempotent INSERT)

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'data', 'sos');
const IN = path.join(DIR, 'sos-backfill-2026-06-04-results.json');
const OUT_ROWS = path.join(DIR, 'sos-backfill-2026-06-04-rows.json');
const OUT_SQL = path.join(DIR, 'sos-backfill-2026-06-04.sql');

// India-wide official emergency numbers — universal, real, no research needed.
const UNIVERSAL = {
  police: '100',
  ambulance: '108',
  fire: '101',
  women_helpline: '1091',
  road_accident: '1073',
  tourist_helpline: '1363', // Ministry of Tourism 24x7 national tourist infoline
};

const VERIFIED_BY = 'sos-backfill-2026-06-04';
const VERIFIED_DATE = '2026-06-04';

const q = (v) => (v === null || v === undefined ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`);
const b = (v) => (v === true ? 'TRUE' : v === false ? 'FALSE' : 'NULL');

// Normalize a district label for grouping: lowercase, drop parentheticals + UT/district words.
function normDistrict(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/\b(ut|district|dist|leh ladakh)\b/g, '')
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
const isGov = (u) => /\.gov\.in|\.nic\.in/.test(String(u || ''));

const data = JSON.parse(fs.readFileSync(IN, 'utf8'));

// ---- Build per-district CANONICAL confirmed control-room + hospital ----
// The district disaster-control-room and the district government hospital are
// district-level resources, valid for every town in that district. So a number
// independently verified for ANY dest in a district is legitimate for its
// same-district siblings. Pick the best-attested instance per district.
const crByDistrict = new Map();
const hByDistrict = new Map();

function betterCR(a, b2) {
  if (!a) return b2;
  if (!b2) return a;
  // prefer a .gov.in/.nic.in source, then a longer (STD-prefixed) number
  const ga = isGov(a.source_url), gb = isGov(b2.source_url);
  if (ga !== gb) return ga ? a : b2;
  return (String(b2.number).length > String(a.number).length) ? b2 : a;
}
function betterH(a, b2) {
  if (!a) return b2;
  if (!b2) return a;
  const ga = isGov(a.source_url), gb = isGov(b2.source_url);
  if (ga !== gb) return ga ? a : b2;
  // then prefer one that carries a phone, then a longer phone
  const pa = (a.phone || '').length, pb = (b2.phone || '').length;
  return pb > pa ? b2 : a;
}

for (const rec of data) {
  const dk = normDistrict(rec.district);
  const r = rec.research || {}, v = rec.verdict || {};
  const cr = r.control_room || {}, hosp = r.hospital || {};
  if (v.control_room_confirmed && cr.found && cr.number) {
    crByDistrict.set(dk, betterCR(crByDistrict.get(dk), { number: cr.number, label: cr.label, source_url: cr.source_url }));
  }
  if (v.hospital_confirmed && hosp.found && hosp.name) {
    hByDistrict.set(dk, betterH(hByDistrict.get(dk), { name: hosp.name, phone: hosp.phone, has_er: hosp.has_er, source_url: hosp.source_url }));
  }
}

function assemble(rec) {
  const dk = normDistrict(rec.district);
  const v = rec.verdict || {};
  const cr = crByDistrict.get(dk) || null;   // canonical, district-level
  const hosp = hByDistrict.get(dk) || null;

  const ownCR = !!v.control_room_confirmed;
  const ownH = !!v.hospital_confirmed;

  const rescue_contact = cr ? `${cr.label ? cr.label + ': ' : ''}${cr.number}` : null;
  const nearest_hospital = hosp ? `${hosp.name}${hosp.phone ? ` (Tel: ${hosp.phone})` : ''}` : null;
  const hospital_has_er = hosp ? (hosp.has_er === true ? true : null) : null;

  const source_url = cr ? (cr.source_url || null) : (hosp ? (hosp.source_url || null) : null);
  const source_label = cr
    ? (cr.label || 'District disaster control room')
    : (hosp ? 'District government hospital directory' : 'India-wide emergency numbers (district desk not yet verified)');

  const verified = !!(cr || hosp);

  return {
    destination_id: rec.id,
    ...UNIVERSAL,
    rescue_contact,
    nearest_hospital,
    hospital_has_er,
    local_helpers: '[]',
    verified,
    verified_by: VERIFIED_BY,
    verified_date: VERIFIED_DATE,
    report_count: 0,
    source_url,
    source_label,
    _district: rec.district || null,
    _cr_confirmed: ownCR,
    _h_confirmed: ownH,
    _cr_propagated: !!cr && !ownCR,
    _h_propagated: !!hosp && !ownH,
  };
}

function toSql(row) {
  return `INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES (${q(row.destination_id)}, ${q(row.police)}, ${q(row.ambulance)}, ${q(row.fire)}, ${q(row.women_helpline)}, ${q(row.tourist_helpline)}, ${q(row.road_accident)}, ${q(row.rescue_contact)}, ${q(row.nearest_hospital)}, ${b(row.hospital_has_er)}, '[]'::jsonb, ${b(row.verified)}, ${q(row.verified_by)}, ${q(row.verified_date)}, 0, ${q(row.source_url)}, ${q(row.source_label)}, now())
ON CONFLICT (destination_id) DO NOTHING;`;
}

const rows = data.map(assemble);

fs.writeFileSync(OUT_ROWS, JSON.stringify(rows, null, 2));

const header = `-- emergency_sos backfill for ${rows.length} previously-rowless destinations (2026-06-04)
-- National numbers are universal/official. District control-room + hospital written ONLY where independently verified.
-- Idempotent: ON CONFLICT (destination_id) DO NOTHING.
`;
fs.writeFileSync(OUT_SQL, header + '\n' + rows.map(toSql).join('\n\n') + '\n');

// ---- optional apply (--commit): insert-only via service-role client ----
if (process.argv.includes('--commit')) {
  const { createClient } = await import('@supabase/supabase-js');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) { console.error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY — run with --env-file=apps/web/.env.local'); process.exit(1); }
  const supabase = createClient(url, key);
  const payload = rows.map(({ _district, _cr_confirmed, _h_confirmed, _cr_propagated, _h_propagated, local_helpers, ...rest }) => ({
    ...rest,
    local_helpers: [],
    updated_at: new Date().toISOString(),
  }));
  // insert-only: never clobber an existing row
  const { data: ins, error } = await supabase
    .from('emergency_sos')
    .upsert(payload, { onConflict: 'destination_id', ignoreDuplicates: true })
    .select('destination_id');
  if (error) { console.error('APPLY FAILED:', error.message); process.exit(1); }
  console.log(`APPLIED: ${ins ? ins.length : 0} rows inserted (insert-only, existing rows untouched).`);
  process.exit(0);
}

const crFilled = rows.filter(r => r.rescue_contact).length;
const hFilled = rows.filter(r => r.nearest_hospital).length;
const crProp = rows.filter(r => r._cr_propagated).length;
const hProp = rows.filter(r => r._h_propagated).length;
const richCount = rows.filter(r => r.verified).length;
console.log(`Assembled ${rows.length} rows.`);
console.log(`  control-room filled : ${crFilled} (own-confirmed ${crFilled - crProp} + district-propagated ${crProp})`);
console.log(`  hospital filled     : ${hFilled} (own-confirmed ${hFilled - hProp} + district-propagated ${hProp})`);
console.log(`  verified (>=1 district field) : ${richCount}`);
console.log(`  universal-only (honest scarcity on district fields) : ${rows.length - richCount}`);
console.log(`Wrote ${path.relative(ROOT, OUT_ROWS)} and ${path.relative(ROOT, OUT_SQL)}`);
