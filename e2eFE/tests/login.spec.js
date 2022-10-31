import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';
import { URLS } from '../data/urls';

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
        await page.waitForTimeout(5000);
        await expect(srcText).toContain("sl-404");
    });
});

test.describe("Standard user POM", () => {
    test.use({ storageState: "standard_user_state.json" });
    test.beforeEach(async ({page}) =>{
        await page.goto(URLS.BASE_URL + "/inventory.html");
    })
     
    test("Successful login POM @smoke", async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const header = await inventoryPage.header;
        await expect(header).toHaveText("Products");
    });
});

test.describe("Problem user POM", () => {
    test.use({ storageState: "problem_user_state.json" });
     test.beforeEach(async ({page}) =>{
        await page.goto(URLS.BASE_URL + "/inventory.html");
     })
   
     test("Incorrect image displayed POM @smoke", async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const header = await inventoryPage.header;
        await expect(header).toHaveText("Products");

        const incorrectImage = await inventoryPage.incorrectImage;
        const srcText = await incorrectImage.getAttribute("src");
        await page.waitForTimeout(5000);
        await expect(srcText).toContain("sl-404");
    });
});
