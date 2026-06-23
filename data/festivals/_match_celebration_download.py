import json, os, sys, zipfile, shutil, re

acct = sys.argv[1]
zippath = os.path.expanduser(sys.argv[2])
plan = json.load(open('/tmp/celebration_plan.json'))
items = plan[acct]
base = os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
viddir = os.path.join(base, 'videos'); os.makedirs(viddir, exist_ok=True)

exdir = '/tmp/%s_extract' % acct
shutil.rmtree(exdir, ignore_errors=True); os.makedirs(exdir)
zipfile.ZipFile(zippath).extractall(exdir)
mp4s = [os.path.join(r, f) for r, d, fs in os.walk(exdir) for f in fs if f.lower().endswith('.mp4')]

STOP = set(['festival','the','of','at','as','celebrated','in','and','an','celebration',
 'season','mela','utsav','mahotsav','puja','jatra','dance','fair','show','sound','light',
 'cultural','birthday','carnival','tourism','tea','drums','green','national','park','temple',
 'pilgrimage','circumambulation','groundnut','blossom','cherry','river','grand'])

def toks(it):
    words = re.findall(r'[a-z]+', (it['festival'] + ' ' + it['dest']).lower())
    return [w for w in words if w not in STOP and len(w) >= 4]

def score(fnl, it):
    return sum(1 for w in toks(it) if w[:5] in fnl)

pairs = []
for mi, m in enumerate(mp4s):
    fnl = os.path.basename(m).lower()
    for it in items:
        pairs.append((score(fnl, it), mi, it['slug']))
pairs.sort(reverse=True)

assign = {}; slugdone = set(); mpdone = set()
for sc, mi, slug in pairs:
    if sc <= 0 or slug in slugdone or mi in mpdone: continue
    assign[slug] = mp4s[mi]; slugdone.add(slug); mpdone.add(mi)

left_slugs = [it['slug'] for it in items if it['slug'] not in slugdone]
left_mps = [mp4s[i] for i in range(len(mp4s)) if i not in mpdone]
if len(left_slugs) == 1 and len(left_mps) == 1:
    assign[left_slugs[0]] = left_mps[0]; slugdone.add(left_slugs[0]); left_slugs = []; left_mps = []

copied = []
for slug, src in assign.items():
    dst = os.path.join(viddir, slug + '.mp4')
    shutil.copyfile(src, dst); copied.append((slug, os.path.basename(src)))

print('=== %s ===' % acct)
print('mp4s in zip:', len(mp4s), '| matched+copied:', len(copied))
for slug, src in copied: print('  OK', slug, '<=', src)
if left_slugs: print('  UNMATCHED SLUGS:', left_slugs)
if left_mps: print('  UNMATCHED FILES:', [os.path.basename(x) for x in left_mps])
