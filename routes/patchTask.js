const express = require("express");
const fs = require("fs/promises");
const router = express.Router();
router.use(express.json());
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;
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
        return err
    }
};

module.exports = patchTask;
