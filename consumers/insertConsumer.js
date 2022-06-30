const Sequelize = require("sequelize");
const sequelize = require("../models/index").sequelize;
const { ApolloError } = require("apollo-server-express");
const Task = require("../models/task")(
    sequelize,
    Sequelize.DataTypes,
    Sequelize.Model
);
const resolvers = require("../resolvers");

const insertConsumer = async (array) => {
    const newTitleGenerate = array.Task.map((item) => `('${item.title}')`);
    const newData = await Task.sequelize.query(
    `INSERT INTO tasks (title) VALUES ${newTitleGenerate} returning tasks`
    );
};
module.exports = insertConsumer;
