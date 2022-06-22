const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const { ApolloError } = require('apollo-server-express')
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);

const patchTask = async (req, err) => {
    try {
        const {done , title, uuid} = req
        const changing = await Task.upsert({
            uuid,
            title,
            done
        })
        return changing[0]
    } catch (err) {
        return new ApolloError(err.message)
    }
};

module.exports = patchTask;
