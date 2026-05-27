"""brand_stamp.py — universal pre-publish brand overlay for images and videos.

Added 2026-05-26 (Issue 2 of the autoposter hardening) after IG audit found
12 of 12 recent reels and 9 of 12 recent image posts had NO destination
headline — viewers scrolled past raw photos without learning what dest it
was, since most never read captions.

This module runs at the upload chokepoint (publish_guard already lives there
too) and burns a "Achabal." style cinematic headline + brand chrome into:
  - Images: PIL composite (~<1s)
  - Videos: ffmpeg drawtext filter chain (~3-8s)

Failure is non-fatal — any exception logs a warning and returns the raw
bytes so the post still ships. The post will be unbranded, but the user
sees something rather than nothing.

Dest catalog lookup: register_dest_catalog(content) is called once per run
from autoposter._run_inner (so we don't pay the 12-month API fetch on every
upload). When register hasn't been called, brand_stamp passes through raw
bytes (no overlay). Filenames are parsed to extract the dest slug, falling
back to common patterns like `{format}-{slug}.{ext}` and `{slug}-{variant}.{ext}`.
"""
from __future__ import annotations

import io
import logging
import re
import subprocess
import tempfile
from pathlib import Path
from typing import Optional

log = logging.getLogger(__name__)

# ── Brand assets / colors (mirror dest_image_gen + reel_gen) ───────────────
_THIS_DIR = Path(__file__).parent
_FONT_DIR_CANDIDATES = [_THIS_DIR / "assets" / "fonts", _THIS_DIR / "assets" / "fonts 2"]

INK_DEEP_RGB = (22, 22, 20)
BONE_RGB = (245, 240, 232)
VERMILLION_RGB = (229, 86, 66)
SAFFRON_RGB = (240, 180, 65)

# ffmpeg expects hex without #
INK_DEEP_HEX = "0x161614"
BONE_HEX = "0xF5F0E8"
VERMILLION_HEX = "0xE55642"
SAFFRON_HEX = "0xF0B441"


def _font_path(name_candidates: list) -> Optional[Path]:
    """Find the first matching font file in either fonts dir."""
    for fdir in _FONT_DIR_CANDIDATES:
        if not fdir.exists():
            continue
        for name in name_candidates:
            p = fdir / name
            if p.exists():
                return p
    return None


_FONT_SERIF = _font_path(["CrimsonPro-BoldItalic.ttf", "CrimsonPro-Italic.ttf"])
_FONT_SANS = _font_path(["InstrumentSans-Bold.ttf"])
_FONT_MONO = _font_path(["JetBrainsMono-Bold.ttf"])


def _truncate_words(text: str, max_chars: int = 110) -> str:
    """Truncate `text` at a word boundary so we never render mid-word fragments
    like 'chi…' when the tagline gets cut. Appends an ellipsis only when truncated."""
    if not text or len(text) <= max_chars:
        return text or ""
    cut = text[:max_chars]
    last_space = cut.rfind(" ")
    if last_space > max_chars * 0.6:
        cut = cut[:last_space]
    return cut.rstrip(" ,.;:—-") + "…"


def _split_two_lines(text: str, per_line_max: int = 50) -> tuple:
    """Split `text` into (line1, line2) at a word boundary so a 2-line
    drawtext fits inside `per_line_max` chars per line. Used by the video
    overlay (ffmpeg drawtext does not auto-wrap)."""
    if not text:
        return "", ""
    text = text.strip()
    if len(text) <= per_line_max:
        return text, ""
    # First line: longest prefix ≤ per_line_max that ends on a space.
    cut = text[:per_line_max + 1]
    sp = cut.rfind(" ")
    if sp < per_line_max * 0.5:
        sp = per_line_max  # very long single word — hard cut
    line1 = text[:sp].rstrip()
    rest = text[sp:].lstrip()
    # Second line: truncate-with-ellipsis to per_line_max.
    if len(rest) <= per_line_max:
        line2 = rest
    else:
        cut2 = rest[:per_line_max]
        sp2 = cut2.rfind(" ")
        if sp2 > per_line_max * 0.6:
            cut2 = cut2[:sp2]
        line2 = cut2.rstrip(" ,.;:—-") + "…"
    return line1, line2


