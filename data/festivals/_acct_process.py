import sys, os, json, glob, time, zipfile, shutil, re, datetime

ACCT = int(sys.argv[1])  # 1-6
base = os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
viddir = os.path.join(base, 'videos'); os.makedirs(viddir, exist_ok=True)
batch = json.load(open(os.path.join(base, '_celebration_batch.json')))
sl = batch[(ACCT-1)*5: ACCT*5]
if not sl:
    print('NO_SLICE'); sys.exit(0)
print('SLICE acct', ACCT, [x['slug'] for x in sl])

dl = os.path.expanduser('~/Downloads')
zpath = os.path.join(dl, 'download.zip')

last=-1; ready=False
for i in range(38):
    parts=glob.glob(os.path.join(dl,'*.crdownload'))
    if os.path.exists(zpath) and not parts:
        sz=os.path.getsize(zpath)
        if sz==last and sz>0:
            ready=True; break
        last=sz
    time.sleep(1)
print('ZIP_READY', ready, 'size', os.path.getsize(zpath) if os.path.exists(zpath) else None)
if not os.path.exists(zpath):
    print('NO_ZIP'); sys.exit(1)

today=datetime.date.today().isoformat()
inbox=os.path.join(base,'_inbox',f'acct{ACCT}_{today}')
exdir=os.path.join(inbox,'extracted')
os.makedirs(exdir, exist_ok=True)
with zipfile.ZipFile(zpath) as z:
    z.extractall(exdir)
mp4s=[os.path.join(r,f) for r,_,fs in os.walk(exdir) for f in fs if f.lower().endswith('.mp4')]
print('EXTRACTED_MP4S', len(mp4s))
for m in sorted(mp4s): print('  FILE', os.path.basename(m))

STOP=set('festival fair the of and a an in at on as new year spring summer winter autumn celebrated celebration video cinematic documentary style seconds mela utsav jayanti'.split())
def toks(s):
    return set(t for t in re.split(r'[^a-z0-9]+', s.lower()) if len(t)>=3 and t not in STOP)

items=[]
for it in sl:
    ft=toks(it['festival']); dt=toks(it['dest'])
    items.append({'slug':it['slug'],'festival':it['festival'],'dest':it['dest'],'kw':ft|dt,'dtoks':dt,'ftoks':ft})
ftok={m: toks(os.path.basename(m)) for m in mp4s}

def score(fts, it):
    s=len(fts & it['kw'])
    # dest-prefix bonus: handles Flow truncating long dest names (e.g. Pazhamudircholai -> Pazhamudi...)
    for d in it['dtoks']:
        if len(d)>=5:
            for ftk in fts:
                if len(ftk)>=4 and (ftk.startswith(d[:5]) or d.startswith(ftk[:5])):
                    s+=2; break
    return s

pairs=[]
for it in items:
    for m in mp4s:
        pairs.append((score(ftok[m], it), it['slug'], m))
pairs.sort(reverse=True, key=lambda x:(x[0], x[1]))
aslug={}; afile={}
for sc,slug,m in pairs:
    if sc<=0 or slug in aslug or m in afile: continue
    aslug[slug]=m; afile[m]=slug
    print(f'MATCH score={sc} {slug} <- {os.path.basename(m)}')

left_slugs=[it['slug'] for it in items if it['slug'] not in aslug]
left_files=[m for m in mp4s if m not in afile]
if len(left_slugs)==1 and len(left_files)==1:
    aslug[left_slugs[0]]=left_files[0]; afile[left_files[0]]=left_slugs[0]
    print(f'ELIM {left_slugs[0]} <- {os.path.basename(left_files[0])}')

copied=0
for it in items:
    slug=it['slug']
    if slug in aslug:
        shutil.copy2(aslug[slug], os.path.join(viddir, slug+'.mp4')); copied+=1
        print('COPIED', slug, os.path.getsize(os.path.join(viddir, slug+'.mp4')))
    else:
        print('UNMATCHED_SLUG', slug, '| kw=', it['kw'])
for m in [x for x in mp4s if x not in afile]:
    print('UNMATCHED_FILE', os.path.basename(m), '| tok=', ftok[m])

try:
    shutil.move(zpath, os.path.join(inbox,'download.zip')); print('MOVED_ZIP -> ', inbox)
except Exception as e:
    print('MOVE_ZIP_ERR', e)
print('DONE_ACCT', ACCT, 'copied', copied, '/', len(sl))
