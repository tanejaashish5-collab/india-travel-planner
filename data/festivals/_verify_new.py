import os, subprocess, json, shutil
base=os.path.expanduser('~/Desktop/India Travel Planner/data/festivals/videos')
slugs=[
 'shigmo-shigmotsav-margao','krishnabai-annual-utsav','nowruz-balti-new-year','shigmo-shigmotsav-ponda-spice',
 'morni-mango-blossom-festival','maha-shivaratri-at-kandariya-mahadeva','orchha-festival','uttarkashi-mahadev-temple-festival-maha-shivaratri','sauji-fair',
 'maha-shivaratri-at-tungnath','brij-festival','lathmar-holi','chapchar-kut','shigmo-goan-holi',
 'shivratri-at-mahabaleshwar-temple','coffee-blossom-festival','maha-shivratri-at-murudeshwar','attukal-pongala','maha-shivaratri-rameswaram',
 'maha-shivaratri-srikalahasti','maha-shivaratri-at-mallikarjuna','hyderabadi-haleem-season','dhauli-shanti-utsav','parab-tribal-festival',
 'maha-shivaratri-at-somnath','vaishali-mahotsav','bhoramdeo-mahotsav','sarhul','mahavir-jayanti-shikharji',
]
have_ffprobe = shutil.which('ffprobe') is not None
ok=0; bad=[]
for s in slugs:
    p=os.path.join(base,s+'.mp4')
    if not os.path.exists(p): bad.append((s,'MISSING')); continue
    sz=os.path.getsize(p)
    if sz<500_000: bad.append((s,f'TOO_SMALL {sz}')); continue
    with open(p,'rb') as f:
        head=f.read(12)
    if head[4:8]!=b'ftyp': bad.append((s,'NO_FTYP')); continue
    if have_ffprobe:
        try:
            out=subprocess.run(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','json',p],capture_output=True,text=True,timeout=20)
            d=json.loads(out.stdout or '{}'); st=(d.get('streams') or [{}])[0]
            w,h=st.get('width'),st.get('height')
            if not w or not h: bad.append((s,'NO_VIDEO_STREAM')); continue
            ratio=w/h
            if abs(ratio-16/9)>0.06: bad.append((s,f'NOT_16x9 {w}x{h}')); continue
        except Exception as e:
            bad.append((s,f'FFPROBE_ERR {e}')); continue
    ok+=1
print(f"ffprobe={'yes' if have_ffprobe else 'no'} OK={ok}/{len(slugs)}")
for b in bad: print("  BAD",b)
