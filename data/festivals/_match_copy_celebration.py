#!/usr/bin/env python3
"""Reusable matcher for the festival CELEBRATION batch.
Usage: python3 _match_copy_celebration.py <acctN> <start_idx> <end_idx> [zip_path]

Reads _tmp_celebration_batch.json (the 30-item batch for this run), takes
batch[start:end] as the slugs SUBMITTED on this account, extracts the Flow
project zip, matches each extracted .mp4 to a slug, copies to videos/{slug}.mp4,
and moves the download + extract dir into _inbox/<acctN>_<date>/.

Matching: the DEST is the key discriminator (many clips share the same festival,
e.g. Ganesh Chaturthi at Lenyadri / Morgaon / Mahad). Flow truncates long
filenames with an ellipsis, so dest matching is prefix-aware. Dest match is
weighted heavily (10); festival words are a minor tiebreak (1 each). Never
guesses a wrong slug: a slug whose best file scores 0 is reported unmatched."""
import zipfile, os, shutil, json, sys, re, datetime

BASE = os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
VID  = os.path.join(BASE, 'videos')
INBOX= os.path.join(BASE, '_inbox')
BATCH= os.path.join(BASE, '_tmp_celebration_batch.json')

STOP = set('the of as celebrated in at festival a an and to for with on celebration'.split())
def toks(s):
    s = s.lower().replace('_',' ')
    out=[]
    for t in re.split(r'[^a-z0-9]+', s):
        if not t or t in STOP: continue
        if t.isdigit(): continue          # drop the timestamp number
        if len(t) <= 2: continue
        out.append(t)
    return out

def dest_match(dtok, ftoks):
    """True if dest token dtok matches any filename token (exact or >=4-char prefix either way)."""
    for ft in ftoks:
        if dtok == ft: return True
        if len(dtok) >= 4 and len(ft) >= 4 and (ft.startswith(dtok[:4]) or dtok.startswith(ft[:4])):
            return True
    return False

def score(cand, ftoks):
    s = 0
    for dt in cand['dest_tokens']:
        if dest_match(dt, ftoks): s += 10
    for ftk in cand['fest_tokens']:
        if ftk in ftoks: s += 1
    return s

def main():
    acct = sys.argv[1]
    start, end = int(sys.argv[2]), int(sys.argv[3])
    zp = os.path.expanduser(sys.argv[4]) if len(sys.argv)>4 else os.path.expanduser('~/Downloads/download.zip')
    batch = json.load(open(BATCH))
    want = batch[start:end]
    cands = []
    for w in want:
        dts = set(toks(w['dest']))
        fts = set(toks(w['festival'])) - dts
        cands.append({'slug':w['slug'],'dest':w['dest'],'festival':w['festival'],
                      'dest_tokens':dts,'fest_tokens':fts})

    if not os.path.isfile(zp):
        print('NO ZIP at', zp); return
    ex = os.path.expanduser(f'~/Downloads/_flow_extract_{acct}')
    if os.path.isdir(ex): shutil.rmtree(ex)
    os.makedirs(ex)
    with zipfile.ZipFile(zp) as z: z.extractall(ex)
    mp4s = []
    for root,_,files in os.walk(ex):
        for f in files:
            if f.lower().endswith('.mp4') and not f.startswith('.'):
                mp4s.append(os.path.join(root,f))

    # score every (file, candidate) pair; assign greedily by highest score
    pairs = []
    for m in mp4s:
        ft = set(toks(os.path.basename(m)))
        for ci,c in enumerate(cands):
            pairs.append((score(c, ft), m, c['slug']))
    pairs.sort(reverse=True, key=lambda x:x[0])
    assigned = {}; used_files = set()
    for sc, m, slug in pairs:
        if sc <= 0: continue
        if slug in assigned or m in used_files: continue
        assigned[slug] = (m, sc); used_files.add(m)

    copied = []
    for slug,(m,sc) in assigned.items():
        dst = os.path.join(VID, slug+'.mp4')
        shutil.copy2(m, dst)
        copied.append((slug, os.path.basename(m), os.path.getsize(dst)//1024, sc))

    unmatched_files = [os.path.basename(m) for m in mp4s if m not in used_files]
    missing_slugs   = [c['slug'] for c in cands if c['slug'] not in assigned]

    print(f"=== {acct}: extracted {len(mp4s)} mp4(s), copied {len(copied)} ===")
    for slug, fn, kb, sc in copied:
        print(f"  COPIED {slug}.mp4   <- {fn}  ({kb} KB, score {sc})")
    if unmatched_files:
        print("  UNMATCHED FILES (not copied):", unmatched_files)
    if missing_slugs:
        print("  SLUGS WITH NO VIDEO (failed/queued):", missing_slugs)

    day = datetime.date.today().isoformat()
    dest_inbox = os.path.join(INBOX, f'{acct}_{day}')
    os.makedirs(dest_inbox, exist_ok=True)
    if os.path.isfile(zp):
        shutil.move(zp, os.path.join(dest_inbox, 'download.zip'))
    if os.path.isdir(ex):
        shutil.move(ex, os.path.join(dest_inbox, 'extract'))
    print("  moved download.zip + extract -> _inbox/%s_%s/" % (acct, day))

if __name__=='__main__':
    main()
