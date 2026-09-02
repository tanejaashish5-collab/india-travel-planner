import { test, expect } from "@playwright/test";

test.describe("Destination Detail", () => {
  test("loads with all key sections", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    await expect(page).toHaveTitle(/Varanasi/);
    // Hero image
    await expect(page.locator("video, img[alt]").first()).toBeVisible();
    // Name and tagline. getByText(...).first() broke on mobile after the
    // 2026-08-31 fix hid desktop-only fixed chrome (share bar / verdict strip)
    // ≤767px — the DOM-first "Varanasi" span now sits inside display:none
    // chrome there. The H1 is the element that must be visible on every
    // viewport, so assert that.
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Varanasi/);
    // Month scores section. The cinematic template's heading is "Month by
    // month" (spaces) — the old regex only allowed the hyphenated form, so it
    // matched nothing on the rendered page even though the section was there.
    // Every other occurrence of the hyphenated spelling on this page is inside
    // JSON-LD or the i18n payload, which getByText cannot see.
    await expect(page.getByText(/month[- ]by[- ]month|best months/i).first()).toBeVisible();
  });

  test("confidence cards render", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    // Network/medical/road infrastructure data
    await expect(page.getByText(/Infrastructure/i).first()).toBeVisible();
  });

  test("SOS section present", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    await expect(page.getByText(/Emergency|SOS/i).first()).toBeVisible();
  });

  test("state redirect works (goa → /state/goa)", async ({ page }) => {
    const response = await page.goto("/en/destination/goa");
    const url = page.url();
    // Either redirected to state page OR shows a valid page (not 404)
    const isRedirected = url.includes("/state/goa") || url.includes("/region/goa");
    const isValidPage = response?.status() === 200;
    expect(isRedirected || isValidPage).toBeTruthy();
  });

  test("destination-as-state redirect works (/state/wayanad → /destination/wayanad)", async ({ page }) => {
    // wayanad is a Kerala destination, not a state; /state/wayanad had no route
    // and served a hard 404 to inbound links (GSC audit 2026-07-20). Middleware
    // now 301s the /state/<known-destination> class to the real destination page.
    const response = await page.goto("/en/state/wayanad");
    expect(page.url()).toContain("/en/destination/wayanad");
    expect(response?.status()).toBe(200);
  });

  test("new A&N destination loads", async ({ page }) => {
    await page.goto("/en/destination/havelock-island");
    await expect(page).toHaveTitle(/Havelock/);
    await expect(page.getByText("Andaman").first()).toBeVisible();
  });
});
