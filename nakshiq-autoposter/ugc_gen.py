"""
ugc_gen.py — NakshIQ UGC Avatar Video Generator
=================================================
Generates 9:16 vertical Reels/Shorts (1080×1920, 30-45s) using HeyGen AI
avatars composited over destination visuals with background music.

10-avatar roster with strict persona-script-music matching rules to ensure
content feels natural and culturally appropriate.

Pipeline:
  1. Pick content topic (destination/theme) from NakshIQ API
  2. Select avatar based on topic category + round-robin rotation
  3. Generate culturally-appropriate script via persona rules
  4. Submit to HeyGen API (green-screen background)
  5. Download rendered avatar video
  6. Composite avatar over Pomelli background images (Ken Burns)
  7. Mix speech audio with mood-matched background music
  8. Add NakshIQ branding overlay
  9. Export final 9:16 Reel

Cost: ~$0.018/sec (Avatar III public) ≈ $0.27-0.36/video
"""

from __future__ import annotations

import json
import os
import random
import shutil
import subprocess
import tempfile
import time
from datetime import datetime
from pathlib import Path
from typing import Optional

# ── Brand constants ──────────────────────────────────────────────────────
try:
    from slide_gen import (INK_DEEP, BONE, VERMILLION_BRIGHT, VERMILLION_DEEP,
                           SAFFRON, SAGE, FONT_DIR)
except ImportError:
    INK_DEEP = "#161614"
    BONE = "#F5F1E8"
    VERMILLION_BRIGHT = "#E55642"
    VERMILLION_DEEP = "#C43E2D"
    SAFFRON = "#D4883A"
    SAGE = "#5C6B5A"
    FONT_DIR = Path(__file__).parent / "assets" / "fonts"

# ── Paths ────────────────────────────────────────────────────────────────
ASSETS_DIR = Path(__file__).parent / "assets"
MUSIC_DIR  = ASSETS_DIR / "music"          # 25 tracks — Reel music
YT_MUSIC_DIR = ASSETS_DIR / "yt_music"     # 72 tracks — all music
POMELLI_DIR = Path(__file__).parent / "pomelli_library"
MANIFEST_FILE = POMELLI_DIR / "manifest.json"
STATE_FILE = Path(__file__).parent / "state.json"

# ── HeyGen API ───────────────────────────────────────────────────────────
HEYGEN_API_KEY = os.environ.get("HEYGEN_API_KEY", "")
HEYGEN_BASE = "https://api.heygen.com"

# ── Output specs ─────────────────────────────────────────────────────────
REEL_W, REEL_H = 1080, 1920
REEL_FPS = 30
TARGET_DURATION = 35  # seconds total

# ── Font paths ───────────────────────────────────────────────────────────
FONT_INSTRUMENT = str(FONT_DIR / "InstrumentSans-Bold.ttf") if FONT_DIR.exists() else ""
FONT_CRIMSON = str(FONT_DIR / "CrimsonPro-BoldItalic.ttf") if FONT_DIR.exists() else ""

# ── NakshIQ API ──────────────────────────────────────────────────────────
NAKSHIQ_API = "https://nakshiq.com/api/content"

# ═══════════════════════════════════════════════════════════════════════════
# PERSONA SYSTEM — The heart of cultural accuracy
# ═══════════════════════════════════════════════════════════════════════════

# Content categories that map to persona groups
CONTENT_CATEGORIES = [
    "cultural_insider",   # Local knowledge, festivals, food, etiquette
    "adventure_trek",     # Hiking, wildlife, outdoor activities
    "wellness_spiritual", # Yoga, Ayurveda, meditation, retreats
    "discovery_gems",     # Hidden gems, surprising finds, "I had no idea"
    "practical_tips",     # Visa, packing, safety, budget, logistics
]

# ── Avatar Roster ────────────────────────────────────────────────────────
# Each avatar has: id, name, gender, persona role, allowed categories,
# speaking style guide, forbidden patterns, and music energy preference.

