const express = require('express');
const fs = require('fs/promises')
const router = express.Router();
const  {  v4 : uuidv4  }  =  require ( 'uuid' );
const { join } = require('path');
const path = require('path');
const arr = require(`${__dirname}/arr.json`);
const text = fs.readFile(`${__dirname}/arr.json`, 'utf8');
router.use(express.json());

router.patch('/', (req, res) => {    
    // const arr = JSON.stringify({tasks})
    arr.tasks.map((item) => {
    if(item.uuid === req.query.uuid) {
        item.done = req.body.done
        if(req.body.name){
            item.name = req.body.name 
        }   
    }
} )
    
    fs.writeFile(`${__dirname}/arr.json`, `${JSON.stringify(arr)}`)
    res.status(200).json(`ok`)
    
})

module.exports = router;