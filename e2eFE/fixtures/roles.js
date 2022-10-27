const { test: base } = require("@playwright/test");
const path = require("path");

class StandarUser {
    constructor(page) {
        this.page = page;
    }
    static async create(browser) {
        const absolutePath = path.resolve("standard_user_state.json");
        const context = await browser.newContext({
            storageState: absolutePath,
        });
        const page = await context.newPage();
        return new StandarUser(page);
    }

    async goto(url) {
        await this.page.goto(url);
    }
}

class ProblemUser {
    constructor(page) {
        this.page = page;
    }

    static async create(browser) {
        const absolutePath = path.resolve("problem_user_state.json");
        const context = await browser.newContext({
            storageState: absolutePath,
        });
        const page = await context.newPage();
        return new ProblemUser(page);
    }

    async goto(url) {
        await this.page.goto(url);
    }
}

exports.test = base.extend({
    standardPage: async ({ browser }, use) => {
        await use(await StandarUser.create(browser));
    },
    problemPage: async ({ browser }, use) => {
        await use(await ProblemUser.create(browser));
    },
});
exports.expect = base.expect;
