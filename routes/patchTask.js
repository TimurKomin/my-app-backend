const express = require("express");
const fs = require("fs/promises");
const router = express.Router();
router.use(express.json());
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);

router.patch("/", async (req, res, next) => {
    try {
        const {done , name} = req.body 
        console.log(req.body)
        await Task.upsert({
            uuid:req.query.uuid,
            name,
            done
        })

        res.status(200).json(`ok`);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
