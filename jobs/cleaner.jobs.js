const Sequelize = require("sequelize");
const sequelize = require("../models/index").sequelize;
const { ApolloError } = require("apollo-server-express");
const Task = require("../models/task")(
    sequelize,
    Sequelize.DataTypes,
    Sequelize.Model
);
const resolvers = require("../resolvers");
const cron = require("cron");

const cleanerFunction = async () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - 30);
    const time = new Date(`${d}`).toISOString();
    const findTask = await Task.sequelize.query(
        `SELECT * from tasks where created_at < '${time}' `
    );
    const arrOldTask = findTask[0].map((item) => ` '${item.uuid}' `);
    if (arrOldTask.length) {
        const removeTask = await Task.sequelize.query(
        `DELETE FROM tasks WHERE uuid IN (${arrOldTask}) RETURNING uuid`
        );
    }
};
let cronTime = "* * * * *";

const cleanerJob = {
    cronTime,
    onTick: cleanerFunction,
};

module.exports = {
    cleanerJob,
    cleanerFunction,
};
