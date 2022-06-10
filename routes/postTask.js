const express = require("express");
// const sequelize = require('sequelize')
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const fs = require("fs/promises");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const ERROR = require("../helpers/errorHandler");
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);
router.use(express.json());
router.post("/", async (req, res, next) => {
    
    try {
        console.log(req.body)
        // const tasksList = await fs.readFile(`./server/arr.json`);
        // const arrayTasks = JSON.parse(tasksList);
        
        // if (arrayTasks.tasks.some((item) => item.name === req.body.name)) {
        // throw new ERROR(404, "Task alredy exist");
        // }
        // req.body["uuid"] = uuidv4();
        const {name} = req.body;
        // const date = new Date();
        // req.body["date"] = date;
        // console.log(req.body)
        const newTask = await Task.create({
            name: name 
        })

        
        
        
        // await fs.writeFile(
        // `./server/arr.json`,
        // `${JSON.stringify(arrayTasks, null, 2)}`
        // );
        res.status(200).json(newTask);
    } catch(newTask) {
        res.status(400).json(`${newTask}`);

        // console.log(err)
        // next(err)
    }
});

module.exports = router;
