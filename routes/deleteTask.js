const express = require('express');
const fs = require('fs/promises')
const arr = require(`${__dirname}/arr.json`);
const router = express.Router();
// console.log(arr.tasks)
router.delete(`/`, (req, res) => {    
    // const arr = JSON.stringify({tasks})
    const a =  arr.tasks.find((item) => item.uuid === req.query.uuid)
    arr.tasks.splice(arr.tasks.indexOf(a), 1)
    
    fs.writeFile(`${__dirname}/arr.json`, `${JSON.stringify(arr)}`)
    res.status(200).json(`${JSON.stringify(arr.tasks)}, ${JSON.stringify(a)}`)
    
})
module.exports = router;