#!/usr/bin/env python3
"""Adaptive transcript grinder. Survives IP rate-limits by BACKING OFF and RETRYING
the same video, rather than burning through the list while blocked.

A miss is only recorded as a real "no captions" when info.json shows no en track.
Usage: python3 scripts/_tmp-transcript-grind.py <cat1.json> [cat2.json ...]
"""
import json, os, re, subprocess, sys, time, glob, random, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
YT = os.path.join(ROOT, ".scrapes", "youtube")
YTDLP = "/Library/Frameworks/Python.framework/Versions/3.14/bin/yt-dlp"
TS = re.compile(r"^(\d{2}:\d{2}:\d{2})\.\d{3} --> ")

def log(m): print(f"[{datetime.datetime.now():%H:%M:%S}] {m}", flush=True)

def vtt_to_cues(path):
    cues, cs, cl = [], None, []
    for line in open(path, encoding="utf-8", errors="ignore").read().splitlines():
        m = TS.match(line)
        if m:
            if cs and cl: cues.append((cs, cl))
            cs, cl = m.group(1), []
            continue
        if line.startswith(("WEBVTT","Kind:","Language:","NOTE")) or not line.strip(): continue
        c = re.sub(r"<[^>]+>", "", line).strip()
        if c: cl.append(c)
    if cs and cl: cues.append((cs, cl))
    seen, out = set(), []
    for ts, lines in cues:
        t = lines[-1].strip()
        if t and t not in seen: seen.add(t); out.append((ts, t))
    return out

def write_derived(d, cues):
    if not cues: return False
    open(os.path.join(d,"transcript-timestamped.txt"),"w",encoding="utf-8").write(
        "\n".join(f"[{ts}] {t}" for ts,t in cues))
    open(os.path.join(d,"transcript-prose.txt"),"w",encoding="utf-8").write(
        " ".join(t for _,t in cues))
    ij = glob.glob(os.path.join(d,"*.info.json"))
    if ij:
        try:
            chapters = (json.load(open(ij[0],encoding="utf-8")).get("chapters") or [])
            if chapters:
                cd = os.path.join(d,"by-chapter"); os.makedirs(cd, exist_ok=True)
                def secs(ts):
                    h,m,s = ts.split(":"); return int(h)*3600+int(m)*60+int(s)
                for i,ch in enumerate(chapters,1):
                    st,en = ch.get("start_time",0), ch.get("end_time",10**9)
                    txt = " ".join(t for ts,t in cues if st <= secs(ts) < en)
                    if txt:
                        sl = re.sub(r"[^a-z0-9]+","-",(ch.get("title") or f"ch{i}").lower()).strip("-")[:50]
                        open(os.path.join(cd,f"{i:02d}-{sl}.txt"),"w",encoding="utf-8").write(txt)
        except Exception: pass
    return True

def has_t(d):
    p = os.path.join(d,"transcript-prose.txt")
    return os.path.exists(p) and os.path.getsize(p) > 200

def has_en_track(d):
    """True if metadata says an English caption track EXISTS (so a miss = block, not absence)."""
    ij = glob.glob(os.path.join(d,"*.info.json"))
    if not ij: return None
    try:
        j = json.load(open(ij[0],encoding="utf-8"))
        ac = j.get("automatic_captions") or {}; su = j.get("subtitles") or {}
        return any(k.startswith("en") for k in list(ac)+list(su))
    except Exception: return None

try:
    from youtube_transcript_api import YouTubeTranscriptApi
    api = YouTubeTranscriptApi()
except Exception as ex:
    api = None; log(f"transcript api unavailable: {ex}")

todo = []
for cat in [a for a in sys.argv[1:] if a.endswith(".json")]:
    for e in json.load(open(cat))["entries"]:
        d = os.path.join(YT, f"yt-{e['id']}")
        if not has_t(d): todo.append((e["id"], d))
log(f"transcripts to fetch: {len(todo)}")

