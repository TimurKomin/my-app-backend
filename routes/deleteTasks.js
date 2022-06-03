const { json } = require('express');
const express = require('express');
const fs = require('fs/promises')
// const arr = require(`${__dirname}/arr.json`);
const router = express.Router();
router.delete(`/`, async (req, res) => {  
    const tasksList  = await fs.readFile(`${__dirname}/arr.json`);
    const arr = JSON.parse(tasksList)
    // console.log(req.query.page)
    res.status(200).json(req.query.page)
    // const arr = JSON.stringify({tasks})
    arr.tasks.splice((req.query.page-1)*5, req.query.page*5)
    await fs.writeFile(`${__dirname}/arr.json`, `${JSON.stringify(arr, null, 2)}`)

    const arrDelete = arr.splice 
    
    
})
module.exports = router;