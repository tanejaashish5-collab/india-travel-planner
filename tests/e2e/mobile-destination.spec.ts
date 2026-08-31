import { test, expect } from "@playwright/test";

// Guards against the 2026-08-31 class of mobile breakage on the cinematic
// destination template: desktop-only fixed chrome (the "In this guide" TOC)
// painting over phone viewports, and rigid 12-column grids overflowing a
// 390px screen. The old mobile visual test never scrolled past the hero —
// the only state in which the TOC is invisible (IntersectionObserver keeps
// it at opacity:0 until the cover leaves view) — so none of this was
// catchable above the fold. html has overflow-x: clip, which hides the
// scrollbar but not the overflow, so we assert on scrollWidth AND on the
// right edge of every section.

test.describe("Mobile — cinematic destination layout", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name === "desktop", "Mobile-only test");
  });

  test("mid-page: TOC hidden, no horizontal overflow, August reachable", async ({ page }) => {
    await page.goto("/en/destination/varanasi");
    await page.waitForLoadState("networkidle");

    // Scroll past the cover so IntersectionObserver-gated fixtures would
    // mount if they were not CSS-hidden.
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.6));
    await page.waitForTimeout(700);

    // (a) the guide TOC must not render on phones
    await expect(
      page.locator("nav[aria-label='In-guide jump navigation']")
    ).toBeHidden();

    // (b) no horizontal overflow at several scroll depths.
    // body.scrollWidth is the load-bearing signal: it read 836 on the broken
    // layout despite html's overflow-x:clip hiding the scrollbar. Don't
    // assert on per-element right edges — decorative absolute layers (the
    // Ken Burns hero zoom) are deliberately wider than the viewport inside
    // overflow:hidden wrappers and would false-positive.
    for (const mult of [0.5, 2, 5, 10, 20]) {
      await page.evaluate((m) => window.scrollTo(0, window.innerHeight * m), mult);
      await page.waitForTimeout(250);
      const { scrollW, viewport } = await page.evaluate(() => ({
        scrollW: document.body.scrollWidth,
        viewport: window.innerWidth,
      }));
      expect(scrollW, `body.scrollWidth at ${mult}vh`).toBeLessThanOrEqual(viewport + 2);
    }

    // Dismiss the wishlist/newsletter nudge if it appeared — it can sit over
    // the month strip and intercept the trial click below.
    const dismiss = page.getByText(/^Not now$/i).first();
    if (await dismiss.isVisible().catch(() => false)) await dismiss.click();

    // (c) the AUGUST month cell is on screen and clickable (the 6×2 wrap —
    // before it, JUL–DEC were clipped off the right edge, unreachable)
    const aug = page.locator(".nq-month-strip a[href$='/august']").first();
    await aug.scrollIntoViewIfNeeded();
    await expect(aug).toBeVisible();
    const box = await aug.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(390 + 2);
    await aug.click({ trial: true });

    // (d) family-read section fits the viewport (skip when dest lacks kids data)
    const fam = page.locator(".nq-family-grid");
    if (await fam.count()) {
      await fam.scrollIntoViewIfNeeded();
      const fb = await fam.boundingBox();
      expect(fb!.x).toBeGreaterThanOrEqual(-2);
      expect(fb!.x + fb!.width).toBeLessThanOrEqual(390 + 2);
    }
  });
});