AVATARS = {
    # ── INDIAN / SOUTH ASIAN VOICES ──────────────────────────────────
    "aditya": {
        "avatar_id": "Aditya_public_2",
        "name": "Aditya",
        "gender": "male",
        "role": "The Local Expert",
        "origin": "indian",
        "has_builtin_bg": False,  # Pure green screen → chromakey PiP over destination
        "categories": ["cultural_insider"],
        "secondary_categories": ["practical_tips"],
        "voice_id": "09c3d65e44e247dd8b78a97a903feb58",  # Aditya default
        "speaking_style": (
            "Speaks with warm insider authority. Uses Hindi phrases naturally "
            "(e.g., 'yaar', 'bilkul', 'pakka'). References personal experiences "
            "growing up in India. Talks about food by local name, not tourist name. "
            "Tone: confident, friendly, like an older cousin giving advice."
        ),
        "example_openers": [
            "Look, I grew up visiting {dest} every summer, and here is what most tourists get completely wrong.",
            "If you are planning {dest}, let me save you from the biggest mistake I see travellers make.",
            "I have been to {dest} maybe fifteen times, and the one thing nobody tells you is this.",
        ],
        "forbidden_patterns": [],  # Indian avatar — no restrictions on insider language
        "music_energy": "warm_cultural",
        "music_tracks": [
            "bollywood_bounce", "mystic_india", "monsoon_groove", "desi_future_bass",
            "desert_dream", "golden_hour",
            "px_bollywood_pop", "px_bollywood_indian", "px_indian_bg",
            "px_bollywood_hindi", "px_moonlight_bollywood",
            "03_desi_bounce", "13_monsoon_pulse", "30_rajasthan_groove",
            "21_golden_temple", "35_morning_raga", "19_bollywood_fire",
        ],
    },

    "seema": {
        "avatar_id": "Seema_Casual_Sitting_Front_public",
        "name": "Seema",
        "gender": "female",
        "role": "The Cultural Guide",
        "origin": "indian",
        "has_builtin_bg": False,  # Pure green screen → chromakey PiP over destination
        "categories": ["cultural_insider"],
        "secondary_categories": ["wellness_spiritual", "practical_tips"],
        "voice_id": "6d5ef2eb0cb94193b90dd3cb397ae898",  # Coral (female, multilingual)
        "speaking_style": (
            "Warm, knowledgeable, like a well-travelled Indian aunt who has "
            "actually been everywhere she recommends. Uses Hindi words for food "
            "and festivals naturally. Gives practical tips with cultural context. "
            "Tone: reassuring, experienced, no-nonsense but kind."
        ),
        "example_openers": [
            "Okay so everyone asks me about {dest}, and I always say the same thing.",
            "Before you book {dest}, there are three things you absolutely must know.",
            "I have taken my family to {dest} four times now, and trust me, timing is everything.",
        ],
        "forbidden_patterns": [],
        "music_energy": "warm_cultural",
        "music_tracks": [
            "golden_hour", "mystic_india", "ambient_voyage", "coastal_breeze",
            "monsoon_groove", "desert_dream",
            "px_bollywood_sand", "px_indian_hindu", "px_soulful_soft",
            "px_bollywood_monda", "px_moonlight_bollywood",
            "33_kerala_sunset", "35_morning_raga", "27_lofi_temples",
            "25_himalaya_echo", "06_sunset_gaze",
        ],
    },

    "kavya": {
        "avatar_id": "Kavya_standing_outdoorsport_front",
        "name": "Kavya",
        "gender": "female",
        "role": "The Adventure Seeker",
        "origin": "indian",
        "has_builtin_bg": False,  # Green screen with scene padding — use Mode B PiP
        "categories": ["adventure_trek"],
        "secondary_categories": ["cultural_insider"],
        "voice_id": "71b0aa6499f6458e8b040818a017db1f",  # Nova (female, multilingual)
        "speaking_style": (
            "Energetic, physically active voice. Short punchy sentences. "
            "Heavy on sensory details — wind, altitude, cold, sweat. Uses Hindi "
            "exclamations naturally. Talks like someone who just got back from "
            "the trail and is still buzzing. Tone: breathless, excited, inspiring."
        ),
        "example_openers": [
            "I just did the {dest} trek and my legs are still shaking, but oh my god, worth it.",
            "If you think {dest} is just for photos, you are seriously missing out.",
            "Three days in {dest} and I have never felt more alive. Here is why.",
        ],
        "forbidden_patterns": [],
        "music_energy": "high_energy",
        "music_tracks": [
            "travel_pulse", "epic_journey", "neon_pulse", "cinematic_trap",
            "afrobeats_glow", "tropical_drift",
            "px_energetic_upbeat", "px_action_rock", "px_epic_action",
            "px_powerful_percussion",
            "12_epic_rise", "07_synthwave_run", "32_cinematic_pulse",
            "04_afro_heat", "36_club_energy",
        ],
    },

    "bahar": {
        "avatar_id": "Bahar_Casual_Sitting_Front2_public",
        "name": "Bahar",
        "gender": "female",
        "role": "The Mindful Traveler",
        "origin": "south_asian",
        "has_builtin_bg": False,  # Pure green screen → chromakey PiP over destination
        "categories": ["wellness_spiritual"],
        "secondary_categories": ["cultural_insider", "discovery_gems"],
        "voice_id": "8273e0a033074b5bb98d7ce3ab727bd9",  # Shimmer (female, multilingual)
        "speaking_style": (
            "Calm, reflective, thoughtful. Speaks about travel as transformation, "
            "not consumption. Uses words like 'intention', 'presence', 'grounding'. "
            "Can reference South Asian spiritual traditions authentically. "
            "Tone: serene, wise, like a yoga teacher who also loves street food."
        ),
        "example_openers": [
            "There is a reason people keep coming back to {dest}, and it is not just the views.",
            "I went to {dest} to slow down, and honestly, it changed my perspective.",
            "If you need a reset, {dest} is the place. Let me tell you why.",
        ],
        "forbidden_patterns": [],
        "music_energy": "ambient_chill",
        "music_tracks": [
            "ambient_drift", "ambient_voyage", "lofi_daydream", "golden_hour",
            "chill_hop", "coastal_breeze",
            "px_ambient_bg", "px_soulful_soft", "px_landlady_chill",
            "px_moodmode_chill", "px_solarflex_chill",
            "01_lofi_rain", "17_ambient_drift", "27_lofi_temples",
            "25_himalaya_echo", "33_kerala_sunset", "09_boom_bap_chill",
        ],
    },

    # ── DIVERSE INTERNATIONAL VOICES ─────────────────────────────────

    "byron": {
        "avatar_id": "Byron_Casual_Sitting_Front_public",
        "name": "Byron",
        "gender": "male",
        "role": "The Enthusiastic Traveler",
        "origin": "international",
        "has_builtin_bg": False,  # Pure green screen → chromakey PiP over destination
        "categories": ["discovery_gems"],
        "secondary_categories": ["adventure_trek", "practical_tips"],
        "voice_id": "bfc6d0242de24106a104339f0618b68d",  # Alloy (male, multilingual)
        "speaking_style": (
            "Genuine excitement and wonder. Speaks like someone who is constantly "
            "amazed by what India has to offer. Uses phrases like 'I had absolutely "
            "no idea', 'this blew my mind', 'you will NOT believe this'. "
            "Tone: enthusiastic, warm, infectiously curious."
        ),
        "example_openers": [
            "I had absolutely no idea {dest} existed until a friend told me, and now it is my favourite place in India.",
            "Can we talk about {dest} for a second? Because this place blew my mind.",
            "Everyone talks about the famous spots, but {dest} is where the real magic is.",
        ],
        "forbidden_patterns": [
            "we Indians", "we celebrate", "our culture", "our festivals",
            "our tradition", "back home in India", "growing up in India",
            "my family always", "in our community", "as an Indian",
            "we do things differently here", "our food",
            "hamara", "hamare", "apna", "apne",  # Hindi possessives implying Indian identity
        ],
        "music_energy": "upbeat_pop",
        "music_tracks": [
            "afrobeats_glow", "tropical_drift", "travel_pulse", "melodic_house",
            "garage_bounce", "amapiano_sunset",
            "px_afrobeat_amapiano", "px_island_pulse", "px_energetic_upbeat",
            "00_amapiano_glow", "10_tropical_sun", "05_house_emotion",
            "22_afro_carnival", "28_amapiano_heat", "15_coastal_vibes",
        ],
    },

    "emilia": {
        "avatar_id": "Emilia_sitting_outdooryoga_front",
        "name": "Emilia",
        "gender": "female",
        "role": "The Wellness Wanderer",
        "origin": "international",
        "has_builtin_bg": False,  # Green screen with scene padding — use Mode B PiP
        "categories": ["wellness_spiritual"],
        "secondary_categories": ["discovery_gems"],
        "voice_id": "71b0aa6499f6458e8b040818a017db1f",  # Nova (female, multilingual)
        "speaking_style": (
            "Calm but engaged. Speaks about wellness experiences as a learner, "
            "not an expert on Indian traditions. Uses 'I discovered', 'I learned', "
            "'they taught me'. Respects traditions without appropriating them. "
            "Tone: reflective, grateful, grounded."
        ),
        "example_openers": [
            "I came to {dest} for a yoga retreat and ended up staying an extra week.",
            "If you have ever wanted to truly disconnect, {dest} is the answer.",
            "I did not know what Ayurveda actually was until I experienced it in {dest}.",
        ],
        "forbidden_patterns": [
            "we Indians", "we celebrate", "our culture", "our festivals",
            "our tradition", "back home in India", "growing up in India",
            "my family always", "in our community", "as an Indian",
            "we do things differently here", "our food",
            "hamara", "hamare", "apna", "apne",
            # Wellness-specific: don't claim mastery of Indian traditions
            "I always practice", "ancient wisdom that I follow",
            "my guru", "in my tradition",
        ],
        "music_energy": "ambient_chill",
        "music_tracks": [
            "ambient_drift", "ambient_voyage", "lofi_daydream", "chill_hop",
            "coastal_breeze", "golden_hour",
            "px_ambient_bg", "px_soulful_soft", "px_moodmode_chill",
            "px_landlady_chill",
            "01_lofi_rain", "17_ambient_drift", "09_boom_bap_chill",
            "25_himalaya_echo", "33_kerala_sunset",
        ],
    },

    "gerardo": {
        "avatar_id": "Gerardo_standing_outdoorsport_front",
        "name": "Gerardo",
        "gender": "male",
        "role": "The Trail Runner",
        "origin": "international",
        "has_builtin_bg": False,  # Green screen with scene padding — use Mode B PiP
        "categories": ["adventure_trek"],
        "secondary_categories": ["discovery_gems"],
        "voice_id": "433c48a6c8944d89b3b76d2ddcc7176a",  # Echo (male, multilingual)
        "speaking_style": (
            "Athletic, outdoor energy. Speaks from the perspective of someone "
            "who travels for physical challenge. Uses 'the altitude hit me', "
            "'the trail was insane', 'I was not prepared for'. Direct, no fluff. "
            "Tone: active, honest about difficulty, respectful of the landscape."
        ),
        "example_openers": [
            "I have trekked all over the world, but {dest} genuinely caught me off guard.",
            "If you are thinking about doing {dest}, here is what you actually need to know.",
            "They said {dest} was tough. They were not kidding. But here is why you should still do it.",
        ],
        "forbidden_patterns": [
            "we Indians", "we celebrate", "our culture", "our festivals",
            "our tradition", "back home in India", "growing up in India",
            "my family always", "in our community", "as an Indian",
            "we do things differently here", "our food",
            "hamara", "hamare", "apna", "apne",
        ],
        "music_energy": "high_energy",
        "music_tracks": [
            "cinematic_trap", "epic_journey", "neon_pulse", "phonk_drift",
            "travel_pulse", "deep_minimal",
            "px_action_rock", "px_epic_action", "px_powerful_percussion",
            "px_energetic_upbeat",
            "07_synthwave_run", "12_epic_rise", "32_cinematic_pulse",
            "02_trap_cinema", "36_club_energy", "16_phonk_fury",
        ],
    },

    # ── WESTERN TOURIST PERSPECTIVE ──────────────────────────────────

    "annie": {
        "avatar_id": "Annie_Casual_Standing_Front_public",
        "name": "Annie",
        "gender": "female",
        "role": "The Solo Explorer",
        "origin": "western",
        "has_builtin_bg": False,  # Green screen with scene padding — use Mode B PiP
        "categories": ["practical_tips"],
        "secondary_categories": ["discovery_gems"],
        "voice_id": "6d5ef2eb0cb94193b90dd3cb397ae898",  # Coral (female, multilingual)
        "speaking_style": (
            "Relatable, practical, like a friend who just got back from a trip "
            "and is giving you the real scoop. Speaks from a first-timer or "
            "repeat-visitor perspective. Focuses on logistics, safety, surprises. "
            "Tone: honest, helpful, slightly self-deprecating about tourist mistakes."
        ),
        "example_openers": [
            "Okay so here is what I wish someone had told me before my first trip to {dest}.",
            "I made every mistake in the book at {dest}. Learn from me.",
            "Planning {dest}? Here are the things that actually matter, not the Instagram stuff.",
        ],
        "forbidden_patterns": [
            "we Indians", "we celebrate", "our culture", "our festivals",
            "our tradition", "back home in India", "growing up in India",
            "my family always", "in our community", "as an Indian",
            "we do things differently here", "our food",
            "hamara", "hamare", "apna", "apne",
            # Don't claim expertise on Indian customs
            "as you know in Indian culture", "Indian people always",
            "the Indian way of doing",
        ],
        "music_energy": "upbeat_pop",
        "music_tracks": [
            "tropical_drift", "travel_pulse", "melodic_house", "golden_hour",
            "coastal_breeze", "garage_bounce",
            "px_island_pulse", "px_energetic_upbeat",
            "10_tropical_sun", "15_coastal_vibes", "20_retro_drive",
            "00_amapiano_glow", "05_house_emotion", "06_sunset_gaze",
        ],
    },

    "brandon": {
        "avatar_id": "Brandon_Lobby_Standing_Front_public",
        "name": "Brandon",
        "gender": "male",
        "role": "The Cozy Storyteller",
        "origin": "western",
        "has_builtin_bg": False,  # Green screen with scene padding — use Mode B PiP
        "categories": ["practical_tips"],
        "secondary_categories": ["discovery_gems"],
        "voice_id": "26b2064088674c80b1e5fc5ab1a068ea",  # Onyx (male, multilingual)
        "speaking_style": (
            "Warm, conversational, cozy. Like a travel vlogger who tells stories "
            "over coffee. Uses 'so here is the thing', 'what they do not tell you'. "
            "Focuses on experiences and emotions, not just logistics. "
            "Tone: chill, genuine, the kind of guy you would want on your group trip."
        ),
        "example_openers": [
            "So here is the thing about {dest} that nobody talks about.",
            "I was honestly a little nervous about {dest}, but then this happened.",
            "If {dest} is on your list, let me tell you exactly what to expect.",
        ],
        "forbidden_patterns": [
            "we Indians", "we celebrate", "our culture", "our festivals",
            "our tradition", "back home in India", "growing up in India",
            "my family always", "in our community", "as an Indian",
            "we do things differently here", "our food",
            "hamara", "hamare", "apna", "apne",
        ],
        "music_energy": "ambient_chill",
        "music_tracks": [
            "lofi_daydream", "chill_hop", "ambient_voyage", "golden_hour",
            "midnight_drive", "coastal_breeze",
            "px_moodmode_chill", "px_landlady_chill", "px_solarflex_chill",
            "01_lofi_rain", "09_boom_bap_chill", "20_retro_drive",
            "06_sunset_gaze", "17_ambient_drift",
        ],
    },

    "darnell": {
        "avatar_id": "Darnell_Bordeaux_Polo_Front",
        "name": "Darnell",
        "gender": "male",
        "role": "The Casual Recommender",
        "origin": "international",
        "has_builtin_bg": False,  # Assumed green screen (to be verified when generated)
        "categories": ["practical_tips"],
        "secondary_categories": ["discovery_gems", "cultural_insider"],
        "voice_id": "bfc6d0242de24106a104339f0618b68d",  # Alloy (male, multilingual)
        "speaking_style": (
            "Laid-back, no-pressure delivery. Gives recommendations like a friend, "
            "not a travel agent. Short sentences, decisive. Uses 'honestly', "
            "'no question', 'trust me on this one'. "
            "Tone: chill, confident, the guy who always knows the best spot."
        ),
        "example_openers": [
            "If you only have three days in {dest}, here is exactly what I would do.",
            "Alright, {dest}. Let me break this down real quick.",
            "Everyone overcomplicates {dest}. Here is the simple version.",
        ],
        "forbidden_patterns": [
            "we Indians", "we celebrate", "our culture", "our festivals",
            "our tradition", "back home in India", "growing up in India",
            "my family always", "in our community", "as an Indian",
            "we do things differently here", "our food",
            "hamara", "hamare", "apna", "apne",
        ],
        "music_energy": "upbeat_pop",
        "music_tracks": [
            "afrobeats_glow", "amapiano_sunset", "garage_bounce", "melodic_house",
            "travel_pulse", "deep_minimal",
            "px_afrobeat_amapiano", "px_amapiano_afrobeat", "px_urban_habibi",
            "00_amapiano_glow", "04_afro_heat", "22_afro_carnival",
            "28_amapiano_heat", "14_deep_tech", "26_tech_house_pump",
        ],
    },
}

