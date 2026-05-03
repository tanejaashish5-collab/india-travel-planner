#!/usr/bin/env node
/**
 * Track A — skip-list depth backfill, batch 2 (10 marquee traps).
 *
 * Sessions 5–7 covered 6 traps. The DB has 59 trap destinations with
 * tourist_trap_alternatives rows; this batch adds depth (pain_points +
 * common_complaints + alt_better_for + source_url) to the next 10 by
 * brand-leverage:
 *   mussoorie, darjeeling, agra, jaipur, srinagar, leh, udaipur,
 *   pangong-lake, pushkar, jaisalmer
 *
 * After this run: 16 of 59 traps have full depth (27%). Remaining 43
 * are queued in `backlog_post_sessions_5_to_8.md`.
 *
 * Pattern matches scripts/seed-skip-depth.mjs (Track A = same workflow,
 * different trap set). Migration 039 already added the columns.
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/seed-skip-depth-batch-2.mjs
 *
 * Idempotent — updates the rank-1 row of each trap (trap-level fields)
 * + per-alt rows for alt_better_for. Safe to re-run.
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
    trap: "mussoorie",
    pain_points: [
      "Mall Road weekend gridlock — 1.5km tailbacks; horse touts mob you every 50m",
      "Kempty Falls is a viewpoint surrounded by 80+ stalls; the actual fall is barricaded after 2018 drowning incidents",
      "Char Dukan and Landour 'quiet ridge' are now full of weekenders post-2020 Instagram surge",
      "Toy train ride was discontinued in 2010 — operators sell it without disclosing",
      "Hotel rates 3–5× in May–June and Diwali week; same room ₹2,500 in Aug is ₹12,000 in Jun",
      "Library Bazaar parking ₹200/hr; locals park 2km out and walk in",
    ],
    common_complaints: [
      "We came for Ruskin Bond's Mussoorie. We got Karol Bagh on a hill.",
      "Mall Road on a Saturday is shoulder-to-shoulder for 800 metres.",
      "Kempty Falls had more food stalls than water.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297619-Activities-Mussoorie_Dehradun_District_Uttarakhand.html",
    alts: {
      "lansdowne": "Go to Lansdowne if you want a Cantonment-quiet hill town — Garhwal Rifles HQ keeps it commercially restrained, no Mall Road equivalent.",
      "almora": "Go to Almora if you want a real Kumaoni hill town — Govind Ballabh Pant museum, Chitai temple, no tourist strip.",
      "kausani": "Go to Kausani if you want Gandhi's 'Switzerland of India' framing — 300km of snow-line view from a single ridge.",
      "dhanaulti": "Go to Dhanaulti if you want Mussoorie's altitude (2,286m) without the crowd — 30km away, deodar forest, eco-park, real silence.",
      "kanatal": "Go to Kanatal if you want orchard-and-pine quiet 38km from Mussoorie — no main bazaar, homestays only.",
      "landour": "Go to Landour proper (uphill of Mussoorie) if you must stay in this belt — Char Dukan + Sister's Bazaar still hold their charm if you avoid weekends.",
    },
  },
  {
    trap: "darjeeling",
    pain_points: [
      "Tiger Hill sunrise viewpoint = 80–120 jeeps in a single cul-de-sac at 4am, parking ₹500, view often blocked by clouds Oct–Mar",
      "Chowrasta Mall has aggressive monkey populations; bag-snatching incidents reported daily in summer",
      "Toy train Joy Rides sell out 60+ days ahead; same-day tickets scalped at 4–6× face value",
      "Hotel rates 3–5× during Oct half-marathon week and Christmas/New Year",
      "Tea-garden tours often skip the premium Singell, Castleton, Margaret's Hope estates — they want commission-paying ones",
      "Glenary's brunch wait times hit 90 min in Oct; locals book at 7am to skip the queue",
    ],
    common_complaints: [
      "Drove 8 hours from Bagdogra for a Mall that's the same as any Indian Mall.",
      "Tiger Hill at 4am: a parking lot with 100 phones pointed at clouds.",
      "Toy train was a 30-min loop that cost more than my flight.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g306995-Activities-Darjeeling_Darjeeling_District_West_Bengal.html",
    alts: {
      "kalimpong": "Go to Kalimpong if you want Darjeeling's quieter cousin — flower nurseries, Deolo + Durpin viewpoints, no Mall, 50km away.",
    },
  },
  {
    trap: "agra",
    pain_points: [
      "Taj Mahal entry queue runs 90+ minutes Apr–Jun; security check separates couples (men + women in different lines)",
      "Mehtab Bagh closes at 5pm — too early to catch the proper sunset Taj-from-the-back view in summer",
      "Touts at every monument entrance; 'official guide' badges are sold at street stalls",
      "Hotels in Taj East/West Gate area cost 2–3× for the same 3-star room you'd get in Sadar Bazaar",
      "Fatehpur Sikri (40km out) is sold as 'best preserved Mughal city'; in reality 60% of rooms are empty stone shells",
      "Cantt Station to Taj is 6km via touts who promise ₹50 fare then demand ₹500",
    ],
    common_complaints: [
      "Booked the sunrise slot. Spent the sunrise queueing.",
      "Three different guides cornered me before I'd walked 50 metres.",
      "Taj Mahal interior was 90 seconds of being pushed forward by a crowd.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297683-Activities-Agra_Agra_District_Uttar_Pradesh.html",
    alts: {
      "chitrakoot": "Go to Chitrakoot if you want Mughal-Hindu heritage without the queues — Ramghat parikrama, Tulsidas connection, no monument entry tickets.",
      "orchha": "Go to Orchha if you want a complete Mughal-era town with no touts — Bundela palaces, no 'official guide' badges, 2hr drive from Khajuraho.",
    },
  },
  {
    trap: "jaipur",
    pain_points: [
      "Hawa Mahal: the famous facade is on a busy market road; the inside is a small dusty museum (the photo IS the experience)",
      "Amber Fort elephant rides remain ethically problematic despite multiple FIAPO petitions; 60–90 min queue regardless",
      "City Palace charges per zone — ₹500 entry, then ₹2,500 'Royal Splendor' add-on, then ₹100 each for sub-zones",
      "Heritage hotel rates 3–4× regular city hotels for the same room class — palaces sell history, not service",
      "Pink City pink is hand-repainted every 2–3 years; 'original 1876 pink' is marketing",
      "Most travellers use Jaipur as a logistics hub for Pushkar / Ranthambore / Bundi — rarely worth a 3-day standalone visit",
    ],
    common_complaints: [
      "Walked 2km in 38°C heat to find a building I could see from the highway.",
      "City Palace had four ticket counters and a maze of paid zones.",
      "Came for pink architecture, found mall-grade kitsch on every corner.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g304555-Activities-Jaipur_Jaipur_District_Rajasthan.html",
    alts: {
      "bundi": "Go to Bundi if you want pre-Mughal Rajput architecture without crowds — Taragarh fort, Raniji-ki-baori stepwell, no busloads.",
      "pochampally": "Go to Pochampally if you want craft heritage without commodification — Ikat weaving villages, no entrance fees, no ticket zones.",
      "alwar": "Go to Alwar if you want Mughal+Rajput layering with breathing room — Sariska on the doorstep, Bala Qila, palace-as-museum at sane prices.",
      "shekhawati": "Go to Shekhawati (Mandawa/Nawalgarh/Fatehpur) if you want painted-haveli country — 8x the heritage density of Jaipur and 1/10th the visitors.",
    },
  },
  {
    trap: "srinagar",
    pain_points: [
      "Houseboat operators routinely upsell — extra-night extensions, mandatory shikara rides, 'guide-included' packages with hidden fees",
      "Dal Lake water quality has been D-rated by CPCB since 2020; swimming is unsafe and weed-clearing operations run during peak season",
      "Mughal Gardens (Shalimar / Nishat / Chashme Shahi / Pari Mahal) charge ₹50 entry × 4 — most travellers visit for 25 min each",
      "Floating vegetable market is now 90% tourist boats photographing each other; the actual locals trade pre-dawn before tourists arrive",
      "Shikara fares are 'fixed' but every operator negotiates — expect ₹400 quoted, ₹800 demanded, ₹600 settled",
      "Curfews and strikes (hartal) can shut the city for 2–5 days; 2023 saw 14 such days",
    ],
    common_complaints: [
      "Houseboat owner kept finding 'extras' — coffee ₹100/cup, rose petals ₹500.",
      "Dal Lake was beautiful from a distance, full of plastic up close.",
      "We were locked into a 'package' before we'd even unpacked.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297623-Activities-Srinagar_Srinagar_District_Kashmir_Jammu_and_Kashmir.html",
    alts: {
      "pahalgam": "Go to Pahalgam if you want Kashmir without the houseboat economy — Aru/Betaab/Chandanwari valleys, trout streams, no Dal Lake hawkers.",
      "doodhpathri": "Go to Doodhpathri if you want a Kashmir meadow that hasn't been over-Instagrammed — 50km from Srinagar, golf-quality grass, almost no infrastructure.",
      "sonamarg": "Go to Sonamarg if you want glacier-feed lakes (Vishansar/Krishnasar) and a real trek base — Zoji La gateway, no Dal-Lake-style packaging.",
    },
  },
  {
    trap: "leh",
    pain_points: [
      "AMS (Acute Mountain Sickness) hits 30%+ of visitors — symptoms appear day 1–2; the 'rest 48 hours' rule is widely ignored by operators",
      "Pangong day-trip is brutal — 550km round-trip in one day from 3,500m → 4,250m; many travellers cut short or vomit en route",
      "Khardung La signpost (5,359m) is 5 minutes of photos and nothing else — the cafe + shop are a recent commercial add-on",
      "Restaurant prices in Leh main bazaar run 2–3× mainland costs for similar food (lentils + rice for ₹350)",
      "Permit office queue runs 2–4 hours in peak season; touts charge ₹500–1000 for 'fast-pass' (illegal)",
      "Many 'Leh experience' packages skip the actual monasteries — Shey, Thiksey, Hemis, Lamayuru — and load Pangong/Nubra instead",
    ],
    common_complaints: [
      "Spent the first 3 days throwing up. The package didn't mention altitude.",
      "Drove 11 hours to Pangong, took 5 photos, drove 11 hours back.",
      "Khardung La was a parking lot with a sign and a flag.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g304572-Activities-Leh_Leh_District_Ladakh.html",
    alts: {
      "zanskar": "Go to Zanskar if you want Ladakh without the Leh-loop circuit — Padum + Zanskar river + Phugtal monastery, requires 2-day approach but the region's still uncolonised.",
      "lamayuru": "Go to Lamayuru if you want monastic Ladakh with no day-tripper crowds — moonland landscape, 11th-century gompa, 3hr from Leh.",
      "hanle": "Go to Hanle if you want zero light-pollution astronomy + Tibetan-border quiet — India's first Dark Sky Reserve, 4,500m, fewer than 1,000 visitors a year.",
      "tso-moriri": "Go to Tso Moriri if Pangong feels overrun — same alpine lake aesthetic, 1/10th the visitor numbers, Korzok village stay.",
    },
  },
  {
    trap: "udaipur",
    pain_points: [
      "Lake Pichola sunset boat ride: ₹1,500 PP for 60 min, 50+ tourists per boat, jostling for the same Jagmandir framing",
      "City Palace splits entry into zones — ₹500 base + ₹100–500 each for sub-museums; full visit costs ₹1,200+ per adult",
      "Bagore-ki-Haveli evening dance show is mass-tourism choreography; locals call it the 'foreigner package'",
      "Lake Pichola-facing restaurants charge 2× for the view — same butter chicken ₹450 inside, ₹900 lakeside",
      "Boat to Jagmandir Island ₹400 one-way + ₹300 entry; combined with the regular boat = ₹1,100 just to step on a platform",
      "Old City alleys are jammed with motorcycle traffic; the 'pedestrian-friendly heritage core' marketing is generous",
    ],
    common_complaints: [
      "Romance of the Lake. Followed by 200 selfie sticks.",
      "Three layers of ticket counters before I could see the throne room.",
      "Charged ₹900 for a dal because the table faced water.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297667-Activities-Udaipur_Udaipur_District_Rajasthan.html",
    alts: {
      "bundi": "Go to Bundi if you want lake + palace + stepwells without the price tags — Nawal Sagar, Taragarh Fort, no zone-based ticketing.",
      "dungarpur": "Go to Dungarpur if you want a tribal-heritage Rajasthani town — Juna Mahal frescoes, Gaib Sagar lake, no Bollywood-wedding crowds.",
    },
  },
  {
    trap: "pangong-lake",
    pain_points: [
      "Permit-only access — ILP/PAP needed even for Indian citizens, checkpoint at Tangtse, queue 30–90 min",
      "550km round-trip from Leh in a day is brutal at 4,250m; AMS, vomiting, exhaustion are common",
      "Camp accommodation ₹3,000–8,000/night for a swiss tent at altitude; basic facilities, biofuel-free toilets only",
      "South bank near Spangmik is now busier than the famous '3 Idiots' Lukung-side; both are crowded",
      "Mobile network drops past Tangtse — 4 hours one-way without signal",
      "Lake's blue is real, but the famous yellow Vespa shoot location is now a paid photo prop with queue",
    ],
    common_complaints: [
      "Drove 5 hours to a parking lot of SUVs at the lake's edge.",
      "Got ₹6,000 for a tent with a bucket toilet.",
      "Famous '3 Idiots' chair has its own queue and ₹100 photo fee.",
    ],
    source_url: "https://www.tripadvisor.in/Attraction_Review-g780899-d1747876-Reviews-Pangong_Lake.html",
    alts: {
      "tso-moriri": "Go to Tso Moriri if Pangong feels overrun — same alpine lake aesthetic, 1/10th the visitor numbers, Korzok village stay (a real Changpa nomad settlement, not a camp city).",
    },
  },
  {
    trap: "pushkar",
    pain_points: [
      "Brahma Temple + 52 ghats enforce no-photography but enforcement is patchy — sadhus may demand ₹500 'temple donation' after blessing",
      "5-day Camel Fair window (Kartik Purnima, Oct/Nov) is the only time the town is genuinely interesting; outside it, 4–5 hours is enough",
      "Strict no-meat / no-alcohol rules — even tourist hotels can't serve; a 4-day stay feels long if you want variety",
      "Sadhu touts at ghats run a 'temporary blessing' scam — apply rose petals, then demand ₹2,000+ for prasad",
      "Hotel rates 5× during Camel Fair week — ₹3,000 room becomes ₹15,000",
      "Main Bazaar is now mostly Israeli-circuit cafes selling falafel and shakshuka; the 'ancient pilgrim town' aesthetic is staged",
    ],
    common_complaints: [
      "Got blessed with rose petals, then chased for ₹2,000.",
      "Came for the sacred ghats, found a tie-dye market.",
      "Five days here was three too many — outside Camel Fair, there's nothing.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297667-Activities-c47-Pushkar_Ajmer_District_Rajasthan.html",
    alts: {
      "ajmer": "Go to Ajmer if you want a Sufi-pilgrim alternative — Ajmer Sharif Dargah, no rose-petal scams, real working pilgrim economy. Pushkar is 14km away if you still want a half-day visit.",
    },
  },
  {
    trap: "jaisalmer",
    pain_points: [
      "Sam Sand Dunes camel safari is industrial — 200+ camels in a single line at sunset, choreographed Rajasthani folk dance, mass-market dinner",
      "'Living Fort' status (3,000+ residents inside) means water seepage is structurally damaging the 12th-century yellow sandstone — UNESCO has flagged it",
      "Hotels charge ₹3,000–12,000 for 'fort view' rooms — most rooms in fort-adjacent havelis face inner courtyards; ask before booking",
      "Desert luxury camp experiences cost ₹10,000–25,000/night; 80% of camps within 5km of each other on the Khuri-Sam dune belt",
      "Kuldhara 'ghost town' charges entry but has no signage, no displays, no maintained ruins — just empty stone foundations",
      "Day trip to Bada Bagh / Lodurva sun-temple usually packs you in with 50 others; Jain temples have strict tour windows",
    ],
    common_complaints: [
      "Sunset camel ride was 200 of us in a single-file line.",
      "'Fort view' room faced a courtyard wall.",
      "Kuldhara was a paid walk through dust.",
    ],
    source_url: "https://www.tripadvisor.in/Attractions-g297666-Activities-Jaisalmer_Jaisalmer_District_Rajasthan.html",
    alts: {
      "bikaner": "Go to Bikaner if you want a real Rajasthani fort city — Junagarh Fort (un-touristed), Karni Mata rats temple, Camel Research Centre, none of the Sam Dunes circus.",
      "rann-of-kutch": "Go to Rann of Kutch if you want a desert experience that hasn't been over-staged — Rann Utsav (Nov–Feb) is large but the salt flats themselves remain genuinely vast and quiet.",
    },
  },
];

async function run() {
  console.log("→ Backfilling depth on 10 traps…");
  for (const t of TRAP_DEPTH) {
    // 1) Trap-level fields go on rank-1 row (uses the first rank-1 row's id;
    //    multiple alts may share rank-1, but the columns are trap-level so
    //    setting them on the first row is enough — only the first row is
    //    read by skip-list/[slug]/page.tsx via alternatives[0])
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

    // 2) Per-alt alt_better_for
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
  console.log(`\nDone. ${TRAP_DEPTH.length} traps processed.\n`);
  console.log("Verify:");
  console.log("  curl https://www.nakshiq.com/en/skip-list/mussoorie | grep 'Kempty Falls'");
  console.log("  curl https://www.nakshiq.com/en/skip-list/leh | grep 'AMS'");
}

run();
