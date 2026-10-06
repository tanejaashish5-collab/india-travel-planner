// 2026-10-06 one-shot: remove sub_destinations that duplicate a full destination
// page (the parent already links to it via the nearby strip, rank 1-5) or repeat
// another sub under the same parent (kept the copy with coords + longer write-up).
// Default is a DRY run: backs up the rows and prints what would go. APPLY=1 deletes.
// Kept on purpose: borra-caves, ranakpur-jain (parent's nearby strip does not link
// the full page), kibber-langza-chicham (only mention of Chicham).
import { writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const DUP_OF_DEST = ["jampui-hills", "agra-fatehpur-sikri", "fatehpur-sikri", "joshimath-town", "bhimbetka-rock-shelters", "sangla", "chitrakote-falls", "modhera-sun-temple", "munnar-eravikulam-np", "landour", "turtuk-village", "pondicherry-auroville", "shimla-kufri", "shimla-chail", "chandratal", "kaza", "jibhi", "tirumala", "hemkund-sahib", "sarnath", "varanasi-sarnath"];
const DUP_OF_SUB = ["old-goa-bom-jesus", "beatles-ashram", "mysore-brindavan", "mysore-chamundi", "dashashwamedh-ghat", "jallianwala-bagh", "manikarnika-ghat", "hampi-matanga", "matrimandir", "naggar", "wagah-border"];
const ids = [...DUP_OF_DEST, ...DUP_OF_SUB];

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const { data: rows, error } = await sb.from("sub_destinations").select("*").in("id", ids);
if (error) throw error;
console.log(`found ${rows.length}/${ids.length}`);
const missing = ids.filter((i) => !rows.find((r) => r.id === i));
if (missing.length) console.log("already gone:", missing.join(", "));
const parents = [...new Set(rows.map((r) => r.parent_id))];

if (rows.length) {
  writeFileSync("data/backups/sub-destinations-dedup-2026-10-06.json", JSON.stringify({ reason: { DUP_OF_DEST, DUP_OF_SUB }, rows }, null, 1));
  console.log("backup: data/backups/sub-destinations-dedup-2026-10-06.json");
}
console.log("parents to re-verify:", parents.join(","));
if (!process.env.APPLY) { console.log("DRY run, nothing deleted. Re-run with APPLY=1 to delete."); process.exit(0); }

const { error: delErr, count } = await sb.from("sub_destinations").delete({ count: "exact" }).in("id", ids);
if (delErr) throw delErr;
console.log(`deleted ${count}`);
