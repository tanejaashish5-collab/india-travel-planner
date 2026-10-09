/**
 * Apply a reviewed blog rewrite from data/blog-rewrites/<slug>.md to the articles row.
 * Backs up the old row to data/backups/blog-rewrite-<slug>-<ts>.json first.
 *
 *   DRY=1 node --env-file=apps/web/.env.local scripts/apply-blog-rewrite.mjs <slug>   # rolls back
 *         node --env-file=apps/web/.env.local scripts/apply-blog-rewrite.mjs <slug>
 *
 * Metadata for each slug lives in META below. Content only; slug, published_at and
 * destinations are never touched. Stamps updated_at.
 */
import fs from "node:fs";
import { withPgTransaction } from "./_lib/pg-bulk.mjs";

const META = {
  "complete-guide-doodhpathri": {
    subtitle: "A day trip from Srinagar: when the meadow is open, what the road is like, and the permit myth.",
    excerpt:
      "Doodhpathri is a day trip from Srinagar with no permit or visitor quota. When to go, how to get in, what to bring, and why to check it is open first.",
    seo_title: "Doodhpathri guide: no permit needed, best months and how to get there",
    seo_description:
      "Doodhpathri is a 42 km day trip from Srinagar. No permit quota, best in May, June and September, and it can close without notice. Our verified guide.",
    reading_time: 5,
  },
};

const slug = process.argv[2];
if (!slug || !META[slug]) {
  console.error(`Usage: apply-blog-rewrite.mjs <slug>  (known: ${Object.keys(META).join(", ")})`);
  process.exit(1);
}
const content = fs.readFileSync(new URL(`../data/blog-rewrites/${slug}.md`, import.meta.url), "utf8");
const m = META[slug];

await withPgTransaction(async (client) => {
  const { rows } = await client.query("SELECT * FROM articles WHERE slug = $1", [slug]);
  if (rows.length !== 1) throw new Error(`expected 1 row for ${slug}, got ${rows.length}`);
  fs.mkdirSync(new URL("../data/backups/", import.meta.url), { recursive: true });
  const bak = new URL(`../data/backups/blog-rewrite-${slug}-${Date.now()}.json`, import.meta.url);
  fs.writeFileSync(bak, JSON.stringify(rows[0], null, 2));
  console.log("backup:", bak.pathname);
  const r = await client.query(
    `UPDATE articles SET content=$2, subtitle=$3, excerpt=$4, seo_title=$5, seo_description=$6,
       reading_time=$7, updated_at=now() WHERE slug=$1`,
    [slug, content, m.subtitle, m.excerpt, m.seo_title, m.seo_description, m.reading_time],
  );
  console.log("updated rows:", r.rowCount);
});