# ═══════════════════════════════════════════════════════════════════════════
# SCRIPT TEMPLATES — Category-specific, persona-aware
# ═══════════════════════════════════════════════════════════════════════════

SCRIPT_TEMPLATES = {
    "cultural_insider": {
        "indian": [
            (
                "{opener} "
                "First, do NOT go in {bad_month} — it is way too {bad_reason}. "
                "The best time? {best_month}, hands down. "
                "And when you are there, skip the tourist restaurants. "
                "Go where the locals eat. Ask any rickshaw driver for the best {local_food}. "
                "NakshIQ scores {dest} a {score} out of 5 right now. "
                "Check it before you book. Link in bio."
            ),
            (
                "{opener} "
                "Most people go to {dest} and only see the obvious stuff. "
                "But the real experience? It is in the {hidden_spot}. "
                "Go early morning, before the crowds. Trust me. "
                "NakshIQ gives {dest} a {score} for {best_month}. "
                "That is not a guess — that is data. Link in bio."
            ),
        ],
        "international": [
            (
                "{opener} "
                "When I first visited {dest}, I did not know what to expect. "
                "But the {highlight} completely changed my perspective. "
                "One thing I learned: always {practical_tip}. "
                "NakshIQ scored it a {score} out of 5 for {best_month}. "
                "I wish I had checked that before I went. Link in bio."
            ),
        ],
    },
    "adventure_trek": {
        "indian": [
            (
                "{opener} "
                "The altitude at {dest} is no joke — {altitude} and your body feels every metre. "
                "You need at least {acclimatize_days} days to acclimatize. Do not rush it. "
                "Carry {essential_gear} — the weather changes in minutes up there. "
                "NakshIQ rates the trek difficulty at {score} out of 5. "
                "Check the full breakdown before you pack. Link in bio."
            ),
        ],
        "international": [
            (
                "{opener} "
                "The views at {dest} are unreal, but the {challenge} caught me off guard. "
                "My advice? {practical_tip}. "
                "And download the NakshIQ offline map before you go — "
                "there is zero signal up there. "
                "They score the conditions at {score} right now. Link in bio."
            ),
        ],
    },
    "wellness_spiritual": {
        "indian": [
            (
                "{opener} "
                "The energy in {dest} is different. You feel it the moment you arrive. "
                "Whether it is the {wellness_activity} or just the silence, it does something to you. "
                "Best time to go: {best_month}, when it is quiet and the weather is perfect. "
                "NakshIQ gives it a {score}. Check the wellness guide. Link in bio."
            ),
        ],
        "international": [
            (
                "{opener} "
                "I did not really understand {wellness_activity} until I experienced it in {dest}. "
                "The way they teach it there, with such patience and tradition — it is humbling. "
                "If you are thinking about going, {best_month} is the sweet spot. "
                "NakshIQ scores it a {score} for that month. Link in bio."
            ),
        ],
    },
    "discovery_gems": {
        "indian": [
            (
                "{opener} "
                "While everyone is fighting for selfies at the famous places, "
                "{dest} is sitting right there, completely underrated. "
                "The {highlight} alone is worth the trip. "
                "NakshIQ has it at {score} — honestly surprised more people do not know about this. "
                "Link in bio."
            ),
        ],
        "international": [
            (
                "{opener} "
                "A friend told me about {dest} and I thought — really? "
                "But then I saw the {highlight} and it was one of the best experiences I have had in India. "
                "NakshIQ gives it a {score} for {best_month}. Absolute hidden gem. Link in bio."
            ),
        ],
    },
    "practical_tips": {
        "indian": [
            (
                "{opener} "
                "Number one: {tip_1}. Seriously, this saves so much hassle. "
                "Number two: {tip_2}. I learned this the hard way. "
                "And number three: check NakshIQ before you finalize anything. "
                "They score {dest} a {score} right now. Real data, no fluff. Link in bio."
            ),
        ],
        "international": [
            (
                "{opener} "
                "Here is the stuff the travel blogs do not tell you about {dest}. "
                "{tip_1}. Also, {tip_2}. "
                "I check NakshIQ for every trip now — they score everything from safety to weather. "
                "{dest} is at a {score} for {best_month}. Link in bio."
            ),
        ],
    },
}


