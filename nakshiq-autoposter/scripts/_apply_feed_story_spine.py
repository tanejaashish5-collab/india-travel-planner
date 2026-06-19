#!/usr/bin/env python3
"""Apply the STORY SPINE (Hook → Tension → Payoff → Turn) to the IG/FB feed
caption templates — Part 2 of the story-refactor (Part 1 was the YT shorts).

WHY: the feed captions were shaped as `hook → fact block → CTA`. This rewrites
hook_template / caption_template / cta_template for every FEED format across the
3 sibling CSVs into a micro-story: a curiosity/tension hook, the brochure-vs-
ground gap, the verified payoff (the SAME data fields), and a turn that fuses
meaning with the comment-CTA.

ZERO FABRICATION GUARANTEE (asserted below): the new templates may only use a
SUBSET of the placeholders the old templates already used. No new data field is
ever introduced → eligibility is unchanged (no format goes dark, the orphan-data
gate can't trip) and no value is invented — only verified fields that were
already on the row.

Rollback = `git checkout` the 3 CSVs (the autoposter reads them from the repo at
runtime; no flag needed — git is the kill switch).

Run:  python3 scripts/_apply_feed_story_spine.py            # writes + validates
      python3 scripts/_apply_feed_story_spine.py --dry-run  # validate only
"""
from __future__ import annotations
import csv
import re
import sys
from pathlib import Path

CSV_DIR = Path(__file__).resolve().parent.parent / "data"
CSV_FILES = ("content_strategy.csv", "content_strategy_v3_tl.csv", "content_strategy_v4_dw.csv")
HEADERS = (
    "format_id", "post_type", "platform", "pillar", "inspired_by",
    "hook_template", "caption_template", "cta_template", "data_inputs",
    "pomelli_prompt", "image_prompt", "video_prompt",
    "asset_aspect", "max_freq_per_month", "notes",
)
_PH = re.compile(r"\{([a-zA-Z_][a-zA-Z0-9_]*)\}")


