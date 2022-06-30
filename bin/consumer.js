/* eslint-disable global-require */

(async () => {
    const insertConsumer = require("../consumers/insertConsumer");
    const fs = require("fs");

    setInterval(async () => {
        const array = await fs.readFileSync(
        "/home/oem/Desktop/my-app-backend/tasks.json"
        );
        const arrayJs = JSON.parse(array);
        const clean = await fs.writeFileSync(
        "/home/oem/Desktop/my-app-backend/tasks.json",
        `{}`
        );
        if (arrayJs.Task?.length) {
        insertConsumer(arrayJs);
        }
    }, 1000);
})();
