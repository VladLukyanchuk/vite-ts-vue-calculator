import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(`/`);
  await page.waitForLoadState("load");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Compound Interest Calculator");
});
