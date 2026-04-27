#!/usr/bin/env python3
"""
Batch composite — split into phases to fit within timeout.
Phase 1: build all Ken Burns backgrounds
Phase 2: composite each avatar over its background
"""
import sys, time, json
sys.path.insert(0, ".")
from pathlib import Path
from ugc_gen import (AVATARS, select_backgrounds, select_music,
                     composite_ugc_video, _create_ken_burns_bg, _load_state,
                     _prepare_music, _hex, _esc, INK_DEEP, BONE, SAFFRON,
                     FONT_INSTRUMENT, FONT_CRIMSON, REEL_W, REEL_H)
import subprocess, shutil, tempfile

OUTPUT_DIR = Path("ugc_output")

VIDEOS = [
    ("aditya",  "ugc_raw_aditya_jaipur.mp4",            "Jaipur"),
    ("seema",   "ugc_raw_seema_varanasi.mp4",            "Varanasi"),
    ("kavya",   "ugc_raw_kavya_hampta_pass.mp4",         "Hampta Pass"),
    ("bahar",   "ugc_raw_bahar_rishikesh.mp4",           "Rishikesh"),
    ("byron",   "ugc_raw_byron_hampi.mp4",               "Hampi"),
    ("emilia",  "ugc_raw_emilia_dharamsala.mp4",         "Dharamsala"),
    ("gerardo", "ugc_raw_gerardo_valley_of_flowers.mp4", "Valley of Flowers"),
    ("annie",   "ugc_raw_annie_goa.mp4",                "Goa"),
    ("brandon", "ugc_raw_brandon_kerala_backwaters.mp4", "Kerala Backwaters"),
]

cmd = sys.argv[1] if len(sys.argv) > 1 else "bg"
force = "--force" in sys.argv

if cmd == "bg":
    # Phase 1: Build Ken Burns backgrounds (2 images each for speed)
    idx = int(sys.argv[2]) if len(sys.argv) > 2 else 0
    avatar_key, raw_file, dest = VIDEOS[idx]
    dest_slug = dest.lower().replace(" ", "_")
    bg_out = OUTPUT_DIR / f"bg_{avatar_key}.mp4"

    if bg_out.exists() and not force:
        print(f"SKIP {avatar_key} bg — already exists (use --force to rebuild)")
        sys.exit(0)

    bgs = select_backgrounds(dest_slug)
    print(f"Building bg for {avatar_key}/{dest} ({len(bgs)} images, using 2)...")
    t0 = time.time()
    _create_ken_burns_bg(bgs[:2], bg_out, 30)
    print(f"Done: {bg_out.stat().st_size//1024} KB in {time.time()-t0:.0f}s")

elif cmd == "comp":
    # Phase 2: Composite avatar over background
    idx = int(sys.argv[2]) if len(sys.argv) > 2 else 0
    avatar_key, raw_file, dest = VIDEOS[idx]
    dest_slug = dest.lower().replace(" ", "_")

    raw_path = OUTPUT_DIR / raw_file
    bg_path = OUTPUT_DIR / f"bg_{avatar_key}.mp4"
    final_path = OUTPUT_DIR / f"final_{avatar_key}_{dest_slug}.mp4"

    if final_path.exists() and not force:
        print(f"SKIP {avatar_key} — already composited (use --force to rebuild)")
        sys.exit(0)

    if not bg_path.exists():
        print(f"ERROR: bg not built yet for {avatar_key}")
        sys.exit(1)

    state = _load_state()
    music = select_music(avatar_key, state)

    tmpdir = Path(tempfile.mkdtemp(prefix="ugc_comp_"))
    music_seg = tmpdir / "music.wav"
    _prepare_music(music, music_seg, 30)

    # Build branding
    parts = [f"drawbox=x=0:y=h-160:w=iw:h=160:color={_hex(INK_DEEP)}:t=fill"]
    if FONT_INSTRUMENT:
        parts.append(f"drawtext=text='{_esc('NAKSHIQ')}':fontfile='{FONT_INSTRUMENT}':fontsize=30:fontcolor={_hex(BONE)}:x=40:y=h-120:borderw=0")
    if FONT_CRIMSON:
        parts.append(f"drawtext=text='{_esc('Travel with IQ')}':fontfile='{FONT_CRIMSON}':fontsize=24:fontcolor={_hex(SAFFRON)}:x=40:y=h-80:borderw=0")
    if FONT_INSTRUMENT:
        parts.append(f"drawtext=text='{_esc(dest)}':fontfile='{FONT_INSTRUMENT}':fontsize=26:fontcolor={_hex(BONE)}:x=w-tw-40:y=h-105:borderw=0")
    bc = ",".join(parts)

    # Full-screen chromakey: avatar fills the frame, green replaced by destination bg.
    # Crop avatar to upper body (top 50%, offset 12% from top) to hide chair/props.
    filters = [
        f"[0:v]scale={REEL_W}:{REEL_H}:force_original_aspect_ratio=increase,crop={REEL_W}:{REEL_H},setsar=1[bg]",
        f"[1:v]scale={REEL_W}:{REEL_H}:force_original_aspect_ratio=increase,"
        f"crop={REEL_W}:{REEL_H},"
        f"crop=iw:ih*0.50:0:ih*0.12,"
        f"scale={REEL_W}:-1,"
        f"chromakey=0x00FF00:0.20:0.10,"
        f"colorbalance=gs=-0.12:gm=-0.06[avatar_clean]",
        f"[bg][avatar_clean]overlay=(W-w)/2:(H-160-h):shortest=1[composited]",
        f"[composited]{bc}[branded]",
        "[1:a]aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono[speech]",
        "[2:a]aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono,volume=0.15[music_ducked]",
        "[speech][music_ducked]amix=inputs=2:duration=first:dropout_transition=2[mixed_audio]",
    ]

    ffcmd = [
        "ffmpeg", "-y",
        "-i", str(bg_path), "-i", str(raw_path), "-i", str(music_seg),
        "-filter_complex", ";".join(filters),
        "-map", "[branded]", "-map", "[mixed_audio]",
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-c:a", "aac", "-b:a", "128k",
        "-pix_fmt", "yuv420p", "-t", "30",
        "-movflags", "+faststart",
        str(final_path),
    ]

    print(f"Compositing {AVATARS[avatar_key]['name']}/{dest}...")
    t0 = time.time()
    r = subprocess.run(ffcmd, capture_output=True, text=True)
    shutil.rmtree(tmpdir, ignore_errors=True)

    if r.returncode != 0:
        print(f"FAILED: {r.stderr[-300:]}")
    else:
        print(f"✓ {final_path.name} — {final_path.stat().st_size//1024} KB ({time.time()-t0:.0f}s)")

elif cmd == "status":
    for i, (ak, rf, dest) in enumerate(VIDEOS):
        ds = dest.lower().replace(" ", "_")
        bg = OUTPUT_DIR / f"bg_{ak}.mp4"
        final = OUTPUT_DIR / f"final_{ak}_{ds}.mp4"
        bg_ok = "✓" if bg.exists() else "✗"
        final_ok = "✓" if final.exists() else "✗"
        sz = f"{final.stat().st_size//1024}KB" if final.exists() else "—"
        print(f"  [{i}] {ak:10s} {dest:20s} bg:{bg_ok} final:{final_ok} {sz}")
