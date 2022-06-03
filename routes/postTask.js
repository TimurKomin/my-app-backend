const express = require('express');
const fs = require('fs/promises')
const router = express.Router();
const  {  v4 : uuidv4  }  =  require ( 'uuid' );
const { join } = require('path');
// const arr = require(`${__dirname}/arr.json`);
router.use(express.json());

router.post('/', async (req, res) => {
    if(req.body.name === '') {
        return res.status(404).json('dont')
    }
    const tasksList  = await fs.readFile(`${__dirname}/arr.json`);
    const arr = JSON.parse(tasksList)
    console.log(uuidv4())
    console.log(req.body)
    req.body['uuid'] = uuidv4()
    const date = new Date()
    req.body['date'] = date
    arr.tasks.push(req.body)
    await fs.writeFile(`${__dirname}/arr.json`, `${JSON.stringify(arr, null, 2)}`)
    res.status(200).json(`ok`)
});


module.exports = router;