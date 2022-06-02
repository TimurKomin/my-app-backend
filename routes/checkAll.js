const express = require('express');
const fs = require('fs/promises')
const arr = require(`${__dirname}/arr.json`);
const router = express.Router();

router.patch('/', (req, res) => {    
const { uuid } = req.query

const arrReq = uuid.split(',')
const tasks = arr
const a = tasks.tasks.map(item => {
    if(arrReq.includes(item.uuid)) {
        return {
            ...item,
            done: !req.body.check
        }
    }
    return item;
})
arr.tasks = a
// console.log(a)

fs.writeFile(`${__dirname}/arr.json`, `${JSON.stringify(arr)}`)
res.json('ok')
console.log(req.body.check)
})
module.exports = router;