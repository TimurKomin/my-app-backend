const express = require('express');
const fs = require('fs/promises')
const router = express.Router();
const  {  v4 : uuidv4  }  =  require ( 'uuid' );
const { join } = require('path');
const { tasks } = require(`${__dirname}/arr.json`);
const text = fs.readFile(`${__dirname}/arr.json`, 'utf8');
router.use(express.json());
console.log(text)
router.post('/', (req, res) => {
    if(req.body.name === '') {
        return res.status(404).json('dont')
    }
    console.log(uuidv4())
    console.log(req.body)
    req.body['uuid'] = uuidv4()
    const date = new Date()
    req.body['date'] = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    tasks.push(req.body)
    fs.writeFile(`${__dirname}/arr.json`, `${JSON.stringify({tasks})}`)
    res.status(200).json(`${JSON.stringify({tasks})}`)
});


module.exports = router;