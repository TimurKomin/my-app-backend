const express = require("express");
const fs = require("fs/promises");
const router = express.Router();
router.delete(`/`, async (req, res) => {
    const tasksList = await fs.readFile(`../server/arr.json`);
    const arrayTasks = JSON.parse(tasksList);
    res.status(200).json(req.query.page);
    arrayTasks.tasks.splice((req.query.page - 1) * 5, 5);
    await fs.writeFile(`../server/arr.json`, `${JSON.stringify(arrayTasks, null, 2)}`);
});
module.exports = router;