# ═══════════════════════════════════════════════════════════════════════════
# CONTENT RULE VALIDATOR — Catches violations before they ship
# ═══════════════════════════════════════════════════════════════════════════

class ContentRuleViolation(Exception):
    """Raised when a script violates persona/cultural rules."""
    pass


def validate_script(script: str, avatar_key: str) -> list[str]:
    """
    Validate a generated script against the avatar's rules.
    Returns a list of violations (empty = passes all checks).

    This is the STRICTEST function in the entire pipeline.
    Every single generated script MUST pass through this before
    being submitted to HeyGen.
    """
    avatar = AVATARS[avatar_key]
    violations = []
    script_lower = script.lower()

    # ── Rule 1: Forbidden patterns ────────────────────────────────
    for pattern in avatar["forbidden_patterns"]:
        if pattern.lower() in script_lower:
            violations.append(
                f"FORBIDDEN PATTERN: '{pattern}' found in script for "
                f"{avatar['name']} (origin: {avatar['origin']}). "
                f"A {avatar['origin']} avatar must NEVER use this phrase."
            )

    # ── Rule 2: Origin-specific language check ────────────────────
    if avatar["origin"] in ("western", "international"):
        # Western/international avatars must NOT use first-person Indian insider language
        insider_phrases = [
            "we indians", "we celebrate diwali", "we celebrate holi",
            "our culture", "our festivals", "our tradition",
            "back home in india", "growing up in india", "as an indian",
            "in our community", "our food", "our cuisine",
            "we do things differently", "in my country india",
            # Hindi possessives implying identity
            "hamara", "hamare yahan", "apna desh", "apne yahan",
            # Claiming Indian family traditions
            "my grandmother used to make", "my mother taught me",
            "in my family we always", "every diwali we",
            "every holi we", "at home we",
        ]
        for phrase in insider_phrases:
            if phrase in script_lower:
                violations.append(
                    f"CULTURAL MISMATCH: '{phrase}' — {avatar['name']} "
                    f"(origin: {avatar['origin']}) cannot speak as an Indian insider. "
                    f"Use observer perspective instead: 'I saw', 'I learned', 'they showed me'."
                )

    # ── Rule 3: Indian avatars should NOT use tourist-outsider framing ─
    if avatar["origin"] == "indian":
        outsider_phrases = [
            "as a foreigner", "as a tourist in india",
            "when i first discovered india", "india is so exotic",
            "the exotic culture", "these people",
            "the locals are so", "indian people are so",
        ]
        for phrase in outsider_phrases:
            if phrase in script_lower:
                violations.append(
                    f"IDENTITY MISMATCH: '{phrase}' — {avatar['name']} is Indian "
                    f"and should NOT use outsider/tourist framing."
                )

    # ── Rule 4: Gender-appropriate language ───────────────────────
    # (Mild check — just flag obviously wrong gendered self-references)
    if avatar["gender"] == "male":
        if "as a woman" in script_lower or "as a girl" in script_lower:
            violations.append(
                f"GENDER MISMATCH: Male avatar {avatar['name']} using female self-reference."
            )
    elif avatar["gender"] == "female":
        if "as a man" in script_lower or "as a guy" in script_lower or "as a dude" in script_lower:
            violations.append(
                f"GENDER MISMATCH: Female avatar {avatar['name']} using male self-reference."
            )

    # ── Rule 5: No fabricated statistics or contacts ──────────────
    fabrication_patterns = [
        "call ", "phone number", "contact us at", "dial ",
        "text us", "whatsapp us", "email us at",
    ]
    for pattern in fabrication_patterns:
        if pattern in script_lower:
            violations.append(
                f"DATA INTEGRITY: '{pattern}' — scripts must not include "
                f"phone numbers or contact info. Use 'link in bio' instead."
            )

    # ── Rule 6: Script length check ───────────────────────────────
    word_count = len(script.split())
    if word_count > 120:
        violations.append(
            f"LENGTH: Script is {word_count} words. Max 120 for a 30-45s video. "
            f"At ~2.5 words/sec, this would be {word_count / 2.5:.0f}s of speech."
        )
    if word_count < 30:
        violations.append(
            f"LENGTH: Script is only {word_count} words. Min 30 for substance. "
            f"This would only fill {word_count / 2.5:.0f}s."
        )

    # ── Rule 7: Must mention NakshIQ ──────────────────────────────
    if "nakshiq" not in script_lower:
        violations.append(
            "BRANDING: Script does not mention NakshIQ. "
            "Every UGC video must include at least one NakshIQ reference."
        )

    return violations


# ═══════════════════════════════════════════════════════════════════════════
# AVATAR SELECTION ENGINE — Category + round-robin + diversity
# ═══════════════════════════════════════════════════════════════════════════

def _load_state() -> dict:
    """Load persistent state (avatar rotation tracking)."""
    if STATE_FILE.exists():
        with open(STATE_FILE) as f:
            return json.load(f)
    return {}


def _save_state(state: dict):
    """Save persistent state."""
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


def select_avatar(category: str, state: dict) -> str:
    """
    Select the best avatar for a content category.

    Logic:
      1. Find all avatars whose primary category matches
      2. If none, fall back to secondary_categories
      3. Among eligible avatars, pick the one used least recently
      4. Break ties by preferring variety in gender and origin

    Returns the avatar key (e.g., "aditya").
    """
    ugc_state = state.get("ugc_avatar_history", {})

    # Primary match
    primary = [k for k, v in AVATARS.items() if category in v["categories"]]
    # Secondary fallback
    secondary = [k for k, v in AVATARS.items()
                 if category in v.get("secondary_categories", []) and k not in primary]

    candidates = primary if primary else secondary
    if not candidates:
        # Ultimate fallback: any avatar
        candidates = list(AVATARS.keys())

    # Sort by last-used timestamp (oldest first = most due for rotation)
    def sort_key(k):
        last_used = ugc_state.get(k, {}).get("last_used", "2000-01-01")
        use_count = ugc_state.get(k, {}).get("count", 0)
        # Primary match gets priority over secondary
        is_primary = 1 if k in primary else 0
        return (-is_primary, use_count, last_used)

    candidates.sort(key=sort_key)

    # Pick the top candidate
    selected = candidates[0]

    # Update state
    if selected not in ugc_state:
        ugc_state[selected] = {"count": 0, "last_used": "2000-01-01"}
    ugc_state[selected]["count"] += 1
    ugc_state[selected]["last_used"] = datetime.now().strftime("%Y-%m-%d %H:%M")
    state["ugc_avatar_history"] = ugc_state

    return selected


# ═══════════════════════════════════════════════════════════════════════════
# MUSIC SELECTION — Persona-matched + anti-repetition
# ═══════════════════════════════════════════════════════════════════════════

def select_music(avatar_key: str, state: dict) -> Optional[Path]:
    """
    Select a music track matched to the avatar's energy profile.

    Logic:
      1. Get the avatar's music_tracks preference list
      2. Look in both MUSIC_DIR and YT_MUSIC_DIR for available .wav files
      3. Filter out recently used tracks
      4. Pick randomly from top candidates
      5. If no preferred track found, fall back to any track in the energy class

    Returns the path to the selected .wav file.
    """
    avatar = AVATARS[avatar_key]
    preferred_tracks = avatar["music_tracks"]
    ugc_music_history = state.get("ugc_music_history", [])
    recent_5 = set(ugc_music_history[-5:]) if ugc_music_history else set()

    # Build index of all available music files
    available = {}
    for music_dir in [MUSIC_DIR, YT_MUSIC_DIR]:
        if music_dir.exists():
            for f in music_dir.glob("*.wav"):
                stem = f.stem
                available[stem] = f

    # Try preferred tracks first (not recently used)
    candidates = []
    for track_name in preferred_tracks:
        if track_name in available and track_name not in recent_5:
            candidates.append(available[track_name])

    if not candidates:
        # Fall back: any preferred track even if recently used
        for track_name in preferred_tracks:
            if track_name in available:
                candidates.append(available[track_name])

    if not candidates:
        # Ultimate fallback: any track from the right energy class
        energy = avatar["music_energy"]
        energy_keywords = {
            "warm_cultural": ["bollywood", "indian", "desi", "raga", "temple", "mystic", "golden"],
            "high_energy": ["epic", "action", "energy", "trap", "phonk", "synthwave", "pump"],
            "ambient_chill": ["ambient", "lofi", "chill", "soft", "rain", "drift", "sunset"],
            "upbeat_pop": ["tropical", "amapiano", "afro", "bounce", "pulse", "house", "carnival"],
        }
        keywords = energy_keywords.get(energy, [])
        for stem, path in available.items():
            if any(kw in stem.lower() for kw in keywords):
                candidates.append(path)

    if not candidates:
        # Absolute fallback: any track
        candidates = list(available.values())

    if not candidates:
        return None

    selected = random.choice(candidates)

    # Update history
    ugc_music_history.append(selected.stem)
    # Keep last 20 entries
    state["ugc_music_history"] = ugc_music_history[-20:]

    return selected


