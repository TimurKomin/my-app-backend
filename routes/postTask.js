const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
const router = express.Router();
const ERROR = require("../helpers/errorHandler");
const Task = require('../models/task')(sequelize, Sequelize.DataTypes,
    Sequelize.Model);
    const postTask = async (req, err) => {
        const {title} = req
        let newTask = {
            title
        }
        try {
            newTask = await Task.create({
                title:title
            })
        } catch(err) {
        }
        return err
};

module.exports = postTask;
