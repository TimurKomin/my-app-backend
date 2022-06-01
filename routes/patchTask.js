const express = require('express');
const fs = require('fs/promises')
const router = express.Router();
const  {  v4 : uuidv4  }  =  require ( 'uuid' );
const { join } = require('path');
const path = require('path');
const { tasks } = require(`${__dirname}/arr.json`);
const text = fs.readFile(`${__dirname}/arr.json`, 'utf8');
router.use(express.json());

router.patch('/', (req, res) => {    
    // const arr = JSON.stringify({tasks})
    tasks.map((item) => {
    if(item.uuid === req.body.uuid) {
        item.done = req.body.done
        item.name = req.body.name
    }


} )
    
    fs.writeFile(`${__dirname}/arr.json`, `${JSON.stringify({tasks})}`)
    res.status(200).json(`${JSON.stringify(tasks)}, ${JSON.stringify()}`)
    
})

module.exports = router;