# ═══════════════════════════════════════════════════════════════════════════
# BACKGROUND SELECTION — clean destination photos from social_image_library
# ═══════════════════════════════════════════════════════════════════════════

SOCIAL_IMG_DIR = Path("social_image_library")

# Alternate destination folder names for fuzzy matching
_DEST_ALIASES = {
    "goa": ["panaji_GO", "calangute-baga_GO", "anjuna_GO", "old-goa_GO"],
    "dharamsala": ["dharamshala_HI"],
    "dharamshala": ["dharamshala_HI"],
    "kerala_backwaters": ["alleppey-(alappuzha)_KE", "kumarakom_KE"],
    "hampta_pass": ["manali_HI", "kullu_HI"],
    "valley_of_flowers": ["joshimath_UT", "badrinath_UT", "auli_UT"],
}


def select_backgrounds(dest_slug: str, count: int = 4) -> list[Path]:
    """
    Select clean destination photos from social_image_library for UGC backgrounds.

    Uses story-format images (9:16) when available, falls back to feed images.
    The bottom 200px is cropped during Ken Burns to remove any watermark text.
    """
    slug_lower = dest_slug.lower().replace(" ", "_")
    matched_images: list[Path] = []

    if not SOCIAL_IMG_DIR.exists():
        return []

    # 1. Try exact folder match (e.g. "jaipur" → "jaipur_RA/")
    for folder in SOCIAL_IMG_DIR.iterdir():
        if not folder.is_dir():
            continue
        folder_base = folder.name.split("_")[0].lower()  # "jaipur_RA" → "jaipur"
        if folder_base == slug_lower or slug_lower.startswith(folder_base):
            for img in sorted(folder.glob("*.jpg")):
                matched_images.append(img)

    # 2. Try alias mapping
    if len(matched_images) < count:
        aliases = _DEST_ALIASES.get(slug_lower, [])
        for alias in aliases:
            alias_dir = SOCIAL_IMG_DIR / alias
            if alias_dir.is_dir():
                for img in sorted(alias_dir.glob("*.jpg")):
                    if img not in matched_images:
                        matched_images.append(img)

    # 3. Try partial match on multi-word slugs (e.g. "valley_of_flowers" → "valley-of-flowers_UT")
    if len(matched_images) < count:
        slug_hyphen = slug_lower.replace("_", "-")
        for folder in SOCIAL_IMG_DIR.iterdir():
            if not folder.is_dir():
                continue
            if slug_hyphen in folder.name.lower():
                for img in sorted(folder.glob("*.jpg")):
                    if img not in matched_images:
                        matched_images.append(img)

    # 4. Filter out typographic-art images (they have large text baked in)
    matched_images = [p for p in matched_images if "typographic-art" not in p.name]

    # 5. Prefer story images (9:16) over feed for vertical video backgrounds
    story_imgs = [p for p in matched_images if "_story_" in p.name]
    feed_imgs = [p for p in matched_images if "_feed_" in p.name]
    other_imgs = [p for p in matched_images if "_story_" not in p.name and "_feed_" not in p.name]

    # Prioritise: story first, then feed, then other
    prioritised = story_imgs + feed_imgs + other_imgs

    # Pick up to `count`, shuffling within each tier for variety
    if len(prioritised) > count:
        prioritised = prioritised[:count]

    return prioritised


# ═══════════════════════════════════════════════════════════════════════════
# SCRIPT GENERATION — Template-based with persona awareness
# ═══════════════════════════════════════════════════════════════════════════

def generate_script(avatar_key: str, category: str, content: dict) -> str:
    """
    Generate a culturally-appropriate script for the given avatar and content.

    Uses template system + content data to produce a script, then validates
    it through the rule checker. Retries with different templates if validation
    fails.

    Args:
        avatar_key: Key into AVATARS dict
        category: Content category
        content: Dict with destination data (dest, score, best_month, etc.)

    Returns:
        Validated script string

    Raises:
        ContentRuleViolation if no valid script can be generated after retries
    """
    avatar = AVATARS[avatar_key]
    origin = avatar["origin"]

    # Map origin to template key
    if origin == "indian" or origin == "south_asian":
        template_key = "indian"
    else:
        template_key = "international"

    templates = SCRIPT_TEMPLATES.get(category, {}).get(template_key, [])
    if not templates:
        # Fall back to practical_tips which has templates for all origins
        templates = SCRIPT_TEMPLATES["practical_tips"][template_key]

    # Pick an opener from the avatar's style
    opener = random.choice(avatar["example_openers"]).format(
        dest=content.get("dest", "this place")
    )

    # Build template variables
    dest = content.get("dest", "this destination")
    score = content.get("score", "4.2")
    best_month = content.get("best_month", "October")
    bad_month = content.get("bad_month", "July")
    bad_reason = content.get("bad_reason", "crowded and hot")
    local_food = content.get("local_food", "the local specialty")
    hidden_spot = content.get("hidden_spot", "quieter side streets")
    highlight = content.get("highlight", "scenery")
    practical_tip = content.get("practical_tip", "book ahead")
    altitude = content.get("altitude", "3,500m")
    acclimatize_days = content.get("acclimatize_days", "2")
    essential_gear = content.get("essential_gear", "layers and rain gear")
    challenge = content.get("challenge", "terrain")
    wellness_activity = content.get("wellness_activity", "yoga sessions")
    tip_1 = content.get("tip_1", "book your stay at least a week ahead")
    tip_2 = content.get("tip_2", "carry cash because ATMs are unreliable")

    # Try templates until one passes validation
    random.shuffle(templates)
    for template in templates:
        try:
            script = template.format(
                opener=opener,
                dest=dest, score=score, best_month=best_month,
                bad_month=bad_month, bad_reason=bad_reason,
                local_food=local_food, hidden_spot=hidden_spot,
                highlight=highlight, practical_tip=practical_tip,
                altitude=altitude, acclimatize_days=acclimatize_days,
                essential_gear=essential_gear, challenge=challenge,
                wellness_activity=wellness_activity,
                tip_1=tip_1, tip_2=tip_2,
            )
        except KeyError:
            continue

        # VALIDATE — this is non-negotiable
        violations = validate_script(script, avatar_key)
        if not violations:
            return script
        else:
            print(f"  [RULE CHECK] Script for {avatar['name']} failed validation:")
            for v in violations:
                print(f"    ✗ {v}")

    # If all templates fail (shouldn't happen with good templates), raise
    raise ContentRuleViolation(
        f"Could not generate a valid script for {avatar['name']} "
        f"(category: {category}). All templates produced rule violations."
    )


# ═══════════════════════════════════════════════════════════════════════════
# CAPTION GENERATION — Platform-specific
# ═══════════════════════════════════════════════════════════════════════════

def generate_caption(avatar_key: str, content: dict, platform: str) -> str:
    """Generate platform-specific caption with UTM tracking."""
    avatar = AVATARS[avatar_key]
    dest = content.get("dest", "India")
    dest_slug = dest.lower().replace(" ", "-")

    utm = f"utm_source={platform}&utm_medium=ugc&utm_campaign={avatar['name'].lower()}"
    link = f"https://nakshiq.com/destination/{dest_slug}?{utm}"

    if platform == "youtube":
        caption = (
            f"{avatar['name']} talks about {dest} | Travel Tips\n\n"
            f"Real travel intelligence for {dest} — scored by NakshIQ.\n\n"
            f"Check the full destination guide: {link}\n\n"
            f"#NakshIQ #TravelIndia #{dest.replace(' ', '')}"
        )
    elif platform == "instagram":
        # 5-tag limit for Instagram
        caption = (
            f"Real talk about {dest} from {avatar['name']}.\n\n"
            f"Every destination scored 1-5. No guessing.\n"
            f"Link in bio.\n\n"
            f"#NakshIQ #TravelIndia #{dest.replace(' ', '')} "
            f"#IndiaTravel #TravelSmart"
        )
    else:
        caption = (
            f"{avatar['name']} on {dest} | NakshIQ\n\n"
            f"Score-based travel intelligence.\n"
            f"{link}"
        )

    return caption


# ═══════════════════════════════════════════════════════════════════════════
# HEYGEN API — Avatar video generation
# ═══════════════════════════════════════════════════════════════════════════

