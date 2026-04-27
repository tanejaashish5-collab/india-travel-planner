import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const ids = "amritsar,anandpur-sahib,damdama-sahib,patiala,kurukshetra,morni-hills,pinjore-gardens,chandigarh,barot-valley,bir-billing,chail,chamba,chandratal,chitkul,dalhousie,dharamshala,great-himalayan-np,jibhi,kalpa,kasauli,kasol,kaza,keylong,kinnaur,kufri,kullu,lahaul-valley,manali,mandi,manikaran,mcleodganj,nako,palampur,parvati-valley,prashar-lake,sangla,sarahan,shimla,sissu,solan,spiti-valley,tirthan-valley,almora,auli,badrinath,bhimtal,binsar,chakrata,champawat,chaukori,chopta,corbett-national-park,devprayag,dhanaulti,gangotri,gopeshwar,guptkashi,har-ki-doon,haridwar,hemkund-sahib,joshimath,kanatal,kausani,kedarnath,landour,lansdowne,mukteshwar,munsiyari,mussoorie,nainital,pithoragarh,ranikhet,rishikesh,roopkund,rudraprayag,tehri,tungnath,uttarkashi,valley-of-flowers,yamunotri".split(",");

const { data: picks } = await s.from("destination_stay_picks")
  .select("destination_id, slot, name, sources")
  .in("destination_id", ids);

const byDest = {};
for (const p of picks ?? []) {
  byDest[p.destination_id] = byDest[p.destination_id] ?? { picks: 0, needSources: [] };
  byDest[p.destination_id].picks++;
  const n = Array.isArray(p.sources) ? p.sources.length : 0;
  if (n < 2) byDest[p.destination_id].needSources.push({ slot: p.slot, name: p.name, current: n });
}

const needWork = Object.entries(byDest).filter(([_, v]) => v.needSources.length > 0).sort((a,b) => b[1].needSources.length - a[1].needSources.length);
console.log(`Dests needing enrichment: ${needWork.length} / ${ids.length}`);
console.log(`Total picks under-sourced: ${needWork.reduce((s,[_,v]) => s + v.needSources.length, 0)}\n`);
for (const [d, v] of needWork) {
  console.log(`${d.padEnd(22)} ${v.needSources.length}/${v.picks} picks need work:`);
  for (const p of v.needSources) console.log(`  [${p.slot}] ${p.name} (current: ${p.current})`);
}
