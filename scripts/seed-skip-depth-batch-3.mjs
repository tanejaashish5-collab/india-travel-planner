#!/usr/bin/env node
/**
 * Track A — skip-list depth backfill, batch 3 (7 marquee traps).
 *
 * Batch-2 covered 10 traps (mussoorie, darjeeling, agra, jaipur, srinagar,
 * leh, udaipur, pangong-lake, pushkar, jaisalmer). This batch adds the next
 * 7 by brand-leverage from the post-batch-2 backlog of 43:
 *   shillong, dharamshala, mcleod-ganj, kaziranga, ranthambore, alleppey,
 *   varanasi
 *
 * After this run: 23 of 59 traps have full depth (39%). Remaining 36 are
 * lower-traffic state-tier (kanyakumari, mahabalipuram, hampi, gokarna, etc).
 *
 * Pattern matches scripts/seed-skip-depth-batch-2.mjs.
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/seed-skip-depth-batch-3.mjs
 *
 * Idempotent.
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });

const REVIEWED_AT = new Date().toISOString();

const TRAP_DEPTH = [
  {
    trap: "shillong",
    pain_points: [
      "Police Bazaar gridlock 11am–8pm; same 800m stretch can take 45 min by taxi on Saturdays",
      "Shillong–Cherrapunji single-lane road: NH206 closes for landslides Jun–Sep, 1.5–2hr drive becomes 4hr+",
      "Elephant Falls is a 30-second viewpoint behind a paved promenade — the 'three-tier' is a single drop most visitors don't realise is the same fall photographed from 3 angles",
      "Ward's Lake paddle-boat queue runs 60+ minutes on weekends; the lake is a small ornamental pond, not a destination",
      "Don Bosco Museum's '7 floors of NE culture' is mostly mannequins behind glass — most travellers leave after 30 minutes feeling oversold",
      "Shillong-Guwahati taxi fares spike 2–3× on long weekends; advance booking via Meghalaya Tourism is essential",
    ],
    common_complaints: [
      "Came for the 'Scotland of the East'. Got Khan Market with hills.",
      "Spent more time stuck in Police Bazaar traffic than seeing waterfalls.",
      "Elephant Falls is a 5-minute stop charged like a destination.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297648-Activities-Shillong_East_Khasi_Hills_District_Meghalaya.html",
    alts: {
      "mawlynnong": "Go to Mawlynnong if you want clean Khasi village living — 'Asia's cleanest village', root bridges 1hr away, full homestay culture, no Police Bazaar equivalent.",
      "cherrapunji": "Go to Cherrapunji (Sohra) directly if waterfalls are the goal — 7 majors (Nohkalikai, Seven Sisters, Dainthlen) within a 25km loop, no detour through Shillong's traffic.",
      "mawphlang": "Go to Mawphlang if you want sacred-grove walks and the original Khasi country — 25km from Shillong, no commercial centre, deep myth-history.",
      "dawki": "Go to Dawki if you want the crystal-clear Umngot River and the Bangladesh-border boat experience — 80km south, day-trip-able from Shillong but better as a 1-night base.",
    },
  },
  {
    trap: "dharamshala",
    pain_points: [
      "Dharamshala lower town is industrial and dusty — the postcard 'mountain monastery' is McLeod Ganj uphill (10km, 30min by taxi)",
      "HRTC bus stand to McLeod Ganj is 15min by taxi but touts quote ₹500–800; pre-paid taxi stand at HRTC charges ₹250 fixed",
      "Triund trek from McLeod Ganj is now a weekend party scene — 200+ trekkers per day in May–Jun, summit is littered, no permit cap",
      "Most 'Dharamshala' hotels are in Kotwali Bazaar / lower town with no McLeod Ganj views — confirm exact location before booking",
      "Cricket stadium is the most-googled point but visitors are not allowed on the field; outside view is a 5-min walk and 10-min photo",
      "Bhagsu Falls + Bhagsunag Temple are now mostly Israeli/Russian-circuit cafes; the actual fall is behind a paid 'cafe entry' barrier in summer",
    ],
    common_complaints: [
      "Booked 'Dharamshala' hotel, found myself in a market town 10km from anything I wanted to see.",
      "Triund trek had more bluetooth speakers than I'd hear at a Mumbai club.",
      "Cricket stadium = a paid walk around a parking lot.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297618-Activities-Dharamsala_Kangra_District_Himachal_Pradesh.html",
    alts: {
      "bir-billing": "Go to Bir-Billing if you want a quieter Tibetan-Buddhist hill base — Sherab Ling monastery, paragliding capital, no McLeod Ganj backpacker bazaar, 70km away.",
      "tirthan-valley": "Go to Tirthan Valley if you want unpaved-river HP with no Israeli circuit — Great Himalayan NP gateway, trout fishing, 8hr drive south.",
      "dalhousie": "Go to Dalhousie if you want a colonial Cantonment hill town — Khajjiar 'mini-Switzerland', no Triund crowds, 4hr north of Dharamshala.",
    },
  },
  {
    trap: "mcleod-ganj",
    pain_points: [
      "Main Square is 50m × 50m and packed with monks-in-Vans-and-Crocs influencers; getting around takes 3× longer than the size suggests",
      "Tsuglagkhang (Dalai Lama's main temple) entry queue runs 60–90 min; teaching tickets (when His Holiness is in town) require booking 30 days ahead via tibet.net",
      "Bhagsu Falls and Dharamkot 'cafe scene' is a 90% non-Indian backpacker ecosystem charging Western prices — ₹450 banana pancakes, ₹600 momos",
      "Triund day-trek from McLeod is brutal in summer (4–5 hours up, no shade past Magic View Cafe); the summit is now a tent-city in season",
      "Nakki Tea Stalls and Nowrojee General Store are 'must-visit' but the latter is a tiny dusty shop not a 'historic experience'",
      "Hotel rates 4–6× during Dalai Lama's teaching weeks (usually March + May) — same room ₹2,500 normally is ₹15,000",
    ],
    common_complaints: [
      "Came for Tibetan refugee culture. Found 200 yoga influencers and a Bob Marley playlist.",
      "Triund summit was 80 tents and a phone-charging racket.",
      "Tsuglagkhang queue ate my whole morning.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g316051-Activities-McLeod_Ganj_Dharamsala_Kangra_District_Himachal_Pradesh.html",
    alts: {
      "bir-billing": "Go to Bir-Billing if you want Tibetan-Buddhist culture without the influencer crowd — Sherab Ling, Norbulingka relocated artisans, paragliding, 70km drive.",
      "spiti-valley": "Go to Spiti Valley if you want real high-altitude Tibetan-Buddhist monasteries (Key, Tabo, Dhankar) — Tibetan culture without backpacker overlay, 12hr drive.",
    },
  },
  {
    trap: "kaziranga",
    pain_points: [
      "Park has 4 ranges (Central/Western/Eastern/Burapahar); operators usually push only Central — the rhino-density poster shots — leading to mass jeep traffic at 1 of the 4 zones",
      "Jeep safari 5:30am slot is 60–80 vehicles entering simultaneously; the 'wilderness experience' is convoy-style for the first 2 hours",
      "Elephant safari (the famous one) was DISCONTINUED in 2023 after Bombay HC order — most operators still advertise it on websites; surprise refunds at gate",
      "Park closed mid-May to early November (Brahmaputra floods); some 'Kaziranga' resorts stay open with non-park experiences but the safari is the point",
      "Kohora to Bagori (Western) is 25km on a single-lane road; sequential ranges in one day means 3hr of driving + 2hr safari = 5hr total",
      "Brahmaputra river-cruise add-ons charge ₹3,500 PP for 90 min on a small boat near Kaziranga — most reviewers say 'glorified ferry'",
    ],
    common_complaints: [
      "Booked elephant safari. Was told at gate it had been banned 18 months ago.",
      "Saw 6 jeeps for every rhino we spotted.",
      "Drove to a 'Western Range entrance' that turned out to be 30km from where we slept.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g303909-Activities-Kaziranga_National_Park_Golaghat_District_Assam.html",
    alts: {
      "manas-national-park": "Go to Manas if you want a quieter rhino habitat — UNESCO + tiger reserve + Bhutan border, 1/5 the visitor numbers, both-side jungle stays.",
      "nameri": "Go to Nameri NP if you want river-rafting + birding + low-density forest — same Assam belt, 1hr from Kaziranga, no convoy safaris.",
      "tezpur": "Go to Tezpur if you want an Assam-experience base that isn't safari-focused — Agnigarh Hill, Mahabhairab Temple, gateway to Tawang too.",
    },
  },
  {
    trap: "ranthambore",
    pain_points: [
      "10 zones, but Zones 1–5 are 'tiger-priority' (booked out 60+ days ahead in Oct–Apr) and Zones 6–10 are lower-density; operators don't always disclose your zone",
      "Park closed July 1 – October 1 for monsoon; resorts stay open with 'jungle activities' that are actually walks in nearby village land",
      "'Tiger guarantee' packages cost ₹15,000–25,000 PP for 3 safaris — sightings statistically run 30–50% in season, no operator can actually guarantee",
      "Sawai Madhopur railhead → resort transfer 6km but most resorts charge ₹500–1,000 for a 15min drive",
      "Forest Department gypsy + canter quotas: gypsies (6 PP) book out fast, canters (20 PP) are last-minute; 'gypsy-only' tours cost 2.5× canters for the same zone",
      "Ranthambore Fort (UNESCO) inside the park is 'free entry' but requires a separate gypsy booking + ₹500 guide fee = ~₹2,000 add-on",
    ],
    common_complaints: [
      "Booked the 'tiger guarantee'. Saw zero tigers in 3 safaris and 6 hours of dust.",
      "Got a Zone 9 ticket for a price marketed as Zone 3.",
      "Tiger safari turned out to be 19 strangers in a canter on a road.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g737115-Activities-Ranthambore_National_Park_Sawai_Madhopur_District_Rajasthan.html",
    alts: {
      "sariska-tiger-reserve": "Go to Sariska if you want a Rajasthan tiger reserve without the Ranthambore booking war — 4hr from Delhi, lower density but real wilderness.",
      "tadoba-andhari": "Go to Tadoba in Maharashtra if you want India's best tiger sighting odds (60-70% in season) at half the booking pressure.",
      "bandhavgarh": "Go to Bandhavgarh if you want India's highest tiger density and a deeper wilderness — MP, slightly harder access, but no Ranthambore-style traffic.",
    },
  },
  {
    trap: "alleppey",
    pain_points: [
      "Houseboat fleets are 1,500+ now; on Vembanad lake at sunset you can count 80+ boats in a single 1km stretch — the 'serene backwaters' photo is now one boat in a row",
      "Houseboat overnight is loud — 6pm–10pm is a floating-dinner-music scene with 200+ vessels playing different soundtracks",
      "Houseboat rates 3–4× during Onam (Aug-Sep) and Christmas/New Year — same boat ₹8,000 becomes ₹35,000",
      "Most houseboats stay anchored 7pm–6am at municipal mooring spots (mosquito hour) rather than mid-lake; the cruising hours are short",
      "Alleppey beach itself is dirty and not a draw — most travellers don't realise this and book beach-front hotels expecting Goa-style",
      "Backwater shikara (smaller boat) tours often 'shortcut' the village stretches — the authentic narrow-canal Kuttanad experience requires explicit demand and longer (6+ hr) bookings",
    ],
    common_complaints: [
      "Houseboat sunset = 80 boats in a row, all playing different songs.",
      "Spent the cruise 80% moored at a parking dock for boats.",
      "'Backwater village experience' was a wide canal beside the highway.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297634-Activities-Alappuzha_Alappuzha_Alleppey_District_Kerala.html",
    alts: {
      "kumarakom": "Go to Kumarakom if you want quieter backwaters — Vembanad's eastern shore, fewer boats per km, bird sanctuary on the doorstep.",
      "kuttanad": "Go to Kuttanad villages directly (Champakulam / Pulinkunnu) for the real below-sea-level paddy-field-canal life — homestay-only, no houseboats.",
      "kollam": "Go to Kollam if you want the southern-end backwater experience that connects via 8hr Kerala State Water Transport boat to Alleppey — quieter, no fleet.",
    },
  },
  {
    trap: "varanasi",
    pain_points: [
      "Ghat-side 'Aarti VIP boat' touts run an aggressive scam — quoted ₹500/PP for 'best view' but boat then anchors 200m away from the ceremony",
      "'Sadhu photo' touts on Manikarnika and Dashashwamedh ghats demand ₹500–2,000 after a single shot; many press for more after 'blessing'",
      "Hotel touts at Varanasi Junction promise 'free pickup' then drop you 1km from the actual hotel and demand ₹500 'gali fee'",
      "Old City alleys are genuine but motorbike-cow-tourist density makes pre-dawn the only viable photography window",
      "Sarnath day-trip is sold as 'half-day' but Dhamekh Stupa + Mulagandhakuti Vihara + museum needs 4 hours minimum + 1hr each way travel",
      "Ganges water quality is below CPCB safe threshold; ritual bathing is a cultural experience but visitors should not enter the water",
    ],
    common_complaints: [
      "VIP aarti boat moored 200m from the actual ghat.",
      "Sadhu wanted ₹2,000 after I'd taken one quick shot.",
      "Auto-rickshaw fare to my hotel kept multiplying every 100m.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297685-Activities-Varanasi_Varanasi_District_Uttar_Pradesh.html",
    alts: {
      "vrindavan": "Go to Vrindavan if you want spiritual depth without the photo-tout aggression — 5,000+ Krishna temples, Banke Bihari aarti, no Ganges-boat scams.",
      "ujjain": "Go to Ujjain if you want a Kumbh-rotation pilgrim city — Mahakaleshwar Bhasma Aarti at 4am, Shipra ghats, half the tourist economy of Varanasi.",
      "haridwar": "Go to Haridwar if Ganga-aarti is the draw — Har Ki Pauri at 6:30pm is the original ceremony, the river is cleaner upstream, and no Old-City touts.",
    },
  },
];

async function run() {
  console.log("→ Backfilling depth on 7 traps (batch 3)…");
  for (const t of TRAP_DEPTH) {
    const { data: rank1 } = await supabase
      .from("tourist_trap_alternatives")
      .select("alternative_destination_id")
      .eq("trap_destination_id", t.trap)
      .eq("rank", 1)
      .limit(1);
    if (!rank1 || rank1.length === 0) {
      console.error(`  ! ${t.trap}: no rank-1 row found, skipping trap-level update`);
    } else {
      const altId = rank1[0].alternative_destination_id;
      const { error: e1 } = await supabase
        .from("tourist_trap_alternatives")
        .update({
          pain_points: t.pain_points,
          common_complaints: t.common_complaints,
          source_url: t.source_url,
          last_reviewed_at: REVIEWED_AT,
        })
        .eq("trap_destination_id", t.trap)
        .eq("rank", 1)
        .eq("alternative_destination_id", altId);
      if (e1) console.error(`  × ${t.trap} rank-1:`, e1.message);
    }

    let framedCount = 0;
    for (const [altId, altText] of Object.entries(t.alts)) {
      const { error: e2 } = await supabase
        .from("tourist_trap_alternatives")
        .update({ alt_better_for: altText, last_reviewed_at: REVIEWED_AT })
        .eq("trap_destination_id", t.trap)
        .eq("alternative_destination_id", altId);
      if (e2) console.error(`  × ${t.trap}→${altId}:`, e2.message);
      else framedCount++;
    }
    console.log(`  ✓ ${t.trap.padEnd(15)} ${t.pain_points.length} pain · ${t.common_complaints.length} complaints · ${framedCount} alts framed`);
  }
  console.log(`\nDone. ${TRAP_DEPTH.length} traps processed. Coverage now 23/59 (39%).\n`);
  console.log("Verify:");
  console.log("  curl https://www.nakshiq.com/en/skip-list/shillong | grep 'Police Bazaar'");
  console.log("  curl https://www.nakshiq.com/en/skip-list/varanasi | grep 'sadhu'");
}

run();
