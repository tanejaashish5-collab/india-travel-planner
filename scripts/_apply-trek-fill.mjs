/**
 * Apply the 4 trek-fill SQL files via the Supabase Management API.
 * Uses SUPABASE_ACCESS_TOKEN from apps/web/.env.local (already present)
 * — no direct-Postgres URL needed.
 *
 * Each SQL file is sent as one transactional query. All INSERTs are idempotent
 * (ON CONFLICT (id) DO UPDATE), so re-running is safe.
 *
 * Run: node --env-file=apps/web/.env.local scripts/_apply-trek-fill.mjs
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const token = process.env.SUPABASE_ACCESS_TOKEN;
const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!token || !projectUrl) {
  console.error("Need SUPABASE_ACCESS_TOKEN + NEXT_PUBLIC_SUPABASE_URL in env.");
  process.exit(1);
}
const projectRef = new URL(projectUrl).hostname.split(".")[0];
console.log(`Project ref: ${projectRef}`);

const files = [
  "agent-a-panch-kailash-prayag.sql",
  "agent-a-supplement-treks-pois.sql",
  "agent-b-south-pilgrim-hikes.sql",
  "agent-c-himalayan-ne-treks.sql",
];

const queryUrl = `https://api.supabase.com/v1/projects/${projectRef}/database/query`;

async function runSql(sql, label) {
  const res = await fetch(queryUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${label} failed [${res.status}]: ${body.slice(0, 800)}`);
  }
  return res.json();
}

try {
  // Concat all 4 files + wrap in single transaction
  const sqlBlobs = files.map((f) => {
    const p = resolve(__dirname, "_trek-fill", f);
    return `-- ===== ${f} =====\n` + readFileSync(p, "utf-8");
  });
  const combined = "BEGIN;\n" + sqlBlobs.join("\n\n") + "\nCOMMIT;";
  console.log(`Combined ${files.length} files, ${combined.length} bytes total. Applying…`);

  await runSql(combined, "trek-fill batch");
  console.log("✓ All trek-fill SQL applied + committed");

  // Verify counts
  const verifySql = `
    SELECT
      (SELECT COUNT(*) FROM destinations) AS dest_total,
      (SELECT COUNT(*) FROM treks) AS trek_total,
      (SELECT COUNT(*) FROM collections) AS coll_total,
      (SELECT COUNT(*) FROM points_of_interest) AS poi_total,
      (SELECT COUNT(*) FROM hidden_gems) AS gem_total,
      (SELECT COUNT(*) FROM destinations WHERE id IN
        ('adi-kailash','kinner-kailash','shrikhand-mahadev','manimahesh-kailash','mansarovar-kailash',
         'vishnuprayag','nandprayag','karnaprayag','rudraprayag','devprayag',
         'sabarimala','tirumala','palani','shikharji','tiruchendur','swamimalai',
         'pazhamudircholai','tiruparankundram','tiruttani',
         'ziro','kiphire','betla','chitrakote-falls','bhoramdeo','jampui-hills')) AS new_dests_present,
      (SELECT COUNT(*) FROM treks WHERE id IN
        ('adi-kailash-yatra-trek','kinner-kailash-parikrama-trek','shrikhand-mahadev-yatra-trek',
         'manimahesh-yatra-trek','kailash-mansarovar-yatra-trek')) AS panch_kailash_treks_present,
      (SELECT COUNT(*) FROM collections WHERE id IN
        ('panch-kailash-circuit','panch-prayag-circuit','arupadai-veedu')) AS new_collections_present;
  `;
  const verify = await runSql(verifySql, "verify");
  console.log("\n=== Post-apply counts ===");
  console.table(verify);
} catch (err) {
  console.error("\n✗ Apply FAILED:", err.message);
  process.exit(1);
}
