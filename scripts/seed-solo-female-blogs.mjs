#!/usr/bin/env node
/**
 * Sprint 1 — upsert 5 solo-female blog posts directly via supabase-js.
 *
 * Parses markdown frontmatter + body and pushes to articles table.
 *
 * Usage:
 *   node scripts/seed-solo-female-blogs.mjs         # dry
 *   node scripts/seed-solo-female-blogs.mjs --commit
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

config({ path: 'apps/web/.env.local' });

const SOLO_FEMALE_SLUGS = new Set([
  'solo-female-india-month-by-month',
  'is-rishikesh-safe-for-solo-female',
  'is-goa-safe-for-solo-female-in-december',
  'solo-female-manali-guide',
  'kashmir-for-solo-female-what-matters',
]);

const BANNED = [
  'hidden gem', 'unforgettable', 'stunning', 'must-visit', 'must visit',
  'bucket list', 'breathtaking', 'magical', 'incredible', 'authentic',
  'curated', 'elevated', 'immersive', 'paradise', 'pristine',
  'charming', 'nestled',
];

const COMMIT = process.argv.includes('--commit');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

function parseMd(path) {
  const raw = readFileSync(path, 'utf-8');
  const m = raw.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`No frontmatter in ${path}`);
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z_]+): (.*)$/);
    if (!kv) continue;
    let val = kv[2].trim();
    if (val.startsWith('[')) {
      try { val = JSON.parse(val.replace(/'/g, '"')); } catch { /* keep raw */ }
    } else if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    fm[kv[1]] = val;
  }
  return { fm, body: m[2] };
}

function lintBody(body, slug) {
  const hits = [];
  const lines = body.split('\n');
  lines.forEach((line, i) => {
    const lower = line.toLowerCase();
    const lineHits = BANNED.filter((b) => lower.includes(b));
    // 3+ banned in one line = reference list (voice-lint rule), skip
    if (lineHits.length > 0 && lineHits.length < 3) {
      hits.push(`${slug}:${i + 1} [${lineHits.join(',')}]`);
    }
  });
  return hits;
}

const dir = 'data/blog-drafts';
const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
let ok = 0, err = 0;
const rejected = [];

console.log(`Seeding ${SOLO_FEMALE_SLUGS.size} solo-female articles (${COMMIT ? 'COMMIT' : 'DRY'})`);

for (const f of files) {
  const { fm, body } = parseMd(resolve(dir, f));
  if (!SOLO_FEMALE_SLUGS.has(fm.slug)) continue;

  const lintHits = lintBody(body, fm.slug);
  if (lintHits.length) {
    rejected.push({ slug: fm.slug, hits: lintHits });
    continue;
  }

  const row = {
    id: fm.id,
    slug: fm.slug,
    title: fm.title,
    subtitle: fm.subtitle ?? null,
    category: fm.category ?? 'guide',
    depth: fm.depth ?? 'brief',
    reading_time: Number(fm.reading_time) || null,
    cover_image_url: fm.cover_image_url ?? null,
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    destinations: Array.isArray(fm.destinations) ? fm.destinations : [],
    seo_title: fm.seo_title ?? fm.title,
    seo_description: fm.seo_description ?? '',
    excerpt: fm.excerpt ?? '',
    content: body.trim(),
    published_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    featured: false,
  };

  if (!COMMIT) {
    console.log(`  would upsert ${row.slug} (${row.depth}, ${row.reading_time}min, ${row.tags.length} tags, ${row.destinations.length} destinations)`);
    ok++; continue;
  }
  const { error } = await supabase.from('articles').upsert(row, { onConflict: 'id' });
  if (error) { console.error(`  ✗ ${row.slug}: ${error.message}`); err++; }
  else { console.log(`  ✓ ${row.slug}`); ok++; }
}

if (rejected.length) {
  console.log(`\nVoice-lint rejections:`);
  for (const r of rejected) {
    console.log(`  ✗ ${r.slug}:`);
    for (const h of r.hits) console.log(`    ${h}`);
  }
}

console.log(`\n${ok} ok, ${err} failed, ${rejected.length} rejected${COMMIT ? '' : ' (dry run)'}`);
process.exit(rejected.length > 0 ? 1 : 0);
