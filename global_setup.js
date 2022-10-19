// global-setup.js
const { chromium } = require('@playwright/test');

module.exports = async config => {
  const browser = await chromium.launch();
  const standardUserPage = await browser.newPage();
  await standardUserPage.goto('https://www.saucedemo.com/');
  await standardUserPage.locator('#user-name').fill('standard_user');
  await standardUserPage.locator('#password').fill('secret_sauce');
  await standardUserPage.locator('#login-button').click();
  await standardUserPage.context().storageState({ path: 'standard_user_state.json' });

  const problemUserPage = await browser.newPage();
  await problemUserPage.goto('https://www.saucedemo.com/');
  await problemUserPage.locator('#user-name').fill('problem_user');
  await problemUserPage.locator('#password').fill('secret_sauce');
  await problemUserPage.locator('#login-button').click();
  await problemUserPage.context().storageState({ path: 'problem_user_state.json' });
  await browser.close();
};