const { reverse } = require('dns');
const express = require('express');
const fs = require('fs/promises')
const router = express.Router();
const url = require('node:url')
const  {  v4 : uuidv4  }  =  require ( 'uuid' );
// const { join } = require('path');
// const task = fs.readFile(`${__dirname}/arr.json`, 'utf8');
const { tasks } = require(`${__dirname}/arr.json`);
router.use(express.json());

router.get('/', (req, res) => {
    let { pp, filterBy, page, order} = req.query
    const arrTasks = tasks
    let arrFilterTasks = arrTasks
    
        if(order === "desc") {
            arrFilterTasks.reverse()
        }
        if(order === 'asc') {
            arrFilterTasks.sort((a,b) => Number(Date.parse(a.date))  - Number(Date.parse(b.date)))
        }
        if(filterBy === 'done'){
            arrFilterTasks = arrTasks.filter((item) => item.done === true)

        }
        if(filterBy === 'undone'){
            arrFilterTasks = arrTasks.filter((item) => item.done === false)
        }

        const count = arrFilterTasks.length
        const arr = arrFilterTasks.slice((page-1)*pp, page*pp)
        res.status(200).json({arr, count})
    
    // if()
    // res.status(200).json(`${JSON.stringify({tasks})}`)
    // // console.log(res.body)
    // console.log(req.query)

})

module.exports = router;