def _heygen_headers() -> dict:
    key = HEYGEN_API_KEY
    if not key:
        raise RuntimeError("HEYGEN_API_KEY not set")
    return {
        "x-api-key": key,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }


def check_balance() -> float:
    """Check HeyGen wallet balance."""
    import requests
    resp = requests.get(
        f"{HEYGEN_BASE}/v3/users/me",
        headers=_heygen_headers(), timeout=10
    )
    resp.raise_for_status()
    return resp.json().get("data", {}).get("wallet", {}).get("remaining_balance", 0)


def submit_avatar_video(avatar_key: str, script: str, title: str) -> str:
    """
    Submit avatar video generation to HeyGen API.
    Returns video_id for polling.
    """
    import requests

    avatar = AVATARS[avatar_key]

    # Build voice config
    voice_config = {
        "type": "text",
        "input_text": script,
        "speed": 1.0,
    }
    if avatar["voice_id"]:
        voice_config["voice_id"] = avatar["voice_id"]

    # All avatars use green screen for chromakey compositing
    video_input = {
        "character": {
            "type": "avatar",
            "avatar_id": avatar["avatar_id"],
            "avatar_style": "normal",
        },
        "voice": voice_config,
        "background": {"type": "color", "value": "#00FF00"},
    }

    payload = {
        "video_inputs": [video_input],
        "dimension": {"width": 1080, "height": 1920},
        "title": title,
    }

    resp = requests.post(
        f"{HEYGEN_BASE}/v2/video/generate",
        headers=_heygen_headers(), json=payload, timeout=30
    )
    resp.raise_for_status()
    result = resp.json()

    video_id = result.get("data", {}).get("video_id", "")
    if not video_id:
        raise RuntimeError(f"HeyGen returned no video_id: {result}")

    return video_id


def poll_video(video_id: str, max_wait: int = 300) -> dict:
    """
    Poll HeyGen for video completion. Returns dict with video_url, duration.
    """
    import requests

    start = time.time()
    while time.time() - start < max_wait:
        resp = requests.get(
            f"{HEYGEN_BASE}/v1/video_status.get?video_id={video_id}",
            headers=_heygen_headers(), timeout=10
        )
        data = resp.json().get("data", {})
        status = data.get("status", "unknown")

        if status == "completed":
            return {
                "video_url": data.get("video_url", ""),
                "duration": data.get("duration", 0),
                "thumbnail_url": data.get("thumbnail_url", ""),
            }
        elif status == "failed":
            raise RuntimeError(f"HeyGen video failed: {data.get('error', data)}")

        time.sleep(10)

    raise TimeoutError(f"HeyGen video {video_id} did not complete in {max_wait}s")


def download_video(url: str, output_path: Path) -> Path:
    """Download rendered avatar video from HeyGen."""
    import requests

    resp = requests.get(url, stream=True, timeout=60)
    resp.raise_for_status()
    with open(output_path, "wb") as f:
        for chunk in resp.iter_content(8192):
            f.write(chunk)
    return output_path


# ═══════════════════════════════════════════════════════════════════════════
# VIDEO COMPOSITING — ffmpeg pipeline
# ═══════════════════════════════════════════════════════════════════════════

def _hex(c: str) -> str:
    """#RRGGBB → 0xRRGGBB for ffmpeg."""
    return "0x" + c.lstrip("#")


def _esc(text: str) -> str:
    """Escape text for ffmpeg drawtext."""
    return (text.replace("\\", "\\\\").replace("'", "’")
            .replace(":", "\\:").replace("%", "%%"))


def composite_ugc_video(
    avatar_video: Path,
    background_images: list[Path],
    music_track: Path,
    output_path: Path,
    avatar_key: str,
    dest_name: str,
    duration: int = 35,
) -> Path:
    """
    Composite the final UGC video.

    All avatars use PiP mode: chromakey green screen removal, overlay avatar
    as PiP (bottom-right ~35% width) over Ken Burns Pomelli destination images.
    Adds NakshIQ branding bar (160px, fully opaque) + mixed audio (speech + ducked music).

    Note: All HeyGen public avatars render on green screen (#00FF00), even those
    with "built-in" scene backgrounds — those just have a landscape scene composited
    in the center with green padding above/below.

    Returns path to the final video.
    """
    if not shutil.which("ffmpeg"):
        raise RuntimeError("ffmpeg not found")

    avatar = AVATARS[avatar_key]
    avatar_name = avatar["name"]

    tmpdir = Path(tempfile.mkdtemp(prefix="ugc_"))

    try:
        # ── Step 1: Prepare music ────────────────────────────────────
        music_segment = tmpdir / "music_segment.wav"
        _prepare_music(music_track, music_segment, duration)

        # ── Step 2: Build branding filter chain (shared by both modes) ─
        branding_filters = [
            f"drawbox=x=0:y=h-160:w=iw:h=160:color={_hex(INK_DEEP)}:t=fill",
        ]
        if FONT_INSTRUMENT:
            branding_filters.append(
                f"drawtext=text='{_esc('NAKSHIQ')}':fontfile='{FONT_INSTRUMENT}':"
                f"fontsize=30:fontcolor={_hex(BONE)}:x=40:y=h-120:borderw=0"
            )
        if FONT_CRIMSON:
            branding_filters.append(
                f"drawtext=text='{_esc('Travel with IQ')}':fontfile='{FONT_CRIMSON}':"
                f"fontsize=24:fontcolor={_hex(SAFFRON)}:x=40:y=h-80:borderw=0"
            )
        if FONT_INSTRUMENT and dest_name:
            branding_filters.append(
                f"drawtext=text='{_esc(dest_name)}':fontfile='{FONT_INSTRUMENT}':"
                f"fontsize=26:fontcolor={_hex(BONE)}:x=w-tw-40:y=h-105:borderw=0"
            )

        branding_chain = ",".join(branding_filters)

        # ── Step 3: Build PiP composite ────────────────────────────
        final_video = tmpdir / "final.mp4"
        filters = []

        # Create Ken Burns background from Pomelli images
        bg_video = tmpdir / "background.mp4"
        if background_images:
            _create_ken_burns_bg(background_images, bg_video, duration)
        else:
            # Solid color fallback
            subprocess.run([
                "ffmpeg", "-y", "-f", "lavfi",
                "-i", f"color=c={_hex(INK_DEEP)}:s={REEL_W}x{REEL_H}:d={duration}:r={REEL_FPS}",
                "-c:v", "libx264", "-pix_fmt", "yuv420p",
                str(bg_video)
            ], check=True, capture_output=True)

        # Avatar PiP dimensions
        avatar_w = int(REEL_W * 0.35)  # 378px wide
        avatar_x = REEL_W - avatar_w - 40  # 40px margin from right
        avatar_y = REEL_H - int(REEL_H * 0.45)  # Upper portion of lower half

        # Background scaled to 1080x1920
        filters.append(
            f"[0:v]scale={REEL_W}:{REEL_H}:force_original_aspect_ratio=increase,"
            f"crop={REEL_W}:{REEL_H},setsar=1[bg]"
        )

        # Avatar: chromakey green screen removal + scale
        filters.append(
            f"[1:v]chromakey=0x00FF00:0.15:0.1,"
            f"scale={avatar_w}:-1[avatar_clean]"
        )

        # Overlay avatar on background
        filters.append(
            f"[bg][avatar_clean]overlay=x={avatar_x}:y={avatar_y}:"
            f"shortest=1[composited]"
        )

        # Add branding bar
        filters.append(
            f"[composited]{branding_chain}[branded]"
        )

        # Audio mix: speech + ducked music
        filters.append(
            f"[1:a]aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono[speech]"
        )
        filters.append(
            f"[2:a]aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono,"
            f"volume=0.15[music_ducked]"
        )
        filters.append(
            f"[speech][music_ducked]amix=inputs=2:duration=first:"
            f"dropout_transition=2[mixed_audio]"
        )

        filter_complex = ";".join(filters)

        cmd = [
            "ffmpeg", "-y",
            "-i", str(bg_video),       # input 0: background
            "-i", str(avatar_video),   # input 1: avatar (video + audio)
            "-i", str(music_segment),  # input 2: music
            "-filter_complex", filter_complex,
            "-map", "[branded]",
            "-map", "[mixed_audio]",
            "-c:v", "libx264", "-preset", "medium", "-crf", "23",
            "-c:a", "aac", "-b:a", "128k",
            "-pix_fmt", "yuv420p",
            "-t", str(duration),
            "-movflags", "+faststart",
            str(final_video),
        ]

        print(f"  Compositing (PiP over destination)")
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"ffmpeg stderr: {result.stderr[-1000:]}")
            raise RuntimeError(f"ffmpeg compositing failed: {result.returncode}")

        # Copy to output
        shutil.copy2(final_video, output_path)
        return output_path

    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)


