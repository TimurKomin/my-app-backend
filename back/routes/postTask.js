const express = require('express');
const fs = require('fs/promises')
const router = express.Router();
const  {  v4 : uuidv4  }  =  require ( 'uuid' );
router.use(express.json());

router.post('/', async (req, res) => {
    const tasksList  = await fs.readFile(`../server/arr.json`);
    const arrayTasks = JSON.parse(tasksList)
    if(req.body.name === '' || arrayTasks.tasks.some(item => item.name === req.body.name) ) {
        return res.status(404).json('dont')
    }
    req.body['uuid'] = uuidv4()
    const date = new Date()
    req.body['date'] = date
    arrayTasks.tasks.push(req.body)
    await fs.writeFile(`../server/arr.json`, `${JSON.stringify(arrayTasks, null, 2)}`)
    res.status(200).json(`ok`)
});


module.exports = router;