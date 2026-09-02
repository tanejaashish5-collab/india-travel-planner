import { test, expect } from "@playwright/test";

// Guards NEW-2026-09-01-001: Leaflet's stylesheet silently failed to load
// (service worker re-issued the cross-origin <link> fetch, which connect-src
// CSP-blocked → fabricated 503), so .leaflet-pane lost position:absolute and
// tiles/markers stacked in normal flow thousands of px below the container.
// Element-COUNT checks passed throughout — only element POSITION betrays this
// class, so these assertions are position-based. Betla is a stable
// non-cinematic destination that renders destination-map.tsx with nearby pins.
test.describe("Leaflet map renders inside its container", () => {
  test("destination map: panes positioned, tiles + markers inside container", async ({
    page,
  }) => {
    await page.goto("/en/destination/betla");

    const container = page.locator(".leaflet-container").first();
    await container.scrollIntoViewIfNeeded();
    await expect(container).toBeVisible({ timeout: 15_000 });
    // Tiles attach async after the leaflet chunk + tile layer load.
    await expect(
      page.locator(".leaflet-tile-loaded").first()
    ).toBeAttached({ timeout: 15_000 });

    const result = await page.evaluate(() => {
      const cont = document.querySelector(".leaflet-container");
      const pane = document.querySelector(".leaflet-map-pane");
      if (!cont || !pane) return { ok: false, reason: "missing container/pane" };
      // The load-bearing signal: without leaflet.css this is "static".
      const panePosition = getComputedStyle(pane).position;
      const c = cont.getBoundingClientRect();
      const inside = (r: DOMRect) =>
        r.bottom > c.top && r.top < c.bottom && r.right > c.left && r.left < c.right;
      const tiles = [...document.querySelectorAll(".leaflet-tile-loaded")].map((t) =>
        t.getBoundingClientRect()
      );
      const markers = [
        ...document.querySelectorAll(".leaflet-overlay-pane path, .leaflet-marker-pane *"),
      ].map((m) => m.getBoundingClientRect());
      return {
        ok: true,
        panePosition,
        tilesTotal: tiles.length,
        tilesInside: tiles.filter(inside).length,
        markersTotal: markers.length,
        markersInside: markers.filter(inside).length,
      };
    });

    expect(result.ok, JSON.stringify(result)).toBe(true);
    expect(result.panePosition, "leaflet.css missing if static").toBe("absolute");
    expect(result.tilesInside, JSON.stringify(result)).toBeGreaterThan(0);
    // Betla always has a main marker; nearby pins are a bonus.
    expect(result.markersInside, JSON.stringify(result)).toBeGreaterThan(0);
  });

  test("explore map view: markers land inside the container", async ({ page }) => {
    await page.goto("/en/explore");
    // Map is behind a Grid/Map toggle on /explore.
    const mapToggle = page.getByRole("button", { name: /^map$/i }).first();
    await mapToggle.click();

    const container = page.locator(".leaflet-container").first();
    await expect(container).toBeVisible({ timeout: 15_000 });
    await expect(
      page.locator(".leaflet-overlay-pane path").first()
    ).toBeAttached({ timeout: 15_000 });

    const result = await page.evaluate(() => {
      const cont = document.querySelector(".leaflet-container");
      if (!cont) return { ok: false };
      const c = cont.getBoundingClientRect();
      const inside = (r: DOMRect) =>
        r.bottom > c.top && r.top < c.bottom && r.right > c.left && r.left < c.right;
      const markers = [...document.querySelectorAll(".leaflet-overlay-pane path")].map(
        (m) => m.getBoundingClientRect()
      );
      return {
        ok: true,
        markersTotal: markers.length,
        markersInside: markers.filter(inside).length,
      };
    });

    expect(result.ok).toBe(true);
    expect(result.markersTotal, JSON.stringify(result)).toBeGreaterThan(100);
    expect(result.markersInside, JSON.stringify(result)).toBeGreaterThan(50);
  });
});
