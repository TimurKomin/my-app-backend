const express = require('express');
const fs = require('fs/promises')
const { tasks } = require(`${__dirname}/arr.json`);
const router = express.Router();

router.delete('/', (req, res) => {    
    // const arr = JSON.stringify({tasks})
    const a =  tasks.find((item) => item.uuid === req.body.uuid)
    tasks.splice(indexOF(a), 1)
    
    // fs.writeFile(`${__dirname}/arr.json`, `${JSON.stringify({tasks})}`)
    res.status(200).json(`${JSON.stringify(tasks)}, ${JSON.stringify(a)}`)
    
})
module.exports = router;