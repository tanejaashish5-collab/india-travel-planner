#!/usr/bin/env python3
"""
One-shot: re-post the Chamba IG Story with the 9:16 story-variant image.

Context: Earlier today the story used the 1080x1080 feed image, which IG
cropped to 9:16 and chopped off the sides of the CHAMBA title. The fix in
``autoposter.py`` forwards ``fmt="story"`` to the branded-image picker so the
1080x1920 variant (which already exists at
``social_image_library/chamba_HI/chamba_story_typographic-art_footer-bar.jpg``)
is used for Stories.

This script ONLY re-fires the IG Story — it does NOT touch the feed posts
(the Autumn carousel on IG + FB is already live and correct).

Usage:
  python3 repost_chamba_story.py --dry-run   # verify branded asset lookup
  python3 repost_chamba_story.py             # publish

Safe to re-run: calls publish_story() directly, which has no dedup guard.
"""
import os
import sys
import argparse

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

import autoposter as ap


CHAMBA_URL = "chamba"  # used only to seed Path(url).stem in the picker
CHAMBA_FILENAME = "chamba.jpg"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true",
                        help="Lookup the branded asset + resolve the IG account, "
                             "but don't upload or publish.")
    args = parser.parse_args()

    print("── Chamba Story repost pre-flight ────────────────────────────")

    # 1) Resolve the IG account.
    accounts = ap.get_connected_accounts()
    ig = next((a for a in accounts
               if a.get("network") == "instagram"
               and a.get("username") == "nakshiq"), None)
    if not ig:
        print("  ✗ No IG account 'nakshiq' connected. Aborting.")
        return 1
    print(f"  ✓ IG account: {ig.get('username')} ({ig.get('id')})")

    # 2) Verify the story variant exists — early fail is better than a wrong asset.
    from social_image_picker import pick_social_image
    story_asset = pick_social_image("chamba", fmt="story")
    if not (story_asset and story_asset.exists()):
        print("  ✗ No chamba_story_*.jpg found in social_image_library/. Aborting.")
        return 1
    print(f"  ✓ Story asset: {story_asset.name} ({story_asset.stat().st_size:,} bytes)")

    if args.dry_run:
        print("  → DRY RUN: would upload + publish_story()")
        print("──────────────────────────────────────────────────────────────")
        return 0

    print("  → LIVE: uploading + publishing Chamba Story")
    print("──────────────────────────────────────────────────────────────")

    # 3) Upload via upload_media with fmt="story" so the 1080x1920 variant is used.
    #    (Equivalent to reading bytes + upload_media_bytes — this routes through
    #    the same branded-image code path the autoposter uses in production.)
    media = ap.upload_media(CHAMBA_URL, CHAMBA_FILENAME, "image/jpeg", fmt="story")
    if not media:
        print("  ✗ upload_media returned None. Aborting.")
        return 2

    # 4) Publish the Story.
    result = ap.publish_story(ig, media, dry_run=False)
    if not result:
        print("  ✗ publish_story returned None.")
        return 3

    post_id = result.get("post", {}).get("id", "unknown")
    print(f"  Outstand post_id = {post_id}")

    # 5) Wait for IG to confirm the Story is live.
    if post_id != "unknown":
        confirmed = ap.wait_for_publish(post_id)
        if confirmed:
            platform_id = confirmed.get("platformPostId", "—")
            print(f"  ✓ Story LIVE · platform_id = {platform_id}")
        else:
            print(f"  ⚠ Story queued · outstand_id = {post_id}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
