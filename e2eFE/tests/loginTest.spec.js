import { test, expect } from "../fixtures/roles";
import { InventoryPage } from "../pages/inventoryPage";
import { URLS } from "../data/urls";

test("Standard User & Problem User", async ({ standardPage, problemPage }) => {
    await standardPage.goto(URLS.BASE_URL + "/inventory.html");
    let inventoryPage = new InventoryPage(standardPage.page);
    await expect(inventoryPage.header).toHaveText("Products");

    await problemPage.goto(URLS.BASE_URL + "/inventory.html");
    inventoryPage = new InventoryPage(problemPage.page);
    await expect(inventoryPage.header).toHaveText("Products");

    const srcText = await inventoryPage.incorrectImage.getAttribute("src");
    await expect(srcText).toContain("sl-404");
});
