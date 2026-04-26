#!/usr/bin/env python3
"""
ugc_batch.py — Submit batch of UGC avatar videos to HeyGen.
Runs in 3 phases: submit → poll → download.
Each phase is designed to complete within 45s timeout.

Usage:
  python3 ugc_batch.py submit    # Submit all 10, save video IDs
  python3 ugc_batch.py poll      # Check status of all submissions
  python3 ugc_batch.py download  # Download completed videos
"""
import json, sys, time, os, random
from pathlib import Path
import requests

API_KEY = os.environ.get("HEYGEN_API_KEY", "sk_V2_hgu_kDk41DjAAWf_cl2DCm73Pn3x2ppRD6hYhRATsbSxIz1z")
H = {"x-api-key": API_KEY, "Content-Type": "application/json", "Accept": "application/json"}
BASE = "https://api.heygen.com"
BATCH_FILE = Path(__file__).parent / "ugc_batch_state.json"
OUTPUT_DIR = Path(__file__).parent / "ugc_output"

# Import persona system
from ugc_gen import (AVATARS, CONTENT_CATEGORIES, generate_script,
                     validate_script, _fallback_content, ContentRuleViolation)


def check_balance():
    r = requests.get(f"{BASE}/v3/users/me", headers=H, timeout=10)
    return r.json().get("data", {}).get("wallet", {}).get("remaining_balance", 0)


def submit_video(avatar_key, script, title):
    avatar = AVATARS[avatar_key]
    voice_config = {"type": "text", "input_text": script, "speed": 1.0}
    if not avatar["voice_id"]:
        raise ValueError(f"voice_id is required for avatar {avatar_key} — HeyGen rejects empty voice_id")
    voice_config["voice_id"] = avatar["voice_id"]

    payload = {
        "video_inputs": [{
            "character": {"type": "avatar", "avatar_id": avatar["avatar_id"], "avatar_style": "normal"},
            "voice": voice_config,
            "background": {"type": "color", "value": "#00FF00"},
        }],
        "dimension": {"width": 1080, "height": 1920},
        "title": title,
    }

    r = requests.post(f"{BASE}/v2/video/generate", headers=H, json=payload, timeout=30)
    r.raise_for_status()
    return r.json().get("data", {}).get("video_id", "")


def poll_video(video_id):
    r = requests.get(f"{BASE}/v1/video_status.get?video_id={video_id}", headers=H, timeout=10)
    d = r.json().get("data", {})
    return {
        "status": d.get("status", "unknown"),
        "video_url": d.get("video_url", ""),
        "duration": d.get("duration", 0),
    }


def load_batch():
    if BATCH_FILE.exists():
        with open(BATCH_FILE) as f:
            return json.load(f)
    return {"videos": [], "balance_start": 0}


def save_batch(state):
    with open(BATCH_FILE, "w") as f:
        json.dump(state, f, indent=2)


