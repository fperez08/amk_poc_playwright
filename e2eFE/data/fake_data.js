const { request: requestContext, request } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
(async function getUsers() {
    const RANDOM_USER_ENDPOINT = "https://randomuser.me/";
    const requestContext = await request.newContext({
        baseURL: RANDOM_USER_ENDPOINT,
    });
    const response = await requestContext.get(
        `api/?results=${process.argv[2]}`
    );
    const users = await response.json();
    const data = users.results.map((user) => ({
        title: user.name.title,
        body: `${user.name.first} ${user.name.last}`,
        userId: user.login.username,
    }));
    fs.writeFile(
        path.join(__dirname, "/testData.json"),
        JSON.stringify(data),
        function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }
    );
})();
