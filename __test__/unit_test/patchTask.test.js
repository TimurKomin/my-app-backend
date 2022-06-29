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


describe("check change Task", () => {
    test(`change Task`, async () => {
        const task = {
        done: true,
        title: "123123",
        };
        const uuid = await resolvers.Mutation.addTask(null, task, null);
        const res = await resolvers.Mutation.changeTask(
        null,
        { done: false, title: "lel", uuid: uuid.uuid },
        null
        );
        await expect("lel").toEqual(res.title);
    });
    test(`change Task validation`, async () => {
        const invalidTask = {
        done: false,
        title: "qweeqw",
        uuid: "dfqdwqw",
        };

        const res = await resolvers.Mutation.changeTask(null, invalidTask, null);
        expect(
        new ApolloError('invalid input syntax for type uuid: "dfqdwqw"')
        ).toEqual(res);
    });
});
