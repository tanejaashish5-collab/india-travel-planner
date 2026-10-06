#!/usr/bin/env node
// Regenerate apps/web/data/known-village-slugs.json: the middleware allowlist (and
// sitemap source) for village pages at /destination/<parent>/<slug>. Run after
// publishing or unpublishing a village page, in the same PR. Reads ~20-400 rows
// over REST (well under the 500-row direct-Postgres threshold).
// Usage: node --env-file=apps/web/.env.local scripts/gen-known-village-slugs.mjs
import { writeFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const { data, error } = await sb
  .from("sub_destinations")
  .select("parent_id, slug, page_published_at")
  .not("page_published_at", "is", null)
  .not("slug", "is", null)
  .order("parent_id");
if (error) throw error;
const villages = {};
for (const r of data) (villages[r.parent_id] ??= []).push(r.slug);
for (const k of Object.keys(villages)) villages[k].sort();
const out = path.resolve(import.meta.dirname, "..", "apps", "web", "data", "known-village-slugs.json");
writeFileSync(out, JSON.stringify({
  generated_at: new Date().toISOString(),
  source: "sub_destinations where page_published_at is not null (scripts/gen-known-village-slugs.mjs)",
  count: data.length,
  villages,
}, null, 2) + "\n");
console.log(`${data.length} village pages across ${Object.keys(villages).length} parents → ${out}`);