# Capped deliberately. The old ladder ran to 7200s and `bo` only ever grew, so
# a run that met a hard IP block escalated to one attempt every two hours and
# never came back: on 2026-09-07 it managed 7 attempts in 3 hours, all failed,
# while its own "already running" guard stopped cron replacing it. A retry
# schedule that outlives the thing it is retrying is a livelock, not patience.
BACKOFFS = [120, 300, 600, 900, 900]
# Nothing is being achieved past this many consecutive failures; exit and let
# the scheduled wrapper start a fresh run later.
GIVE_UP_AFTER_CONSECUTIVE = 12
bo = 0
done = skipped = 0
i = 0
attempts = {}          # per-video block count
MAX_ATTEMPTS = 3       # then rotate to the back so one bad video can't stall the run
deferred = 0
consecutive_fail = 0
while i < len(todo):
    vid, d = todo[i]
    got = None; src = None
    if api:
        try:
            f = api.fetch(vid, languages=["en","en-US","en-GB","hi"])
            cues = []
            for s in f:
                t = int(s.start)
                cues.append((f"{t//3600:02d}:{t%3600//60:02d}:{t%60:02d}", s.text.strip()))
            got, src = cues, "youtube-transcript-api"
        except Exception:
            pass
    if not got:
        subprocess.run([YTDLP,"--skip-download","--write-auto-sub","--write-sub",
                        "--sub-langs","en.*,en","--sub-format","vtt/srt/best",
                        "--no-write-info-json","-o","%(id)s.%(ext)s","-P",d,
                        f"https://www.youtube.com/watch?v={vid}"],
                       capture_output=True, text=True, timeout=240)
        v = sorted(glob.glob(os.path.join(d,"*.vtt")), key=os.path.getsize, reverse=True)
        if v: got, src = vtt_to_cues(v[0]), "yt-dlp"

    if got and write_derived(d, got):
        done += 1; bo = 0; i += 1
        log(f"OK {done}/{len(todo)} {vid} via {src} ({len(got)} cues)")
        # refresh metadata.json
        ij = glob.glob(os.path.join(d,"*.info.json"))
        if ij:
            try:
                j = json.load(open(ij[0],encoding="utf-8"))
                json.dump({"id":vid,"url":f"https://www.youtube.com/watch?v={vid}",
                    "title":j.get("title"),"channel":j.get("channel") or j.get("uploader"),
                    "uploader_id":j.get("uploader_id"),"upload_date":j.get("upload_date"),
                    "duration_sec":j.get("duration"),"view_count":j.get("view_count"),
                    "like_count":j.get("like_count"),"transcript_source":src,
                    "scraped_at":datetime.date.today().isoformat()},
                    open(os.path.join(d,"metadata.json"),"w",encoding="utf-8"), indent=2)
            except Exception: pass
        bo = 0; consecutive_fail = 0
        time.sleep(random.uniform(15, 25))
    else:
        en = has_en_track(d)
        if en is False:
            log(f"SKIP {vid} — metadata confirms no English caption track (genuine absence)")
            skipped += 1; i += 1; bo = 0; consecutive_fail = 0
            time.sleep(random.uniform(5, 9))
        else:
            attempts[vid] = attempts.get(vid, 0) + 1
            wait = BACKOFFS[min(bo, len(BACKOFFS)-1)]
            if attempts[vid] >= MAX_ATTEMPTS and i < len(todo) - 1:
                todo.append(todo.pop(i))   # rotate to back, do NOT advance i
                deferred += 1
                log(f"BLOCKED on {vid} x{attempts[vid]} -> deferring to end of queue, moving on (backoff {wait}s)")
            else:
                log(f"BLOCKED on {vid} x{attempts[vid]} (en track exists) -> backoff {wait}s, retry same video")
            bo += 1
            consecutive_fail += 1
            if consecutive_fail >= GIVE_UP_AFTER_CONSECUTIVE:
                log(f"GIVING UP: {consecutive_fail} consecutive failures — the IP is blocked, not the video. "
                    f"Exiting so a later run can start clean. +{done} this run.")
                break
            time.sleep(wait)

log(f"GRIND COMPLETE: +{done} transcripts, {skipped} genuine-no-caption skips, {deferred} deferrals")