# ── Dest catalog (populated once per autoposter run) ───────────────────────
_CATALOG: dict = {}


def register_dest_catalog(content: dict) -> None:
    """Seed the dest lookup. Called once per autoposter run from _run_inner
    so we don't refetch the 12-month catalog on every upload.

    Reads `destinations_full` (the unioned 505-dest catalog) FIRST, then
    overlays `destinations` (current-month scored slice). The full catalog
    is required because CSV-asset formats (e.g. v2_arrival_intel_video) pull
    Ken Burns clips for dests that aren't in this month's top scorers — e.g.
    Mumbai + Chennai on 2026-05-26 fell through unbranded because the narrow
    scored slice didn't have them. See the post-mortem in MEMORY.md.
    """
    global _CATALOG
    _CATALOG = {}
    try:
        merged: dict = {}
        for key in ("destinations_full", "destinations"):
            section = (content or {}).get(key, {}) or {}
            data = section.get("data") or []
            for d in data:
                did = (d or {}).get("id")
                if did and did not in merged:
                    merged[did] = d
        _CATALOG = merged
        log.info(f"brand_stamp: registered {len(_CATALOG)} destinations for overlay lookup")
    except Exception as e:
        log.warning(f"brand_stamp.register_dest_catalog failed ({type(e).__name__}: {e}) — overlays will pass-through")


def _slug_from_filename(filename: str) -> Optional[str]:
    """Try to extract a dest slug from a filename.

    Recognised patterns:
      - <slug>.<ext>                          → mathura.jpg
      - <slug>-<variant>.<ext>                → mathura-feed.jpg
      - <format>-<slug>.<ext>                 → v2_pov-chopta.mp4
      - <format>-<slug>-<variant>.<ext>       → destination_reveal-pahalgam-feed.jpg
    """
    if not filename:
        return None
    stem = Path(filename).stem
    if not stem:
        return None
    _VARIANT_SUFFIX_RE = re.compile(r"-(feed|story|square|cover|cta|hero|thumb|poster)$", re.I)
    # Strip a trailing variant suffix if present
    cleaned = _VARIANT_SUFFIX_RE.sub("", stem)
    # Try the whole cleaned stem first
    if cleaned in _CATALOG:
        return cleaned
    # Try peeling format_id prefixes back-to-front (longest hyphen tail first)
    parts = cleaned.split("-")
    for i in range(1, len(parts)):
        candidate = "-".join(parts[i:])
        if candidate in _CATALOG:
            return candidate
    return None


def _resolve_dest(filename: str, dest_hint: Optional[dict] = None) -> Optional[dict]:
    if dest_hint and dest_hint.get("name"):
        return dest_hint
    slug = _slug_from_filename(filename)
    if slug:
        return _CATALOG.get(slug)
    return None


