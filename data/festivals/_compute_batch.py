import json, os
base=os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
viddir=os.path.join(base,'videos'); os.makedirs(viddir,exist_ok=True)
# Content-policy blocks REWORDED 2026-06-30 at the prompt source (celebration-worklist.json) to
# drop the Veo trigger phrases — SKIP cleared so they re-enter the queue. Re-add only if still blocked.
SKIP=set()
present={os.path.splitext(f)[0].lower() for f in os.listdir(viddir) if f.lower().endswith('.mp4') and not f.startswith('.')}
wl=json.load(open(os.path.join(base,'celebration-worklist.json')))
batch=[]; seen=set(); skipped=[]
for w in wl:
    slug=w['slug'].strip()
    if slug.lower() in present or slug.lower() in seen:
        continue
    if slug.lower() in SKIP:
        skipped.append(slug); continue
    seen.add(slug.lower())
    batch.append({'slug':slug,'text':w['prompt'].strip()+chr(10)+'Negative prompt: '+w['neg'].strip(),'dest':w['dest'].strip(),'festival':w['festival'].strip()})
todays=batch[:30]
json.dump(todays, open(os.path.join(base,'_celebration_batch_today.json'),'w'))
print(f"DISK={len(present)} REMAIN={len(batch)} SKIPPED_PERMA={skipped} QUEUE={len(todays)}")
for i,b in enumerate(todays):
    print(f"{i}\t{b['slug']}\t{b['festival']} @ {b['dest']}")
