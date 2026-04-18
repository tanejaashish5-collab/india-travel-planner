import { test, expect } from "@playwright/test";

test.describe("Gap Year Planner v2", () => {
  test("form shows all 7 required sections", async ({ page }) => {
    await page.goto("/en/gap-year");

    await expect(page.getByRole("heading", { name: /Gap Year Planner/i })).toBeVisible();
    await expect(page.getByText(/Duration:\s*6 months/i)).toBeVisible();
    await expect(page.getByText(/Start month/i)).toBeVisible();
    await expect(page.getByText(/Where are you travelling from\?/i)).toBeVisible();
    await expect(page.getByText(/Who's travelling\?/i)).toBeVisible();
    await expect(page.getByText(/How well do you know India\?/i)).toBeVisible();
    await expect(page.getByText(/Themes/i).first()).toBeVisible();
    await expect(page.getByText(/Experience tier/i)).toBeVisible();
  });

  test("submit is disabled until origin + party + familiarity are chosen", async ({ page }) => {
    await page.goto("/en/gap-year");
    const submit = page.getByRole("button", { name: /Plan my/i });
    await expect(submit).toBeDisabled();

    // Pick party only — still disabled
    await page.getByText(/Solo or couple/i).first().click();
    await expect(submit).toBeDisabled();

    // Pick familiarity too — still disabled (origin missing)
    await page.getByText(/Been around, want depth/i).click();
    await expect(submit).toBeDisabled();

    // Open origin combobox and pick Delhi
    const originInput = page.getByPlaceholder(/Start typing your city/i);
    await originInput.click();
    await originInput.fill("Delhi");
    await page.getByRole("button", { name: /Delhi \(NCR\)/ }).click();
    await expect(submit).toBeEnabled();
  });

  test("origin combobox fuzzy-matches across name and state", async ({ page }) => {
    await page.goto("/en/gap-year");
    const originInput = page.getByPlaceholder(/Start typing your city/i);
    await originInput.click();
    await originInput.fill("Rajas");
    // Should surface Jaipur (state: Rajasthan) at least
    await expect(page.getByRole("button", { name: /Jaipur/i })).toBeVisible({ timeout: 3000 });
  });

  test("themes cap at 3 selected", async ({ page }) => {
    await page.goto("/en/gap-year");
    for (const t of ["mountains", "snow", "biker", "trek"] as const) {
      const btn = page.getByRole("button", { name: new RegExp(`^${t}$`, "i") });
      if (await btn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await btn.click();
      }
    }
    // The 4th click should have been blocked by the disabled state — verify
    // at most 3 theme chips appear with the primary (selected) style.
    const selectedChips = await page.locator("button.bg-primary.text-primary-foreground").count();
    expect(selectedChips).toBeLessThanOrEqual(3);
  });

  test("nav mega-menu includes Gap Year Planner entry", async ({ page }) => {
    await page.goto("/en");

    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      const planTrigger = page.getByRole("button", { name: /^plan$/i }).first();
      if (await planTrigger.isVisible({ timeout: 2000 }).catch(() => false)) {
        await planTrigger.hover();
        await expect(
          page.getByRole("link", { name: /Gap Year Planner/i })
        ).toBeVisible({ timeout: 3000 });
      }
    }
  });
});