def _create_ken_burns_bg(images: list[Path], output: Path, duration: int):
    """Create Ken Burns panning background video from Pomelli images."""
    per_image = duration / len(images)
    frames_per = int(per_image * REEL_FPS)

    # Zoompan styles for variety
    zoompan_styles = [
        ("min(1.12,1+0.0004*on)", "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"),
        ("1.12-0.0004*on", "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"),
        ("min(1.12,1+0.0004*on)", "iw/4+(iw/4*on/{f})", "ih/2-(ih/zoom/2)"),
        ("min(1.12,1+0.0004*on)", "iw/2-(iw/4*on/{f})", "ih/2-(ih/zoom/2)"),
    ]

    tmpdir = Path(tempfile.mkdtemp(prefix="kb_"))
    segments = []

    try:
        for i, img in enumerate(images):
            style = zoompan_styles[i % len(zoompan_styles)]
            zoom_e, x_e, y_e = style
            x_e = x_e.replace("{f}", str(frames_per))
            y_e = y_e.replace("{f}", str(frames_per))

            seg = tmpdir / f"seg_{i}.mp4"
            # Crop bottom 200px (Pomelli branding area) then scale for Ken Burns
            subprocess.run([
                "ffmpeg", "-y",
                "-loop", "1", "-i", str(img),
                "-vf", (
                    f"crop=iw:ih-400:0:0,"  # Crop bottom 400px (source image labels + branding)
                    f"scale=8000:-1,"
                    f"zoompan=z='{zoom_e}':x='{x_e}':y='{y_e}':"
                    f"d={frames_per}:s={REEL_W}x{REEL_H}:fps={REEL_FPS},"
                    f"format=yuv420p"
                ),
                "-t", str(per_image),
                "-c:v", "libx264", "-preset", "fast", "-crf", "20",
                str(seg),
            ], check=True, capture_output=True)
            segments.append(seg)

        # Concatenate with crossfade
        if len(segments) == 1:
            shutil.copy2(segments[0], output)
        else:
            # Build xfade chain
            concat_list = tmpdir / "concat.txt"
            with open(concat_list, "w") as f:
                for seg in segments:
                    f.write(f"file '{seg}'\n")
            subprocess.run([
                "ffmpeg", "-y", "-f", "concat", "-safe", "0",
                "-i", str(concat_list),
                "-c:v", "libx264", "-preset", "fast", "-crf", "20",
                "-pix_fmt", "yuv420p",
                str(output),
            ], check=True, capture_output=True)
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)


def _prepare_music(track: Path, output: Path, duration: int):
    """
    Prepare a music segment: take from the latter half of the track
    (avoids intros, gets to the groove) and trim to duration.
    """
    # Get track length
    result = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", str(track)
    ], capture_output=True, text=True)

    try:
        total_duration = float(result.stdout.strip())
    except (ValueError, AttributeError):
        total_duration = 180  # assume 3 min if probe fails

    # Start from the latter half (skip intro), but leave room for our segment
    # User preference: use the last 1.5 minutes, crop 30s from there
    start_point = max(0, total_duration - 90)  # Start from last 90 seconds
    # Pick a random 35s window within the last 90s
    latest_start = max(start_point, total_duration - duration - 5)
    actual_start = random.uniform(start_point, latest_start) if latest_start > start_point else start_point

    subprocess.run([
        "ffmpeg", "-y",
        "-ss", str(actual_start),
        "-i", str(track),
        "-t", str(duration),
        "-af", "afade=t=in:st=0:d=2,afade=t=out:st={out_start}:d=3".format(
            out_start=max(0, duration - 3)
        ),
        "-ar", "44100", "-ac", "1",
        str(output),
    ], check=True, capture_output=True)


# ═══════════════════════════════════════════════════════════════════════════
# MAIN PIPELINE — Orchestrates everything
# ═══════════════════════════════════════════════════════════════════════════

def generate_ugc(
    content: Optional[dict] = None,
    category: Optional[str] = None,
    avatar_override: Optional[str] = None,
    dry_run: bool = False,
    output_dir: Optional[Path] = None,
) -> dict:
    """
    Generate a complete UGC avatar video.

    Args:
        content: Dict with destination data. If None, fetches from NakshIQ API.
        category: Force a specific content category. If None, auto-selects.
        avatar_override: Force a specific avatar. If None, uses round-robin.
        dry_run: If True, generates script but skips HeyGen API + compositing.
        output_dir: Where to save the final video. Defaults to ./ugc_output/.

    Returns:
        Dict with: video_path, avatar, script, caption_ig, caption_yt, category
    """
    import requests as _requests

    state = _load_state()

    # ── Step 1: Get content data ─────────────────────────────────────
    if content is None:
        try:
            resp = _requests.get(NAKSHIQ_API, timeout=10)
            resp.raise_for_status()
            api_data = resp.json()
            # Pick a random destination from the API response
            if isinstance(api_data, list) and api_data:
                content = random.choice(api_data)
            elif isinstance(api_data, dict):
                content = api_data
            else:
                content = _fallback_content()
        except Exception as e:
            print(f"  [WARN] NakshIQ API unavailable ({e}), using fallback content")
            content = _fallback_content()

    dest = content.get("dest", "Jaipur")
    print(f"\n{'='*60}")
    print(f"UGC GENERATOR — {dest}")
    print(f"{'='*60}")

    # ── Step 2: Select category ──────────────────────────────────────
    if category is None:
        category = random.choice(CONTENT_CATEGORIES)
    print(f"  Category: {category}")

    # ── Step 3: Select avatar ────────────────────────────────────────
    if avatar_override and avatar_override in AVATARS:
        avatar_key = avatar_override
    else:
        avatar_key = select_avatar(category, state)

    avatar = AVATARS[avatar_key]
    print(f"  Avatar: {avatar['name']} ({avatar['role']})")
    print(f"  Origin: {avatar['origin']}")

    # ── Step 4: Generate script ──────────────────────────────────────
    script = generate_script(avatar_key, category, content)
    word_count = len(script.split())
    est_duration = word_count / 2.5
    print(f"  Script: {word_count} words (~{est_duration:.0f}s speech)")
    print(f"  ---")
    print(f"  {script}")
    print(f"  ---")

    # ── Step 5: VALIDATE (non-negotiable) ────────────────────────────
    violations = validate_script(script, avatar_key)
    if violations:
        print(f"\n  ✗ SCRIPT FAILED VALIDATION:")
        for v in violations:
            print(f"    ✗ {v}")
        raise ContentRuleViolation(
            f"Script for {avatar['name']} failed {len(violations)} rule(s). "
            f"REFUSING TO PROCEED. Fix the template or content data."
        )
    print(f"  ✓ Script passed all {7} rule checks")

    # ── Step 6: Select music ─────────────────────────────────────────
    music = select_music(avatar_key, state)
    print(f"  Music: {music.name if music else 'NONE'}")

    # ── Step 7: Select backgrounds ───────────────────────────────────
    dest_slug = dest.lower().replace(" ", "_")
    backgrounds = select_backgrounds(dest_slug)
    print(f"  Backgrounds: {len(backgrounds)} Pomelli images")

    # ── Step 8: Generate captions ────────────────────────────────────
    caption_ig = generate_caption(avatar_key, content, "instagram")
    caption_yt = generate_caption(avatar_key, content, "youtube")

    if dry_run:
        print(f"\n  [DRY RUN] Skipping HeyGen API + compositing")
        print(f"\n  Instagram caption:\n  {caption_ig}")
        print(f"\n  YouTube caption:\n  {caption_yt}")
        _save_state(state)
        return {
            "video_path": None,
            "avatar": avatar_key,
            "avatar_name": avatar["name"],
            "script": script,
            "caption_ig": caption_ig,
            "caption_yt": caption_yt,
            "category": category,
            "dest": dest,
            "music": music.name if music else None,
            "backgrounds": len(backgrounds),
            "dry_run": True,
        }

    # ── Step 9: Check HeyGen balance ─────────────────────────────────
    balance = check_balance()
    est_cost = est_duration * 0.018
    print(f"  HeyGen balance: ${balance:.2f} (est. cost: ${est_cost:.2f})")
    if balance < est_cost:
        raise RuntimeError(
            f"Insufficient HeyGen balance: ${balance:.2f} < ${est_cost:.2f} estimated cost"
        )

    # ── Step 10: Submit to HeyGen ────────────────────────────────────
    title = f"NakshIQ UGC — {avatar['name']} — {dest}"
    print(f"  Submitting to HeyGen...")
    video_id = submit_avatar_video(avatar_key, script, title)
    print(f"  Video ID: {video_id}")

    # ── Step 11: Poll for completion ─────────────────────────────────
    print(f"  Waiting for render (up to 5 min)...")
    result = poll_video(video_id, max_wait=300)
    print(f"  Render complete: {result['duration']}s")

    # ── Step 12: Download avatar video ───────────────────────────────
    if output_dir is None:
        output_dir = Path(__file__).parent / "ugc_output"
    output_dir.mkdir(exist_ok=True)

    avatar_raw = output_dir / f"avatar_raw_{avatar_key}.mp4"
    download_video(result["video_url"], avatar_raw)
    print(f"  Downloaded avatar video: {avatar_raw.name}")

    # ── Step 13: Composite final video ───────────────────────────────
    timestamp = datetime.now().strftime("%Y%m%d_%H%M")
    final_path = output_dir / f"ugc_{avatar_key}_{dest_slug}_{timestamp}.mp4"

    print(f"  Compositing final video...")
    composite_ugc_video(
        avatar_video=avatar_raw,
        background_images=backgrounds,
        music_track=music,
        output_path=final_path,
        avatar_key=avatar_key,
        dest_name=dest,
        duration=TARGET_DURATION,
    )
    print(f"  ✓ Final video: {final_path.name}")

    # ── Step 14: Cleanup ─────────────────────────────────────────────
    avatar_raw.unlink(missing_ok=True)

    # ── Step 15: Save state ──────────────────────────────────────────
    new_balance = check_balance()
    actual_cost = balance - new_balance
    print(f"  Cost: ${actual_cost:.2f} (balance: ${new_balance:.2f})")

    _save_state(state)

    return {
        "video_path": str(final_path),
        "avatar": avatar_key,
        "avatar_name": avatar["name"],
        "script": script,
        "caption_ig": caption_ig,
        "caption_yt": caption_yt,
        "category": category,
        "dest": dest,
        "music": music.name if music else None,
        "backgrounds": len(backgrounds),
        "cost": actual_cost,
        "dry_run": False,
    }


