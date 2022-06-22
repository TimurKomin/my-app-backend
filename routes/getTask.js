const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const fs = require('fs/promises');
const task = require('../models/task');
const router = express.Router();
router.use(express.json());
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);

const getTask = async (req, err) => {
    let tasks = [];
    try{
        let { allPerPage, filterBy, page, order} = req
        
        let arrFilterTasks = []
        let counter = {}
        let a
        
        if(filterBy !== '') {
            filterBy === 'done'? a = true : a = false
        }
        
        const FilterTasks = await Task.findAndCountAll({
            
            where: filterBy.length ? { done: a } : {},
            order: [['createdAt', `${order}`]],
            offset: (page) * allPerPage , 
            limit: allPerPage,
        
        })
        
        tasks = FilterTasks.rows
        
    }
    catch(err){
        return err
    }
    return tasks  
}

module.exports = getTask;