# ─────────────────────────────────────────────────────────────────────────────
# THE SPINE REWRITES — keyed by format_id → {hook, caption, cta}
# Every value uses ONLY placeholders the original templates already used.
# ─────────────────────────────────────────────────────────────────────────────
SPINE: dict[str, dict[str, str]] = {
    # ── content_strategy.csv (v2) ────────────────────────────────────────────
    "v2_pov_slow_morning": {
        "hook": "The slowest hour in {dest_name} — and the one most people skip.",
        "caption": "Everyone races in for the highlight reel. Almost no one stays for this.\n\nNo alarms, no itinerary — just {state}'s quietest light.\n\n{tagline}\n\nRight now: {note}\n\nGo early, stay still. {dest_name} only opens up for the people who do.",
        "cta": "Comment SUNRISE if you'd wake up for this one.",
    },
    "v2_thali_close_up": {
        "hook": "Some dishes are worth a detour. This one's worth the whole trip to {dest_name}.",
        "caption": "We weren't hunting for it. Our field check just kept circling back to one kitchen.\n\n{eatery_name} — {dest_name}, {state}. Order the {hero_dish}.\n\nNothing sponsored about it. It simply kept winning.\n\n{dest_name} this month: {note}",
        "cta": "We only name kitchens we'd go back to. Comment THALI for more verified family kitchens in {state}.",
    },
    "v2_route_animated_map": {
        "hook": "{route_name}: {total_days} days, {total_km} km, {stop_count} stops that actually earn their place.",
        "caption": "Anyone can list stops. Here's the order that works, day by day.\n\nDay 1: {stop_1_name} — {stop_1_note}\nDay 2: {stop_2_name} — {stop_2_note}\nDay 3: {stop_3_name} — {stop_3_note}\nDay 4: {stop_4_name} — {stop_4_note}\nDay 5: {stop_5_name} — {stop_5_note}\n\nGo: {best_months}. Avoid: {avoid_months}.\nPermits: {permit_note}. Bike-friendly: {bike_friendly}.\n\nThis is the route we'd actually drive.",
        "cta": "Comment the stop you'd skip — we'll DM you the one to add instead.",
    },
    "v2_hindi_score_card": {
        "hook": "{name_hi}, {month_hindi} में — जाएं या रुकें?",
        "caption": "हर कोई तस्वीरें दिखाता है। असली सवाल कोई नहीं पूछता — इस महीने जाना सही है?\n\nहमने परखा:\nस्कोर: {score}/5\nठहरने का खर्च: ₹{price_range_inr}/रात\nक्यों जाएं: {why_special_hi}\n\n{tagline}\n\nहर महीने दोबारा जाँचते हैं — कोई स्पॉन्सर नहीं, बस सच।",
        "cta": "{name_hi} गए हो? कमेंट में बताओ — कब और कैसा लगा।",
    },
    "v2_ugc_spotlight": {
        "hook": "Something in {dest_name}, {state} stopped us this {month_name}.",
        "caption": "Most feeds scroll right past places like this. We flagged it.\n\nWhat caught our eye: {tagline}\n\nWhy it's on the radar: {why_special}\n\nHonest score this {month_name}: {score}/5.",
        "cta": "Comment 📍 if you'd add this to your week.",
    },
    "v2_wildlife_moment": {
        "hook": "{dest_name} — where the wild is still at the edge of the trail.",
        "caption": "You don't always get the sighting. But when {dest_name} delivers, it stays with you.\n\n{tagline}\n\nWhat to expect this {month_name}: {note}\n\nWhy it's worth the patience: {why_special}\n\nHonest score: {score}/5.",
        "cta": "Comment your last sighting in {state}.",
    },
    "v2_texture_macro": {
        "hook": "{texture_subject}. {dest_name}. The detail you'd walk right past.",
        "caption": "We almost did — twice — before we stopped and really looked.\n\n{texture_subject}, just outside {nearest_landmark}.\n\nNotice the {detail_1}. Then the {detail_2}.\n\nThe big views get the photos. The small ones stay with you.",
        "cta": "Comment what your eye went to first.",
    },
    "v2_budget_receipt": {
        "hook": "What a night in {dest_name} actually costs — not the brochure number.",
        "caption": "Everyone quotes you the headline rate. Here's what we actually found on the ground.\n\n{dest_name}, {state}: stays run ₹{price_range_inr}/night — the verified range across real hotels and guesthouses, nothing sponsored.\n\nThis month: {note}\n\nThat's the whole point — we re-check price, weather, roads, crowds and signal every single month.",
        "cta": "Comment your destination — we'll pull its real cost range next.",
    },
    "v2_cost_vs_feeling": {
        "hook": "₹{cost_inr} doesn't sound like much — until you see what it bought in {dest_name}.",
        "caption": "Slide 1: the receipt. Slide 2: the moment it paid for.\n\n₹{cost_inr} = {feeling_phrase}.\n{experience_summary}.\n\n{dest_name}, {state}. Verified {verification_date}. Score this month: {score}/5.\n\nNot every rupee travels this far. This one did.",
        "cta": "Comment ₹ and we'll show the next 3 places where this still works.",
    },
    "v2_myth_bust_oneline": {
        "hook": "Most reels about {dest_name} sell you the postcard. Here's the rest.",
        "caption": "What you've been told: {tagline}\n\nWhat we actually verified for {month_name}: {note}\n\nSame place, honest score: {score}/5.\n\nThe pretty version isn't wrong. It's just not the whole story.",
        "cta": "Comment the place whose hype didn't match what you saw.",
    },
    "v2_series_episode": {
        "hook": "{state} this {month_name}, one honest pick a day. Today: {dest_name}.",
        "caption": "No sponsored lists, no copy-paste itineraries — just the place we'd actually send you this week.\n\n{tagline}\n\nWhy go: {why_special}\nEat: {hero_dish} at {eatery_name}\nStay: from ₹{price_range_inr}/night\n\nHonest score: {score}/5.",
        "cta": "Comment {state} for tomorrow's pick.",
    },
    "v2_local_knows": {
        "hook": "Everyone shows you {dest_name}. Almost no one tells you what {month_name} is actually like there.",
        "caption": "Skip the brochure — here's the ground truth.\n\n{dest_name}, {state}, right now: {note}\n\nAnd still, it earns the trip: {why_special}\n\nThat's the difference — we re-check every place, every month. No sponsors, no recycled listicles.",
        "cta": "Comment your destination — we'll give you the unfiltered read.",
    },
    "v2_score_card_pov": {
        "hook": "{dest_name} in {month_name}: {score}/5. Before you book, here's why.",
        "caption": "Same destination everyone's posting — our honest read.\n\nWhat's actually true this month: {note}\n\nVerdict: {score}/5. Stays from ₹{price_range_inr}/night.\n\nWe score every place monthly on weather, roads, crowds, hospitals and signal — not vibes, not sponsored lists.",
        "cta": "Comment YES if {score}/5 feels right. NO if you'd score it differently.",
    },
    "v2_arrival_intel_video": {
        "hook": "Your first 4 hours at {iata} decide your whole trip to {city}.",
        "caption": "The airport is where most {city} trips quietly go wrong. Here's what actually happens.\n\n1. Watch for: {scam_warning}\n2. Pre-paid taxi: {prepaid_taxi}\n3. SIM counter: {sim_counters}\n4. ATM: {atm_location}\n5. First night, sleep here: {first_night_stay}\n\nVerified on the ground {verification_date}.",
        "cta": "Comment '{iata}' — we'll DM you the airport map.",
    },
    "v2_hidden_gem_reveal_atmo": {
        "hook": "{distance_km} km from {near_destination_name}, and almost no one makes the turn.",
        "caption": "{gem_name}.\n\nWhy you've never heard of it: {why_unknown}\n\nWhat you'd actually see: {why_go}\nHow to reach: {access_note}\nDon't go in: {avoid_months}\n\nPop. ~{population}. Verified {verification_date}.\n\nSome places stay secret because they're hard to reach. This one's worth the detour.",
        "cta": "Comment 📍 if you'd detour. Tag the friend who'd drive.",
    },
    "v2_cost_index_handwritten": {
        "hook": "{dest_name}, {month_name} — hand-checked, line by line.",
        "caption": "Not scraped, not guessed. What we actually found on the ground:\n\n{dest_name}, {state}.\nStays: ₹{price_range_inr} (verified across real hotels + guesthouses).\nEat: {hero_dish} at {eatery_name}.\nGround truth: {note}\n\nHonest score: {score}/5. Re-checked monthly, never sponsored.",
        "cta": "Comment your dest — we'll pull its real numbers next.",
    },
    "v2_weekend_escape_map": {
        "hook": "{drive_hours}h from {anchor_city}, and a completely different weekend: {dest_name}.",
        "caption": "Same Friday everyone's stuck in traffic — here's where we'd point the car instead.\n\n{dest_name}. {drive_hours} hours from {anchor_city}.\n\nBest Fri→Sun window: {best_window}\nThe drive: {drive_route_note}\nStay: {stay_pick_name}\nDo: {weekend_itinerary}\n\nHonest score: {score}/5. Crowd: {crowd_level}.",
        "cta": "Comment {anchor_city} for the next 3 weekend picks within {drive_hours}h.",
    },
    "v2_festival_alert_sensory": {
        "hook": "{festival_name} turns {dest_name} into a different place — for a few days only, from {start_date}.",
        "caption": "Most people find out after it's over. Don't be most people.\n\n{festival_name} · {start_date} – {end_date}\n\nWhat you'll see: {visual_signature}\nWhat you'll hear: {sound_signature}\nWear: {dress_note}\nBring: {bring_list}\n\nWhere: {venue}, {dest_name}, {state}.\nCrowd: {crowd_expectation}. Photos: {photo_note}.",
        "cta": "Comment {festival_name} for the field guide we made.",
    },
    "v2_tourist_trap_split": {
        "hook": "Two versions of {dest_name}. Only one survives a visit.",
        "caption": "The brochure sells you one thing. The ground tells you another.\n\nBrochure: {tagline}\n\nVerified this {month_name}: {note}\n\nHonest score: {score}/5. Checked {verification_date}.\n\nWe'd rather you arrive ready than disappointed.",
        "cta": "Comment a place whose hype didn't match the visit.",
    },
    "v2_women_solo_brief_video": {
        "hook": "Solo and female in {dest_name}? Here's the brief we wish existed.",
        "caption": "Not generic safety tips — the specific, on-the-ground read for {duration} in {dest_name}.\n\nStay (felt safe): {safe_stay_name} · {safe_stay_note}\nStay (avoid): {avoid_stay_note}\nDay routes: {day_routes}\nAfter dark: {night_advice}\nHelpline that worked: {helpline_local}\n\nSolo-friendly score: {solo_score}/5. Crowd: {crowd_level}.",
        "cta": "Comment your dest — we'll do the next women-solo audit.",
    },

    # ── content_strategy_v3_tl.csv (v3) ──────────────────────────────────────
    "v3_tl_editorial_listicle": {
        "hook": "{state}'s {listicle_count} best places this {month_name} — ranked by data, not Tripadvisor.",
        "caption": "Anyone can rank by popularity. We ranked by what actually holds up this month.\n\n{listicle_body}\n\nEvery score checks weather, roads, crowds, hospitals and signal. Verified {verification_date}.",
        "cta": "Save this. Comment LIST for the month-by-month breakdown.",
    },
    "v3_tl_hotel_drone_feature": {
        "hook": "{property_name}, {state} — {bed_count} rooms, ₹{rate_inr}/night, and the honest version.",
        "caption": "We don't take comps, so here's the unfiltered read.\n\n{property_name} sits {distance_from_landmark_km}km from {landmark_name}, {state}.\n\nBuilt {year_built}. {bed_count} rooms. Cheapest verified rate this month: ₹{rate_inr}/night.\n\nWhat's here: {amenity_list}\nWhat's not: {missing_note}\nVibe: {vibe_one_line}\n\nVerified booked {verification_date}. Not sponsored.",
        "cta": "Comment STAY for the verified booking link in DM.",
    },
    "v3_tl_first_person_essay": {
        "hook": "I went to {dest_name} expecting one thing. I left with another.",
        "caption": "Slide 1: where it began. Slides 2–4: what changed. Slide 5: what I'd tell you.\n\n{dest_name}, {state}. {duration_days} days, {duration_year} {duration_season}.\n\nWhat I expected: {expectation}\nWhat I got: {reality}\n\nVerdict: {score}/5. Worth it: {worth_it_short}.\n\n— {writer_handle}, NakshIQ desk",
        "cta": "Drop your answer in the comments — would you go after reading this?",
    },
    "v3_tl_city_neighborhood": {
        "hook": "{city_name}, neighbourhood by neighbourhood — {neighbourhood_count} stops, in the right order.",
        "caption": "Most guides dump every area on you at once. Here's how a local actually moves through {city_name}, {state} this {month_name}.\n\n{nbhd_1_name} → {nbhd_1_one_word}\n{nbhd_2_name} → {nbhd_2_one_word}\n{nbhd_3_name} → {nbhd_3_one_word}\n{nbhd_4_name} → {nbhd_4_one_word}\n{nbhd_5_name} → {nbhd_5_one_word}\n\nOne-day order: {recommended_order}\nAvoid in {avoid_window}: {avoid_neighbourhoods}\n\nVerified {verification_date}.",
        "cta": "Save this. Comment your favourite — we'll do the next city.",
    },
    "v3_tl_world_best_india": {
        "hook": "NakshIQ India {category_label} of the Year, {year} — and it's not who you'd guess.",
        "caption": "We field-audited {pool_size} {category_plural} this year. One stood above the rest.\n\n{winner_name}, {state}. Score: {score}/5. Verified visits: {audit_count}.\n\nWhy this one: {citation_text}\n\nRunner-up: {runner_up_name}, {runner_up_state}.\nBronze: {bronze_name}, {bronze_state}.\n\nThe full 10 reveal over the next 10 days. Same time, same place.",
        "cta": "Comment {category_singular_lowercase} for the methodology DM.",
    },
    "v3_tl_poll_reel": {
        "hook": "{dest_a_name} or {dest_b_name} this {month_name}? Your gut says one. The data says another.",
        "caption": "Two destinations, one month, an honest call.\n\n{dest_a_name}: {dest_a_score}/5\n{dest_b_name}: {dest_b_score}/5\n\nOur numbers lean {data_winner_name} this month — scored on weather, roads, crowds, hospitals and signal.\n\nNo sponsors. Just the numbers.",
        "cta": "Drop A or B in the comments — we'll publish your verdict next week.",
    },
    "v3_tl_news_announcement": {
        "hook": "Just announced: {headline}",
        "caption": "If you're travelling soon, this one actually matters.\n\nWhat changed: {change_summary}\nEffective: {effective_date}\nWho it affects: {affected_audience}\nConfirm here: {primary_source_note}\n\nWhy it matters: {why_matters_one_line}\n\nSource in our pinned comment. NakshIQ desk · verified {verification_date}.",
        "cta": "Save this if you're travelling {effective_date_short}.",
    },

    # ── content_strategy_v4_dw.csv (v4) ──────────────────────────────────────
    "v4_dw_archival_modern_carousel": {
        "hook": "{dest_name}, {state}: the brochure, and then the truth.",
        "caption": "Two pictures of the same place. One sells. One holds up.\n\nBrochure pitch: {tagline}\n\nWhat we verified on the ground: {why_special}\n\nThis {month_name}: {note}\n\nHonest score: {score}/5. Re-verified {verification_date}.",
        "cta": "Comment THEN if you've been — we're collecting before/after notes.",
    },
    "v4_dw_local_historian_spotlight": {
        "hook": "{dest_name}, {state} — most reels stop at the view. The story's underneath.",
        "caption": "Anyone can shoot the postcard. Here's the substance most miss.\n\nThe pitch: {tagline}\n\nWhat actually makes it work: {why_special}\n\nThis {month_name}: {note}\n\nHonest score: {score}/5.",
        "cta": "Comment a place you want us to decode next.",
    },
    "v4_dw_counter_narrative_myth_bust": {
        "hook": "Myth: {myth_claim_short}. Reality: {real_short}.",
        "caption": "You've heard this one repeated as fact.\n\nThe myth: {myth_claim_full}\nWho says it: {who_claims_it}\n\nThe reality:\n{true_history}\n\nWhy the myth survives: {why_myth_persists}\n\nSource: {primary_source_citation}\nHistorian on record: {local_historian_name_or_role}\nVerified {verification_date}.",
        "cta": "Comment the next heritage myth you want us to bust.",
    },
    "v4_dw_heritage_reel_sensory_pov": {
        "hook": "{name}, in {destination_name} — a few days a year, the place transforms.",
        "caption": "Blink and you miss it. Here's what it's actually like.\n\n{name} in {destination_name}.\n\n{description}\n\nWhen: {month_name}. Verified {verification_date}.",
        "cta": "Comment the festival you want NakshIQ to cover next.",
    },
    "v4_dw_walk_itinerary_day_by_day": {
        "hook": "{dest_name}, {state} — one day, hour-checked so you don't waste it.",
        "caption": "Most one-day plans are guesses. We actually walked this one.\n\nWhy go: {why_special}\nEat: {hero_dish} at {eatery_name} · ₹{price_range_inr}\nHeads-up for {month_name}: {note}\n\nHonest score: {score}/5.",
        "cta": "Comment DAY — we'll send the printable plan in DM.",
    },
    "v4_dw_architecture_detail_deep_dive": {
        "hook": "{dest_name}, {state} — decoded, not just photographed.",
        "caption": "The picture pulls you in. The detail is why it lasts.\n\nThe picture: {tagline}\n\nWhat makes it work: {why_special}\n\nThis {month_name}: {note}\n\nHonest score: {score}/5. Re-verified {verification_date}.",
        "cta": "Comment the next dest you want decoded.",
    },
}


