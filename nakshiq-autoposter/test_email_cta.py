#!/usr/bin/env python3
"""
test_email_cta.py — self-tests for the email-capture CTA layer (2026-06-10)
===========================================================================
Run:    python3 test_email_cta.py        (plain runner, exit 1 on failure)
   or:  pytest test_email_cta.py         (functions are pytest-compatible)

What is asserted (the two invariants the audit/email-ctas branch promises):
  (a) ROTATION EXACTNESS — the IG/FB caption CTA appears on exactly every
      Nth lifetime post (counted off post_log.jsonl), the YouTube standing
      line appears on EVERY YT description, utm_source matches the platform,
      and the kill-switch / N=0 fully disable the layer.
  (b) RENDER PATH UNTOUCHED — with the feature ON, the spoken-script specs
      (_template_spec / _template_spec_en — the TTS input) and the burned-in
      ASS caption file (build_ass) are BYTE-IDENTICAL to feature-off output.
      The CTA only ever lands in post caption/description text.

No network, no Outstand, no Supabase — everything is pure-function level.
"""
from __future__ import annotations

import json
import os
import sys
import tempfile
import traceback
from contextlib import contextmanager
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import autoposter as ap  # noqa: E402
import yt_shorts_v2 as v2  # noqa: E402

CTA_MARK = "utm_campaign=email_cta"


@contextmanager
def _env(**kv):
    """Temporarily set/del env vars (value None = unset)."""
    old = {k: os.environ.get(k) for k in kv}
    try:
        for k, v in kv.items():
            if v is None:
                os.environ.pop(k, None)
            else:
                os.environ[k] = str(v)
        yield
    finally:
        for k, v in old.items():
            if v is None:
                os.environ.pop(k, None)
            else:
                os.environ[k] = v


@contextmanager
def _post_log(n_entries: int):
    """Point autoposter.POST_LOG_JSONL at a temp file holding n unique rows."""
    old = ap.POST_LOG_JSONL
    with tempfile.TemporaryDirectory() as td:
        p = Path(td) / "post_log.jsonl"
        with open(p, "w", encoding="utf-8") as f:
            for i in range(n_entries):
                f.write(json.dumps({
                    "post_id": f"p{i}", "platform": "instagram",
                    "timestamp": f"2026-06-01T00:00:{i:02d}+00:00",
                    "date": "2026-06-01", "format": "score_card",
                }) + "\n")
        ap.POST_LOG_JSONL = p
        try:
            yield
        finally:
            ap.POST_LOG_JSONL = old


IG_CAPTION = ("Kya scene hai Spiti ka?\n\nScore 8/10 — roads open, crowds low.\n\n"
              "💾 Save this — refer back when you plan your trip.\n\n"
              "#Spiti #SpitiTravel #NakshIQ")
YT_CAPTION = ("Spiti: June NakshIQ Score 8/10\n\nKya scene hai.\n\nSpiti, Himachal — June "
              "score 8/10 (weather, roads, crowds, hospital & cell signal all checked).\n\n"
              "Full verified guide → https://nakshiq.com/en/destination/spiti/june"
              "?utm_source=youtube&utm_medium=short&utm_campaign=nakshiq-score\n\n"
              "#Spiti #Shorts\n\n♪ Track: Mixkit")


# ─────────────────────────────────────────────────────────────────────────
# (a) rotation exactness + platform behaviour
# ─────────────────────────────────────────────────────────────────────────

def test_rotation_exactly_every_nth_post():
    """CTA appears iff this publish is the Nth lifetime post — for N=3 over
    9 consecutive lifetime positions, and again for N=2."""
    for n in (3, 2):
        with _env(NAKSHIQ_EMAIL_CTA="1", NAKSHIQ_EMAIL_CTA_EVERY_N=str(n)):
            for prior in range(9):
                with _post_log(prior):
                    out = ap._append_email_cta(IG_CAPTION, "instagram")
                due = (prior + 1) % n == 0
                assert (CTA_MARK in out) == due, (
                    f"N={n} prior={prior}: expected due={due}, caption={out[-140:]!r}")


