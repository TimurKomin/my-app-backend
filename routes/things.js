const express = require('express');
const router = express.Router();
const  {  v4 : uuidv4  }  =  require ( 'uuid' );
const { join } = require('path');
const arr = []



router.post('/', (req, res) => {
    if(req.body.name === ''){
        return res.status(404).json('dont')
    }
    console.log(uuidv4())
    console.log(req.body)
    req.body['uuid'] = uuidv4()
    const date = new Date()
    req.body['date'] = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    arr.push(req.body)
    console.log(arr)
    res.status(200).json('server worked')
});

module.exports = router;