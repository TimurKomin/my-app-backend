const resolvers = require("../../resolvers");
const Sequelize = require("sequelize");
const { ApolloError } = require("apollo-server-express");
const sequelize = require("../../models/index").sequelize;
const Task = require("../../models/task")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);

beforeAll(async () => {
  await Task.sequelize.query(`DELETE FROM tasks`);
});



describe("check remove Task", () => {
  const task = {
    done: true,
    title: "123123",
  };
  const invalidTask = {
    done: false,
    title: "qweeqw",
    uuid: "dfqdwqw",
  };

  test(`remove Task`, async () => {
    const uuid = await resolvers.Mutation.addTask(null, task, null);
    const res = await resolvers.Mutation.removeTask(null, uuid, null);
    expect(uuid.uuid).toEqual(res.uuid);
  });
  test(`remove Task validation`, async () => {
    const res = await resolvers.Mutation.removeTask(null, invalidTask, null);
    expect(
      new ApolloError('invalid input syntax for type uuid: "dfqdwqw"')
    ).toEqual(res);
  });
});
