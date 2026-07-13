import json, os
base=os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
viddir=os.path.join(base,'videos'); os.makedirs(viddir,exist_ok=True)
# Content-policy block REWORD (2026-06-30): the long-tail blocks were reworded at the prompt
# source in celebration-worklist.json to drop the Veo trigger phrases (summer-shimla "Celebrity
# performances"; dalai-lamas-birthday named person/temple; ozar+trinetra named temples) following
# the proven "vivekananda salvage" pattern. SKIP now empty so they re-enter the queue for a real
# render attempt. If any of them STILL blocks on the next run, re-add its slug here.
SKIP=set()
present={os.path.splitext(f)[0].lower() for f in os.listdir(viddir) if f.lower().endswith('.mp4') and not f.startswith('.')}
wl=json.load(open(os.path.join(base,'celebration-worklist.json')))
batch=[]; seen=set()
for w in wl:
    slug=w['slug'].strip()
    if slug.lower() in present or slug.lower() in seen or slug.lower() in SKIP: continue
    seen.add(slug.lower())
    batch.append({'slug':slug,'text':w['prompt'].strip()+chr(10)+'Negative prompt: '+w['neg'].strip(),'dest':w['dest'].strip(),'festival':w['festival'].strip()})
outp=os.path.join(base,'_celebration_batch.json')
json.dump(batch[:30], open(outp,'w'))
print(f"{len(present)} videos on disk | {len(batch)} of 500 remaining (excl {len(SKIP)} permanent-block) | queuing {len(batch[:30])}")
for i,b in enumerate(batch[:30]):
    print(f"acct{i//5+1} idx{i} {b['slug']} | {b['festival']} @ {b['dest']}")
