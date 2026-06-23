import json, os
base=os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
viddir=os.path.join(base,'videos'); os.makedirs(viddir,exist_ok=True)
EXCLUDE={'dalai-lamas-birthday','ganesh-chaturthi-ozar','ganesh-chaturthi-at-trinetra-ganesh-temple'}
present={os.path.splitext(f)[0].lower() for f in os.listdir(viddir) if f.lower().endswith('.mp4') and not f.startswith('.')}
wl=json.load(open(os.path.join(base,'celebration-worklist.json')))
batch=[]; seen=set(); skipped_known=[]
for w in wl:
    slug=w['slug'].strip()
    if slug.lower() in present or slug.lower() in seen: continue
    if slug.lower() in EXCLUDE:
        skipped_known.append(slug); seen.add(slug.lower()); continue
    seen.add(slug.lower())
    p=w['prompt'].strip(); ng=w['neg'].strip()
    batch.append({'slug':slug,'prompt':p,'neg':ng,'text':p+chr(10)+'Negative prompt: '+ng,'dest':w['dest'].strip(),'festival':w['festival'].strip()})
json.dump(batch[:30], open('/tmp/celebration_batch.json','w'))
print(f"{len(present)} on disk | {len(batch)} remaining (excl known-fails) | queuing {len(batch[:30])}")