def _fallback_content() -> dict:
    """Fallback content when NakshIQ API is unavailable."""
    destinations = [
        {
            "dest": "Jaipur", "score": "4.3", "best_month": "October",
            "bad_month": "June", "bad_reason": "scorching hot at 45 degrees",
            "local_food": "dal baati churma", "hidden_spot": "Nahargarh Fort at sunset",
            "highlight": "way the whole city glows pink at golden hour",
            "practical_tip": "always negotiate rickshaw fares before getting in",
            "tip_1": "carry a scarf for temple visits",
            "tip_2": "the old city markets close early on Sundays",
            "wellness_activity": "yoga at sunrise on the fort walls",
        },
        {
            "dest": "Ladakh", "score": "4.1", "best_month": "July",
            "bad_month": "December", "bad_reason": "frozen and all passes are closed",
            "local_food": "thukpa and momos", "hidden_spot": "Tso Kar lake",
            "highlight": "silence at Pangong Lake at dawn",
            "practical_tip": "take Diamox for altitude and hydrate constantly",
            "altitude": "3,500m at Leh, 5,300m at Khardung La",
            "acclimatize_days": "3", "essential_gear": "layers, sunscreen SPF50, and altitude meds",
            "challenge": "thin air and rough roads",
            "tip_1": "fly in but drive out — your body needs time to adjust",
            "tip_2": "carry cash because there are no ATMs beyond Leh",
        },
        {
            "dest": "Rishikesh", "score": "4.5", "best_month": "March",
            "bad_month": "August", "bad_reason": "monsoon flooding makes the Ganga dangerous",
            "local_food": "aloo puri from the ashram kitchen",
            "hidden_spot": "Neer Garh waterfall trail",
            "highlight": "Ganga Aarti at Triveni Ghat",
            "practical_tip": "book your ashram stay directly, not through aggregators",
            "wellness_activity": "a 10-day silent Vipassana retreat",
            "tip_1": "the good yoga schools book out months in advance",
            "tip_2": "avoid the main strip cafes — the backstreet ones are better and cheaper",
        },
        {
            "dest": "Goa", "score": "3.8", "best_month": "November",
            "bad_month": "June", "bad_reason": "the monsoon shuts down all beach shacks",
            "local_food": "fish curry rice at a local taverna",
            "hidden_spot": "Butterfly Beach in South Goa",
            "highlight": "old Portuguese houses in Fontainhas",
            "practical_tip": "rent a scooter but always wear a helmet — police checkpoints are real",
            "tip_1": "South Goa for peace, North Goa for parties — do not mix them up",
            "tip_2": "the beach shacks in Agonda are half the price of Palolem",
        },
        {
            "dest": "Kerala Backwaters", "score": "4.4", "best_month": "September",
            "bad_month": "April", "bad_reason": "the heat and humidity are brutal",
            "local_food": "appam with fish molee", "hidden_spot": "Kumarakom bird sanctuary at dawn",
            "highlight": "waking up on a houseboat surrounded by paddy fields",
            "practical_tip": "book a private houseboat, not a group one — worth the extra cost",
            "wellness_activity": "an authentic Ayurveda Panchakarma treatment",
            "tip_1": "mosquito repellent is non-negotiable on the backwaters",
            "tip_2": "the smaller canals are way more beautiful than the main tourist route",
        },
    ]
    return random.choice(destinations)


# ═══════════════════════════════════════════════════════════════════════════
# CLI
# ═══════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="NakshIQ UGC Avatar Video Generator")
    parser.add_argument("--dry-run", action="store_true",
                        help="Generate script only, skip HeyGen API + compositing")
    parser.add_argument("--avatar", type=str, default=None,
                        help=f"Force specific avatar: {', '.join(AVATARS.keys())}")
    parser.add_argument("--category", type=str, default=None,
                        help=f"Force category: {', '.join(CONTENT_CATEGORIES)}")
    parser.add_argument("--dest", type=str, default=None,
                        help="Force destination name")
    parser.add_argument("--all-avatars", action="store_true",
                        help="Dry-run test every avatar (validation sweep)")
    parser.add_argument("--validate-all", action="store_true",
                        help="Run validation sweep: every avatar × every category")

    args = parser.parse_args()

    if args.validate_all:
        # Comprehensive validation: every avatar × every category it supports
        print("═" * 60)
        print("FULL VALIDATION SWEEP")
        print("═" * 60)

        total_tests = 0
        total_pass = 0
        total_fail = 0
        failures = []

        for avatar_key, avatar in AVATARS.items():
            all_cats = avatar["categories"] + avatar.get("secondary_categories", [])
            for cat in all_cats:
                total_tests += 1
                content = _fallback_content()
                try:
                    script = generate_script(avatar_key, cat, content)
                    violations = validate_script(script, avatar_key)
                    if violations:
                        total_fail += 1
                        failures.append((avatar_key, cat, violations))
                        print(f"  ✗ {avatar['name']:10s} × {cat:20s} — {len(violations)} violation(s)")
                        for v in violations:
                            print(f"      {v}")
                    else:
                        total_pass += 1
                        print(f"  ✓ {avatar['name']:10s} × {cat:20s} — PASS")
                except Exception as e:
                    total_fail += 1
                    failures.append((avatar_key, cat, [str(e)]))
                    print(f"  ✗ {avatar['name']:10s} × {cat:20s} — ERROR: {e}")

        print(f"\n{'='*60}")
        print(f"Results: {total_pass}/{total_tests} passed, {total_fail} failed")
        if failures:
            print(f"\nFAILURES:")
            for ak, cat, vs in failures:
                print(f"  {AVATARS[ak]['name']} × {cat}: {vs[0][:100]}")
        print(f"{'='*60}")

    elif args.all_avatars:
        # Test every avatar with dry-run
        for avatar_key in AVATARS:
            try:
                result = generate_ugc(
                    avatar_override=avatar_key,
                    dry_run=True,
                )
                print(f"  ✓ {result['avatar_name']} — {result['category']} — {result['dest']}\n")
            except Exception as e:
                print(f"  ✗ {avatar_key}: {e}\n")

    else:
        content = None
        if args.dest:
            content = _fallback_content()
            content["dest"] = args.dest

        result = generate_ugc(
            content=content,
            category=args.category,
            avatar_override=args.avatar,
            dry_run=args.dry_run,
        )

        if result.get("dry_run"):
            print(f"\n✓ Dry run complete for {result['avatar_name']} on {result['dest']}")
        else:
            print(f"\n✓ Video generated: {result['video_path']}")
            print(f"  Cost: ${result.get('cost', 0):.2f}")
