const express = require('express');
const fs = require('fs/promises')
// const arr = require(`${__dirname}/arr.json`);
const router = express.Router();
// console.log(arr.tasks)
router.delete(`/`, async (req, res) => {    
    const tasksList  = await fs.readFile(`${__dirname}/arr.json`);
    const arr = JSON.parse(tasksList)
    // const arr = JSON.stringify({tasks})
    const a =  arr.tasks.find((item) => item.uuid === req.query.uuid)
    arr.tasks.splice(arr.tasks.indexOf(a), 1)
    
    await fs.writeFile(`${__dirname}/arr.json`, `${JSON.stringify(arr, null, 2)}`)
    res.status(200).json(`${JSON.stringify(arr.tasks)}, ${JSON.stringify(a)}`)
    
})
module.exports = router;