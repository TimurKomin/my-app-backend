const express = require('express');
const fs = require('fs/promises')
// const arr = require(`${__dirname}/arr.json`);
const router = express.Router();

router.patch('/',async  (req, res) => {    
const { uuid } = req.query

const tasksList  = await fs.readFile(`${__dirname}/arr.json`);
const tasks = JSON.parse(tasksList)



const arrReq = uuid.split(',')

const a = tasks.tasks.map(item => {
    if(arrReq.includes(item.uuid)) {
        return {
            ...item,
            done: !req.body.check
        }
    }
    return item;
})
const arr = {
    tasks: a
}
// console.log(a)

await fs.writeFile(`${__dirname}/arr.json`, JSON.stringify(arr, null, 2) )
res.json('ok')
})
module.exports = router;