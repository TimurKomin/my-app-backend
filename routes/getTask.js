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
            
            where:{
                done:a
            },
            order: [['createdAt', `${order}`]],
            offset: (page) * 5 , 
            limit: allPerPage,

        })
        // if(filterBy === ''){
        //     arrFilterTasks = await Task.findAll({
        //         order: [['createdAt', `${order}`]],
        //         offset: (page) * 5 , 
        //         limit: allPerPage,
        //     })
        //     counter = await Task.findAndCountAll();
        //     console.log(counter.count)
        // }
        // if(filterBy === 'done'){
        //     arrFilterTasks = await Task.findAll({
        //         where:{
        //             done:filterBy
        //         },
        //         order: [['createdAt', `${order}`]],
        //         offset: (page) * 5 , 
        //         limit: allPerPage,
        //     })

        //     counter = await Task.findAndCountAll({
        //         where: {
        //             done:true
        //         }
        //     });
        // }
        // if(filterBy === 'undone'){
        //     arrFilterTasks = await Task.findAll({
        //         where:{
        //             done:false
        //         },
        //         order: [['createdAt', `${order}`]],
        //          offset: (page) * 5 , 
        //         limit: allPerPage,
                
        //     })
        //     counter = await Task.findAndCountAll({
        //         where: {
        //             done:false
        //         }
        //     });
        // }
        
        // const countTasks = counter.count
        // console.log((await counter).count)
        await res.status(200).json(FilterTasks)
    }
    catch(FilterTasks){
        await res.status(400).json(FilterTasks)
        // next(err)
    }
    
})

module.exports = router;