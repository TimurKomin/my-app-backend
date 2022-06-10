const express = require("express");
const router = express.Router();
const ERROR = require("../helpers/errorHandler");
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);

router.delete(`/`, async (req, res, next) => {
    try{
        
        console.log(req.query.uuid)
        const delTask = await Task.destroy({
            where:{ uuid : req.query.uuid}
        })
        res.status(200).json(delTask);
    }catch(err){
        next(err)
    }
});
module.exports = router;
