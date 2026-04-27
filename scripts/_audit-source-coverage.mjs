import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const ids = "amritsar,anandpur-sahib,damdama-sahib,patiala,kurukshetra,morni-hills,pinjore-gardens,chandigarh,barot-valley,bir-billing,chail,chamba,chandratal,chitkul,dalhousie,dharamshala,great-himalayan-np,jibhi,kalpa,kasauli,kasol,kaza,keylong,kinnaur,kufri,kullu,lahaul-valley,manali,mandi,manikaran,mcleodganj,nako,palampur,parvati-valley,prashar-lake,sangla,sarahan,shimla,sissu,solan,spiti-valley,tirthan-valley,almora,auli,badrinath,bhimtal,binsar,chakrata,champawat,chaukori,chopta,corbett-national-park,devprayag,dhanaulti,gangotri,gopeshwar,guptkashi,har-ki-doon,haridwar,hemkund-sahib,joshimath,kanatal,kausani,kedarnath,landour,lansdowne,mukteshwar,munsiyari,mussoorie,nainital,pithoragarh,ranikhet,rishikesh,roopkund,rudraprayag,tehri,tungnath,uttarkashi,valley-of-flowers,yamunotri".split(",");

const { data: picks } = await s.from("destination_stay_picks")
  .select("destination_id, slot, sources, published, refreshed_at")
  .in("destination_id", ids);

let totalPicks = 0, withSources = 0, published = 0, recentRefresh = 0;
const buckets = { 0: 0, 1: 0, 2: 0, "3+": 0 };
for (const p of picks ?? []) {
  totalPicks++;
  const n = Array.isArray(p.sources) ? p.sources.length : 0;
  if (n === 0) buckets[0]++;
  else if (n === 1) buckets[1]++;
  else if (n === 2) buckets[2]++;
  else buckets["3+"]++;
  if (n > 0) withSources++;
  if (p.published) published++;
  if (p.refreshed_at && p.refreshed_at >= "2026-04-26") recentRefresh++;
}
console.log(`Total picks: ${totalPicks}`);
console.log(`Picks with ANY sources: ${withSources} (${((withSources/totalPicks)*100).toFixed(0)}%)`);
console.log(`Picks published: ${published} (${((published/totalPicks)*100).toFixed(0)}%)`);
console.log(`Picks refreshed since 2026-04-26: ${recentRefresh}`);
console.log(`\nSource-count buckets:`);
console.log(`  0 sources: ${buckets[0]} picks`);
console.log(`  1 source: ${buckets[1]} picks`);
console.log(`  2 sources: ${buckets[2]} picks`);
console.log(`  3+ sources: ${buckets["3+"]} picks`);
