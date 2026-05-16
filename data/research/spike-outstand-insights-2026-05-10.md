# Outstand Insights API Spike — 2026-05-10

**Verdict:** ✅ Found at least one working insights path.

## Tested post IDs (5)

| post_id | platform | format | destination | date |
|---|---|---|---|---|
| `Piix0` | facebook | tourist_map | None | 2026-05-10 |
| `xSSn8` | instagram | tourist_map | None | 2026-05-10 |
| `DEETo` | facebook | canva_visual | None | 2026-05-10 |
| `ehhBr` | youtube | reel_map.cluster_reveal | None | 2026-05-10 |
| `bzwjT` | instagram_story | score_card | pahalgam | 2026-04-30 |

## Probe results

| post_id | path | status | shape |
|---|---|---|---|
| `Piix0` | `/v1/posts/{post_id}/insights` | 404 | 404 Not Found |
| `Piix0` | `/v1/posts/{post_id}/metrics` | 404 | 404 Not Found |
| `Piix0` | `/v1/posts/{post_id}/analytics` | 200 | ENGAGEMENT_KEYS_FOUND=['comments', 'likes', 'metrics', 'shares'] |
| `Piix0` | `/v1/posts/{post_id}/engagement` | 404 | 404 Not Found |
| `Piix0` | `/v1/posts/{post_id}/stats` | 404 | 404 Not Found |
| `Piix0` | `/v1/posts/{post_id}?fields=insights,metrics,engagement,stats` | 200 | no engagement-shaped fields found |
| `Piix0` | `/v1/posts/{post_id}` | 200 | no engagement-shaped fields found |
| `Piix0` | `/v1/insights?post_id={post_id}` | 404 | Not found |
| `Piix0` | `/v1/analytics?post_id={post_id}` | 404 | Not found |
| `Piix0` | `/v1/posts/{post_id}/performance` | 404 | 404 Not Found |
| `xSSn8` | `/v1/posts/{post_id}/insights` | 404 | 404 Not Found |
| `xSSn8` | `/v1/posts/{post_id}/metrics` | 404 | 404 Not Found |
| `xSSn8` | `/v1/posts/{post_id}/analytics` | 200 | ENGAGEMENT_KEYS_FOUND=['comments', 'likes', 'metrics', 'reach', 'saved', 'saves' |
| `xSSn8` | `/v1/posts/{post_id}/engagement` | 404 | 404 Not Found |
| `xSSn8` | `/v1/posts/{post_id}/stats` | 404 | 404 Not Found |
| `xSSn8` | `/v1/posts/{post_id}?fields=insights,metrics,engagement,stats` | 200 | no engagement-shaped fields found |
| `xSSn8` | `/v1/posts/{post_id}` | 200 | no engagement-shaped fields found |
| `xSSn8` | `/v1/insights?post_id={post_id}` | 404 | Not found |
| `xSSn8` | `/v1/analytics?post_id={post_id}` | 404 | Not found |
| `xSSn8` | `/v1/posts/{post_id}/performance` | 404 | 404 Not Found |
| `DEETo` | `/v1/posts/{post_id}/insights` | 404 | 404 Not Found |
| `DEETo` | `/v1/posts/{post_id}/metrics` | 404 | 404 Not Found |
| `DEETo` | `/v1/posts/{post_id}/analytics` | 200 | ENGAGEMENT_KEYS_FOUND=['comments', 'likes', 'metrics', 'shares'] |
| `DEETo` | `/v1/posts/{post_id}/engagement` | 404 | 404 Not Found |
| `DEETo` | `/v1/posts/{post_id}/stats` | 404 | 404 Not Found |
| `DEETo` | `/v1/posts/{post_id}?fields=insights,metrics,engagement,stats` | 200 | no engagement-shaped fields found |
| `DEETo` | `/v1/posts/{post_id}` | 200 | no engagement-shaped fields found |
| `DEETo` | `/v1/insights?post_id={post_id}` | 404 | Not found |
| `DEETo` | `/v1/analytics?post_id={post_id}` | 404 | Not found |
| `DEETo` | `/v1/posts/{post_id}/performance` | 404 | 404 Not Found |
| `ehhBr` | `/v1/posts/{post_id}/insights` | 404 | 404 Not Found |
| `ehhBr` | `/v1/posts/{post_id}/metrics` | 404 | 404 Not Found |
| `ehhBr` | `/v1/posts/{post_id}/analytics` | 200 | ENGAGEMENT_KEYS_FOUND=['comments', 'likes', 'metrics', 'shares', 'views'] |
| `ehhBr` | `/v1/posts/{post_id}/engagement` | 404 | 404 Not Found |
| `ehhBr` | `/v1/posts/{post_id}/stats` | 404 | 404 Not Found |
| `ehhBr` | `/v1/posts/{post_id}?fields=insights,metrics,engagement,stats` | 200 | no engagement-shaped fields found |
| `ehhBr` | `/v1/posts/{post_id}` | 200 | no engagement-shaped fields found |
| `ehhBr` | `/v1/insights?post_id={post_id}` | 404 | Not found |
| `ehhBr` | `/v1/analytics?post_id={post_id}` | 404 | Not found |
| `ehhBr` | `/v1/posts/{post_id}/performance` | 404 | 404 Not Found |
| `bzwjT` | `/v1/posts/{post_id}/insights` | 404 | 404 Not Found |
| `bzwjT` | `/v1/posts/{post_id}/metrics` | 404 | 404 Not Found |
| `bzwjT` | `/v1/posts/{post_id}/analytics` | 200 | ENGAGEMENT_KEYS_FOUND=['metrics'] |
| `bzwjT` | `/v1/posts/{post_id}/engagement` | 404 | 404 Not Found |
| `bzwjT` | `/v1/posts/{post_id}/stats` | 404 | 404 Not Found |
| `bzwjT` | `/v1/posts/{post_id}?fields=insights,metrics,engagement,stats` | 200 | no engagement-shaped fields found |
| `bzwjT` | `/v1/posts/{post_id}` | 200 | no engagement-shaped fields found |
| `bzwjT` | `/v1/insights?post_id={post_id}` | 404 | Not found |
| `bzwjT` | `/v1/analytics?post_id={post_id}` | 404 | Not found |
| `bzwjT` | `/v1/posts/{post_id}/performance` | 404 | 404 Not Found |

## Successful paths

- `/v1/posts/{post_id}/analytics`

## Next steps

- Wire the working path into `engagement_pull.py` (Tier 2.2). Use the Outstand bearer token; no Meta/YT direct API needed.
- Confirm response shape across IG / FB / YT in case fields differ per platform.
- Set up the Tier 2.5 weekly digest using these fields.
