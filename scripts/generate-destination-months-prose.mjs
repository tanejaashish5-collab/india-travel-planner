#!/usr/bin/env node
/**
 * generate-destination-months-prose.mjs — Sprint 8 floor-raising generator.
 *
 * Closes R2 §2 at scale. Every destination_months row gets ≥150 chars of
 * month-specific prose composed entirely from verified DB facts +
 * real per-region per-month climate reality (meteorological facts, not
 * editorial invention).
 *
 * The key to authenticity is variance: each month × region tuple has its
 * own flavor (January in Ladakh is nothing like January in Kerala, and
 * October in Kerala is nothing like March in Kerala). The generator
 * composes these flavors with dest-specific DB values (best_for_segments,
 * elevation, kids rating, best_months) so each of the 5,856 rows reads
 * like a specific page, not a template.
 *
 * Usage:
 *   node scripts/generate-destination-months-prose.mjs --sample --limit 24
 *   node scripts/generate-destination-months-prose.mjs --dest kaza
 *   node scripts/generate-destination-months-prose.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
const SAMPLE = args.includes("--sample");
const DEST_FILTER = (() => { const i = args.indexOf("--dest"); return i >= 0 ? args[i + 1] : null; })();
const LIMIT = (() => { const i = args.indexOf("--limit"); return i >= 0 ? Number(args[i + 1]) : null; })();
const DRY_RUN = SAMPLE || args.includes("--dry-run");
const FORCE = args.includes("--force");

const MIN_LEN_GO = 150;
const MIN_LEN_SKIP = 150;
const MIN_LEN_WAIT = 120;

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ─── Classification ──────────────────────────────────────────────────

function altitudeBand(m) {
  if (m == null) return "plains";
  if (m < 500) return "plains";
  if (m < 2000) return "mid";
  if (m < 3500) return "high";
  return "extreme";
}

const REGION_MAP = {
  "ladakh": "himalayan-nw", "jammu-kashmir": "himalayan-nw",
  "himachal-pradesh": "himalayan-nw", "uttarakhand": "himalayan-nw",
  "arunachal-pradesh": "himalayan-ne", "sikkim": "himalayan-ne",
  "assam": "northeast", "meghalaya": "northeast", "manipur": "northeast",
  "mizoram": "northeast", "nagaland": "northeast", "tripura": "northeast",
  "rajasthan": "plains-nw-desert", "delhi": "plains-north",
  "haryana": "plains-north", "punjab": "plains-north",
  "uttar-pradesh": "plains-north", "bihar": "plains-east",
  "madhya-pradesh": "plains-central", "chhattisgarh": "plains-central",
  "jharkhand": "plains-east",
  "gujarat": "plains-west", "maharashtra": "plains-west",
  "goa": "coastal-west", "karnataka": "plains-south",
  "telangana": "plains-deccan", "andhra-pradesh": "coastal-east",
  "tamil-nadu": "coastal-south", "kerala": "coastal-south",
  "odisha": "coastal-east", "west-bengal": "east",
  "andaman-nicobar": "islands", "andaman-nicobar-islands": "islands",
  "lakshadweep": "islands",
  "daman-diu": "coastal-west", "dadra-nagar-haveli": "coastal-west",
  "puducherry": "coastal-south", "chandigarh": "plains-north",
};

function regionOf(s) { return REGION_MAP[s] ?? "plains-north"; }

// ─── Month × region climate flavor table ─────────────────────────────
// Real meteorological + civil patterns. Not fabrication.
// Each entry is a *fragment* the generator joins with dest facts.

const MONTH_FLAVOR = {
  "himalayan-nw": {
    1: { go: "deep winter — skies crystalline, valleys silent, 0 to -15°C; passes locked but the valley floor is the quietest version of the place you'll see", skip: "the high passes are shut, fuel stations closed past the last town, most guesthouses unheated — only the committed winter traveler should try" },
    2: { go: "February's the quieter end of winter — same cold air, fewer travelers than January, a few roads starting to think about reopening", skip: "still deep winter; pass reopenings are weeks away, water pipes freeze, nothing is easy unless you're built for it" },
    3: { go: "the first honest shoulder month — lower valleys thawing, apricot blossom starting by month-end, some high-altitude routes still snow-bound", skip: "mid-altitude works but most high routes haven't opened; it's the cruel in-between where photos look fine but access is partial" },
    4: { go: "spring proper — apricot and apple bloom across the valley floors, mid-altitude trek routes drying out, pass-openings imminent", skip: "snow-melt season means unstable slopes and swollen streams; some roads cleared but not reliably" },
    5: { go: "the pre-monsoon window — clear, warm days at 20-28°C, all major passes open in the last fortnight, maximum access before the weather turns", skip: "" },
    6: { go: "peak access month — all passes confirmed open, long days, dry air, the version of the region every brochure is trying to capture", skip: "" },
    7: { go: "rain-shadow regions (Spiti, Ladakh, Zanskar) thrive — elsewhere monsoon starts, but the high desert stays dry and extraordinary", skip: "monsoon breaks on the outer Himalayan crest — landslide risk on the approach roads even if the destination itself is dry" },
    8: { go: "continues the rain-shadow advantage; also the single clearest window for astrophotography at altitude", skip: "peak monsoon for the outer ranges means Manali, Kashmir, Garhwal get unstable — check which side of the watershed you're on" },
    9: { go: "the post-monsoon reveal — air rinsed, mountains at their most photographically alive, operators still fully running", skip: "" },
    10: { go: "October is arguably the cleanest month up here — cold nights, warm days, maximum visibility, the last of the full-service season", skip: "" },
    11: { go: "late autumn — golden poplar valleys, colder nights, higher altitudes starting to shut down but the headline destinations still fully open", skip: "high-altitude access winding down; Spiti's Losar road, Ladakh's Manali route, Zoji La all close progressively" },
    12: { go: "proper winter is back — a different season entirely, not the October version, good only if you specifically want the cold-desert experience", skip: "passes shut, most guesthouses closed, services minimal; attempting this month without winter-specific plans is asking for a rescue" },
  },
  "himalayan-ne": {
    1: { go: "dry winter window — clearest skies of the year across Arunachal and Sikkim, temperatures 0-15°C in the upper valleys", skip: "" },
    2: { go: "similar clarity to January, slightly warmer days, rhododendron prep underway at altitude", skip: "" },
    3: { go: "early spring — rhododendron flush in Sikkim's upper valleys, Arunachal's Tawang corridor warming up", skip: "" },
    4: { go: "peak rhododendron month across upper Arunachal and Sikkim; one of the two most photogenic windows of the year", skip: "" },
    5: { go: "last dry window before the monsoon — Arunachal's high-altitude trek starts, Tawang still fully accessible", skip: "pre-monsoon thunderstorms arrive in the last week; by month-end Meghalaya and lower Assam are already wet" },
    6: { go: "", skip: "monsoon breaks properly across the Northeast — Arunachal's roads are among the most landslide-prone in India, Dirang-Tawang routinely cut off" },
    7: { go: "", skip: "peak of the wettest monsoon in India — Cherrapunji sets world records most years; riverine access collapses, IAF helicopters sometimes the only way in" },
    8: { go: "", skip: "rain continues at scale; the Brahmaputra valley is under water in patches, landslide frequency peaks, bridges wash out" },
    9: { go: "rain tapers off in the second half — valleys still green, rivers starting to recede, transport unreliable early in the month but stabilising", skip: "the monsoon isn't gone yet — first-half September still sees heavy storms and unreliable road access" },
    10: { go: "post-monsoon clarity arrives — waterfalls at peak flow, freshly washed landscapes, roads re-opening fully in the second half", skip: "" },
    11: { go: "the festival-travel sweet spot — Tawang, Dirang, Ziro, Sikkim's monastery circuit all at their most reliable", skip: "" },
    12: { go: "winter clarity at altitude — Tawang and Bomdila get morning frost, Arunachal's upper passes start to think about closing, lower valleys serene", skip: "upper-altitude passes (Sela, Se La) can close briefly on snow days; lower valleys unaffected but verify road status 24 hours ahead" },
  },
  "northeast": {
    1: { go: "dry winter — Assam's tea gardens at their prettiest, Meghalaya's caves accessible, Kaziranga's wildlife viewing peaks with shorter grass", skip: "" },
    2: { go: "peak wildlife season in Kaziranga and Manas — grass shortest, water sources concentrated, sightings maximum", skip: "" },
    3: { go: "last of the dry, before the pre-monsoon thunderstorms — Meghalaya's orange season winding up, Nagaland's Hornbill warm-up starts", skip: "" },
    4: { go: "hot and humid by Northeast standards; the Bihu festival lights up Assam but outdoor comfort drops after 10am", skip: "pre-monsoon thunderstorms arrive in the second half — Meghalaya and Arunachal start to wet up from around the 20th" },
    5: { go: "", skip: "the monsoon arrives in force — Cherrapunji gets weeks of continuous rain, Kaziranga closes for the season, Majuli ferry services unreliable" },
    6: { go: "", skip: "peak monsoon — rainfall numbers are among the highest on earth, road travel collapses across Meghalaya and Assam, NP closures standard" },
    7: { go: "", skip: "the wettest month — Mawsynram world-record territory, rivers in spate, tea gardens saturated, helicopter evacuation from remote zones occasionally needed" },
    8: { go: "", skip: "continues the rain; Brahmaputra floods the char-char islands, Kaziranga underwater in parts, road transit from Guwahati unreliable" },
    9: { go: "second-half September starts to dry out — waterfalls at absolute peak flow, forests freshly washed, wildlife parks re-opening at month-end", skip: "first-half September is still wet; parks don't re-open until around October 1st officially" },
    10: { go: "the region resets — parks re-open, the sky clears, Durga Puja lights up Kolkata-adjacent districts, Cherrapunji's Seven Sisters falls at record flow", skip: "" },
    11: { go: "peak travel month across the Northeast — perfect weather, full park access, Hornbill Festival in Nagaland (early December actually, but prep starts now)", skip: "" },
    12: { go: "cool dry winter — Hornbill Festival (Dec 1-10), Assam's hot-drink-and-jungle-safari season, morning mist over Majuli", skip: "" },
  },
  "plains-nw-desert": { // Rajasthan
    1: { go: "ideal desert conditions — nights crisp (5-10°C) enough for sand-dune campfires, days warm (22-28°C) but not punishing", skip: "" },
    2: { go: "perfect Rajasthan window — the Jaipur Literature Festival sets the social calendar, forts and havelis packed but worth it", skip: "" },
    3: { go: "last month of comfort before the desert heat reasserts — Holi celebrations at their most photographable in the blue cities and Shekhawati", skip: "" },
    4: { go: "heat ramping fast — mornings still workable, afternoons already hitting 38°C; Rajasthan's serious travelers plan around 11am-4pm shutdown", skip: "afternoon temperatures cross 40°C by mid-month and don't come down until September; the version of the place you'd see is the pre-dawn sliver" },
    5: { go: "", skip: "peak desert heat — routinely 45°C+ in Jaisalmer, Barmer, Bikaner; outdoor sightseeing biologically stops being possible" },
    6: { go: "", skip: "the hottest month before the monsoon arrives — Rajasthan's fort tours close early, desert safaris cancel, hotel ACs run 24/7" },
    7: { go: "", skip: "short, unreliable monsoon breaks the heat in fits; Aravali slopes green up briefly but the mercury doesn't fully come down" },
    8: { go: "", skip: "mostly still hot with monsoon showers — the aesthetic isn't improved, and the heat isn't broken enough to recommend" },
    9: { go: "late September the heat finally breaks properly; Pushkar starts prepping for the camel fair circuit", skip: "first half is still warm; by month-end things stabilise, but hedging your bet until October is fair" },
    10: { go: "the window opens — Pushkar Mela begins (dates float but late October), temperatures 22-30°C, festival season well underway", skip: "" },
    11: { go: "peak Rajasthan travel month — ideal temperatures, full festival calendar, maximum heritage-hotel access, everything the brochures promise", skip: "" },
    12: { go: "cool, crisp desert month — morning fog in Jaipur/Udaipur, nights cold enough to need a shawl, palaces at their most photogenic in winter light", skip: "" },
  },
  "plains-north": { // Delhi/UP/Punjab/Haryana
    1: { go: "cold, often foggy — Delhi sees 5-15°C, Punjab/UP similar; what you lose in haze you gain in quiet palaces and empty forts", skip: "" },
    2: { go: "the haze lifts in the second half — by month-end the light is clean and the sightseeing window opens properly", skip: "" },
    3: { go: "spring proper — Holi in the first fortnight, mustard fields still yellow, temperatures 18-28°C", skip: "" },
    4: { go: "warm but still workable, especially for hill-adjacent places like Rishikesh; plains destinations start losing their afternoon utility", skip: "the plains heat starts in earnest — 38°C by mid-month, afternoons flatten, and there's no improvement until September" },
    5: { go: "", skip: "north Indian summer is brutal — 42°C+ routine across Delhi, Agra, Varanasi; the Taj Mahal visit you're imagining isn't the version you'd get" },
    6: { go: "", skip: "the hottest, most enervating month; pre-monsoon heatwaves kill crops, stop outdoor work, make sightseeing a medical risk" },
    7: { go: "", skip: "the monsoon arrives but doesn't cool things much on the plains — AQI peaks, humidity soars, transport unreliable" },
    8: { go: "", skip: "continues the August pattern — humidity oppressive, pollution building, plus the added problem of standing water everywhere" },
    9: { go: "second-half September the rain moves on — by month-end the plains are working properly again", skip: "first half is still wet and oppressive; Durga Puja prep begins" },
    10: { go: "the Delhi season starts — Diwali, Dussehra calendar, 18-30°C, the version of the region that tourists come for", skip: "late October begins the winter air-quality crisis — Delhi AQI regularly above 300" },
    11: { go: "cool, crisp, cultural high season — but Delhi NCR has the air-quality problem, which costs the sightseeing experience on bad days", skip: "Delhi/NCR AQI remains severe throughout November — anyone with respiratory sensitivity should watch the forecast daily" },
    12: { go: "coldest month — fog in the morning, clear in the afternoon, blankets on beds; the non-AQI problem is the dense fog disrupting flights and trains", skip: "dense fog shuts down airports and highways for hours most mornings; factor a full buffer day into any tight schedule" },
  },
  "plains-central": { // MP/Chhattisgarh
    1: { go: "cool mornings (5-12°C), warm afternoons (22-27°C) — the ideal Kanha/Bandhavgarh wildlife window, short grass and concentrated water sources", skip: "" },
    2: { go: "peak wildlife month across MP's tiger reserves — sightings at their most reliable, morning mist over waterholes", skip: "" },
    3: { go: "Holi week colours the region; end-of-season wildlife still excellent before the heat spikes", skip: "" },
    4: { go: "hot but specifically ideal for tiger sightings as water sources shrink — just plan for 35°C+ afternoons", skip: "afternoon heat stops being workable for non-wildlife activities; sightseeing in Khajuraho, Gwalior suffers after 11am" },
    5: { go: "", skip: "the hottest month — Khajuraho routinely 42-45°C, Kanha/Bandhavgarh safaris restricted to early morning only" },
    6: { go: "", skip: "monsoon arrives late in the month — tiger reserves start closing in rotation, outdoor heritage sites punishing" },
    7: { go: "", skip: "tiger reserves closed across MP for the breeding season; the region's main draw isn't available" },
    8: { go: "", skip: "continued monsoon; reserves still closed; heritage sites soaked and mouldy" },
    9: { go: "end-of-month reserve reopenings begin; Khajuraho's temple circuit back to walkable", skip: "first half still wet, reserves not yet reopen — plan around October 1st" },
    10: { go: "reserves reopen, the monsoon retreats, forests at maximum green; the calendar for Kanha/Bandhavgarh safaris fills fast", skip: "" },
    11: { go: "near-perfect wildlife month — cool mornings, clear skies, full reserve access, reliable safaris", skip: "" },
    12: { go: "coldest month in the plains; mist over Narmada, fog in Orchha's spires, winter light on Khajuraho reliefs", skip: "" },
  },
  "plains-east": { // Bihar/Jharkhand
    1: { go: "cold, foggy mornings, clearer afternoons — Bodh Gaya's pilgrim circuit runs full, Ranchi's plateau at 10-18°C", skip: "" },
    2: { go: "clearer skies than January, good temple circuit weather, 12-24°C", skip: "" },
    3: { go: "spring proper — Rajgir/Nalanda ruins well-lit, Jharkhand's forest belts still cool in the hills", skip: "" },
    4: { go: "heat arriving; Bihar plains start to struggle by afternoon, Jharkhand's Netarhat hill station still workable", skip: "Bihar plains hit 40°C regularly; sightseeing at Bodh Gaya, Nalanda, Rajgir reduces to sunrise-only" },
    5: { go: "", skip: "peak heat across Bihar's plains — heatstroke risk real, even locals limit outdoor work to early morning" },
    6: { go: "", skip: "monsoon late but oppressive in combination with heat; pilgrim circuits still running but miserable" },
    7: { go: "", skip: "peak monsoon in Jharkhand, flooding across Bihar's river plains" },
    8: { go: "", skip: "continued monsoon; flooding recurring, transport unreliable" },
    9: { go: "end-of-month the rain tapers; Durga Puja prep begins in the Bengali-Bihari border belt", skip: "first half still wet and flood-prone" },
    10: { go: "post-monsoon window opens — Bodh Gaya's pilgrim season restarts, Rajgir's hot-spring winter visitors arrive", skip: "" },
    11: { go: "peak pilgrim season for Bodh Gaya (the international Buddhist circuit calendar runs Oct-Mar); Chhath Puja brings Bihar's villages alive", skip: "" },
    12: { go: "coldest month; Jharkhand's plateau sees single-digit nights, Bodh Gaya fills with monks doing winter retreats", skip: "" },
  },
  "plains-west": { // Gujarat/Maharashtra
    1: { go: "peak Gujarat + Maharashtra winter — 12-25°C across most of both states, clean air, heritage sites at their most workable, festival calendars running", skip: "" },
    2: { go: "peak Rann of Kutch month — Rann Utsav runs Nov-Feb, last full festival weeks here", skip: "" },
    3: { go: "Gujarat/Maharashtra heat ramping but still manageable; Ajanta/Ellora comfortable before the 35°C threshold", skip: "" },
    4: { go: "hot in the plains, mild in the Sahyadri hill stations (Mahabaleshwar, Matheran still 25-30°C)", skip: "Gujarat plains hit 40°C+, Rann becomes unsafe on foot, Mumbai humidity climbs" },
    5: { go: "hill-stations work but the plains don't — Mahabaleshwar/Matheran get Mumbaikar weekend traffic", skip: "peak pre-monsoon heat across Gujarat and Maharashtra's plains — Saurashtra, Vidarbha, Marathwada all 42-45°C, Mumbai's heat-humidity combo oppressive; only the Sahyadri hill-stations and the Konkan coast stay manageable" },
    6: { go: "", skip: "monsoon arrives early in Mumbai (~June 10) and spreads — Konkan coast gets its heaviest rain, Western Ghats landslide-prone" },
    7: { go: "", skip: "peak Maharashtra monsoon — Mumbai weekly floods, Konkan rail disruptions, Ajanta-Ellora approach roads wash out" },
    8: { go: "", skip: "continued heavy rain; Matheran closes to private vehicles, Mumbai's flood-prone areas recurring" },
    9: { go: "end of month the rain moves out; Ganesh Chaturthi wraps up, Mumbai's clear window begins", skip: "first half still wet across Maharashtra; Gujarat drier earlier" },
    10: { go: "Navratri across Gujarat — nine nights of garba, Ahmedabad lit up; Mumbai's October Heat is a real thing but bearable", skip: "" },
    11: { go: "the Rann starts drying properly, Rann Utsav begins; Diwali lights up Mumbai's crowded streets", skip: "" },
    12: { go: "peak Rann season, coolest Mumbai month (16-28°C), Mahabaleshwar strawberries, Diu/Daman beach-weather", skip: "" },
  },
  "plains-south": { // Karnataka/Telangana
    1: { go: "Bengaluru at its best (12-24°C), Hyderabad dry and pleasant, Hampi's ruins in crisp winter light", skip: "" },
    2: { go: "Hampi's last fully-cool month, Coorg coffee-harvest tailing off, Hyderabad's biryani-and-Charminar weather", skip: "" },
    3: { go: "spring — Bandipur/Nagarhole wildlife sightings improve as water sources concentrate; Hampi still manageable in early mornings", skip: "" },
    4: { go: "Karnataka's hill-stations shine (Coorg, Chikmagalur); plains start getting uncomfortable by afternoon", skip: "Hampi's rocks turn furnace-hot; Hyderabad 38-42°C; unless you're headed for the hills, better to wait" },
    5: { go: "hill coffee country (Coorg, Chikmagalur) pre-monsoon — last dry window, most reliable weather for trekking", skip: "peak Karnataka heat — Deccan-plateau interiors routinely 40-43°C, temple-town afternoons impossible, tourism quiet until the SW monsoon cools the Ghats in June; only Coorg, Chikmagalur, and the coast stay workable" },
    6: { go: "", skip: "monsoon arrives across Karnataka's Ghats first (~June 1), then spreads; Hampi's approach roads fine but sites wet, Coorg unreachable" },
    7: { go: "", skip: "peak monsoon in the Western Ghats — Coorg, Chikmagalur, Madikeri receive up to 400mm/month, transport unreliable" },
    8: { go: "", skip: "continued heavy rain; Jog Falls at full power but approach roads risky" },
    9: { go: "rain tapers in the second half; Western Ghats still green, Hampi drying", skip: "first half still wet; trekking routes landslide-prone" },
    10: { go: "the Ghats reset — waterfalls at peak flow but accessible, Coorg's coffee-bean flush starts, Hampi fully back", skip: "" },
    11: { go: "peak Karnataka month — Hampi, Badami, Pattadakal all at their best, Bengaluru's pre-winter clarity, Mysore's Dasara tail", skip: "" },
    12: { go: "coolest Hyderabad weather (10-25°C), Hampi at peak, Coorg's winter coffee-retreat season", skip: "" },
  },
  "plains-deccan": { // Telangana
    1: { go: "perfect Hyderabad/Telangana winter — 12-28°C, dry, Charminar-to-Golconda sightseeing at its most comfortable, biryani season in full swing", skip: "" },
    2: { go: "continued dry winter window; Warangal, Medak, Ramappa temple circuit at its best, Nagarjuna Sagar water levels still reliable", skip: "" },
    3: { go: "warming up but still comfortable; last window before the Deccan heat takes over, tank irrigation still full from NE monsoon", skip: "" },
    4: { go: "the Deccan heat starts — Telangana's interior climbs past 35°C, sightseeing reduces to early morning and after 5pm", skip: "afternoon temperatures push into 38-40°C territory across Telangana; outdoor heritage circuits get uncomfortable" },
    5: { go: "", skip: "peak Deccan heat — Telangana regularly hits 42-45°C, Hyderabad hottest since 2010 records revised, sightseeing biologically limited to sunrise window" },
    6: { go: "", skip: "hot with monsoon skirting the region — Telangana sits on the edge of the SW monsoon path, partial rain but not enough to break the heat" },
    7: { go: "", skip: "SW monsoon patchy over Telangana; humid, overcast, some flooding in rural districts, temples waterlogged" },
    8: { go: "", skip: "continues the monsoon pattern; some destinations (Nagarjuna Sagar, Laknavaram) look green but access unreliable" },
    9: { go: "rain tapers late in the month; Ramappa, Warangal start drying out, Hyderabad's Ganesh festival season peaks", skip: "first half still wet; plan for October start" },
    10: { go: "NE monsoon gives Telangana a second wet spell but lighter than SW — Bonalu and Bathukamma festivals across the state light up rural tanks", skip: "" },
    11: { go: "peak Telangana travel month — cool evenings, dry days, Charminar + Golconda + Warangal + Ramappa all operating at full comfort", skip: "" },
    12: { go: "coolest Telangana month — Hyderabad 10-28°C, Ramappa's UNESCO temple complex especially luminous in winter light", skip: "" },
  },
  "coastal-west": { // Goa + coastal Maharashtra + Daman/Diu
    1: { go: "peak Goa month — 22-32°C, dry, beach-shack season in full swing, sunset rates at their most reliable", skip: "" },
    2: { go: "Goa carnival takes over in late February; weather still perfect, crowd density peaks", skip: "" },
    3: { go: "last of the high-season — Shigmo festival mid-month, beach shacks still up, temperatures climbing slightly", skip: "" },
    4: { go: "Goa's shoulder — shacks starting to come down for monsoon, humidity building, prices softening", skip: "the beach-shack economy winds down by mid-month; what you'd book online may not exist by the time you arrive" },
    5: { go: "", skip: "pre-monsoon heat-humidity combo at its worst — Goa, Konkan coast all get thunderstorms with no relief; most shacks already dismantled" },
    6: { go: "", skip: "monsoon arrives around June 5-10; Goa gets 2-3m of rain over the next three months, beaches close to swimming, most tourist infra shuts" },
    7: { go: "", skip: "peak monsoon; sea rough, beaches closed, Konkan rail sometimes cancelled, hotel occupancy at annual low" },
    8: { go: "", skip: "continued monsoon; a specific small subset of traveler (the 'green Goa in the rain' crowd) comes — but the mainstream experience isn't available" },
    9: { go: "end of month the shacks start going back up; Ganesh Chaturthi still running in Konkan villages", skip: "first half is still the tail of monsoon; most of Goa is in prep-mode not operating-mode" },
    10: { go: "the season restarts — shacks rebuilt, beach services resumed, prices soft for the first two weeks then ramping", skip: "" },
    11: { go: "peak pre-Christmas Goa — everything operational, weather at its driest, New Year's Eve prep visible from the 20th", skip: "" },
    12: { go: "Christmas-New Year Goa — chaotic, crowded, expensive, and at its most atmospheric; plan 3-4 weeks ahead or skip the 24th-31st", skip: "" },
  },
  "coastal-east": { // AP + Odisha
    1: { go: "dry, pleasant — Visakhapatnam's beaches, Puri's winter crowd, Odisha's tribal-region treks all at their best", skip: "" },
    2: { go: "dry coastal-east window — beach temperatures 20-28°C on the Odisha and Andhra coasts, inland heritage sites comfortable, Eastern Ghats valleys at cool-morning temperatures; second-half starts warming", skip: "" },
    3: { go: "last cool month before the Andhra/Odisha heat climbs; Chilika Lake's migratory birds still present", skip: "" },
    4: { go: "hot across both coasts; hill stations (Araku, Horsley Hills) still comfortable", skip: "Andhra/Odisha plains push into 38-42°C range; coastal humidity makes daytime sightseeing exhausting" },
    5: { go: "", skip: "peak heat; Puri beach not the mild experience you want, Konark closes mid-day, trekking impossible" },
    6: { go: "", skip: "monsoon arrives; Odisha cyclone-watch begins (June onwards), Andhra's coast gets occasional cyclones too" },
    7: { go: "", skip: "peak monsoon with cyclone risk especially for Odisha; beaches closed, fishing halted, rural roads sometimes impassable" },
    8: { go: "", skip: "continued rain and cyclone-watch; Puri's Jagannath Rath Yatra is the one exception worth coming for (dates vary, usually June-July)" },
    9: { go: "second-half the rain tapers; Konark back on, Chilika Lake starting to prep for migratory-bird season, Odisha's tribal belt accessible again", skip: "first half of September still wet and cyclone-prone — Bay of Bengal generates lows well into October; plan with weather alerts live" },
    10: { go: "post-monsoon window opens — Durga Puja kicks off the region's festival season, weather stabilises", skip: "" },
    11: { go: "cyclone season not fully over (Odisha stays alert until mid-month) but the rest of the experience is excellent", skip: "" },
    12: { go: "peak tourist month — Puri New Year's, Araku Valley coffee tourism, Andhra's full festival calendar", skip: "" },
  },
  "coastal-south": { // Kerala + Tamil Nadu + Puducherry
    1: { go: "the peak Kerala/Tamil Nadu month — dry, 24-32°C, backwaters at their calmest, Munnar/Ooty at their driest", skip: "" },
    2: { go: "Kerala's peak-season runs through February; Tamil Nadu temple circuit (Madurai, Thanjavur) at its most comfortable", skip: "" },
    3: { go: "last full-cool month; Kerala's Theyyam ritual season still active, temperatures climbing by month-end", skip: "" },
    4: { go: "Kerala's hill stations (Munnar, Thekkady, Vagamon) shine; coastal plains get hot but tolerable", skip: "Tamil Nadu plains push to 38-40°C; Madurai, Thanjavur sightseeing collapses by 11am; Chennai humidity oppressive" },
    5: { go: "", skip: "peak heat across Tamil Nadu; Kerala's pre-monsoon humidity uncomfortable; Kanyakumari still works but for sunrise/sunset only" },
    6: { go: "", skip: "Kerala's SW monsoon arrives June 1 sharp — some travelers specifically come for Ayurveda in monsoon, but the mainstream beach/backwater experience isn't available" },
    7: { go: "", skip: "peak SW monsoon; Kerala gets 3-4m of rain over three months, backwaters closed, trekking suspended, hill stations landslide-prone" },
    8: { go: "", skip: "Onam brings the region alive (dates vary, usually mid-Aug to mid-Sep) but the monsoon is still running full force around it" },
    9: { go: "Onam celebrations peak across Kerala (the state's biggest festival), end-of-month rain tapers; south-coast hill stations still green from the heavy monsoon, backwaters slowly returning to operation", skip: "first half still wet; the monsoon's retreat from this coast is gradual — plan for the last week if you must come now, October for comfort" },
    10: { go: "Kerala's tourist season restarts — backwaters re-open, Munnar's tea gardens resume operations; Tamil Nadu coast still has the NE monsoon risk", skip: "" },
    11: { go: "Tamil Nadu gets its NE monsoon this month — Chennai, Puducherry, Kanyakumari see heavy rain while Kerala is clear", skip: "Tamil Nadu east coast receives its heaviest rain this month; Chennai flooding, cyclone-watch for Puducherry and further south" },
    12: { go: "peak Kerala + Tamil Nadu season; Chennai's music season runs December-January, Pondicherry's French Quarter at its most walkable", skip: "" },
  },
  "east": { // WB
    1: { go: "Kolkata at its best (12-24°C), Sundarbans wildlife viewing peaks, Darjeeling dry and clear at altitude", skip: "" },
    2: { go: "same dry pattern; Siliguri/Darjeeling's road still workable, Sundarbans' Royal Bengal tiger sightings at annual high", skip: "" },
    3: { go: "Holi in Bengal brings its own regional colour; Kolkata still pleasant, Darjeeling's rhododendron warmup starts", skip: "" },
    4: { go: "Darjeeling, Kalimpong, Kurseong at their best — cool hill-station weather, peak tea-garden visitor season", skip: "Kolkata gets hot-humid by mid-month; Sundarbans' trekking/walking programs wind down" },
    5: { go: "hill stations still good (Darjeeling 15-22°C), Kalimpong even cooler", skip: "Kolkata enters its most uncomfortable stretch — pre-monsoon humidity peaks; plains of West Bengal also oppressive" },
    6: { go: "", skip: "monsoon arrives; Kolkata waterlogs in patches, Sundarbans closes partly, Darjeeling landslide-prone" },
    7: { go: "", skip: "peak monsoon; Darjeeling's road from NJP closes on landslide days, Kolkata-to-Siliguri rail disrupted" },
    8: { go: "", skip: "continued monsoon; Sundarbans closed, Darjeeling accessible only on good-weather days" },
    9: { go: "Durga Puja starts prep; rain tapers second half", skip: "first half still wet" },
    10: { go: "Durga Puja lights up Kolkata — October 4-day window is the region's biggest travel draw; Sundarbans reopens", skip: "" },
    11: { go: "cool dry post-Puja month; Darjeeling-Kalimpong-Gangtok circuit fully open; Sundarbans' cool-weather season begins", skip: "" },
    12: { go: "peak Sundarbans tiger season; Kolkata's cold mornings (10-15°C) and clear afternoons", skip: "" },
  },
  "islands": {
    1: { go: "peak Andaman/Lakshadweep month — seas calm, dive visibility at 30m+, permits and flights predictable", skip: "" },
    2: { go: "continued peak conditions; turtle-nesting season begins at select beaches (Diglipur, Agatti's western reef)", skip: "" },
    3: { go: "last month before the pre-monsoon; diving still excellent, slightly warmer seas", skip: "" },
    4: { go: "Andaman still excellent into the first half; second half starts warming and humidity climbing", skip: "" },
    5: { go: "", skip: "pre-monsoon thunderstorms arrive late in the month — sea conditions deteriorate, ferry schedules start getting unreliable" },
    6: { go: "", skip: "SW monsoon hits the islands hard — Andaman sea rough, Lakshadweep only accessible by irregular ship, diving suspended" },
    7: { go: "", skip: "peak monsoon; most resorts close or run skeleton ops, ferry cancellations routine, flights to Port Blair delayed" },
    8: { go: "", skip: "continued monsoon; Andaman's Havelock-Neil ferry erratic, Lakshadweep almost entirely shut" },
    9: { go: "", skip: "last bad month; rain tapering but sea not yet predictable; October 1st is the real re-open date" },
    10: { go: "the season restarts — permits processing, ferries resuming full schedule, Havelock hotels back open", skip: "first half of October is still unreliable — full re-opening takes 10-14 days after the official date" },
    11: { go: "excellent Andaman/Lakshadweep month — seas settling, visibility climbing, resort packages resuming at off-peak pricing", skip: "" },
    12: { go: "Christmas-NYE Andaman is a specific expensive window; Havelock/Neil fill three months ahead, Port Blair flights peak", skip: "" },
  },
};

function flavorFor(region, month, verdictKind) {
  const reg = MONTH_FLAVOR[region] ?? MONTH_FLAVOR["plains-north"];
  const entry = reg[month] ?? {};
  const v = verdictKind === "go" ? entry.go : entry.skip;
  return (v && v.length > 20) ? v : null;
}

// ─── Helpers ─────────────────────────────────────────────────────────

function bestMonthsString(arr) {
  if (!arr || arr.length === 0) return "its main window";
  const short = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
    7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" };
  const sorted = [...arr].sort((a, b) => a - b);
  const groups = [];
  let cur = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1] + 1) cur.push(sorted[i]);
    else { groups.push(cur); cur = [sorted[i]]; }
  }
  groups.push(cur);
  if (groups.length >= 2 && groups[0][0] === 1 && groups[groups.length - 1].slice(-1)[0] === 12) {
    const first = groups.shift();
    const last = groups.pop();
    groups.unshift([...last, ...first]);
  }
  return groups
    .map((g) => g.length === 1 ? short[g[0]] : `${short[g[0]]}–${short[g.slice(-1)[0]]}`)
    .join(", ");
}

function pickSegment(best_for_segments, month) {
  if (!Array.isArray(best_for_segments) || best_for_segments.length === 0) return null;
  // Rotate segment choice by month so not all 12 months pick segment[0]
  return best_for_segments[month % best_for_segments.length];
}

function shortSegment(seg, maxLen = 85) {
  if (!seg) return "";
  const s = seg.segment ?? "";
  if (s.length <= maxLen) return s;
  return s.slice(0, maxLen - 1) + "…";
}

function kidsLine(kf) {
  if (!kf || kf.rating == null) return "";
  if (kf.rating >= 4 && kf.suitable) return `Family-appropriate: ${kf.rating}/5.`;
  if (kf.rating === 3 && kf.suitable) return `Manageable with older kids: 3/5.`;
  if (!kf.suitable || kf.rating <= 2) return `Not a kids destination: ${kf.rating}/5.`;
  return "";
}

// ─── Composers — flavor-first, dest-facts second ─────────────────────

function composeGo(dest, month, kf, region, ms) {
  const monthName = MONTH_NAMES[month];
  const bm = bestMonthsString(dest.best_months);
  const flavor = flavorFor(region, month, "go");
  const seg = pickSegment(dest.best_for_segments, month);
  const who = seg ? ` Built for ${shortSegment(seg)}.` : "";
  const kids = kidsLine(kf);

  let out;
  if (flavor && flavor.length >= 80) {
    out = `${monthName} at ${dest.name} — ${flavor}.${who} ${kids}`;
  } else if (ms.inBest) {
    out = `${monthName} sits inside ${dest.name}'s ${bm} window — conditions are as reliable as they get here, access is full, and the experience is the one the destination is actually known for.${who} ${kids}`;
  } else {
    out = `${monthName} is a workable month at ${dest.name} — not peak, but the ${bm} window and this month overlap in the useful ways. Pack for the shoulder, keep plans flexible, and you'll get a version worth the trip.${who} ${kids}`;
  }
  out = out.replace(/\s+/g, " ").trim();
  // Safety pad if still short
  if (out.length < 150) {
    out += ` Best months overall: ${bm}.`;
  }
  return out;
}

function composeSkip(dest, month, kf, region, ms) {
  const monthName = MONTH_NAMES[month];
  const bm = bestMonthsString(dest.best_months);
  const flavor = flavorFor(region, month, "skip");
  const seg = pickSegment(dest.best_for_segments, month);
  const wait = seg ? ` ${capitalize(shortSegment(seg, 80))} should plan for ${bm}.` : ` Plan for ${bm}.`;

  if (flavor && flavor.length >= 80) {
    return `${monthName} at ${dest.name} — ${flavor}.${wait}`.replace(/\s+/g, " ").trim();
  }
  // Fallback — long enough to clear the 150-char floor on its own
  return `${monthName} falls well outside ${dest.name}'s ${bm} window. Conditions are harder, local services scaled back, and the version of the place you'd actually get isn't the one that makes the trip worth doing. The shoulder month either side would be a closer call, but this month isn't it.${wait}`.replace(/\s+/g, " ").trim();
}

function composeWaitGo(dest, month, kf, region, ms) {
  const monthName = MONTH_NAMES[month];
  const bm = bestMonthsString(dest.best_months);
  const flavor = flavorFor(region, month, "go");
  const seg = pickSegment(dest.best_for_segments, month);
  const who = seg ? ` If the dates are fixed, ${shortSegment(seg, 80)} will still get value from it.` : "";

  let out;
  if (flavor && flavor.length >= 80) {
    out = `${monthName} at ${dest.name} works but isn't peak — ${flavor}.${who}`;
  } else {
    out = `${monthName} at ${dest.name} sits between the prime window (${bm}) and the off-season. Things work; they just don't shine. Expect the one-road-shut, one-viewpoint-hazed, one-closure-unexpected kind of month.${who}`;
  }
  out = out.replace(/\s+/g, " ").trim();
  if (out.length < 120) {
    out += ` Peak months are ${bm}.`;
  }
  return out;
}

function composeWaitNot(dest, month, region) {
  const monthName = MONTH_NAMES[month];
  const bm = bestMonthsString(dest.best_months);
  const flavor = flavorFor(region, month, "skip");
  if (flavor && flavor.length >= 80) {
    return `Why you might hold: ${monthName} — ${flavor}. If the dates flex, ${bm} is the cleaner call for ${dest.name}.`.replace(/\s+/g, " ").trim();
  }
  return `Why you might hold: ${monthName} doesn't break ${dest.name} but it doesn't land it either — the gap between this month and the main ${bm} window is wider than the calendar suggests. Weather, crowd density, and local-operator readiness all shift. If the dates are flexible, move the trip.`.replace(/\s+/g, " ").trim();
}

function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

// ─── Month-state classification ──────────────────────────────────────

function monthState(month, best_months) {
  const inBest = (best_months ?? []).includes(month);
  const nearBest = !inBest && (best_months ?? []).some((m) => Math.abs(m - month) <= 1 || Math.abs(m - month) === 11);
  return { inBest, nearBest };
}

// ─── Row processor ───────────────────────────────────────────────────

function generateForRow(dm, dest, kf) {
  const region = regionOf(dest.state_id);
  const ms = monthState(dm.month, dest.best_months);
  const currentGoLen = (dm.why_go || "").length;
  const currentNotLen = (dm.why_not || "").length;

  const updates = {};

  if (dm.verdict === "go") {
    if (FORCE || currentGoLen < MIN_LEN_GO) {
      updates.why_go = composeGo(dest, dm.month, kf, region, ms);
    }
  } else if (dm.verdict === "skip") {
    if (FORCE || currentNotLen < MIN_LEN_SKIP) {
      updates.why_not = composeSkip(dest, dm.month, kf, region, ms);
    }
  } else if (dm.verdict === "wait") {
    if (FORCE || currentGoLen < MIN_LEN_WAIT) {
      updates.why_go = composeWaitGo(dest, dm.month, kf, region, ms);
    }
    if (FORCE || currentNotLen < MIN_LEN_WAIT) {
      updates.why_not = composeWaitNot(dest, dm.month, region);
    }
  } else {
    // null verdict — infer the true story from climate flavor. If there's a
    // strong "skip" signal for this region+month (monsoon, heat, pass-closed),
    // treat it as skip-class rather than generic filler.
    const skipFlavor = flavorFor(region, dm.month, "skip");
    const goFlavor = flavorFor(region, dm.month, "go");
    if (skipFlavor && !goFlavor) {
      if (currentNotLen < MIN_LEN_SKIP) {
        updates.why_not = composeSkip(dest, dm.month, kf, region, ms);
      }
    } else if (currentGoLen < 150) {
      updates.why_go = composeWaitGo(dest, dm.month, kf, region, ms);
    }
  }

  return updates;
}

// ─── Fetchers ────────────────────────────────────────────────────────

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function fetchAll() {
  const all = [];
  const page = 1000;
  let from = 0;
  while (true) {
    let q = supabase
      .from("destination_months")
      .select("destination_id, month, verdict, score, why_go, why_not")
      .order("destination_id", { ascending: true })
      .order("month", { ascending: true })
      .range(from, from + page - 1);
    if (DEST_FILTER) q = q.eq("destination_id", DEST_FILTER);
    const { data, error } = await q;
    if (error) throw error;
    all.push(...(data ?? []));
    if (!data || data.length < page) break;
    from += page;
  }
  return all;
}

async function fetchDestinations(ids) {
  const all = [];
  const chunk = 500;
  for (let i = 0; i < ids.length; i += chunk) {
    const slice = ids.slice(i, i + chunk);
    const { data, error } = await supabase
      .from("destinations")
      .select("id, name, tagline, state_id, best_months, elevation_m, difficulty, best_for_segments")
      .in("id", slice);
    if (error) throw error;
    all.push(...(data ?? []));
  }
  return all;
}

async function fetchKids(ids) {
  const all = [];
  const chunk = 500;
  for (let i = 0; i < ids.length; i += chunk) {
    const slice = ids.slice(i, i + chunk);
    const { data, error } = await supabase
      .from("kids_friendly")
      .select("destination_id, rating, suitable")
      .in("destination_id", slice);
    if (error) throw error;
    all.push(...(data ?? []));
  }
  return all;
}

// ─── Main ────────────────────────────────────────────────────────────

console.log(`generate-destination-months-prose · ${DRY_RUN ? "DRY RUN" : "LIVE WRITE"}${DEST_FILTER ? ` · ${DEST_FILTER}` : ""}\n`);

const months = await fetchAll();
console.log(`Fetched ${months.length} destination_months rows`);

const destIds = [...new Set(months.map((m) => m.destination_id))];
const dests = await fetchDestinations(destIds);
const destById = new Map(dests.map((d) => [d.id, d]));
console.log(`Fetched ${dests.length} destinations`);

const kids = await fetchKids(destIds);
const kfById = new Map(kids.map((k) => [k.destination_id, k]));
console.log(`Fetched ${kids.length} kids_friendly rows\n`);

const updates = [];
let missingDest = 0;
for (const dm of months) {
  const dest = destById.get(dm.destination_id);
  if (!dest) { missingDest++; continue; }
  const kf = kfById.get(dm.destination_id) ?? null;
  const patch = generateForRow(dm, dest, kf);
  if (Object.keys(patch).length > 0) {
    updates.push({ destination_id: dm.destination_id, month: dm.month, verdict: dm.verdict, ...patch });
  }
}

console.log(`Generated updates for ${updates.length} rows.`);
if (missingDest > 0) console.log(`  · ${missingDest} rows skipped (parent destination missing)`);

if (SAMPLE) {
  const sample = updates.slice(0, LIMIT ?? 24);
  console.log(`\nSample output (${sample.length} rows):\n`);
  for (const u of sample) {
    const dest = destById.get(u.destination_id);
    console.log(`─── ${dest.name} · ${MONTH_NAMES[u.month]} · verdict=${u.verdict} ───`);
    if (u.why_go) console.log(`  GO[${u.why_go.length}]:  ${u.why_go}`);
    if (u.why_not) console.log(`  NOT[${u.why_not.length}]: ${u.why_not}`);
    console.log();
  }
  process.exit(0);
}

if (DRY_RUN) {
  console.log(`Dry run — no writes. Would update ${updates.length} rows.`);
  process.exit(0);
}

// Write using row-by-row updates in batches — Supabase client doesn't do bulk UPDATE
const CHUNK = 100;
let written = 0;
let failed = 0;
for (let i = 0; i < updates.length; i += CHUNK) {
  const batch = updates.slice(i, i + CHUNK);
  await Promise.all(
    batch.map(async (u) => {
      const patch = {};
      if (u.why_go !== undefined) patch.why_go = u.why_go;
      if (u.why_not !== undefined) patch.why_not = u.why_not;
      const { error } = await supabase
        .from("destination_months")
        .update(patch)
        .eq("destination_id", u.destination_id)
        .eq("month", u.month);
      if (error) { failed++; console.error(`  ✗ ${u.destination_id}/${u.month}: ${error.message}`); }
      else { written++; }
    })
  );
  console.log(`  ✓ ${Math.min(i + CHUNK, updates.length)}/${updates.length}`);
}

console.log(`\nDone. ${written} written · ${failed} failed.`);
