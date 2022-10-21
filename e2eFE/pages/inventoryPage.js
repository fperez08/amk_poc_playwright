class InventoryPage{
    /**
    * @param {import('@playwright/test').Page} page
    */

    constructor(page){
        this.page = page;
        this.header = page.locator('.title');
        this.incorrectImage = page.locator("img[alt='Sauce Labs Backpack']");
    }
}

module.exports = {InventoryPage};