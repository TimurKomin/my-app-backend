const express = require("express");
const fs = require("fs/promises");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const ERROR = require("../helpers/errorHandler");
router.use(express.json());
router.post("/", async (req, res, next) => {
    try {
        const tasksList = await fs.readFile(`./server/arr.json`);
        const arrayTasks = JSON.parse(tasksList);
        if (arrayTasks.tasks.some((item) => item.name === req.body.name)) {
        throw new ERROR(404, "Task alredy exist");
        }
        req.body["uuid"] = uuidv4();
        const date = new Date();
        req.body["date"] = date;
        arrayTasks.tasks.push(req.body);
        await fs.writeFile(
        `./server/arr.json`,
        `${JSON.stringify(arrayTasks, null, 2)}`
        );
        res.status(200).json(`Task added`);
    } catch(err) {
        // console.log(err)
        next(err)
    }
});

module.exports = router;