def test_rotated_cta_is_purely_additive():
    """Removing the inserted CTA block restores the original caption byte-for-
    byte — the rotation never rewrites existing caption content."""
    with _env(NAKSHIQ_EMAIL_CTA="1", NAKSHIQ_EMAIL_CTA_EVERY_N="1"), _post_log(0):
        out = ap._append_email_cta(IG_CAPTION, "instagram")
        line = ap._email_cta_line("instagram")
        assert CTA_MARK in out
        assert out.replace(f"\n\n{line}", "", 1) == IG_CAPTION
        # Inserted ABOVE the trailing hashtag block, not after it.
        assert out.index(line) < out.index("#Spiti #SpitiTravel")
        # First line untouched (publish_reel reads it as the YT title).
        assert out.split("\n")[0] == IG_CAPTION.split("\n")[0]


def test_utm_source_matches_platform():
    with _env(NAKSHIQ_EMAIL_CTA="1", NAKSHIQ_EMAIL_CTA_EVERY_N="1"), _post_log(0):
        ig = ap._append_email_cta("Plain caption, no tags.", "instagram")
        fb = ap._append_email_cta("Plain caption, no tags.", "facebook")
    yt = ap._append_email_cta("Title line\n\nBody.", "youtube")
    assert "utm_source=instagram" in ig and CTA_MARK in ig
    assert "utm_source=facebook" in fb and CTA_MARK in fb
    assert "utm_source=youtube" in yt and CTA_MARK in yt
    for out in (ig, fb, yt):
        assert "https://www.nakshiq.com/en/newsletter?" in out
        assert "utm_medium=social" in out


def test_youtube_standing_line_on_every_description():
    """YT descriptions get the standing line regardless of rotation position,
    even with the rotation disabled (N=0); and the append is idempotent."""
    for prior in range(4):
        with _env(NAKSHIQ_EMAIL_CTA="1", NAKSHIQ_EMAIL_CTA_EVERY_N="0"), _post_log(prior):
            out = ap._append_email_cta(YT_CAPTION, "youtube")
        assert "The Window" in out and "utm_content=yt_description" in out, (
            f"prior={prior}: standing line missing")
        # Title (first line) untouched; CTA sits above the hashtag block.
        assert out.split("\n")[0] == YT_CAPTION.split("\n")[0]
        assert out.index("The Window") < out.index("#Spiti #Shorts")
        # Idempotent — a second pass must not double the line.
        again = ap._append_email_cta(out, "youtube")
        assert again == out
        assert again.count(CTA_MARK) == 1


def test_kill_switch_and_unknown_platform():
    with _env(NAKSHIQ_EMAIL_CTA="0", NAKSHIQ_EMAIL_CTA_EVERY_N="1"), _post_log(0):
        assert ap._append_email_cta(IG_CAPTION, "instagram") == IG_CAPTION
        assert ap._append_email_cta(YT_CAPTION, "youtube") == YT_CAPTION
    with _env(NAKSHIQ_EMAIL_CTA="1", NAKSHIQ_EMAIL_CTA_EVERY_N="1"), _post_log(0):
        # Unknown platform → untouched. Empty caption → untouched.
        assert ap._append_email_cta(IG_CAPTION, "tiktok") == IG_CAPTION
        assert ap._append_email_cta("", "instagram") == ""


def test_near_cap_caption_skips_cta():
    """A caption close to the platform hard limit must NOT gain the CTA
    (never risk a rejected post over a nice-to-have line)."""
    big = "x" * 2150
    with _env(NAKSHIQ_EMAIL_CTA="1", NAKSHIQ_EMAIL_CTA_EVERY_N="1"), _post_log(0):
        assert ap._append_email_cta(big, "instagram") == big


# ─────────────────────────────────────────────────────────────────────────
# (b) voice / burned-in-caption path is byte-identical with the feature ON
# ─────────────────────────────────────────────────────────────────────────