def ph(*texts: str) -> set[str]:
    out: set[str] = set()
    for t in texts:
        out |= set(_PH.findall(t or ""))
    return out


def main() -> int:
    dry = "--dry-run" in sys.argv
    seen: set[str] = set()
    violations: list[str] = []
    changed_total = 0

    for fname in CSV_FILES:
        path = CSV_DIR / fname
        rows: list[dict] = []
        with open(path, encoding="utf-8", newline="") as f:
            reader = csv.DictReader(f)
            if tuple(reader.fieldnames or ()) != HEADERS:
                print(f"  !! {fname}: header mismatch — aborting")
                return 2
            for row in reader:
                rows.append(row)

        changed = 0
        for row in rows:
            fid = (row.get("format_id") or "").strip()
            if fid not in SPINE:
                continue
            seen.add(fid)
            old_ph = ph(row["hook_template"], row["caption_template"], row["cta_template"])
            new = SPINE[fid]
            new_ph = ph(new["hook"], new["caption"], new["cta"])
            # ZERO-FAB GUARD: new templates may only use placeholders the old
            # ones already used. A new placeholder = a new data need = risk.
            extra = new_ph - old_ph
            if extra:
                violations.append(f"{fid}: new placeholders not in original → {sorted(extra)}")
                continue
            row["hook_template"] = new["hook"]
            row["caption_template"] = new["caption"]
            row["cta_template"] = new["cta"]
            changed += 1

        changed_total += changed
        print(f"  {fname}: {changed} formats rewritten")

        if not dry and changed:
            with open(path, "w", encoding="utf-8", newline="") as f:
                w = csv.DictWriter(f, fieldnames=HEADERS, quoting=csv.QUOTE_ALL, lineterminator="\n")
                w.writeheader()
                for row in rows:
                    w.writerow(row)

    missing = set(SPINE) - seen
    if missing:
        violations.append(f"SPINE keys not found in any CSV: {sorted(missing)}")

    print(f"\n  total rewritten: {changed_total} / {len(SPINE)} spine entries")
    if violations:
        print("\n  ❌ VIOLATIONS:")
        for v in violations:
            print("   -", v)
        return 1
    print("  ✅ zero-fab guard passed — every new template uses a subset of the original placeholders")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
