const express = require("express");
const fs = require("fs/promises");
const router = express.Router();
router.delete(`/`, async (req, res) => {
    const tasksList = await fs.readFile(`./server/arr.json`);
    const arrayTasks = JSON.parse(tasksList);
    const { uuid } = req.query;
    const arrReq = uuid.split(",");
    // arrayGetDeleted = arrayTasks.filter()
    const arrayChecked = arrayTasks.tasks.map((item) => {
        if (arrReq.includes(item.uuid)) {
            return item.uuid !== uuid
        }
        // return item;
        });
    await fs.writeFile(`./server/arr.json`, `${JSON.stringify(arrayChecked, null, 2)}`);
});
module.exports = router;
