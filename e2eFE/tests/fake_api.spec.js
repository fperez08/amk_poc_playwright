import { test, expect } from "@playwright/test";

const JSON_PLACEHOLDER_ENDPOINT = "https://jsonplaceholder.typicode.com/posts/";
const data = require("../data/testData.json");
let count = 0;

test.describe("Json place holder fake API", () => {
    for (const user of data) {
        test(`Create a resource:${user.userId} ${count++}`, async ({
            request,
        }) => {
            let response = await request.post(JSON_PLACEHOLDER_ENDPOINT, {
                data: user,
            });
            await expect(response.ok()).toBeTruthy();
            await expect(await response.json()).toEqual(
                expect.objectContaining(user)
            );
        });
    }
});
