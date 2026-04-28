import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Phase 2: in-place updates to keeper rows that just need name/copy/price corrections
// per the dossier flags. No new properties researched.
const updates = [
  // LUCKNOW experience — "Taj Residency Lucknow" is the old brand; current is "Taj Mahal Lucknow"
  {
    where: { destination_id: "lucknow", slot: "experience", name: "Taj Residency Lucknow" },
    set: {
      name: "Taj Mahal Lucknow",
      why_nakshiq:
        "IHCL's flagship Lucknow property on Gomti Nagar Extension — 110 rooms, the Oudhyana restaurant for sit-down Awadhi (galouti, dum biryani, sheermal), and the only 5-star with consistent Gomti-river-facing room blocks. Used as the diplomatic-circuit anchor when state visits land in Lucknow.",
      voice_flags: [],
      confidence: 0.92,
    },
  },
  // LUCKNOW xfactor — "The Lebua Lucknow" rebranded to "Saraca Hotel Lucknow" 2024/25
  {
    where: { destination_id: "lucknow", slot: "xfactor", name: "The Lebua Lucknow" },
    set: {
      name: "Saraca Hotel Lucknow",
      why_nakshiq:
        "Restored Mall Avenue colonial bungalow (formerly lebua Lucknow until the 2024 rebrand), 21 rooms in a heritage shell with a courtyard pool and the Bara Imambara within a 12-minute drive. Awadhi tasting menus and Kathak performances are still on the F&B program post-rebrand — confirm current availability when booking.",
      signature_experience:
        "Courtyard pool dinners with Kathak on Saturday evenings (verify currency at booking — programme has shifted post-rebrand).",
      voice_flags: [],
      confidence: 0.78,
    },
  },
  // AYODHYA location — name correction + factual caveat
  {
    where: { destination_id: "ayodhya", slot: "location", name: "Hotel Yatri Niwas" },
    set: {
      name: "Hotel Saryu Yatri Niwas",
      property_type: "mid_range_hotel",
      why_nakshiq:
        "UP Tourism's government-run pilgrim base, walking distance from Ram Mandir and Saryu Ghat — books out months ahead during ardas-window peaks. No lift (a real issue for senior pilgrims), basic vegetarian breakfast, and Nov-Dec 2025 reviews flagged approach-road potholes. Practical pilgrim-tier choice if you want a temple-walkable bed; not a comfort pick.",
      voice_flags: [],
      confidence: 0.82,
    },
  },
  // AYODHYA xfactor — name correction (PRAVEG, not "Saryu Riverside Camp") + price + caveat
  {
    where: { destination_id: "ayodhya", slot: "xfactor", name: "Saryu Riverside Camp" },
    set: {
      name: "PRAVEG Saryu Resort, Ayodhya",
      property_type: "glamping",
      price_band: "₹8–15k",
      why_nakshiq:
        "PRAVEG's tent-city operation on the Saryu floodplain (4.1km from Ram Mandir — shuttle-dependent, not walkable). Air-conditioned canvas suites, in-tent attached bathrooms, and a riverbank dining lawn. 2025 reviews flagged maintenance lapses and below-average food, so set comfort expectations accordingly. The reason to pick it is the open sky and river setting in a city otherwise dominated by concrete pilgrim hotels.",
      signature_experience:
        "Saryu floodplain sundowner from the riverbank dining lawn after the 6pm aarti at Ram Ki Paidi (4.1km, hotel shuttle).",
      voice_flags: [],
      confidence: 0.7,
    },
  },
  // KUSHINAGAR value — Lotus Nikko price band correction (₹3-5k → ₹4-7k per dossier)
  {
    where: { destination_id: "kushinagar", slot: "value", name: "Hotel Lotus Nikko" },
    set: {
      name: "Lotus Nikko Hotel, Kushinagar",
      price_band: "₹4–7k",
      why_nakshiq:
        "Japanese-funded mid-tier hotel a 5-minute walk from Mahaparinirvana Temple — the most consistently-reviewed property in Kushinagar across MakeMyTrip/Goibibo/Tripadvisor. Restaurant runs both an Indian veg menu and a small Japanese set (miso, tempura, soba) for the Buddhist pilgrim circuit from Tokyo and Osaka. Functional, not luxe.",
      voice_flags: [],
      confidence: 0.82,
    },
  },
  // VRINDAVAN value — name correction (Brijwasi Home → BRiJWAS DHAM) + drop "authentic"
  {
    where: { destination_id: "vrindavan", slot: "value", name: "The Brijwasi Home" },
    set: {
      name: "Brijwas Dham, Vrindavan",
      property_type: "guesthouse",
      price_band: "₹2.5–4.5k",
      why_nakshiq:
        "Brijwasi-chain guesthouse on Iskcon Goshala Road, ~200m from Banke Bihari and Radha Vallabh temples. Pure-veg, no alcohol (religious bylaw), home-style Brij thalis at fixed sittings. Booked solid through Janmashtami and Holi — book 6+ weeks ahead for those windows.",
      voice_flags: [],
      confidence: 0.75,
    },
  },
  // DUDHWA value — drop "authentic" banned word
  {
    where: { destination_id: "dudhwa-national-park", slot: "value", name: "Dudhwa Sarai Homestay" },
    set: {
      why_nakshiq:
        "Lakhimpur-Kheri family homestay running a small inventory near the park entry. Home-style Awadhi-thali meals (the host family cooks on order), shared jeep-safari arrangements, and direct rides to the Dudhwa core zone gate without resort markup. Bookings via WhatsApp or UP Eco Tourism portal, not aggregator sites — confirm rate and dates by phone before travel.",
      voice_flags: [],
    },
  },
  // DUDHWA xfactor — drop "immersion" banned word
  {
    where: { destination_id: "dudhwa-national-park", slot: "xfactor", name: "Teli Jungle Camp" },
    set: {
      why_nakshiq:
        "Canvas-tent camp on the Suheli river within the Dudhwa buffer, run by a small private operator. Tents are cot-and-mattress simple, the food is forest-camp basic, and the draw is being on the river before sunrise when the swamp deer come down to drink. Verify operating status and exact location via UP Tourism before booking — the camp shifts seasonally with the river level.",
      voice_flags: [],
    },
  },
];

console.log(`Applying ${updates.length} mechanical fixes…`);
let applied = 0;
for (const u of updates) {
  const set = { ...u.set, refreshed_at: new Date().toISOString() };
  const { error, count } = await s
    .from("destination_stay_picks")
    .update(set, { count: "exact" })
    .eq("destination_id", u.where.destination_id)
    .eq("slot", u.where.slot)
    .eq("name", u.where.name);
  if (error) {
    console.error(`  ✗ ${u.where.destination_id}/${u.where.slot}/${u.where.name} — ${error.message}`);
  } else {
    console.log(`  ✓ ${u.where.destination_id}/${u.where.slot} (${u.where.name} → ${u.set.name ?? "kept"})`);
    applied += count ?? 0;
  }
}
console.log(`\n${applied}/${updates.length} rows updated`);
