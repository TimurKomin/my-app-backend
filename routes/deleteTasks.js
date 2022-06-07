const express = require("express");
const fs = require("fs/promises");
const router = express.Router();
router.delete(`/`, async (req, res) => {
    const tasksList = await fs.readFile(`./server/arr.json`);
    const arrayTasks = JSON.parse(tasksList);
    const { uuid } = req.query;
    res.status(200).json(req.query.page);
    console.log(req.query.ordre)
    const arrReq = uuid.split(",");
    const arrayForWrite = arrayTasks.filter(item => !arrReq.includes(item.id))
    await fs.writeFile(`./server/arr.json`, `${JSON.stringify(arrayForWrite, null, 2)}`);
});
module.exports = router;
