const express = require('express');
const fs = require('fs/promises')
const router = express.Router();
router.use(express.json());

router.get('/', async (req, res, next)  => {
    try{

        let { allPerPage, filterBy, page, order} = req.query
        const tasksList = await fs.readFile(`./server/arr.json`);
        const taskParse = JSON.parse(tasksList) 
        let arrFilterTasks = taskParse.tasks
    
        if(order === "desc") {
            arrFilterTasks.sort((a,b) => Number(Date(b.date))  - Number(Date(a.date)))
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
        const tasksCurrentPage = arrFilterTasks.slice((page-1)*allPerPage, page*allPerPage)
        await res.status(200).json({tasksCurrentPage, count})
    }
    catch(err){
        console.log(err)
        next(err)
    }
    
})

module.exports = router;