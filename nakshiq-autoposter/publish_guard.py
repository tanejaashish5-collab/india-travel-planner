"""publish_guard.py — pre-flight validation before any Outstand publish.

Added 2026-05-26 after the triple-publish + blank-badge + Mathura-orphan
incident cascade (see session_2026_05_26_autoposter_triple_publish_postmortem
in memory). Goal: catch blank/0-byte/structurally-broken media BEFORE it
ships, and surface the reason so the watchdog / weekly digest can act on it.

Three validators are exported:
1. validate_media_bytes(data, filename, content_type) — bytes-level checks
   (run by upload_media_bytes BEFORE the R2 PUT). Catches empty / truncated /
   solid-color renders (the Puri blank-green-Story pathway).
2. validate_media_dict(media, *, format_id, dest_id) — dict-level checks
   (run by publish_feed_post/publish_story/publish_reel BEFORE the Outstand
   POST). Catches None / missing-key / non-http payloads.
3. validate_publish_payload(media, *, format_id, dest_id, label) — combined
   helper that walks a single dict OR a carousel list.

Validators never raise. On failure they return (False, "<reason>") so the
caller logs the reason via _log_post_outcome(status=f"blocked_pre_publish:{reason}")
and skips the format.
"""
from __future__ import annotations

import io
import logging
from typing import Optional, Tuple, Union

log = logging.getLogger(__name__)

# Minimum dimensions for any image we'd publish. IG accepts 320px+ but our
# carousels are 1080×1080 and stories are 1080×1920 — anything under 100×100
# is almost certainly a corrupt / truncated / partial-fetch render.
MIN_IMAGE_PX = 100
# A JPEG / PNG under this is almost always a fragment or a truncated download.
MIN_IMAGE_BYTES = 1024
# Videos are heavier — under 10KB is a stub.
MIN_VIDEO_BYTES = 10 * 1024
# Flatness check: an image whose RGB channels are all within this span across
# the whole canvas is a solid-color fallback (Puri green badge case). Set high
# enough to tolerate subtle gradients on real photos.
FLAT_PIXEL_TOLERANCE = 2  # 0–255 range


def _is_video_ctype(content_type: str) -> bool:
    return (content_type or "").lower().startswith("video/")


def _is_image_ctype(content_type: str) -> bool:
    return (content_type or "").lower().startswith("image/")


def validate_media_bytes(
    data: Optional[bytes],
    filename: str,
    content_type: str = "image/jpeg",
) -> Tuple[bool, Optional[str]]:
    """Run before R2 PUT. Returns (ok, reason).

    Image path:
    - Non-empty bytes
    - Size ≥ MIN_IMAGE_BYTES
    - Pillow can open + verify (catches truncation)
    - Dimensions ≥ MIN_IMAGE_PX × MIN_IMAGE_PX
    - Not solid color (catches blank-overlay fallback)

    Video path:
    - Non-empty bytes
    - Size ≥ MIN_VIDEO_BYTES
    - First 32 bytes contain a known container magic
    """
    if data is None or len(data) == 0:
        return False, "empty_bytes"

    size = len(data)

    if _is_video_ctype(content_type):
        if size < MIN_VIDEO_BYTES:
            return False, f"video_too_small_{size}b"
        head = data[:32]
        # mp4 / mov / m4v carry 'ftyp' in the first 32 bytes; webm starts with
        # 0x1A 0x45 0xDF 0xA3 (EBML). Anything else is suspect.
        if b"ftyp" not in head and not head.startswith(b"\x1a\x45\xdf\xa3"):
            return False, "video_unknown_magic"
        return True, None

    if not _is_image_ctype(content_type):
        # Unknown content type — let it through; Outstand will reject if bad.
        return True, None

    # Image path
    if size < MIN_IMAGE_BYTES:
        return False, f"image_too_small_{size}b"

    try:
        from PIL import Image
    except ImportError:
        # Pillow not available — fall back to size-only check (already passed).
        log.warning("publish_guard: Pillow not available, byte-size-only validation")
        return True, None

    # verify() detects truncation but consumes the stream — re-open afterwards.
    try:
        Image.open(io.BytesIO(data)).verify()
    except Exception as e:
        return False, f"image_unreadable_{type(e).__name__}"

    try:
        img = Image.open(io.BytesIO(data))
        w, h = img.size
    except Exception as e:
        return False, f"image_dim_check_failed_{type(e).__name__}"

    if w < MIN_IMAGE_PX or h < MIN_IMAGE_PX:
        return False, f"image_dim_too_small_{w}x{h}"

    # Solid-color (flat) check — catches the Puri green badge case.
    try:
        thumb = img.copy()
        thumb.thumbnail((64, 64))
        extrema = thumb.convert("RGB").getextrema()
        # extrema == ((r_min, r_max), (g_min, g_max), (b_min, b_max))
        spans = [hi - lo for lo, hi in extrema]
        if all(span <= FLAT_PIXEL_TOLERANCE for span in spans):
            return False, "image_solid_color"
    except Exception:
        # If the flat check itself errors, don't block — let the post proceed.
        pass

    return True, None


def validate_media_dict(
    media: Optional[dict],
    *,
    format_id: Optional[str] = None,
    dest_id: Optional[str] = None,
) -> Tuple[bool, Optional[str]]:
    """Run before each publish_* Outstand call. Returns (ok, reason).

    Validates that the media dict returned by upload_media_bytes has the
    required keys (id / url / filename) and that the URL is well-formed.
    """
    if media is None:
        return False, "media_is_none"
    if not isinstance(media, dict):
        return False, f"media_not_dict_{type(media).__name__}"
    for key in ("id", "url", "filename"):
        if not media.get(key):
            return False, f"media_missing_{key}"
    url = str(media["url"])
    if not (url.startswith("http://") or url.startswith("https://")):
        return False, "media_url_not_http"
    return True, None


def validate_publish_payload(
    media: Union[None, dict, list],
    *,
    format_id: Optional[str] = None,
    dest_id: Optional[str] = None,
    label: str = "",
) -> Tuple[bool, Optional[str]]:
    """Combined helper for publish_feed_post / publish_story / publish_reel.

    `media` accepts:
      - None        → text-only post (always OK, no media to validate)
      - a dict      → single-image / single-video post
      - a list      → carousel (validates each slot; reports the bad index)

    Returns (ok, reason). For carousels, reason embeds the failing slot
    index so the caller can log which slide failed.
    """
    if media is None:
        return True, None
    if isinstance(media, list):
        if not media:
            return True, None  # empty list → text-only path; not our concern
        for i, m in enumerate(media):
            ok, reason = validate_media_dict(m, format_id=format_id, dest_id=dest_id)
            if not ok:
                return False, f"slide_{i}_{reason}"
        return True, None
    return validate_media_dict(media, format_id=format_id, dest_id=dest_id)
