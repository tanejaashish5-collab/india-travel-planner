#!/usr/bin/env node
/* eslint-disable no-console */
// One-time OAuth consent flow for Google Search Console.
//
// Why OAuth instead of service account: GSC's "Add User" UI rejects
// *.gserviceaccount.com emails as "email not found". OAuth using the
// site-owner's gmail account is the documented Google-recommended path
// for third-party tools (Ahrefs, Semrush, dataforseo all use this).
//
// Usage:
//   node scripts/gsc-oauth-consent.mjs
//
// What it does:
//   1. Loads OAuth client from .secrets/gsc-oauth-client.json
//   2. Spins up an HTTP server on localhost:3939 to catch the redirect
//   3. Opens your default browser to Google's consent page
//   4. After you click Allow, captures the auth code from the redirect
//   5. Exchanges code for refresh token + access token
//   6. Saves refresh token to .secrets/gsc-refresh-token.txt
//
// Output is gitignored. Refresh token persists indefinitely (Google
// rotates only on revocation or 6-month inactivity).

import { readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const CLIENT_PATH = path.join(ROOT, ".secrets", "gsc-oauth-client.json");
const TOKEN_PATH = path.join(ROOT, ".secrets", "gsc-refresh-token.txt");
const REDIRECT_URI = "http://localhost:3939";
const PORT = 3939;
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

const raw = JSON.parse(readFileSync(CLIENT_PATH, "utf8"));
const cfg = raw.web ?? raw.installed ?? raw.desktop;
if (!cfg) {
  console.error("ERR: client.json shape unrecognised — expected web/installed/desktop root key");
  process.exit(1);
}
const { client_id, client_secret } = cfg;

const { google } = await import("googleapis");
const oauth2 = new google.auth.OAuth2(client_id, client_secret, REDIRECT_URI);

const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",  // required for refresh token
  prompt: "consent",       // force refresh-token issuance even if previously granted
  scope: SCOPE,
});

console.log("\n━━━ GSC OAuth consent ━━━\n");
console.log("Opening browser to:");
console.log(`  ${authUrl}\n`);
console.log("If browser doesn't open, copy the URL above and paste into Chrome/Safari.");
console.log("→ Sign in with the Google account that owns sc-domain:nakshiq.com");
console.log("→ Click 'Allow' on the consent screen\n");

// Try to open browser automatically (macOS).
spawn("open", [authUrl], { stdio: "ignore", detached: true }).unref();

// Promise that resolves when the redirect lands.
const code = await new Promise((resolve, reject) => {
  const server = createServer((req, res) => {
    try {
      const u = new URL(req.url, `http://localhost:${PORT}`);
      const c = u.searchParams.get("code");
      const err = u.searchParams.get("error");
      if (err) {
        res.writeHead(400, { "content-type": "text/html" });
        res.end(`<h1>OAuth error: ${err}</h1><p>Close this tab and re-run the script.</p>`);
        server.close();
        reject(new Error(`OAuth denied: ${err}`));
        return;
      }
      if (!c) {
        res.writeHead(400, { "content-type": "text/html" });
        res.end("<h1>No code in redirect</h1><p>Close this tab and re-run.</p>");
        server.close();
        reject(new Error("No code in redirect"));
        return;
      }
      res.writeHead(200, { "content-type": "text/html" });
      res.end(`<!doctype html><meta charset=utf-8><style>body{font-family:-apple-system,sans-serif;max-width:480px;margin:80px auto;text-align:center;color:#222}h1{color:#1a8c4a}</style><h1>✓ GSC OAuth complete</h1><p>You can close this tab and return to the terminal.</p>`);
      server.close();
      resolve(c);
    } catch (e) {
      reject(e);
    }
  });
  server.listen(PORT, () => {
    console.log(`Listening on ${REDIRECT_URI} for the redirect...\n`);
  });
  // Safety timeout
  setTimeout(() => {
    server.close();
    reject(new Error("Timed out waiting for OAuth redirect (5 min)"));
  }, 5 * 60 * 1000);
});

console.log("Got auth code, exchanging for refresh token...");
const { tokens } = await oauth2.getToken(code);

if (!tokens.refresh_token) {
  console.error("\nERR: Google didn't return a refresh_token.");
  console.error("This usually means you've granted consent to this client before.");
  console.error("Fix: revoke at https://myaccount.google.com/permissions and re-run this script.");
  process.exit(1);
}

writeFileSync(TOKEN_PATH, tokens.refresh_token + "\n", { mode: 0o600 });
console.log(`\n✓ Refresh token saved to ${TOKEN_PATH}`);
console.log(`  client_id: ${client_id.slice(0, 30)}...`);
console.log(`  scope:     ${SCOPE}`);
console.log(`  expires:   never (rotates only on revocation or 6-month inactivity)\n`);

console.log("Next: I'll wire scripts/data-pull.mjs + cron route to use this token.\n");
