#!/usr/bin/env node
// Publish village pages from data/research/villages/<slug>.json into
// sub_destinations (migration 079). DRY by default; APPLY=1 writes.
// Gate: a village is published only if scripts/check-village-sources.mjs ran
// after its JSON was last edited and found 0 failures for it. Fix or delete the
// failed items, re-run the check, then publish. Agents' own "verified" is ignored.
// After APPLY: node scripts/gen-known-village-slugs.mjs, commit both JSONs, deploy.
// Usage: node --env-file=apps/web/.env.local scripts/publish-village-pages.mjs [slug ...]
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const DIR = path.resolve(import.meta.dirname, "..", "data", "research", "villages");
// Existing sub_destinations rows these pages attach to (null = new row, id = slug).
const ROW_FOR = {
  tosh: "tosh-kheerganga", tungnath: "tungnath-temple", "khaliya-top": "khaliya-top",
  "kasar-devi": "kasar-devi-temple", dharamkot: "dharamkot", naddi: "naddi",
  mashobra: "shimla-mashobra", naggar: "manali-naggar", ghangaria: "ghangaria-base",
  mana: "mana-village", "deoria-tal": "deoria-tal", "aru-valley": "aru-valley", nathatop: "nathatop",
  sethan: null, shoja: null, jispa: null, harsil: null, "kalga-pulga": null, malana: null, kheerganga: null,
};
const RENAME = { tosh: "Tosh", "kasar-devi": "Kasar Devi" }; // card name follows the split/rename

const only = process.argv.slice(2);
const slugs = Object.keys(ROW_FOR).filter((s) => !only.length || only.includes(s));
const check = JSON.parse(readFileSync(path.join(DIR, "_source-check.json"), "utf8"));
const checkedAt = new Date(check.at).getTime();
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

let ok = 0, held = 0;
for (const slug of slugs) {
  const file = path.join(DIR, `${slug}.json`);
  let v;
  try { v = JSON.parse(readFileSync(file, "utf8")); } catch { console.log(`HOLD ${slug}: no research file`); held++; continue; }
  const r = check.report.find((x) => x.slug === slug);
  if (!r) { console.log(`HOLD ${slug}: not in source check`); held++; continue; }
  if (statSync(file).mtimeMs > checkedAt) { console.log(`HOLD ${slug}: edited after the last source check`); held++; continue; }
  if (r.failed > 0) { console.log(`HOLD ${slug}: ${r.failed} failed source(s)`); held++; continue; }

  const { slug: _s, name, parent_id, state, researched_at, ...page } = v;
  const reviewed = new Date(`${researched_at}T00:00:00Z`).toISOString();
  const card = {
    tagline: v.one_line ?? null,
    why_visit: v.why_go ?? null,
    elevation_m: v.elevation_m?.value ?? null,
    best_months: v.best_months ?? [],
    kids_ok: v.kids_ok ?? true,
    kids_note: v.kids_note ?? null,
    time_needed: v.time_needed ?? null,
    ...(v.coords?.lat != null ? { coords: `SRID=4326;POINT(${v.coords.lng} ${v.coords.lat})` } : {}),
  };
  const rowId = ROW_FOR[slug];
  const write = rowId
    ? { op: "update", id: rowId, data: { slug, page, page_reviewed_at: reviewed, page_published_at: new Date().toISOString(), ...(RENAME[slug] ? { name: RENAME[slug] } : {}), ...(rowId === "tosh-kheerganga" ? card : {}) } }
    : { op: "insert", id: slug, data: { id: slug, parent_id, name, type: "village", slug, page, page_reviewed_at: reviewed, page_published_at: new Date().toISOString(), ...card } };
  console.log(`${process.env.APPLY ? "WRITE" : "DRY"} ${write.op} ${write.id} (${parent_id}/${slug}) checks ${r.checked}/${r.checked}`);
  if (process.env.APPLY) {
    const q = write.op === "update"
      ? sb.from("sub_destinations").update(write.data).eq("id", write.id).eq("parent_id", parent_id).select("id")
      : sb.from("sub_destinations").insert(write.data).select("id");
    const { data, error } = await q;
    if (error || !data?.length) { console.log(`  ✗ ${error?.message ?? "0 rows matched"}`); held++; continue; }
  }
  ok++;
}
console.log(`\n${ok} ${process.env.APPLY ? "published" : "ready"} · ${held} held`);
