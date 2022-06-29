const { ApolloError } = require("apollo-server-express");
const resolvers = require("../../resolvers");
const Sequelize = require("sequelize");
const sequelize = require("../../models/index").sequelize;
const Task = require("../../models/task")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);

beforeAll(async () => {
  await Task.sequelize.query(`DELETE FROM tasks`);
});


describe("check Post Task", () => {
  
  test(`Post Task`, async () => {
    const task = await {
    title: "123123",
  };
    const res = await resolvers.Mutation.addTask(null, task, null);
    await expect(task.title).toEqual(res.title);
    expect(false).toEqual(res.done);
  });
  test(`Post Task validation`, async () => {
    const task = {
      title: "123123",
    };
    const res = await resolvers.Mutation.addTask(null, task, null);
    expect(new ApolloError("Validation error")).toEqual(res);
  });
});
