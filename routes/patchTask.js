const express = require("express");
const fs = require("fs/promises");
const router = express.Router();
router.use(express.json());

router.patch("/", async (req, res) => {
    const tasksList = await fs.readFile(`./server/arr.json`);
    const arrayTasks = JSON.parse(tasksList);
    if (arrayTasks.tasks.some((item) => item.name === req.body.name)) {
        return res.status(404).json("dont");
    }

    arrayTasks.tasks.map((item) => {
        if (item.uuid === req.query.uuid) {
        item.done = req.body.done;
        if (req.body.name) {
            item.name = req.body.name;
        }
        }
    });
    await fs.writeFile(`./server/arr.json`, `${JSON.stringify(arrayTasks, null, 2)}`);
    res.status(200).json(`ok`);
});

module.exports = router;
