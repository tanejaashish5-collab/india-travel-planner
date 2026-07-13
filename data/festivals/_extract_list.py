import os, zipfile, datetime
base=os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
today=datetime.date.today().isoformat()
inbox=os.path.join(base,'_inbox',f'acct6_{today}')
ext=os.path.join(inbox,'extracted')
os.makedirs(ext,exist_ok=True)
zp=os.path.expanduser('~/Downloads/download.zip')
with zipfile.ZipFile(zp) as z:
    z.extractall(ext)
mp4s=[]
for root,_,files in os.walk(ext):
    for f in files:
        if f.lower().endswith('.mp4') and not f.startswith('.'):
            mp4s.append(os.path.join(root,f))
print(f"COUNT={len(mp4s)}")
for m in sorted(mp4s):
    print(f"{os.path.getsize(m)}\t{os.path.basename(m)}")