# ── Destination content for each avatar (hand-picked for best fit) ───────
AVATAR_CONTENT = {
    "aditya": {
        "dest": "Jaipur", "score": "4.3", "best_month": "October",
        "bad_month": "June", "bad_reason": "scorching heat above 45 degrees",
        "local_food": "dal baati churma", "hidden_spot": "Nahargarh Fort at sunset",
        "highlight": "way the whole city turns pink at golden hour",
        "practical_tip": "negotiate rickshaw fares before getting in",
        "tip_1": "carry a scarf for temple visits", "tip_2": "old city markets close early on Sundays",
    },
    "seema": {
        "dest": "Varanasi", "score": "4.4", "best_month": "November",
        "bad_month": "May", "bad_reason": "unbearable humidity and heat",
        "local_food": "kachori sabzi from the ghats", "hidden_spot": "Assi Ghat at dawn",
        "highlight": "evening Ganga Aarti that gives you goosebumps",
        "practical_tip": "hire a local guide for the narrow galis",
        "tip_1": "book a ghat-facing room weeks in advance", "tip_2": "carry waterproof bags for boat rides",
        "wellness_activity": "morning yoga on the ghats overlooking the Ganga",
    },
    "kavya": {
        "dest": "Hampta Pass", "score": "4.1", "best_month": "July",
        "bad_month": "December", "bad_reason": "heavy snow blocks the entire pass",
        "altitude": "4,270m at the pass", "acclimatize_days": "2",
        "essential_gear": "crampons, trekking poles, and a zero-degree sleeping bag",
        "challenge": "river crossings at Balu ka Ghera that go chest-deep",
        "highlight": "view when you cross from green Kullu Valley into barren Lahaul",
    },
    "bahar": {
        "dest": "Rishikesh", "score": "4.5", "best_month": "March",
        "bad_month": "August", "bad_reason": "monsoon floods make the Ganga dangerous",
        "wellness_activity": "a ten-day silent Vipassana retreat",
        "highlight": "sound of the river at five in the morning",
        "tip_1": "the good ashrams book out three months in advance",
        "tip_2": "the backstreet cafes are cheaper and better than the main strip",
    },
    "byron": {
        "dest": "Hampi", "score": "4.2", "best_month": "November",
        "highlight": "sunrise over the boulder landscape with ancient temples everywhere",
        "practical_tip": "rent a bicycle to explore the ruins",
        "tip_1": "stay on the Hippie Island side for better vibes",
        "tip_2": "carry plenty of water because shade is scarce among the ruins",
    },
    "emilia": {
        "dest": "Dharamsala", "score": "4.3", "best_month": "October",
        "wellness_activity": "Tibetan meditation at a monastery near McLeod Ganj",
        "highlight": "peace you feel sitting in the Dalai Lama temple complex",
        "tip_1": "the Triund trek is doable as a day hike",
        "tip_2": "bring layers because the temperature drops fast after sunset",
    },
    "gerardo": {
        "dest": "Valley of Flowers", "score": "4.0", "best_month": "August",
        "altitude": "3,658m at the valley floor", "acclimatize_days": "1",
        "essential_gear": "waterproof boots, rain jacket, and a macro lens",
        "challenge": "fourteen-kilometre trek through monsoon mud and river crossings",
        "highlight": "carpets of alpine flowers as far as you can see",
    },
    "annie": {
        "dest": "Goa", "score": "3.8", "best_month": "November",
        "bad_month": "June", "bad_reason": "monsoon shuts down all beach shacks",
        "tip_1": "South Goa for peace, North Goa for parties — do not mix them up",
        "tip_2": "beach shacks in Agonda are half the price of Palolem",
        "practical_tip": "rent a scooter but always wear a helmet",
        "highlight": "old Portuguese quarter in Fontainhas",
    },
    "brandon": {
        "dest": "Kerala Backwaters", "score": "4.4", "best_month": "September",
        "highlight": "waking up on a houseboat surrounded by paddy fields",
        "tip_1": "book a private houseboat, not a group one",
        "tip_2": "mosquito repellent is non-negotiable on the backwaters",
        "practical_tip": "take the smaller canals, not the main tourist route",
    },
    "darnell": {
        "dest": "Udaipur", "score": "4.3", "best_month": "October",
        "tip_1": "the rooftop restaurants around Lake Pichola have the best sunset views",
        "tip_2": "autorickshaws here do not use meters so agree on a price first",
        "highlight": "City Palace lit up at night reflecting off the lake",
        "practical_tip": "visit Sajjangarh Fort for the panoramic view most tourists miss",
    },
}

# Map each avatar to its best content category
AVATAR_CATEGORIES = {
    "aditya": "cultural_insider",
    "seema": "cultural_insider",
    "kavya": "adventure_trek",
    "bahar": "wellness_spiritual",
    "byron": "discovery_gems",
    "emilia": "wellness_spiritual",
    "gerardo": "adventure_trek",
    "annie": "practical_tips",
    "brandon": "practical_tips",
    "darnell": "practical_tips",
}


