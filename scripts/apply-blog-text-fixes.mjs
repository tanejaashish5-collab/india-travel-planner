#!/usr/bin/env node
/**
 * Apply exact-string sentence fixes to blog articles from a reviewed JSON map.
 *
 *   node --env-file=apps/web/.env.local scripts/apply-blog-text-fixes.mjs <fixes.json> --check   # verify only
 *   node --env-file=apps/web/.env.local scripts/apply-blog-text-fixes.mjs <fixes.json> --apply   # check, then write
 *
 * Every `old` string must occur exactly once in its article's content, or nothing is written.
 * The write goes through scripts/run-sql-file.mjs (Management API) as one transaction of
 * UPDATE ... SET content = replace(content, old, new) statements, generated here so the SQL
 * is never retyped. Back the table up first (e.g. backups.articles_20261009).
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";

const [file, mode] = process.argv.slice(2);
if (!file || !["--check", "--apply"].includes(mode)) { console.error("usage: apply-blog-text-fixes.mjs <fixes.json> --check|--apply"); process.exit(1); }
const { fixes } = JSON.parse(fs.readFileSync(file, "utf8"));
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const slugs = [...new Set(fixes.map((f) => f.slug))];
const { data, error } = await s.from("articles").select("slug, content").in("slug", slugs);
if (error) { console.error(error.message); process.exit(1); }
const bySlug = Object.fromEntries(data.map((a) => [a.slug, a.content]));

let bad = 0;
for (const f of fixes) {
  const c = bySlug[f.slug];
  const n = c == null ? -1 : c.split(f.old).length - 1;
  const already = c != null && f.new !== f.old && c.includes(f.new);
  if (n !== 1) { bad++; console.log(`FAIL ${f.slug}: old string found ${n} times${already ? " (new text already present)" : ""}\n     ${f.old.slice(0, 90)}`); }
  else console.log(`ok   ${f.slug}: ${f.old.slice(0, 60)}… -> ${f.new.slice(0, 60)}…`);
}
console.log(`${fixes.length - bad}/${fixes.length} fixes match exactly once`);
if (bad) process.exit(1);
if (mode === "--check") process.exit(0);

const q = (x) => `'${x.replace(/'/g, "''")}'`;
const sql = ["BEGIN;",
  ...fixes.map((f) => `UPDATE articles SET content = replace(content, ${q(f.old)}, ${q(f.new)}), updated_at = now() WHERE slug = ${q(f.slug)} AND position(${q(f.old)} in content) > 0;`),
  "COMMIT;",
  `SELECT count(*) AS articles_still_containing_old_text FROM articles WHERE ${fixes.map((f) => `(slug = ${q(f.slug)} AND position(${q(f.old)} in content) > 0)`).join(" OR ")};`,
].join("\n");
const out = path.join(path.dirname(file), path.basename(file, ".json") + ".generated.sql");
fs.writeFileSync(out, sql);
console.log(`wrote ${out}; applying through run-sql-file.mjs`);
const r = spawnSync(process.execPath, ["--env-file=apps/web/.env.local", "scripts/run-sql-file.mjs", out], { stdio: "inherit" });
process.exit(r.status ?? 1);
