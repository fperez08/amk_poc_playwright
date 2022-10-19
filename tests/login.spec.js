// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("Standard user", () => {
    test.use({ storageState: "standard_user_state.json" });
    test("Successful login ", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/inventory.html");

        const header = page.locator(".title");
        await expect(header).toHaveText("Products");
    });
});

test.describe("Problem user", () => {
    test.use({ storageState: "problem_user_state.json" });
    test("Incorrect image displayed", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/inventory.html");

        const header = page.locator(".title");
        await expect(header).toHaveText("Products");

        const incorrectImage = page.locator("img[alt='Sauce Labs Backpack']");
        const srcText = await incorrectImage.getAttribute("src");
        await expect(srcText).toContain("sl-404");
    });
});
