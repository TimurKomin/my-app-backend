const { ApolloError } = require("apollo-server-express");
const { UUIDV4, UUID } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("../models/index").sequelize;
const Task = require("../models/task")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);

const postTask = async (req, err) => {
  const { title } = req;

  try {
    const newTask = await Task.sequelize.query(
      `INSERT INTO tasks (title) VALUES ('${title}')`,
      { raw: true, type: Sequelize.QueryTypes.INSERT }
    );
    return newTask;
  } catch (err) {
    return new ApolloError(err.message);
  }
};

module.exports = postTask;
