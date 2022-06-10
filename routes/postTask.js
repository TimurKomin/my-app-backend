const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const router = express.Router();
const ERROR = require("../helpers/errorHandler");
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);
router.use(express.json());
router.post("/", async (req, res, next) => {
    
    try {
        const {name} = req.body;
        const newTask = await Task.create({
            name: name 
        })
        res.status(200).json(newTask);
    } catch(newTask) {
        res.status(400).json(`${newTask}`);
    }
});

module.exports = router;
