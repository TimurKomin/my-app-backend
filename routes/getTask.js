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
        if(filterBy === ''){
            arrFilterTasks = await Task.findAll({
                order: [['createdAt', `${order}`]],
                offset: (page) * 5 , 
                limit: allPerPage,
            })
            counter = await Task.findAndCountAll();
            console.log(counter.count)
        }
        if(filterBy === 'done'){
            arrFilterTasks = await Task.findAll({
                where:{
                    done:true
                },
                order: [['createdAt', `${order}`]],
                offset: (page) * 5 , 
                limit: allPerPage,
            })

            counter = await Task.findAndCountAll({
                where: {
                    done:true
                }
            });
        }
        if(filterBy === 'undone'){
            arrFilterTasks = await Task.findAll({
                where:{
                    done:false
                },
                order: [['createdAt', `${order}`]],
                 offset: (page) * 5 , 
                limit: allPerPage,
                
            })
            counter = await Task.findAndCountAll({
                where: {
                    done:false
                }
            });
        }
        
        const countTasks = counter.count
        console.log((await counter).count)
        await res.status(200).json({arrFilterTasks, countTasks})
    }
    catch(counter){
        await res.status(400).json(counter.count)
        // next(err)
    }
    
})

module.exports = router;