import zipfile, os, sys, re, shutil, tempfile, datetime, json
base=os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
viddir=os.path.join(base,'videos')
acct=int(sys.argv[1]); lo=int(sys.argv[2]); hi=int(sys.argv[3])
DRY = (len(sys.argv)>4 and sys.argv[4]=='dry')
batch=json.load(open(os.path.join(base,'_run_batch.json')))
sl=batch[lo:hi]
zp=os.path.expanduser('~/Downloads/download.zip')
if not os.path.exists(zp):
    print('NO_ZIP at', zp); sys.exit(1)
ex=os.path.join(tempfile.gettempdir(),f'flow_acct{acct}_extract')
shutil.rmtree(ex, ignore_errors=True); os.makedirs(ex)
with zipfile.ZipFile(zp) as z: z.extractall(ex)
mp4s=[]
for root,_,files in os.walk(ex):
    for f in files:
        if f.lower().endswith('.mp4'): mp4s.append(os.path.join(root,f))
mp4s.sort(key=lambda p: os.path.basename(p).lower())  # alpha == submission order within a dup family
STOP={'festival','celebration','celebrated','video','footage','authentic','cinematic','documentary',
      'style','seconds','people','crowds','rituals','their','with','real','look','new','year','temple'}
def toks(s):
    t=set()
    for w in re.split(r'[^a-z0-9]+', s.lower()):
        if len(w)>=4 and w not in STOP:
            t.add(w); t.add(w[:4])
    return t
def norm(fn): return re.sub(r'[^a-z0-9]+',' ', fn.lower())
def score(e, fn):  # dest weighted x10, festival x1
    nf=norm(fn); sc=0
    for w in toks(e['dest']):
        if w in nf: sc+=10
    for w in toks(e['festival']):
        if w in nf: sc+=1
    return sc
pairs=[]
for p in mp4s:
    fn=os.path.basename(p)
    for e in sl:
        pairs.append((score(e,fn), p, e['slug']))
pairs.sort(key=lambda x:(-x[0], os.path.basename(x[1]).lower(), x[2]))
assigned={}; used_f=set(); used_s=set()
for sc,p,slug in pairs:
    if sc<=0 or p in used_f or slug in used_s: continue
    assigned[slug]=p; used_f.add(p); used_s.add(slug)
# submission-order fallback for any leftover slugs/files
left_slugs=[e['slug'] for e in sl if e['slug'] not in assigned]
left_files=[p for p in mp4s if p not in used_f]
fb=[]
for slug,p in zip(left_slugs, left_files):
    assigned[slug]=p; used_f.add(p); fb.append((slug,os.path.basename(p)))
print('--- EXTRACTED FILES (acct%d) ---'%acct)
for p in mp4s: print('   ', os.path.basename(p))
for slug,fn in fb: print('FALLBACK(submission-order)', slug, '<=', fn)
print('--- ASSIGNMENT slots %d-%d%s ---'%(lo,hi-1,' [DRY]' if DRY else ''))
copied=[]; unmatched=[]
for e in sl:
    slug=e['slug']
    if slug in assigned:
        src=assigned[slug]; dst=os.path.join(viddir, slug+'.mp4')
        if not DRY: shutil.copyfile(src,dst)
        copied.append(slug); print('OK  %-42s <= %s'%(slug, os.path.basename(src)))
    else:
        unmatched.append(slug); print('MISS', slug)
unmatched_files=[os.path.basename(p) for p in mp4s if p not in used_f]
if unmatched_files: print('UNMATCHED_FILES', unmatched_files)
if not DRY:
    today=datetime.date.today().isoformat()
    inbox=os.path.join(base,'_inbox',f'acct{acct}_{today}')
    os.makedirs(inbox, exist_ok=True)
    shutil.move(zp, os.path.join(inbox,'download.zip'))
    print('moved download.zip ->', inbox)
print('COPIED %d/%d'%(len(copied),len(sl)), '| UNMATCHED_SLUGS', unmatched)
