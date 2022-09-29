// @ts-check
const { test, expect } = require('@playwright/test');

test.use({storageState:'standard_user_state.json'});
test('Login with a standard user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');

  const header = page.locator(".title");
  await expect(header).toHaveText('Products')

});

test.describe(() => {
  test.use({storageState:'problem_user_state.json'});
  test('Login with a problem user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  
    const header = page.locator(".title");
    await expect(header).toHaveText('Products')

    const incorrectImage = page.locator("img[alt='Sauce Labs Backpack']");
    const srcText = await incorrectImage.getAttribute('src');
    await expect(srcText).toContain('sl-404');
  
  });
});
