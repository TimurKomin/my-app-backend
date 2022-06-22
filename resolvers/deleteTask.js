const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const { ApolloError } = require('apollo-server-express')
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);

const deleteTask = async (req, err) => {
    try{
        const delTask = await Task.destroy({
            where:{ uuid : req.uuid}
        })
        return(req)
    }catch(err){
        return new ApolloError(err.message)
        
    }
};
module.exports = deleteTask;
