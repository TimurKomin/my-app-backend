const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const { ApolloError } = require('apollo-server-express')
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);

const patchTask = async (req, err) => {
    try {
        const {done , title, uuid} = req
        const reqDone = `done = ${done}`
        const reqTitle = title && title.length > 0 ? `, title = '${title}'` : '';
        const changing = await Task.sequelize.query(
            `update tasks set ${reqDone} ${reqTitle} where uuid = $1 RETURNING done, title, uuid`, {
                bind: [uuid]
            })
        
        return changing[0][0]
    } catch (err) {
        return new ApolloError(err.message)
    }
};

module.exports = patchTask;
