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

        const filtertodo = filterBy.length ? `where done = ${filter}` : "";
        FilterTasks = await Task.sequelize.query(
        `SELECT * from tasks ${filtertodo} order by created_at ${order} offset $2  limit $1 `,
        {
            bind: [allPerPage, page * allPerPage],
            raw: true,
            type: Sequelize.QueryTypes.SELECT,
        }
        );

        return FilterTasks;
    } catch (err) {
        return new ApolloError(err.message);
    }
};

module.exports = getTask;
