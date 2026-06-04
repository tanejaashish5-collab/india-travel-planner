#!/usr/bin/env node
/**
 * Bust the live site's reference-data caches (destinations / collections /
 * states / search index / homepage counts) after a manual data edit that did
 * NOT go through scripts/_lib/pg-bulk.mjs (which busts automatically).
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/bust-reference-cache.mjs
 *   node --env-file=apps/web/.env.local scripts/bust-reference-cache.mjs ref-destinations
 *
 * Needs NEWSLETTER_SEND_SECRET in the env file. Optionally SITE_URL/BASE_URL
 * (defaults to https://www.nakshiq.com).
 */
import { bustReferenceCache } from "./_lib/pg-bulk.mjs";

const tags = process.argv.slice(2);
await bustReferenceCache(tags.length ? { tags } : undefined);
console.log("Done.");