# ── Image overlay ──────────────────────────────────────────────────────────
def apply_image_overlay(data: bytes, dest: dict) -> bytes:
    """Composite cinematic header onto a JPEG/PNG. Returns modified bytes,
    or the original data on any failure (graceful degrade)."""
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        log.warning("brand_stamp: Pillow unavailable — image overlay skipped")
        return data

    try:
        src = Image.open(io.BytesIO(data)).convert("RGB")
        W, H = src.size
        img = src.copy()
        # min_dim drives font sizing + dot radius so wide (16:9) and tall (9:16)
        # images get proportional text instead of huge fonts on 16:9 web heros.
        min_dim = min(W, H)

        # Bottom gradient for legibility (paint as RGBA overlay → composite back).
        # 35% of the image height — generous enough to host 3 lines (name +
        # state + tagline-wrapped-to-2-lines).
        grad_h = int(H * 0.38)
        gradient = Image.new("RGBA", (W, grad_h), (0, 0, 0, 0))
        for y in range(grad_h):
            alpha = int(200 * ((y / grad_h) ** 1.3))
            for x in range(W):
                gradient.putpixel((x, y), INK_DEEP_RGB + (alpha,))
        img_rgba = img.convert("RGBA")
        img_rgba.paste(gradient, (0, H - grad_h), gradient)
        img = img_rgba.convert("RGB")
        draw = ImageDraw.Draw(img, "RGBA")

        name = (dest.get("name") or "").strip()
        state = (dest.get("state") or "").strip()
        tagline = _truncate_words((dest.get("tagline") or "").strip(), max_chars=110)

        # Fonts (fall back to default if missing). Sized off min_dim so both
        # square (1:1) and landscape (16:9) feeds get readable text.
        try:
            name_size = max(36, int(min_dim * 0.085))
            state_size = max(14, int(min_dim * 0.025))
            tag_size = max(14, int(min_dim * 0.028))
            brand_size = max(12, int(min_dim * 0.022))
            name_font = ImageFont.truetype(str(_FONT_SERIF), name_size) if _FONT_SERIF else ImageFont.load_default()
            state_font = ImageFont.truetype(str(_FONT_SANS), state_size) if _FONT_SANS else ImageFont.load_default()
            tag_font = ImageFont.truetype(str(_FONT_SERIF), tag_size) if _FONT_SERIF else ImageFont.load_default()
            brand_font = ImageFont.truetype(str(_FONT_SANS), brand_size) if _FONT_SANS else ImageFont.load_default()
        except Exception:
            name_font = state_font = tag_font = brand_font = ImageFont.load_default()

        # Pre-compute vertical layout BOTTOM-UP so we can fit everything in
        # the gradient zone regardless of source aspect ratio.
        margin_x = int(W * 0.045)
        bottom_margin = int(H * 0.045)
        line_step_tag = int(tag_size * 1.35)
        line_step_state = int(state_size * 1.7)
        line_step_name = int(name_size * 1.05)

        # Wrap tagline to ≤ 2 lines for height budget
        tag_lines: list = []
        if tagline:
            max_text_w = int(W * 0.88)
            cur = ""
            for w in tagline.split():
                trial = (cur + " " + w).strip()
                bbox_w = draw.textbbox((0, 0), trial, font=tag_font)
                if (bbox_w[2] - bbox_w[0]) <= max_text_w:
                    cur = trial
                else:
                    if cur:
                        tag_lines.append(cur)
                    cur = w
                if len(tag_lines) >= 2:
                    break
            if cur and len(tag_lines) < 2:
                tag_lines.append(cur)
            # Add ellipsis if more text remained beyond 2 lines
            consumed_chars = len(" ".join(tag_lines))
            if consumed_chars < len(tagline) and tag_lines:
                tag_lines[-1] = tag_lines[-1].rstrip(" ,.;:—-") + "…"

        # Compute total block height from bottom upward
        total_h = 0
        if tag_lines:
            total_h += line_step_tag * len(tag_lines)
        if state:
            total_h += line_step_state
        total_h += line_step_name

        block_top = H - bottom_margin - total_h

        # Dest name
        name_y = block_top
        draw.text((margin_x + 3, name_y + 3), name, font=name_font, fill=(0, 0, 0, 200))
        draw.text((margin_x, name_y), name, font=name_font, fill=BONE_RGB)
        # Vermillion dot — anchor at name baseline
        try:
            nbbox = draw.textbbox((margin_x, name_y), name, font=name_font)
            name_w_px = nbbox[2] - nbbox[0]
            dot_r = max(6, int(name_size * 0.11))
            dot_x = margin_x + name_w_px + int(min_dim * 0.012)
            dot_y = nbbox[3] - dot_r * 2 - int(name_size * 0.05)
            draw.ellipse([dot_x, dot_y, dot_x + dot_r * 2, dot_y + dot_r * 2],
                         fill=VERMILLION_RGB)
        except Exception:
            pass

        cursor_y = name_y + line_step_name

        # State label
        if state:
            draw.text((margin_x, cursor_y), state.upper(),
                      font=state_font, fill=SAFFRON_RGB)
            cursor_y += line_step_state

        # Tagline lines
        for line in tag_lines:
            draw.text((margin_x, cursor_y), line, font=tag_font, fill=BONE_RGB)
            cursor_y += line_step_tag

        # Top-right: nakshiq.com brand mark with subtle dark backing
        brand = "nakshiq.com"
        try:
            bbbox = draw.textbbox((0, 0), brand, font=brand_font)
            bw = bbbox[2] - bbbox[0]
            bh = bbbox[3] - bbbox[1]
            bx = W - bw - int(W * 0.04)
            by = int(H * 0.035)
            draw.rectangle([bx - 10, by - 6, bx + bw + 10, by + bh + 6],
                           fill=(22, 22, 20, 170))
            draw.text((bx, by), brand, font=brand_font, fill=BONE_RGB)
        except Exception:
            pass

        out = io.BytesIO()
        img.save(out, "JPEG", quality=90, optimize=True)
        return out.getvalue()
    except Exception as e:
        log.warning(f"brand_stamp.apply_image_overlay failed ({type(e).__name__}: {e}) — using raw bytes")
        return data


