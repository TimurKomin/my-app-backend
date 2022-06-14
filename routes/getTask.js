const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const fs = require('fs/promises')
const router = express.Router();
router.use(express.json());
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);

router.get('/', async (req, res, next)  => {
    try{
        let { allPerPage, filterBy, page, order} = req.query
        let arrFilterTasks = []
        let counter = {}
        let a 
        if(filterBy !== '') {
            filterBy === 'done'? a = true : a = false
        }
        const FilterTasks = await Task.findAndCountAll({
            
            where: filterBy.length ? { done: a } : {},
            order: [['createdAt', `${order}`]],
            offset: (page) * 5 , 
            limit: allPerPage,

        })
        
        await res.status(200).json(FilterTasks)
    }
    catch(FilterTasks){
        await res.status(400).json(FilterTasks)
        // next(err)
    }
    
})

module.exports = router;