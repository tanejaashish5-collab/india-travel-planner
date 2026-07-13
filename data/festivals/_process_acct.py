import json, os, re, shutil, zipfile, datetime
base=os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
viddir=os.path.join(base,'videos')
today=datetime.date.today().isoformat()
acct_n=int(os.environ['ACCT']); sl=int(os.environ['SLICE_START'])
inbox=os.path.join(base,'_inbox',f'acct{acct_n}_{today}')
ext=os.path.join(inbox,'extracted'); os.makedirs(ext,exist_ok=True)
zp=os.path.expanduser('~/Downloads/download.zip')
with zipfile.ZipFile(zp) as z: z.extractall(ext)
mp4s=[os.path.join(r,f) for r,_,fs in os.walk(ext) for f in fs if f.lower().endswith('.mp4') and not f.startswith('.')]
print("EXTRACTED",len(mp4s))
for m in sorted(mp4s): print("  ",os.path.basename(m))
batch=json.load(open(os.path.join(base,'_celebration_batch_today.json')))
acct=batch[sl:sl+5]
STOP=set('cinematic documentary style video seconds authentic real footage look of the festival as celebrated in celebration parade goa mp4 new year annual at temple grand'.split())
def toks(s): return [t for t in re.findall(r'[a-z0-9]+', s.lower()) if not t.isdigit()]
def keyset(item): return set(toks(item['dest'])+toks(item['festival'])) - STOP
def score(fnt, keys):
    s=0
    for k in keys:
        for ft in fnt:
            if k==ft: s+=2
            elif len(k)>=4 and (ft.startswith(k) or k.startswith(ft)): s+=1
    return s
triples=[]
for mi,mp in enumerate(mp4s):
    fnt=toks(os.path.basename(mp))
    for si,item in enumerate(acct):
        triples.append((score(fnt,keyset(item)),mi,si))
triples.sort(reverse=True)
am={}; az={}
for sc,mi,si in triples:
    if sc<=0 or mi in am or si in az: continue
    am[mi]=si; az[si]=mi
for mi,si in sorted(am.items()):
    slug=acct[si]['slug']; dst=os.path.join(viddir,slug+'.mp4')
    shutil.copy2(mp4s[mi],dst)
    print("COPIED",os.path.basename(mp4s[mi]),"->",slug+'.mp4',os.path.getsize(dst))
print("UNMATCHED_FILES",[os.path.basename(mp4s[mi]) for mi in range(len(mp4s)) if mi not in am])
print("UNMATCHED_SLUGS",[acct[si]['slug'] for si in range(len(acct)) if si not in az])
