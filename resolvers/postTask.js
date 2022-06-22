const { ApolloError } = require("apollo-server-express");
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);
    
    const postTask = async (req, err) => {
        const {title} = req
    try {
        const newTask = await Task.create({
            title
        }) 
        return newTask
    } catch(err) {
        return new ApolloError(err.message)   
    }
};

module.exports = postTask;
