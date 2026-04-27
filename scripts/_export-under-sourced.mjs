import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { writeFileSync } from "node:fs";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const ids = "amritsar,anandpur-sahib,damdama-sahib,patiala,kurukshetra,morni-hills,pinjore-gardens,chandigarh,barot-valley,bir-billing,chail,chamba,chandratal,chitkul,dalhousie,dharamshala,great-himalayan-np,jibhi,kalpa,kasauli,kasol,kaza,keylong,kinnaur,kufri,kullu,lahaul-valley,manali,mandi,manikaran,mcleodganj,nako,palampur,parvati-valley,prashar-lake,sangla,sarahan,shimla,sissu,solan,spiti-valley,tirthan-valley,almora,auli,badrinath,bhimtal,binsar,chakrata,champawat,chaukori,chopta,corbett-national-park,devprayag,dhanaulti,gangotri,gopeshwar,guptkashi,har-ki-doon,haridwar,hemkund-sahib,joshimath,kanatal,kausani,kedarnath,landour,lansdowne,mukteshwar,munsiyari,mussoorie,nainital,pithoragarh,ranikhet,rishikesh,roopkund,rudraprayag,tehri,tungnath,uttarkashi,valley-of-flowers,yamunotri".split(",");

const { data: picks } = await s.from("destination_stay_picks")
  .select("destination_id, slot, name, property_type, price_band, sources, why_nakshiq")
  .in("destination_id", ids);
const { data: dests } = await s.from("destinations")
  .select("id, name, state_id").in("id", ids);
const destMap = Object.fromEntries(dests.map(d => [d.id, d]));

const underSourced = (picks ?? [])
  .filter(p => !Array.isArray(p.sources) || p.sources.length < 2)
  .map(p => ({
    destination_id: p.destination_id,
    destination_name: destMap[p.destination_id]?.name,
    state_id: destMap[p.destination_id]?.state_id,
    slot: p.slot,
    name: p.name,
    property_type: p.property_type,
    price_band: p.price_band,
    why_nakshiq: p.why_nakshiq,
    current_sources: p.sources ?? [],
  }));

writeFileSync("/tmp/under-sourced-picks.json", JSON.stringify(underSourced, null, 2));
console.log(`Exported ${underSourced.length} under-sourced picks across ${new Set(underSourced.map(p => p.destination_id)).size} dests to /tmp/under-sourced-picks.json`);
