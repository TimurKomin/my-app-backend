const express = require("express");
const fs = require("fs/promises");
const router = express.Router();
router.delete(`/`, async (req, res) => {
    const tasksList = await fs.readFile(`../server/arr.json`);
    const arrayTasks = JSON.parse(tasksList);
    const deletedItem = arrayTasks.tasks.find((item) => item.uuid === req.query.uuid);
    arrayTasks.tasks.splice(arrayTasks.tasks.indexOf(deletedItem), 1);

    await fs.writeFile(`../server/arr.json`, `${JSON.stringify(arrayTasks, null, 2)}`);
    res.status(200).json(`${JSON.stringify(arrayTasks.tasks)}, ${JSON.stringify(deletedItem)}`);
});
module.exports = router;
