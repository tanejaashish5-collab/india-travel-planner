"""
Social Image Library Picker
============================

Integration module for the autoposter to pull branded images
from the social_image_library/ instead of raw destination photos.

Usage in autoposter.py:
    from social_image_picker import pick_social_image

    # Get a branded feed image for a destination
    img_path = pick_social_image(dest_name, fmt="feed")

    # Get a story image
    story_path = pick_social_image(dest_name, fmt="story")

    # Get image URL for Outstand API (file:// path)
    img_url = pick_social_image_url(dest_name, fmt="feed")
"""
from __future__ import annotations

import json
import random
from pathlib import Path

ROOT        = Path(__file__).parent
LIBRARY_DIR = ROOT / "social_image_library"
MANIFEST    = LIBRARY_DIR / "manifest.json"

_manifest_cache: dict | None = None


def _load_manifest() -> dict:
    global _manifest_cache
    if _manifest_cache is None and MANIFEST.exists():
        _manifest_cache = json.loads(MANIFEST.read_text())
    return _manifest_cache or {"images": []}


def _slugify(name: str) -> str:
    return name.lower().replace(" ", "-").replace("'", "").replace(",", "")


def pick_social_image(
    dest_name: str,
    fmt: str = "feed",
    style: str | None = None,
    branding: str | None = None,
) -> Path | None:
    """
    Find a branded social image for a destination.

    Args:
        dest_name: Destination name (e.g. "Manali", "Nainital")
        fmt: "feed" (1080x1080) or "story" (1080x1920)
        style: Optional style filter ("bold-cinematic", "minimal-elegant", etc.)
        branding: Optional branding filter ("watermark", "footer-bar", "badge")

    Returns:
        Path to the JPEG image, or None if not found.
    """
    if not LIBRARY_DIR.exists():
        return None

    slug = _slugify(dest_name)

    # Search by directory name prefix
    candidates = []
    try:
        for d in LIBRARY_DIR.iterdir():
            if d.is_dir() and d.name.startswith(slug):
                for f in d.glob(f"*_{fmt}_*.jpg"):
                    fname = f.name
                    if style and style not in fname:
                        continue
                    if branding and branding not in fname:
                        continue
                    candidates.append(f)
    except OSError:
        return None

    if not candidates:
        return None

    # Return first match (deterministic) or random for variety
    return candidates[0]


def pick_social_image_url(
    dest_name: str,
    fmt: str = "feed",
    **kwargs,
) -> str | None:
    """Get the file:// URL for a social image (for Outstand API uploads)."""
    path = pick_social_image(dest_name, fmt, **kwargs)
    if path:
        return f"file://{path}"
    return None


def has_social_image(dest_name: str) -> bool:
    """Check if a destination has branded social images available."""
    slug = _slugify(dest_name)
    for d in LIBRARY_DIR.iterdir():
        if d.is_dir() and d.name.startswith(slug):
            return any(d.glob("*.jpg"))
    return False


def list_available_destinations() -> list[str]:
    """List all destinations that have social images."""
    manifest = _load_manifest()
    return [img["destination"] for img in manifest.get("images", [])]


def get_library_stats() -> dict:
    """Get statistics about the image library."""
    if not LIBRARY_DIR.exists():
        return {"total_destinations": 0, "total_images": 0}

    dirs = [d for d in LIBRARY_DIR.iterdir() if d.is_dir()]
    images = list(LIBRARY_DIR.rglob("*.jpg"))

    return {
        "total_destinations": len(dirs),
        "total_images": len(images),
        "feed_images": len([f for f in images if "_feed_" in f.name]),
        "story_images": len([f for f in images if "_story_" in f.name]),
        "library_path": str(LIBRARY_DIR),
    }
