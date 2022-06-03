const { reverse } = require('dns');
const express = require('express');
const fs = require('fs/promises')
const router = express.Router();
const url = require('node:url')
router.use(express.json());

router.get('/', async (req, res)  => {

    try{
        let { pp, filterBy, page, order} = req.query



        const tasksList = await fs.readFile(`${__dirname}/arr.json`);
        const taskParse = JSON.parse(tasksList) 
        let arrFilterTasks = taskParse.tasks
    
        if(order === "desc") {
            arrFilterTasks.reverse()
        }
        if(order === 'asc') {
            arrFilterTasks.sort((a,b) => Number(Date(a.date))  - Number(Date(b.date)))
        }
        if(filterBy === 'done'){
            arrFilterTasks = arrFilterTasks.filter((item) => item.done === true)

        }
        if(filterBy === 'undone'){
            arrFilterTasks = arrFilterTasks.filter((item) => item.done === false)
        }

        const count = arrFilterTasks.length
        const arr = arrFilterTasks.slice((page-1)*pp, page*pp)
        await res.status(200).json({arr, count})
    }
    catch{
        res.status(400).json('false')
    }
    
})

module.exports = router;