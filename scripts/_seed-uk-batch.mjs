import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });

const TARGET_PREFIXES = (process.argv[2] || '').split(',').filter(Boolean);
if (TARGET_PREFIXES.length === 0) {
  console.error('Usage: node scripts/_seed-hp-batch.mjs prefix1,prefix2,...');
  process.exit(1);
}

const dir = 'data/research/eateries';
const files = readdirSync(dir).filter(f =>
  TARGET_PREFIXES.some(p => f.startsWith(p)) && f.endsWith('.json')
);

const VALID_CATEGORY = new Set(['fine_dining','mid_range','casual','street_food','cafe','bar','sweet_shop']);
const VALID_PRICE = new Set(['₹','₹₹','₹₹₹','₹₹₹₹']);
const VALID_VEG = new Set(['pure-veg','veg-friendly','meat-heavy','mixed']);
const VALID_RES = new Set(['walk-in','recommended','required']);
const NORM_RES = { 'not-required':'walk-in','not-accepted':'walk-in','essential':'required','contact-day-of':'required' };
const NORM_VEG = { 'veg-only':'pure-veg' };
const NORM_CAT = { 'casual_dining':'casual','bakery':'sweet_shop','bakery_modern':'cafe' };

const all = [];
for (const f of files) {
  const rows = JSON.parse(readFileSync(`${dir}/${f}`,'utf-8'));
  console.log(`${f}: ${rows.length} rows`);
  for (const r of rows) {
    if (NORM_RES[r.reservation]) r.reservation = NORM_RES[r.reservation];
    if (NORM_VEG[r.vegetarian]) r.vegetarian = NORM_VEG[r.vegetarian];
    if (NORM_CAT[r.category]) r.category = NORM_CAT[r.category];
    if (!VALID_CATEGORY.has(r.category)) { console.log(`  INVALID category=${r.category}: ${r.name}`); continue; }
    if (!VALID_PRICE.has(r.price_range)) { console.log(`  INVALID price=${r.price_range}: ${r.name}`); continue; }
    if (!VALID_VEG.has(r.vegetarian)) { console.log(`  INVALID veg=${r.vegetarian}: ${r.name}`); continue; }
    if (!VALID_RES.has(r.reservation)) { console.log(`  INVALID res=${r.reservation}: ${r.name}`); continue; }
    all.push(r);
  }
}
console.log(`\n${all.length} valid rows for seed`);

const esc = s => s == null ? 'NULL' : `'${String(s).replace(/'/g,"''")}'`;
const arr = a => a == null ? 'NULL' : `ARRAY[${a.map(x=>esc(x)).join(',')}]::text[]`;

const lines = [];
lines.push(`-- Eateries seed for ${TARGET_PREFIXES.join(', ')}`);
lines.push(`-- ${all.length} verified rows; idempotent via ON CONFLICT (destination_id, name, area)`);
lines.push('');
for (const r of all) {
  lines.push(`INSERT INTO local_eateries (destination_id, name, area, area_slug, cuisine, category, signature_dish, must_try, price_range, price_per_head_inr, vegetarian, kid_friendly, reservation, dress_code, established_year, why_it_matters, insider_tip, signature_address, google_maps_url, zomato_url, source_urls, last_verified, is_legendary, is_active)`);
  lines.push(`VALUES (${esc(r.destination_id)}, ${esc(r.name)}, ${esc(r.area)}, ${esc(r.area_slug)}, ${arr(r.cuisine)}, ${esc(r.category)}, ${esc(r.signature_dish)}, ${arr(r.must_try)}, ${esc(r.price_range)}, ${r.price_per_head_inr ? `'${r.price_per_head_inr}'::int4range` : 'NULL'}, ${esc(r.vegetarian)}, ${r.kid_friendly}, ${esc(r.reservation)}, ${esc(r.dress_code)}, ${r.established_year ?? 'NULL'}, ${esc(r.why_it_matters)}, ${esc(r.insider_tip)}, ${esc(r.signature_address)}, ${esc(r.google_maps_url)}, ${esc(r.zomato_url)}, ${arr(r.source_urls)}, ${esc(r.last_verified)}::date, ${r.is_legendary}, ${r.is_active})`);
  lines.push(`ON CONFLICT (destination_id, name, area) DO UPDATE SET cuisine=EXCLUDED.cuisine, category=EXCLUDED.category, signature_dish=EXCLUDED.signature_dish, must_try=EXCLUDED.must_try, price_range=EXCLUDED.price_range, price_per_head_inr=EXCLUDED.price_per_head_inr, vegetarian=EXCLUDED.vegetarian, kid_friendly=EXCLUDED.kid_friendly, reservation=EXCLUDED.reservation, dress_code=EXCLUDED.dress_code, established_year=EXCLUDED.established_year, why_it_matters=EXCLUDED.why_it_matters, insider_tip=EXCLUDED.insider_tip, signature_address=EXCLUDED.signature_address, google_maps_url=EXCLUDED.google_maps_url, zomato_url=EXCLUDED.zomato_url, source_urls=EXCLUDED.source_urls, last_verified=EXCLUDED.last_verified, is_legendary=EXCLUDED.is_legendary, is_active=EXCLUDED.is_active;`);
  lines.push('');
}
const out = `/tmp/eateries-batch.sql`;
writeFileSync(out, lines.join('\n'));
console.log(`\nSQL written to ${out} (${lines.length} lines)`);
