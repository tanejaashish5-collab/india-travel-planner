import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { writeFileSync } from "node:fs";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const ids = "amritsar,anandpur-sahib,damdama-sahib,patiala,kurukshetra,morni-hills,pinjore-gardens,chandigarh,barot-valley,bir-billing,chail,chamba,chandratal,chitkul,dalhousie,dharamshala,great-himalayan-np,jibhi,kalpa,kasauli,kasol,kaza,keylong,kinnaur,kufri,kullu,lahaul-valley,manali,mandi,manikaran,mcleodganj,nako,palampur,parvati-valley,prashar-lake,sangla,sarahan,shimla,sissu,solan,spiti-valley,tirthan-valley,almora,auli,badrinath,bhimtal,binsar,chakrata,champawat,chaukori,chopta,corbett-national-park,devprayag,dhanaulti,gangotri,gopeshwar,guptkashi,har-ki-doon,haridwar,hemkund-sahib,joshimath,kanatal,kausani,kedarnath,landour,lansdowne,mukteshwar,munsiyari,mussoorie,nainital,pithoragarh,ranikhet,rishikesh,roopkund,rudraprayag,tehri,tungnath,uttarkashi,valley-of-flowers,yamunotri".split(",");

const { data: picks } = await s.from("destination_stay_picks")
  .select("destination_id, slot, name, property_type, price_band, sources, published")
  .in("destination_id", ids)
  .order("destination_id, slot");

const { data: dests } = await s.from("destinations")
  .select("id, name, state_id, stay_intelligence")
  .in("id", ids);

const destMap = Object.fromEntries(dests.map(d => [d.id, d]));
const byDest = {};
for (const p of picks) {
  if (!byDest[p.destination_id]) {
    byDest[p.destination_id] = {
      destination_id: p.destination_id,
      destination_name: destMap[p.destination_id]?.name,
      state_id: destMap[p.destination_id]?.state_id,
      has_intelligence: !!destMap[p.destination_id]?.stay_intelligence?.upgrade_reasoning,
      picks: []
    };
  }
  byDest[p.destination_id].picks.push({
    slot: p.slot, name: p.name, property_type: p.property_type, price_band: p.price_band,
    existing_sources_count: Array.isArray(p.sources) ? p.sources.length : 0,
    published: p.published
  });
}

const out = Object.values(byDest);
writeFileSync("/tmp/picks-to-enrich.json", JSON.stringify(out, null, 2));
console.log(`Exported ${out.length} dests, ${picks.length} picks total to /tmp/picks-to-enrich.json`);
console.log(`\nDests w/ no picks at all (need full mode, not enrich): ${ids.length - out.length}`);
const noPicks = ids.filter(id => !byDest[id]);
console.log(noPicks.join(","));
console.log(`\nDests w/ existing intelligence (already enriched, skip): ${out.filter(d => d.has_intelligence).length}`);
console.log(out.filter(d => d.has_intelligence).map(d => d.destination_id).join(","));
console.log(`\nDests needing source enrichment: ${out.filter(d => !d.has_intelligence).length}`);
