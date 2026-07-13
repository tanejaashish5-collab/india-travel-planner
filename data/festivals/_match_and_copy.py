import json, os, glob, sys, re, shutil

acct = int(sys.argv[1])          # 1..6
exdir = sys.argv[2]              # extract dir
base = os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
viddir = os.path.join(base, 'videos')
b30 = json.load(open('/tmp/celebration_batch.json'))
lo = (acct-1)*5
slice5 = b30[lo:lo+5]

STOP = {'festival','festivals','celebration','celebrated','celebrate','celebra',
        'in','of','the','at','as','and','a','an','mela','fair','utsav','mahotsav',
        'jayanti','day','video','mp4','flow'}

def toks(s):
    return [t for t in re.split(r'[^a-z0-9]+', s.lower()) if t and t not in STOP and len(t) > 2]

mp4s = [f for f in glob.glob(exdir+'/**/*', recursive=True) if f.lower().endswith('.mp4')]

# score matrix slug x file
scores = {}
for i, b in enumerate(slice5):
    key = b['festival'] + ' ' + b['dest']
    st = set(toks(key))
    for f in mp4s:
        ft = set(toks(os.path.basename(f)))
        scores[(i, f)] = len(st & ft)

# greedy 1:1 assignment, highest score first
pairs = sorted(scores.items(), key=lambda kv: -kv[1])
assigned_slug, assigned_file, result = set(), set(), {}
for (i, f), sc in pairs:
    if sc <= 0: continue
    if i in assigned_slug or f in assigned_file: continue
    assigned_slug.add(i); assigned_file.add(f); result[i] = (f, sc)

os.makedirs(viddir, exist_ok=True)
copied, unmatched_slugs, unmatched_files = [], [], []
for i, b in enumerate(slice5):
    if i in result:
        f, sc = result[i]
        dest = os.path.join(viddir, b['slug'] + '.mp4')
        shutil.copy2(f, dest)
        copied.append((b['slug'], os.path.basename(f), sc))
    else:
        unmatched_slugs.append(b['slug'])
for f in mp4s:
    if f not in assigned_file:
        unmatched_files.append(os.path.basename(f))

print('=== ACCT', acct, '===')
for slug, fn, sc in copied:
    print('COPIED', slug + '.mp4  <-  ' + fn + '  (score ' + str(sc) + ')')
print('UNMATCHED_SLUGS:', unmatched_slugs)
print('UNMATCHED_FILES:', unmatched_files)
print('TOTAL_COPIED', len(copied))
