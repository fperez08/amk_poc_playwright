import { test, expect } from '../fixtures/roles';
//import { standarPage, problemPage } from '../fixtures/roles';



test.skip('test standarUser & problemUser', async ({ standarPage }) => {
    await standarPage.page.goto("https://www.saucedemo.com/inventory.html");

    const header = page.locator(".title");
    await expect(header).toHaveText("Products");
})
