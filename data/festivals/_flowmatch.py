import json,os,sys,zipfile,shutil,re,datetime
base=os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
viddir=os.path.join(base,'videos'); inbox=os.path.join(base,'_inbox')
batch=json.load(open('/tmp/celebration_batch.json'))
lo,hi,acctN,mode=int(sys.argv[1]),int(sys.argv[2]),sys.argv[3],(sys.argv[4] if len(sys.argv)>4 else 'dry')
items=batch[lo:hi]
dl=os.path.expanduser('~/Downloads/download.zip')
exdir='/tmp/flow_ex_%s'%acctN
shutil.rmtree(exdir,ignore_errors=True); os.makedirs(exdir)
zipfile.ZipFile(dl).extractall(exdir)
mp4s=[os.path.join(r,f) for r,_,fs in os.walk(exdir) for f in fs if f.lower().endswith('.mp4')]
STOP=set('the of as celebrated in festival and to with at over for on style video cinematic documentary seconds authentic real footage look celebration key visuals show people actual rituals decorations crowds genuine festive energy light colour color natural handheld motion shallow depth field no text subtitles captions logos watermarks distorted extra faces limbs realism not cartoonish ai looking tamil nadu uttar pradesh fair mela'.split())
def toks(s): return set(re.findall(r'[a-z]+',s.lower()))
pairs=[]
for it in items:
  key=(toks(it['dest'])|toks(it['festival']))-STOP
  dest=toks(it['dest'])
  for mp in mp4s:
    n=toks(os.path.basename(mp))
    pairs.append((len(key&n)+len(dest&n), it['slug'], mp))
pairs.sort(key=lambda x:-x[0])
asg={}; taken=set()
for sc,slug,mp in pairs:
  if sc>0 and slug not in asg and mp not in taken: asg[slug]=mp; taken.add(mp)
un=[it['slug'] for it in items if it['slug'] not in asg]
left=[mp for mp in mp4s if mp not in taken]
if len(un)==1 and len(left)==1: asg[un[0]]=left[0]; taken.add(left[0])
print('=== ASSIGNMENT acct',acctN,'mode',mode,'===')
for it in items:
  print(' ',it['slug'],'<==',os.path.basename(asg[it['slug']]) if it['slug'] in asg else '*** NO MATCH ***')
print('UNMATCHED FILES:',[os.path.basename(m) for m in mp4s if m not in taken])
print('TOTAL EXTRACTED:',len(mp4s))
if mode=='commit':
  copied=[]
  for it in items:
    if it['slug'] in asg:
      shutil.copy2(asg[it['slug']], os.path.join(viddir,it['slug']+'.mp4')); copied.append(it['slug'])
  run=datetime.date.today().isoformat()
  di=os.path.join(inbox,'acct%s_%s'%(acctN,run)); os.makedirs(di,exist_ok=True)
  shutil.move(dl, os.path.join(di,'download.zip'))
  print('COMMITTED',len(copied),'->',copied)
  print('MISSING:',[it['slug'] for it in items if it['slug'] not in asg])
