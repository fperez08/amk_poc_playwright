const { test: base } = require('@playwright/test');

class StandarUser{
    constructor(page){
        this.page = page;
    }
    static async create(browser){
        const context = await browser.newContext({ storageState : 'standar_user_state.json' });
        const page = await context.newPage();
        return new StandarUser(page);
    }
}

class ProblemUser{
    constructor(page){
        this.page = page;
    }

    static async create(browser){
        const context = await browser.newContext({ storageState : 'problem_user_state.json' });
        const page = await context.newPage();
        return new ProblemUser(page);
    }
}

exports.test = base.extend({
    standarPage: async ({ browser }, use) => {
      await use(await StandarUser.create(browser));
    },
    problemPage: async ({ browser }, use) => {
      await use(await ProblemUser.create(browser));
    },
  });
  exports.expect = base.expect;