const express = require("express");
const router = express.Router();
const ERROR = require("../helpers/errorHandler");
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);

const deleteTask = async (req, err) => {
    try{
        
        console.log(req.uuid)
        const delTask = await Task.destroy({
            where:{ uuid : req.uuid}
        })
        return(req)
    }catch(err){
        return err
    }
};
module.exports = deleteTask;
