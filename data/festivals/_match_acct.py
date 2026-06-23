import json, os, sys, zipfile, shutil, datetime, re
base=os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
viddir=os.path.join(base,'videos')
acct=int(sys.argv[1])          # 1..6
do_copy = len(sys.argv)>2 and sys.argv[2]=='copy'
lo=(acct-1)*5; hi=lo+5
b=json.load(open('/tmp/celebration_batch.json'))[lo:hi]
zp=os.path.expanduser('~/Downloads/download.zip')
today=datetime.date.today().isoformat()
inbox=os.path.join(base,'_inbox',f'acct{acct}_{today}')
stage=os.path.join(inbox,'_extracted')
os.makedirs(stage,exist_ok=True)
# extract via zipfile (handles unicode)
with zipfile.ZipFile(zp) as z:
    z.extractall(stage)
mp4s=[]
for root,_,files in os.walk(stage):
    for f in files:
        if f.lower().endswith('.mp4') and not f.startswith('.'):
            mp4s.append(os.path.join(root,f))
mp4s.sort(key=lambda p: os.path.basename(p).lower())
print(f"ACCT{acct} slugs (submission order):")
for i,x in enumerate(b): print(f"  [{i}] {x['slug']} | dest={x['dest']} | fest={x['festival']}")
print(f"\nExtracted {len(mp4s)} mp4 files:")
for p in mp4s: print("  -", os.path.basename(p))

def toks(s):
    return set(re.findall(r"[a-z]+", s.lower()))
STOP={'the','of','as','celebrated','in','and','a','festival','mela','utsav','at','day','s'}
def keytoks(x):
    t=toks(x['dest'])|toks(x['festival'])
    return {w for w in t if w not in STOP and len(w)>2}

# score each file against each slug by distinctive token overlap
assign={}  # slug_index -> filepath
used=set()
scored=[]
for fi,p in enumerate(mp4s):
    fn=os.path.basename(p).lower()
    for si,x in enumerate(b):
        kt=keytoks(x)
        hits=[w for w in kt if w in fn]
        if hits: scored.append((len(hits),si,fi,hits))
scored.sort(reverse=True)
for sc,si,fi,hits in scored:
    if si in assign or fi in used: continue
    assign[si]=mp4s[fi]; used.add(fi)
    print(f"\nMATCH slug[{si}] {b[si]['slug']}  <-  {os.path.basename(mp4s[si if False else fi])}  (hits={hits})")

# fallback by submission order for any unmatched, using remaining files in submission(=name) order
unmatched_slugs=[i for i in range(len(b)) if i not in assign]
remaining=[i for i in range(len(mp4s)) if i not in used]
if unmatched_slugs:
    print("\nUnmatched slugs:", [b[i]['slug'] for i in unmatched_slugs])
    print("Remaining files:", [os.path.basename(mp4s[i]) for i in remaining])

print("\n=== PROPOSED FINAL ===")
for si,x in enumerate(b):
    fp=assign.get(si)
    print(f"  {x['slug']}.mp4  <=  {os.path.basename(fp) if fp else '*** NO MATCH ***'}")

if do_copy:
    n=0
    for si,x in enumerate(b):
        fp=assign.get(si)
        if not fp: 
            print("SKIP (no match):", x['slug']); continue
        dest=os.path.join(viddir, x['slug']+'.mp4')
        shutil.copy2(fp, dest); n+=1
    print(f"\nCopied {n} clips to videos/")
