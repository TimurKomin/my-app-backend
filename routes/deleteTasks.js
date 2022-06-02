const { json } = require('express');
const express = require('express');
const fs = require('fs/promises')
const arr = require(`${__dirname}/arr.json`);
const router = express.Router();
router.delete
router.delete(`/`, (req, res) => {  
    // console.log(req.query.page)
    res.status(200).json(req.query.page)
    // const arr = JSON.stringify({tasks})
    arr.tasks.splice((req.query.page-1)*5, req.query.page*5)
    fs.writeFile(`${__dirname}/arr.json`, `${JSON.stringify(arr)}`)

    const arrDelete = arr.splice 
    
    
})
module.exports = router;