# ── Video overlay ──────────────────────────────────────────────────────────
def _ffmpeg_escape(text: str) -> str:
    """Escape special chars for ffmpeg drawtext filter."""
    if not text:
        return ""
    # Order matters — escape backslashes first.
    text = text.replace("\\", "\\\\")
    text = text.replace(":", "\\:")
    text = text.replace(",", "\\,")
    text = text.replace("'", "’")  # use typographic apostrophe (drawtext-safe)
    text = text.replace("[", "\\[").replace("]", "\\]")
    return text


def apply_video_overlay(data: bytes, dest: dict, timeout: int = 120) -> bytes:
    """Run ffmpeg drawtext on video bytes. Returns modified bytes or original."""
    try:
        which = subprocess.run(["which", "ffmpeg"], capture_output=True, text=True)
        if which.returncode != 0:
            log.warning("brand_stamp: ffmpeg not found in PATH — video overlay skipped")
            return data
    except Exception as e:
        log.warning(f"brand_stamp: ffmpeg lookup failed ({e}) — video overlay skipped")
        return data

    name = (dest.get("name") or "").strip()
    state = (dest.get("state") or "").strip()
    # ffmpeg's drawtext doesn't auto-wrap, so we split the tagline at a word
    # boundary into 2 short lines (≤ 50 chars each) for the intro card.
    full_tagline = (dest.get("tagline") or "").strip()
    tagline_l1, tagline_l2 = _split_two_lines(full_tagline, per_line_max=50)
    if not name:
        return data

    font_serif = str(_FONT_SERIF) if _FONT_SERIF else None
    font_sans = str(_FONT_SANS) if _FONT_SANS else None

    def _font_arg(font_path: Optional[str]) -> str:
        return f":fontfile='{font_path}'" if font_path else ""

    try:
        with tempfile.TemporaryDirectory(prefix="brand_stamp_") as td:
            tdp = Path(td)
            inp = tdp / "in.mp4"
            outp = tdp / "out.mp4"
            inp.write_bytes(data)

            # Build filter chain — match reel_gen.destination_reveal aesthetic
            filters = []

            # Top brand bar (persistent — viewers see it even when scrubbing)
            filters.append(f"drawbox=x=0:y=0:w=iw:h=80:color={INK_DEEP_HEX}@0.75:t=fill")
            filters.append(
                f"drawtext=text='nakshiq.com'{_font_arg(font_sans)}:"
                f"fontsize=26:fontcolor={BONE_HEX}:x=32:y=27"
            )

            # Intro phase (0–3.5s): big dest name centred, with state + tagline below
            name_text = _ffmpeg_escape(name + ".")
            filters.append(
                f"drawtext=text='{name_text}'{_font_arg(font_serif)}:"
                f"fontsize=84:fontcolor={BONE_HEX}:"
                f"x=(w-text_w)/2:y=h*0.38:"
                f"enable='lte(t,3.5)':"
                f"box=1:boxcolor={INK_DEEP_HEX}@0.45:boxborderw=18"
            )
            if state:
                state_text = _ffmpeg_escape(state.upper())
                filters.append(
                    f"drawtext=text='{state_text}'{_font_arg(font_sans)}:"
                    f"fontsize=30:fontcolor={SAFFRON_HEX}:"
                    f"x=(w-text_w)/2:y=h*0.50:"
                    f"enable='lte(t,3.5)'"
                )
            if tagline_l1:
                tag_text_1 = _ffmpeg_escape(tagline_l1)
                filters.append(
                    f"drawtext=text='{tag_text_1}'{_font_arg(font_serif)}:"
                    f"fontsize=26:fontcolor={BONE_HEX}:"
                    f"x=(w-text_w)/2:y=h*0.56:"
                    f"enable='lte(t,3.5)'"
                )
            if tagline_l2:
                tag_text_2 = _ffmpeg_escape(tagline_l2)
                filters.append(
                    f"drawtext=text='{tag_text_2}'{_font_arg(font_serif)}:"
                    f"fontsize=26:fontcolor={BONE_HEX}:"
                    f"x=(w-text_w)/2:y=h*0.60:"
                    f"enable='lte(t,3.5)'"
                )

            # Persistent dest name in bottom-left after the intro phase
            persist_text = _ffmpeg_escape(name.upper())
            filters.append(
                f"drawtext=text='{persist_text}'{_font_arg(font_sans)}:"
                f"fontsize=24:fontcolor={BONE_HEX}:"
                f"x=32:y=h-56:"
                f"enable='gte(t,3.5)':"
                f"box=1:boxcolor={INK_DEEP_HEX}@0.65:boxborderw=10"
            )

            filter_chain = ",".join(filters)

            cmd = [
                "ffmpeg", "-y",
                "-loglevel", "error",
                "-i", str(inp),
                "-vf", filter_chain,
                "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
                "-c:a", "copy",
                "-movflags", "+faststart",
                str(outp),
            ]
            r = subprocess.run(cmd, capture_output=True, timeout=timeout)
            if r.returncode != 0 or not outp.exists() or outp.stat().st_size == 0:
                err_tail = r.stderr[-400:].decode("utf-8", errors="replace") if r.stderr else "(no stderr)"
                log.warning(
                    f"brand_stamp.apply_video_overlay ffmpeg failed "
                    f"(rc={r.returncode}, out_size={outp.stat().st_size if outp.exists() else 0}): {err_tail}"
                )
                return data
            return outp.read_bytes()
    except subprocess.TimeoutExpired:
        log.warning(f"brand_stamp.apply_video_overlay timed out after {timeout}s — using raw bytes")
        return data
    except Exception as e:
        log.warning(f"brand_stamp.apply_video_overlay exception ({type(e).__name__}: {e}) — using raw bytes")
        return data


# ── Public entry point ─────────────────────────────────────────────────────
def apply_overlay(
    data: bytes,
    filename: str,
    content_type: str,
    dest: Optional[dict] = None,
) -> bytes:
    """Universal entry point. Called from upload_media_bytes BEFORE R2 PUT.

    `dest` is optional — if not supplied, we try to extract the slug from the
    filename and look it up in the catalog. Returns the original bytes
    unchanged when:
      - bytes empty / catalog empty
      - dest can't be resolved
      - overlay rendering itself failed (logged as warning)
    """
    if not data:
        return data
    if not (content_type or "").startswith(("image/", "video/")):
        return data
    resolved = _resolve_dest(filename, dest)
    if not resolved:
        # 2026-05-27 Bombay regression: silent pass-through here hid the
        # catalog-too-narrow bug for a full day. Log every miss so future
        # catalog drift surfaces immediately in run output.
        slug = _slug_from_filename(filename)
        log.warning(
            f"brand_stamp: no dest match for {filename} "
            f"(slug={slug or '?'}, catalog={len(_CATALOG)}) — overlay skipped"
        )
        return data
    if (content_type or "").startswith("video/"):
        return apply_video_overlay(data, resolved)
    return apply_image_overlay(data, resolved)
