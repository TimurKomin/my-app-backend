const express = require("express");
const fs = require("fs/promises");
const router = express.Router();

router.patch("/", async (req, res) => {
    try {
        const { uuid } = req.query;
        const tasksList = await fs.readFile(`../server/arr.json`);
        const tasks = JSON.parse(tasksList);
        const arrReq = uuid.split(",");
        const arrayChecked = tasks.tasks.map((item) => {
        if (arrReq.includes(item.uuid)) {
            return {
            ...item,
            done: !req.body.check,
            };
        }
        return item;
        });
        const arrayToWrite = {
        tasks: arrayChecked,
        };
        await fs.writeFile(`../server/arr.json`, JSON.stringify(arrayToWrite, null, 2));
        res.json("ok");
    } catch (err) {
        console.err(err);
    }
});
module.exports = router;
