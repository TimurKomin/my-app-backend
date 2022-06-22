const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const { ApolloError } = require('apollo-server-express')
const { QueryTypes } = require('sequelize');
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);
const deleteTask = async (req, err) => {
    const {uuid} = req
    
    try{

        let delTask;
        await Task.sequelize.query(`DELETE FROM tasks WHERE uuid = $1 RETURNING uuid`,
        {
            bind: [uuid],
            type: QueryTypes.DELETE,
            raw: true,
            plain: true,
          }).then((a) => {
              delTask = a;
            });
        return delTask
    }catch(err){
        return new ApolloError(err.message)
        
    }
};
module.exports = deleteTask;
