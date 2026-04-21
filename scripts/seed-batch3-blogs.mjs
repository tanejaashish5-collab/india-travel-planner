#!/usr/bin/env node
/**
 * Batch 3 · Items 3 + 4 — upsert 16 new blog posts directly via supabase-js.
 *
 * Parses markdown frontmatter + body and pushes to articles table.
 * Replaces the Supabase-SQL-Editor paste pattern used in earlier sprints.
 *
 * Usage:
 *   node scripts/seed-batch3-blogs.mjs         # dry
 *   node scripts/seed-batch3-blogs.mjs --commit
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

config({ path: 'apps/web/.env.local' });

const BATCH3_SLUGS = new Set([
  'things-to-know-leh-in-june',
  'things-to-know-rishikesh-in-april',
  'things-to-know-hampi-in-december',
  'things-to-know-jaisalmer-in-november',
  'things-to-know-meghalaya-in-july',
  'things-to-know-goa-in-december',
  'is-leh-in-november-worth-it',
  'is-kerala-backwaters-in-april-worth-it',
  'is-rishikesh-in-june-worth-it',
  'is-kashmir-in-january-worth-it',
  'is-jaisalmer-in-august-worth-it',
  'is-darjeeling-in-june-worth-it',
  'hampi-in-february-scored',
  'munnar-in-october-scored',
  'udaipur-in-december-scored',
  'spiti-in-september-scored',
]);

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
    // Arrays: JSON-like [a, b] or ["a","b"]
    if (val.startsWith('[')) {
      try { val = JSON.parse(val.replace(/'/g, '"')); } catch { /* keep raw */ }
    } else if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    fm[kv[1]] = val;
  }
  return { fm, body: m[2] };
}

const dir = 'data/blog-drafts';
const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
let ok = 0, err = 0;

console.log(`Seeding ${BATCH3_SLUGS.size} Batch-3 articles (${COMMIT ? 'COMMIT' : 'DRY'})`);

for (const f of files) {
  const { fm, body } = parseMd(resolve(dir, f));
  if (!BATCH3_SLUGS.has(fm.slug)) continue;

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
    console.log(`  would upsert ${row.slug} (${row.depth}, ${row.reading_time}min)`);
    ok++; continue;
  }
  const { error } = await supabase.from('articles').upsert(row, { onConflict: 'id' });
  if (error) { console.error(`  ✗ ${row.slug}: ${error.message}`); err++; }
  else { console.log(`  ✓ ${row.slug}`); ok++; }
}
console.log(`\n${ok} ok, ${err} failed${COMMIT ? '' : ' (dry run)'}`);
