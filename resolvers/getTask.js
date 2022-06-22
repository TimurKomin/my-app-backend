const Sequelize = require("sequelize");
const sequelize = require("../models/index").sequelize;
const { ApolloError } = require("apollo-server-express");
const Task = require("../models/task")(
    sequelize,
    Sequelize.DataTypes,
    Sequelize.Model
    );

    const getTask = async (req, err) => {
    try {
        let { allPerPage, filterBy, page, order } = req;

        let arrFilterTasks = [];
        let counter = {};
        let filter;

        if (filterBy !== "") {
        filterBy === "done" ? (filter = true) : (filter = false);
        }

        const FilterTasks = await Task.findAndCountAll({
        where: filterBy.length ? { done: filter } : {},
        order: [["createdAt", `${order}`]],
        offset: page * allPerPage,
        limit: allPerPage,
        });

        return FilterTasks.rows;
    } catch (err) {
        return new ApolloError(err.message);
    }
};

module.exports = getTask;
