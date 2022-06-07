const express = require("express");
const fs = require("fs/promises");
const { nextTick } = require("process");
const router = express.Router();
const ERROR = require("../helpers/errorHandler");

router.delete(`/`, async (req, res, next) => {
    try{
        console.log(req.query.uuid)
        const tasksList = await fs.readFile(`./server/arr.json`);
        const arrayTasks = JSON.parse(tasksList);
        console.log(!arrayTasks.tasks.some((item) => item.uuid === req.query.uuid))
        if(!(arrayTasks.tasks.some((item) => item.uuid === req.query.uuid)) === true) {
            throw new ERROR(405, "Task not found");
            }
        const deletedItem = arrayTasks.tasks.find((item) => item.uuid === req.query.uuid);
        arrayTasks.tasks.splice(arrayTasks.tasks.indexOf(deletedItem), 1);

        await fs.writeFile(`./server/arr.json`, `${JSON.stringify(arrayTasks, null, 2)}`);
        res.status(200).json(`${JSON.stringify(arrayTasks.tasks)}, ${JSON.stringify(deletedItem)}`);
    }catch(err){
        next(err)
    }
});
module.exports = router;