def cmd_submit():
    """Submit all 10 avatar videos to HeyGen."""
    balance = check_balance()
    print(f"Starting balance: ${balance:.2f}")

    est_cost = 10 * 0.36
    if balance < est_cost:
        print(f"WARNING: Balance ${balance:.2f} may be insufficient for 10 videos (est ${est_cost:.2f})")
        print("Proceeding anyway — will stop if a submission fails.\n")

    batch = {"videos": [], "balance_start": balance}

    for avatar_key in AVATARS:
        content = AVATAR_CONTENT[avatar_key]
        category = AVATAR_CATEGORIES[avatar_key]

        print(f"{'─'*50}")
        print(f"Avatar: {AVATARS[avatar_key]['name']} | Dest: {content['dest']} | Cat: {category}")

        # Generate script
        try:
            script = generate_script(avatar_key, category, content)
        except ContentRuleViolation as e:
            print(f"  ✗ SCRIPT BLOCKED: {e}")
            continue

        # Validate
        violations = validate_script(script, avatar_key)
        if violations:
            print(f"  ✗ VALIDATION FAILED:")
            for v in violations:
                print(f"    {v}")
            continue

        word_count = len(script.split())
        est_secs = word_count / 2.5
        print(f"  Script: {word_count} words (~{est_secs:.0f}s)")
        print(f"  \"{script[:120]}...\"")
        print(f"  ✓ Passed all rules")

        # Submit to HeyGen
        title = f"NakshIQ UGC — {AVATARS[avatar_key]['name']} — {content['dest']}"
        try:
            video_id = submit_video(avatar_key, script, title)
            print(f"  ✓ Submitted: video_id={video_id}")
        except Exception as e:
            print(f"  ✗ Submit FAILED: {e}")
            continue

        batch["videos"].append({
            "avatar": avatar_key,
            "avatar_name": AVATARS[avatar_key]["name"],
            "dest": content["dest"],
            "category": category,
            "script": script,
            "video_id": video_id,
            "status": "processing",
            "video_url": "",
            "duration": 0,
        })

    save_batch(batch)
    print(f"\n{'='*50}")
    print(f"Submitted {len(batch['videos'])}/10 videos")
    print(f"Run: python3 ugc_batch.py poll")


def cmd_poll():
    """Poll status of all submitted videos."""
    batch = load_batch()
    if not batch["videos"]:
        print("No videos submitted. Run: python3 ugc_batch.py submit")
        return

    completed = 0
    processing = 0
    failed = 0

    for v in batch["videos"]:
        if v["status"] == "completed":
            completed += 1
            continue

        result = poll_video(v["video_id"])
        v["status"] = result["status"]

        if result["status"] == "completed":
            v["video_url"] = result["video_url"]
            v["duration"] = result["duration"]
            completed += 1
            print(f"  ✓ {v['avatar_name']:10s} — DONE ({result['duration']}s)")
        elif result["status"] == "failed":
            failed += 1
            print(f"  ✗ {v['avatar_name']:10s} — FAILED")
        else:
            processing += 1
            print(f"  ⏳ {v['avatar_name']:10s} — {result['status']}")

    save_batch(batch)
    balance = check_balance()

    print(f"\nCompleted: {completed} | Processing: {processing} | Failed: {failed}")
    print(f"Balance: ${balance:.2f} (spent: ${batch['balance_start'] - balance:.2f})")

    if processing > 0:
        print(f"\nStill processing — run poll again in 30s")
    elif completed > 0:
        print(f"\nAll done! Run: python3 ugc_batch.py download")


def cmd_download():
    """Download all completed videos."""
    batch = load_batch()
    OUTPUT_DIR.mkdir(exist_ok=True)

    downloaded = 0
    for v in batch["videos"]:
        if v["status"] != "completed" or not v["video_url"]:
            continue

        filename = f"ugc_raw_{v['avatar']}_{v['dest'].lower().replace(' ', '_')}.mp4"
        filepath = OUTPUT_DIR / filename

        if filepath.exists():
            print(f"  ✓ {v['avatar_name']:10s} — already downloaded ({filename})")
            downloaded += 1
            continue

        print(f"  ⬇ {v['avatar_name']:10s} — downloading...", end="", flush=True)
        try:
            r = requests.get(v["video_url"], stream=True, timeout=60)
            r.raise_for_status()
            with open(filepath, "wb") as f:
                for chunk in r.iter_content(8192):
                    f.write(chunk)
            size_kb = filepath.stat().st_size // 1024
            print(f" ✓ ({size_kb} KB)")
            downloaded += 1
        except Exception as e:
            print(f" ✗ {e}")

    print(f"\nDownloaded: {downloaded}/{len([v for v in batch['videos'] if v['status'] == 'completed'])}")
    print(f"Videos in: {OUTPUT_DIR}/")

    balance = check_balance()
    print(f"Final balance: ${balance:.2f} (total spent: ${batch['balance_start'] - balance:.2f})")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "submit"
    if cmd == "submit":
        cmd_submit()
    elif cmd == "poll":
        cmd_poll()
    elif cmd == "download":
        cmd_download()
    else:
        print(f"Usage: python3 ugc_batch.py [submit|poll|download]")
