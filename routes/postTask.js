const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const router = express.Router();
const ERROR = require("../helpers/errorHandler");
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);
router.use(express.json());
router.post("/", async (req, res, next) => {
    // const Tasks = await Task.findAll()
    // console.log('23423423', Tasks)
    try {
        // if(Tasks.some((item) => )) {

        // }
        console.log(req.body)
        const {title} = req.body;
        const newTask = await Task.create({
            title:title

        })
        res.status(200).json('Task add');
    } catch(newTask) {
        res.status(400).json(`Task alrady exist`);
    }
});

module.exports = router;