_DEST = {
    "id": "spiti-valley", "name": "Spiti Valley", "state": "Himachal Pradesh",
    "score": 4, "tagline_hi": "ठंडा रेगिस्तान", "why_special_hi": "बौद्ध मठ और ऊँचे गाँव।",
    "note": "Carry warm layers even in June.", "elevation_m": 3800,
    "difficulty": "hard", "price_range_inr": 1500, "hero_dish": "Thukpa",
    "tagline": "The cold desert", "why_special": "High villages and monasteries.",
    "intel": {
        "network": {"best_network": "Jio", "quality": "patchy"},
        "fuel": {"nearest_petrol_pump": "Kaza", "carry_extra": True},
        "weather_night": {"summer_low_c": 4},
        "sos": {"safety_contact": {"label": "Police", "phone": "112"}},
        "reach": {"road_condition": "rough patches", "last_km_difficulty": "moderate"},
        "legendary_eatery": {"name": "Sol Cafe"},
    },
}

_FEATURE_ON = dict(NAKSHIQ_EMAIL_CTA="1", NAKSHIQ_EMAIL_CTA_EVERY_N="1")
_FEATURE_OFF = dict(NAKSHIQ_EMAIL_CTA=None, NAKSHIQ_EMAIL_CTA_EVERY_N=None)


def test_spoken_script_specs_byte_identical():
    """_template_spec / _template_spec_en build the TTS input (spoken script)
    + burned-in caption lines. Feature ON vs OFF must be byte-identical."""
    for fn in (v2._template_spec, v2._template_spec_en):
        with _env(**_FEATURE_ON):
            on = json.dumps(fn(dict(_DEST)), ensure_ascii=False, sort_keys=True)
        with _env(**_FEATURE_OFF):
            off = json.dumps(fn(dict(_DEST)), ensure_ascii=False, sort_keys=True)
        assert on == off, f"{fn.__name__} changed with email-CTA feature on"


def test_ass_caption_file_byte_identical():
    """build_ass writes the burned-in caption track. Feature ON vs OFF must
    produce byte-identical .ass files (the CTA never reaches the renderer)."""
    cues = [(0.00, 0.42, "KYA"), (0.42, 0.95, "SCENE HAI"),
            (0.95, 1.60, "SPITI KA?"), (1.60, 2.30, "SCORE 8/10")]
    with tempfile.TemporaryDirectory() as td:
        a, b = Path(td) / "on.ass", Path(td) / "off.ass"
        with _env(**_FEATURE_ON):
            v2.build_ass(list(cues), "8/10", "Spiti Valley", 24.0, a)
        with _env(**_FEATURE_OFF):
            v2.build_ass(list(cues), "8/10", "Spiti Valley", 24.0, b)
        on_bytes, off_bytes = a.read_bytes(), b.read_bytes()
        assert on_bytes == off_bytes, "ASS caption file changed with feature on"
        assert CTA_MARK.encode() not in on_bytes
        assert b"/newsletter" not in on_bytes


def test_publish_caption_unchanged_when_not_due():
    """Off-rotation IG/FB publishes ship a byte-identical caption with the
    feature ON (the layer is a no-op except on the Nth post)."""
    with _env(**_FEATURE_ON):
        with _post_log(1):  # (1+1) % 3 != 0 with default N… use explicit N=3
            with _env(NAKSHIQ_EMAIL_CTA_EVERY_N="3"):
                assert ap._append_email_cta(IG_CAPTION, "instagram") == IG_CAPTION
                assert ap._append_email_cta(IG_CAPTION, "facebook") == IG_CAPTION


# ─────────────────────────────────────────────────────────────────────────
# runner
# ─────────────────────────────────────────────────────────────────────────

def main() -> int:
    tests = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    passed = failed = 0
    for t in tests:
        try:
            t()
            print(f"  PASS  {t.__name__}")
            passed += 1
        except Exception:
            print(f"  FAIL  {t.__name__}")
            traceback.print_exc()
            failed += 1
    print(f"\n{passed} passed, {failed} failed ({len(tests)} total)")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
